# Arabic Language Support for Merka Architecture Website

This document explains the Arabic language implementation for the Merka Architecture website.

## Features Added

### 1. Language Switcher
- Located in the header next to the menu button
- Elegant toggle button that switches between English (🇬🇧) and Arabic (🇦🇪)
- Language preference is saved in browser localStorage
- Automatically detects browser language for new visitors

### 2. RTL (Right-to-Left) Support
- Full RTL layout support when Arabic is selected
- Text alignment, flex directions, and margins are automatically adjusted
- Icons and arrows are flipped appropriately

### 3. Arabic Fonts
- **Cairo** - Modern Arabic font for body text
- **Tajawal** - Elegant Arabic font for headings
- Both fonts are loaded from Google Fonts with proper subsets

### 4. Translation Files
Located in `/locales/`:
- `en.json` - English translations
- `ar.json` - Arabic translations

### 5. Admin Panel Integration
- New "Language" tab in Site Settings
- Toggle to enable/disable Arabic language
- Set default language preference
- Preview language switcher in admin panel

## How to Use

### For Developers

1. **Using translations in components:**
```jsx
import { useLanguage } from '@/lib/LanguageContext'

function MyComponent() {
  const { t, isRTL } = useLanguage()
  
  return (
    <div className={isRTL ? 'text-right' : 'text-left'}>
      <h1>{t('home.hero.title')}</h1>
      <p>{t('common.readMore')}</p>
    </div>
  )
}
```

2. **RTL-aware styling:**
```jsx
<div className={`flex gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
  {/* Content will reverse in Arabic */}
</div>
```

3. **Adding new translations:**
   - Add the key to both `/locales/en.json` and `/locales/ar.json`
   - Use nested keys for organization (e.g., `nav.home`, `contact.form.name`)

### For Content Editors

1. **Static UI translations** are managed in the JSON files
2. **Dynamic content** (blogs, projects, services) can have Arabic versions:
   - Run the SQL migration: `supabase/add-arabic-support.sql`
   - Use the `_ar` suffixed columns (e.g., `title_ar`, `description_ar`)

## File Structure

```
├── lib/
│   └── LanguageContext.js      # React context for language state
├── locales/
│   ├── en.json                 # English translations
│   └── ar.json                 # Arabic translations
├── app/
│   ├── components/
│   │   └── LanguageSwitcher.js # Language toggle component
│   ├── globals.css             # RTL CSS styles
│   └── layout.js               # Language provider wrapper
└── supabase/
    └── add-arabic-support.sql  # Database migration for Arabic columns
```

## Database Migration

To enable Arabic content for dynamic data (blogs, projects, etc.), run:

```sql
-- In Supabase SQL Editor
-- Run the contents of: supabase/add-arabic-support.sql
```

This adds `_ar` columns to all content tables:
- `title_ar`
- `description_ar`
- `content_ar`
- `meta_title_ar`
- `meta_description_ar`

## Customization

### Adding More Languages

1. Create a new translation file: `/locales/[lang].json`
2. Add the language to `LANGUAGES` in `LanguageContext.js`:
```js
const LANGUAGES = {
  en: { code: 'en', name: 'English', nativeName: 'English', dir: 'ltr', flag: '🇬🇧' },
  ar: { code: 'ar', name: 'Arabic', nativeName: 'العربية', dir: 'rtl', flag: '🇦🇪' },
  // Add new language here
  fr: { code: 'fr', name: 'French', nativeName: 'Français', dir: 'ltr', flag: '🇫🇷' },
}
```

### Modifying Translations

Edit the corresponding JSON files in `/locales/`:
- Keep the same structure in all language files
- Use the `t()` function to access translations

## Testing

1. Click the language switcher in the header
2. Verify the page content changes to Arabic
3. Check that the layout switches to RTL
4. Confirm Arabic fonts are loading correctly
5. Verify language preference persists after page refresh

## Notes

- The language context wraps the entire application
- All components must be client components (`'use client'`) to use `useLanguage()`
- Server components can pass the language as a prop from parent client components
