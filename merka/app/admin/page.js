'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    blogs: 0,
    projects: 0,
    services: 0,
    contacts: 0,
    newsletter: 0,
  })
  const [recentContacts, setRecentContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchStats()
    fetchRecentContacts()
  }, [])

  const fetchStats = async () => {
    try {
      const [blogs, projects, services, contacts, newsletter] = await Promise.all([
        supabase.from('blogs').select('id', { count: 'exact', head: true }),
        supabase.from('projects').select('id', { count: 'exact', head: true }),
        supabase.from('services').select('id', { count: 'exact', head: true }),
        supabase.from('contact_submissions').select('id', { count: 'exact', head: true }),
        supabase.from('newsletter_subscriptions').select('id', { count: 'exact', head: true }),
      ])

      setStats({
        blogs: blogs.count || 0,
        projects: projects.count || 0,
        services: services.count || 0,
        contacts: contacts.count || 0,
        newsletter: newsletter.count || 0,
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const fetchRecentContacts = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5)

      if (error) throw error
      setRecentContacts(data || [])
    } catch (error) {
      console.error('Error fetching contacts:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    { name: 'Blogs', value: stats.blogs, href: '/admin/blogs', icon: '📝', color: 'bg-blue-500' },
    { name: 'Projects', value: stats.projects, href: '/admin/projects', icon: '🏗️', color: 'bg-green-500' },
    { name: 'Services', value: stats.services, href: '/admin/services', icon: '⚙️', color: 'bg-purple-500' },
    { name: 'Contact Submissions', value: stats.contacts, href: '/admin/contacts', icon: '📧', color: 'bg-orange-500' },
    { name: 'Newsletter Subscribers', value: stats.newsletter, href: '/admin/newsletter', icon: '📬', color: 'bg-pink-500' },
  ]

  const quickActions = [
    { name: 'New Blog Post', href: '/admin/blogs/new', icon: '✏️' },
    { name: 'New Project', href: '/admin/projects/new', icon: '🏢' },
    { name: 'Edit Services', href: '/admin/services', icon: '🔧' },
    { name: 'Site Settings', href: '/admin/settings', icon: '⚙️' },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#041533]"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-serif font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-gray-600">Welcome to Merka Architecture Admin Panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((stat) => (
          <Link
            key={stat.name}
            href={stat.href}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center text-2xl`}>
                {stat.icon}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            {quickActions.map((action) => (
              <Link
                key={action.name}
                href={action.href}
                className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
              >
                <span className="text-2xl mr-3">{action.icon}</span>
                <span className="font-medium text-gray-700">{action.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Contacts */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Contact Submissions</h2>
            <Link href="/admin/contacts" className="text-sm text-[#877051] hover:underline">
              View all →
            </Link>
          </div>
          {recentContacts.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No contact submissions yet</p>
          ) : (
            <div className="space-y-3">
              {recentContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{contact.name}</p>
                    <p className="text-sm text-gray-500 truncate">{contact.email}</p>
                  </div>
                  <div className="ml-4 flex items-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      contact.status === 'new' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {contact.status || 'new'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Getting Started */}
      <div className="bg-gradient-to-r from-[#041533] to-[#0a2a5c] rounded-xl shadow-sm p-6 text-white">
        <h2 className="text-xl font-semibold mb-2">Getting Started</h2>
        <p className="text-gray-300 mb-4">
          Welcome to your admin panel. Here you can manage all content on your website including blogs, projects, services, and more.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/admin/blogs/new"
            className="bg-white text-[#041533] px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Create Your First Blog
          </Link>
          <Link
            href="/admin/settings"
            className="border border-white text-white px-4 py-2 rounded-lg font-medium hover:bg-white/10 transition-colors"
          >
            Configure Settings
          </Link>
        </div>
      </div>
    </div>
  )
}
