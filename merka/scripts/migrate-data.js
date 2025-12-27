/**
 * Migration Script: Migrate ALL content data to Supabase
 * 
 * Run this script with: node scripts/migrate-data.js
 * 
 * Make sure your .env.local file has:
 * - NEXT_PUBLIC_SUPABASE_URL
 * - NEXT_PUBLIC_SUPABASE_ANON_KEY (or SUPABASE_SERVICE_ROLE_KEY for full access)
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

// ============================================
// OLD BLOGS DATA
// ============================================
const blogPostsData = [
  {
    title: "2025 Architectural Trends Shaping the UAE's Built Environment",
    slug: "2025-architectural-trends-shaping-uae-built-environment",
    excerpt: "Explore 2025 design trends from Merka Architecture. Learn how UAE buildings are adapting to climate, regulation, and new space demands.",
    category: "Trends & Innovation",
    read_time: "8 min read",
    date: "2024-12-15",
    author: "Merka Architecture Team",
    featured: true,
    published: true,
    tags: ["Trends", "UAE", "Innovation", "2025", "Sustainability"],
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80"
  },
  {
    title: "Designing for Site: Coastal vs. Inland Architecture in the UAE",
    slug: "designing-for-site-coastal-vs-inland-architecture-uae",
    excerpt: "Merka Architecture compares coastal and inland design strategies in the UAE. Learn how to address climate, salt, and thermal stress in different regions.",
    category: "Site Planning",
    read_time: "6 min read",
    date: "2024-12-10",
    author: "Merka Architecture Team",
    featured: false,
    published: true,
    tags: ["Site Planning", "Coastal Design", "Climate Response"],
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80"
  },
  {
    title: "Designing Mosques in the UAE: Architecture, Regulation, and Spatial Logic",
    slug: "designing-mosques-uae-architecture-regulation-spatial-logic",
    excerpt: "Explore mosque design in the UAE. Merka Architecture explains zoning, approvals, and spatial planning for religious projects in Dubai and beyond.",
    category: "Religious Architecture",
    read_time: "10 min read",
    date: "2024-12-08",
    author: "Merka Architecture Team",
    featured: false,
    published: true,
    tags: ["Mosque Design", "Religious Architecture", "UAE Regulations"],
    image: "https://images.unsplash.com/photo-1549180030-48bf079fb38a?w=800&q=80"
  },
  {
    title: "Facade Design Regulations in Dubai: What Every Project Must Address",
    slug: "facade-design-regulations-dubai-what-every-project-must-address",
    excerpt: "Learn how Merka Architecture handles façade design regulations in Dubai. Glazing limits, fire ratings, shading rules, and approval strategies explained.",
    category: "Regulations & Compliance",
    read_time: "7 min read",
    date: "2024-12-05",
    author: "Merka Architecture Team",
    featured: false,
    published: true,
    tags: ["Facade Design", "Dubai Regulations", "Building Codes"],
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
  },
  {
    title: "Integrating BIM into Architecture: A Project-Based Approach in the UAE",
    slug: "integrating-bim-into-architecture-project-based-approach-uae",
    excerpt: "See how Merka Architecture uses BIM to streamline approvals, reduce clashes, and support construction across Dubai and Abu Dhabi projects.",
    category: "Technology & Innovation",
    read_time: "9 min read",
    date: "2024-12-01",
    author: "Merka Architecture Team",
    featured: false,
    published: true,
    tags: ["BIM", "Technology", "Project Management"],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
  },
  {
    title: "Material Selection in UAE Architecture: Strategy, Durability, and Compliance",
    slug: "material-selection-uae-architecture-strategy-durability-compliance",
    excerpt: "Learn how Merka Architecture selects materials for UAE projects. Climate considerations, compliance requirements, and performance strategies explained.",
    content: "Material choice plays a decisive role in a building's long-term performance...",
    image: "https://images.unsplash.com/photo-1515191107209-c28698631303?w=1200&q=80",
    category: "Design Process",
    author: "Merka Architecture Team",
    date: "2024-12-01",
    read_time: "9 min read",
    featured: false,
    published: true,
    tags: ["Material Selection", "Design Process", "Building Materials", "UAE Standards"]
  },
  {
    title: "Passive Design Strategies in Hot Climates: UAE Architecture Solutions",
    slug: "passive-design-strategies-hot-climates-uae-architecture-solutions",
    excerpt: "Discover passive design techniques for UAE architecture. Natural ventilation, thermal mass, and shading strategies for energy-efficient buildings.",
    content: "In the UAE's challenging climate, passive design strategies become essential...",
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200&q=80",
    category: "Sustainability",
    author: "Merka Architecture Team", 
    date: "2024-11-28",
    read_time: "8 min read",
    featured: false,
    published: true,
    tags: ["Passive Design", "Energy Efficiency", "Climate Response", "Sustainability"]
  },
  {
    title: "Understanding Authority Submissions in Dubai: A Step-by-Step Guide for Architecture Projects",
    slug: "understanding-authority-submissions-dubai-step-by-step-guide-architecture-projects",
    excerpt: "Learn how Merka Architecture navigates Dubai's building approval process. Step-by-step guide for DM, DDA, and Trakhees submissions across the UAE.",
    content: "Dubai offers one of the most dynamic construction markets in the world...",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80",
    category: "Regulations & Compliance",
    author: "Merka Architecture Team",
    date: "2024-11-25", 
    read_time: "10 min read",
    featured: false,
    published: true,
    tags: ["Authority Submissions", "Dubai Regulations", "Building Permits", "Compliance Guide"]
  },
  {
    title: "Urban Heat and Architecture: Site Planning Strategies in the UAE",
    slug: "urban-heat-architecture-site-planning-strategies-uae",
    excerpt: "Learn how Merka Architecture addresses urban heat through smart site planning in Dubai, Abu Dhabi, and Sharjah. Reduce thermal load and improve comfort.",
    content: "Urban developments in the UAE face a growing challenge: heat buildup...",
    image: "https://images.unsplash.com/photo-1581889470536-467bdbe30cd0?w=1200&q=80",
    category: "Site Planning",
    author: "Merka Architecture Team",
    date: "2024-11-22",
    read_time: "9 min read",
    featured: false,
    published: true, 
    tags: ["Urban Heat Island", "Site Planning", "Climate Response", "UAE Development"]
  },
  {
    title: "Value Engineering in Architecture: Making Smart Decisions Early",
    slug: "value-engineering-architecture-making-smart-decisions-early",
    excerpt: "Learn how Merka Architecture applies value engineering during design. Reduce costs and delays without sacrificing quality or compliance.",
    content: "Value engineering is not about reducing quality. It is a systematic method...",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&q=80",
    category: "Design Process", 
    author: "Merka Architecture Team",
    date: "2024-11-19",
    read_time: "8 min read",
    featured: false,
    published: true,
    tags: ["Value Engineering", "Cost Optimization", "Design Process", "Project Management"]
  }
]

// ============================================
// OLD SERVICES DATA
// ============================================
const servicesData = [
  {
    title: 'Conceptual Design',
    slug: 'conceptual-design',
    description: 'Initial design concepts and feasibility studies that establish the foundation for your architectural project.',
    full_description: 'Our Conceptual Design service is the critical first step in any architectural project. We work closely with clients to understand their vision, requirements, and constraints. Through detailed site analysis, concept development, and feasibility studies, we create initial design proposals that set the direction for the entire project.',
    icon: '💡',
    gradient: 'from-[#041533] to-[#2f3541]',
    features: ['Site Analysis', 'Concept Development', 'Feasibility Studies', 'Initial Sketches'],
    benefits: ['Clear project direction', 'Budget optimization', 'Risk identification', 'Stakeholder alignment'],
    display_order: 1,
    published: true,
    process_steps: [
      { step: 1, title: 'Client Brief', description: 'Understanding your vision, requirements, and budget' },
      { step: 2, title: 'Site Analysis', description: 'Comprehensive study of site conditions and context' },
      { step: 3, title: 'Concept Development', description: 'Creating initial design proposals and options' },
      { step: 4, title: 'Feasibility Review', description: 'Assessing technical and financial viability' }
    ]
  },
  {
    title: 'Schematic Design',
    slug: 'schematic-design',
    description: 'Detailed schematic drawings that translate concepts into clear architectural plans and elevations.',
    full_description: 'Our Schematic Design phase transforms approved concepts into comprehensive architectural drawings. We develop floor plans, elevations, sections, and 3D visualizations that clearly communicate the design intent. This phase establishes the spatial organization, form, and character of the building.',
    icon: '📐',
    gradient: 'from-[#877051] to-[#a88765]',
    features: ['Floor Plans', 'Elevations', 'Sections', 'Design Development'],
    benefits: ['Spatial clarity', 'Design visualization', 'Early cost estimation', 'Client approval pathway'],
    display_order: 2,
    published: true,
    process_steps: [
      { step: 1, title: 'Plan Development', description: 'Creating detailed floor plans and layouts' },
      { step: 2, title: 'Elevation Design', description: 'Developing building elevations and facade treatments' },
      { step: 3, title: 'Section Studies', description: 'Analyzing vertical relationships and building systems' },
      { step: 4, title: '3D Visualization', description: 'Creating renderings for design communication' }
    ]
  },
  {
    title: 'Design Development',
    slug: 'design-development',
    description: 'Comprehensive design development with detailed specifications and material selections.',
    full_description: 'Design Development refines the schematic design into a fully coordinated architectural solution. We develop detailed drawings, select materials and finishes, and coordinate with engineering consultants. This phase ensures all building systems work together seamlessly.',
    icon: '🏗️',
    gradient: 'from-[#041533] to-[#877051]',
    features: ['Material Selection', 'Detail Development', 'System Integration', 'Design Refinement'],
    benefits: ['Material optimization', 'System coordination', 'Cost control', 'Quality assurance'],
    display_order: 3,
    published: true,
    process_steps: [
      { step: 1, title: 'Material Research', description: 'Selecting appropriate materials and finishes' },
      { step: 2, title: 'Detail Development', description: 'Creating construction details and assemblies' },
      { step: 3, title: 'Consultant Coordination', description: 'Integrating structural, MEP, and specialty systems' },
      { step: 4, title: 'Cost Verification', description: 'Confirming design alignment with budget targets' }
    ]
  },
  {
    title: 'Construction Drawings',
    slug: 'construction-drawings',
    description: 'Precise technical drawings and documentation required for construction and permit approval.',
    full_description: 'Our Construction Drawing service produces comprehensive technical documentation for building construction. We create detailed drawings, specifications, and schedules that contractors need to build the project. All documents comply with local building codes and authority requirements.',
    icon: '📋',
    gradient: 'from-[#877051] to-[#041533]',
    features: ['Working Drawings', 'Technical Details', 'Specifications', 'Construction Documents'],
    benefits: ['Construction clarity', 'Permit compliance', 'Bid accuracy', 'Quality control'],
    display_order: 4,
    published: true,
    process_steps: [
      { step: 1, title: 'Drawing Production', description: 'Creating comprehensive construction drawings' },
      { step: 2, title: 'Specification Writing', description: 'Developing detailed material and execution specifications' },
      { step: 3, title: 'Coordination Review', description: 'Final coordination with all consultants' },
      { step: 4, title: 'Quality Check', description: 'Thorough review of all documents for accuracy' }
    ]
  },
  {
    title: 'Tender Documentation',
    slug: 'tender-documentation',
    description: 'Complete tender packages with detailed specifications for contractor bidding processes.',
    full_description: 'We prepare comprehensive tender documentation packages that enable fair and accurate contractor bidding. Our documents include tender drawings, bills of quantities, specifications, and contract documents. We ensure all information is clear and complete for competitive tendering.',
    icon: '📄',
    gradient: 'from-[#041533] to-[#1a2332]',
    features: ['Tender Drawings', 'Bill of Quantities', 'Specifications', 'Contract Documents'],
    benefits: ['Competitive bidding', 'Cost transparency', 'Scope clarity', 'Risk management'],
    display_order: 5,
    published: true,
    process_steps: [
      { step: 1, title: 'Document Preparation', description: 'Preparing tender drawings and specifications' },
      { step: 2, title: 'BOQ Development', description: 'Creating detailed bills of quantities' },
      { step: 3, title: 'Contract Assembly', description: 'Assembling complete tender package' },
      { step: 4, title: 'Tender Support', description: 'Answering contractor queries during bidding' }
    ]
  },
  {
    title: 'Authority Approvals',
    slug: 'authority-approvals',
    description: 'Expert guidance through Dubai Municipality and local authority approval processes.',
    full_description: 'Our Authority Approvals service guides projects through complex regulatory approval processes. We have extensive experience with Dubai Municipality, DDA, Trakhees, and other authorities. We prepare submission packages, coordinate with reviewers, and manage the approval timeline.',
    icon: '✅',
    gradient: 'from-[#877051] to-[#6d5a41]',
    features: ['Permit Applications', 'Code Compliance', 'Authority Coordination', 'Approval Management'],
    benefits: ['Faster approvals', 'Compliance assurance', 'Risk reduction', 'Expert guidance'],
    display_order: 6,
    published: true,
    process_steps: [
      { step: 1, title: 'Compliance Review', description: 'Reviewing design against authority requirements' },
      { step: 2, title: 'Submission Preparation', description: 'Preparing required drawings and documents' },
      { step: 3, title: 'Authority Submission', description: 'Submitting to relevant authorities' },
      { step: 4, title: 'Follow-up Management', description: 'Managing queries and obtaining approvals' }
    ]
  }
]

// ============================================
// PROJECTS DATA
// ============================================
const projectsData = [
  {
    title: 'Dubai Hills Luxury Villa',
    slug: 'dubai-hills-luxury-villa',
    category: 'residential',
    location: 'Dubai Hills Estate',
    area: '12,000 sq ft',
    year: '2024',
    status: 'Completed',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
    description: 'Contemporary villa design with sustainable features and smart home integration',
    full_description: 'This exceptional luxury villa in Dubai Hills Estate represents the pinnacle of contemporary residential design. Spanning 12,000 square feet, the property seamlessly integrates sustainable technologies with sophisticated aesthetics. The design features clean geometric lines, expansive glass facades, and thoughtfully curated outdoor spaces that blur the boundaries between interior and exterior living.',
    services: ['Concept Design', 'Design Development', 'Construction Drawings', 'Interior Design', 'Landscape Design'],
    tags: ['Luxury', 'Sustainable', 'Smart Home'],
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200&h=800&fit=crop'
    ],
    features: ['Smart Home Automation', 'Solar Panel Integration', 'Infinity Pool', 'Private Cinema', 'Wine Cellar'],
    client: 'Private Client',
    budget: '$2.5M - $3M',
    timeline: '18 months',
    featured: true,
    published: true,
    display_order: 1
  },
  {
    title: 'Business Bay Tower',
    slug: 'business-bay-tower',
    category: 'commercial',
    location: 'Business Bay, Dubai',
    area: '450,000 sq ft',
    year: '2024',
    status: 'Under Construction',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
    description: 'Modern commercial tower with innovative facade design and flexible office spaces',
    full_description: 'Rising 40 stories above Business Bay, this commercial tower redefines the Dubai skyline with its innovative facade design and cutting-edge sustainability features. The building incorporates flexible office spaces designed for the future of work, featuring modular layouts that can be easily reconfigured to meet evolving business needs.',
    services: ['Schematic Design', 'Design Development', 'Authority Approvals', 'MEP Engineering', 'Facade Engineering'],
    tags: ['High-rise', 'Commercial', 'Innovation'],
    gallery: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&h=800&fit=crop'
    ],
    features: ['LEED Platinum Certification', 'Sky Gardens', 'Flexible Floor Plates', 'Smart Building Systems', 'Executive Helipad'],
    client: 'Dubai Properties',
    budget: '$150M - $180M',
    timeline: '36 months',
    featured: true,
    published: true,
    display_order: 2
  },
  {
    title: 'Al Seef Boutique Hotel',
    slug: 'al-seef-boutique-hotel',
    category: 'hospitality',
    location: 'Al Seef, Dubai',
    area: '25,000 sq ft',
    year: '2023',
    status: 'Completed',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
    description: 'Heritage-inspired boutique hotel blending traditional and contemporary design',
    full_description: 'Nestled in the historic Al Seef district, this boutique hotel pays homage to Dubai\'s rich cultural heritage while offering contemporary luxury. The design seamlessly weaves traditional Arabic architectural elements with modern hospitality standards, creating an authentic yet sophisticated guest experience.',
    services: ['Concept Design', 'Interior Design', 'FF&E Coordination', 'Heritage Consultation', 'Lighting Design'],
    tags: ['Heritage', 'Boutique', 'Cultural'],
    gallery: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&h=800&fit=crop'
    ],
    features: ['Traditional Courtyard', 'Rooftop Restaurant', 'Heritage Spa', 'Majlis Lounge', 'Art Gallery'],
    client: 'Meraas Holding',
    budget: '$8M - $12M',
    timeline: '24 months',
    featured: false,
    published: true,
    display_order: 3
  },
  {
    title: 'Saadiyat Island Resort',
    slug: 'saadiyat-island-resort',
    category: 'hospitality',
    location: 'Saadiyat Island, Abu Dhabi',
    area: '180,000 sq ft',
    year: '2024',
    status: 'In Design',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
    description: 'Luxury beachfront resort with marine-conscious design and wellness facilities',
    full_description: 'This visionary resort project on Saadiyat Island represents a new paradigm in sustainable luxury hospitality. The design prioritizes marine conservation while delivering an unparalleled guest experience. Every aspect of the resort has been carefully planned to minimize environmental impact while maximizing connection to the natural beauty of the Arabian Gulf.',
    services: ['Master Planning', 'Concept Design', 'Environmental Design', 'Marine Biology Consultation', 'Wellness Design'],
    tags: ['Resort', 'Beachfront', 'Wellness'],
    gallery: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&h=800&fit=crop'
    ],
    features: ['Private Beach Access', 'Marine Research Center', 'Overwater Villas', 'Wellness Pavilion', 'Turtle Sanctuary'],
    client: 'Tourism Development & Investment Company',
    budget: '$250M - $300M',
    timeline: '48 months',
    featured: false,
    published: true,
    display_order: 4
  },
  {
    title: 'Reem Island Residences',
    slug: 'reem-island-residences',
    category: 'residential',
    location: 'Al Reem Island, Abu Dhabi',
    area: '320,000 sq ft',
    year: '2023',
    status: 'Completed',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
    description: 'Waterfront residential complex with panoramic views and community amenities',
    full_description: 'This prestigious waterfront development on Al Reem Island offers residents an unparalleled lifestyle with panoramic views of the Arabian Gulf. The complex features thoughtfully designed apartments and penthouses that maximize natural light and capitalize on the stunning water views, while integrated community amenities foster a sense of belonging.',
    services: ['Design Development', 'Construction Drawings', 'Authority Approvals', 'Landscape Architecture', 'Community Planning'],
    tags: ['Waterfront', 'Community', 'Views'],
    gallery: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200&h=800&fit=crop'
    ],
    features: ['Marina Access', 'Infinity Pool', 'Fitness Center', 'Children\'s Play Area', 'Retail Podium'],
    client: 'Sorouh Real Estate',
    budget: '$75M - $95M',
    timeline: '30 months',
    featured: false,
    published: true,
    display_order: 5
  },
  {
    title: 'Downtown Mixed-Use',
    slug: 'downtown-mixed-use',
    category: 'mixed-use',
    location: 'Downtown Dubai',
    area: '680,000 sq ft',
    year: '2024',
    status: 'Under Construction',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
    description: 'Mixed-use development combining retail, office, and residential spaces',
    full_description: 'This ambitious mixed-use development in the heart of Downtown Dubai represents the future of urban living. The project seamlessly integrates retail, office, and residential components into a cohesive architectural statement that contributes to the vibrancy of the city center while providing diverse spaces for living, working, and recreation.',
    services: ['Master Planning', 'Design Development', 'Tender Documentation', 'MEP Coordination', 'Traffic Impact Assessment'],
    tags: ['Mixed-use', 'Urban', 'Integration'],
    gallery: [
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&fit=crop'
    ],
    features: ['Public Plaza', 'Sky Bridge Connections', 'LEED Gold Certification', 'Metro Connectivity', 'Central Atrium'],
    client: 'Emaar Properties',
    budget: '$200M - $250M',
    timeline: '42 months',
    featured: true,
    published: true,
    display_order: 6
  },
  {
    title: 'Palm Jumeirah Villa',
    slug: 'palm-jumeirah-villa',
    category: 'residential',
    location: 'Palm Jumeirah, Dubai',
    area: '15,000 sq ft',
    year: '2023',
    status: 'Completed',
    image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=600&fit=crop',
    description: 'Beachfront villa with infinity pool and private beach access',
    full_description: 'Positioned on the prestigious Palm Jumeirah, this extraordinary beachfront villa epitomizes luxury coastal living. The design maximizes the prime waterfront location with expansive glass walls, multiple outdoor entertaining areas, and a stunning infinity pool that appears to merge with the Arabian Gulf horizon.',
    services: ['Concept Design', 'Construction Drawings', 'Interior Design', 'Pool Design', 'Landscape Architecture'],
    tags: ['Beachfront', 'Luxury', 'Private'],
    gallery: [
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200&h=800&fit=crop'
    ],
    features: ['Private Beach', 'Infinity Pool', 'Boat Dock', 'Home Theater', 'Wine Cellar'],
    client: 'Private Client',
    budget: '$4M - $5M',
    timeline: '20 months',
    featured: false,
    published: true,
    display_order: 7
  },
  {
    title: 'Dubai South Office Complex',
    slug: 'dubai-south-office-complex',
    category: 'commercial',
    location: 'Dubai South',
    area: '200,000 sq ft',
    year: '2024',
    status: 'In Design',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
    description: 'Modern office complex with flexible workspaces and sustainable design',
    full_description: 'This forward-thinking office complex in Dubai South is designed to accommodate the evolving needs of modern businesses. The project features highly flexible floor plates, advanced building systems, and sustainable design principles that reduce environmental impact while creating inspiring work environments.',
    services: ['Schematic Design', 'Design Development', 'MEP Coordination', 'Sustainability Consulting', 'Interior Design'],
    tags: ['Office', 'Flexible', 'Sustainable'],
    gallery: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&h=800&fit=crop'
    ],
    features: ['Modular Office Spaces', 'Green Roof', 'Electric Vehicle Charging', 'Conference Center', 'Cafeteria'],
    client: 'Dubai South Properties',
    budget: '$45M - $60M',
    timeline: '28 months',
    featured: false,
    published: true,
    display_order: 8
  },
  {
    title: 'Khalifa City Educational Campus',
    slug: 'khalifa-city-educational-campus',
    category: 'institutional',
    location: 'Khalifa City, Abu Dhabi',
    area: '150,000 sq ft',
    year: '2023',
    status: 'Completed',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=600&fit=crop',
    description: 'State-of-the-art educational campus with innovative learning spaces',
    full_description: 'This transformative educational campus in Khalifa City sets new standards for learning environments in the UAE. The design incorporates cutting-edge educational philosophies with innovative architectural solutions, creating flexible learning spaces that adapt to diverse teaching methodologies and inspire academic excellence.',
    services: ['Master Planning', 'Design Development', 'Authority Approvals', 'Educational Consulting', 'Technology Integration'],
    tags: ['Education', 'Innovation', 'Campus'],
    gallery: [
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=800&fit=crop'
    ],
    features: ['Science Laboratories', 'Innovation Hub', 'Athletic Facilities', 'Auditorium', 'Library'],
    client: 'Abu Dhabi Education Council',
    budget: '$35M - $45M',
    timeline: '32 months',
    featured: false,
    published: true,
    display_order: 9
  }
]

// ============================================
// STYLES DATA
// ============================================
const stylesData = [
  {
    title: "Contemporary Minimalism",
    slug: "contemporary-minimalism",
    icon: "🏗️",
    gradient: "from-slate-600 to-slate-800",
    short_description: "Clean lines, open spaces, and functional beauty defining modern UAE architecture.",
    description: "Contemporary Minimalism represents the essence of modern architectural philosophy, emphasizing simplicity, functionality, and the strategic use of space and light. This style has gained significant traction in the UAE's urban landscape, particularly in high-end residential and commercial developments.",
    extended_description: "Our approach to Contemporary Minimalism integrates cutting-edge building technologies with sustainable design principles, creating spaces that are not only visually striking but also environmentally responsible and highly functional for the UAE's climate and lifestyle demands.",
    features: ["Clean geometric lines and forms", "Extensive use of glass and steel", "Open floor plans with flexible spaces", "Neutral color palettes", "Integration of natural light", "Sustainable material selection"],
    applications: ["Luxury residential villas", "High-rise apartment buildings", "Corporate office complexes", "Boutique retail spaces", "Modern educational facilities"],
    materials: ["Structural glass systems", "Polished concrete", "Brushed steel finishes", "Natural stone accents", "Composite panels"],
    compliance: ["Dubai Municipality Standards", "Abu Dhabi Urban Planning Council", "Green Building Regulations", "Fire Safety Compliance"],
    images: {
      hero: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      gallery: [
        { url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80", caption: "Modern villa exterior showcasing clean lines" },
        { url: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80", caption: "Interior space with natural lighting" }
      ],
      featured: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1200&q=80"
    },
    display_order: 1,
    published: true
  },
  {
    title: "Modern Emirati Fusion",
    slug: "modern-emirati-fusion",
    icon: "🕌",
    gradient: "from-amber-600 to-orange-700",
    short_description: "Blending traditional Emirati architectural elements with contemporary design innovations.",
    description: "Modern Emirati Fusion celebrates the rich architectural heritage of the UAE while embracing contemporary design principles and modern living requirements. This style creates a unique identity that resonates with local culture while meeting international standards.",
    extended_description: "Our Modern Emirati Fusion designs incorporate traditional elements such as mashrabiya screens, courtyards, and wind towers, reimagined through modern materials and construction techniques to create culturally authentic yet thoroughly contemporary spaces.",
    features: ["Traditional mashrabiya patterns", "Contemporary courtyard designs", "Modern interpretation of wind towers", "Cultural motifs in modern materials", "Integration of traditional colors", "Climate-responsive design elements"],
    applications: ["Cultural centers and museums", "Government buildings", "Heritage-inspired residences", "Hospitality projects", "Mixed-use developments"],
    materials: ["Locally sourced stone", "Modern mashrabiya screens", "Decorative metalwork", "Traditional tile patterns", "Contemporary timber elements"],
    compliance: ["Cultural Heritage Guidelines", "UAE Building Code", "Local Authority Approvals", "Traditional Design Standards"],
    images: {
      hero: "https://images.unsplash.com/photo-1548919973-5cef591cdbc9?w=1200&q=80",
      gallery: [
        { url: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80", caption: "Traditional mashrabiya with modern interpretation" },
        { url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80", caption: "Contemporary courtyard design" }
      ],
      featured: "https://images.unsplash.com/photo-1583416750470-965b2707b355?w=1200&q=80"
    },
    display_order: 2,
    published: true
  },
  {
    title: "Neoclassical Mediterranean",
    slug: "neoclassical-mediterranean",
    icon: "🏛️",
    gradient: "from-stone-500 to-stone-700",
    short_description: "Timeless elegance combining classical proportions with Mediterranean coastal influences.",
    description: "Neoclassical Mediterranean style brings together the grandeur of classical architecture with the relaxed elegance of Mediterranean coastal design. This approach has proven particularly popular in luxury residential developments across the UAE.",
    extended_description: "Our Neoclassical Mediterranean designs feature classical proportions, symmetrical facades, and the use of natural materials, while incorporating modern amenities and climate control systems essential for UAE living conditions.",
    features: ["Classical columns and proportions", "Symmetrical facade compositions", "Natural stone and stucco finishes", "Arched windows and doorways", "Terracotta roof elements", "Landscaped courtyards"],
    applications: ["Luxury residential estates", "Exclusive resort developments", "Private club facilities", "Boutique hotels", "Upscale retail complexes"],
    materials: ["Natural limestone", "Travertine stone", "Wrought iron details", "Clay roof tiles", "Marble accents"],
    compliance: ["Luxury Development Standards", "Coastal Building Regulations", "Heritage Conservation Guidelines", "Resort Planning Requirements"],
    images: {
      hero: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80",
      gallery: [
        { url: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80", caption: "Classical columns and elegant proportions" },
        { url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", caption: "Mediterranean courtyard design" }
      ],
      featured: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80"
    },
    display_order: 3,
    published: true
  },
  {
    title: "Islamic Architecture",
    slug: "islamic-architecture",
    icon: "☪️",
    gradient: "from-emerald-600 to-teal-700",
    short_description: "Sacred geometry and traditional Islamic design principles in contemporary expression.",
    description: "Islamic Architecture represents a deep understanding of traditional Islamic design principles, incorporating sacred geometry, intricate patterns, and spiritual symbolism into contemporary architectural solutions.",
    extended_description: "Our Islamic Architecture designs honor centuries-old traditions while meeting modern functional requirements, creating spaces that serve both spiritual and practical needs in the contemporary UAE context.",
    features: ["Sacred geometric patterns", "Intricate Islamic calligraphy", "Traditional dome structures", "Ornate mihrab designs", "Courtyard prayer spaces", "Islamic art integration"],
    applications: ["Mosques and Islamic centers", "Religious educational facilities", "Cultural institutions", "Islamic banks and offices", "Pilgrimage facilities"],
    materials: ["Carved stone work", "Decorative ceramics", "Gold leaf details", "Handcrafted woodwork", "Geometric tile patterns"],
    compliance: ["Islamic Architecture Guidelines", "Religious Building Standards", "Cultural Sensitivity Requirements", "Traditional Craft Standards"],
    images: {
      hero: "https://images.unsplash.com/photo-1549180030-48bf079fb38a?w=1200&q=80",
      gallery: [
        { url: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&q=80", caption: "Sacred geometric patterns and details" },
        { url: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=800&q=80", caption: "Traditional Islamic architectural elements" }
      ],
      featured: "https://images.unsplash.com/photo-1585554018413-c8b3ac7fd613?w=1200&q=80"
    },
    display_order: 4,
    published: true
  },
  {
    title: "Futuristic Parametric",
    slug: "futuristic-parametric",
    icon: "🚀",
    gradient: "from-cyan-500 to-blue-700",
    short_description: "Cutting-edge computational design creating innovative and dynamic architectural forms.",
    description: "Futuristic Parametric design represents the forefront of architectural innovation, utilizing advanced computational design tools to create dynamic, responsive, and highly optimized building forms.",
    extended_description: "Our Futuristic Parametric approach leverages artificial intelligence, algorithmic design, and advanced building technologies to create structures that are not only visually striking but also highly efficient and responsive to environmental conditions.",
    features: ["Algorithmic design generation", "Dynamic facade systems", "Responsive building skins", "Computational optimization", "Parametric pattern generation", "Smart building integration"],
    applications: ["Innovation centers", "Technology headquarters", "Exhibition pavilions", "Research facilities", "Smart city developments"],
    materials: ["Advanced composite materials", "Smart glass systems", "3D printed components", "Carbon fiber elements", "Responsive materials"],
    compliance: ["Innovation Building Standards", "Smart City Guidelines", "Advanced Technology Approvals", "Sustainable Innovation Requirements"],
    images: {
      hero: "https://images.unsplash.com/photo-1551801841-ecad875a5142?w=1200&q=80",
      gallery: [
        { url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80", caption: "Parametric facade with dynamic patterns" },
        { url: "https://images.unsplash.com/photo-1570126618678-d46d15d23bb6?w=800&q=80", caption: "Futuristic structural elements" }
      ],
      featured: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=1200&q=80"
    },
    display_order: 5,
    published: true
  },
  {
    title: "Sustainable Passive",
    slug: "sustainable-passive",
    icon: "🌱",
    gradient: "from-green-600 to-emerald-700",
    short_description: "Environmentally conscious design maximizing energy efficiency and natural comfort.",
    description: "Sustainable Passive design prioritizes environmental responsibility and energy efficiency, creating buildings that work in harmony with the UAE's climate while minimizing environmental impact.",
    extended_description: "Our Sustainable Passive designs incorporate passive cooling strategies, renewable energy systems, and environmentally responsible materials to create buildings that are both comfortable and sustainable in the UAE's challenging climate.",
    features: ["Passive solar design", "Natural ventilation systems", "Renewable energy integration", "Water conservation systems", "Sustainable material selection", "Biodiversity integration"],
    applications: ["Eco-friendly residences", "Green office buildings", "Sustainable schools", "Environmental research centers", "Net-zero developments"],
    materials: ["Recycled and reclaimed materials", "Low-carbon concrete", "Sustainable timber", "Solar panel integration", "Green roof systems"],
    compliance: ["LEED Certification Standards", "BREEAM Requirements", "UAE Green Building Guidelines", "Sustainability Reporting Standards"],
    images: {
      hero: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200&q=80",
      gallery: [
        { url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80", caption: "Green roof and sustainable design" },
        { url: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&q=80", caption: "Natural ventilation and passive cooling" }
      ],
      featured: "https://images.unsplash.com/photo-1524683745036-3d47ee6fb4c4?w=1200&q=80"
    },
    display_order: 6,
    published: true
  }
]

// ============================================
// TYPOLOGIES DATA
// ============================================
const typologiesData = [
  {
    title: "Residential",
    slug: "residential",
    icon: "🏠",
    gradient: "from-blue-600 to-indigo-700",
    short_description: "Comprehensive residential solutions from luxury villas to high-rise apartments.",
    description: "Our residential expertise encompasses the full spectrum of housing solutions in the UAE, from luxury waterfront villas to efficient urban apartments, each designed to meet the specific needs of modern UAE living.",
    extended_description: "We understand that residential architecture in the UAE must balance luxury, functionality, climate considerations, and cultural sensitivity, creating homes that are both impressive and livable in the local context.",
    features: ["Climate-responsive design", "Privacy and security integration", "Luxury amenity spaces", "Smart home technology", "Energy-efficient systems", "Cultural design sensitivity"],
    considerations: ["Climate adaptation", "Privacy requirements", "Family-oriented layouts", "Outdoor living spaces", "Sustainable technologies"],
    regulations: ["DLD Regulations", "RERA Standards", "Municipality Approvals", "Fire & Life Safety"],
    images: {
      hero: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
      projects: [
        { url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80", caption: "Luxury villa in Dubai Marina", location: "Dubai, UAE" },
        { url: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&q=80", caption: "Modern apartment complex", location: "Abu Dhabi, UAE" }
      ],
      featured: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80"
    },
    display_order: 1,
    published: true
  },
  {
    title: "Commercial",
    slug: "commercial",
    icon: "🏢",
    gradient: "from-purple-600 to-pink-700",
    short_description: "Dynamic commercial spaces designed for modern business success and growth.",
    description: "Commercial architecture requires a deep understanding of business operations, branding requirements, and user experience. Our commercial projects create environments that enhance productivity and reflect corporate identity.",
    extended_description: "From corporate headquarters to retail complexes, our commercial designs balance aesthetic appeal with functional efficiency, creating spaces that support business objectives while providing exceptional user experiences.",
    features: ["Flexible space planning", "Brand identity integration", "Technology infrastructure", "Sustainable operations", "Accessibility compliance", "Future adaptability"],
    considerations: ["Business operations efficiency", "Brand representation", "Employee wellbeing", "Client experience", "Technology integration"],
    regulations: ["Commercial Building Code", "Fire Safety Standards", "Accessibility Requirements", "Environmental Regulations"],
    images: {
      hero: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
      projects: [
        { url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80", caption: "Modern office complex in DIFC", location: "Dubai, UAE" },
        { url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80", caption: "Retail and commercial center", location: "Abu Dhabi, UAE" }
      ],
      featured: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&q=80"
    },
    display_order: 2,
    published: true
  },
  {
    title: "Hospitality",
    slug: "hospitality",
    icon: "🏨",
    gradient: "from-rose-500 to-red-700",
    short_description: "Exceptional hospitality experiences through thoughtful architectural design.",
    description: "Hospitality architecture creates memorable experiences through careful attention to guest journey, cultural authenticity, and operational efficiency. Our designs enhance the guest experience while supporting business objectives.",
    extended_description: "From luxury resorts to boutique hotels, our hospitality designs create unique environments that tell stories, celebrate local culture, and provide exceptional comfort for guests from around the world.",
    features: ["Guest experience design", "Cultural authenticity", "Operational efficiency", "Luxury amenities", "Sustainability integration", "Technology integration"],
    considerations: ["Guest journey optimization", "Service efficiency", "Cultural sensitivity", "Brand experience", "Revenue optimization"],
    regulations: ["Tourism Authority Standards", "Hotel Licensing Requirements", "Food Service Regulations", "Entertainment Licensing"],
    images: {
      hero: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80",
      projects: [
        { url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80", caption: "Luxury resort on Saadiyat Island", location: "Abu Dhabi, UAE" },
        { url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80", caption: "Boutique hotel in old Dubai", location: "Dubai, UAE" }
      ],
      featured: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80"
    },
    display_order: 3,
    published: true
  },
  {
    title: "Cultural & Institutional",
    slug: "cultural-institutional",
    icon: "🏛️",
    gradient: "from-amber-600 to-yellow-700",
    short_description: "Inspiring spaces for education, culture, and community gathering.",
    description: "Cultural and institutional architecture serves the community by creating inspiring spaces for learning, cultural expression, and civic engagement. These projects require deep understanding of user needs and cultural significance.",
    extended_description: "Our cultural and institutional designs celebrate local heritage while providing modern functionality, creating spaces that serve diverse communities and support the UAE's vision for cultural and educational excellence.",
    features: ["Community accessibility", "Cultural sensitivity", "Educational functionality", "Civic representation", "Heritage preservation", "Public safety"],
    considerations: ["Community needs", "Cultural significance", "Educational requirements", "Public accessibility", "Long-term sustainability"],
    regulations: ["Cultural Authority Guidelines", "Educational Standards", "Public Building Code", "Heritage Conservation Rules"],
    images: {
      hero: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=80",
      projects: [
        { url: "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800&q=80", caption: "Cultural museum in Abu Dhabi", location: "Abu Dhabi, UAE" },
        { url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80", caption: "Educational facility in Dubai", location: "Dubai, UAE" }
      ],
      featured: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1200&q=80"
    },
    display_order: 4,
    published: true
  }
]

// ============================================
// TEAM MEMBERS DATA
// ============================================
const teamMembersData = [
  {
    name: "Ahmed Al Rashid",
    position: "Principal Architect & Founder",
    bio: "With over 20 years of experience in UAE architecture, Ahmed founded Merka to bridge the gap between design vision and practical execution. His expertise spans luxury residential, commercial towers, and cultural projects across Dubai and Abu Dhabi.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    linkedin: "https://linkedin.com",
    email: "ahmed@merka.ae",
    display_order: 1,
    published: true
  },
  {
    name: "Sarah Mitchell",
    position: "Design Director",
    bio: "Sarah brings international design expertise combined with deep knowledge of UAE building regulations. She leads our design team in creating innovative solutions that balance aesthetics with functionality.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    linkedin: "https://linkedin.com",
    email: "sarah@merka.ae",
    display_order: 2,
    published: true
  },
  {
    name: "Omar Hassan",
    position: "Technical Director",
    bio: "Omar oversees all technical aspects of our projects, ensuring compliance with local regulations and construction standards. His background in structural engineering brings valuable technical rigor to every project.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    linkedin: "https://linkedin.com",
    email: "omar@merka.ae",
    display_order: 3,
    published: true
  },
  {
    name: "Fatima Al Mazrouei",
    position: "Senior Project Architect",
    bio: "Fatima specializes in hospitality and cultural projects, bringing a unique perspective that blends traditional Emirati design elements with contemporary architecture.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
    linkedin: "https://linkedin.com",
    email: "fatima@merka.ae",
    display_order: 4,
    published: true
  },
  {
    name: "James Wong",
    position: "BIM Manager",
    bio: "James leads our BIM coordination efforts, ensuring seamless collaboration between all project stakeholders. His expertise in digital construction methodologies has streamlined our delivery process.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    linkedin: "https://linkedin.com",
    email: "james@merka.ae",
    display_order: 5,
    published: true
  }
]

// ============================================
// HERO SLIDES DATA
// ============================================
const heroSlidesData = [
  {
    title: "Crafting Architectural Masterpieces",
    subtitle: "Dubai's premier architectural studio creating iconic designs that blend innovation, culture, and sustainability",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80",
    link: "/projects",
    display_order: 1
  },
  {
    title: "Innovative Design Solutions",
    subtitle: "From concept to completion, we deliver exceptional architectural solutions for the UAE's most ambitious projects",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80",
    link: "/services",
    display_order: 2
  },
  {
    title: "Sustainable Architecture",
    subtitle: "Creating environmentally responsible buildings that harmonize with the UAE's unique climate and culture",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80",
    link: "/about",
    display_order: 3
  },
  {
    title: "Luxury Residential Design",
    subtitle: "Exceptional homes that reflect the pinnacle of contemporary living in Dubai and across the Emirates",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80",
    link: "/projects",
    display_order: 4
  }
]

// ============================================
// MIGRATION FUNCTIONS
// ============================================

async function migrateBlogs() {
  console.log('\n📝 Migrating Blogs...')
  
  let successCount = 0
  let skipCount = 0
  let errorCount = 0
  
  for (const blog of blogPostsData) {
    try {
      // Check if blog already exists
      const { data: existing } = await supabase
        .from('blogs')
        .select('id')
        .eq('slug', blog.slug)
        .single()
      
      if (existing) {
        console.log(`   ⏭️  Skipping (already exists): ${blog.title}`)
        skipCount++
        continue
      }
      
      // Insert blog
      const { error } = await supabase
        .from('blogs')
        .insert({
          ...blog,
          sections: [],
          meta_title: blog.title,
          meta_description: blog.excerpt
        })
      
      if (error) {
        console.error(`   ❌ Error inserting "${blog.title}":`, error.message)
        errorCount++
      } else {
        console.log(`   ✅ Migrated: ${blog.title}`)
        successCount++
      }
    } catch (err) {
      console.error(`   ❌ Exception for "${blog.title}":`, err.message)
      errorCount++
    }
  }
  
  console.log(`\n   📊 Blogs Summary: ${successCount} migrated, ${skipCount} skipped, ${errorCount} errors`)
  return { success: successCount, skipped: skipCount, errors: errorCount }
}

async function migrateServices() {
  console.log('\n🛠️  Migrating Services...')
  
  let successCount = 0
  let skipCount = 0
  let errorCount = 0
  
  for (const service of servicesData) {
    try {
      // Check if service already exists
      const { data: existing } = await supabase
        .from('services')
        .select('id')
        .eq('slug', service.slug)
        .single()
      
      if (existing) {
        console.log(`   ⏭️  Skipping (already exists): ${service.title}`)
        skipCount++
        continue
      }
      
      // Insert service
      const { error } = await supabase
        .from('services')
        .insert({
          ...service,
          sections: [],
          meta_title: service.title,
          meta_description: service.description
        })
      
      if (error) {
        console.error(`   ❌ Error inserting "${service.title}":`, error.message)
        errorCount++
      } else {
        console.log(`   ✅ Migrated: ${service.title}`)
        successCount++
      }
    } catch (err) {
      console.error(`   ❌ Exception for "${service.title}":`, err.message)
      errorCount++
    }
  }
  
  console.log(`\n   📊 Services Summary: ${successCount} migrated, ${skipCount} skipped, ${errorCount} errors`)
  return { success: successCount, skipped: skipCount, errors: errorCount }
}

async function migrateProjects() {
  console.log('\n🏗️  Migrating Projects...')
  
  let successCount = 0
  let skipCount = 0
  let errorCount = 0
  
  for (const project of projectsData) {
    try {
      const { data: existing } = await supabase
        .from('projects')
        .select('id')
        .eq('slug', project.slug)
        .single()
      
      if (existing) {
        console.log(`   ⏭️  Skipping (already exists): ${project.title}`)
        skipCount++
        continue
      }
      
      const { error } = await supabase
        .from('projects')
        .insert({
          ...project,
          sections: [],
          meta_title: project.title,
          meta_description: project.description
        })
      
      if (error) {
        console.error(`   ❌ Error inserting "${project.title}":`, error.message)
        errorCount++
      } else {
        console.log(`   ✅ Migrated: ${project.title}`)
        successCount++
      }
    } catch (err) {
      console.error(`   ❌ Exception for "${project.title}":`, err.message)
      errorCount++
    }
  }
  
  console.log(`\n   📊 Projects Summary: ${successCount} migrated, ${skipCount} skipped, ${errorCount} errors`)
  return { success: successCount, skipped: skipCount, errors: errorCount }
}

async function migrateStyles() {
  console.log('\n🎨 Migrating Styles...')
  
  let successCount = 0
  let skipCount = 0
  let errorCount = 0
  
  for (const style of stylesData) {
    try {
      const { data: existing } = await supabase
        .from('styles')
        .select('id')
        .eq('slug', style.slug)
        .single()
      
      if (existing) {
        console.log(`   ⏭️  Skipping (already exists): ${style.title}`)
        skipCount++
        continue
      }
      
      const { error } = await supabase
        .from('styles')
        .insert({
          ...style,
          meta_title: style.title,
          meta_description: style.short_description
        })
      
      if (error) {
        console.error(`   ❌ Error inserting "${style.title}":`, error.message)
        errorCount++
      } else {
        console.log(`   ✅ Migrated: ${style.title}`)
        successCount++
      }
    } catch (err) {
      console.error(`   ❌ Exception for "${style.title}":`, err.message)
      errorCount++
    }
  }
  
  console.log(`\n   📊 Styles Summary: ${successCount} migrated, ${skipCount} skipped, ${errorCount} errors`)
  return { success: successCount, skipped: skipCount, errors: errorCount }
}

async function migrateTypologies() {
  console.log('\n🏛️  Migrating Typologies...')
  
  let successCount = 0
  let skipCount = 0
  let errorCount = 0
  
  for (const typology of typologiesData) {
    try {
      const { data: existing } = await supabase
        .from('typologies')
        .select('id')
        .eq('slug', typology.slug)
        .single()
      
      if (existing) {
        console.log(`   ⏭️  Skipping (already exists): ${typology.title}`)
        skipCount++
        continue
      }
      
      const { error } = await supabase
        .from('typologies')
        .insert({
          ...typology,
          meta_title: typology.title,
          meta_description: typology.short_description
        })
      
      if (error) {
        console.error(`   ❌ Error inserting "${typology.title}":`, error.message)
        errorCount++
      } else {
        console.log(`   ✅ Migrated: ${typology.title}`)
        successCount++
      }
    } catch (err) {
      console.error(`   ❌ Exception for "${typology.title}":`, err.message)
      errorCount++
    }
  }
  
  console.log(`\n   📊 Typologies Summary: ${successCount} migrated, ${skipCount} skipped, ${errorCount} errors`)
  return { success: successCount, skipped: skipCount, errors: errorCount }
}

async function migrateTeamMembers() {
  console.log('\n👥 Migrating Team Members...')
  
  let successCount = 0
  let skipCount = 0
  let errorCount = 0
  
  for (const member of teamMembersData) {
    try {
      const { data: existing } = await supabase
        .from('team_members')
        .select('id')
        .eq('name', member.name)
        .single()
      
      if (existing) {
        console.log(`   ⏭️  Skipping (already exists): ${member.name}`)
        skipCount++
        continue
      }
      
      const { error } = await supabase
        .from('team_members')
        .insert(member)
      
      if (error) {
        console.error(`   ❌ Error inserting "${member.name}":`, error.message)
        errorCount++
      } else {
        console.log(`   ✅ Migrated: ${member.name}`)
        successCount++
      }
    } catch (err) {
      console.error(`   ❌ Exception for "${member.name}":`, err.message)
      errorCount++
    }
  }
  
  console.log(`\n   📊 Team Members Summary: ${successCount} migrated, ${skipCount} skipped, ${errorCount} errors`)
  return { success: successCount, skipped: skipCount, errors: errorCount }
}

async function migrateHeroSlides() {
  console.log('\n🖼️  Migrating Hero Slides...')
  
  let successCount = 0
  let skipCount = 0
  let errorCount = 0
  
  for (const slide of heroSlidesData) {
    try {
      const { data: existing } = await supabase
        .from('hero_slides')
        .select('id')
        .eq('title', slide.title)
        .single()
      
      if (existing) {
        console.log(`   ⏭️  Skipping (already exists): ${slide.title}`)
        skipCount++
        continue
      }
      
      const { error } = await supabase
        .from('hero_slides')
        .insert(slide)
      
      if (error) {
        console.error(`   ❌ Error inserting "${slide.title}":`, error.message)
        errorCount++
      } else {
        console.log(`   ✅ Migrated: ${slide.title}`)
        successCount++
      }
    } catch (err) {
      console.error(`   ❌ Exception for "${slide.title}":`, err.message)
      errorCount++
    }
  }
  
  console.log(`\n   📊 Hero Slides Summary: ${successCount} migrated, ${skipCount} skipped, ${errorCount} errors`)
  return { success: successCount, skipped: skipCount, errors: errorCount }
}

// ============================================
// MAIN EXECUTION
// ============================================

async function main() {
  console.log('🚀 Starting FULL Data Migration to Supabase')
  console.log('=' .repeat(50))
  console.log(`📍 Supabase URL: ${supabaseUrl}`)
  console.log('=' .repeat(50))
  
  try {
    // Test connection
    const { data, error } = await supabase.from('blogs').select('count').limit(1)
    if (error && error.code !== 'PGRST116') {
      console.error('❌ Failed to connect to Supabase:', error.message)
      process.exit(1)
    }
    console.log('✅ Connected to Supabase successfully\n')
    
    // Run all migrations
    const blogsResult = await migrateBlogs()
    const servicesResult = await migrateServices()
    const projectsResult = await migrateProjects()
    const stylesResult = await migrateStyles()
    const typologiesResult = await migrateTypologies()
    const teamResult = await migrateTeamMembers()
    const heroResult = await migrateHeroSlides()
    
    // Final summary
    console.log('\n' + '=' .repeat(50))
    console.log('🎉 FULL MIGRATION COMPLETE')
    console.log('=' .repeat(50))
    console.log(`📝 Blogs:        ${blogsResult.success} migrated, ${blogsResult.skipped} skipped, ${blogsResult.errors} errors`)
    console.log(`🛠️  Services:     ${servicesResult.success} migrated, ${servicesResult.skipped} skipped, ${servicesResult.errors} errors`)
    console.log(`🏗️  Projects:     ${projectsResult.success} migrated, ${projectsResult.skipped} skipped, ${projectsResult.errors} errors`)
    console.log(`🎨 Styles:       ${stylesResult.success} migrated, ${stylesResult.skipped} skipped, ${stylesResult.errors} errors`)
    console.log(`🏛️  Typologies:   ${typologiesResult.success} migrated, ${typologiesResult.skipped} skipped, ${typologiesResult.errors} errors`)
    console.log(`👥 Team:         ${teamResult.success} migrated, ${teamResult.skipped} skipped, ${teamResult.errors} errors`)
    console.log(`🖼️  Hero Slides:  ${heroResult.success} migrated, ${heroResult.skipped} skipped, ${heroResult.errors} errors`)
    console.log('=' .repeat(50))
    
    const totalMigrated = blogsResult.success + servicesResult.success + projectsResult.success + 
                          stylesResult.success + typologiesResult.success + teamResult.success + heroResult.success
    const totalSkipped = blogsResult.skipped + servicesResult.skipped + projectsResult.skipped + 
                         stylesResult.skipped + typologiesResult.skipped + teamResult.skipped + heroResult.skipped
    const totalErrors = blogsResult.errors + servicesResult.errors + projectsResult.errors + 
                        stylesResult.errors + typologiesResult.errors + teamResult.errors + heroResult.errors
    
    console.log(`\n📊 TOTAL: ${totalMigrated} migrated, ${totalSkipped} skipped, ${totalErrors} errors`)
    console.log('=' .repeat(50))
    
  } catch (err) {
    console.error('\n❌ Migration failed:', err.message)
    process.exit(1)
  }
}

main()
