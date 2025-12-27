'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function ContactsPage() {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedContact, setSelectedContact] = useState(null)
  const [filter, setFilter] = useState('all')
  const supabase = createClient()

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setContacts(data || [])
    } catch (error) {
      console.error('Error fetching contacts:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id, status) => {
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .update({ status })
        .eq('id', id)

      if (error) throw error
      fetchContacts()
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const deleteContact = async (id) => {
    if (!confirm('Are you sure you want to delete this submission?')) return

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .delete()
        .eq('id', id)

      if (error) throw error
      setSelectedContact(null)
      fetchContacts()
    } catch (error) {
      console.error('Error deleting contact:', error)
    }
  }

  const filteredContacts = contacts.filter((c) => 
    filter === 'all' || c.status === filter
  )

  const statusColors = {
    new: 'bg-blue-100 text-blue-800',
    read: 'bg-gray-100 text-gray-800',
    replied: 'bg-green-100 text-green-800',
    archived: 'bg-yellow-100 text-yellow-800',
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#041533]"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-bold text-gray-900">Contact Submissions</h1>
        <p className="mt-1 text-gray-600">View and manage contact form submissions</p>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {['all', 'new', 'read', 'replied', 'archived'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${
              filter === f ? 'bg-[#041533] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact List */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="max-h-[600px] overflow-y-auto">
            {filteredContacts.length === 0 ? (
              <p className="p-6 text-center text-gray-500">No submissions found</p>
            ) : (
              filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => {
                    setSelectedContact(contact)
                    if (contact.status === 'new') updateStatus(contact.id, 'read')
                  }}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedContact?.id === contact.id ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-gray-900 truncate">{contact.name}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[contact.status] || statusColors.new}`}>
                      {contact.status || 'new'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{contact.email}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(contact.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Contact Details */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          {selectedContact ? (
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{selectedContact.name}</h2>
                  <p className="text-gray-600">{selectedContact.email}</p>
                  {selectedContact.phone && (
                    <p className="text-gray-600">{selectedContact.phone}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <select
                    value={selectedContact.status || 'new'}
                    onChange={(e) => updateStatus(selectedContact.id, e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="new">New</option>
                    <option value="read">Read</option>
                    <option value="replied">Replied</option>
                    <option value="archived">Archived</option>
                  </select>
                  <button
                    onClick={() => deleteContact(selectedContact.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {selectedContact.project_type && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Project Type</label>
                    <p className="text-gray-900">{selectedContact.project_type}</p>
                  </div>
                )}
                {selectedContact.budget && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Budget</label>
                    <p className="text-gray-900">{selectedContact.budget}</p>
                  </div>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Message</label>
                <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedContact.message || 'No message provided'}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Submitted</label>
                <p className="text-gray-900">
                  {new Date(selectedContact.created_at).toLocaleString()}
                </p>
              </div>

              <div className="flex gap-2">
                <a
                  href={`mailto:${selectedContact.email}`}
                  className="flex-1 bg-[#041533] text-white py-2 px-4 rounded-lg font-medium hover:bg-[#0a2a5c] transition-colors text-center"
                >
                  Reply via Email
                </a>
                {selectedContact.phone && (
                  <a
                    href={`tel:${selectedContact.phone}`}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                  >
                    Call
                  </a>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-500">
              Select a submission to view details
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
