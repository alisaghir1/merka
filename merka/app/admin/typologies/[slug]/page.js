'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { createClient } from '@/lib/supabase/client'
import ImageUpload, { GalleryUpload } from '../../components/ImageUpload'

const RichTextEditor = dynamic(() => import('../../components/RichTextEditor'), { ssr: false })

export default function EditTypologyPage({ params }) {
  const { slug } = use(params)
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    title: '', slug: '', icon: '🏢', gradient: 'from-slate-600 to-slate-800',
    short_description: '', description: '', extended_description: '',
    features: [], applications: [], requirements: [], considerations: [],
    images: { hero: '', gallery: [], featured: '' },
    display_order: 0, published: false, meta_title: '', meta_description: ''
  })
  const [inputValues, setInputValues] = useState({ features: '', applications: '', requirements: '', considerations: '', gallery: '' })

  useEffect(() => {
    fetchTypology()
  }, [slug])

  const fetchTypology = async () => {
    try {
      const { data, error } = await supabase
        .from('typologies')
        .select('*')
        .eq('slug', slug)
        .single()

      if (error) throw error
      if (data) {
        setFormData({
          ...data,
          features: data.features || [],
          applications: data.applications || [],
          requirements: data.requirements || [],
          considerations: data.considerations || [],
          images: data.images || { hero: '', gallery: [], featured: '' }
        })
      }
    } catch (error) {
      console.error('Error fetching typology:', error)
      alert('Failed to load typology')
      router.push('/admin/typologies')
    } finally {
      setLoading(false)
    }
  }

  const generateSlug = (t) => t.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').trim()

  const handleTitleChange = (e) => setFormData({ ...formData, title: e.target.value, slug: generateSlug(e.target.value) })

  const addToArray = (field) => {
    if (inputValues[field].trim()) {
      setFormData({ ...formData, [field]: [...formData[field], inputValues[field].trim()] })
      setInputValues({ ...inputValues, [field]: '' })
    }
  }

  const removeFromArray = (field, item) => setFormData({ ...formData, [field]: formData[field].filter(i => i !== item) })

  const addGalleryImage = () => {
    if (inputValues.gallery.trim()) {
      setFormData({
        ...formData,
        images: { ...formData.images, gallery: [...(formData.images.gallery || []), inputValues.gallery.trim()] }
      })
      setInputValues({ ...inputValues, gallery: '' })
    }
  }

  const removeGalleryImage = (url) => {
    setFormData({
      ...formData,
      images: { ...formData.images, gallery: formData.images.gallery.filter(i => i !== url) }
    })
  }

  const handleContentChange = (content) => {
    setFormData({ ...formData, extended_description: content })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const { error } = await supabase
        .from('typologies')
        .update(formData)
        .eq('slug', slug)

      if (error) throw error
      router.push('/admin/typologies')
    } catch (error) {
      console.error('Error updating typology:', error)
      alert('Failed to update typology: ' + error.message)
    } finally {
      setSaving(false)
    }
  }

  const icons = ['🏢', '🏠', '🏨', '🏥', '🏫', '🏛️', '🕌', '🏪', '🏭', '🏟️', '🌳', '🏖️']
  const arrayFields = ['features', 'applications', 'requirements', 'considerations']
  const fieldLabels = {
    features: 'Key Features',
    applications: 'Applications',
    requirements: 'Requirements',
    considerations: 'Design Considerations'
  }
  const fieldColors = {
    features: 'bg-blue-100 text-blue-800',
    applications: 'bg-green-100 text-green-800',
    requirements: 'bg-orange-100 text-orange-800',
    considerations: 'bg-purple-100 text-purple-800'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#041533]"></div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-serif font-bold text-gray-900">Edit Typology</h1>
        <button onClick={() => router.back()} className="text-gray-600 hover:text-gray-900">← Back</button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white rounded-xl shadow-sm border p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Basic Information</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
              <input type="text" value={formData.title} onChange={handleTitleChange} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#877051]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Slug *</label>
              <input type="text" value={formData.slug} onChange={(e) => setFormData({...formData, slug: e.target.value})} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#877051]" />
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Short Description</label>
            <textarea value={formData.short_description} onChange={(e) => setFormData({...formData, short_description: e.target.value})} rows={2} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#877051]" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} rows={3} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#877051]" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Extended Description (Rich Text)</label>
            <RichTextEditor
              content={formData.extended_description}
              onChange={handleContentChange}
              placeholder="Detailed typology description..."
            />
          </div>
        </div>

        {/* Images */}
        <div className="bg-white rounded-xl shadow-sm border p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Images</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <ImageUpload
              value={formData.images?.hero || ''}
              onChange={(url) => setFormData({...formData, images: {...formData.images, hero: url}})}
              folder="typologies"
              label="Hero Image"
              previewHeight="h-32"
            />
            <ImageUpload
              value={formData.images?.featured || ''}
              onChange={(url) => setFormData({...formData, images: {...formData.images, featured: url}})}
              folder="typologies"
              label="Featured Image"
              previewHeight="h-32"
            />
          </div>

          <GalleryUpload
            value={formData.images?.gallery || []}
            onChange={(urls) => setFormData({...formData, images: {...formData.images, gallery: urls}})}
            folder="typologies/gallery"
            label="Gallery Images"
          />
        </div>

        {/* Array Fields */}
        {arrayFields.map(field => (
          <div key={field} className="bg-white rounded-xl shadow-sm border p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">{fieldLabels[field]}</h2>
            <div className="flex gap-2 flex-wrap">
              {formData[field].map((item) => (
                <span key={item} className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${fieldColors[field]}`}>
                  {item}
                  <button type="button" onClick={() => removeFromArray(field, item)} className="ml-2">×</button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValues[field]}
                onChange={(e) => setInputValues({...inputValues, [field]: e.target.value})}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addToArray(field))}
                className="flex-1 px-3 py-2 border rounded-lg text-sm"
                placeholder={`Add ${fieldLabels[field].toLowerCase()}`}
              />
              <button type="button" onClick={() => addToArray(field)} className="px-3 py-2 bg-gray-200 rounded-lg text-sm">Add</button>
            </div>
          </div>
        ))}

        {/* SEO */}
        <div className="bg-white rounded-xl shadow-sm border p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">SEO Settings</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Meta Title</label>
            <input type="text" value={formData.meta_title} onChange={(e) => setFormData({...formData, meta_title: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
            <textarea value={formData.meta_description} onChange={(e) => setFormData({...formData, meta_description: e.target.value})} rows={2} className="w-full px-4 py-2 border rounded-lg" />
          </div>
        </div>

        {/* Publishing */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <label className="flex items-center">
                <input type="checkbox" checked={formData.published} onChange={(e) => setFormData({...formData, published: e.target.checked})} className="h-4 w-4 text-[#877051] rounded" />
                <span className="ml-2 text-sm text-gray-700">Published</span>
              </label>
              <div>
                <label className="text-sm text-gray-700 mr-2">Order:</label>
                <input type="number" value={formData.display_order} onChange={(e) => setFormData({...formData, display_order: parseInt(e.target.value) || 0})} className="w-20 px-2 py-1 border rounded-lg text-sm" />
              </div>
            </div>
            <button type="submit" disabled={saving} className="px-6 py-2 bg-[#041533] text-white rounded-lg hover:bg-[#0a2a5c] disabled:opacity-50">
              {saving ? 'Saving...' : 'Update Typology'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
