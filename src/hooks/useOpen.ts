import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useOpen(path: string): () => void {
  const navigate = useNavigate();
  const open = useCallback(() => navigate(path), [path]);
  return open;
}
