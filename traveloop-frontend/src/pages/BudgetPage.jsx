import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { Plus, Trash2 } from 'lucide-react'
import useFetch from '../hooks/useFetch'
import budgetApi from '../api/budgetApi'
import { BUDGET_CATEGORIES, CURRENCIES } from '../utils/constants'

const COLORS = ['#0EA5E9', '#F97316', '#10B981', '#A855F7', '#F59E0B', '#EF4444']

const BudgetPage = () => {
  const { tripId } = useParams()
  const { data: budgets, refetch } = useFetch(
    () => budgetApi.getByTrip(tripId), [tripId]
  )
  const [form, setForm] = useState({
    category: 'Transport', estimatedAmount: 0, actualAmount: 0, currency: 'USD',
  })

  const submit = async (e) => {
    e.preventDefault()
    await budgetApi.create({ ...form, tripId: Number(tripId) })
    setForm({ ...form, estimatedAmount: 0, actualAmount: 0 })
    refetch()
  }

  const remove = async (id) => {
    await budgetApi.delete(id)
    refetch()
  }

  const total = budgets?.reduce((s, b) => s + (b.estimatedAmount || 0), 0) || 0
  const chartData = budgets?.map((b) => ({
    name: b.category, value: b.estimatedAmount || 0,
  })) || []

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">Trip Budget</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="card">
          <h2 className="font-semibold mb-3">Cost Breakdown</h2>
          {chartData.length === 0 ? (
            <p className="text-gray-500">No budget items yet</p>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={chartData} dataKey="value" nameKey="name"
                  cx="50%" cy="50%" outerRadius={80} label>
                  {chartData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip /><Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
        <div className="card flex flex-col justify-center items-center">
          <p className="text-gray-500">Total Estimated</p>
          <h2 className="text-4xl font-bold text-primary mt-2">${total.toFixed(2)}</h2>
        </div>
      </div>

      <form onSubmit={submit} className="card mb-6">
        <h2 className="font-semibold mb-3 flex items-center gap-2"><Plus size={18} />Add Budget Item</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <select className="input-field" value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}>
            {BUDGET_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
          <input type="number" step="0.01" className="input-field" placeholder="Estimated"
            value={form.estimatedAmount}
            onChange={(e) => setForm({ ...form, estimatedAmount: Number(e.target.value) })} />
          <input type="number" step="0.01" className="input-field" placeholder="Actual"
            value={form.actualAmount}
            onChange={(e) => setForm({ ...form, actualAmount: Number(e.target.value) })} />
          <select className="input-field" value={form.currency}
            onChange={(e) => setForm({ ...form, currency: e.target.value })}>
            {CURRENCIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <button type="submit" className="btn-primary mt-4">Add</button>
      </form>

      <div className="space-y-2">
        {budgets?.map((b) => (
          <div key={b.id} className="card flex justify-between items-center py-3">
            <div>
              <span className="font-semibold">{b.category}</span>
              <span className="ml-3 text-sm text-gray-500">
                Est: {b.currency} {b.estimatedAmount} · Actual: {b.currency} {b.actualAmount}
              </span>
            </div>
            <button onClick={() => remove(b.id)} className="text-red-500">
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BudgetPage