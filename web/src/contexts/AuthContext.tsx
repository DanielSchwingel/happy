import React, { createContext, useEffect, useState } from 'react';

import { iUserContext, iUserLogin } from '../interfaces/user';
import api from '../services/api';
import history from '../utils/history';

const AuthContext = createContext<iUserContext>({} as iUserContext);

const AuthProvider: React.FC = ({ children })=> {
   const [ user, setUser ] = useState<Object | null>(null); 
   const [ loading, setLoading ] = useState(true);
   const [ remember, setRemember ] = useState(true)

   useEffect(()=>{
      if (!remember) return; 
      const userStorage = localStorage.getItem('@HAPPYAuth:user');
      const tokenStorage = localStorage.getItem('@HAPPYAuth:token');

      if(userStorage && tokenStorage) {
         api.defaults.headers.authorization = `Bearer ${JSON.parse(tokenStorage)}`;
         setUser(JSON.parse(userStorage))
      }
      setLoading(false);
   },[remember])

   async function signIn(userLogin: iUserLogin){
      const { email, password, remember } = userLogin;
      setRemember(remember);
      const response = await api.post('/authenticate', { email, password })

      if (response.status !== 401) {
         const { user, token } = response.data;

         if (remember) {
            localStorage.setItem('@HAPPYAuth:user', JSON.stringify(user))
            localStorage.setItem('@HAPPYAuth:token', JSON.stringify(token))
         }
         api.defaults.headers.authorization = `Bearer ${token}`;
         setUser(user);
         history.push('/orphanages')
      }
   }

   function signOut(){
      localStorage.clear();
      api.defaults.headers.authorization = undefined;
      setUser(null); 
      history.push('/login')
   }

   return(
      <AuthContext.Provider value={{signed: Boolean(user), user, signIn, signOut, loading }}>
         {children}
      </AuthContext.Provider>
   )
};

export { AuthContext, AuthProvider }