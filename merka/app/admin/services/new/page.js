'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { createClient } from '@/lib/supabase/client'
import ImageUpload from '../../components/ImageUpload'

const RichTextEditor = dynamic(() => import('../../components/RichTextEditor'), { ssr: false })
const SectionsEditor = dynamic(() => import('../../components/SectionsEditor'), { ssr: false })

export default function NewServicePage() {
  const router = useRouter()
  const supabase = createClient()
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState('en')
  const [formData, setFormData] = useState({
    title: '',
    title_ar: '',
    slug: '',
    description: '',
    description_ar: '',
    full_description: '',
    full_description_ar: '',
    sections: [],
    sections_ar: [],
    icon: '⚙️',
    gradient: 'from-[#041533] to-[#877051]',
    features: [],
    features_ar: [],
    benefits: [],
    benefits_ar: [],
    process_steps: [],
    process_steps_ar: [],
    image: '',
    display_order: 0,
    published: false,
    meta_title: '',
    meta_description: '',
  })
  const [featureInput, setFeatureInput] = useState('')
  const [featureInputAr, setFeatureInputAr] = useState('')
  const [benefitInput, setBenefitInput] = useState('')
  const [benefitInputAr, setBenefitInputAr] = useState('')
  const [stepTitle, setStepTitle] = useState('')
  const [stepDesc, setStepDesc] = useState('')
  const [stepTitleAr, setStepTitleAr] = useState('')
  const [stepDescAr, setStepDescAr] = useState('')

  const generateSlug = (title) => title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim()

  const handleTitleChange = (e) => {
    const title = e.target.value
    setFormData({ ...formData, title, slug: generateSlug(title) })
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value })
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

  // Sync sections structure between languages
  const handleSectionsChange = (sections) => {
    const newSectionsAr = sections.map((section, index) => {
      const existingArSection = formData.sections_ar[index] || {}
      return {
        ...section,
        title: existingArSection.title || '',
        content: existingArSection.content || '',
        image: section.image,
        type: section.type,
      }
    })
    setFormData({ ...formData, sections, sections_ar: newSectionsAr })
  }

  const handleSectionsArChange = (sections_ar) => {
    const syncedSectionsAr = sections_ar.map((section, index) => {
      const enSection = formData.sections[index] || {}
      return {
        ...section,
        image: enSection.image || section.image,
        type: enSection.type || section.type,
      }
    })
    setFormData({ ...formData, sections_ar: syncedSectionsAr })
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

  const addProcessStepAr = () => {
    if (stepTitleAr.trim()) {
      setFormData({
        ...formData,
        process_steps_ar: [...formData.process_steps_ar, { title: stepTitleAr, description: stepDescAr }],
      })
      setStepTitleAr('')
      setStepDescAr('')
    }
  }

  const removeProcessStep = (index) => {
    setFormData({
      ...formData,
      process_steps: formData.process_steps.filter((_, i) => i !== index),
    })
  }

  const removeProcessStepAr = (index) => {
    setFormData({
      ...formData,
      process_steps_ar: formData.process_steps_ar.filter((_, i) => i !== index),
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const { error } = await supabase.from('services').insert([formData])
      if (error) throw error
      router.push('/admin/services')
    } catch (error) {
      console.error('Error creating service:', error)
      alert('Failed to create service: ' + error.message)
    } finally {
      setSaving(false)
    }
  }

  const icons = ['💡', '📐', '🏗️', '📋', '📄', '✅', '🎨', '🔧', '📊', '🏠', '🏢', '🌆']

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-serif font-bold text-gray-900">New Service</h1>
        <button onClick={() => router.back()} className="text-gray-600 hover:text-gray-900 flex items-center">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Language Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('en')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'en'
                  ? 'bg-[#041533] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              🇬🇧 English
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('ar')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'ar'
                  ? 'bg-[#041533] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              🇸🇦 العربية
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {activeTab === 'en' ? 'Enter content in English' : 'أدخل المحتوى بالعربية'}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
          {activeTab === 'en' ? (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title (English) *</label>
                  <input type="text" name="title" value={formData.title} onChange={handleTitleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#877051] focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Slug *</label>
                  <input type="text" name="slug" value={formData.slug} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#877051] focus:border-transparent" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                <div className="flex gap-2 flex-wrap">
                  {icons.map((icon) => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => setFormData({ ...formData, icon })}
                      className={`text-2xl p-2 rounded-lg border-2 ${formData.icon === icon ? 'border-[#877051] bg-[#877051]/10' : 'border-gray-200 hover:border-gray-300'}`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Short Description (English)</label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows={2} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#877051] focus:border-transparent" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Description (English)</label>
                <RichTextEditor content={formData.full_description} onChange={(content) => setFormData({ ...formData, full_description: content })} />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">العنوان (بالعربية)</label>
                <input type="text" name="title_ar" value={formData.title_ar} onChange={handleChange} dir="rtl" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#877051] focus:border-transparent text-right" placeholder="عنوان الخدمة" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">الوصف المختصر (بالعربية)</label>
                <textarea name="description_ar" value={formData.description_ar} onChange={handleChange} rows={2} dir="rtl" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#877051] focus:border-transparent text-right" placeholder="وصف مختصر للخدمة" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">الوصف الكامل (بالعربية)</label>
                <RichTextEditor content={formData.full_description_ar} onChange={(content) => setFormData({ ...formData, full_description_ar: content })} dir="rtl" />
              </div>
            </>
          )}
        </div>

        {/* Content Sections */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          {activeTab === 'en' ? (
            <>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Sections (English)</h3>
              <p className="text-sm text-gray-500 mb-4">Sections are synced between languages - structure and images are shared, only text content differs.</p>
              <SectionsEditor
                sections={formData.sections}
                onChange={handleSectionsChange}
                folder="services/sections"
              />
            </>
          ) : (
            <>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 text-right">أقسام المحتوى (بالعربية)</h3>
              <p className="text-sm text-gray-500 mb-4 text-right">الأقسام متزامنة بين اللغتين - الهيكل والصور مشتركة، فقط المحتوى النصي يختلف.</p>
              {formData.sections.length === 0 ? (
                <p className="text-amber-600 text-right">يرجى إضافة الأقسام في علامة التبويب الإنجليزية أولاً</p>
              ) : (
                <SectionsEditor
                  sections={formData.sections_ar || []}
                  onChange={handleSectionsArChange}
                  folder="services/sections"
                  dir="rtl"
                />
              )}
            </>
          )}
        </div>

        {/* Appearance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
          <h2 className="text-lg font-semibold text-gray-900">Appearance</h2>

          <ImageUpload
            value={formData.image}
            onChange={(url) => setFormData({ ...formData, image: url })}
            folder="services"
            label="Service Image"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Features (English)</h2>
            <div className="flex gap-2 flex-wrap">
              {formData.features.map((f) => (
                <span key={f} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                  {f}<button type="button" onClick={() => removeFromArray('features', f)} className="ml-2">×</button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input type="text" value={featureInput} onChange={(e) => setFeatureInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addToArray('features', featureInput, setFeatureInput))} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="Add feature" />
              <button type="button" onClick={() => addToArray('features', featureInput, setFeatureInput)} className="px-3 py-2 bg-gray-200 rounded-lg text-sm">Add</button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 text-right">المميزات (بالعربية)</h2>
            <div className="flex gap-2 flex-wrap justify-end">
              {formData.features_ar.map((f) => (
                <span key={f} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                  <button type="button" onClick={() => removeFromArray('features_ar', f)} className="mr-2">×</button>{f}
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => addToArray('features_ar', featureInputAr, setFeatureInputAr)} className="px-3 py-2 bg-gray-200 rounded-lg text-sm">إضافة</button>
              <input type="text" value={featureInputAr} onChange={(e) => setFeatureInputAr(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addToArray('features_ar', featureInputAr, setFeatureInputAr))} dir="rtl" className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm text-right" placeholder="أضف ميزة" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Benefits (English)</h2>
            <div className="flex gap-2 flex-wrap">
              {formData.benefits.map((b) => (
                <span key={b} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                  {b}<button type="button" onClick={() => removeFromArray('benefits', b)} className="ml-2">×</button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input type="text" value={benefitInput} onChange={(e) => setBenefitInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addToArray('benefits', benefitInput, setBenefitInput))} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="Add benefit" />
              <button type="button" onClick={() => addToArray('benefits', benefitInput, setBenefitInput)} className="px-3 py-2 bg-gray-200 rounded-lg text-sm">Add</button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 text-right">الفوائد (بالعربية)</h2>
            <div className="flex gap-2 flex-wrap justify-end">
              {formData.benefits_ar.map((b) => (
                <span key={b} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                  <button type="button" onClick={() => removeFromArray('benefits_ar', b)} className="mr-2">×</button>{b}
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => addToArray('benefits_ar', benefitInputAr, setBenefitInputAr)} className="px-3 py-2 bg-gray-200 rounded-lg text-sm">إضافة</button>
              <input type="text" value={benefitInputAr} onChange={(e) => setBenefitInputAr(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addToArray('benefits_ar', benefitInputAr, setBenefitInputAr))} dir="rtl" className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm text-right" placeholder="أضف فائدة" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Process Steps (English)</h2>
            <div className="space-y-2">
              {formData.process_steps.map((step, index) => (
                <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <span className="w-8 h-8 bg-[#041533] text-white rounded-full flex items-center justify-center text-sm font-medium">{index + 1}</span>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{step.title}</p>
                    <p className="text-sm text-gray-500">{step.description}</p>
                  </div>
                  <button type="button" onClick={() => removeProcessStep(index)} className="text-red-500 hover:text-red-700">×</button>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <input type="text" value={stepTitle} onChange={(e) => setStepTitle(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="Step title" />
              <input type="text" value={stepDesc} onChange={(e) => setStepDesc(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="Step description" />
              <button type="button" onClick={addProcessStep} className="px-3 py-2 bg-gray-200 rounded-lg text-sm">Add Step</button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 text-right">خطوات العملية (بالعربية)</h2>
            <div className="space-y-2">
              {formData.process_steps_ar.map((step, index) => (
                <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg" dir="rtl">
                  <span className="w-8 h-8 bg-[#877051] text-white rounded-full flex items-center justify-center text-sm font-medium">{index + 1}</span>
                  <div className="flex-1 text-right">
                    <p className="font-medium text-gray-900">{step.title}</p>
                    <p className="text-sm text-gray-500">{step.description}</p>
                  </div>
                  <button type="button" onClick={() => removeProcessStepAr(index)} className="text-red-500 hover:text-red-700">×</button>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <button type="button" onClick={addProcessStepAr} className="px-3 py-2 bg-gray-200 rounded-lg text-sm">إضافة خطوة</button>
              <input type="text" value={stepDescAr} onChange={(e) => setStepDescAr(e.target.value)} dir="rtl" className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-right" placeholder="وصف الخطوة" />
              <input type="text" value={stepTitleAr} onChange={(e) => setStepTitleAr(e.target.value)} dir="rtl" className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-right" placeholder="عنوان الخطوة" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Publishing</h2>
            <label className="flex items-center gap-3">
              <input type="checkbox" name="published" checked={formData.published} onChange={handleChange} className="w-5 h-5 text-[#877051] border-gray-300 rounded" />
              <span className="text-sm text-gray-700">Published</span>
            </label>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Display Order</label>
              <input type="number" name="display_order" value={formData.display_order} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            </div>
            <button type="submit" disabled={saving} className="w-full bg-[#041533] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#0a2a5c] transition-colors disabled:opacity-50">
              {saving ? 'Saving...' : 'Save Service'}
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">SEO</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Meta Title</label>
              <input type="text" name="meta_title" value={formData.meta_title} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
              <textarea name="meta_description" value={formData.meta_description} onChange={handleChange} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
