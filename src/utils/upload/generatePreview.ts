export async function generatePreview(file: File): Promise<string> {
  // Convert the file to a string
  const base64 = await fileToStr(file);
  // Convert that source string to an image element
  const htmlImg = await toImgElement(base64);
  // Render that image to a canvas
  const { canvas } = renderScaledCanvasContext(htmlImg) ?? {};
  // Return a url pointing to the data source of the canvas
  return canvas?.toDataURL('image/jpeg') ?? '';
}

function fileToStr(image: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = (e) => {
      const res = arrBuffToString(e.target?.result ?? reader.result);
      resolve(res);
    };
    reader.onerror = reject;
  });
}

function toImgElement(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const imgElement = document.createElement('img');
    imgElement.src = src;
    imgElement.onload = (e) => {
      if (e.target) resolve(e.target as HTMLImageElement);
      else reject(new Error('Could not load image'));
    };
    imgElement.onerror = reject;
  });
}

function arrBuffToString(
  item: string | null | undefined | ArrayBuffer,
): string {
  if (typeof item === 'string') return item;
  else if (!item) return '';
  else return Buffer.from(item).toString();
}

function renderScaledCanvasContext(image: HTMLImageElement) {
  const maxWidth = +(process.env.REACT_APP_MAX_IMAGE_PREVIEW_WIDTH ?? 420);
  const canvas = document.createElement('canvas');
  const scaler = maxWidth / image.width;
  canvas.width = maxWidth;
  canvas.height = image.height * scaler;
  const context = canvas.getContext('2d');
  context?.drawImage(image, 0, 0, canvas.width, canvas.height);
  return context;
}
