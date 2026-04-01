import urlJoin from "url-join";
interface Category {
  label: string;
  tag: string;
  description: string;
}

const categories: Category[] = [
  {
    label: "Church",
    tag: "church",
    description:
      "Travel writing exploring churches and cathedrals—architecture, history and quiet moments of reflection from sacred spaces across the UK and beyond.",
  },
  {
    label: "Coastal",
    tag: "coastal",
    description:
      "Coastal travel writing from rugged cliffs to sandy shores—walks, seascapes and stories from the UK coastline and beyond.",
  },
  {
    label: "Food",
    tag: "food",
    description:
      "Food-focused travel stories exploring local dishes, markets and culinary traditions from destinations across the world.",
  },
  {
    label: "History",
    tag: "history",
    description:
      "Travel writing rooted in history—exploring ancient sites, historic landmarks and the stories that shape places around the world.",
  },
  {
    label: "People",
    tag: "people",
    description:
      "Explore inspiring stories of people from around the world. Discover their kindness, culture and unique perspectives through personal encounters.",
  },
  {
    label: "Pilgrimage",
    tag: "pilgrimage",
    description:
      "Reflective travel writing on pilgrimage—journeys of meaning, memory and personal connection through landscapes and sacred places.",
  },
  {
    label: "Travel",
    tag: "travel",
    description:
      "Travel writing from across the globe—stories, reflections and experiences from remote, complex and overlooked destinations.",
  },
  {
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
