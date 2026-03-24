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
    description: "Articles with a category of church",
  },
  {
    label: "Coastal",
    tag: "coastal",
    description: "Articles with a category of coastal",
  },
  {
    label: "Food",
    tag: "food",
    description: "Articles with a category of food",
  },
  {
    label: "History",
    tag: "history",
    description: "Articles with a category of history",
  },
  {
    label: "Pilgrimage",
    tag: "pilgrimage",
    description: "Articles with a category of pilgrimage",
  },
  {
    label: "Travel",
    tag: "travel",
    description: "Articles with a category of travel",
  },
  {
    label: "Walking",
    tag: "walking",
    description: "Articles with a category of walking",
  }
];

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const config = {
  blogId: process.env.NEXT_PUBLIC_BLOG_ID || "clvlugru90000o4g8ahxp069s",
  baseUrl,
  logoUrl: urlJoin(baseUrl, "logo.png"),
  organization: process.env.NEXT_PUBLIC_BLOG_ORGANIZATION || "Example Org",
  title: process.env.NEXT_PUBLIC_BLOG_TITLE || "Launched",
  description:
    process.env.NEXT_PUBLIC_BLOG_DESCRIPTION ||
    "Let's build something amazing!",
  categories,
};
