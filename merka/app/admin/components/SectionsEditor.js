'use client'

import { useState, useRef } from 'react'
import dynamic from 'next/dynamic'
import { createClient } from '@/lib/supabase/client'

const RichTextEditor = dynamic(() => import('./RichTextEditor'), { ssr: false })

export default function SectionsEditor({ sections = [], onChange, folder = 'sections' }) {
  const [uploadingIndex, setUploadingIndex] = useState(null)
  const fileInputRefs = useRef({})
  const supabase = createClient()

  const addSection = () => {
    onChange([...sections, { title: '', content: '', image: '' }])
  }

  const removeSection = (index) => {
    if (confirm('Are you sure you want to delete this section?')) {
      onChange(sections.filter((_, i) => i !== index))
    }
  }

  const updateSection = (index, field, value) => {
    const updated = [...sections]
    updated[index] = { ...updated[index], [field]: value }
    onChange(updated)
  }

  const moveSection = (index, direction) => {
    const newIndex = index + direction
    if (newIndex < 0 || newIndex >= sections.length) return
    
    const updated = [...sections]
    const temp = updated[index]
    updated[index] = updated[newIndex]
    updated[newIndex] = temp
    onChange(updated)
  }

  const handleImageUpload = async (index, e) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingIndex(index)
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `section-${Date.now()}.${fileExt}`
      const filePath = `${folder}/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(filePath)

      updateSection(index, 'image', publicUrl)
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Failed to upload image: ' + error.message)
    } finally {
      setUploadingIndex(null)
      if (fileInputRefs.current[index]) {
        fileInputRefs.current[index].value = ''
      }
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Content Sections</h2>
        <button
          type="button"
          onClick={addSection}
          className="flex items-center gap-2 px-4 py-2 bg-[#041533] text-white rounded-lg hover:bg-[#0a2a5c] transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Section
        </button>
      </div>

      {sections.length === 0 ? (
        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
          <svg className="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-gray-500 mb-2">No sections yet</p>
          <p className="text-sm text-gray-400">Click "Add Section" to create your first content section</p>
        </div>
      ) : (
        <div className="space-y-6">
          {sections.map((section, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Section Header */}
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                <span className="font-medium text-gray-700">Section {index + 1}</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => moveSection(index, -1)}
                    disabled={index === 0}
                    className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Move Up"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => moveSection(index, 1)}
                    disabled={index === sections.length - 1}
                    className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Move Down"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => removeSection(index)}
                    className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                    title="Delete Section"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Section Content */}
              <div className="p-4 space-y-4">
                {/* Section Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Section Title <span className="text-gray-400">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={section.title || ''}
                    onChange={(e) => updateSection(index, 'title', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#877051] focus:border-transparent"
                    placeholder="Enter section title..."
                  />
                </div>

                {/* Section Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Section Image <span className="text-gray-400">(optional)</span>
                  </label>
                  <input
                    type="file"
                    ref={(el) => (fileInputRefs.current[index] = el)}
                    onChange={(e) => handleImageUpload(index, e)}
                    accept="image/*"
                    className="hidden"
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRefs.current[index]?.click()}
                      disabled={uploadingIndex === index}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 disabled:opacity-50"
                    >
                      {uploadingIndex === index ? (
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
                          {section.image ? 'Change Image' : 'Add Image'}
                        </>
                      )}
                    </button>
                    {section.image && (
                      <button
                        type="button"
                        onClick={() => updateSection(index, 'image', '')}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  {section.image && (
                    <img
                      src={section.image}
                      alt={`Section ${index + 1}`}
                      className="mt-3 h-40 w-full object-cover rounded-lg border"
                    />
                  )}
                </div>

                {/* Section Content */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Section Content
                  </label>
                  <RichTextEditor
                    content={section.content || ''}
                    onChange={(content) => updateSection(index, 'content', content)}
                    placeholder="Write your section content here..."
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {sections.length > 0 && (
        <button
          type="button"
          onClick={addSection}
          className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-[#877051] hover:text-[#877051] transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Another Section
        </button>
      )}
    </div>
  )
}
