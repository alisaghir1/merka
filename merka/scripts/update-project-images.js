const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  console.log('URL:', supabaseUrl ? 'Found' : 'Missing')
  console.log('Key:', supabaseKey ? 'Found' : 'Missing')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

// Map project titles to their image files in public/projects/
const projectImageMapping = {
  'Government Administration Complex': {
    image: '/projects/01--Minstry-of-Building_01.jpg',
    gallery: [
      '/projects/01--Minstry-of-Building_01.jpg',
      '/projects/01--Minstry-of-Building_02.jpg',
      '/projects/01--Minstry-of-Building_03.jpg',
      '/projects/01--Minstry-of-Building_04.jpg',
      '/projects/01--Minstry-of-Building_05.jpg',
      '/projects/01--Minstry-of-Building_06.jpg',
      '/projects/01--Minstry-of-Building_07.jpg',
      '/projects/01--Minstry-of-Building_08.jpg',
      '/projects/01--Minstry-of-Building_09.jpg',
      '/projects/01--Minstry-of-Building_10.jpg',
      '/projects/01--Minstry-of-Building_21.jpg'
    ]
  },
  'Emirates Creative Learning Campus': {
    image: '/projects/03--School_01.jpg',
    gallery: [
      '/projects/03--School_01.jpg',
      '/projects/03--School_02.jpg',
      '/projects/03--School_03.jpg',
      '/projects/03--School_04.jpg'
    ]
  },
  'Triad Business Towers': {
    image: '/projects/04-Business-Tower_01.jpg',
    gallery: [
      '/projects/04-Business-Tower_01.jpg',
      '/projects/04-Business-Tower_02.jpg'
    ]
  },
  'Bank Albilad Headquarters': {
    image: '/projects/05--Bank-1_01.jpg',
    gallery: [
      '/projects/05--Bank-1_01.jpg',
      '/projects/05--Bank-1_02.jpg',
      '/projects/05--Bank-1_03.jpg',
      '/projects/05--Bank-1_04.jpg',
      '/projects/05--Bank-1_05.jpg',
      '/projects/05--Bank-1_06.jpg',
      '/projects/05--Bank-1_07.jpg'
    ]
  },
  'Levent Hotel': {
    image: '/projects/06-Hotel_01.jpg',
    gallery: [
      '/projects/06-Hotel_01.jpg',
      '/projects/06-Hotel_02.jpg',
      '/projects/06-Hotel_03.jpg',
      '/projects/06-Hotel_04.jpg',
      '/projects/06-Hotel_05.jpg'
    ]
  },
  'Dubai Hills Residential Terraces': {
    image: '/projects/10--Residential-Tower-in-Dubai-01.jpg',
    gallery: [
      '/projects/10--Residential-Tower-in-Dubai-01.jpg',
      '/projects/10--Residential-Tower-in-Dubai-02.jpg',
      '/projects/10--Residential-Tower-in-Dubai-03.jpg',
      '/projects/10--Residential-Tower-in-Dubai-04.jpg',
      '/projects/10--Residential-Tower-in-Dubai-05.jpg',
      '/projects/10--Residential-Tower-in-Dubai-06.jpg',
      '/projects/10--Residential-Tower-in-Dubai-07.jpg',
      '/projects/10--Residential-Tower-in-Dubai-08.jpg',
      '/projects/10--Residential-Tower-in-Dubai-09.jpg'
    ]
  },
  'JVC Residential Terrace Towers': {
    image: '/projects/10--Residential-Tower_01.jpg',
    gallery: [
      '/projects/10--Residential-Tower_01.jpg',
      '/projects/10--Residential-Tower_02.jpg',
      '/projects/10--Residential-Tower_03.jpg'
    ]
  },
  'Residential Tower 30 Stories': {
    image: '/projects/16--Residential-Tower-30-Stories_01.jpg',
    gallery: [
      '/projects/16--Residential-Tower-30-Stories_01.jpg',
      '/projects/16--Residential-Tower-30-Stories_02.jpg',
      '/projects/16--Residential-Tower-30-Stories_03.jpg',
      '/projects/16--Residential-Tower-30-Stories_04.jpg',
      '/projects/16--Residential-Tower-30-Stories_05.jpg',
      '/projects/16--Residential-Tower-30-Stories_06.jpg'
    ]
  },
  'Residential Tower 29 Stories': {
    image: '/projects/17--16--Residential-Tower-29-Stories_01.jpg',
    gallery: [
      '/projects/17--16--Residential-Tower-29-Stories_01.jpg',
      '/projects/17--16--Residential-Tower-29-Stories_02.jpg',
      '/projects/17--16--Residential-Tower-29-Stories_03.jpg',
      '/projects/17--16--Residential-Tower-29-Stories_04.jpg',
      '/projects/17--16--Residential-Tower-29-Stories_05.jpg',
      '/projects/17--16--Residential-Tower-29-Stories_06.jpg'
    ]
  }
}

async function updateProjectImages() {
  console.log('🔧 Updating project images from local files...\n')
  
  // Fetch all projects
  const { data: projects, error: fetchError } = await supabase
    .from('projects')
    .select('id, slug, title, image')
  
  if (fetchError) {
    console.error('❌ Error fetching projects:', fetchError.message)
    process.exit(1)
  }
  
  console.log(`Found ${projects.length} projects\n`)
  console.log('Projects in database:')
  projects.forEach(p => console.log(`  - ${p.title}`))
  console.log('')
  
  let successCount = 0
  let skippedCount = 0
  let errorCount = 0
  
  for (const project of projects) {
    const imageData = projectImageMapping[project.title]
    
    if (!imageData) {
      console.log(`⏭️  No local images for: ${project.title}`)
      skippedCount++
      continue
    }
    
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
      console.log(`✅ Updated: ${project.title} (${imageData.gallery.length} images)`)
      successCount++
    }
  }
  
  console.log(`\n📊 Summary: ${successCount} updated, ${skippedCount} skipped (no local images), ${errorCount} errors`)
}

// Run the update
updateProjectImages()
  .then(() => {
    console.log('\n✨ Done!')
    process.exit(0)
  })
  .catch((err) => {
    console.error('\n❌ Fatal error:', err)
    process.exit(1)
  })
