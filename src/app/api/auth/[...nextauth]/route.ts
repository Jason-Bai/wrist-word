import NextAuth, { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: '邮箱',
          type: 'email',
          placeholder: 'user@example.com',
        },
        password: { label: '密码', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('请输入邮箱和密码');
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.hashedPassword) {
          throw new Error('用户不存在或密码未设置');
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isPasswordValid) {
          throw new Error('邮箱或密码错误');
        }

        // Return user object without the password hash
        // Linter fix: Avoid unused variable by not destructuring hashedPassword
        return {
          id: user.id,
          email: user.email,
          // Include other user properties needed for the session, but NOT the password
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/login',
    // error: '/auth/error', // Optional: Custom error page
  },
  // Enable debug messages in the console if you are having problems
  // debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
