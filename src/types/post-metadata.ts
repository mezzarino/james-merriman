export type Review = {
  reviewText: string;
  reviewName: string;
  reviewJobTitle?: string;
};

export type LocationMetadata = {
  name: string;
  sameAs?: string;
  desc?: string;
  touristType?: string;
};

export type PostMetadata = {
  review?: Review[];
  place?: string;
  location?: LocationMetadata[]; // ✅ ADD THIS
};
