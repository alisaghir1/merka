/**
 * Fix Project Images Script
 * 
 * This script updates all project images in Supabase to use proper Unsplash URLs
 * Run with: node scripts/fix-project-images.js
 */

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials. Check your .env.local file.')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

// Project images mapping - slug to proper image URLs
const projectImages = {
  'dubai-hills-luxury-villa': {
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200&h=800&fit=crop'
    ]
  },
  'business-bay-tower': {
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&h=800&fit=crop'
    ]
  },
  'al-seef-boutique-hotel': {
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&h=800&fit=crop'
    ]
  },
  'saadiyat-island-resort': {
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&h=800&fit=crop'
    ]
  },
  'reem-island-residences': {
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200&h=800&fit=crop'
    ]
  },
  'downtown-mixed-use': {
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&fit=crop'
    ]
  },
  'palm-jumeirah-villa': {
    image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200&h=800&fit=crop'
    ]
  },
  'dubai-south-office-complex': {
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&h=800&fit=crop'
    ]
  },
  'jumeirah-golf-estates-villa': {
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop'
    ]
  },
  'creek-harbour-retail': {
    image: 'https://images.unsplash.com/photo-1519566335946-e6f65f0f4fdf?w=800&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1519566335946-e6f65f0f4fdf?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1567449303078-57ad995bd329?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1200&h=800&fit=crop'
    ]
  },
  'meydan-cultural-center': {
    image: 'https://images.unsplash.com/photo-1545893835-abaa50cbe628?w=800&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1545893835-abaa50cbe628?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1542751110-97427bbecf20?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1493397212122-2b85dda8106b?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=1200&h=800&fit=crop'
    ]
  },
  'marina-residence': {
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200&h=800&fit=crop'
    ]
  }
}

// Array of unique architecture images to assign to projects
const uniqueImages = [
  {
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
    gallery: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop', 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop', 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&h=800&fit=crop', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&fit=crop']
  },
  {
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
    gallery: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&fit=crop', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop', 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200&h=800&fit=crop']
  },
  {
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
    gallery: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop', 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200&h=800&fit=crop']
  },
  {
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
    gallery: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop', 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&h=800&fit=crop', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop', 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&h=800&fit=crop']
  },
  {
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
    gallery: ['https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&h=800&fit=crop', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop', 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&fit=crop']
  },
  {
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
    gallery: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&h=800&fit=crop', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop', 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&h=800&fit=crop', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&h=800&fit=crop']
  },
  {
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
    gallery: ['https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&h=800&fit=crop', 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&h=800&fit=crop', 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&h=800&fit=crop', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&h=800&fit=crop']
  },
  {
    image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=600&fit=crop',
    gallery: ['https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1200&h=800&fit=crop', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop', 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200&h=800&fit=crop']
  },
  {
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop',
    gallery: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=800&fit=crop', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop']
  },
  {
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
    gallery: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop', 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200&h=800&fit=crop']
  },
  {
    image: 'https://images.unsplash.com/photo-1519566335946-e6f65f0f4fdf?w=800&h=600&fit=crop',
    gallery: ['https://images.unsplash.com/photo-1519566335946-e6f65f0f4fdf?w=1200&h=800&fit=crop', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop', 'https://images.unsplash.com/photo-1567449303078-57ad995bd329?w=1200&h=800&fit=crop', 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1200&h=800&fit=crop']
  },
  {
    image: 'https://images.unsplash.com/photo-1545893835-abaa50cbe628?w=800&h=600&fit=crop',
    gallery: ['https://images.unsplash.com/photo-1545893835-abaa50cbe628?w=1200&h=800&fit=crop', 'https://images.unsplash.com/photo-1542751110-97427bbecf20?w=1200&h=800&fit=crop', 'https://images.unsplash.com/photo-1493397212122-2b85dda8106b?w=1200&h=800&fit=crop', 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=1200&h=800&fit=crop']
  },
  {
    image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&h=600&fit=crop',
    gallery: ['https://images.unsplash.com/photo-1577495508048-b635879837f1?w=1200&h=800&fit=crop', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop', 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop', 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&h=800&fit=crop']
  },
  {
    image: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800&h=600&fit=crop',
    gallery: ['https://images.unsplash.com/photo-1460317442991-0ec209397118?w=1200&h=800&fit=crop', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&fit=crop', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop']
  },
  {
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop',
    gallery: ['https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200&h=800&fit=crop', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop', 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop', 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&h=800&fit=crop']
  },
  {
    image: 'https://images.unsplash.com/photo-1554435493-93422e8220c8?w=800&h=600&fit=crop',
    gallery: ['https://images.unsplash.com/photo-1554435493-93422e8220c8?w=1200&h=800&fit=crop', 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&h=800&fit=crop', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&h=800&fit=crop', 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1200&h=800&fit=crop']
  },
  {
    image: 'https://images.unsplash.com/photo-1524230572899-a752b3835840?w=800&h=600&fit=crop',
    gallery: ['https://images.unsplash.com/photo-1524230572899-a752b3835840?w=1200&h=800&fit=crop', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop', 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop', 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&h=800&fit=crop']
  },
  {
    image: 'https://images.unsplash.com/photo-1448630360428-65456885c650?w=800&h=600&fit=crop',
    gallery: ['https://images.unsplash.com/photo-1448630360428-65456885c650?w=1200&h=800&fit=crop', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&fit=crop', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop']
  },
  {
    image: 'https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=800&h=600&fit=crop',
    gallery: ['https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=1200&h=800&fit=crop', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop', 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop', 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&h=800&fit=crop']
  },
  {
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=600&fit=crop',
    gallery: ['https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&h=800&fit=crop', 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&h=800&fit=crop', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&h=800&fit=crop', 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1200&h=800&fit=crop']
  }
]

async function fixProjectImages() {
  console.log('🔧 Fixing project images...\n')
  
  // Fetch all projects
  const { data: projects, error: fetchError } = await supabase
    .from('projects')
    .select('id, slug, title, image')
  
  if (fetchError) {
    console.error('❌ Error fetching projects:', fetchError.message)
    process.exit(1)
  }
  
  console.log(`Found ${projects.length} projects to update\n`)
  
  let successCount = 0
  let errorCount = 0
  
  for (let i = 0; i < projects.length; i++) {
    const project = projects[i]
    // Assign a unique image based on index (cycle through if more projects than images)
    const imageData = uniqueImages[i % uniqueImages.length]
    
    const { error: updateError } = await supabase
      .from('projects')
      .update({
        image: imageData.image,
        gallery: imageData.gallery
      })
      .eq('id', project.id)
    
    if (updateError) {
      console.error(`❌ Error updating "${project.title}":`, updateError.message)
      errorCount++
    } else {
      console.log(`✅ Updated: ${project.title} with image #${i + 1}`)
      successCount++
    }
  }
  
  console.log(`\n📊 Summary: ${successCount} updated, ${errorCount} errors`)
}

// Run the fix
fixProjectImages()
  .then(() => {
    console.log('\n✨ Done!')
    process.exit(0)
  })
  .catch((err) => {
    console.error('\n❌ Fatal error:', err)
    process.exit(1)
  })
