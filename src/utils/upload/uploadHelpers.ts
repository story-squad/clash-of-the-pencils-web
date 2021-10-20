import { DateTime } from 'luxon';

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

export function isHeic(file: File): boolean {
  return /heic/.test(file.type);
}

export async function fileToBlob(file: File): Promise<Blob> {
  const blobURL = URL.createObjectURL(file);
  const blobRes = await fetch(blobURL);
  const blob = await blobRes.blob();
  return blob;
}

export function blobToFile(blob: Blob | Blob[], filename: string): File {
  const blobArr = Array.isArray(blob) ? blob : [blob];
  return new File(blobArr, filename, {
    lastModified: DateTime.now().toMillis(),
    type: blobArr[0]?.type,
  });
}
