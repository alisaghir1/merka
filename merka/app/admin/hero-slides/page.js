'use client'

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function HeroSlidesPage() {
  const [slides, setSlides] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [editingSlide, setEditingSlide] = useState(null)
  const [activeTab, setActiveTab] = useState('en')
  const [formData, setFormData] = useState({
    title: '', title_ar: '', subtitle: '', subtitle_ar: '', image: '', link: '', display_order: 0, published: true
  })
  const supabase = createClient()
  const fileInputRef = useRef(null)

  useEffect(() => { fetchSlides() }, [])

  const fetchSlides = async () => {
    try {
      const { data, error } = await supabase.from('hero_slides').select('*').order('display_order')
      if (error) throw error
      setSlides(data || [])
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
      const fileName = `hero-${Date.now()}.${fileExt}`
      const filePath = `hero/${fileName}`

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
      if (editingSlide) {
        await supabase.from('hero_slides').update(formData).eq('id', editingSlide.id)
      } else {
        await supabase.from('hero_slides').insert([formData])
      }
      setEditingSlide(null)
      setFormData({ title: '', title_ar: '', subtitle: '', subtitle_ar: '', image: '', link: '', display_order: 0, published: true })
      fetchSlides()
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to save')
    }
  }

  const deleteSlide = async (id) => {
    if (!confirm('Delete this slide?')) return
    try {
      await supabase.from('hero_slides').delete().eq('id', id)
      fetchSlides()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#041533]"></div></div>

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-serif font-bold text-gray-900">Hero Slides</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-4">{editingSlide ? 'Edit Slide' : 'Add Slide'}</h2>
          
          {/* Language Tabs */}
          <div className="flex gap-2 mb-4">
            <button type="button" onClick={() => setActiveTab('en')} className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${activeTab === 'en' ? 'bg-[#041533] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>🇬🇧 English</button>
            <button type="button" onClick={() => setActiveTab('ar')} className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${activeTab === 'ar' ? 'bg-[#041533] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>🇸🇦 العربية</button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {activeTab === 'en' ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title (English)</label>
                  <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} placeholder="Title" className="w-full px-4 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle (English)</label>
                  <input type="text" value={formData.subtitle} onChange={(e) => setFormData({...formData, subtitle: e.target.value})} placeholder="Subtitle" className="w-full px-4 py-2 border rounded-lg" />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 text-right">العنوان (بالعربية)</label>
                  <input type="text" value={formData.title_ar} onChange={(e) => setFormData({...formData, title_ar: e.target.value})} placeholder="العنوان" dir="rtl" className="w-full px-4 py-2 border rounded-lg text-right" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 text-right">العنوان الفرعي (بالعربية)</label>
                  <input type="text" value={formData.subtitle_ar} onChange={(e) => setFormData({...formData, subtitle_ar: e.target.value})} placeholder="العنوان الفرعي" dir="rtl" className="w-full px-4 py-2 border rounded-lg text-right" />
                </div>
              </>
            )}
            
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Slide Image *</label>
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
                  <><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> {formData.image ? 'Change Image' : 'Choose Image'}</>
                )}
              </button>
              {formData.image && (
                <div className="mt-2 relative">
                  <img src={formData.image} alt="Preview" className="w-full h-32 object-cover rounded-lg" />
                  <button type="button" onClick={() => setFormData({...formData, image: ''})} className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">×</button>
                </div>
              )}
            </div>

            <input type="text" value={formData.link} onChange={(e) => setFormData({...formData, link: e.target.value})} placeholder="Link (optional)" className="w-full px-4 py-2 border rounded-lg" />
            <input type="number" value={formData.display_order} onChange={(e) => setFormData({...formData, display_order: parseInt(e.target.value)})} placeholder="Order" className="w-full px-4 py-2 border rounded-lg" />
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={formData.published} onChange={(e) => setFormData({...formData, published: e.target.checked})} />
              <span className="text-sm">Published</span>
            </label>
            <div className="flex gap-2">
              <button type="submit" className="flex-1 bg-[#041533] text-white py-2 rounded-lg font-medium hover:bg-[#0a2a5c]">
                {editingSlide ? 'Update' : 'Add'}
              </button>
              {editingSlide && (
                <button type="button" onClick={() => { setEditingSlide(null); setFormData({ title: '', title_ar: '', subtitle: '', subtitle_ar: '', image: '', link: '', display_order: 0, published: true }) }} className="px-4 py-2 bg-gray-200 rounded-lg">Cancel</button>
              )}
            </div>
          </form>
        </div>

        <div className="lg:col-span-2 space-y-4">
          {slides.map((slide) => (
            <div key={slide.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="flex">
                <img src={slide.image} alt={slide.title} className="w-48 h-32 object-cover" />
                <div className="flex-1 p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">{slide.title || 'No title'}</h3>
                      <p className="text-sm text-gray-500">{slide.subtitle}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${slide.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {slide.published ? 'Published' : 'Draft'}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => { setEditingSlide(slide); setFormData(slide) }} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                      </button>
                      <button onClick={() => deleteSlide(slide.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {slides.length === 0 && <p className="text-center py-8 text-gray-500 bg-white rounded-xl">No slides yet</p>}
        </div>
      </div>
    </div>
  )
}
