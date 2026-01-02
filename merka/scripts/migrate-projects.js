/**
 * Migration Script: Migrate ALL projects to Supabase
 * 
 * Run this script with: node scripts/migrate-projects.js
 * 
 * Make sure your .env.local file has:
 * - NEXT_PUBLIC_SUPABASE_URL
 * - NEXT_PUBLIC_SUPABASE_ANON_KEY
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
// ALL PROJECTS DATA - COMPLETE CONTENT
// ============================================
const projectsData = [
  // ============================================
  // PROJECT 1: ING Bank Headquarters (Bank 1 - Folder 5)
  // ============================================
  {
    title: 'ING Bank Headquarters',
    slug: 'ing-bank-headquarters',
    category: 'commercial',
    location: 'Dubai, UAE',
    area: '16,000 - 20,000 sqm',
    year: '2025',
    status: 'In Design',
    image: '/projects/05--Bank-1_01.jpg',
    description: 'A clear financial landmark within a central business district in Dubai, shaped by vertical concrete fins and full height glass panels.',
    full_description: `This headquarters concept is designed as a clear financial landmark within a central business district in Dubai, UAE. The building is shaped by a series of vertical concrete fins and full height glass panels that create a strong civic presence. A large entrance canopy marks the arrival point and guides visitors toward a double height lobby.

A golden perforated volume is placed above the entrance and becomes a distinct night feature. The interior layout supports public banking services on the lower levels and corporate offices above. The external plaza is designed as an open civic space with seating, lighting and a direct approach to the main steps.

The project introduces a modern institutional image that suits international finance groups and government backed developments seeking a clear, confident architectural identity in Dubai.`,
    services: [
      'Architecture concept development',
      'Public Plaza and approach design',
      'Façade strategy with concrete fins and glass panels',
      'Entrance canopy and lobby planning',
      'Interior layout for banking floors and office areas',
      'Security and circulation zoning',
      'Landscape and lighting concept',
      'Visualization and presentation package'
    ],
    tags: [
      'Dubai',
      'Corporate Headquarters',
      'Banking Facility',
      'Institutional Building',
      'Commercial Landmark'
    ],
    gallery: [
      '/projects/05--Bank-1_01.jpg',
      '/projects/05--Bank-1_02.jpg',
      '/projects/05--Bank-1_03.jpg',
      '/projects/05--Bank-1_04.jpg',
      '/projects/05--Bank-1_05.jpg',
      '/projects/05--Bank-1_06.jpg',
      '/projects/05--Bank-1_07.jpg'
    ],
    features: [
      'Grand Entrance Canopy',
      'Double Height Main Lobby',
      'Public Banking Hall',
      'Private Banking Suites',
      'Executive Office Floor',
      'Golden Feature Volume',
      'Glass and Concrete Vertical Fins',
      'Landscape Plaza with Seating',
      'Integrated Night Lighting',
      'Basement Parking and Secure Access'
    ],
    client: 'Confidential',
    budget: 'USD 48,000,000 - USD 62,000,000',
    timeline: '22 to 26 months',
    featured: true,
    published: true,
    display_order: 1,
    meta_title: 'ING Bank Headquarters - Dubai Corporate Architecture',
    meta_description: 'A clear financial landmark within a central business district in Dubai, shaped by vertical concrete fins and full height glass panels.'
  },

  // ============================================
  // PROJECT 2: Bank Albilad Headquarters (Bank 2 - Folder 8)
  // ============================================
  {
    title: 'Bank Albilad Headquarters',
    slug: 'bank-albilad-headquarters',
    category: 'commercial',
    location: 'Riyadh, Saudi Arabia',
    area: '20,000 - 28,000 sqm',
    year: '2025',
    status: 'In Design',
    image: '/projects/08--Bank-2_01.jpg',
    description: 'A clear urban landmark within a growing financial district, shaped by a bold angular crown, luminous glass façade and strong vertical rhythm.',
    full_description: `This headquarters concept for Bank Albilad is designed as a clear urban landmark within a growing financial district. The tower is shaped by a clean geometric silhouette defined by a bold angular crown, a luminous glass façade and a strong vertical rhythm. The architecture gives the building a precise civic presence suited for a major banking institution.

The façade uses layered illumination that highlights the tower's massing at night and provides soft daylight during working hours. Vertical openings frame the core and create a balanced composition across all elevations. The ground level is planned with a distinct entrance portal, landscaped forecourt and clear pedestrian circulation.

The building is designed to support banking operations, executive offices, public service floors and specialized administrative areas. Its form and clarity allow the headquarters to anchor a corporate campus or stand independently as a signature city landmark.`,
    services: [
      'Architectural massing and façade strategy',
      'Corporate entrance and circulation planning',
      'Exterior lighting design',
      'Office layout zoning and stacking studies',
      'Visualization and presentation package'
    ],
    tags: [
      'Corporate Architecture',
      'Headquarters',
      'Financial District',
      'Riyadh',
      'Office Tower'
    ],
    gallery: [
      '/projects/08--Bank-2_01.jpg',
      '/projects/08--Bank-2_02.jpg',
      '/projects/08--Bank-2_03.jpg',
      '/projects/08--Bank-2_04.jpg',
      '/projects/08--Bank-2_05.jpg',
      '/projects/08--Bank-2_06.jpg'
    ],
    features: [
      'Private Executive Lobby',
      'Iconic Angular Roof Crown',
      'Luminous Façade System',
      'Vertical Light Bands',
      'Grand Entrance Portal'
    ],
    client: 'Bank Albilad',
    budget: 'USD 40,000,000 - USD 55,000,000',
    timeline: '22 to 26 months',
    featured: true,
    published: true,
    display_order: 2,
    meta_title: 'Bank Albilad Headquarters - Riyadh Corporate Tower',
    meta_description: 'A clear urban landmark within a growing financial district, shaped by a bold angular crown, luminous glass façade and strong vertical rhythm.'
  },

  // ============================================
  // PROJECT 3: Triad Business Towers (Business Building - Folder 9)
  // ============================================
  {
    title: 'Triad Business Towers',
    slug: 'triad-business-towers',
    category: 'commercial',
    location: 'TBD',
    area: '180,000 - 220,000 sqm',
    year: '2025',
    status: 'In Design',
    image: '/projects/09--Business-Building_01.jpg',
    description: 'A landmark business destination with three sculpted high-rise volumes featuring tessellated glass skin that captures light throughout the day.',
    full_description: `This commercial tower complex is planned as a landmark business destination within a future urban district. The architecture is driven by three sculpted high-rise volumes that rise from the ground with a pronounced geometric form. Each tower leans inward to create a shared arrival court and a strong urban identity. The façade uses a tessellated glass skin that captures light throughout the day and creates a distinct visual signature at night.

The development brings together premium offices, commercial zones and shared public spaces arranged around a central landscaped podium. The ground level integrates circulation routes, drop-off areas and retail edges that encourage pedestrian movement. A glass dome anchors the podium and can support an event space, exhibition area or lobby feature.

The composition is designed to work as a gateway into a business district or mixed-use masterplan. The towers serve as anchor elements that provide high visibility, large leasable areas and a contemporary architectural presence.`,
    services: [
      'Architectural massing studies',
      'Façade development and glazing concept',
      'Urban interface and arrival court design',
      'Podium planning and circulation structure',
      'Office layout strategy for high efficiency',
      'Lighting vision for towers and central dome',
      'Visualization and presentation package'
    ],
    tags: [
      'Business towers',
      'Commercial architecture',
      'High rise development',
      'Urban gateway',
      'Corporate district'
    ],
    gallery: [
      '/projects/09--Business-Building_01.jpg',
      '/projects/09--Business-Building_02.jpg'
    ],
    features: [
      'Triple Tower Formation',
      'Geometric Glazed Facade',
      'Central Dome Pavilion',
      'Landscaped Podium',
      'Premium Office Floors',
      'Integrated Retail Edge',
      'Night Lighting Identity',
      'Grand Arrival Court'
    ],
    client: 'Confidential',
    budget: 'USD 250,000,000 - USD 330,000,000',
    timeline: '36 to 42 months',
    featured: true,
    published: true,
    display_order: 3,
    meta_title: 'Triad Business Towers - Commercial High-Rise Development',
    meta_description: 'A landmark business destination with three sculpted high-rise volumes featuring tessellated glass skin that captures light throughout the day.'
  },

  // ============================================
  // PROJECT 4: Urban Split Tower (Business Tower)
  // ============================================
  {
    title: 'Urban Split Tower',
    slug: 'urban-split-tower',
    category: 'mixed-use',
    location: 'Dubai, UAE',
    area: '45,000 - 58,000 sqm',
    year: '2025',
    status: 'In Design',
    image: '/projects/04-Business-Tower_01.jpg',
    description: 'A commercial landmark with split vertical form featuring glass volume and horizontal terrace bands for a strong skyline identity.',
    full_description: `This mixed-use tower is planned as a commercial landmark within a prime urban district of Dubai, UAE. The building is shaped by a split vertical form that frames two contrasting facades. One side presents a glass volume with a sharp silhouette. The other side carries horizontal terrace bands that introduce depth, outdoor space and a strong identity along the skyline.

The podium level is designed for high end retail and dining. Signature storefronts wrap the base and activate the public realm. The tower rises above the podium with a series of stepped terraces that offer shaded outdoor lounges for office tenants or serviced apartment residents, depending on final program allocation.

Landscape zones, water features and elevated green decks are positioned to soften the built edges. The upper terrace creates a private outdoor platform that can be used for small corporate gatherings, VIP receptions or branded lifestyle events.

The development is positioned to attract international tenants, luxury retail brands and investors seeking a building with strong market visibility in Dubai.`,
    services: [
      'Architecture concept development',
      'Podium retail planning',
      'Tower massing and terrace strategy',
      'Circulation and access layout',
      'Landscape and water feature design',
      'Lighting and façade concept',
      'Visualization and presentation package'
    ],
    tags: [
      'Dubai',
      'Mixed Use',
      'Commercial Tower',
      'Retail Podium',
      'High Rise Development'
    ],
    gallery: [
      '/projects/04-Business-Tower_01.jpg',
      '/projects/04-Business-Tower_02.jpg'
    ],
    features: [
      'Sky Terrace Platform',
      'Retail Boulevard Podium',
      'Split Vertical Tower Geometry',
      'Outdoor Lounge Balconies',
      'High Visibility Glass Facade',
      'VIP Arrival and Drop Off',
      'Green Deck Integration',
      'Flexible Office or Serviced Apartment Floors'
    ],
    client: 'Confidential',
    budget: 'USD 95,000,000 - USD 130,000,000',
    timeline: '26 to 30 months',
    featured: true,
    published: true,
    display_order: 4,
    meta_title: 'Urban Split Tower - Dubai Mixed-Use Development',
    meta_description: 'A commercial landmark with split vertical form featuring glass volume and horizontal terrace bands for a strong skyline identity.'
  },

  // ============================================
  // PROJECT 5: Downtown Mixed-Use Tower (Folder 7 Res-Building)
  // ============================================
  {
    title: 'Downtown Mixed-Use Tower',
    slug: 'downtown-mixed-use-tower',
    category: 'mixed-use',
    location: 'United Arab Emirates',
    area: '28,000 - 36,000 sqm',
    year: '2025',
    status: 'In Design',
    image: '/projects/7--Res-Building_01.jpg',
    description: 'A street facing development combining residential units, retail frontage and commercial space with illuminated glass panels and recessed balcony frames.',
    full_description: `This mixed-use tower is planned as a street facing development within a dense downtown district. The building combines residential units, retail frontage and commercial space within a single vertical urban form. The façade uses a system of recessed frames, balconies and illuminated glass panels that give the tower a clear identity at night and a strong rhythm during the day.

The podium is designed as an active retail base with double height glazing that opens the project to pedestrian movement. Above the podium, the tower massing steps and shifts to create terraces and better natural light for residential floors. The building responds to the tight city grid with a linear footprint and clear access points along the main road.

The project aims to support vibrant city life through mixed uses, visible storefronts and upper-level homes designed for urban residents seeking convenience, connectivity and contemporary architecture.`,
    services: [
      'Architectural massing and envelope design',
      'Podium and retail layout planning',
      'Residential floor plan studies',
      'Lighting strategy for tower elevations',
      'Visualization and presentation package'
    ],
    tags: [
      'Mixed Use',
      'Residential Tower',
      'Retail Podium',
      'Urban Architecture',
      'Downtown Development'
    ],
    gallery: [
      '/projects/7--Res-Building_01.jpg'
    ],
    features: [
      'Street Facing Retail Podium',
      'Terraced Residential Levels',
      'Illuminated Glass Facade',
      'Recessed Balcony Frames',
      'Urban Corner Entrance'
    ],
    client: 'Confidential',
    budget: 'USD 45,000,000 - USD 60,000,000',
    timeline: '26 to 30 months',
    featured: true,
    published: true,
    display_order: 5,
    meta_title: 'Downtown Mixed-Use Tower - UAE Urban Development',
    meta_description: 'A street facing development combining residential units, retail frontage and commercial space with illuminated glass panels and recessed balcony frames.'
  },

  // ============================================
  // PROJECT 6: Levent Hotel (Hotel - Folder 6)
  // ============================================
  {
    title: 'Levent Hotel',
    slug: 'levent-hotel',
    category: 'hospitality',
    location: 'Istanbul, Turkey',
    area: '28,000 - 34,000 sqm',
    year: '2025',
    status: 'In Design',
    image: '/projects/06-Hotel_01.jpg',
    description: 'A contemporary waterfront destination with fluid horizontal lines and soft curves that create a sculpted profile along the boulevard.',
    full_description: `This hotel concept is designed as a contemporary waterfront destination in Istanbul. The architecture is expressed through fluid horizontal lines that wrap each floor and create a sculpted profile along the boulevard. Soft curves shape the façade and bring a continuous visual rhythm that defines the building from every angle.

The base level is treated as a textured and sculpted podium that anchors the structure to the street. Large glazing zones open toward the public realm and support retail, lounge and lobby functions. The upper floors step and curve to frame long views across the waterfront and provide shaded terraces that enhance guest comfort.

Inside, the program connects hotel rooms, serviced suites, restaurants, wellness spaces and event areas. Circulation follows the geometry of the building and creates smooth transitions between public, semiprivate and private zones. The project aims to establish a distinct hospitality presence within Istanbul's evolving coastal corridor.`,
    services: [
      'Architectural massing and façade development',
      'Interior layout for rooms, suites and public areas',
      'Landscape concept for waterfront edge and drop off area',
      'Lighting strategy for façade, terraces and lobby',
      'Amenity planning and guest circulation',
      'Visualization and presentation package'
    ],
    tags: [
      'Hotel',
      'Istanbul',
      'Hospitality',
      'Waterfront project',
      'Urban architecture'
    ],
    gallery: [
      '/projects/06-Hotel_01.jpg',
      '/projects/06-Hotel_02.jpg',
      '/projects/06-Hotel_03.jpg',
      '/projects/06-Hotel_04.jpg',
      '/projects/06-Hotel_05.jpg'
    ],
    features: [
      'Shaded Terrace Floors',
      'Ribbon Form Façade',
      'Full Height Glazing for Rooms',
      'Sculpted Ground Level Podium',
      'Curved Balcony Lines',
      'Integrated Exterior Lighting',
      'Lobby Lounge and Reception Hall',
      'Waterfront Restaurant and Café',
      'Indoor Wellness and Spa Zone',
      'Multipurpose Event and Meeting Rooms',
      'Serviced Suites with Private Terraces',
      'Fitness Center with Natural Daylight'
    ],
    client: 'Confidential',
    budget: 'USD 95,000,000 - USD 130,000,000',
    timeline: '30 months',
    featured: true,
    published: true,
    display_order: 6,
    meta_title: 'Levent Hotel - Istanbul Waterfront Hospitality',
    meta_description: 'A contemporary waterfront destination with fluid horizontal lines and soft curves that create a sculpted profile along the boulevard.'
  },

  // ============================================
  // PROJECT 7: Lattice Tower Hotel (Hotel Project - Folder 11)
  // ============================================
  {
    title: 'Lattice Tower Hotel',
    slug: 'lattice-tower-hotel',
    category: 'hospitality',
    location: 'Business Bay, Dubai, UAE',
    area: '65,000 - 75,000 sqm',
    year: '2025',
    status: 'In Design',
    image: '/projects/11--Hotel_01.jpg',
    description: 'A high-rise hotel tower defined by a vertical exoskeleton with geometric lattice, creating a distinctive identity within the Dubai skyline.',
    full_description: `This project introduces a high-rise hotel tower planned for Dubai Business Bay. The building is defined by a vertical exoskeleton that wraps the entire structure with a geometric lattice. This creates a strong architectural presence and provides controlled shading for the guest rooms. The tower's sculpted silhouette and illuminated façade pattern give it a distinctive identity within the city skyline.

The interior program features hotel rooms, serviced apartments, restaurants, meeting areas and wellness spaces. The ground level includes a double height entrance with a clear arrival sequence for guests. The design focuses on a refined guest experience supported by efficient circulation and clear zoning.`,
    services: [
      'Architectural concept design',
      'Façade and exoskeleton system development',
      'Hotel planning and core layout',
      'Public drop off and arrival sequence planning',
      'Visualization with day and night façade studies'
    ],
    tags: [
      'Hotel',
      'High rise',
      'Dubai',
      'Serviced apartments',
      'Iconic tower',
      'Exoskeleton façade'
    ],
    gallery: [
      '/projects/11--Hotel_01.jpg'
    ],
    features: [
      'Geometric exoskeleton across all elevations',
      'Shading system integrated into façade pattern',
      'Illuminated lattice for night identity',
      'Double height entrance for hotel arrival',
      'Efficient vertical circulation core',
      'Guest rooms oriented for skyline views',
      'Potential for rooftop dining or lounge',
      'Sculptural silhouette suitable for a premium urban site'
    ],
    client: 'Confidential',
    budget: 'USD 260,000,000 - USD 320,000,000',
    timeline: '50 months',
    featured: true,
    published: true,
    display_order: 7,
    meta_title: 'Lattice Tower Hotel - Dubai Business Bay Iconic Tower',
    meta_description: 'A high-rise hotel tower defined by a vertical exoskeleton with geometric lattice, creating a distinctive identity within the Dubai skyline.'
  },

  // ============================================
  // PROJECT 8: Arched Italian Pavilion Restaurant
  // ============================================
  {
    title: 'Arched Italian Pavilion Restaurant',
    slug: 'arched-italian-pavilion-restaurant',
    category: 'hospitality',
    location: 'Jumeirah, Dubai, UAE',
    area: '2,200 - 2,800 sqm',
    year: '2025',
    status: 'In Design',
    image: '/projects/02--Italian-Restaurant_01.jpg',
    description: 'A signature dining destination shaped by layered arches that create a sculptural exterior inspired by classical vaulted structures.',
    full_description: `This restaurant concept is designed as a signature dining destination in Jumeirah, Dubai. The building is shaped by a sequence of layered arches that create a sculptural exterior and a strong sense of arrival. The form is inspired by classical vaulted structures and reinterpreted with contemporary detailing, advanced glazing and precision lighting.

The design integrates indoor and outdoor dining zones within a landscaped setting. Water elements, shaded pathways and sculptural garden features guide guests toward the main entrance. The façade highlights rhythmic arch geometry and a warm material palette that brings depth to the building at both day and night.

The layout is planned to support fine dining, casual outdoor seating and private event areas. The restaurant serves as a landmark destination that can anchor a mixed-use development, beachfront district or hospitality precinct in Dubai.`,
    services: [
      'Architectural concept and form development',
      'Entrance and guest circulation planning',
      'Landscape design with water features',
      'Interior layout for dining and event zones',
      'Lighting strategy for façade and garden',
      'Visualization and presentation package'
    ],
    tags: [
      'Restaurant',
      'Dubai',
      'Hospitality',
      'Architectural pavilion',
      'Dining destination'
    ],
    gallery: [
      '/projects/02--Italian-Restaurant_01.jpg',
      '/projects/02--Italian-Restaurant_02.jpg',
      '/projects/02--Italian-Restaurant_03.jpg',
      '/projects/02--Italian-Restaurant_04.jpg',
      '/projects/02--Italian-Restaurant_05.jpg',
      '/projects/02--Italian-Restaurant_06.jpg',
      '/projects/02--Italian-Restaurant_07.jpg',
      '/projects/02--Italian-Restaurant_08.jpg'
    ],
    features: [
      'Layered arch façade with sculptural depth',
      'Glass and stone envelope with controlled daylight',
      'Outdoor dining terraces integrated with gardens',
      'Water features placed along the arrival path',
      'Curated lighting that shapes the night identity',
      'Shaded walkway with rhythmic vertical elements',
      'Flexible interior layout for dining and small events',
      'Landmark architecture suited for luxury districts'
    ],
    client: 'Confidential',
    budget: 'USD 7,000,000 - USD 10,000,000',
    timeline: '14 months',
    featured: true,
    published: true,
    display_order: 8,
    meta_title: 'Arched Italian Pavilion Restaurant - Jumeirah Dubai',
    meta_description: 'A signature dining destination shaped by layered arches that create a sculptural exterior inspired by classical vaulted structures.'
  },

  // ============================================
  // PROJECT 9: Corniche Orbital Mall and Cultural Complex
  // ============================================
  {
    title: 'Corniche Orbital Mall and Cultural Complex',
    slug: 'corniche-orbital-mall-cultural-complex',
    category: 'mixed-use',
    location: 'Abu Dhabi Corniche, UAE',
    area: '180,000 - 210,000 sqm',
    year: '2025',
    status: 'In Design',
    image: '/projects/12--Mall-1.jpg',
    description: 'A major commercial and cultural development featuring two landmark buildings with dynamic elliptical forms on the Abu Dhabi waterfront.',
    full_description: `This design presents a major commercial and cultural development planned for Abu Dhabi Corniche. The project features two landmark buildings shaped around dynamic elliptical forms that create a strong sculptural presence on the waterfront. Their fluid envelopes and layered roof structures allow the buildings to function as contemporary icons within the urban landscape.

The architecture combines commercial, leisure and public functions within a unified masterplan. The larger structure is designed for retail, mixed entertainment and event spaces. The second structure accommodates a cultural exhibition hall and hospitality related functions. Together they form a destination that serves both residents and international visitors.

The exterior language is defined by continuous ribbon surfaces, controlled daylight openings and advanced glazing systems. These elements reinforce the futuristic identity of the development and support the building's operational efficiency. Landscaped areas, water features and public art zones frame the complex and create a complete urban destination.`,
    services: [
      'Architectural concept and form generation',
      'Master planning and circulation planning',
      'Façade development with solar responsive geometry',
      'Interior planning for mall, cultural halls and event spaces',
      'Landscape design and public realm planning',
      'Complete visualization package including day and night studies'
    ],
    tags: [
      'Retail',
      'Cultural',
      'Mixed use',
      'Iconic architecture',
      'Abu Dhabi',
      'UAE'
    ],
    gallery: [
      '/projects/12--Mall-1.jpg',
      '/projects/12--Mall-2.jpg',
      '/projects/12--Mall-3.jpg',
      '/projects/12--Mall-4.jpg',
      '/projects/12--Mall-5.jpg'
    ],
    features: [
      'Elliptical landmark forms visible along the Corniche',
      'Layered roof structure with daylight control',
      'Large scale atrium and event spaces',
      'Integrated landscape and waterfront walkways',
      'Advanced façade system with targeted shading patterns',
      'Public art installation zone',
      'Flexible retail and entertainment modules',
      'Sculptural architectural identity suited for tourism'
    ],
    client: 'Confidential',
    budget: 'USD 780,000,000 - USD 950,000,000',
    timeline: '62 months',
    featured: true,
    published: true,
    display_order: 9,
    meta_title: 'Corniche Orbital Mall and Cultural Complex - Abu Dhabi',
    meta_description: 'A major commercial and cultural development featuring two landmark buildings with dynamic elliptical forms on the Abu Dhabi waterfront.'
  },

  // ============================================
  // PROJECT 10: Government Administration Complex (Ministry of Building)
  // ============================================
  {
    title: 'Government Administration Complex',
    slug: 'government-administration-complex',
    category: 'institutional',
    location: 'Abu Dhabi, UAE',
    area: '14,000 - 18,000 sqm',
    year: '2025',
    status: 'In Design',
    image: '/projects/01--Minstry-of-Building_01.jpg',
    description: 'A complete government campus featuring ministry headquarters, reception villa, modern majlis, dedicated mosque and secured support buildings.',
    full_description: `This development is presented as a complete government campus in Abu Dhabi. The project brings together a main ministry headquarters, a formal reception villa, a modern majlis, a dedicated mosque, and secured support buildings. The architecture uses stone, glass, and precise lighting to create a strong and confident presence suitable for a national institution.

The masterplan is arranged to support protocol movement and operational efficiency. Arrival routes guide visitors toward a central fountain and a formal entrance zone. Internal roads, green areas, and controlled gates organize public and restricted access. The complex is designed to operate as a unified administrative environment with clear zoning for staff, visitors, and official delegations.

This project offers a fully planned site that is ready to move into detailed design and construction stages. It provides a complete, market ready solution that meets the expectations of UAE government agencies.`,
    services: [
      'Full masterplan for the entire campus',
      'Architectural design for all buildings',
      'Protocol planning for VIP and delegation access',
      'Landscape design with fountain, gardens, and pedestrian routes',
      'Interior zoning for offices, meeting rooms, and public halls',
      'Lighting design across buildings and external areas',
      'Visual presentation package suitable for government approvals'
    ],
    tags: [
      'UAE Government',
      'Headquarters',
      'Ministry',
      'Institutional Architecture',
      'Official Campus',
      'Masterplan'
    ],
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
      '/projects/01--Minstry-of-Building_11.jpg',
      '/projects/01--Minstry-of-Building_12.jpg',
      '/projects/01--Minstry-of-Building_13.jpg',
      '/projects/01--Minstry-of-Building_14.jpg',
      '/projects/01--Minstry-of-Building_15.jpg',
      '/projects/01--Minstry-of-Building_16.jpg',
      '/projects/01--Minstry-of-Building_17.jpg',
      '/projects/01--Minstry-of-Building_18.jpg',
      '/projects/01--Minstry-of-Building_19.jpg',
      '/projects/01--Minstry-of-Building_20.jpg',
      '/projects/01--Minstry-of-Building_21.jpg'
    ],
    features: [
      'Ministry headquarters with structured office floors',
      'Executive suites, delegation meeting rooms, and protocol halls',
      'Large conference rooms for government events',
      'Reception villa for formal hosting',
      'Majlis building for official gatherings',
      'Mosque with prayer hall, ablution areas, and minaret',
      'Main ceremonial gate with dedicated security zone',
      'Visitor and staff parking areas',
      'Central fountain court for official arrivals',
      'Landscaped campus with clear circulation and lighting system'
    ],
    client: 'Confidential Government Entity',
    budget: 'USD 45,000,000 - USD 65,000,000',
    timeline: '26 to 32 months',
    featured: true,
    published: true,
    display_order: 10,
    meta_title: 'Government Administration Complex - Abu Dhabi',
    meta_description: 'A complete government campus featuring ministry headquarters, reception villa, modern majlis, dedicated mosque and secured support buildings.'
  },

  // ============================================
  // PROJECT 11: Creekside Curved Residences (Residential Buildings - Folder 13)
  // ============================================
  {
    title: 'Creekside Curved Residences',
    slug: 'creekside-curved-residences',
    category: 'residential',
    location: 'Dubai Creek Harbour, Dubai, UAE',
    area: '75,000 - 85,000 sqm',
    year: '2025',
    status: 'In Design',
    image: '/projects/10--Residential-Buildings_01.jpg',
    description: 'Premium mid-rise buildings with smooth curved lines, large panoramic terraces and a light façade expression reflecting waterfront lifestyle.',
    full_description: `This residential development introduces a series of premium mid-rise buildings designed for Dubai Creek Harbour. The architecture focuses on smooth curved lines, large panoramic terraces and a light façade expression that reflects the waterfront lifestyle of the district. Each building features sculpted balcony edges that create fluid movement across the façade, giving the development a distinct identity within the Dubai skyline.

The master layout places the buildings around landscaped gardens, reflective water features and walkways, forming a calm and refined living environment. Generous glazing opens every residence to natural light, while expansive terraces create outdoor living spaces suitable for Dubai's climate. The concept is developed for investors and end users seeking a modern residential address with strong architectural character and a tranquil green setting.`,
    services: [
      'Architectural concept design',
      'Façade refinement and curved balcony development',
      'Master planning and circulation layout',
      'Landscape and water feature planning',
      'Interior lobby and entrance concept design',
      'Visualization and day-night studies'
    ],
    tags: [
      'Residential',
      'Mid rise',
      'Curved architecture',
      'Dubai',
      'UAE'
    ],
    gallery: [
      '/projects/10--Residential-Buildings_01.jpg',
      '/projects/10--Residential-Buildings_02.jpg',
      '/projects/10--Residential-Buildings_03.jpg',
      '/projects/10--Residential-Buildings_04.jpg',
      '/projects/10--Residential-Buildings_05.jpg',
      '/projects/10--Residential-Buildings_06.jpg',
      '/projects/10--Residential-Buildings_07.jpg',
      '/projects/10--Residential-Buildings_08.jpg',
      '/projects/10--Residential-Buildings_09.jpg',
      '/projects/10--Residential-Buildings_10.jpg'
    ],
    features: [
      'Sculpted curved balconies across all facades',
      'Expansive private terraces for outdoor living',
      'Panoramic glazing for natural light',
      'Landscaped gardens with water features',
      'Refined lobby entrances with glass façades',
      'Pedestrian friendly walkways',
      'Premium waterfront inspired layout',
      'Energy conscious façade orientation',
      'Community level recreational areas',
      'Distinctive architecture for high resale value'
    ],
    client: 'Confidential',
    budget: 'USD 180,000,000 - USD 220,000,000',
    timeline: '56 months',
    featured: true,
    published: true,
    display_order: 11,
    meta_title: 'Creekside Curved Residences - Dubai Creek Harbour',
    meta_description: 'Premium mid-rise buildings with smooth curved lines, large panoramic terraces and a light façade expression reflecting waterfront lifestyle.'
  },

  // ============================================
  // PROJECT 12: JVC Residential Terrace Towers (Residential Tower - Folder 14)
  // ============================================
  {
    title: 'JVC Residential Terrace Towers',
    slug: 'jvc-residential-terrace-towers',
    category: 'residential',
    location: 'Jumeirah Village Circle, Dubai, UAE',
    area: '60,000 - 70,000 sqm',
    year: '2025',
    status: 'In Design',
    image: '/projects/10--Residential-Tower_01.jpg',
    description: 'Contemporary residential towers with stacked terraces, clean horizontal lines and floor to ceiling glazing in a landscaped community setting.',
    full_description: `This project introduces a set of contemporary residential towers located within Jumeirah Village Circle in Dubai. Each tower features a distinctive arrangement of stacked terraces, clean horizontal lines and floor to ceiling glazing. The façade combines deep balcony projections with warm material accents to create a strong architectural character.

The master layout places the towers within a landscaped setting that encourages walkability and outdoor living. Pathways, planting zones, water features and community gathering areas form a central open space that connects the buildings. The design supports Dubai's growing demand for modern multi-family residential communities with generous terraces and bright interior spaces.

The concept aims to deliver elegant city living with a clear architectural identity suited for a dynamic urban district.`,
    services: [
      'Architectural concept design',
      'Tower massing and elevation development',
      'Podium and landscape design',
      'Visualization and environmental studies',
      'Day and night lighting tests',
      'Community layout planning'
    ],
    tags: [
      'Residential',
      'Mid rise',
      'Terrace tower',
      'Urban community',
      'Dubai',
      'UAE'
    ],
    gallery: [
      '/projects/10--Residential-Tower_01.jpg',
      '/projects/10--Residential-Tower_02.jpg',
      '/projects/10--Residential-Tower_03.jpg',
      '/projects/10--Residential-Tower_04.jpg'
    ],
    features: [
      'Stacked terrace architecture',
      'Full height glazing on all primary facades',
      'Private balconies for most units',
      'Community landscape with seating and pathways',
      'Water features and shaded outdoor spaces',
      'Defined tower entrance lobbies',
      'Amenity areas at ground and podium levels',
      'Secure resident parking',
      'Energy conscious façade treatment',
      'Pedestrian friendly circulation across the site'
    ],
    client: 'Confidential',
    budget: 'USD 140,000,000 - USD 170,000,000',
    timeline: '54 months',
    featured: true,
    published: true,
    display_order: 12,
    meta_title: 'JVC Residential Terrace Towers - Jumeirah Village Circle Dubai',
    meta_description: 'Contemporary residential towers with stacked terraces, clean horizontal lines and floor to ceiling glazing in a landscaped community setting.'
  },

  // ============================================
  // PROJECT 13: Residential Tower 29 Stories
  // ============================================
  {
    title: 'Residential Tower 29 Stories',
    slug: 'residential-tower-29-stories',
    category: 'residential',
    location: 'Al Reem Island, Abu Dhabi, UAE',
    area: '31,000 sqm',
    year: '2025',
    status: 'In Design',
    image: '/projects/17--16--Residential-Tower-29-Stories_01.jpg',
    description: 'A contemporary 29-story living destination with wide terraces, clear vertical profile and floor to ceiling glazing opening to skyline views.',
    full_description: `The 29-story residential tower is planned as a contemporary living destination on Al Reem Island in Abu Dhabi. The design features wide terraces that wrap around each floor, a clear vertical profile and floor to ceiling glazing that opens the apartments to skyline views. Day and night visual studies guide the development of the façade and overall building presence, presenting a tower suited for modern urban living in the UAE.`,
    services: [
      'Architectural concept design',
      'Schematic design',
      'Façade development',
      'Visualization',
      'Lighting and atmosphere studies'
    ],
    tags: [
      'Residential',
      'High rise',
      'Tower',
      'UAE'
    ],
    gallery: [
      '/projects/17--16--Residential-Tower-29-Stories_01.jpg',
      '/projects/17--16--Residential-Tower-29-Stories_02.jpg',
      '/projects/17--16--Residential-Tower-29-Stories_03.jpg',
      '/projects/17--16--Residential-Tower-29-Stories_04.jpg',
      '/projects/17--16--Residential-Tower-29-Stories_05.jpg',
      '/projects/17--16--Residential-Tower-29-Stories_06.jpg'
    ],
    features: [
      'Full height glazing for clear skyline views',
      'Wrap around balconies on multiple levels',
      'Private outdoor terraces for most units',
      'Double height lobby with reception zone',
      'High speed elevators with controlled access',
      'Podium level amenities area',
      'Fitness center and residents lounge',
      'Multi-level parking structure',
      'Rooftop viewing deck',
      'Thermal facade design for improved shading',
      'Landscape design at ground level for drop off and entry sequence',
      'Fire safety and evacuation core designed to UAE code'
    ],
    client: 'Confidential',
    budget: 'USD 87,000,000 - USD 103,000,000',
    timeline: '60 months',
    featured: true,
    published: true,
    display_order: 13,
    meta_title: 'Residential Tower 29 Stories - Al Reem Island Abu Dhabi',
    meta_description: 'A contemporary 29-story living destination with wide terraces, clear vertical profile and floor to ceiling glazing opening to skyline views.'
  },

  // ============================================
  // PROJECT 14: Dubai Hills Residential Terraces (Residential Tower in Dubai)
  // ============================================
  {
    title: 'Dubai Hills Residential Terraces',
    slug: 'dubai-hills-residential-terraces',
    category: 'residential',
    location: 'Dubai Hills Estate, Dubai, UAE',
    area: '40,000 - 48,000 sqm',
    year: '2025',
    status: 'In Design',
    image: '/projects/10--Residential-Tower-in-Dubai-01.jpg',
    description: 'Modern mid-rise residential buildings with angular balconies, open terraces and clean structural expression in a landscaped community.',
    full_description: `This project introduces a collection of modern mid-rise residential buildings located in Dubai Hills Estate. The architecture features a series of eight story towers defined by angular balconies, open terraces and a clean structural expression. Each building is positioned within a landscaped setting that supports community living, pedestrian movement and outdoor recreation.

The design uses shifting balconies and geometric lines to create a distinct visual identity. Large glazing panels provide natural light and wide exterior views. The master layout integrates greenery, water features, walkways and shared spaces, creating a compact residential environment with a strong sense of place.

This project is designed for Dubai's growing residential market, offering contemporary homes surrounded by open landscape and community amenities.`,
    services: [
      'Architectural concept design',
      'Master planning and building layout',
      'Façade design and development',
      'Landscape planning',
      'Visualization and environmental studies',
      'Day and night lighting scenarios'
    ],
    tags: [
      'Residential',
      'Mid rise',
      'Terrace design',
      'Dubai',
      'UAE'
    ],
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
    ],
    features: [
      'Wide private terraces',
      'Shifted balcony geometry',
      'Full height glazing',
      'Landscaped pedestrian pathways',
      'Community plaza and water features',
      'Amenity rich outdoor environment',
      'Multiple residential blocks',
      'Dedicated building entrance zones',
      'Underground or podium parking',
      'Energy conscious façade shading',
      'Walkable community layout'
    ],
    client: 'Confidential',
    budget: 'USD 95,000,000 - USD 120,000,000',
    timeline: '48 months',
    featured: true,
    published: true,
    display_order: 14,
    meta_title: 'Dubai Hills Residential Terraces - Dubai Hills Estate',
    meta_description: 'Modern mid-rise residential buildings with angular balconies, open terraces and clean structural expression in a landscaped community.'
  },

  // ============================================
  // PROJECT 15: Emirates Creative Learning Campus (School)
  // ============================================
  {
    title: 'Emirates Creative Learning Campus',
    slug: 'emirates-creative-learning-campus',
    category: 'institutional',
    location: 'Abu Dhabi, UAE',
    area: '22,000 - 28,000 sqm',
    year: '2025',
    status: 'In Design',
    image: '/projects/03--School_01.jpg',
    description: 'A next-generation learning environment with bold linear form and rainbow-glass façade establishing a strong presence day and night.',
    full_description: `This educational campus is envisioned as a next-generation learning environment for a major urban district in the United Arab Emirates. The architecture uses a bold linear form with a rainbow-glass façade that establishes a strong presence both day and night. The building welcomes students through open terraces, shaded walkways, landscaped courts and a central gathering staircase that frames the campus as a civic space.

Generous glazing connects classrooms with outdoor study zones, while color-toned fins filter daylight and create a recognisable identity. The main academic block is supported by collaborative halls, recreation areas and structured green spaces that extend learning beyond traditional classrooms.

The project is positioned as a landmark educational development suitable for a private operator, an international school brand or a government-led initiative focused on future-ready education in the UAE.`,
    services: [
      'Architectural concept and massing development',
      'Interior layout for classrooms, labs and shared learning zones',
      'Landscape design including shaded courts and outdoor learning areas',
      'Circulation planning for students, staff and visitors',
      'Façade development with color-coded daylight control',
      'Lighting design for academic and public zones',
      'Visualization and presentation materials'
    ],
    tags: [
      'School',
      'UAE',
      'Education',
      'Learning Campus',
      'Innovation Hub'
    ],
    gallery: [
      '/projects/03--School_01.jpg',
      '/projects/03--School_02.jpg',
      '/projects/03--School_03.jpg',
      '/projects/03--School_04.jpg'
    ],
    features: [
      'Creative Learning Halls',
      'STEM and Digital Labs',
      'Library and Research Zone',
      'Sports Facilities',
      'Performing Arts Studio',
      'Cafeteria with Outdoor Terrace',
      'Color-Toned Façade System',
      'Central Amphitheatre Stair',
      'Landscaped Study Gardens',
      'Smart Security and Digital Infrastructure'
    ],
    client: 'Confidential',
    budget: 'USD 60,000,000 - USD 85,000,000',
    timeline: '18 to 22 months',
    featured: true,
    published: true,
    display_order: 15,
    meta_title: 'Emirates Creative Learning Campus - Abu Dhabi School',
    meta_description: 'A next-generation learning environment with bold linear form and rainbow-glass façade establishing a strong presence day and night.'
  },

  // ============================================
  // PROJECT 16: Residential Tower 30 Stories
  // ============================================
  {
    title: 'Residential Tower 30 Stories',
    slug: 'residential-tower-30-stories',
    category: 'residential',
    location: 'Dubai, UAE',
    area: '35,000 sqm',
    year: '2025',
    status: 'In Design',
    image: '/projects/16--Residential-Tower-30-Stories_01.jpg',
    description: 'A 30-story residential tower with modern façade design, premium finishes and panoramic city views.',
    full_description: `This 30-story residential tower is designed as a premium living destination in Dubai. The architecture features a sleek vertical profile with floor-to-ceiling glazing that maximizes natural light and provides residents with stunning panoramic views of the city skyline.

The tower includes a mix of apartment types designed for modern urban living. The ground level features a grand entrance lobby with premium finishes, while the podium levels accommodate resident amenities and parking facilities. The façade design incorporates thermal performance features suitable for the Dubai climate.`,
    services: [
      'Architectural concept design',
      'Schematic design',
      'Façade development',
      'Visualization',
      'Interior planning'
    ],
    tags: [
      'Residential',
      'High rise',
      'Tower',
      'Dubai',
      'UAE'
    ],
    gallery: [
      '/projects/16--Residential-Tower-30-Stories_01.jpg',
      '/projects/16--Residential-Tower-30-Stories_02.jpg',
      '/projects/16--Residential-Tower-30-Stories_03.jpg',
      '/projects/16--Residential-Tower-30-Stories_04.jpg',
      '/projects/16--Residential-Tower-30-Stories_05.jpg',
      '/projects/16--Residential-Tower-30-Stories_06.jpg'
    ],
    features: [
      'Floor to ceiling glazing',
      'Panoramic city views',
      'Premium entrance lobby',
      'Resident amenities',
      'Thermal performance façade',
      'Modern apartment layouts'
    ],
    client: 'Confidential',
    budget: 'USD 90,000,000 - USD 110,000,000',
    timeline: '55 months',
    featured: true,
    published: true,
    display_order: 16,
    meta_title: 'Residential Tower 30 Stories - Dubai High Rise',
    meta_description: 'A 30-story residential tower with modern façade design, premium finishes and panoramic city views.'
  },

  // ============================================
  // PROJECT 17: Building (Folder 10)
  // ============================================
  {
    title: 'Commercial Building',
    slug: 'commercial-building',
    category: 'commercial',
    location: 'UAE',
    area: '25,000 sqm',
    year: '2025',
    status: 'In Design',
    image: '/projects/10--Building_01.jpg',
    description: 'A modern commercial building with contemporary façade design and efficient floor layouts.',
    full_description: `This commercial building project features a modern architectural design with efficient floor layouts suitable for various commercial uses. The façade incorporates contemporary design elements that create a distinctive presence in the urban landscape.

The building is designed to accommodate office spaces, retail areas and supporting facilities. The interior planning focuses on flexibility and efficiency to meet the needs of diverse tenants.`,
    services: [
      'Architectural concept design',
      'Façade development',
      'Interior planning',
      'Visualization'
    ],
    tags: [
      'Commercial',
      'Building',
      'UAE'
    ],
    gallery: [
      '/projects/10--Building_01.jpg',
      '/projects/10--Building_02.jpg',
      '/projects/10--Building_03.jpg',
      '/projects/10--Building_04.jpg',
      '/projects/10--Building_05.jpg',
      '/projects/10--Building_06.jpg',
      '/projects/10--Building_07.jpg',
      '/projects/10--Building_08.jpg'
    ],
    features: [
      'Modern façade design',
      'Efficient floor layouts',
      'Flexible spaces',
      'Contemporary architecture'
    ],
    client: 'Confidential',
    budget: 'USD 35,000,000 - USD 45,000,000',
    timeline: '24 months',
    featured: false,
    published: true,
    display_order: 17,
    meta_title: 'Commercial Building - UAE',
    meta_description: 'A modern commercial building with contemporary façade design and efficient floor layouts.'
  }
]

// ============================================
// MIGRATION FUNCTION
// ============================================
async function migrateProjects() {
  console.log('🚀 Starting projects migration to Supabase...')
  console.log(`📦 Total projects to migrate: ${projectsData.length}`)
  console.log('')

  let successCount = 0
  let errorCount = 0

  for (const project of projectsData) {
    try {
      // Check if project already exists
      const { data: existing } = await supabase
        .from('projects')
        .select('id')
        .eq('slug', project.slug)
        .single()

      if (existing) {
        // Update existing project
        const { error } = await supabase
          .from('projects')
          .update(project)
          .eq('slug', project.slug)

        if (error) throw error
        console.log(`✅ Updated: ${project.title}`)
      } else {
        // Insert new project
        const { error } = await supabase
          .from('projects')
          .insert([project])

        if (error) throw error
        console.log(`✅ Inserted: ${project.title}`)
      }

      successCount++
    } catch (error) {
      console.error(`❌ Failed: ${project.title}`)
      console.error(`   Error: ${error.message}`)
      errorCount++
    }
  }

  console.log('')
  console.log('========================================')
  console.log('📊 Migration Summary:')
  console.log(`   ✅ Successful: ${successCount}`)
  console.log(`   ❌ Failed: ${errorCount}`)
  console.log(`   📦 Total: ${projectsData.length}`)
  console.log('========================================')

  if (errorCount === 0) {
    console.log('🎉 All projects migrated successfully!')
  } else {
    console.log('⚠️  Some projects failed to migrate. Check the errors above.')
  }
}

// Run the migration
migrateProjects()
  .then(() => {
    console.log('')
    console.log('Migration script completed.')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Migration script failed:', error)
    process.exit(1)
  })
