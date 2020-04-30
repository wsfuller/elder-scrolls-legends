import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { getUserCredentials } from '../utils/auth';

export const UserContext = createContext();

const INTIAL_USER = {
  username: '',
  id: '',
  isAuthed: false,
};

export function UserProvider({ children }) {
  const [user, setUser] = useState(INTIAL_USER);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    async function checkUserToken() {
      try {
        const userCredentials = await getUserCredentials();

        if (userCredentials) {
          setUser({ ...userCredentials.user, isAuthed: true });
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('There was an error checking users token');
      } finally {
        setCheckingAuth(false);
      }
    }

    checkUserToken();
  }, []);

  if (checkingAuth) {
    return null;
  }

  return <UserContext.Provider value={[user, setUser]}>{children}</UserContext.Provider>;
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
