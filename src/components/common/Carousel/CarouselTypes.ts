export interface RenderCarouselProps {
  prev: () => void;
  next: () => void;
  numItems: number;
  children: React.ReactNode;
  getClassName: (i: number) => string;
  circles: () => React.ReactNode;
}
