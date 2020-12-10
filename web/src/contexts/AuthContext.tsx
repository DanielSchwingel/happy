import React, { createContext, useEffect, useState } from 'react';

import { iUserContext, iUserLogin } from '../interfaces/user';
import api from '../services/api';
import history from '../utils/history';

const AuthContext = createContext<iUserContext>({} as iUserContext);

const AuthProvider: React.FC = ({ children })=> {
   const [ user, setUser ] = useState<Object | null>(null); 
   const [ loading, setLoading] = useState(true);

   useEffect(()=>{
      const userStorage = localStorage.getItem('@HAPPYAuth:user');
      const tokenStorage = localStorage.getItem('@HAPPYAuth:token');

      if(userStorage && tokenStorage) {
         api.defaults.headers.authorization = `Bearer ${JSON.parse(tokenStorage)}`;
         setUser(JSON.parse(userStorage))
      }
      setLoading(false);
   },[])

   async function signIn(userLogin: iUserLogin){
      const { email, password } = userLogin;
      const response = await api.post('/authenticate', { email, password })

      if (response.status !== 401) {
         const { user, token } = response.data;

         localStorage.setItem('@HAPPYAuth:user', JSON.stringify(user))
         localStorage.setItem('@HAPPYAuth:token', JSON.stringify(token))
         api.defaults.headers.Authorization = `Bearer ${token}`;
         setUser(user);
         console.log(`user ${Boolean(user)}`)
         history.push('/orphanages')
      }

   }

   function signOut(){
      localStorage.clear();
      api.defaults.headers.authorization = undefined;
      setUser(null); 
      history.push('/login')
   }

   if (loading) {
      return <h1>Carregando...</h1>
   }

   return(
      <AuthContext.Provider value={{signed: Boolean(user), user, signIn, signOut }}>
         {children}
      </AuthContext.Provider>
   )
};

export { AuthContext, AuthProvider }