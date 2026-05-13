export const CldImage = ({ alt, ...props }: { alt?: string; [key: string]: unknown }) => {
  return <img alt={alt || ""} {...props} />;
};
