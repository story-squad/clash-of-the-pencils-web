import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useOpenDashboard(): () => void {
  const navigate = useNavigate();

  return useCallback(() => {
    navigate('/');
    window.scrollTo(0, 0);
  }, [navigate]);
}
