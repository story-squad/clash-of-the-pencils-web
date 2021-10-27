import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

export default function useOpen(path: string): () => void {
  const { push } = useHistory();
  const open = useCallback(() => push(path), [path]);
  return open;
}
