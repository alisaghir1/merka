'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function NewsletterPage() {
  const [subscribers, setSubscribers] = useState([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => { fetchSubscribers() }, [])

  const fetchSubscribers = async () => {
    try {
      const { data, error } = await supabase.from('newsletter_subscriptions').select('*').order('created_at', { ascending: false })
      if (error) throw error
      setSubscribers(data || [])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleSubscription = async (id, current) => {
    try {
      await supabase.from('newsletter_subscriptions').update({ subscribed: !current }).eq('id', id)
      fetchSubscribers()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const deleteSubscriber = async (id) => {
    if (!confirm('Delete this subscriber?')) return
    try {
      await supabase.from('newsletter_subscriptions').delete().eq('id', id)
      fetchSubscribers()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const exportCSV = () => {
    const csv = 'Email,Subscribed,Date\n' + subscribers.map(s => `${s.email},${s.subscribed},${s.created_at}`).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'newsletter-subscribers.csv'
    a.click()
  }

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#041533]"></div></div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900">Newsletter Subscribers</h1>
          <p className="text-gray-600">{subscribers.filter(s => s.subscribed).length} active subscribers</p>
        </div>
        <button onClick={exportCSV} className="bg-[#041533] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#0a2a5c]">
          Export CSV
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {subscribers.map((sub) => (
              <tr key={sub.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">{sub.email}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${sub.subscribed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {sub.subscribed ? 'Active' : 'Unsubscribed'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{new Date(sub.created_at).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => toggleSubscription(sub.id, sub.subscribed)} className="text-blue-600 hover:text-blue-800 mr-3">
                    {sub.subscribed ? 'Unsubscribe' : 'Resubscribe'}
                  </button>
                  <button onClick={() => deleteSubscriber(sub.id)} className="text-red-600 hover:text-red-800">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {subscribers.length === 0 && <p className="text-center py-8 text-gray-500">No subscribers yet</p>}
      </div>
    </div>
  )
}
