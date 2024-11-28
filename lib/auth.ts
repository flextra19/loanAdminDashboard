import NextAuth from 'next-auth';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    {
      id: 'wallet',
      name: 'Wallet',
      type: 'credentials',
      credentials: {},
      authorize: async (credentials) => {
        // Add wallet-based authentication logic
        // E.g., verify signature, nonce, etc.
        const user = { id: 'wallet-user', name: 'Wallet User', email: '' };
        return user || null;
      },
    },
  ],
});
