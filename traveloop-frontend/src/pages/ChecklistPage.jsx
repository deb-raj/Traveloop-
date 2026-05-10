import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Plus, Trash2, Check } from 'lucide-react'
import useFetch from '../hooks/useFetch'
import checklistApi from '../api/checklistApi'
import { CHECKLIST_CATEGORIES } from '../utils/constants'

const ChecklistPage = () => {
  const { tripId } = useParams()
  const { data: items, refetch } = useFetch(
    () => checklistApi.getByTrip(tripId), [tripId]
  )
  const [form, setForm] = useState({
    itemName: '', category: 'Clothing', quantity: 1,
  })

  const submit = async (e) => {
    e.preventDefault()
    await checklistApi.create({ ...form, tripId: Number(tripId) })
    setForm({ ...form, itemName: '', quantity: 1 })
    refetch()
  }

  const toggle = async (id) => {
    await checklistApi.togglePacked(id)
    refetch()
  }

  const remove = async (id) => {
    await checklistApi.delete(id)
    refetch()
  }

  const grouped = (items || []).reduce((acc, i) => {
    acc[i.category] = acc[i.category] || []
    acc[i.category].push(i)
    return acc
  }, {})

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">Packing Checklist</h1>

      <form onSubmit={submit} className="card mb-6">
        <div className="grid grid-cols-3 gap-3">
          <input className="input-field col-span-2" placeholder="Item name *" required
            value={form.itemName}
            onChange={(e) => setForm({ ...form, itemName: e.target.value })} />
          <select className="input-field" value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}>
            {CHECKLIST_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <button type="submit" className="btn-primary mt-3 flex items-center gap-2">
          <Plus size={18} /> Add Item
        </button>
      </form>

      {Object.keys(grouped).length === 0 ? (
        <p className="text-gray-500">No items yet. Add what you need to pack!</p>
      ) : (
        Object.entries(grouped).map(([cat, list]) => (
          <div key={cat} className="card mb-4">
            <h2 className="font-semibold text-lg mb-3">{cat}</h2>
            <ul className="space-y-2">
              {list.map((i) => (
                <li key={i.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                  <label className="flex items-center gap-3 cursor-pointer flex-1">
                    <button onClick={() => toggle(i.id)}
                      className={`w-6 h-6 rounded border-2 flex items-center justify-center
                      ${i.isPacked ? 'bg-primary border-primary' : 'border-gray-300'}`}>
                      {i.isPacked && <Check size={14} className="text-white" />}
                    </button>
                    <span className={i.isPacked ? 'line-through text-gray-400' : ''}>
                      {i.itemName} (×{i.quantity})
                    </span>
                  </label>
                  <button onClick={() => remove(i.id)} className="text-red-500">
                    <Trash2 size={16} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  )
}

export default ChecklistPage
