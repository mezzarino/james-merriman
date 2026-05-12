export type Photo = {
  public_id: string;
  width: number;
  height: number;
  alt: string;
  category: string;
  tags?: string[];
  created_at?: string;
  format?: string;
  version: number;
};
