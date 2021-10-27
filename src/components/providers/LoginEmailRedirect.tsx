import React, { useEffect, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { parse } from '../../utils';

export default function LoginEmailRedirect(): React.ReactElement {
  const { search } = useLocation();
  const { codename } = useMemo(() => parse<'codename'>(search), [search]);
  const { push } = useHistory();
  const openLogin = () => push('/login', { codename });
  useEffect(openLogin);
  return <></>;
}
