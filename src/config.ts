import urlJoin from "url-join";
interface Category {
  label: string;
  tag: string;
  description: string;
  isVisible: boolean;
}

const categories: Category[] = [
  {
    isVisible: true,
    label: "Africa",
    tag: "africa",
    description:
      "Travel writing and documentary photography from Africa. Explore diverse landscapes, wildlife, vibrant cultures and untold stories from across the continent.",
  },
  {
    isVisible: true,
    label: "Asia",
    tag: "asia",
    description:
      "Travel writing and stories from Asia. Discover ancient traditions, bustling cities, distinct culinary heritages and remote landscapes across the region.",
  },
  {
    isVisible: true,
    label: "Europe",
    tag: "europe",
    description:
      "European travel writing exploring historic cities, hidden villages, diverse coastlines and cultural heritage across the continent.",
  },
  {
    isVisible: true,
    label: "Middle East",
    tag: "middle-east",
    description:
      "Travel writing from the Middle East focusing on rich history, ancient architecture, desert landscapes and the deep hospitality of local communities.",
  },
  {
    isVisible: true,
    label: "South America",
    tag: "south-america",
    description:
      "Travel writing from South America exploring dramatic landscapes, vibrant cultures and remote regions across the continent.",
  },
  {
    isVisible: true,
    label: "UK",
    tag: "uk",
    description:
      "Travel writing from across the United Kingdom. Discover coastal walks, historic landmarks, rolling countryside and local stories from Britain.",
  },
  {
    isVisible: false,
    label: "Church",
    tag: "church",
    description:
      "Travel writing exploring churches and cathedrals—architecture, history and quiet moments of reflection from sacred spaces across the UK and beyond.",
  },
  {
    isVisible: false,
    label: "Coastal",
    tag: "coastal",
    description:
      "Coastal travel writing from rugged cliffs to sandy shores—walks, seascapes and stories from the UK coastline and beyond.",
  },
  {
    isVisible: true,
    label: "Food",
    tag: "food",
    description:
      "Food-focused travel stories exploring local dishes, markets and culinary traditions from destinations across the world.",
  },
  {
    isVisible: false,
    label: "History",
    tag: "history",
    description:
      "Travel writing rooted in history—exploring ancient sites, historic landmarks and the stories that shape places around the world.",
  },
  {
    isVisible: true,
    label: "People",
    tag: "people",
    description:
      "Explore inspiring stories of people from around the world. Discover their kindness, culture and unique perspectives through personal encounters.",
  },
  {
    isVisible: false,
    label: "Pilgrimage",
    tag: "pilgrimage",
    description:
      "Reflective travel writing on pilgrimage—journeys of meaning, memory and personal connection through landscapes and sacred places.",
  },
  {
    isVisible: false,
    label: "Travel",
    tag: "travel",
    description:
      "Travel writing from across the globe—stories, reflections and experiences from remote, complex and overlooked destinations.",
  },
  {
    isVisible: true,
    label: "Walking",
    tag: "walking",
    description:
      "Walking and hiking travel stories—trails, landscapes and slow journeys through countryside, coast and wilderness.",
  },
];

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const config = {
  blogId: process.env.NEXT_PUBLIC_BLOG_ID || "clvlugru90000o4g8ahxp069s",
  baseUrl,
  logoUrl: urlJoin(baseUrl, "logo.png"),
  organization: process.env.NEXT_PUBLIC_BLOG_ORGANIZATION || "Example Org",
  title: process.env.NEXT_PUBLIC_BLOG_TITLE || "Launched",
  description: process.env.NEXT_PUBLIC_BLOG_DESCRIPTION || "Let's build something amazing!",
  categories,
};
