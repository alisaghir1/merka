import { createClient } from '@/lib/supabase/client'

// Client-side data fetching utilities

export async function getBlogs(options = {}) {
  const supabase = createClient()
  const { published = true, limit, featured, category } = options
  
  let query = supabase
    .from('blogs')
    .select('*')
    .order('date', { ascending: false })
  
  if (published) {
    query = query.eq('published', true)
  }
  
  if (featured !== undefined) {
    query = query.eq('featured', featured)
  }
  
  if (category) {
    query = query.eq('category', category)
  }
  
  if (limit) {
    query = query.limit(limit)
  }
  
  const { data, error } = await query
  
  if (error) {
    console.error('Error fetching blogs:', error)
    return []
  }
  
  return data || []
}

export async function getBlogBySlug(slug) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()
  
  if (error) {
    console.error('Error fetching blog:', error)
    return null
  }
  
  return data
}

export async function getProjects(options = {}) {
  const supabase = createClient()
  const { published = true, limit, featured, category } = options
  
  console.log('getProjects called with options:', options)
  
  let query = supabase
    .from('projects')
    .select('*')
    .order('display_order', { ascending: true })
  
  if (published) {
    query = query.eq('published', true)
  }
  
  if (featured !== undefined) {
    query = query.eq('featured', featured)
  }
  
  if (category) {
    query = query.eq('category', category)
  }
  
  if (limit) {
    query = query.limit(limit)
  }
  
  const { data, error } = await query
  
  if (error) {
    console.error('Error fetching projects:', error)
    return []
  }
  
  console.log('Projects fetched:', data?.length, 'items')
  return data || []
}

export async function getProjectBySlug(slug) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()
  
  if (error) {
    console.error('Error fetching project:', error)
    return null
  }
  
  return data
}

export async function getServices(options = {}) {
  const supabase = createClient()
  const { published = true, limit } = options
  
  let query = supabase
    .from('services')
    .select('*')
    .order('display_order', { ascending: true })
  
  if (published) {
    query = query.eq('published', true)
  }
  
  if (limit) {
    query = query.limit(limit)
  }
  
  const { data, error } = await query
  
  if (error) {
    console.error('Error fetching services:', error)
    return []
  }
  
  return data || []
}

export async function getServiceBySlug(slug) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()
  
  if (error) {
    console.error('Error fetching service:', error)
    return null
  }
  
  return data
}

export async function getStyles(options = {}) {
  const supabase = createClient()
  const { published = true, limit } = options
  
  let query = supabase
    .from('styles')
    .select('*')
    .order('display_order', { ascending: true })
  
  if (published) {
    query = query.eq('published', true)
  }
  
  if (limit) {
    query = query.limit(limit)
  }
  
  const { data, error } = await query
  
  if (error) {
    console.error('Error fetching styles:', error)
    return []
  }
  
  return data || []
}

export async function getStyleBySlug(slug) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('styles')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()
  
  if (error) {
    console.error('Error fetching style:', error)
    return null
  }
  
  return data
}

export async function getTypologies(options = {}) {
  const supabase = createClient()
  const { published = true, limit } = options
  
  let query = supabase
    .from('typologies')
    .select('*')
    .order('display_order', { ascending: true })
  
  if (published) {
    query = query.eq('published', true)
  }
  
  if (limit) {
    query = query.limit(limit)
  }
  
  const { data, error } = await query
  
  if (error) {
    console.error('Error fetching typologies:', error)
    return []
  }
  
  return data || []
}

export async function getTypologyBySlug(slug) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('typologies')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()
  
  if (error) {
    console.error('Error fetching typology:', error)
    return null
  }
  
  return data
}

export async function getTeamMembers(options = {}) {
  const supabase = createClient()
  const { published = true, limit } = options
  
  let query = supabase
    .from('team_members')
    .select('*')
    .order('display_order', { ascending: true })
  
  if (published) {
    query = query.eq('published', true)
  }
  
  if (limit) {
    query = query.limit(limit)
  }
  
  const { data, error } = await query
  
  if (error) {
    console.error('Error fetching team:', error)
    return []
  }
  
  return data || []
}

export async function getHeroSlides(options = {}) {
  const supabase = createClient()
  const { published = true } = options
  
  let query = supabase
    .from('hero_slides')
    .select('*')
    .order('display_order', { ascending: true })
  
  if (published) {
    query = query.eq('published', true)
  }
  
  const { data, error } = await query
  
  if (error) {
    console.error('Error fetching hero slides:', error)
    return []
  }
  
  return data || []
}

export async function getSettings() {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('settings')
    .select('*')
  
  if (error) {
    console.error('Error fetching settings:', error)
    return {}
  }
  
  // Convert array to object with key-value pairs
  const settings = {}
  data?.forEach(item => {
    settings[item.key] = item.value
  })
  
  return settings
}

export async function getSiteSettings() {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('site_settings')
    .select('*')
  
  if (error) {
    console.error('Error fetching site settings:', error)
    return {}
  }
  
  // Convert array to object with key-value pairs and parse JSON values
  const settings = {}
  data?.forEach(item => {
    try {
      settings[item.key] = typeof item.value === 'string' ? JSON.parse(item.value) : item.value
    } catch {
      settings[item.key] = item.value
    }
  })
  
  return settings
}

export async function submitContactForm(formData) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('contact_submissions')
    .insert([{
      name: formData.name,
      email: formData.email,
      phone: formData.phone || null,
      subject: formData.subject || null,
      message: formData.message,
      project_type: formData.projectType || null,
      budget: formData.budget || null,
      source: formData.source || 'website',
      status: 'new'
    }])
    .select()
  
  if (error) {
    throw new Error('Failed to submit contact form: ' + error.message)
  }
  
  return data
}

export async function subscribeNewsletter(email) {
  const supabase = createClient()
  
  // Check if already subscribed
  const { data: existing } = await supabase
    .from('newsletter_subscriptions')
    .select('id')
    .eq('email', email)
    .single()
  
  if (existing) {
    throw new Error('This email is already subscribed')
  }
  
  const { data, error } = await supabase
    .from('newsletter_subscriptions')
    .insert([{ email, subscribed: true }])
    .select()
  
  if (error) {
    throw new Error('Failed to subscribe: ' + error.message)
  }
  
  return data
}
