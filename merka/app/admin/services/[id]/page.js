'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { createClient } from '@/lib/supabase/client'
import ImageUpload from '../../components/ImageUpload'

const RichTextEditor = dynamic(() => import('../../components/RichTextEditor'), { ssr: false })
const SectionsEditor = dynamic(() => import('../../components/SectionsEditor'), { ssr: false })

export default function EditServicePage({ params }) {
  const { id } = use(params)
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    full_description: '',
    sections: [],
    icon: '⚙️',
    gradient: 'from-[#041533] to-[#877051]',
    features: [],
    benefits: [],
    process_steps: [],
    image: '',
    display_order: 0,
    published: false,
    meta_title: '',
    meta_description: '',
  })
  const [featureInput, setFeatureInput] = useState('')
  const [benefitInput, setBenefitInput] = useState('')
  const [stepTitle, setStepTitle] = useState('')
  const [stepDesc, setStepDesc] = useState('')

  useEffect(() => {
    fetchService()
  }, [id])

  const fetchService = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      if (data) {
        setFormData({
          ...data,
          sections: data.sections || [],
          features: data.features || [],
          benefits: data.benefits || [],
          process_steps: data.process_steps || [],
        })
      }
    } catch (error) {
      console.error('Error fetching service:', error)
      alert('Failed to load service')
      router.push('/admin/services')
    } finally {
      setLoading(false)
    }
  }

  const generateSlug = (title) => title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim()

  const handleTitleChange = (e) => {
    const title = e.target.value
    setFormData({ ...formData, title, slug: generateSlug(title) })
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value })
  }

  const handleContentChange = (content) => {
    setFormData({ ...formData, full_description: content })
  }

  const addToArray = (field, value, setter) => {
    if (value.trim() && !formData[field].includes(value.trim())) {
      setFormData({ ...formData, [field]: [...formData[field], value.trim()] })
      setter('')
    }
  }

  const removeFromArray = (field, item) => {
    setFormData({ ...formData, [field]: formData[field].filter((i) => i !== item) })
  }

  const addProcessStep = () => {
    if (stepTitle.trim()) {
      setFormData({
        ...formData,
        process_steps: [...formData.process_steps, { title: stepTitle, description: stepDesc }],
      })
      setStepTitle('')
      setStepDesc('')
    }
  }

  const removeProcessStep = (index) => {
    setFormData({
      ...formData,
      process_steps: formData.process_steps.filter((_, i) => i !== index),
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const { error } = await supabase
        .from('services')
        .update(formData)
        .eq('id', id)

      if (error) throw error
      router.push('/admin/services')
    } catch (error) {
      console.error('Error updating service:', error)
      alert('Failed to update service: ' + error.message)
    } finally {
      setSaving(false)
    }
  }

  const icons = ['💡', '📐', '🏗️', '📋', '📄', '✅', '🎨', '🔧', '📊', '🏠', '🏢', '🌆']

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
        <h1 className="text-3xl font-serif font-bold text-gray-900">Edit Service</h1>
        <button onClick={() => router.back()} className="text-gray-600 hover:text-gray-900 flex items-center">
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
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Description</label>
            <RichTextEditor
              content={formData.full_description}
              onChange={handleContentChange}
              placeholder="Detailed service description..."
            />
          </div>
        </div>

        {/* Content Sections */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <SectionsEditor
            sections={formData.sections}
            onChange={(sections) => setFormData({ ...formData, sections })}
            folder="services/sections"
          />
        </div>

        {/* Appearance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
          <h2 className="text-lg font-semibold text-gray-900">Appearance</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
              <div className="flex gap-2 flex-wrap">
                {icons.map((icon) => (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => setFormData({ ...formData, icon })}
                    className={`w-10 h-10 rounded-lg text-xl flex items-center justify-center transition-all ${
                      formData.icon === icon ? 'bg-[#041533] ring-2 ring-[#877051]' : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>
            <ImageUpload
              value={formData.image}
              onChange={(url) => setFormData({ ...formData, image: url })}
              folder="services"
              label="Service Image"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Display Order</label>
            <input
              type="number"
              name="display_order"
              value={formData.display_order}
              onChange={handleChange}
              className="w-24 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#877051] focus:border-transparent"
            />
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Features</h2>
          <div className="flex gap-2 flex-wrap">
            {formData.features.map((feature) => (
              <span key={feature} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
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
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
              placeholder="Add feature"
            />
            <button type="button" onClick={() => addToArray('features', featureInput, setFeatureInput)} className="px-3 py-2 bg-gray-200 rounded-lg text-sm">Add</button>
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Benefits</h2>
          <div className="flex gap-2 flex-wrap">
            {formData.benefits.map((benefit) => (
              <span key={benefit} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                {benefit}
                <button type="button" onClick={() => removeFromArray('benefits', benefit)} className="ml-2">×</button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={benefitInput}
              onChange={(e) => setBenefitInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addToArray('benefits', benefitInput, setBenefitInput))}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
              placeholder="Add benefit"
            />
            <button type="button" onClick={() => addToArray('benefits', benefitInput, setBenefitInput)} className="px-3 py-2 bg-gray-200 rounded-lg text-sm">Add</button>
          </div>
        </div>

        {/* Process Steps */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Process Steps</h2>
          <div className="space-y-2">
            {formData.process_steps.map((step, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <span className="w-6 h-6 flex items-center justify-center bg-[#041533] text-white rounded-full text-sm">{index + 1}</span>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{step.title}</p>
                  {step.description && <p className="text-sm text-gray-600">{step.description}</p>}
                </div>
                <button type="button" onClick={() => removeProcessStep(index)} className="text-red-600 hover:text-red-800">×</button>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <input
              type="text"
              value={stepTitle}
              onChange={(e) => setStepTitle(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              placeholder="Step title"
            />
            <input
              type="text"
              value={stepDesc}
              onChange={(e) => setStepDesc(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              placeholder="Step description (optional)"
            />
            <button type="button" onClick={addProcessStep} className="px-3 py-2 bg-gray-200 rounded-lg text-sm">Add Step</button>
          </div>
        </div>

        {/* SEO */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
          <h2 className="text-lg font-semibold text-gray-900">SEO Settings</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Meta Title</label>
            <input
              type="text"
              name="meta_title"
              value={formData.meta_title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#877051] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
            <textarea
              name="meta_description"
              value={formData.meta_description}
              onChange={handleChange}
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#877051] focus:border-transparent"
            />
          </div>
        </div>

        {/* Publishing */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="published"
                checked={formData.published}
                onChange={handleChange}
                className="h-4 w-4 text-[#877051] focus:ring-[#877051] border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">Published</span>
            </label>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-[#041533] text-white rounded-lg hover:bg-[#0a2a5c] transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Update Service'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
