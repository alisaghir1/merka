'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import LanguageSwitcher from '@/app/components/LanguageSwitcher'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    company: { name: '', name_ar: '', tagline: '', tagline_ar: '', description: '', description_ar: '' },
    contact: { email: '', phone: '', address: '', address_ar: '', whatsapp: '' },
    social: { instagram: '', linkedin: '', facebook: '', twitter: '' },
    seo: { title: '', title_ar: '', description: '', description_ar: '', keywords: '', keywords_ar: '' },
    language: { defaultLanguage: 'en', enableArabic: true },
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState('company')
  const supabase = createClient()

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')

      if (error) throw error

      const settingsObj = {}
      data?.forEach((item) => {
        settingsObj[item.key] = item.value
      })

      setSettings({
        company: settingsObj.company || { name: '', name_ar: '', tagline: '', tagline_ar: '', description: '', description_ar: '' },
        contact: settingsObj.contact || { email: '', phone: '', address: '', address_ar: '', whatsapp: '' },
        social: settingsObj.social || { instagram: '', linkedin: '', facebook: '', twitter: '' },
        seo: settingsObj.seo || { title: '', title_ar: '', description: '', description_ar: '', keywords: '', keywords_ar: '' },
        language: settingsObj.language || { defaultLanguage: 'en', enableArabic: true },
      })
    } catch (error) {
      console.error('Error fetching settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const saveSettings = async (key) => {
    setSaving(true)
    try {
      const { error } = await supabase
        .from('site_settings')
        .upsert({ key, value: settings[key] }, { onConflict: 'key' })

      if (error) throw error
      alert('Settings saved successfully!')
    } catch (error) {
      console.error('Error saving settings:', error)
      alert('Failed to save settings: ' + error.message)
    } finally {
      setSaving(false)
    }
  }

  const updateSetting = (category, field, value) => {
    setSettings({
      ...settings,
      [category]: {
        ...settings[category],
        [field]: value,
      },
    })
  }

  const tabs = [
    { id: 'company', label: 'Company', icon: '🏢' },
    { id: 'contact', label: 'Contact', icon: '📧' },
    { id: 'social', label: 'Social Media', icon: '📱' },
    { id: 'seo', label: 'SEO', icon: '🔍' },
    { id: 'language', label: 'Language', icon: '🌐' },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#041533]"></div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-bold text-gray-900">Site Settings</h1>
        <p className="mt-1 text-gray-600">Configure your website settings</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center px-4 py-3 font-medium transition-colors border-b-2 -mb-px ${
              activeTab === tab.id
                ? 'border-[#877051] text-[#877051]'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Company Settings */}
      {activeTab === 'company' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
          <h2 className="text-lg font-semibold text-gray-900">Company Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Name (English)</label>
              <input
                type="text"
                value={settings.company.name}
                onChange={(e) => updateSetting('company', 'name', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#877051] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-right">اسم الشركة (بالعربية)</label>
              <input
                type="text"
                value={settings.company.name_ar}
                onChange={(e) => updateSetting('company', 'name_ar', e.target.value)}
                dir="rtl"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#877051] focus:border-transparent text-right"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tagline (English)</label>
              <input
                type="text"
                value={settings.company.tagline}
                onChange={(e) => updateSetting('company', 'tagline', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#877051] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-right">الشعار (بالعربية)</label>
              <input
                type="text"
                value={settings.company.tagline_ar}
                onChange={(e) => updateSetting('company', 'tagline_ar', e.target.value)}
                dir="rtl"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#877051] focus:border-transparent text-right"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description (English)</label>
              <textarea
                value={settings.company.description}
                onChange={(e) => updateSetting('company', 'description', e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#877051] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-right">الوصف (بالعربية)</label>
              <textarea
                value={settings.company.description_ar}
                onChange={(e) => updateSetting('company', 'description_ar', e.target.value)}
                rows={4}
                dir="rtl"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#877051] focus:border-transparent text-right"
              />
            </div>
          </div>

          <button
            onClick={() => saveSettings('company')}
            disabled={saving}
            className="bg-[#041533] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#0a2a5c] transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Company Settings'}
          </button>
        </div>
      )}

      {/* Contact Settings */}
      {activeTab === 'contact' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
          <h2 className="text-lg font-semibold text-gray-900">Contact Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={settings.contact.email}
                onChange={(e) => updateSetting('contact', 'email', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#877051] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                value={settings.contact.phone}
                onChange={(e) => updateSetting('contact', 'phone', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#877051] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp</label>
              <input
                type="tel"
                value={settings.contact.whatsapp}
                onChange={(e) => updateSetting('contact', 'whatsapp', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#877051] focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Address (English)</label>
            <textarea
              value={settings.contact.address}
              onChange={(e) => updateSetting('contact', 'address', e.target.value)}
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#877051] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right">العنوان (بالعربية)</label>
            <textarea
              value={settings.contact.address_ar}
              onChange={(e) => updateSetting('contact', 'address_ar', e.target.value)}
              rows={2}
              dir="rtl"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#877051] focus:border-transparent text-right"
            />
          </div>

          <button
            onClick={() => saveSettings('contact')}
            disabled={saving}
            className="bg-[#041533] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#0a2a5c] transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Contact Settings'}
          </button>
        </div>
      )}

      {/* Social Media Settings */}
      {activeTab === 'social' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
          <h2 className="text-lg font-semibold text-gray-900">Social Media Links</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
              <input
                type="url"
                value={settings.social.instagram}
                onChange={(e) => updateSetting('social', 'instagram', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#877051] focus:border-transparent"
                placeholder="https://instagram.com/..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
              <input
                type="url"
                value={settings.social.linkedin}
                onChange={(e) => updateSetting('social', 'linkedin', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#877051] focus:border-transparent"
                placeholder="https://linkedin.com/..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Facebook</label>
              <input
                type="url"
                value={settings.social.facebook}
                onChange={(e) => updateSetting('social', 'facebook', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#877051] focus:border-transparent"
                placeholder="https://facebook.com/..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Twitter / X</label>
              <input
                type="url"
                value={settings.social.twitter}
                onChange={(e) => updateSetting('social', 'twitter', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#877051] focus:border-transparent"
                placeholder="https://twitter.com/..."
              />
            </div>
          </div>

          <button
            onClick={() => saveSettings('social')}
            disabled={saving}
            className="bg-[#041533] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#0a2a5c] transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Social Settings'}
          </button>
        </div>
      )}

      {/* SEO Settings */}
      {activeTab === 'seo' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
          <h2 className="text-lg font-semibold text-gray-900">SEO Settings</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Default Page Title (English)</label>
              <input
                type="text"
                value={settings.seo.title}
                onChange={(e) => updateSetting('seo', 'title', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#877051] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-right">عنوان الصفحة (بالعربية)</label>
              <input
                type="text"
                value={settings.seo.title_ar}
                onChange={(e) => updateSetting('seo', 'title_ar', e.target.value)}
                dir="rtl"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#877051] focus:border-transparent text-right"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description (English)</label>
              <textarea
                value={settings.seo.description}
                onChange={(e) => updateSetting('seo', 'description', e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#877051] focus:border-transparent"
              />
              <p className="text-sm text-gray-500 mt-1">{settings.seo.description?.length || 0}/160 characters recommended</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-right">الوصف التعريفي (بالعربية)</label>
              <textarea
                value={settings.seo.description_ar}
                onChange={(e) => updateSetting('seo', 'description_ar', e.target.value)}
                rows={3}
                dir="rtl"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#877051] focus:border-transparent text-right"
              />
              <p className="text-sm text-gray-500 mt-1 text-right">{settings.seo.description_ar?.length || 0}/160 حرف موصى به</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Keywords (English)</label>
              <textarea
                value={settings.seo.keywords}
                onChange={(e) => updateSetting('seo', 'keywords', e.target.value)}
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#877051] focus:border-transparent"
                placeholder="architecture, Dubai, design, ..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-right">الكلمات المفتاحية (بالعربية)</label>
              <textarea
                value={settings.seo.keywords_ar}
                onChange={(e) => updateSetting('seo', 'keywords_ar', e.target.value)}
                rows={2}
                dir="rtl"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#877051] focus:border-transparent text-right"
                placeholder="عمارة، دبي، تصميم، ..."
              />
            </div>
          </div>

          <button
            onClick={() => saveSettings('seo')}
            disabled={saving}
            className="bg-[#041533] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#0a2a5c] transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save SEO Settings'}
          </button>
        </div>
      )}

      {/* Language Settings */}
      {activeTab === 'language' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
          <h2 className="text-lg font-semibold text-gray-900">Language Settings</h2>
          <p className="text-gray-600">Configure multilingual support for your website.</p>
          
          <div className="space-y-6">
            {/* Current Language Preview */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-3">Language Switcher Preview</label>
              <LanguageSwitcher variant="dropdown" className="max-w-xs" />
            </div>

            {/* Default Language */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Default Language</label>
              <select
                value={settings.language.defaultLanguage}
                onChange={(e) => updateSetting('language', 'defaultLanguage', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#877051] focus:border-transparent"
              >
                <option value="en">English</option>
                <option value="ar">العربية (Arabic)</option>
              </select>
              <p className="text-sm text-gray-500 mt-1">The default language for new visitors</p>
            </div>

            {/* Enable Arabic */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <label className="block font-medium text-gray-900">Enable Arabic Language</label>
                <p className="text-sm text-gray-600">Allow visitors to switch to Arabic with RTL support</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.language.enableArabic}
                  onChange={(e) => updateSetting('language', 'enableArabic', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#877051]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#877051]"></div>
              </label>
            </div>

            {/* Language Features Info */}
            <div className="border border-blue-200 bg-blue-50 rounded-lg p-4">
              <h3 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
                <span>ℹ️</span> Language Features
              </h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• <strong>RTL Support:</strong> Automatic right-to-left layout for Arabic</li>
                <li>• <strong>Arabic Fonts:</strong> Cairo & Tajawal fonts are loaded automatically</li>
                <li>• <strong>User Preference:</strong> Language choice is saved in browser</li>
                <li>• <strong>Auto Detection:</strong> Browser language is detected for new visitors</li>
              </ul>
            </div>

            {/* Available Translations */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Available Translations</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4 flex items-center gap-3">
                  <span className="text-3xl">🇬🇧</span>
                  <div>
                    <p className="font-medium text-gray-900">English</p>
                    <p className="text-sm text-green-600">✓ Active</p>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 flex items-center gap-3">
                  <span className="text-3xl">🇦🇪</span>
                  <div>
                    <p className="font-medium text-gray-900">العربية (Arabic)</p>
                    <p className={`text-sm ${settings.language.enableArabic ? 'text-green-600' : 'text-gray-500'}`}>
                      {settings.language.enableArabic ? '✓ Active' : '○ Disabled'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => saveSettings('language')}
            disabled={saving}
            className="bg-[#041533] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#0a2a5c] transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Language Settings'}
          </button>
        </div>
      )}
    </div>
  )
}
