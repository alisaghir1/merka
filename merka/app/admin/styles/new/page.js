'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { createClient } from '@/lib/supabase/client'
import ImageUpload from '../../components/ImageUpload'

const RichTextEditor = dynamic(() => import('../../components/RichTextEditor'), { ssr: false })

export default function NewStylePage() {
  const router = useRouter()
  const supabase = createClient()
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState('en')
  const [formData, setFormData] = useState({
    title: '', title_ar: '', slug: '', icon: '🏛️', gradient: 'from-slate-600 to-slate-800',
    short_description: '', short_description_ar: '', description: '', description_ar: '', extended_description: '', extended_description_ar: '',
    features: [], features_ar: [], applications: [], applications_ar: [], materials: [], materials_ar: [], compliance: [], compliance_ar: [],
    images: { hero: '', gallery: [], featured: '' },
    display_order: 0, published: false, meta_title: '', meta_description: ''
  })
  const [inputValues, setInputValues] = useState({ features: '', applications: '', materials: '', compliance: '', features_ar: '', applications_ar: '', materials_ar: '', compliance_ar: '' })

  const generateSlug = (t) => t.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').trim()

  const handleTitleChange = (e) => setFormData({ ...formData, title: e.target.value, slug: generateSlug(e.target.value) })

  const addToArray = (field) => {
    if (inputValues[field].trim()) {
      setFormData({ ...formData, [field]: [...formData[field], inputValues[field].trim()] })
      setInputValues({ ...inputValues, [field]: '' })
    }
  }

  const removeFromArray = (field, item) => setFormData({ ...formData, [field]: formData[field].filter(i => i !== item) })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const { error } = await supabase.from('styles').insert([formData])
      if (error) throw error
      router.push('/admin/styles')
    } catch (error) {
      alert('Failed: ' + error.message)
    } finally {
      setSaving(false)
    }
  }

  const icons = ['🏗️', '🕌', '🏛️', '🌿', '🏙️', '🏠', '🏢', '✨', '🎨', '🔷']

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-serif font-bold text-gray-900">New Style</h1>
        <button onClick={() => router.back()} className="text-gray-600 hover:text-gray-900">← Back</button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Language Tabs */}
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <div className="flex gap-2">
            <button type="button" onClick={() => setActiveTab('en')} className={`px-6 py-3 rounded-lg font-medium transition-all ${activeTab === 'en' ? 'bg-[#041533] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>🇬🇧 English</button>
            <button type="button" onClick={() => setActiveTab('ar')} className={`px-6 py-3 rounded-lg font-medium transition-all ${activeTab === 'ar' ? 'bg-[#041533] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>🇸🇦 العربية</button>
          </div>
          <p className="text-sm text-gray-500 mt-2">{activeTab === 'en' ? 'Enter content in English' : 'أدخل المحتوى بالعربية'}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6 space-y-4">
          {activeTab === 'en' ? (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title (English) *</label>
                  <input type="text" value={formData.title} onChange={handleTitleChange} required className="w-full px-4 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Slug *</label>
                  <input type="text" value={formData.slug} onChange={(e) => setFormData({...formData, slug: e.target.value})} required className="w-full px-4 py-2 border rounded-lg" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                <div className="flex gap-2 flex-wrap">
                  {icons.map(i => (
                    <button key={i} type="button" onClick={() => setFormData({...formData, icon: i})} className={`text-2xl p-2 rounded-lg border-2 ${formData.icon === i ? 'border-[#877051] bg-[#877051]/10' : 'border-gray-200'}`}>{i}</button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Short Description (English)</label>
                <textarea value={formData.short_description} onChange={(e) => setFormData({...formData, short_description: e.target.value})} rows={2} className="w-full px-4 py-2 border rounded-lg" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description (English)</label>
                <RichTextEditor content={formData.description} onChange={(c) => setFormData({...formData, description: c})} />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">العنوان (بالعربية)</label>
                <input type="text" value={formData.title_ar} onChange={(e) => setFormData({...formData, title_ar: e.target.value})} dir="rtl" className="w-full px-4 py-2 border rounded-lg text-right" placeholder="عنوان النمط" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">الوصف المختصر (بالعربية)</label>
                <textarea value={formData.short_description_ar} onChange={(e) => setFormData({...formData, short_description_ar: e.target.value})} rows={2} dir="rtl" className="w-full px-4 py-2 border rounded-lg text-right" placeholder="وصف مختصر" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">الوصف (بالعربية)</label>
                <RichTextEditor content={formData.description_ar} onChange={(c) => setFormData({...formData, description_ar: c})} dir="rtl" />
              </div>
            </>
          )}

          <ImageUpload
            value={formData.images.hero}
            onChange={(url) => setFormData({...formData, images: {...formData.images, hero: url}})}
            folder="styles"
            label="Hero Image"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          {activeTab === 'en' ? (
            ['features', 'applications', 'materials', 'compliance'].map(field => (
              <div key={field} className="bg-white rounded-xl shadow-sm border p-6 space-y-4">
                <h2 className="text-lg font-semibold capitalize">{field}</h2>
                <div className="flex gap-2 flex-wrap">
                  {formData[field].map(item => (
                    <span key={item} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100">
                      {item}<button type="button" onClick={() => removeFromArray(field, item)} className="ml-2">×</button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input type="text" value={inputValues[field]} onChange={(e) => setInputValues({...inputValues, [field]: e.target.value})} onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addToArray(field))} className="flex-1 px-3 py-2 border rounded-lg text-sm" placeholder={`Add ${field}`} />
                  <button type="button" onClick={() => addToArray(field)} className="px-3 py-2 bg-gray-200 rounded-lg text-sm">Add</button>
                </div>
              </div>
            ))
          ) : (
            ['features_ar', 'applications_ar', 'materials_ar', 'compliance_ar'].map(field => (
              <div key={field} className="bg-white rounded-xl shadow-sm border p-6 space-y-4">
                <h2 className="text-lg font-semibold text-right">{field === 'features_ar' ? 'المميزات' : field === 'applications_ar' ? 'التطبيقات' : field === 'materials_ar' ? 'المواد' : 'الامتثال'}</h2>
                <div className="flex gap-2 flex-wrap flex-row-reverse">
                  {(formData[field] || []).map(item => (
                    <span key={item} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100">
                      {item}<button type="button" onClick={() => removeFromArray(field, item)} className="ml-2">×</button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2 flex-row-reverse">
                  <input type="text" value={inputValues[field] || ''} onChange={(e) => setInputValues({...inputValues, [field]: e.target.value})} onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addToArray(field))} dir="rtl" className="flex-1 px-3 py-2 border rounded-lg text-sm text-right" placeholder={field === 'features_ar' ? 'أضف ميزة' : field === 'applications_ar' ? 'أضف تطبيق' : field === 'materials_ar' ? 'أضف مادة' : 'أضف امتثال'} />
                  <button type="button" onClick={() => addToArray(field)} className="px-3 py-2 bg-gray-200 rounded-lg text-sm">إضافة</button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border p-6 space-y-4">
            <label className="flex items-center gap-3">
              <input type="checkbox" checked={formData.published} onChange={(e) => setFormData({...formData, published: e.target.checked})} className="w-5 h-5" />
              <span>Published</span>
            </label>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Display Order</label>
              <input type="number" value={formData.display_order} onChange={(e) => setFormData({...formData, display_order: parseInt(e.target.value)})} className="w-full px-4 py-2 border rounded-lg" />
            </div>
            <button type="submit" disabled={saving} className="w-full bg-[#041533] text-white py-3 rounded-lg font-medium hover:bg-[#0a2a5c] disabled:opacity-50">
              {saving ? 'Saving...' : 'Save Style'}
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-6 space-y-4">
            <h2 className="text-lg font-semibold">SEO</h2>
            <input type="text" value={formData.meta_title} onChange={(e) => setFormData({...formData, meta_title: e.target.value})} placeholder="Meta Title" className="w-full px-4 py-2 border rounded-lg" />
            <textarea value={formData.meta_description} onChange={(e) => setFormData({...formData, meta_description: e.target.value})} placeholder="Meta Description" rows={3} className="w-full px-4 py-2 border rounded-lg" />
          </div>
        </div>
      </form>
    </div>
  )
}
