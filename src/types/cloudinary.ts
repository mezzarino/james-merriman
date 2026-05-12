export type CloudinaryResource = {
  public_id: string;
  width: number;
  height: number;
  created_at?: string;

  context?: {
    custom?: {
      alt?: string;
      category?: string;
    };
  };
};
