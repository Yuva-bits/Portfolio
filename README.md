# Personal Portfolio Website

A modern, responsive portfolio website built with React and Tailwind CSS, featuring dynamic content management, animated components, and a Python-based content editor. The website showcases projects, experience, education, and skills with a professional, interactive design.

## 🚀 Features

### Core Features
- **Modern React Architecture**: Built with React 18, React Router DOM, and modern hooks
- **Responsive Design**: Fully responsive with Tailwind CSS and custom animations
- **Dynamic Content Management**: JSON-based content system with Python GUI editor
- **Interactive Animations**: Custom animated components with scroll-triggered effects
- **Professional UI/UX**: Clean, modern design with gradient effects and smooth transitions
- **Cross-Platform Compatibility**: Works on Windows, Linux, and macOS

### Pages & Navigation
- **Landing Page**: Hero section with animated text, featured projects, technical expertise, and contact
- **Projects Page**: Comprehensive project showcase with descriptions and technologies
- **Project Details**: Detailed project information with GitHub and documentation links
- **Experience Page**: Professional work experience with hover effects
- **Education Page**: Academic background and achievements
- **About Page**: Personal information and background

### Content Management
- **Python GUI Editor**: Tkinter-based content management system
- **JSON Data Storage**: Static JSON files for easy content updates
- **Real-time Updates**: Content changes reflect immediately on the website
- **Rich Text Support**: HTML formatting with proper styling

## 🏗️ Project Structure

```
personal-website/
├── client/                          # React frontend application
│   ├── public/
│   │   ├── data/                    # Static JSON content files
│   │   │   ├── projects.json        # Project portfolio data
│   │   │   ├── experience.json      # Work experience data
│   │   │   ├── education.json       # Education information
│   │   │   ├── home.json           # About page content
│   │   │   └── manifest.json       # Site metadata
│   │   ├── profile.jpeg            # Profile image
│   │   ├── _redirects              # SPA routing support
│   │   └── index.html              # Main HTML template
│   ├── src/
│   │   ├── components/             # Reusable React components
│   │   │   ├── AnimatedCard.js     # Animated card component
│   │   │   ├── ContentDisplay.js   # Content rendering component
│   │   │   ├── GlowingOrb.js       # Animated background orb
│   │   │   ├── PageTemplate.js     # Page layout template
│   │   │   ├── ParticleBackground.js # Particle animation background
│   │   │   ├── SpotlightCard.js    # Spotlight effect card
│   │   │   └── TextReveal.js      # Text animation component
│   │   ├── pages/                  # Page components
│   │   │   ├── Landing.js          # Landing page with hero section
│   │   │   ├── Projects.js         # Projects showcase page
│   │   │   ├── ProjectDetails.js   # Individual project details
│   │   │   ├── Experience.js       # Work experience page
│   │   │   ├── Education.js        # Education page
│   │   │   └── Home.js             # About page
│   │   ├── utils/
│   │   │   └── api.js              # API utilities for static content
│   │   ├── App.js                 # Main application component
│   │   ├── index.js               # Application entry point
│   │   └── index.css              # Global styles and Tailwind imports
│   ├── package.json               # Client dependencies
│   ├── tailwind.config.js         # Tailwind CSS configuration
│   └── postcss.config.js          # PostCSS configuration
├── content-editor.py              # Python GUI content management system
├── package.json                   # Root package configuration
└── README.md                      # Project documentation
```

## 🛠️ Technologies Used

### Frontend
- **React 18.2.0**: Modern React with hooks and functional components
- **React Router DOM 6.18.0**: Client-side routing and navigation
- **Tailwind CSS 3.3.5**: Utility-first CSS framework
- **Framer Motion 12.12.1**: Advanced animations and transitions
- **React Icons 5.5.0**: Icon library for UI elements

### Backend & Content Management
- **Python 3.x**: Content management system
- **Tkinter**: GUI framework for content editor
- **JSON**: Data storage format for content

### Development Tools
- **React Scripts 5.0.1**: Development and build tools
- **Web Vitals 2.1.4**: Performance monitoring
- **Testing Library**: Component testing utilities

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- Python 3.x
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd personal-website
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install client dependencies
   cd client
   npm install
   ```

3. **Start the development server**
   ```bash
   # From root directory
   npm start
   
   # Or from client directory
   cd client
   npm start
   ```

4. **Launch the content editor**
   ```bash
   # From root directory
   python3 content-editor.py
   ```

## 🚀 Usage

### Development Mode

The website runs on `http://localhost:3000` with hot reload enabled.

### Content Management

1. **Launch the Python GUI editor**:
   ```bash
   python3 content-editor.py
   ```

2. **Edit content**:
   - Select a page from the left panel
   - Choose a section to edit
   - Update content in the rich text editor
   - Add descriptions and technologies for projects
   - Save changes to update the website

3. **Content Structure**:
   - **Projects**: Include title, description, technologies, GitHub link, documentation link
   - **Experience**: Job titles, companies, descriptions, dates
   - **Education**: Degrees, institutions, descriptions, dates
   - **About**: Personal information and background

### Building for Production

```bash
# Build the static site
npm run build

# Preview the built site
npm run preview
```

## 🎨 Design Features

### Landing Page Components
- **Hero Section**: Animated text reveal with profile image
- **Technical Expertise**: Interactive skill cards with hover effects
- **Featured Projects**: Project showcase with GitHub and details buttons
- **Contact Section**: Call-to-action with contact information

### Animation System
- **Text Reveal**: Staggered text animations with custom delays
- **Scroll Animations**: Intersection Observer-based scroll triggers
- **Hover Effects**: Sophisticated hover states with transforms and glows
- **Particle Background**: Animated particle system for visual appeal

### Responsive Design
- **Mobile-First**: Optimized for mobile devices
- **Tablet Support**: Responsive grid layouts
- **Desktop Enhancement**: Advanced hover effects and animations
- **Cross-Browser**: Compatible with modern browsers

## 📱 Navigation Structure

The website follows this navigation order:
1. **Projects** - Portfolio showcase
2. **Experience** - Professional background
3. **Education** - Academic achievements
4. **About** - Personal information

## 🔧 Customization

### Adding New Projects
1. Open the content editor
2. Navigate to "Projects" page
3. Add new section with:
   - Title
   - Description
   - Technologies (comma-separated)
   - GitHub link
   - Documentation link
   - Detailed content

### Styling Customization
- **Colors**: Modify CSS variables in `client/src/index.css`
- **Animations**: Adjust timing in component files
- **Layout**: Update Tailwind classes in components
- **Typography**: Change font families in CSS variables

### Content Structure
All content is stored in JSON files in `client/public/data/`:
- `projects.json`: Project portfolio
- `experience.json`: Work experience
- `education.json`: Education history
- `home.json`: About page content

## 🚀 Deployment

### Static Hosting (GitHub Pages, Netlify, Vercel)
1. Build the project: `npm run build`
2. Deploy the `client/build` folder
3. Configure redirects for SPA routing

### Local Development
- Development server: `npm start`
- Content editor: `python3 content-editor.py`
- Both run simultaneously for full functionality

## 🎯 Key Components

### AnimatedCard
Reusable card component with multiple hover effects:
- Lift effect with scale and translate
- Glow effects with shadow animations
- Tilt effects with 3D transforms
- Customizable variants and animations

### TextReveal
Text animation component with:
- Fade, slide, and typewriter effects
- Customizable delays and triggers
- Scroll-based activation
- Smooth transitions

### ContentDisplay
Content rendering component with:
- HTML content support
- Rich text formatting
- Responsive layouts
- Animation integration

## 🔍 Performance Features

- **Lazy Loading**: Components load on demand
- **Optimized Images**: Compressed and responsive images
- **Code Splitting**: Automatic code splitting with React Router
- **Static Assets**: Optimized static file serving
- **Caching**: Browser caching for static assets

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For questions or issues:
- Create an issue in the repository
- Check the documentation
- Review the code comments for implementation details

---

**Built with ❤️ using React, Tailwind CSS, and Python**