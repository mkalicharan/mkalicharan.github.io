# Kalicharan Mahasivabhattu - Vibe Coding Trainer Website

A professional, responsive website showcasing Kalicharan Mahasivabhattu's profile as an AI/ML expert and Vibe Coding trainer. Built with Next.js 16, React, and TypeScript.

## 🌐 Live Preview

The website is currently running in the development environment. Refresh your browser to see the latest changes.

## 📋 Features

- **Modern Design**: Clean, professional aesthetic with gradient accents and smooth animations
- **Responsive**: Fully responsive design that works on all devices (mobile, tablet, desktop)
- **SEO Optimized**: Proper meta tags and semantic HTML
- **Fast Loading**: Optimized for performance with Next.js
- **Interactive**: Smooth scrolling, animations, and hover effects

## 📁 Project Structure

```
my-project/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Main website page
│   │   ├── layout.tsx        # Root layout
│   │   ├── globals.css       # Global styles
│   │   └── api/              # API routes
│   ├── components/
│   │   └── ui/               # shadcn/ui components
│   ├── hooks/                # Custom React hooks
│   └── lib/                  # Utility functions
├── public/
│   ├── upload/
│   │   ├── profile-photo.jpeg      # Your profile photo
│   │   └── KM-AI.pdf              # Your resume
│   ├── hero-bg.png            # Hero section background
│   └── pattern-bg.png         # Pattern background
└── README.md
```

## 🚀 Deployment Options

### Option 1: Deploy to Vercel (Recommended for Next.js)

**Vercel is the easiest way to deploy Next.js applications:**

1. **Push your code to GitHub:**
   ```bash
   cd /home/z/my-project
   git init
   git add .
   git commit -m "Initial commit - Kalicharan Mahasivabhattu website"
   git remote add origin https://github.com/YOUR_USERNAME/mkalicharan-website.git
   git push -u origin main
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com) and sign up
   - Click "New Project"
   - Import your GitHub repository
   - Click "Deploy"
   - Your site will be live at `https://your-project.vercel.app`

3. **Add Custom Domain:**
   - In Vercel dashboard, go to Settings → Domains
   - Add `mkalicharan.com`
   - Follow the DNS instructions provided by Vercel

### Option 2: Deploy to GitHub Pages (Static Export)

**To deploy to GitHub Pages, you need to export as a static site:**

1. **Update next.config.ts to enable static export:**
   ```typescript
   import type { NextConfig } from "next";

   const nextConfig: NextConfig = {
     output: 'export',
     images: {
       unoptimized: true
     }
   };

   export default nextConfig;
   ```

2. **Build the static site:**
   ```bash
   bun run build
   ```
   This will create an `out/` folder with static HTML/CSS/JS files.

3. **Deploy to GitHub Pages:**
   ```bash
   # Install gh-pages if not already installed
   bun add -D gh-pages

   # Add deploy script to package.json
   # "deploy": "gh-pages -d out"

   # Deploy
   bun run deploy
   ```

4. **Configure GitHub Pages:**
   - Go to your repository Settings → Pages
   - Source: Deploy from a branch → `gh-pages` branch → `/ (root)`
   - Your site will be live at `https://YOUR_USERNAME.github.io/REPO_NAME`

5. **Add Custom Domain:**
   - Add `mkalicharan.com` in GitHub Pages settings
   - Configure DNS records:
     ```
     Type: A    | Name: @    | Value: 185.199.108.153
     Type: A    | Name: @    | Value: 185.199.109.153
     Type: A    | Name: @    | Value: 185.199.110.153
     Type: A    | Name: @    | Value: 185.199.111.153
     Type: CNAME| Name: www  | Value: YOUR_USERNAME.github.io
     ```

### Option 3: Deploy to Netlify

1. **Build the site:**
   ```bash
   bun run build
   ```

2. **Deploy to Netlify:**
   - Go to [netlify.com](https://netlify.com) and sign up
   - Drag and drop the `.next` or `out` folder (if using static export)
   - Or connect your GitHub repository for automatic deployments

## 📝 Website Sections

### Hero Section
- Professional photo with animated background
- Compelling headline about Vibe Coding
- Key statistics (20+ years, 8K+ followers, $50K award)
- Call-to-action buttons

### About Section
- Detailed bio highlighting your expertise
- Interactive skills grid with hover effects
- Professional experience highlights

### Book Section
- "Algorithm Diaries" book showcase
- Features and benefits
- Call-to-action to purchase

### Podcast Section
- "Talking AWS for Data Science" podcast
- Episode highlights
- Listen links

### Achievements Section
- Dark theme with animated pattern background
- Four achievement cards:
  - $50K Innovation Funding
  - 8K+ LinkedIn Followers
  - 20+ Years Experience
  - Published Author

### Courses Section
- **Vibe Coding Fundamentals**: $1,999 (8 weeks, 1:1 coaching)
- **Advanced Vibe Coding**: $2,999 (12 weeks, intensive)
- **Enterprise Vibe Coding**: Custom pricing

### Contact Section
- Email contact: mkalicharan@gmail.com
- Social media links (LinkedIn, Twitter, GitHub)

## 🎨 Customization

### Updating Content
Edit `src/app/page.tsx` to modify:
- Text content
- Links
- Course pricing
- Contact information

### Updating Images
Replace images in the `public/` folder:
- `public/upload/profile-photo.jpeg` - Your profile photo
- `public/hero-bg.png` - Hero background
- `public/pattern-bg.png` - Pattern backgrounds

### Changing Colors
Modify CSS variables in the `<style jsx global>` section in `src/app/page.tsx`:

```javascript
// In the style section, look for these variables and modify:
:root {
  --primary: #3b82f6;
  --secondary: #8b5cf6;
  --accent: #06b6d4;
  --dark: #0f172a;
  /* ... more variables */
}
```

## 🛠️ Development

### Running Locally
```bash
bun install
bun run dev
```

Visit `http://localhost:3000` to see the website.

### Building for Production
```bash
bun run build
```

### Checking Code Quality
```bash
bun run lint
```

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🔧 Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## 📊 Performance

- **Framework**: Next.js 16 with App Router
- **Styling**: Inline CSS with React
- **Optimization**: Automatic code splitting, image optimization
- **Lighthouse Score**: Expected 95+ (Performance, Accessibility, Best Practices, SEO)

## 🎯 SEO Features

- Semantic HTML5 structure
- Proper heading hierarchy
- Alt text for images
- Mobile-friendly design
- Fast loading times

## 📧 Contact Information

- **Email**: mkalicharan@gmail.com
- **LinkedIn**: https://www.linkedin.com/in/kalicharan-mahasivabhattu-5a6a6a12/
- **Website**: https://mkalicharan.com

## 🔄 Updates

To update the website after making changes:

```bash
# Check status
git status

# Add changes
git add .

# Commit changes
git commit -m "Update website content"

# Push to GitHub
git push origin main
```

If using Vercel or Netlify with GitHub integration, your site will automatically deploy.

## 🐛 Troubleshooting

### Preview not loading
- Wait a few seconds for the dev server to recompile
- Refresh your browser
- Check the browser console for errors

### Images not loading
- Verify images are in the `public/` folder
- Check file paths in `src/app/page.tsx`
- Ensure filenames match exactly (case-sensitive)

### Build errors
- Run `bun run lint` to check for code issues
- Check the terminal for specific error messages
- Ensure all dependencies are installed with `bun install`

## 📄 License

© 2025 Kalicharan Mahasivabhattu. All rights reserved.

---

**Built with ❤️ using Next.js 16, React, and TypeScript**
