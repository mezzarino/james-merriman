export type Review = {
  reviewText: string;
  reviewName: string;
  reviewJobTitle?: string;
};

export type PostMetadata = {
  review?: Review[];
  place?: string;
};
