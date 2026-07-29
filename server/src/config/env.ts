export const env = {
  port: Number(process.env.PORT ?? 4000),
  clientOrigin: process.env.CLIENT_ORIGIN ?? 'http://localhost:5173',
  databaseUrl:
    process.env.DATABASE_URL ??
    'postgresql://cash_user:cash_password@localhost:5432/workboard?schema=public',
  jwtSecret: process.env.JWT_SECRET ?? 'workboard-dev-secret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '1d',
  nodeEnv: process.env.NODE_ENV ?? 'development',
  bcryptRounds: Number(process.env.BCRYPT_ROUNDS ?? 10),
}