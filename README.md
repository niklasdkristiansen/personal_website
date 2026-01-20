# Personal Website

A modern personal website built with React + Vite, featuring an introduction section and curated AI news resources.

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx      # Navigation bar with scroll effects
│   ├── Hero.jsx        # Introduction/about section
│   ├── AINews.jsx      # AI news & resources grid
│   └── Footer.jsx      # Footer with social links
├── App.jsx             # Main app component
├── index.css           # Global styles & CSS variables
└── main.jsx            # React entry point
```

## Customization

### Personal Info
Edit `src/components/Hero.jsx` to update:
- Your name
- Introduction text
- Email address

### AI Resources
Edit `src/components/AINews.jsx` to customize:
- Featured blog post
- Blog links
- Podcast links
- YouTube channel links

### Social Links
Edit `src/components/Footer.jsx` to update your social media profiles.

### Theming
Edit CSS variables in `src/index.css` to customize colors:
- `--accent-primary` - Main accent color (coral)
- `--bg-primary` - Primary background
- `--text-primary` - Primary text color

## Tech Stack

- [React](https://react.dev/) - UI library
- [Vite](https://vite.dev/) - Build tool
- CSS with custom properties for theming
