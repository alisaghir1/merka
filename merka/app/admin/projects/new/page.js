'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { createClient } from '@/lib/supabase/client'
import ImageUpload, { GalleryUpload } from '../../components/ImageUpload'

const RichTextEditor = dynamic(() => import('../../components/RichTextEditor'), { ssr: false })
const SectionsEditor = dynamic(() => import('../../components/SectionsEditor'), { ssr: false })

export default function NewProjectPage() {
  const router = useRouter()
  const supabase = createClient()
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: '',
    location: '',
    area: '',
    year: new Date().getFullYear().toString(),
    status: 'In Design',
    image: '',
    description: '',
    full_description: '',
    sections: [],
    services: [],
    tags: [],
    gallery: [],
    features: [],
    client: '',
    budget: '',
    timeline: '',
    featured: false,
    published: false,
    display_order: 0,
    meta_title: '',
    meta_description: '',
  })
  const [tagInput, setTagInput] = useState('')
  const [serviceInput, setServiceInput] = useState('')
  const [featureInput, setFeatureInput] = useState('')

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const handleTitleChange = (e) => {
    const title = e.target.value
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title),
    })
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const handleContentChange = (content) => {
    setFormData({ ...formData, full_description: content })
  }

  const addToArray = (field, inputValue, setInputValue) => {
    if (inputValue.trim() && !formData[field].includes(inputValue.trim())) {
      setFormData({
        ...formData,
        [field]: [...formData[field], inputValue.trim()],
      })
      setInputValue('')
    }
  }

  const removeFromArray = (field, item) => {
    setFormData({
      ...formData,
      [field]: formData[field].filter((i) => i !== item),
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)

    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([formData])
        .select()

      if (error) throw error

      router.push('/admin/projects')
    } catch (error) {
      console.error('Error creating project:', error)
      alert('Failed to create project: ' + error.message)
    } finally {
      setSaving(false)
    }
  }

  const categories = ['residential', 'commercial', 'hospitality', 'mixed-use', 'institutional', 'cultural']
  const statuses = ['In Design', 'Under Construction', 'Completed', 'On Hold']

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900">New Project</h1>
          <p className="mt-1 text-gray-600">Add a new project to your portfolio</p>
        </div>
        <button
          onClick={() => router.back()}
          className="text-gray-600 hover:text-gray-900 flex items-center"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
          <h2 className="text-lg font-semibold text-gray-900">Basic Information</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleTitleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#877051] focus:border-transparent"
                placeholder="Project title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Slug *</label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#877051] focus:border-transparent"
                placeholder="project-url-slug"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#877051] focus:border-transparent"
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="capitalize">{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#877051] focus:border-transparent"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#877051] focus:border-transparent"
                placeholder="Dubai, UAE"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Area</label>
              <input
                type="text"
                name="area"
                value={formData.area}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#877051] focus:border-transparent"
                placeholder="10,000 sq ft"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
              <input
                type="text"
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#877051] focus:border-transparent"
                placeholder="2024"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Client</label>
              <input
                type="text"
                name="client"
                value={formData.client}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#877051] focus:border-transparent"
                placeholder="Client name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Budget</label>
              <input
                type="text"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#877051] focus:border-transparent"
                placeholder="$1M - $2M"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Timeline</label>
              <input
                type="text"
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#877051] focus:border-transparent"
                placeholder="18 months"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Short Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#877051] focus:border-transparent"
              placeholder="Brief project description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Description</label>
            <RichTextEditor
              content={formData.full_description}
              onChange={handleContentChange}
              placeholder="Detailed project description..."
            />
          </div>
        </div>

        {/* Content Sections */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <SectionsEditor
            sections={formData.sections}
            onChange={(sections) => setFormData({ ...formData, sections })}
            folder="projects/sections"
          />
        </div>

        {/* Images */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
          <h2 className="text-lg font-semibold text-gray-900">Images</h2>
          
          <ImageUpload
            value={formData.image}
            onChange={(url) => setFormData({ ...formData, image: url })}
            folder="projects"
            label="Main Image"
          />

          <GalleryUpload
            value={formData.gallery}
            onChange={(urls) => setFormData({ ...formData, gallery: urls })}
            folder="projects/gallery"
            label="Gallery Images"
          />
        </div>

        {/* Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Services */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Services</h2>
            <div className="flex gap-2 flex-wrap">
              {formData.services.map((service) => (
                <span
                  key={service}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                >
                  {service}
                  <button type="button" onClick={() => removeFromArray('services', service)} className="ml-2">×</button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={serviceInput}
                onChange={(e) => setServiceInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addToArray('services', serviceInput, setServiceInput))}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#877051] focus:border-transparent text-sm"
                placeholder="Add service"
              />
              <button
                type="button"
                onClick={() => addToArray('services', serviceInput, setServiceInput)}
                className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm"
              >
                Add
              </button>
            </div>
          </div>

          {/* Features */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Features</h2>
            <div className="flex gap-2 flex-wrap">
              {formData.features.map((feature) => (
                <span
                  key={feature}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
                >
                  {feature}
                  <button type="button" onClick={() => removeFromArray('features', feature)} className="ml-2">×</button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addToArray('features', featureInput, setFeatureInput))}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#877051] focus:border-transparent text-sm"
                placeholder="Add feature"
              />
              <button
                type="button"
                onClick={() => addToArray('features', featureInput, setFeatureInput)}
                className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm"
              >
                Add
              </button>
            </div>
          </div>

          {/* Tags */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Tags</h2>
            <div className="flex gap-2 flex-wrap">
              {formData.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[#877051] text-white"
                >
                  {tag}
                  <button type="button" onClick={() => removeFromArray('tags', tag)} className="ml-2">×</button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addToArray('tags', tagInput, setTagInput))}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#877051] focus:border-transparent text-sm"
                placeholder="Add tag"
              />
              <button
                type="button"
                onClick={() => addToArray('tags', tagInput, setTagInput)}
                className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Publishing & SEO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Publishing</h2>
            
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="published"
                checked={formData.published}
                onChange={handleChange}
                className="w-5 h-5 text-[#877051] border-gray-300 rounded focus:ring-[#877051]"
              />
              <span className="text-sm text-gray-700">Published</span>
            </label>
            
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="w-5 h-5 text-[#877051] border-gray-300 rounded focus:ring-[#877051]"
              />
              <span className="text-sm text-gray-700">Featured Project</span>
            </label>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Display Order</label>
              <input
                type="number"
                name="display_order"
                value={formData.display_order}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#877051] focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-[#041533] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#0a2a5c] transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Project'}
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">SEO</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Meta Title</label>
              <input
                type="text"
                name="meta_title"
                value={formData.meta_title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#877051] focus:border-transparent"
                placeholder="SEO title"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
              <textarea
                name="meta_description"
                value={formData.meta_description}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#877051] focus:border-transparent"
                placeholder="SEO description"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
