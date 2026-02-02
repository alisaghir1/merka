/**
 * Add Arabic Translations Script
 * 
 * This script adds Arabic translations to existing data in the database
 * Run with: node scripts/add-arabic-translations.js
 */

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

// ============================================
// PROJECT TRANSLATIONS
// ============================================
const projectTranslations = {
  'ING Bank Headquarters': {
    title_ar: 'المقر الرئيسي لبنك ING',
    description_ar: 'مقر بنكي حديث يجمع بين التصميم المبتكر والوظائف العملية',
    location_ar: 'دبي، الإمارات العربية المتحدة',
    category_ar: 'تجاري',
    status_ar: 'مكتمل'
  },
  'Downtown Mixed-Use Tower': {
    title_ar: 'برج وسط المدينة متعدد الاستخدامات',
    description_ar: 'برج متعدد الاستخدامات يجمع بين المساحات السكنية والتجارية',
    location_ar: 'دبي، الإمارات العربية المتحدة',
    category_ar: 'متعدد الاستخدامات',
    status_ar: 'مكتمل'
  },
  'Triad Business Towers': {
    title_ar: 'أبراج ترياد للأعمال',
    description_ar: 'مجمع أبراج أعمال ثلاثي يوفر مساحات مكتبية عالمية المستوى',
    location_ar: 'دبي، الإمارات العربية المتحدة',
    category_ar: 'تجاري',
    status_ar: 'مكتمل'
  },
  'Government Administration Complex': {
    title_ar: 'مجمع الإدارة الحكومية',
    description_ar: 'مجمع إداري حكومي حديث مصمم لتحقيق أعلى معايير الكفاءة والاستدامة',
    location_ar: 'أبوظبي، الإمارات العربية المتحدة',
    category_ar: 'حكومي',
    status_ar: 'مكتمل'
  },
  'Arched Italian Pavilion Restaurant': {
    title_ar: 'مطعم الجناح الإيطالي المقوس',
    description_ar: 'مطعم فاخر بتصميم إيطالي كلاسيكي مع أقواس معمارية مميزة',
    location_ar: 'دبي، الإمارات العربية المتحدة',
    category_ar: 'ضيافة',
    status_ar: 'مكتمل'
  },
  'JVC Residential Terrace Towers': {
    title_ar: 'أبراج شرفات JVC السكنية',
    description_ar: 'أبراج سكنية عصرية مع شرفات واسعة ومناظر خلابة',
    location_ar: 'دبي، الإمارات العربية المتحدة',
    category_ar: 'سكني',
    status_ar: 'مكتمل'
  },
  'Commercial Building': {
    title_ar: 'مبنى تجاري',
    description_ar: 'مبنى تجاري حديث يوفر مساحات مكتبية ومحلات تجارية',
    location_ar: 'دبي، الإمارات العربية المتحدة',
    category_ar: 'تجاري',
    status_ar: 'مكتمل'
  },
  'Levent Hotel': {
    title_ar: 'فندق ليفنت',
    description_ar: 'فندق فاخر من فئة الخمس نجوم بتصميم عصري أنيق',
    location_ar: 'إسطنبول، تركيا',
    category_ar: 'ضيافة',
    status_ar: 'مكتمل'
  },
  'Lattice Tower Hotel': {
    title_ar: 'فندق برج الشبكة',
    description_ar: 'فندق مميز بتصميم شبكي معماري فريد',
    location_ar: 'دبي، الإمارات العربية المتحدة',
    category_ar: 'ضيافة',
    status_ar: 'مكتمل'
  },
  'Corniche Orbital Mall and Cultural Complex': {
    title_ar: 'مجمع كورنيش المداري التجاري والثقافي',
    description_ar: 'مجمع متكامل يضم مركز تسوق ومرافق ثقافية على الواجهة البحرية',
    location_ar: 'أبوظبي، الإمارات العربية المتحدة',
    category_ar: 'متعدد الاستخدامات',
    status_ar: 'مكتمل'
  },
  'Creekside Curved Residences': {
    title_ar: 'مساكن الخور المنحنية',
    description_ar: 'مجمع سكني بتصميم منحني أنيق يطل على خور دبي',
    location_ar: 'دبي، الإمارات العربية المتحدة',
    category_ar: 'سكني',
    status_ar: 'مكتمل'
  },
  'Residential Tower 29 Stories': {
    title_ar: 'برج سكني من 29 طابق',
    description_ar: 'برج سكني شاهق يوفر شققاً فاخرة بمناظر بانورامية',
    location_ar: 'دبي، الإمارات العربية المتحدة',
    category_ar: 'سكني',
    status_ar: 'مكتمل'
  },
  'Urban Split Tower': {
    title_ar: 'برج المدينة المنقسم',
    description_ar: 'برج بتصميم معماري فريد منقسم يخلق مساحات مفتوحة',
    location_ar: 'دبي، الإمارات العربية المتحدة',
    category_ar: 'تجاري',
    status_ar: 'مكتمل'
  },
  'Dubai Hills Residential Terraces': {
    title_ar: 'شرفات دبي هيلز السكنية',
    description_ar: 'مجمع سكني فاخر في قلب دبي هيلز مع شرفات واسعة',
    location_ar: 'دبي، الإمارات العربية المتحدة',
    category_ar: 'سكني',
    status_ar: 'مكتمل'
  },
  'Residential Tower 30 Stories': {
    title_ar: 'برج سكني من 30 طابق',
    description_ar: 'برج سكني فاخر من 30 طابق بتشطيبات عالية الجودة',
    location_ar: 'دبي، الإمارات العربية المتحدة',
    category_ar: 'سكني',
    status_ar: 'مكتمل'
  },
  'Bank Albilad Headquarters': {
    title_ar: 'المقر الرئيسي لبنك البلاد',
    description_ar: 'المقر الرئيسي لبنك البلاد بتصميم معماري إسلامي عصري',
    location_ar: 'الرياض، المملكة العربية السعودية',
    category_ar: 'تجاري',
    status_ar: 'مكتمل'
  },
  'Emirates Creative Learning Campus': {
    title_ar: 'حرم الإمارات للتعلم الإبداعي',
    description_ar: 'حرم تعليمي متكامل يوفر بيئة إبداعية للتعلم والابتكار',
    location_ar: 'دبي، الإمارات العربية المتحدة',
    category_ar: 'تعليمي',
    status_ar: 'مكتمل'
  }
}

// ============================================
// SERVICE TRANSLATIONS
// ============================================
const serviceTranslations = {
  'Conceptual Design': {
    title_ar: 'التصميم المفاهيمي',
    description_ar: 'نطور أفكاراً إبداعية ومفاهيم معمارية مبتكرة تشكل أساس المشروع',
    full_description_ar: 'نقدم خدمات التصميم المفاهيمي التي تحول رؤيتكم إلى أفكار معمارية ملموسة، مع دراسة الجدوى والتحليل الأولي للموقع.',
    features_ar: ['تطوير المفاهيم', 'دراسات الجدوى', 'تحليل الموقع', 'رسومات أولية'],
    benefits_ar: ['رؤية واضحة للمشروع', 'أفكار مبتكرة', 'توفير الوقت', 'اتخاذ قرارات مبكرة']
  },
  'Schematic Design': {
    title_ar: 'التصميم التخطيطي',
    description_ar: 'نحول المفاهيم إلى رسومات تخطيطية واضحة ومفصلة',
    full_description_ar: 'نقدم خدمات التصميم التخطيطي التي تطور المفهوم المعماري إلى رسومات ومخططات أولية تحدد الحجم والشكل والعلاقات المكانية.',
    features_ar: ['مخططات أولية', 'دراسات الكتلة', 'العلاقات المكانية', 'تقديرات التكلفة'],
    benefits_ar: ['وضوح التصميم', 'تحديد الميزانية', 'موافقات مبكرة', 'تقليل التغييرات']
  },
  'Design Development': {
    title_ar: 'تطوير التصميم',
    description_ar: 'نطور التصميم بالتفاصيل الفنية والمواصفات الدقيقة',
    full_description_ar: 'نقدم خدمات تطوير التصميم التي تضيف التفاصيل الفنية والمواصفات لكل عنصر من عناصر المشروع.',
    features_ar: ['تفاصيل فنية', 'مواصفات المواد', 'أنظمة البناء', 'التنسيق مع الاستشاريين'],
    benefits_ar: ['تصميم مكتمل', 'تقديرات دقيقة', 'تقليل المخاطر', 'تنسيق أفضل']
  },
  'Construction Drawings': {
    title_ar: 'رسومات التنفيذ',
    description_ar: 'نعد رسومات تنفيذية شاملة ودقيقة للبناء',
    full_description_ar: 'نقدم رسومات تنفيذية مفصلة تشمل جميع المعلومات اللازمة للمقاولين لبناء المشروع بدقة.',
    features_ar: ['رسومات معمارية', 'رسومات إنشائية', 'رسومات ميكانيكية', 'رسومات كهربائية'],
    benefits_ar: ['دقة التنفيذ', 'تقليل الأخطاء', 'سهولة البناء', 'التزام بالمواصفات']
  },
  'Tender Documentation': {
    title_ar: 'وثائق المناقصات',
    description_ar: 'نعد وثائق مناقصات شاملة وواضحة',
    full_description_ar: 'نقدم خدمات إعداد وثائق المناقصات التي تشمل الرسومات والمواصفات والجداول الكمية وشروط العقد.',
    features_ar: ['جداول الكميات', 'المواصفات الفنية', 'شروط العقد', 'جدول زمني'],
    benefits_ar: ['عطاءات دقيقة', 'مقارنة عادلة', 'وضوح النطاق', 'تقليل النزاعات']
  },
  'Authority Approvals': {
    title_ar: 'الموافقات الحكومية',
    description_ar: 'نتولى الحصول على جميع الموافقات والتصاريح اللازمة',
    full_description_ar: 'نقدم خدمات الحصول على الموافقات من الجهات الحكومية والبلديات وجميع الجهات المعنية.',
    features_ar: ['تصاريح البناء', 'موافقات البلدية', 'موافقات الدفاع المدني', 'شهادات الإنجاز'],
    benefits_ar: ['سرعة الإنجاز', 'امتثال تنظيمي', 'تجنب التأخير', 'خبرة محلية']
  }
}

// ============================================
// STYLE TRANSLATIONS
// ============================================
const styleTranslations = {
  'Contemporary Minimalism': {
    title_ar: 'البساطة المعاصرة',
    short_description_ar: 'تصميم نظيف وبسيط مع خطوط واضحة ومساحات مفتوحة',
    description_ar: 'طراز البساطة المعاصرة يتميز بالخطوط النظيفة والأشكال الهندسية البسيطة والمساحات المفتوحة مع التركيز على الوظيفة والجمال.',
    features_ar: ['خطوط نظيفة', 'مساحات مفتوحة', 'إضاءة طبيعية وفيرة', 'ألوان محايدة']
  },
  'Modern Emirati Fusion': {
    title_ar: 'الاندماج الإماراتي الحديث',
    short_description_ar: 'دمج التراث الإماراتي مع التصميم المعاصر',
    description_ar: 'طراز يجمع بين عناصر العمارة الإماراتية التقليدية والتصميم الحديث، مستوحى من البيئة المحلية والثقافة الغنية.',
    features_ar: ['عناصر تراثية', 'مواد محلية', 'تهوية طبيعية', 'ظلال وبراجيل']
  },
  'Neoclassical Mediterranean': {
    title_ar: 'الكلاسيكية الجديدة المتوسطية',
    short_description_ar: 'أناقة كلاسيكية مستوحاة من البحر المتوسط',
    description_ar: 'طراز يجمع بين الأناقة الكلاسيكية وسحر البحر المتوسط، مع أعمدة وأقواس وتفاصيل زخرفية راقية.',
    features_ar: ['أعمدة وأقواس', 'ألوان دافئة', 'بلاط مزخرف', 'شرفات واسعة']
  },
  'Islamic Architecture': {
    title_ar: 'العمارة الإسلامية',
    short_description_ar: 'تصميم يستلهم من التراث المعماري الإسلامي العريق',
    description_ar: 'العمارة الإسلامية تتميز بالزخارف الهندسية المعقدة والخط العربي والأقواس والقباب والفناءات الداخلية والمشربيات.',
    features_ar: ['زخارف هندسية', 'أقواس مدببة', 'قباب', 'مشربيات', 'فناءات داخلية']
  },
  'Futuristic Parametric': {
    title_ar: 'التصميم البارامتري المستقبلي',
    short_description_ar: 'تصميم مستقبلي بأشكال حرة وتقنيات متقدمة',
    description_ar: 'التصميم البارامتري يستخدم الخوارزميات والتقنيات المتقدمة لإنشاء أشكال معمارية مبتكرة وانسيابية.',
    features_ar: ['أشكال انسيابية', 'تقنيات متقدمة', 'واجهات ديناميكية', 'استدامة']
  },
  'Sustainable Passive': {
    title_ar: 'التصميم السلبي المستدام',
    short_description_ar: 'عمارة صديقة للبيئة تعتمد على الطبيعة',
    description_ar: 'التصميم السلبي المستدام يستفيد من العناصر الطبيعية للتبريد والتدفئة والإضاءة، مما يقلل استهلاك الطاقة.',
    features_ar: ['تهوية طبيعية', 'إضاءة طبيعية', 'عزل حراري', 'طاقة متجددة']
  }
}

// ============================================
// TYPOLOGY TRANSLATIONS
// ============================================
const typologyTranslations = {
  'Residential': {
    title_ar: 'سكني',
    short_description_ar: 'مشاريع سكنية من فلل وشقق ومجمعات سكنية',
    description_ar: 'نصمم مشاريع سكنية متنوعة تلبي احتياجات السكان المختلفة، من الفلل الفاخرة إلى الأبراج السكنية.'
  },
  'Commercial': {
    title_ar: 'تجاري',
    short_description_ar: 'مباني مكتبية ومراكز تجارية ومحلات',
    description_ar: 'نصمم مشاريع تجارية توفر بيئات عمل مثالية ومساحات تسوق جذابة تعزز تجربة الزوار.'
  },
  'Hospitality': {
    title_ar: 'ضيافة',
    short_description_ar: 'فنادق ومنتجعات ومطاعم ومقاهي',
    description_ar: 'نصمم مشاريع ضيافة توفر تجارب استثنائية للضيوف وتعكس هوية العلامة التجارية.'
  },
  'Cultural & Institutional': {
    title_ar: 'ثقافي ومؤسسي',
    short_description_ar: 'متاحف ومسارح ومراكز ثقافية ومباني حكومية',
    description_ar: 'نصمم مشاريع ثقافية ومؤسسية تحتفي بالفن والتراث وتخدم المجتمع.'
  },
  'Healthcare': {
    title_ar: 'رعاية صحية',
    short_description_ar: 'مستشفيات وعيادات ومراكز صحية',
    description_ar: 'نصمم مرافق صحية تراعي راحة المرضى وكفاءة العمل والمعايير الصحية العالمية.'
  },
  'Educational': {
    title_ar: 'تعليمي',
    short_description_ar: 'مدارس وجامعات ومراكز تدريب',
    description_ar: 'نصمم مرافق تعليمية تعزز بيئة التعلم والإبداع وتلهم الطلاب.'
  },
  'Mixed-Use': {
    title_ar: 'متعدد الاستخدامات',
    short_description_ar: 'مشاريع تجمع بين استخدامات متعددة',
    description_ar: 'نصمم مشاريع متكاملة تجمع بين السكن والتجارة والترفيه في مكان واحد.'
  },
  'Industrial': {
    title_ar: 'صناعي',
    short_description_ar: 'مصانع ومستودعات ومرافق صناعية',
    description_ar: 'نصمم مرافق صناعية تحقق أعلى معايير الكفاءة والسلامة والاستدامة.'
  }
}

// ============================================
// UPDATE FUNCTIONS
// ============================================

async function updateProjects() {
  console.log('\n📦 Updating Projects with Arabic translations...')
  
  const { data: projects, error } = await supabase
    .from('projects')
    .select('id, title')
  
  if (error) {
    console.error('Error fetching projects:', error.message)
    return
  }
  
  let count = 0
  for (const project of projects) {
    const translation = projectTranslations[project.title]
    if (translation) {
      const { error: updateError } = await supabase
        .from('projects')
        .update(translation)
        .eq('id', project.id)
      
      if (updateError) {
        console.error(`  ❌ ${project.title}:`, updateError.message)
      } else {
        console.log(`  ✅ ${project.title}`)
        count++
      }
    } else {
      console.log(`  ⏭️  No translation for: ${project.title}`)
    }
  }
  console.log(`  📊 Updated ${count}/${projects.length} projects`)
}

async function updateServices() {
  console.log('\n🛠️  Updating Services with Arabic translations...')
  
  const { data: services, error } = await supabase
    .from('services')
    .select('id, title')
  
  if (error) {
    console.error('Error fetching services:', error.message)
    return
  }
  
  let count = 0
  for (const service of services) {
    const translation = serviceTranslations[service.title]
    if (translation) {
      const { error: updateError } = await supabase
        .from('services')
        .update(translation)
        .eq('id', service.id)
      
      if (updateError) {
        console.error(`  ❌ ${service.title}:`, updateError.message)
      } else {
        console.log(`  ✅ ${service.title}`)
        count++
      }
    } else {
      console.log(`  ⏭️  No translation for: ${service.title}`)
    }
  }
  console.log(`  📊 Updated ${count}/${services.length} services`)
}

async function updateStyles() {
  console.log('\n🎨 Updating Styles with Arabic translations...')
  
  const { data: styles, error } = await supabase
    .from('styles')
    .select('id, title')
  
  if (error) {
    console.error('Error fetching styles:', error.message)
    return
  }
  
  let count = 0
  for (const style of styles) {
    const translation = styleTranslations[style.title]
    if (translation) {
      const { error: updateError } = await supabase
        .from('styles')
        .update(translation)
        .eq('id', style.id)
      
      if (updateError) {
        console.error(`  ❌ ${style.title}:`, updateError.message)
      } else {
        console.log(`  ✅ ${style.title}`)
        count++
      }
    } else {
      console.log(`  ⏭️  No translation for: ${style.title}`)
    }
  }
  console.log(`  📊 Updated ${count}/${styles.length} styles`)
}

async function updateTypologies() {
  console.log('\n🏗️  Updating Typologies with Arabic translations...')
  
  const { data: typologies, error } = await supabase
    .from('typologies')
    .select('id, title')
  
  if (error) {
    console.error('Error fetching typologies:', error.message)
    return
  }
  
  let count = 0
  for (const typology of typologies) {
    const translation = typologyTranslations[typology.title]
    if (translation) {
      const { error: updateError } = await supabase
        .from('typologies')
        .update(translation)
        .eq('id', typology.id)
      
      if (updateError) {
        console.error(`  ❌ ${typology.title}:`, updateError.message)
      } else {
        console.log(`  ✅ ${typology.title}`)
        count++
      }
    } else {
      console.log(`  ⏭️  No translation for: ${typology.title}`)
    }
  }
  console.log(`  📊 Updated ${count}/${typologies.length} typologies`)
}

// ============================================
// MAIN
// ============================================

async function main() {
  console.log('🌐 Adding Arabic translations to database...')
  console.log('=' .repeat(50))
  
  await updateProjects()
  await updateServices()
  await updateStyles()
  await updateTypologies()
  
  console.log('\n' + '='.repeat(50))
  console.log('✨ Done!')
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Fatal error:', err)
    process.exit(1)
  })
