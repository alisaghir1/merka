'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { createClient } from '@/lib/supabase/client'

const RichTextEditor = dynamic(() => import('../../components/RichTextEditor'), { ssr: false })
const SectionsEditor = dynamic(() => import('../../components/SectionsEditor'), { ssr: false })

export default function NewBlogPage() {
  const router = useRouter()
  const supabase = createClient()
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState('en') // 'en' or 'ar'
  const [formData, setFormData] = useState({
    title: '',
    title_ar: '',
    slug: '',
    excerpt: '',
    excerpt_ar: '',
    content: '',
    content_ar: '',
    sections: [],
    sections_ar: [],
    category: '',
    category_ar: '',
    read_time: '',
    read_time_ar: '',
    date: new Date().toISOString().split('T')[0],
    author: 'Merka Architecture Team',
    author_ar: 'فريق ميركا للهندسة المعمارية',
    featured: false,
    published: false,
    tags: [],
    tags_ar: [],
    image: '',
    meta_title: '',
    meta_description: '',
  })
  const [tagInput, setTagInput] = useState('')
  const [tagInputAr, setTagInputAr] = useState('')
  const [uploadingImage, setUploadingImage] = useState(false)
  const fileInputRef = useRef(null)

  // Categories with English and Arabic
  const categories = [
    { en: 'Trends & Innovation', ar: 'الاتجاهات والابتكار' },
    { en: 'Site Planning', ar: 'تخطيط الموقع' },
    { en: 'Religious Architecture', ar: 'العمارة الدينية' },
    { en: 'Regulations & Compliance', ar: 'اللوائح والامتثال' },
    { en: 'Technology & Innovation', ar: 'التكنولوجيا والابتكار' },
    { en: 'Design Process', ar: 'عملية التصميم' },
    { en: 'Sustainability', ar: 'الاستدامة' },
    { en: 'Project Showcase', ar: 'عرض المشاريع' },
  ]

  // Sync sections structure between languages
  const handleSectionsChange = (sections) => {
    // When English sections change, create matching Arabic structure if it doesn't exist
    const newSectionsAr = sections.map((section, index) => {
      const existingArSection = formData.sections_ar[index] || {}
      return {
        ...section,
        title: existingArSection.title || '',
        content: existingArSection.content || '',
        // Keep the same image/type structure
        image: section.image,
        type: section.type,
      }
    })
    setFormData({ ...formData, sections, sections_ar: newSectionsAr })
  }

  const handleSectionsArChange = (sections_ar) => {
    // When Arabic sections change, preserve structure but update Arabic content
    const syncedSectionsAr = sections_ar.map((section, index) => {
      const enSection = formData.sections[index] || {}
      return {
        ...section,
        // Keep image from English version
        image: enSection.image || section.image,
        type: enSection.type || section.type,
      }
    })
    setFormData({ ...formData, sections_ar: syncedSectionsAr })
  }

  const handleCategoryChange = (e) => {
    const selectedCategory = categories.find(cat => cat.en === e.target.value)
    setFormData({
      ...formData,
      category: selectedCategory?.en || '',
      category_ar: selectedCategory?.ar || '',
    })
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingImage(true)
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `blog-${Date.now()}.${fileExt}`
      const filePath = `blogs/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(filePath)

      setFormData({ ...formData, image: publicUrl })
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Failed to upload image: ' + error.message)
    } finally {
      setUploadingImage(false)
    }
  }

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
    setFormData({ ...formData, content })
  }

  const handleContentArChange = (content_ar) => {
    setFormData({ ...formData, content_ar })
  }

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()],
      })
      setTagInput('')
    }
  }

  const addTagAr = () => {
    if (tagInputAr.trim() && !formData.tags_ar.includes(tagInputAr.trim())) {
      setFormData({
        ...formData,
        tags_ar: [...formData.tags_ar, tagInputAr.trim()],
      })
      setTagInputAr('')
    }
  }

  const removeTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove),
    })
  }

  const removeTagAr = (tagToRemove) => {
    setFormData({
      ...formData,
      tags_ar: formData.tags_ar.filter((tag) => tag !== tagToRemove),
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)

    try {
      const { data, error } = await supabase
        .from('blogs')
        .insert([formData])
        .select()

      if (error) throw error

      router.push('/admin/blogs')
    } catch (error) {
      console.error('Error creating blog:', error)
      alert('Failed to create blog post: ' + error.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900">New Blog Post</h1>
          <p className="mt-1 text-gray-600">Create a new blog article</p>
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

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
          {/* English Content */}
          {activeTab === 'en' && (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title (English) *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleTitleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#877051] focus:border-transparent"
                    placeholder="Enter blog title"
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
                    placeholder="blog-post-url-slug"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt (English)</label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#877051] focus:border-transparent"
                  placeholder="Brief description of the blog post"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content (English)</label>
                <RichTextEditor
                  content={formData.content}
                  onChange={handleContentChange}
                  placeholder="Write your blog introduction or main content here..."
                />
              </div>
            </>
          )}

          {/* Arabic Content */}
          {activeTab === 'ar' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">العنوان (بالعربية)</label>
                <input
                  type="text"
                  name="title_ar"
                  value={formData.title_ar}
                  onChange={handleChange}
                  dir="rtl"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#877051] focus:border-transparent text-right"
                  placeholder="أدخل عنوان المقال"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">الملخص (بالعربية)</label>
                <textarea
                  name="excerpt_ar"
                  value={formData.excerpt_ar}
                  onChange={handleChange}
                  rows={3}
                  dir="rtl"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#877051] focus:border-transparent text-right"
                  placeholder="وصف مختصر للمقال"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">المحتوى (بالعربية)</label>
                <RichTextEditor
                  content={formData.content_ar}
                  onChange={handleContentArChange}
                  placeholder="اكتب المحتوى بالعربية هنا..."
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
                folder="blogs/sections"
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
                  folder="blogs/sections"
                  dir="rtl"
                />
              )}
            </>
          )}
        </div>

        {/* Sidebar Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">Post Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category / التصنيف</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleCategoryChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#877051] focus:border-transparent"
                >
                  <option value="">Select category / اختر التصنيف</option>
                  {categories.map((cat) => (
                    <option key={cat.en} value={cat.en}>{cat.en} / {cat.ar}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Read Time (English)</label>
                <input
                  type="text"
                  name="read_time"
                  value={formData.read_time}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#877051] focus:border-transparent"
                  placeholder="5 min read"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">وقت القراءة (بالعربية)</label>
                <input
                  type="text"
                  name="read_time_ar"
                  value={formData.read_time_ar}
                  onChange={handleChange}
                  dir="rtl"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#877051] focus:border-transparent text-right"
                  placeholder="٥ دقائق للقراءة"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#877051] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Author (English)</label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#877051] focus:border-transparent"
                  placeholder="Author name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">المؤلف (بالعربية)</label>
                <input
                  type="text"
                  name="author_ar"
                  value={formData.author_ar}
                  onChange={handleChange}
                  dir="rtl"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#877051] focus:border-transparent text-right"
                  placeholder="اسم المؤلف"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image</label>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingImage}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 disabled:opacity-50"
                >
                  {uploadingImage ? (
                    <>
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Choose Image
                    </>
                  )}
                </button>
                {formData.image && (
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, image: '' })}
                    className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    Remove
                  </button>
                )}
              </div>
              {formData.image && (
                <img src={formData.image} alt="Preview" className="mt-3 h-40 w-full object-cover rounded-lg border" />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tags (English)</label>
              <div className="flex gap-2 mb-2 flex-wrap">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[#877051] text-white"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-2 hover:text-gray-200"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#877051] focus:border-transparent"
                  placeholder="Add a tag"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Add
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-right">الوسوم (بالعربية)</label>
              <div className="flex gap-2 mb-2 flex-wrap justify-end">
                {formData.tags_ar.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[#041533] text-white"
                  >
                    <button
                      type="button"
                      onClick={() => removeTagAr(tag)}
                      className="mr-2 hover:text-gray-200"
                    >
                      ×
                    </button>
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={addTagAr}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  إضافة
                </button>
                <input
                  type="text"
                  value={tagInputAr}
                  onChange={(e) => setTagInputAr(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTagAr())}
                  dir="rtl"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#877051] focus:border-transparent text-right"
                  placeholder="أضف وسم"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Publish Settings */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Publish</h2>
              
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
                <span className="text-sm text-gray-700">Featured Post</span>
              </label>

              <button
                type="submit"
                disabled={saving}
                className="w-full bg-[#041533] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#0a2a5c] transition-colors disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Blog Post'}
              </button>
            </div>

            {/* SEO Settings */}
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
        </div>
      </form>
    </div>
  )
}
