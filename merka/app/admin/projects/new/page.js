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
  const [activeTab, setActiveTab] = useState('en')
  const [formData, setFormData] = useState({
    title: '',
    title_ar: '',
    slug: '',
    category: '',
    category_ar: '',
    location: '',
    location_ar: '',
    area: '',
    year: new Date().getFullYear().toString(),
    status: 'In Design',
    status_ar: 'قيد التصميم',
    image: '',
    description: '',
    description_ar: '',
    full_description: '',
    full_description_ar: '',
    sections: [],
    sections_ar: [],
    services: [],
    services_ar: [],
    tags: [],
    tags_ar: [],
    gallery: [],
    features: [],
    features_ar: [],
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
  const [tagInputAr, setTagInputAr] = useState('')
  const [serviceInput, setServiceInput] = useState('')
  const [serviceInputAr, setServiceInputAr] = useState('')
  const [featureInput, setFeatureInput] = useState('')
  const [featureInputAr, setFeatureInputAr] = useState('')

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

  const handleContentArChange = (content) => {
    setFormData({ ...formData, full_description_ar: content })
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

  const categories = [
    { en: 'residential', ar: 'سكني' },
    { en: 'commercial', ar: 'تجاري' },
    { en: 'hospitality', ar: 'ضيافة' },
    { en: 'mixed-use', ar: 'متعدد الاستخدامات' },
    { en: 'institutional', ar: 'مؤسسي' },
    { en: 'cultural', ar: 'ثقافي' },
  ]
  const statuses = [
    { en: 'In Design', ar: 'قيد التصميم' },
    { en: 'Under Construction', ar: 'قيد البناء' },
    { en: 'Completed', ar: 'مكتمل' },
    { en: 'On Hold', ar: 'معلق' },
  ]

  const handleCategoryChange = (e) => {
    const selectedCategory = categories.find(cat => cat.en === e.target.value)
    setFormData({
      ...formData,
      category: selectedCategory?.en || '',
      category_ar: selectedCategory?.ar || '',
    })
  }

  const handleStatusChange = (e) => {
    const selectedStatus = statuses.find(s => s.en === e.target.value)
    setFormData({
      ...formData,
      status: selectedStatus?.en || '',
      status_ar: selectedStatus?.ar || '',
    })
  }

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

        {/* Basic Info */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
          <h2 className="text-lg font-semibold text-gray-900">
            {activeTab === 'en' ? 'Basic Information' : 'المعلومات الأساسية'}
          </h2>
          
          {activeTab === 'en' ? (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* ...existing English fields... */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title (English) *</label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category / التصنيف *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleCategoryChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#877051] focus:border-transparent"
                  >
                    <option value="">Select category / اختر التصنيف</option>
                    {categories.map((cat) => (
                      <option key={cat.en} value={cat.en} className="capitalize">{cat.en} / {cat.ar}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status / الحالة</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleStatusChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#877051] focus:border-transparent"
                  >
                    {statuses.map((status) => (
                      <option key={status.en} value={status.en}>{status.en} / {status.ar}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location (English)</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Short Description (English)</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Description (English)</label>
                <RichTextEditor
                  content={formData.full_description}
                  onChange={handleContentChange}
                  placeholder="Detailed project description..."
                />
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 text-right">العنوان (بالعربية)</label>
                  <input
                    type="text"
                    name="title_ar"
                    value={formData.title_ar}
                    onChange={handleChange}
                    dir="rtl"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#877051] focus:border-transparent text-right"
                    placeholder="عنوان المشروع"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 text-right">الموقع (بالعربية)</label>
                  <input
                    type="text"
                    name="location_ar"
                    value={formData.location_ar}
                    onChange={handleChange}
                    dir="rtl"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#877051] focus:border-transparent text-right"
                    placeholder="دبي، الإمارات"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 text-right">المساحة (بالعربية)</label>
                  <input
                    type="text"
                    name="area_ar"
                    value={formData.area_ar || ''}
                    onChange={handleChange}
                    dir="rtl"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#877051] focus:border-transparent text-right"
                    placeholder="١٦٬٠٠٠ - ٢٠٬٠٠٠ متر مربع"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 text-right">العميل (بالعربية)</label>
                  <input
                    type="text"
                    name="client_ar"
                    value={formData.client_ar || ''}
                    onChange={handleChange}
                    dir="rtl"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#877051] focus:border-transparent text-right"
                    placeholder="اسم العميل"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 text-right">الميزانية (بالعربية)</label>
                  <input
                    type="text"
                    name="budget_ar"
                    value={formData.budget_ar || ''}
                    onChange={handleChange}
                    dir="rtl"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#877051] focus:border-transparent text-right"
                    placeholder="٤٨٬٠٠٠٬٠٠٠ - ٦٢٬٠٠٠٬٠٠٠ دولار أمريكي"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 text-right">الجدول الزمني (بالعربية)</label>
                  <input
                    type="text"
                    name="timeline_ar"
                    value={formData.timeline_ar || ''}
                    onChange={handleChange}
                    dir="rtl"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#877051] focus:border-transparent text-right"
                    placeholder="٢٢ إلى ٢٦ شهرًا"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">الوصف المختصر (بالعربية)</label>
                <textarea
                  name="description_ar"
                  value={formData.description_ar}
                  onChange={handleChange}
                  rows={2}
                  dir="rtl"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#877051] focus:border-transparent text-right"
                  placeholder="وصف مختصر للمشروع"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">الوصف الكامل (بالعربية)</label>
                <RichTextEditor
                  content={formData.full_description_ar}
                  onChange={handleContentArChange}
                  placeholder="وصف تفصيلي للمشروع..."
                  dir="rtl"
                />
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
                folder="projects/sections"
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
                  folder="projects/sections"
                  dir="rtl"
                />
              )}
            </>
          )}
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

        {/* Lists - English */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Services */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Services (English)</h2>
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
            <h2 className="text-lg font-semibold text-gray-900">Features (English)</h2>
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
            <h2 className="text-lg font-semibold text-gray-900">Tags (English)</h2>
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

        {/* Lists - Arabic */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Services Arabic */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 text-right">الخدمات (بالعربية)</h2>
            <div className="flex gap-2 flex-wrap justify-end">
              {formData.services_ar.map((service) => (
                <span
                  key={service}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                >
                  <button type="button" onClick={() => removeFromArray('services_ar', service)} className="mr-2">×</button>
                  {service}
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => addToArray('services_ar', serviceInputAr, setServiceInputAr)}
                className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm"
              >
                إضافة
              </button>
              <input
                type="text"
                value={serviceInputAr}
                onChange={(e) => setServiceInputAr(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addToArray('services_ar', serviceInputAr, setServiceInputAr))}
                dir="rtl"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#877051] focus:border-transparent text-sm text-right"
                placeholder="أضف خدمة"
              />
            </div>
          </div>

          {/* Features Arabic */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 text-right">المميزات (بالعربية)</h2>
            <div className="flex gap-2 flex-wrap justify-end">
              {formData.features_ar.map((feature) => (
                <span
                  key={feature}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
                >
                  <button type="button" onClick={() => removeFromArray('features_ar', feature)} className="mr-2">×</button>
                  {feature}
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => addToArray('features_ar', featureInputAr, setFeatureInputAr)}
                className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm"
              >
                إضافة
              </button>
              <input
                type="text"
                value={featureInputAr}
                onChange={(e) => setFeatureInputAr(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addToArray('features_ar', featureInputAr, setFeatureInputAr))}
                dir="rtl"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#877051] focus:border-transparent text-sm text-right"
                placeholder="أضف ميزة"
              />
            </div>
          </div>

          {/* Tags Arabic */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 text-right">الوسوم (بالعربية)</h2>
            <div className="flex gap-2 flex-wrap justify-end">
              {formData.tags_ar.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[#041533] text-white"
                >
                  <button type="button" onClick={() => removeFromArray('tags_ar', tag)} className="mr-2">×</button>
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => addToArray('tags_ar', tagInputAr, setTagInputAr)}
                className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm"
              >
                إضافة
              </button>
              <input
                type="text"
                value={tagInputAr}
                onChange={(e) => setTagInputAr(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addToArray('tags_ar', tagInputAr, setTagInputAr))}
                dir="rtl"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#877051] focus:border-transparent text-sm text-right"
                placeholder="أضف وسم"
              />
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
