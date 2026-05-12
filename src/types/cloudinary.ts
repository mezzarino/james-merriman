export type CloudinaryResource = {
  public_id: string;
  width: number;
  height: number;
  created_at?: string;
  format: string;
  version: number;

  context?: {
    custom?: {
      alt?: string;
      category?: string;
    };
  };
};
