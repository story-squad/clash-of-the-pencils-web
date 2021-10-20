import heic2any from 'heic2any';
import { DateTime } from 'luxon';

const HEIC = /heic/i;
export function isHeic(file: File): boolean {
  return HEIC.test(file.name) || HEIC.test(file.type);
}

export async function heicToPng(file: File): Promise<File> {
  const convertedBlob = await heic2any({ blob: file, toType: 'image/png' });
  return blobToFile(convertedBlob, file.name);
}

export function blobToFile(blob: Blob | Blob[], filename: string): File {
  const blobArr = Array.isArray(blob) ? blob : [blob];
  return new File(blobArr, filename, {
    lastModified: DateTime.now().toMillis(),
    type: blobArr[0]?.type,
  });
}
