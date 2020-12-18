interface iUserLogin {
   email: string,
   password: string,
   remember: boolean;
}

interface iUserContext {
   signed: boolean,
   user: object | null,
   signIn(userLogin: iUserLogin): Promise<void>,
   signOut(): void,
   loading: boolean,
}

export type { iUserContext, iUserLogin }
