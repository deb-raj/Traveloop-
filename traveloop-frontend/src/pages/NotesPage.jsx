import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Plus, Trash2 } from 'lucide-react'
import useFetch from '../hooks/useFetch'
import tripNoteApi from '../api/tripNoteApi'

const NotesPage = () => {
  const { tripId } = useParams()
  const { data: notes, refetch } = useFetch(
    () => tripNoteApi.getByTrip(tripId), [tripId]
  )
  const [form, setForm] = useState({ title: '', content: '' })

  const submit = async (e) => {
    e.preventDefault()
    await tripNoteApi.create({ ...form, tripId: Number(tripId) })
    setForm({ title: '', content: '' })
    refetch()
  }

  const remove = async (id) => {
    await tripNoteApi.delete(id)
    refetch()
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">Trip Notes & Journal</h1>

      <form onSubmit={submit} className="card mb-6">
        <input className="input-field mb-3" placeholder="Note title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <textarea className="input-field" rows="4" placeholder="Write your thoughts... *" required
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })} />
        <button type="submit" className="btn-primary mt-3 flex items-center gap-2">
          <Plus size={18} /> Add Note
        </button>
      </form>

      <div className="space-y-3">
        {notes?.length === 0 && <p className="text-gray-500">No notes yet.</p>}
        {notes?.map((n) => (
          <div key={n.id} className="card">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold">{n.title || 'Untitled'}</h3>
              <button onClick={() => remove(n.id)} className="text-red-500">
                <Trash2 size={18} />
              </button>
            </div>
            <p className="text-gray-700 mt-2 whitespace-pre-wrap">{n.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NotesPage