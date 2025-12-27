'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function TeamPage() {
  const [team, setTeam] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [editingMember, setEditingMember] = useState(null)
  const [formData, setFormData] = useState({
    name: '', position: '', bio: '', image: '', linkedin: '', email: '', display_order: 0, published: true
  })
  const supabase = createClient()
  const fileInputRef = useRef(null)

  useEffect(() => { fetchTeam() }, [])

  const fetchTeam = async () => {
    try {
      const { data, error } = await supabase.from('team_members').select('*').order('display_order')
      if (error) throw error
      setTeam(data || [])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `team-${Date.now()}.${fileExt}`
      const filePath = `team/${fileName}`

      const { error: uploadError } = await supabase.storage.from('media').upload(filePath, file)
      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(filePath)
      setFormData({ ...formData, image: publicUrl })
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to upload image: ' + error.message)
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingMember) {
        await supabase.from('team_members').update(formData).eq('id', editingMember.id)
      } else {
        await supabase.from('team_members').insert([formData])
      }
      setEditingMember(null)
      setFormData({ name: '', position: '', bio: '', image: '', linkedin: '', email: '', display_order: 0, published: true })
      fetchTeam()
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to save')
    }
  }

  const deleteMember = async (id) => {
    if (!confirm('Delete this team member?')) return
    try {
      await supabase.from('team_members').delete().eq('id', id)
      fetchTeam()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const editMember = (member) => {
    setEditingMember(member)
    setFormData(member)
  }

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#041533]"></div></div>

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-serif font-bold text-gray-900">Team Members</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-4">{editingMember ? 'Edit Member' : 'Add Member'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Name *" required className="w-full px-4 py-2 border rounded-lg" />
            <input type="text" value={formData.position} onChange={(e) => setFormData({...formData, position: e.target.value})} placeholder="Position" className="w-full px-4 py-2 border rounded-lg" />
            <textarea value={formData.bio} onChange={(e) => setFormData({...formData, bio: e.target.value})} placeholder="Bio" rows={3} className="w-full px-4 py-2 border rounded-lg" />
            
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Profile Photo</label>
              <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {uploading ? (
                  <><svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Uploading...</>
                ) : (
                  <><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> {formData.image ? 'Change Photo' : 'Choose Photo'}</>
                )}
              </button>
              {formData.image && (
                <div className="mt-2 flex items-center gap-2">
                  <img src={formData.image} alt="Preview" className="w-16 h-16 object-cover rounded-full" />
                  <button type="button" onClick={() => setFormData({...formData, image: ''})} className="text-red-500 text-sm hover:underline">Remove</button>
                </div>
              )}
            </div>

            <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="Email" className="w-full px-4 py-2 border rounded-lg" />
            <input type="url" value={formData.linkedin} onChange={(e) => setFormData({...formData, linkedin: e.target.value})} placeholder="LinkedIn URL" className="w-full px-4 py-2 border rounded-lg" />
            <input type="number" value={formData.display_order} onChange={(e) => setFormData({...formData, display_order: parseInt(e.target.value)})} placeholder="Order" className="w-full px-4 py-2 border rounded-lg" />
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={formData.published} onChange={(e) => setFormData({...formData, published: e.target.checked})} />
              <span className="text-sm">Published</span>
            </label>
            <div className="flex gap-2">
              <button type="submit" className="flex-1 bg-[#041533] text-white py-2 rounded-lg font-medium hover:bg-[#0a2a5c]">
                {editingMember ? 'Update' : 'Add'}
              </button>
              {editingMember && (
                <button type="button" onClick={() => { setEditingMember(null); setFormData({ name: '', position: '', bio: '', image: '', linkedin: '', email: '', display_order: 0, published: true }) }} className="px-4 py-2 bg-gray-200 rounded-lg">Cancel</button>
              )}
            </div>
          </form>
        </div>

        {/* List */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {team.map((member) => (
            <div key={member.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center gap-4">
                {member.image ? (
                  <img src={member.image} alt={member.name} className="w-16 h-16 rounded-full object-cover" />
                ) : (
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-2xl">{member.name?.[0]}</div>
                )}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-sm text-gray-500">{member.position}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${member.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {member.published ? 'Published' : 'Draft'}
                  </span>
                </div>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <button onClick={() => editMember(member)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                </button>
                <button onClick={() => deleteMember(member.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
