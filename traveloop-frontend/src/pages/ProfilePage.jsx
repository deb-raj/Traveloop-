import { useState } from 'react'
import useAuth from '../hooks/useAuth'
import userApi from '../api/userApi'

const ProfilePage = () => {
  const { user, updateUser } = useAuth()
  const [form, setForm] = useState({
    name: user?.name || '', email: user?.email || '',
    photoUrl: user?.photoUrl || '', languagePref: user?.languagePref || 'en',
  })
  const [msg, setMsg] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    const updated = await userApi.update(user.id, form)
    updateUser(updated)
    setMsg('Profile updated!')
    setTimeout(() => setMsg(''), 3000)
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">Profile Settings</h1>
      {msg && <div className="bg-green-50 text-green-700 p-3 rounded-lg mb-4">{msg}</div>}
      <form onSubmit={submit} className="card space-y-4">
        {form.photoUrl && (
          <img src={form.photoUrl} alt="profile"
            className="w-24 h-24 rounded-full object-cover mx-auto" />
        )}
        <input className="input-field" placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="input-field" placeholder="Email" disabled value={form.email} />
        <input className="input-field" placeholder="Photo URL"
          value={form.photoUrl}
          onChange={(e) => setForm({ ...form, photoUrl: e.target.value })} />
        <select className="input-field" value={form.languagePref}
          onChange={(e) => setForm({ ...form, languagePref: e.target.value })}>
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="hi">Hindi</option>
        </select>
        <button type="submit" className="btn-primary w-full">Save Changes</button>
      </form>
    </div>
  )
}

export default ProfilePage