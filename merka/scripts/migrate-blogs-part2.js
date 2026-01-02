/**
 * Blog Migration Script - PART 2 of 3
 * Migrates blogs 5-7 to Supabase
 * 
 * Run this script with: node scripts/migrate-blogs-part2.js
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
// BLOGS DATA - PART 2 (Blogs 5-7)
// ============================================
const blogsDataPart2 = [
  // ============================================
  // BLOG 5: Integrating BIM into Architecture: A Project-Based Approach in the UAE
  // ============================================
  {
    title: "Integrating BIM into Architecture: A Project-Based Approach in the UAE",
    slug: "integrating-bim-into-architecture-project-based-approach-uae",
    excerpt: "See how Merka Architecture uses BIM to streamline approvals, reduce clashes, and support construction across Dubai and Abu Dhabi projects.",
    content: `Building Information Modeling (BIM) has transformed how architecture projects are designed, documented, and coordinated in the UAE. What began as a drafting tool has evolved into a comprehensive project management platform that affects every stage from concept to construction and beyond.

At Merka Architecture, we have fully integrated BIM into our workflow over the past decade. This article shares our practical experience implementing BIM on projects across Dubai, Abu Dhabi, and the wider Emirates.

## Understanding BIM Beyond the Software

BIM represents a fundamental shift in how building information is created and managed:

### Information-Centric Approach
- Every element contains data beyond geometry
- Materials, specifications, and performance data embedded in the model
- Cost and scheduling information can be linked
- Facility management data prepared from design stage
- Single source of truth for project information

### Collaborative Framework
- Multiple disciplines work on coordinated models
- Changes propagate across all views and documents
- Clash detection identifies issues before construction
- Version control tracks design evolution
- Cloud-based access enables remote collaboration

### Lifecycle Value
- Design decisions informed by performance analysis
- Quantity takeoffs generated directly from models
- Construction sequencing visualized in 4D
- As-built models support facility management
- Renovation projects benefit from existing data

## BIM Requirements in the UAE

The regulatory landscape increasingly mandates BIM:

### Dubai Municipality
- BIM submission required for certain project types
- Specific LOD (Level of Development) requirements
- IFC format compliance for model exchange
- Clash reports reviewed during technical assessment
- Model coordination demonstrated at key stages

### Abu Dhabi (DMT)
- Estidama compliance documentation often linked to BIM
- Sustainable design analysis facilitated by model data
- Infrastructure coordination improved through shared models
- Government projects typically require advanced BIM implementation
- Public buildings maintained with digital twin concepts

### Private Sector Expectations
- Major developers mandate BIM for portfolio projects
- Contractors expect coordinated models for pricing
- Facility managers request as-built BIM deliverables
- Insurance and warranty documentation linked to models
- International partners familiar with BIM workflows

## Our BIM Implementation Process

Merka Architecture has developed a structured approach:

### Project Initiation
At project start, we establish:
- BIM Execution Plan outlining scope and responsibilities
- Model structure and naming conventions
- Exchange formats and coordination schedules
- Level of Development requirements by phase
- Quality control and review procedures

### Concept and Schematic Design
Early design phases use BIM for:
- Massing studies with embedded area data
- Option comparison with consistent metrics
- Early energy analysis and orientation studies
- View studies and shadow analysis
- Client presentations using model visualization

### Design Development
As design advances, BIM supports:
- Detailed coordination between architectural elements
- Structural and MEP rough coordination checks
- Material specifications embedded in components
- Door, window, and finish schedules generated
- Preliminary quantity extraction for budgeting

### Construction Documentation
Final documentation leverages BIM through:
- Sheets and views extracted from the model
- Automated dimension and annotation updates
- Cross-referenced detailing linked to 3D elements
- Specification coordination with model data
- Submission packages organized by discipline

### Construction Administration
During construction, BIM continues to add value:
- Shop drawing review against design model
- Field issue resolution with visual references
- Change order impact assessment
- As-built model updates tracking modifications
- Substantial completion documentation

## Coordination and Clash Detection

Perhaps the greatest value of BIM lies in coordination:

### Discipline Integration
We coordinate with:
- Structural engineers sharing analytical models
- MEP consultants developing system layouts
- Facade consultants detailing envelope systems
- Landscape architects defining external works
- Interior designers specifying fit-out elements

### Clash Detection Process
Our coordination workflow includes:
- Regular model exchanges on defined schedules
- Automated clash detection using coordination software
- Clash categorization and prioritization
- Resolution assignments to responsible parties
- Verification of resolved clashes in updated models

### Coordination Meetings
Structured meetings advance resolution:
- Visual review of clash clusters
- Design resolution decisions documented
- Updated models distributed after meetings
- Progress tracked through coordination reports
- Critical path issues escalated as needed

## Visualization and Communication

BIM enhances how we communicate design intent:

### Client Presentations
- Real-time model navigation during meetings
- Rendered views extracted for formal presentations
- Virtual reality experiences for immersive review
- Annotated 3D exports for stakeholder feedback
- Design option comparisons in consistent format

### Authority Submissions
- 3D views supporting technical drawings
- Egress paths demonstrated in model context
- Fire strategy concepts visualized clearly
- Accessibility routes shown in building model
- Shadow studies for planning review

### Construction Communication
- Phased construction visualization
- Temporary works coordination views
- Site logistics and crane reach studies
- Installation sequence animations
- Progress comparison against planned state

## Challenges and Solutions

BIM implementation involves practical challenges:

### Software and Training
- Initial learning curve for team members
- Ongoing software updates and compatibility
- Hardware requirements for large models
- Template and family library development
- Consistent standards across project teams

### External Coordination
- Varying BIM maturity among consultants
- Format conversion issues between platforms
- Model exchange protocols and schedules
- Responsibility boundaries in federated models
- Quality of incoming models from other parties

### Data Management
- Model file size and performance optimization
- Backup and recovery procedures
- Cloud storage and access security
- Long-term archiving of project data
- Model handover and documentation

## Future Directions

BIM continues to evolve with new capabilities:

### Digital Twins
- Operational models connected to building systems
- Real-time performance monitoring integration
- Predictive maintenance supported by building data
- Occupant experience improvements through analysis
- Continuous improvement of building operations

### Generative Design
- AI-assisted design option generation
- Performance optimization algorithms
- Space planning automation tools
- Structural and environmental optimization
- Design exploration within constraints

### Construction Integration
- Robotic fabrication from model data
- 3D printing of building components
- Drone-based progress monitoring
- Augmented reality for field installation
- Digital work packages for trades

## Conclusion

BIM has become essential infrastructure for quality architecture practice in the UAE. At Merka Architecture, we continue to invest in BIM capabilities, training, and processes that deliver better projects for our clients.

Our experience demonstrates that BIM is not merely a software requirement but a fundamental improvement in how buildings are designed and realized. Contact us to discuss how BIM can benefit your next project.`,
    sections: JSON.stringify([
      {
        type: 'text',
        title: 'Understanding BIM Beyond the Software',
        content: 'BIM represents a fundamental shift in how building information is created and managed.'
      },
      {
        type: 'text',
        title: 'BIM Requirements in the UAE',
        content: 'The regulatory landscape increasingly mandates BIM in Dubai, Abu Dhabi, and the private sector.'
      },
      {
        type: 'text',
        title: 'Our BIM Implementation Process',
        content: 'Merka Architecture has developed a structured approach from initiation through construction administration.'
      },
      {
        type: 'text',
        title: 'Coordination and Clash Detection',
        content: 'Perhaps the greatest value of BIM lies in coordination and clash detection.'
      },
      {
        type: 'text',
        title: 'Future Directions',
        content: 'BIM continues to evolve with digital twins, generative design, and construction integration.'
      }
    ]),
    category: "Technology & Innovation",
    read_time: "9 min read",
    date: "2024-12-01",
    author: "Merka Architecture Team",
    featured: false,
    published: true,
    tags: ["BIM", "Technology", "Project Management"],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    meta_title: "Integrating BIM into Architecture: A Project-Based Approach in the UAE - Merka Architecture",
    meta_description: "See how Merka Architecture uses BIM to streamline approvals, reduce clashes, and support construction across Dubai and Abu Dhabi projects."
  },

  // ============================================
  // BLOG 6: Material Selection in UAE Architecture: Strategy, Durability, and Compliance
  // ============================================
  {
    title: "Material Selection in UAE Architecture: Strategy, Durability, and Compliance",
    slug: "material-selection-uae-architecture-strategy-durability-compliance",
    excerpt: "Learn how Merka Architecture selects materials for UAE projects. Climate considerations, compliance requirements, and performance strategies explained.",
    content: `Material choice plays a decisive role in a building's long-term performance, appearance, and maintenance requirements. In the UAE's demanding climate, material selection requires careful consideration of environmental stresses, availability, and regulatory compliance.

At Merka Architecture, material selection is integrated into our design process from the earliest stages. This article explains our approach to choosing materials that perform reliably across the UAE's diverse building types and locations.

## Climate Challenges for Building Materials

The UAE environment presents specific challenges that affect material performance:

### Extreme Heat Exposure
- Surface temperatures can exceed 70°C on dark materials
- Thermal expansion and contraction stress connections
- UV degradation accelerates in intense sunlight
- Color fading occurs faster than in moderate climates
- Thermal shock during sudden rain events

### Humidity and Salt Exposure
- Coastal zones experience salt-laden air year-round
- High humidity promotes corrosion of metals
- Moisture cycling stresses porous materials
- Mold and algae growth on shaded surfaces
- Salt crystallization damages permeable materials

### Sand and Dust
- Abrasive particles damage surface finishes
- Dust accumulation affects appearance and performance
- Mechanical systems require enhanced filtration
- Cleaning requirements increase maintenance costs
- Light-colored materials show dust more readily

### Temperature Variation
- Significant day-to-night temperature swings
- Seasonal variation less pronounced but present
- Interior versus exterior temperature differentials
- Material movement must be accommodated
- Connection detailing critical for performance

## Material Categories and UAE Considerations

### Concrete and Masonry
Concrete remains the dominant structural material:

Advantages:
- Local availability of materials and expertise
- Thermal mass benefits for temperature stabilization
- Durable performance in UAE conditions
- Flexible forming for architectural expression
- Cost-effective for most building types

Considerations:
- Sulfate-resistant cement required in some areas
- Cover depth critical for reinforcement protection
- Surface treatments improve appearance and durability
- Color matching challenging for exposed concrete
- Thermal bridging at connections requires attention

### Metals
Steel and aluminum serve structural and aesthetic purposes:

Steel Applications:
- Structural framing for long spans and complex forms
- Connection elements and reinforcement
- Secondary framing for facades
- Decorative metalwork and screens
- Mechanical and electrical support systems

Aluminum Applications:
- Curtain wall and window framing
- External cladding panels
- Sun shading devices
- Roofing systems
- Decorative elements and signage

Corrosion Protection:
- Galvanizing for steel in concealed locations
- Stainless steel for exposed connections
- Powder coating for aluminum elements
- Marine-grade specifications near coast
- Regular inspection and maintenance provisions

### Glazing
Glass selection significantly affects building performance:

Performance Factors:
- Solar heat gain coefficient (SHGC) for energy efficiency
- Visible light transmission for daylighting
- U-value for thermal insulation
- Acoustic performance for noise control
- Safety and security ratings as required

Glass Types Common in UAE:
- Double and triple insulated glass units
- Low-e coatings for solar control
- Tinted glass for glare reduction
- Ceramic fritted patterns for shading
- Laminated glass for safety and acoustics

### Stone and Tile
Natural and engineered stone serve both structure and finish:

Natural Stone:
- Limestone and marble for prestige projects
- Granite for high-traffic applications
- Sandstone for traditional aesthetic references
- Travertine for interior applications
- Local and imported options available

Manufactured Options:
- Porcelain tiles for facades and flooring
- Terrazzo for decorative surfaces
- Precast concrete panels with aggregate finishes
- Engineered stone for consistent quality
- Large-format panels reducing joint lines

### Composite Materials
Modern composites offer specific advantages:

Applications:
- Facade cladding panels
- Sunshading devices
- Roofing membranes
- Interior partitions
- Decorative screens

Considerations:
- Fire rating requirements post-Grenfell
- UV stability for exterior applications
- Color consistency across production runs
- Maintenance and replacement protocols
- Long-term warranty provisions

## Regulatory Compliance

Material selection must satisfy regulatory requirements:

### Dubai Municipality
- Green building regulations (Al Sa'fat) specify material performance
- Fire-rated materials required in specific locations
- Accessibility requirements affect floor finishes
- Approved products list for certain applications
- Testing and certification documentation required

### Civil Defense
- Combustibility ratings strictly enforced
- Fire propagation indexes for facade materials
- Smoke development requirements for interiors
- Structural fire protection specifications
- Emergency egress surface requirements

### Estidama (Abu Dhabi)
- Material environmental impact considered
- Regional material sourcing preferences
- Recycled content requirements
- Low-VOC emission standards
- Life cycle assessment considerations

## Procurement and Availability

Practical supply chain considerations affect material choice:

### Local Availability
- Regional manufacturers and suppliers
- Import lead times and costs
- Currency fluctuations affecting imported materials
- Warehousing and storage requirements
- Sample and mock-up availability

### Quality Assurance
- Manufacturing consistency verification
- Site delivery inspection protocols
- Storage and handling requirements
- Installation quality control
- Warranty and support provisions

### Cost Factors
- Initial material costs
- Installation complexity
- Maintenance requirements
- Replacement and repair costs
- Life cycle cost analysis

## Merka Architecture's Selection Process

We approach material selection systematically:

1. **Performance Requirements**: Define what the material must achieve in terms of durability, appearance, safety, and sustainability.

2. **Climate Response**: Evaluate how materials perform under UAE environmental conditions specific to the project location.

3. **Regulatory Compliance**: Confirm materials satisfy applicable codes and standards for the project type and jurisdiction.

4. **Availability Assessment**: Verify supply chain reliability for project quantities and schedule requirements.

5. **Cost Analysis**: Compare initial, installation, maintenance, and replacement costs over the building lifecycle.

6. **Sample Review**: Examine physical samples in project context before finalizing specifications.

7. **Mock-up Testing**: Build representative assemblies for complex facade and finish applications.

8. **Specification Documentation**: Prepare clear specifications that ensure procurement of intended products.

## Conclusion

Material selection in UAE architecture requires balancing aesthetic intent, performance requirements, regulatory compliance, and practical availability. At Merka Architecture, we invest significant effort in material decisions because they directly affect building quality, durability, and client satisfaction.

Contact our team to discuss material strategies for your next project in the UAE.`,
    sections: JSON.stringify([
      {
        type: 'text',
        title: 'Climate Challenges for Building Materials',
        content: 'The UAE environment presents specific challenges including extreme heat, humidity, salt exposure, and sand.'
      },
      {
        type: 'text',
        title: 'Material Categories and UAE Considerations',
        content: 'Concrete, metals, glazing, stone, and composite materials each have specific considerations for UAE conditions.'
      },
      {
        type: 'text',
        title: 'Regulatory Compliance',
        content: 'Material selection must satisfy Dubai Municipality, Civil Defense, and Estidama requirements.'
      },
      {
        type: 'text',
        title: 'Procurement and Availability',
        content: 'Practical supply chain considerations affect material choice including local availability and quality assurance.'
      },
      {
        type: 'text',
        title: 'Merka Architecture\'s Selection Process',
        content: 'We approach material selection systematically from performance requirements through specification documentation.'
      }
    ]),
    category: "Design Process",
    read_time: "9 min read",
    date: "2024-12-01",
    author: "Merka Architecture Team",
    featured: false,
    published: true,
    tags: ["Material Selection", "Design Process", "Building Materials", "UAE Standards"],
    image: "https://images.unsplash.com/photo-1515191107209-c28698631303?w=1200&q=80",
    meta_title: "Material Selection in UAE Architecture: Strategy, Durability, and Compliance - Merka Architecture",
    meta_description: "Learn how Merka Architecture selects materials for UAE projects. Climate considerations, compliance requirements, and performance strategies explained."
  },

  // ============================================
  // BLOG 7: Passive Design Strategies in Hot Climates: UAE Architecture Solutions
  // ============================================
  {
    title: "Passive Design Strategies in Hot Climates: UAE Architecture Solutions",
    slug: "passive-design-strategies-hot-climates-uae-architecture-solutions",
    excerpt: "Discover passive design techniques for UAE architecture. Natural ventilation, thermal mass, and shading strategies for energy-efficient buildings.",
    content: `In the UAE's challenging climate, passive design strategies become essential tools for creating comfortable, energy-efficient buildings. While mechanical cooling remains necessary for most occupied spaces, thoughtful passive design can significantly reduce energy consumption and improve occupant comfort.

At Merka Architecture, we integrate passive strategies from the earliest design stages, viewing them as fundamental to responsible architecture in the Gulf region. This article explores practical passive design approaches for UAE conditions.

## Understanding UAE Climate Conditions

Effective passive design begins with understanding the specific climate:

### Hot-Dry Period (April to October)
- Extreme daytime temperatures exceeding 45°C
- Lower humidity during peak heat months
- Intense solar radiation from overhead sun
- Warm nights with limited cooling potential
- Dust storms affecting air quality

### Warm-Humid Period (November to March)
- Moderate temperatures with pleasant periods
- Higher relative humidity, especially coastal areas
- Lower sun angles with different shading requirements
- Potential for natural ventilation in some conditions
- Morning fog in coastal zones

### Diurnal Temperature Swing
- Significant day-to-night temperature variation
- Greater swing in inland areas than coastal zones
- Opportunity for night cooling strategies
- Thermal mass can store and release heat
- Timing of ventilation affects effectiveness

## Building Orientation and Massing

The starting point for passive design is building form:

### Optimal Orientation
- Long axis oriented east-west to minimize east/west exposure
- South facades receive more predictable solar angles
- North facades in UAE receive minimal direct sun
- East and west facades face the greatest solar challenge
- Site constraints often require creative solutions

### Massing Strategies
- Compact forms minimize surface area for heat gain
- Courtyard configurations create shaded outdoor spaces
- Stepped massing can provide self-shading
- Articulated facades create shadow patterns
- Height-to-width ratios affect urban heat conditions

### Wind Response
- Building forms can channel prevailing breezes
- Pressure differentials drive natural ventilation
- Windcatchers in traditional architecture offer lessons
- Tower forms can accelerate air movement
- Landscape elements affect wind patterns at building

## Solar Shading Approaches

Shading is the single most effective passive strategy in the UAE:

### Horizontal Devices
- Effective for south-facing openings
- Depth calculated based on solar angles
- Can be fixed or adjustable
- Integration with facade architecture
- Maintenance access considerations

### Vertical Devices
- Essential for east and west facades
- Angled to block low sun angles
- Often combined with horizontal elements
- Can create visual identity through pattern
- May incorporate operable sections

### Combined Systems
- Egg-crate patterns for comprehensive shading
- Perforated screens filter light while shading
- Mashrabiya-inspired designs reference tradition
- Three-dimensional facades create depth and shadow
- Dynamic systems respond to sun position

### Shading Calculations
- Sun path analysis for specific latitude
- Annual versus seasonal optimization
- View preservation while maximizing shade
- Integration with daylight objectives
- Balance between shading and natural light

## Thermal Mass and Insulation

The building envelope must manage heat flow:

### Thermal Mass Benefits
- Heavy materials absorb heat during the day
- Stored heat released during cooler nights
- Stabilizes interior temperature fluctuations
- Reduces peak cooling load requirements
- Concrete and masonry provide effective mass

### Thermal Mass Placement
- Interior mass most effective for night cooling
- Exterior mass can buffer solar heat gain
- Exposed mass in occupied spaces maximizes benefit
- Insulation position affects mass effectiveness
- Floor slabs contribute significant mass

### Insulation Strategies
- Continuous insulation minimizes thermal bridges
- Exterior insulation protects structure from heat
- Roof insulation critical due to high sun angles
- Window frames contribute to thermal performance
- Cavity wall construction common in UAE

### Cool Roofs
- Light-colored surfaces reflect solar radiation
- High-emissivity materials radiate heat at night
- Vegetated roofs provide additional cooling
- Reflective coatings for existing roofs
- Shaded roof elements reduce direct exposure

## Natural Ventilation Opportunities

While limited, natural ventilation has applications:

### Viable Conditions
- Early morning hours during cooler months
- Transition spaces and circulation areas
- Underground and semi-buried spaces
- Night ventilation for thermal mass cooling
- Temporary events and outdoor areas

### Design Strategies
- Cross-ventilation through opposing openings
- Stack effect in tall spaces
- Wind-driven ventilation from prevailing breezes
- Operable windows where conditions allow
- Transition zones between conditioned and outdoor

### Hybrid Approaches
- Mechanical systems when natural insufficient
- Automated controls based on conditions
- Mixed-mode buildings with seasonal operation
- Ceiling fans to extend comfort range
- Personal control options for occupants

## Daylighting Without Overheating

Natural light improves building quality but requires careful management:

### Daylight Strategies
- North-facing openings provide consistent light
- Clerestories bring light deep into buildings
- Light shelves redirect sun to ceiling
- Diffusing glazing softens direct sun
- Interior surfaces reflect light further

### Glare Control
- Shading devices control direct sun
- Glazing tints reduce brightness
- Interior blinds allow occupant control
- Screen position affects glare conditions
- Workstation orientation relative to windows

### Balance with Thermal Performance
- High-performance glazing with low SHGC
- Smaller openings on challenging orientations
- Shading sized for thermal and visual comfort
- Dynamic systems respond to conditions
- Daylight simulation guides design decisions

## Landscape and Microclimate

External conditions affect building performance:

### Vegetation Benefits
- Trees provide shade on facades and ground
- Evapotranspiration cools surrounding air
- Green areas reduce reflected heat
- Wind protection from strategic planting
- Psychological cooling effect for occupants

### Ground Surface Treatment
- Light-colored paving reflects heat
- Permeable surfaces enable evaporative cooling
- Shaded outdoor areas extend comfort
- Water features provide localized cooling
- Distance from hot surfaces affects facades

### Urban Context
- Adjacent buildings provide shade
- Urban canyon effects on air movement
- Heat island intensity in dense areas
- Street orientation affects conditions
- Building spacing for air circulation

## Integration with Mechanical Systems

Passive strategies work alongside active systems:

### Reduced Cooling Loads
- Smaller equipment when loads reduced
- Lower energy consumption throughout operation
- Reduced peak demand charges
- Equipment longevity with reduced cycling
- Capital cost savings potential

### Enhanced Comfort
- More stable interior conditions
- Reduced drafts from oversized equipment
- Better humidity control
- Quieter operation with smaller systems
- Improved indoor environmental quality

### Resilience Benefits
- Habitable conditions during power interruptions
- Slower temperature rise when cooling fails
- Critical function maintenance in emergencies
- Reduced dependency on mechanical systems
- Climate adaptation for future conditions

## Conclusion

Passive design strategies offer significant value for UAE architecture despite the challenging climate. At Merka Architecture, we view passive design as fundamental to responsible practice, not as optional enhancement. The combination of careful orientation, effective shading, appropriate thermal mass, and landscape integration creates buildings that perform better, cost less to operate, and provide superior comfort.

Contact our team to explore how passive design strategies can benefit your next project.`,
    sections: JSON.stringify([
      {
        type: 'text',
        title: 'Understanding UAE Climate Conditions',
        content: 'Effective passive design begins with understanding the specific hot-dry and warm-humid periods.'
      },
      {
        type: 'text',
        title: 'Building Orientation and Massing',
        content: 'The starting point for passive design is building form, orientation, and wind response.'
      },
      {
        type: 'text',
        title: 'Solar Shading Approaches',
        content: 'Shading is the single most effective passive strategy in the UAE.'
      },
      {
        type: 'text',
        title: 'Thermal Mass and Insulation',
        content: 'The building envelope must manage heat flow through thermal mass, insulation, and cool roofs.'
      },
      {
        type: 'text',
        title: 'Natural Ventilation Opportunities',
        content: 'While limited, natural ventilation has applications in specific conditions.'
      },
      {
        type: 'text',
        title: 'Daylighting Without Overheating',
        content: 'Natural light improves building quality but requires careful management.'
      }
    ]),
    category: "Sustainability",
    read_time: "8 min read",
    date: "2024-11-28",
    author: "Merka Architecture Team",
    featured: false,
    published: true,
    tags: ["Passive Design", "Energy Efficiency", "Climate Response", "Sustainability"],
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200&q=80",
    meta_title: "Passive Design Strategies in Hot Climates: UAE Architecture Solutions - Merka Architecture",
    meta_description: "Discover passive design techniques for UAE architecture. Natural ventilation, thermal mass, and shading strategies for energy-efficient buildings."
  }
]

// ============================================
// MIGRATION FUNCTION
// ============================================
async function migrateBlogs() {
  console.log('🚀 Starting blogs migration (PART 2 of 3) to Supabase...')
  console.log(`📦 Blogs in this batch: ${blogsDataPart2.length}`)
  console.log('')

  let successCount = 0
  let errorCount = 0

  for (const blog of blogsDataPart2) {
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
  console.log('📊 Part 2 Migration Summary:')
  console.log(`   ✅ Successful: ${successCount}`)
  console.log(`   ❌ Failed: ${errorCount}`)
  console.log(`   📦 Total in batch: ${blogsDataPart2.length}`)
  console.log('========================================')

  if (errorCount === 0) {
    console.log('🎉 Part 2 completed successfully!')
    console.log('👉 Next: Run migrate-blogs-part3.js')
  }
}

// Run the migration
migrateBlogs()
  .then(() => {
    console.log('')
    console.log('Part 2 migration script completed.')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Migration script failed:', error)
    process.exit(1)
  })
