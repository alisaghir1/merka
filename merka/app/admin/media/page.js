'use client'

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function MediaPage() {
  const [media, setMedia] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const supabase = createClient()
  const fileInputRef = useRef(null)

  useEffect(() => { fetchMedia() }, [])

  const fetchMedia = async () => {
    try {
      const { data, error } = await supabase.from('media').select('*').order('created_at', { ascending: false })
      if (error) throw error
      setMedia(data || [])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (e) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    try {
      for (const file of files) {
        const fileExt = file.name.split('.').pop()
        const fileName = `media-${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`
        const filePath = `uploads/${fileName}`

        const { error: uploadError } = await supabase.storage.from('media').upload(filePath, file)
        if (uploadError) throw uploadError

        const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(filePath)
        
        await supabase.from('media').insert([{
          name: file.name,
          url: publicUrl,
          type: file.type.startsWith('image/') ? 'image' : 'file'
        }])
      }
      fetchMedia()
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to upload: ' + error.message)
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const deleteMedia = async (id, url) => {
    if (!confirm('Delete this media?')) return
    try {
      // Try to delete from storage if it's a Supabase URL
      if (url.includes('supabase')) {
        const path = url.split('/media/')[1]
        if (path) {
          await supabase.storage.from('media').remove([path])
        }
      }
      await supabase.from('media').delete().eq('id', id)
      fetchMedia()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const copyUrl = (url) => {
    navigator.clipboard.writeText(url)
    alert('URL copied to clipboard!')
  }

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#041533]"></div></div>

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-serif font-bold text-gray-900">Media Library</h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">Upload Images</h2>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept="image/*"
          multiple
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="w-full border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-[#877051] hover:bg-gray-50 transition-colors disabled:opacity-50 flex flex-col items-center gap-2"
        >
          {uploading ? (
            <>
              <svg className="w-8 h-8 animate-spin text-[#877051]" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-gray-600">Uploading...</span>
            </>
          ) : (
            <>
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-gray-600">Click to upload images</span>
              <span className="text-sm text-gray-400">You can select multiple files</span>
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {media.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden group">
            <div className="relative aspect-square">
              <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button onClick={() => copyUrl(item.url)} className="p-2 bg-white rounded-lg text-gray-700 hover:bg-gray-100">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                </button>
                <button onClick={() => deleteMedia(item.id, item.url)} className="p-2 bg-red-500 rounded-lg text-white hover:bg-red-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            </div>
            <div className="p-2">
              <p className="text-xs text-gray-600 truncate">{item.name}</p>
            </div>
          </div>
        ))}
      </div>
      {media.length === 0 && <p className="text-center py-8 text-gray-500">No media yet</p>}
    </div>
  )
}
