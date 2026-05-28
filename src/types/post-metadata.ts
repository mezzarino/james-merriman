export type Review = {
  reviewText: string;
  reviewName: string;
  reviewJobTitle?: string;
};

export type PostMetadata = {
  reviews?: Review[];
  place?: string;
};
