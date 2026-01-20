// Blog sources configuration
export const BLOG_SOURCES = {
  digitalocean: {
    name: 'DigitalOcean',
    url: 'https://www.digitalocean.com/blog',
    logo: '🌊',
    color: '#0080FF',
    categories: ['AI/ML', 'Engineering'],
  },
  // More sources will be added here
}

// Fallback/curated posts from DigitalOcean Blog (AI/ML and Engineering categories)
// Based on recent content from https://www.digitalocean.com/blog
const CURATED_POSTS = [
  {
    title: "Technical Deep Dive: How DigitalOcean and AMD Delivered a 2x Production Inference Performance Increase for Character.ai",
    link: "https://www.digitalocean.com/blog/character-ai-amd-inference-performance",
    pubDate: new Date("2026-01-13"),
    description: "A technical deep dive into how DigitalOcean partnered with AMD to deliver significant performance improvements for AI inference workloads at scale.",
    categories: ["Engineering", "AI/ML"],
    author: "Piyush Srivastava",
    sourceId: "digitalocean",
    sourceName: "DigitalOcean",
    sourceLogo: "🌊",
    sourceColor: "#0080FF",
    sourceUrl: "https://www.digitalocean.com/blog",
  },
  {
    title: "Building the Inference Cloud, and What Comes Next",
    link: "https://www.digitalocean.com/blog/building-inference-cloud",
    pubDate: new Date("2026-01-07"),
    description: "Exploring the future of AI infrastructure and how DigitalOcean is building the next generation of inference cloud services for developers.",
    categories: ["AI/ML"],
    author: "Paddy Srinivasan",
    sourceId: "digitalocean",
    sourceName: "DigitalOcean",
    sourceLogo: "🌊",
    sourceColor: "#0080FF",
    sourceUrl: "https://www.digitalocean.com/blog",
  },
  {
    title: "Introducing Multiple Registry Support on DigitalOcean Container Registry",
    link: "https://www.digitalocean.com/blog/multiple-registry-support",
    pubDate: new Date("2026-01-09"),
    description: "DigitalOcean Container Registry now supports multiple registries, making it easier to manage and organize your container images.",
    categories: ["Engineering"],
    author: "Kang Xie",
    sourceId: "digitalocean",
    sourceName: "DigitalOcean",
    sourceLogo: "🌊",
    sourceColor: "#0080FF",
    sourceUrl: "https://www.digitalocean.com/blog",
  },
  {
    title: "Powering the Next Leap in AI: GPU Droplets accelerated by NVIDIA HGX™ B300 are coming soon",
    link: "https://www.digitalocean.com/blog/nvidia-hgx-b300-gpu-droplets",
    pubDate: new Date("2025-12-15"),
    description: "Announcing upcoming support for NVIDIA HGX B300 accelerated GPU Droplets, bringing cutting-edge AI capabilities to DigitalOcean's platform.",
    categories: ["AI/ML", "Engineering"],
    author: "Waverly Swinton",
    sourceId: "digitalocean",
    sourceName: "DigitalOcean",
    sourceLogo: "🌊",
    sourceColor: "#0080FF",
    sourceUrl: "https://www.digitalocean.com/blog",
  },
  {
    title: "Evaluate your AI agents faster and more effectively",
    link: "https://www.digitalocean.com/blog/evaluate-ai-agents",
    pubDate: new Date("2025-12-04"),
    description: "Best practices and tools for evaluating AI agent performance, ensuring reliability and accuracy in production environments.",
    categories: ["AI/ML"],
    author: "Grace Morgan",
    sourceId: "digitalocean",
    sourceName: "DigitalOcean",
    sourceLogo: "🌊",
    sourceColor: "#0080FF",
    sourceUrl: "https://www.digitalocean.com/blog",
  },
  {
    title: "OAuth App Based Workload Identity for Droplets",
    link: "https://www.digitalocean.com/blog/oauth-workload-identity-droplets",
    pubDate: new Date("2025-10-22"),
    description: "A new approach to workload identity management using OAuth apps, enabling more secure and flexible authentication for your Droplets.",
    categories: ["Engineering"],
    author: "John Andersen",
    sourceId: "digitalocean",
    sourceName: "DigitalOcean",
    sourceLogo: "🌊",
    sourceColor: "#0080FF",
    sourceUrl: "https://www.digitalocean.com/blog",
  },
  {
    title: "Contextual Vulnerability Management With Security Risk As Debt",
    link: "https://www.digitalocean.com/blog/contextual-vulnerability-management",
    pubDate: new Date("2024-08-12"),
    description: "A framework for thinking about security vulnerabilities as technical debt, enabling better prioritization and risk management.",
    categories: ["Engineering"],
    author: "Ari Kalfus",
    sourceId: "digitalocean",
    sourceName: "DigitalOcean",
    sourceLogo: "🌊",
    sourceColor: "#0080FF",
    sourceUrl: "https://www.digitalocean.com/blog",
  },
  {
    title: "How to Migrate Production Code to a Monorepo",
    link: "https://www.digitalocean.com/blog/migrate-to-monorepo",
    pubDate: new Date("2024-08-13"),
    description: "A comprehensive guide to migrating your production codebase to a monorepo architecture, including best practices and common pitfalls.",
    categories: ["Engineering"],
    author: "Brian Holt",
    sourceId: "digitalocean",
    sourceName: "DigitalOcean",
    sourceLogo: "🌊",
    sourceColor: "#0080FF",
    sourceUrl: "https://www.digitalocean.com/blog",
  },
]

// RSS to JSON proxy services
const RSS_PROXIES = [
  'https://api.rss2json.com/v1/api.json?rss_url=',
  'https://api.allorigins.win/raw?url=',
]

/**
 * Fetch blog posts from an RSS feed with fallback
 * @param {string} feedUrl - The RSS feed URL
 * @param {string[]} categories - Categories to filter by (optional)
 * @returns {Promise<Array>} - Array of blog posts
 */
export async function fetchRSSFeed(feedUrl, categories = []) {
  for (const proxy of RSS_PROXIES) {
    try {
      const response = await fetch(`${proxy}${encodeURIComponent(feedUrl)}`)
      
      if (!response.ok) continue
      
      const contentType = response.headers.get('content-type')
      
      // Handle JSON response (from rss2json)
      if (contentType?.includes('application/json')) {
        const data = await response.json()
        if (data.status === 'ok' && data.items) {
          return processRSSItems(data.items, categories)
        }
      }
      
      // Handle XML response (from allorigins or direct)
      const text = await response.text()
      if (text.includes('<rss') || text.includes('<feed')) {
        const items = parseRSSXML(text)
        return processRSSItems(items, categories)
      }
    } catch (error) {
      console.debug(`Proxy ${proxy} failed:`, error.message)
      continue
    }
  }
  
  console.warn('All RSS proxies failed, returning empty array')
  return []
}

/**
 * Parse RSS XML into items array
 */
function parseRSSXML(xml) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(xml, 'text/xml')
  const items = doc.querySelectorAll('item, entry')
  
  return Array.from(items).map(item => ({
    title: item.querySelector('title')?.textContent || '',
    link: item.querySelector('link')?.textContent || item.querySelector('link')?.getAttribute('href') || '',
    pubDate: item.querySelector('pubDate, published')?.textContent || '',
    description: item.querySelector('description, summary, content')?.textContent || '',
    categories: Array.from(item.querySelectorAll('category')).map(c => c.textContent),
    author: item.querySelector('author, dc\\:creator')?.textContent || '',
  }))
}

/**
 * Process RSS items into standardized format
 */
function processRSSItems(items, categories) {
  let processed = items.map(item => ({
    title: item.title,
    link: item.link,
    pubDate: new Date(item.pubDate),
    description: stripHtml(item.description || ''),
    categories: item.categories || [],
    author: item.author || 'Unknown',
  }))
  
  // Filter by categories if specified
  if (categories.length > 0) {
    processed = processed.filter(item => {
      const itemCategories = item.categories || []
      return categories.some(cat => 
        itemCategories.some(itemCat => 
          itemCat.toLowerCase().includes(cat.toLowerCase())
        )
      )
    })
  }
  
  return processed
}

/**
 * Fetch posts from all configured blog sources
 * Returns curated posts as fallback if RSS fails
 * @returns {Promise<Array>} - Combined array of blog posts from all sources
 */
export async function fetchAllBlogs() {
  // For now, return curated posts directly
  // In production, you could try RSS first and fall back to curated
  // const rssPosts = await fetchRSSFeed(...)
  
  // Return curated posts sorted by date
  const posts = [...CURATED_POSTS]
  posts.sort((a, b) => b.pubDate - a.pubDate)
  
  return posts
}

/**
 * Strip HTML tags from a string
 */
function stripHtml(html) {
  if (!html) return ''
  const tmp = document.createElement('div')
  tmp.innerHTML = html
  return tmp.textContent || tmp.innerText || ''
}

/**
 * Format a date for display
 */
export function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

/**
 * Calculate read time from text
 */
export function calculateReadTime(text) {
  const wordsPerMinute = 200
  const words = text.split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return `${minutes} min read`
}
