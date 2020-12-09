interface iUserLogin {
   email: string,
   password: string,
}

interface iUserContext {
   signed: boolean,
   user: object | null,
   signIn(userLogin: iUserLogin): Promise<void>,
   signOut(): void,
}

export type { iUserContext, iUserLogin }
