import { HTMLProps } from 'react';
import { atom, DefaultValue, selector } from 'recoil';
import { PictureProps } from '../../components/atoms/Picture/Picture';

export type ImageViewContent = PictureProps;

export const isOpen = atom<boolean>({
  key: 'imageViewIsOpen',
  default: false,
});

export const content = atom<ImageViewContent | undefined>({
  key: 'imageViewContent',
  default: undefined,
});

export const openImage = selector<ImageViewContent | undefined>({
  key: 'openImageInImageViewSelector',
  get: () => undefined,
  set: ({ set }, image) => {
    if (image instanceof DefaultValue || !image) {
      return undefined;
    } else {
      set(content, image);
      set(isOpen, true);
    }
  },
});

// This is hacked together so that we can use it as an onclick in divs
export const close = selector<
  Parameters<Required<HTMLProps<HTMLDivElement>>['onClick']>[0] | undefined
>({
  key: 'closeImageViewSelector',
  get: () => undefined,
  set: ({ set }) => {
    set(isOpen, false);
    set(content, undefined);
  },
});
