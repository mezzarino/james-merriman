export function generateOGImage(publicId: string, title?: string) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  return `https://res.cloudinary.com/${cloudName}/image/upload/w_1200,h_630,c_fill,q_auto,f_auto/l_text:Arial_60_bold:${encodeURIComponent(
    title || "James Merriman Photography",
  )},co_white,g_south,y_60/${publicId}`;
}
