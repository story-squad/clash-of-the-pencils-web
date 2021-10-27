import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

export default function useOpenDashboard(): () => void {
  const { push } = useHistory();

  return useCallback(() => {
    push('/');
    window.scrollTo(0, 0);
  }, [push]);
}
