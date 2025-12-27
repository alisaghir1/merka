# Merka Architecture Admin Panel

A complete content management system for the Merka Architecture website, built with Next.js 15 and Supabase.

## Features

- 📝 **Blog Management** - Create, edit, and publish blog posts with rich text editor
- 🏗️ **Project Portfolio** - Manage architecture projects with images and details
- ⚙️ **Services** - Update service offerings and descriptions
- 🎨 **Styles & Typologies** - Manage architectural styles and building typologies
- 👥 **Team Members** - Add and edit team member profiles
- 📧 **Contact Submissions** - View and manage contact form submissions
- 📬 **Newsletter Subscribers** - Track newsletter subscriptions
- 🖼️ **Hero Slides** - Manage homepage hero carousel
- 📁 **Media Library** - Upload and manage images
- ⚙️ **Site Settings** - Configure site-wide settings
- ✨ **Rich Text Editor** - Full-featured TipTap editor with formatting

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

The required packages are already added:
- `@supabase/supabase-js`
- `@supabase/ssr`
- `@tiptap/react` (and extensions for rich text editing)

### 2. Create Supabase Project

1. Go to [Supabase](https://supabase.com) and create a new project
2. Note your project URL and anon key from Settings > API

### 3. Configure Environment Variables

Create or update `.env.local` file:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Existing EmailJS configuration (keep these)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_SUBSCRIPTION_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

### 4. Run Database Schema

1. Open your Supabase project dashboard
2. Go to **SQL Editor**
3. Copy and paste the contents of `supabase/schema.sql`
4. Run the SQL script

This creates all necessary tables:
- `blogs` - Blog posts
- `projects` - Portfolio projects
- `services` - Services offered
- `styles` - Architectural styles
- `typologies` - Building typologies
- `team_members` - Team profiles
- `contact_submissions` - Contact form data
- `newsletter_subscriptions` - Newsletter signups
- `hero_slides` - Homepage carousel
- `media` - Uploaded media files
- `settings` - Site configuration
- `categories` - Content categories

### 5. Create Admin User

1. Go to Supabase Dashboard > Authentication > Users
2. Click "Add User" > "Create New User"
3. Enter email and password for admin access
4. This email/password will be used to login at `/admin/login`

### 6. Configure Storage (Optional)

For image uploads in the media library:

1. Go to Supabase Dashboard > Storage
2. Create a new bucket called `media`
3. Set the bucket to **Public** for images to be accessible
4. Add bucket policy for authenticated uploads:

```sql
-- Allow authenticated users to upload
CREATE POLICY "Allow authenticated uploads"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'media');

-- Allow public reads
CREATE POLICY "Allow public reads"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'media');

-- Allow authenticated deletes
CREATE POLICY "Allow authenticated deletes"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'media');
```

### 7. Run the Development Server

```bash
npm run dev
```

Access the admin panel at: `http://localhost:3000/admin`

## Admin Panel Structure

```
app/admin/
├── layout.js          # Admin layout with sidebar
├── page.js            # Dashboard with stats
├── login/page.js      # Authentication
├── blogs/
│   ├── page.js        # List all blogs
│   ├── new/page.js    # Create new blog
│   └── [id]/page.js   # Edit blog
├── projects/
│   ├── page.js        # List all projects
│   ├── new/page.js    # Create new project
│   └── [id]/page.js   # Edit project
├── services/
│   ├── page.js        # List all services
│   ├── new/page.js    # Create new service
│   └── [id]/page.js   # Edit service
├── styles/
│   ├── page.js        # List all styles
│   ├── new/page.js    # Create new style
│   └── [slug]/page.js # Edit style
├── typologies/
│   ├── page.js        # List all typologies
│   ├── new/page.js    # Create new typology
│   └── [slug]/page.js # Edit typology
├── team/page.js       # Manage team members
├── contacts/page.js   # View contact submissions
├── newsletter/page.js # Manage subscribers
├── hero-slides/page.js# Manage hero carousel
├── media/page.js      # Media library
├── settings/page.js   # Site settings
└── components/
    ├── AdminLayout.js # Sidebar navigation
    └── RichTextEditor.js # TipTap editor
```

## Rich Text Editor Features

The admin panel includes a full-featured rich text editor:

- Bold, Italic, Underline, Strike
- Headings (H1, H2, H3)
- Bullet and Ordered Lists
- Text Alignment (Left, Center, Right)
- Links and Images
- Text Color
- Undo/Redo

## Data Flow

1. **Admin creates/edits content** → Saved to Supabase
2. **Frontend pages load** → Fetch from Supabase (with static fallback)
3. **Contact forms submit** → Saved to Supabase + sent via EmailJS
4. **Newsletter signups** → Saved to Supabase + sent via EmailJS

## Fallback Behavior

If Supabase is not configured or has errors, the frontend pages will fall back to static data from:
- `app/data/blogs.js`
- `app/data/projects.js`
- `app/data/styles-typologies.js`

This ensures the site always works even without the database.

## Troubleshooting

### "Failed to fetch" errors
- Check that Supabase URL and anon key are correctly set in `.env.local`
- Verify the database tables exist by running the schema SQL

### Authentication issues
- Ensure you've created a user in Supabase Authentication
- Check that Row Level Security policies allow authenticated access

### Images not loading
- Create the `media` storage bucket in Supabase
- Set the bucket to public
- Add the storage policies as described above

## Customization

### Colors
The admin panel uses these brand colors:
- Primary: `#041533` (Dark Blue)
- Secondary: `#877051` (Gold/Tan)

### Adding New Content Types
1. Create new table in Supabase schema
2. Add new admin pages in `app/admin/[content-type]/`
3. Add navigation link in `AdminLayout.js`
4. Create data fetching function in `lib/data.js`

## Security Notes

- The middleware protects all `/admin` routes
- Only authenticated users can access the admin panel
- Supabase RLS policies control database access
- Never expose your service role key on the client side
