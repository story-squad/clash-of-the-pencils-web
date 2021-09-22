import { ComponentType } from 'react';
import { atom } from 'recoil';
import { ModalComponentProps } from '../../components/organisms';

export const isOpen = atom<boolean>({
  key: 'appModalIsOpenAtom',
  default: false,
});

export const content = atom<ComponentType<ModalComponentProps> | null>({
  key: 'appModalContentAtom',
  default: null,
});
