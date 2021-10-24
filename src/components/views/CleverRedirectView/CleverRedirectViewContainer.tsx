import { useAsync } from '@story-squad/react-utils';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { Clever } from '../../../api';
import { auth } from '../../../state';
import { parse } from '../../../utils';
import CleverRedirectView from './CleverRedirectView';

export default function CleverRedirectViewContainer(): React.ReactElement {
  // Reading URL Parameters
  const { search } = useLocation();
  const [{ code }] = useMemo(() => [parse<'code'>(search)], [search]);
  // Get push command to redirect
  const { push } = useHistory();
  // Get login function
  const login = useSetRecoilState(auth.login);

  const authorizationHandler = useCallback(async (cleverCode: string) => {
    // Authorize through the Clever API with the given code
    const res = await Clever.authorizeWithClever(cleverCode);

    if (Clever.isSuccess(res)) {
      /**
       * On a success action, the user successfully logged in with Clever and
       * they already have a linked Story Squad account. We can simply log them
       * in to the application and push them to the dashboard.
       */
      login({ token: res.body.token, user: res.body.user }); // Log them in
      console.log('[CLVR SUCCESS]');
      push('/'); // Go to dashboard
    } else if (Clever.isMerge(res)) {
      console.log('[CLVR ]');
      /**
       * On a merge action, we find that the user's Clever account email
       * matches the email of an existing Story Squad user. We redirect the
       * user to a login page prepopulated with their codename and, on a
       * successful login, we link the two accounts.
       */
      const state = Clever.getMergeState(res);
      console.log('[CLVR MERGE]', state);
      push(`/login`, state); // Route them to login with filled codename
    } else if (Clever.isNew(res)) {
      /**
       * On a new action, the user does not have a Story Squad account yet.
       * We route them to the signup form, prepopulated with their name and
       * email address, and merge the two accounts on successful signup.
       */
      const state = Clever.getNewState(res);
      console.log('[CLVR NEW]', state);
      push(`/signup`, state); // Route them to signup with given info
    }
  }, []);

  const [authorizeWithCode] = useAsync({
    asyncFunction: authorizationHandler,
    onError: (err) => {
      console.log('[CLVR ERR]', { err });
    },
  });

  useEffect(() => {
    if (code) authorizeWithCode(code);
  }, [code]);

  return <CleverRedirectView />;
}
