'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function StylesPage() {
  const [styles, setStyles] = useState([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => { fetchStyles() }, [])

  const fetchStyles = async () => {
    try {
      const { data, error } = await supabase.from('styles').select('*').order('display_order')
      if (error) throw error
      setStyles(data || [])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteStyle = async (id) => {
    if (!confirm('Delete this style?')) return
    try {
      await supabase.from('styles').delete().eq('id', id)
      fetchStyles()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const togglePublished = async (id, current) => {
    try {
      await supabase.from('styles').update({ published: !current }).eq('id', id)
      fetchStyles()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#041533]"></div></div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-serif font-bold text-gray-900">Architectural Styles</h1>
        <Link href="/admin/styles/new" className="bg-[#041533] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#0a2a5c] flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          New Style
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {styles.map((style) => (
          <div key={style.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <span className="text-3xl mr-3">{style.icon || '🏛️'}</span>
                <div>
                  <h3 className="font-semibold text-gray-900">{style.title}</h3>
                  <p className="text-sm text-gray-500">{style.slug}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${style.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                {style.published ? 'Published' : 'Draft'}
              </span>
            </div>
            <p className="text-sm text-gray-600 line-clamp-2 mb-4">{style.short_description}</p>
            <div className="flex items-center justify-end gap-2">
              <button onClick={() => togglePublished(style.id, style.published)} className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              </button>
              <Link href={`/admin/styles/${style.id}`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
              </Link>
              <button onClick={() => deleteStyle(style.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
            </div>
          </div>
        ))}
        {styles.length === 0 && <p className="col-span-full text-center py-8 text-gray-500 bg-white rounded-xl">No styles yet</p>}
      </div>
    </div>
  )
}
