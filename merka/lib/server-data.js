import { createClient } from '@/lib/supabase/server'

// Server-side data fetching utilities for SSR
// These functions use the server Supabase client and can be called in Server Components

export async function getBlogs(options = {}) {
  const supabase = await createClient()
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
  const supabase = await createClient()
  
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
  const supabase = await createClient()
  const { published = true, limit, featured, category } = options
  
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
  
  return data || []
}

export async function getProjectBySlug(slug) {
  const supabase = await createClient()
  
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
  const supabase = await createClient()
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
  const supabase = await createClient()
  
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
  const supabase = await createClient()
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
  const supabase = await createClient()
  
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
  const supabase = await createClient()
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
  const supabase = await createClient()
  
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
  const supabase = await createClient()
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
  const supabase = await createClient()
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

export async function getSiteSettings() {
  const supabase = await createClient()
  
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
