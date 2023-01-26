import React, { useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { parse } from '../../utils';

export default function LoginEmailRedirect(): React.ReactElement {
  const { search } = useLocation();
  const { codename } = useMemo(() => parse<'codename'>(search), [search]);
  const navigate = useNavigate();
  const openLogin = () => navigate('/login', { state: { codename } });
  useEffect(openLogin);
  return <></>;
}
