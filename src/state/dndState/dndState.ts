import { atomFamily, DefaultValue, selector, selectorFamily } from 'recoil';
import { DRAGON, DRAGON_BANK_ZONE } from '../votingState';
import { splitKey } from './helpers';
import {
  DEFAULT_EMPTY_DROP_ZONE,
  DropZoneContainer,
  DropZoneKey,
} from './types';

export const dropZone = atomFamily<DropZoneContainer, DropZoneKey>({
  key: 'dropZoneAtomFamily',
  default: selectorFamily({
    key: 'defaultDropZoneValueSelector',
    get: (key) => () => {
      const [keyType, keyIndex] = splitKey(key);
      // Make sure to handle any drop zone default overrides here!
      switch (keyType) {
        case DRAGON_BANK_ZONE:
          // Dragon banks should intially have dragons!
          return {
            contents: `${DRAGON}-${keyIndex}`,
            isEmpty: false,
          };
        default:
          // Everything else should start empty!
          return DEFAULT_EMPTY_DROP_ZONE;
      }
    },
  }),
});

export const updateDropZone = selector<
  { key: DropZoneKey; contents: DropZoneContainer } | undefined
>({
  key: 'updateDropZoneSelector',
  get: () => undefined,
  set: ({ set }, newValue) => {
    // Break early
    if (newValue === undefined || newValue instanceof DefaultValue) return;
    set(dropZone(newValue.key), newValue.contents);
  },
});
