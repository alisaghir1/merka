/**
 * Blog Migration Script - PART 1 of 3
 * Migrates blogs 1-4 to Supabase
 * 
 * Run this script with: node scripts/migrate-blogs-part1.js
 */

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials. Check your .env.local file.')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

// ============================================
// BLOGS DATA - PART 1 (Blogs 1-4)
// ============================================
const blogsDataPart1 = [
  // ============================================
  // BLOG 1: 2025 Architectural Trends Shaping the UAE's Built Environment
  // ============================================
  {
    title: "2025 Architectural Trends Shaping the UAE's Built Environment",
    slug: "2025-architectural-trends-shaping-uae-built-environment",
    excerpt: "Explore 2025 design trends from Merka Architecture. Learn how UAE buildings are adapting to climate, regulation, and new space demands.",
    content: `The architecture industry in the UAE continues to evolve at a rapid pace. As we move through 2025, several key trends are reshaping how buildings are designed, approved, and constructed across Dubai, Abu Dhabi, and the wider Emirates.

At Merka Architecture, we track these shifts closely to ensure our projects remain aligned with market expectations, regulatory frameworks, and the long-term needs of our clients. This article outlines the most significant architectural trends currently influencing the UAE's built environment.

## Climate-Responsive Design Takes Center Stage

The UAE's extreme climate has always influenced building design, but 2025 marks a turning point in how seriously climate response is integrated from concept stage. Projects now routinely incorporate:

- Advanced shading systems that respond to sun angles throughout the day
- High-performance glazing with solar control coatings
- Natural ventilation strategies where applicable
- Thermal mass optimization for temperature regulation
- Green roofs and vertical gardens for heat island mitigation

Regulatory bodies including Dubai Municipality and Abu Dhabi's Department of Municipalities and Transport are enforcing stricter environmental performance standards. Buildings must now demonstrate compliance with updated Estidama and Al Sa'fat requirements from the earliest design stages.

## Flexible Space Programming

The post-pandemic shift toward hybrid work models continues to influence commercial and mixed-use developments. We are seeing increased demand for:

- Convertible floor plates that can shift between office, retail, and community uses
- Modular partition systems that allow quick reconfiguration
- Enhanced indoor air quality systems as standard features
- Dedicated wellness and fitness areas within commercial developments
- Outdoor terraces and balconies integrated into office floor plans

These requirements directly impact structural grids, core positions, and facade designs from the earliest planning stages.

## Height and Density Optimization

Urban land values continue to drive vertical development, but with more nuanced approaches than in previous cycles. Current projects focus on:

- Efficient core-to-floor area ratios that maximize usable space
- Slender tower profiles that reduce wind load and material use
- Podium designs that activate street level while supporting tower loads
- Sky gardens and amenity floors that break up tower massing
- Careful analysis of view corridors and shadowing impacts

Dubai's updated building codes now require more detailed shadow studies and wind analysis for towers above certain heights, adding complexity to the approval process but improving overall urban quality.

## Material Innovation and Local Sourcing

Supply chain considerations and sustainability goals are driving a renewed focus on material selection. Key developments include:

- Increased use of recycled and low-carbon concrete mixes
- Locally manufactured facade components reducing import dependencies
- Advanced composite materials for lightweight cladding systems
- Biophilic design elements using native plant species
- Smart glass technologies that adjust tint based on conditions

Merka Architecture maintains strong relationships with regional suppliers and manufacturers, allowing us to specify materials that meet both performance and availability requirements.

## Digital Integration Throughout Project Lifecycle

Building Information Modeling (BIM) has become mandatory for major projects, but the scope of digital integration continues to expand:

- Clash detection and coordination happening earlier in design phases
- Digital twins being developed for facility management purposes
- Automated quantity takeoffs improving cost estimation accuracy
- Virtual reality presentations replacing physical models for client reviews
- AI-assisted analysis for energy modeling and structural optimization

These tools are changing how we work and what clients expect from the design process.

## Looking Ahead

The trends shaping UAE architecture in 2025 point toward more responsive, efficient, and sustainable buildings. At Merka Architecture, we embrace these developments as opportunities to deliver better projects for our clients while contributing to the region's built environment.

For detailed guidance on how these trends might apply to your specific project, contact our team for a consultation.`,
    sections: JSON.stringify([
      {
        type: 'text',
        title: 'Climate-Responsive Design Takes Center Stage',
        content: 'The UAE\'s extreme climate has always influenced building design, but 2025 marks a turning point in how seriously climate response is integrated from concept stage.'
      },
      {
        type: 'text',
        title: 'Flexible Space Programming',
        content: 'The post-pandemic shift toward hybrid work models continues to influence commercial and mixed-use developments.'
      },
      {
        type: 'text',
        title: 'Height and Density Optimization',
        content: 'Urban land values continue to drive vertical development, but with more nuanced approaches than in previous cycles.'
      },
      {
        type: 'text',
        title: 'Material Innovation and Local Sourcing',
        content: 'Supply chain considerations and sustainability goals are driving a renewed focus on material selection.'
      },
      {
        type: 'text',
        title: 'Digital Integration Throughout Project Lifecycle',
        content: 'Building Information Modeling (BIM) has become mandatory for major projects, but the scope of digital integration continues to expand.'
      }
    ]),
    category: "Trends & Innovation",
    read_time: "8 min read",
    date: "2024-12-15",
    author: "Merka Architecture Team",
    featured: true,
    published: true,
    tags: ["Trends", "UAE", "Innovation", "2025", "Sustainability"],
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    meta_title: "2025 Architectural Trends Shaping the UAE's Built Environment - Merka Architecture",
    meta_description: "Explore 2025 design trends from Merka Architecture. Learn how UAE buildings are adapting to climate, regulation, and new space demands."
  },

  // ============================================
  // BLOG 2: Designing for Site: Coastal vs. Inland Architecture in the UAE
  // ============================================
  {
    title: "Designing for Site: Coastal vs. Inland Architecture in the UAE",
    slug: "designing-for-site-coastal-vs-inland-architecture-uae",
    excerpt: "Merka Architecture compares coastal and inland design strategies in the UAE. Learn how to address climate, salt, and thermal stress in different regions.",
    content: `The UAE presents a diverse range of site conditions that directly impact how buildings should be designed. While the country is often characterized by its desert climate, the reality is more nuanced. Coastal developments face fundamentally different challenges compared to inland projects, and understanding these distinctions is essential for successful architecture.

At Merka Architecture, we approach every project with careful site analysis as the foundation of our design process. This article explores the key differences between coastal and inland architecture in the UAE and how these factors influence our design decisions.

## Understanding UAE Microclimates

The UAE's geography creates distinct environmental zones that affect building performance:

### Coastal Zones (Dubai Marina, Abu Dhabi Corniche, RAK Coast)
- Higher humidity levels throughout the year
- Salt-laden air that accelerates material degradation
- Moderate temperature variations due to sea influence
- Onshore breezes that can be leveraged for natural ventilation
- Potential flood and storm surge considerations

### Inland Desert Zones (Al Ain, Dubai Inland, Sharjah Interior)
- Extreme temperature swings between day and night
- Lower humidity requiring different HVAC approaches
- Fine sand and dust infiltration challenges
- Intense solar radiation without coastal moderation
- Flash flood potential in wadi areas during rain events

## Material Selection Differences

The choice of building materials varies significantly between these zones:

### Coastal Projects
For waterfront developments, we prioritize:
- Marine-grade stainless steel hardware and fixings
- Powder-coated aluminum rather than standard finishes
- Concrete with enhanced sulfate resistance
- Sealants and gaskets rated for salt exposure
- Glass with protective coatings against salt accumulation

### Inland Projects
Desert conditions require different considerations:
- High thermal mass materials for temperature stabilization
- Light-colored surfaces to reduce heat absorption
- Sand-resistant mechanical systems and filters
- Materials that can handle extreme thermal expansion
- UV-stable finishes that resist degradation

## Facade Strategy Variations

The building envelope responds to site conditions in specific ways:

### Coastal Facade Design
- Larger openings to capture sea breezes
- Deep overhangs for rain protection
- Corrosion-resistant frame systems
- Operable elements for natural ventilation opportunities
- Elevated ground floors in flood-prone areas

### Inland Facade Design
- Smaller, strategically placed openings
- Extensive shading devices on all orientations
- Minimal thermal bridging in wall assemblies
- High insulation values to reduce cooling loads
- Double-skin systems for additional thermal protection

## Structural Considerations

Foundation and structural design also differs based on location:

### Coastal Foundations
- Higher groundwater levels requiring specialized waterproofing
- Potential for sulfate attack on concrete
- Cathodic protection for reinforcement in some cases
- Consideration of wave action for exposed structures
- Scour protection for waterfront elements

### Inland Foundations
- Expansive soil conditions in some areas
- Deep foundations to reach stable bearing layers
- Sand compaction requirements
- Less groundwater concern but flash flood provisions
- Thermal movement accommodation in large footprints

## HVAC and Building Services

Mechanical systems are configured differently based on climate zone:

### Coastal Systems
- Dehumidification as a primary concern
- Air intakes positioned to avoid salt contamination
- Condensate management for high-humidity conditions
- Potential for seawater cooling systems in large developments
- Enhanced filtration for salt-laden air

### Inland Systems
- Cooling load dominance with high peak demands
- Evaporative cooling potential in some applications
- Air filtration for dust and sand control
- Thermal storage systems for load shifting
- Solar shading integration with mechanical systems

## Landscape and Site Planning

External spaces require different approaches:

### Coastal Landscape Design
- Salt-tolerant plant species selection
- Wind protection for outdoor areas
- Shade structures that allow breeze penetration
- Drainage systems for storm events
- Beach and waterfront access integration

### Inland Landscape Design
- Drought-tolerant and native species
- Extensive shading for outdoor comfort
- Dust control through surface treatments
- Water feature integration for microclimate cooling
- Orientation for minimal afternoon sun exposure

## Regulatory Variations

Different authorities may apply specific requirements:

- Dubai Maritime City Authority for waterfront projects
- Civil Defense requirements vary by zone
- Environmental impact assessments differ in scope
- Flood zone designations affect design requirements
- Coastal setback requirements in some jurisdictions

## Merka Architecture's Site-First Approach

Every project we undertake begins with comprehensive site analysis. We evaluate:

1. Environmental conditions specific to the location
2. Regulatory requirements that apply to the zone
3. Material and system options appropriate for conditions
4. Long-term maintenance considerations
5. Climate change projections affecting the site

This analysis informs our design decisions and ensures buildings perform as intended throughout their service life.

## Conclusion

Successful architecture in the UAE requires understanding that one approach does not fit all sites. Coastal and inland projects demand different strategies for materials, facades, structure, and services. At Merka Architecture, we bring this site-specific expertise to every project, ensuring our designs respond appropriately to their unique conditions.

Contact our team to discuss how site analysis can improve your project outcomes.`,
    sections: JSON.stringify([
      {
        type: 'text',
        title: 'Understanding UAE Microclimates',
        content: 'The UAE\'s geography creates distinct environmental zones that affect building performance.'
      },
      {
        type: 'text',
        title: 'Material Selection Differences',
        content: 'The choice of building materials varies significantly between coastal and inland zones.'
      },
      {
        type: 'text',
        title: 'Facade Strategy Variations',
        content: 'The building envelope responds to site conditions in specific ways.'
      },
      {
        type: 'text',
        title: 'Structural Considerations',
        content: 'Foundation and structural design also differs based on location.'
      },
      {
        type: 'text',
        title: 'HVAC and Building Services',
        content: 'Mechanical systems are configured differently based on climate zone.'
      }
    ]),
    category: "Site Planning",
    read_time: "6 min read",
    date: "2024-12-10",
    author: "Merka Architecture Team",
    featured: false,
    published: true,
    tags: ["Site Planning", "Coastal Design", "Climate Response"],
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80",
    meta_title: "Designing for Site: Coastal vs. Inland Architecture in the UAE - Merka Architecture",
    meta_description: "Merka Architecture compares coastal and inland design strategies in the UAE. Learn how to address climate, salt, and thermal stress in different regions."
  },

  // ============================================
  // BLOG 3: Designing Mosques in the UAE: Architecture, Regulation, and Spatial Logic
  // ============================================
  {
    title: "Designing Mosques in the UAE: Architecture, Regulation, and Spatial Logic",
    slug: "designing-mosques-uae-architecture-regulation-spatial-logic",
    excerpt: "Explore mosque design in the UAE. Merka Architecture explains zoning, approvals, and spatial planning for religious projects in Dubai and beyond.",
    content: `Mosque design in the UAE combines religious tradition, cultural significance, and technical requirements into a specialized field of architecture. These projects require sensitivity to Islamic principles while meeting modern building standards and community needs.

At Merka Architecture, we approach mosque design with deep respect for religious requirements and thorough understanding of the regulatory framework that governs these buildings. This article provides insight into the key considerations for successful mosque projects in the UAE.

## Religious Requirements Informing Design

Islamic architecture follows principles that directly impact building layout and orientation:

### Qibla Orientation
- The prayer hall must orient toward Mecca (Qibla direction)
- In the UAE, the Qibla direction is approximately west-southwest
- The mihrab (prayer niche) marks this direction on the interior wall
- Building massing often reflects this orientation in exterior form
- Site planning must accommodate this fixed requirement

### Spatial Hierarchy
- Clear separation between sacred and service spaces
- Progression from public entry to prayer hall
- Distinct zones for men and women worshippers
- Imam's position and minbar (pulpit) placement
- Ablution areas positioned for ritual sequence

### Acoustic Requirements
- The imam's voice must reach all worshippers clearly
- Traditional domed spaces enhance natural acoustics
- Modern systems supplement acoustics where needed
- Carpeting and surface treatments affect sound quality
- External loudspeakers for call to prayer must meet regulations

## Regulatory Framework in the UAE

Mosque projects fall under specific regulatory oversight:

### Ministry of Islamic Affairs (AWQAF)
- Approves mosque designs before municipal submission
- Reviews religious space requirements and layout
- Confirms Qibla orientation accuracy
- Coordinates with other government departments
- Oversees completed mosques for community use

### Municipal Requirements
- Standard building code compliance for structure and safety
- Fire life safety provisions with specific occupancy calculations
- Accessibility requirements for worshippers with disabilities
- Parking provisions based on prayer hall capacity
- Landscape and site planning approvals

### Civil Defense
- Emergency egress calculations for congregation sizes
- Friday prayer surge capacity considerations
- Fire detection and suppression systems
- Emergency lighting and signage
- Evacuation route planning

## Spatial Planning Considerations

Effective mosque design balances multiple functional zones:

### Prayer Hall (Musalla)
The main prayer space requires careful planning:
- Sufficient area for worshippers during Friday prayers
- Clear sightlines to the mihrab and minbar
- Column placement that doesn't obstruct prayer rows
- Natural light strategies that don't cause glare
- Ceiling heights that create appropriate atmosphere

### Women's Prayer Area
Separate provisions for female worshippers:
- Direct access without crossing men's areas
- Clear view or audio connection to the imam
- Equivalent quality of finishes and comfort
- Separate ablution and service facilities
- Flexible capacity for varying attendance

### Ablution Facilities (Wudu Areas)
Ritual washing areas require specific design:
- Efficient water flow and drainage systems
- Non-slip flooring for wet conditions
- Seating arrangements for washing sequence
- Separate facilities for men and women
- Connection to prayer areas via covered routes

### Ancillary Spaces
Supporting functions that serve the community:
- Imam's office and administrative areas
- Islamic library or educational rooms
- Multi-purpose hall for community events
- Funeral preparation facilities where required
- Storage for religious texts and equipment

## Architectural Expression

Mosque design in the UAE balances tradition and modernity:

### Traditional Elements
- Domes that signify sacred space from distance
- Minarets marking the mosque's presence in the urban fabric
- Geometric patterns rooted in Islamic artistic tradition
- Calligraphy incorporating Quranic verses
- Courtyard spaces for gathering and overflow

### Contemporary Approaches
- Simplified geometric forms with modern materials
- Natural light strategies replacing traditional windows
- Sustainable systems honoring stewardship principles
- Flexible spaces serving diverse community needs
- Integration with urban context and surrounding buildings

### Material Palette
- Stone and marble for durability and dignity
- Wood elements for warmth in interior spaces
- Metalwork in traditional patterns with modern fabrication
- Glass that controls light while creating atmosphere
- Carpet selection balancing acoustics and maintenance

## Technical Requirements

Modern mosques must address technical challenges:

### Structural Systems
- Large clear spans for unobstructed prayer halls
- Dome construction with efficient structural geometry
- Minaret stability under wind loading
- Foundation design for concentrated loads
- Seismic considerations as applicable

### Environmental Control
- Cooling systems for large occupied volumes
- Air distribution that doesn't disturb worshippers
- Humidity control for material preservation
- Energy efficiency aligned with prayer schedules
- Natural ventilation where climate allows

### Lighting Design
- Natural light that inspires without creating glare
- Artificial lighting for evening prayers
- Feature lighting for architectural elements
- Emergency lighting meeting code requirements
- External lighting for nighttime visibility

## Merka Architecture's Experience

Our team has developed expertise in mosque design through projects across the UAE. We understand:

- The approval sequence through AWQAF and municipal authorities
- Religious requirements that must be accommodated in design
- Technical solutions for large-span prayer halls
- Material selections appropriate for sacred spaces
- Community engagement throughout the design process

## Conclusion

Mosque design represents a unique intersection of religious tradition, community service, and architectural craft. Success requires understanding both the sacred requirements and the regulatory framework governing these buildings in the UAE.

Merka Architecture welcomes inquiries from communities, developers, and government entities seeking experienced partners for mosque projects. Contact us to discuss your project requirements.`,
    sections: JSON.stringify([
      {
        type: 'text',
        title: 'Religious Requirements Informing Design',
        content: 'Islamic architecture follows principles that directly impact building layout and orientation.'
      },
      {
        type: 'text',
        title: 'Regulatory Framework in the UAE',
        content: 'Mosque projects fall under specific regulatory oversight including AWQAF and municipal requirements.'
      },
      {
        type: 'text',
        title: 'Spatial Planning Considerations',
        content: 'Effective mosque design balances multiple functional zones including prayer halls, ablution areas, and ancillary spaces.'
      },
      {
        type: 'text',
        title: 'Architectural Expression',
        content: 'Mosque design in the UAE balances tradition and modernity.'
      },
      {
        type: 'text',
        title: 'Technical Requirements',
        content: 'Modern mosques must address technical challenges in structure, environment, and lighting.'
      }
    ]),
    category: "Religious Architecture",
    read_time: "10 min read",
    date: "2024-12-08",
    author: "Merka Architecture Team",
    featured: false,
    published: true,
    tags: ["Mosque Design", "Religious Architecture", "UAE Regulations"],
    image: "https://images.unsplash.com/photo-1549180030-48bf079fb38a?w=800&q=80",
    meta_title: "Designing Mosques in the UAE: Architecture, Regulation, and Spatial Logic - Merka Architecture",
    meta_description: "Explore mosque design in the UAE. Merka Architecture explains zoning, approvals, and spatial planning for religious projects in Dubai and beyond."
  },

  // ============================================
  // BLOG 4: Facade Design Regulations in Dubai: What Every Project Must Address
  // ============================================
  {
    title: "Facade Design Regulations in Dubai: What Every Project Must Address",
    slug: "facade-design-regulations-dubai-what-every-project-must-address",
    excerpt: "Learn how Merka Architecture handles façade design regulations in Dubai. Glazing limits, fire ratings, shading rules, and approval strategies explained.",
    content: `Facade design in Dubai operates within a comprehensive regulatory framework that balances architectural expression with performance requirements. Understanding these regulations early in the design process is essential for avoiding costly revisions and delays during approval stages.

At Merka Architecture, we navigate these requirements daily and have developed systematic approaches to ensure compliance while achieving design excellence. This article outlines the key facade regulations that affect projects in Dubai.

## Dubai Municipality Green Building Regulations

The Al Sa'fat rating system governs facade performance:

### Glazing Ratios
- Maximum window-to-wall ratios vary by orientation
- South and west facades face stricter limitations
- Shading devices can offset some glazing requirements
- Performance-based calculations allow flexibility
- Overall building energy models affect allowable ratios

### Solar Heat Gain Coefficient (SHGC)
- Glazing must meet maximum SHGC values
- Lower values required for larger window areas
- High-performance coatings are typically necessary
- Framing thermal performance also regulated
- Specification coordination with glazing suppliers essential

### External Shading Requirements
- Horizontal projections required for south facades
- Vertical fins effective for east and west orientations
- Depth calculations based on glazing height
- Integration with facade architecture encouraged
- Fixed or operable options available

### Thermal Transmittance (U-Value)
- Wall assemblies must achieve minimum insulation
- Glazing U-values increasingly stringent
- Thermal bridging analysis required
- Assembly details reviewed for weak points
- Cold bridge mitigation strategies necessary

## Fire and Life Safety Requirements

Civil Defense regulations affect facade design significantly:

### Fire-Rated Assemblies
- Spandrel panels required between floors
- Minimum heights for fire separation
- Non-combustible material requirements
- Cavity barrier provisions for ventilated facades
- Fire stopping at penetrations and joints

### Compartmentation
- Facade must not compromise floor separation
- Curtain wall systems need appropriate ratings
- Fire-resistant glazing in some applications
- Smoke seal requirements at floor edges
- Inspection access for fire barriers

### Emergency Access
- Firefighter access panels in certain facades
- Breakable glazing requirements for rescue
- Facade platforms for fire department equipment
- Signage and marking for emergency panels
- Coordination with fire strategy documents

### Material Combustibility
- Recent updates restrict combustible cladding
- Aluminum composite panels face new rules
- Insulation material fire ratings specified
- Testing requirements for new products
- Existing building retrofit considerations

## Aesthetic and Urban Design Controls

Dubai's planning framework includes architectural guidelines:

### Building Height Zones
- Facade proportions influenced by height limits
- Setback requirements affect upper floors
- View corridor protections in some areas
- Landmark building special considerations
- Contextual height relationships

### Material Palettes
- Community-specific material guidance
- Color ranges defined for some developments
- Reflectivity limits for glazing
- Traditional design elements in heritage areas
- Contemporary expression in business districts

### Signage and Lighting
- Facade signage size and placement rules
- Illumination levels and timing restrictions
- Digital display regulations evolving
- Advertising board limitations
- Night-time facade lighting guidelines

## Technical Performance Standards

Beyond regulations, facades must meet technical benchmarks:

### Structural Wind Loading
- High-rise facades face significant wind pressures
- Corner conditions create additional stresses
- Wind tunnel testing for tall buildings
- Deflection limits for frame systems
- Connection capacity calculations

### Water Infiltration
- Testing standards for water resistance
- Joint design for thermal movement
- Drainage provisions for captured water
- Sealant specifications and warranties
- Mock-up testing requirements

### Acoustic Performance
- Sound transmission class requirements
- Aircraft noise zones near airports
- Road traffic noise attenuation
- Mechanical equipment screening
- Operable window acoustic considerations

### Maintenance Access
- Building maintenance unit provisions
- Cradle anchor points in facade
- Access door and platform requirements
- Cleaning system compatibility
- Replacement component access

## Approval Process Navigation

Successful facade approvals require strategic approaches:

### Pre-Submission Coordination
- Early meetings with DM technical reviewers
- Presentation of design intent and compliance strategy
- Identification of potential issues before formal submission
- Specialist consultant coordination
- Sample and mock-up planning

### Documentation Requirements
- Detailed facade drawings and specifications
- Energy modeling reports with assumptions
- Fire strategy integration documentation
- Structural calculations for facade elements
- Material data sheets and certifications

### Review and Response
- Timely responses to technical queries
- Clear explanation of design decisions
- Alternative solutions when issues arise
- Coordination between approval authorities
- Final approval and construction monitoring

## Merka Architecture's Approach

We integrate facade regulation compliance from concept design:

1. Early analysis of site-specific requirements
2. Coordination with specialist facade consultants
3. Energy modeling to guide glazing decisions
4. Fire strategy development with facade implications
5. Mock-up planning for complex assemblies
6. Approval process management through completion

## Conclusion

Dubai's facade regulations continue to evolve toward higher performance standards. Projects that address these requirements early avoid costly redesign and approval delays. Merka Architecture brings experience navigating this framework to every project, ensuring facades that perform as intended while achieving design excellence.

Contact our team for guidance on your project's facade strategy and regulatory compliance approach.`,
    sections: JSON.stringify([
      {
        type: 'text',
        title: 'Dubai Municipality Green Building Regulations',
        content: 'The Al Sa\'fat rating system governs facade performance including glazing ratios, SHGC, and thermal transmittance.'
      },
      {
        type: 'text',
        title: 'Fire and Life Safety Requirements',
        content: 'Civil Defense regulations affect facade design significantly with fire-rated assemblies and compartmentation.'
      },
      {
        type: 'text',
        title: 'Aesthetic and Urban Design Controls',
        content: 'Dubai\'s planning framework includes architectural guidelines for height zones, materials, and lighting.'
      },
      {
        type: 'text',
        title: 'Technical Performance Standards',
        content: 'Beyond regulations, facades must meet technical benchmarks for wind loading, water infiltration, and acoustics.'
      },
      {
        type: 'text',
        title: 'Approval Process Navigation',
        content: 'Successful facade approvals require strategic approaches including pre-submission coordination.'
      }
    ]),
    category: "Regulations & Compliance",
    read_time: "7 min read",
    date: "2024-12-05",
    author: "Merka Architecture Team",
    featured: false,
    published: true,
    tags: ["Facade Design", "Dubai Regulations", "Building Codes"],
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    meta_title: "Facade Design Regulations in Dubai: What Every Project Must Address - Merka Architecture",
    meta_description: "Learn how Merka Architecture handles façade design regulations in Dubai. Glazing limits, fire ratings, shading rules, and approval strategies explained."
  }
]

// ============================================
// MIGRATION FUNCTION
// ============================================
async function migrateBlogs() {
  console.log('🚀 Starting blogs migration (PART 1 of 3) to Supabase...')
  console.log(`📦 Blogs in this batch: ${blogsDataPart1.length}`)
  console.log('')

  let successCount = 0
  let errorCount = 0

  for (const blog of blogsDataPart1) {
    try {
      // Check if blog already exists
      const { data: existing } = await supabase
        .from('blogs')
        .select('id')
        .eq('slug', blog.slug)
        .single()

      if (existing) {
        // Update existing blog
        const { error } = await supabase
          .from('blogs')
          .update(blog)
          .eq('slug', blog.slug)

        if (error) throw error
        console.log(`✅ Updated: ${blog.title}`)
      } else {
        // Insert new blog
        const { error } = await supabase
          .from('blogs')
          .insert([blog])

        if (error) throw error
        console.log(`✅ Inserted: ${blog.title}`)
      }

      successCount++
    } catch (error) {
      console.error(`❌ Failed: ${blog.title}`)
      console.error(`   Error: ${error.message}`)
      errorCount++
    }
  }

  console.log('')
  console.log('========================================')
  console.log('📊 Part 1 Migration Summary:')
  console.log(`   ✅ Successful: ${successCount}`)
  console.log(`   ❌ Failed: ${errorCount}`)
  console.log(`   📦 Total in batch: ${blogsDataPart1.length}`)
  console.log('========================================')

  if (errorCount === 0) {
    console.log('🎉 Part 1 completed successfully!')
    console.log('👉 Next: Run migrate-blogs-part2.js')
  }
}

// Run the migration
migrateBlogs()
  .then(() => {
    console.log('')
    console.log('Part 1 migration script completed.')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Migration script failed:', error)
    process.exit(1)
  })
