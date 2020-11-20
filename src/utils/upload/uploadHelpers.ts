export const isValidImage = (image: File): boolean => {
  const validTypes = [
    'image/jpeg',
    'image/png',
    'image/jpg',
    'application/octet-stream',
  ];
  return validTypes.includes(image.type);
};

export const toBase64 = (image: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
