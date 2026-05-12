export type CloudinaryResource = {
  public_id: string;
  width: number;
  height: number;
  created_at?: string;
  format: string;
  version: number;
  tags?: string[];
  context?: {
    alt?: string;
    category?: string;
  };
};
