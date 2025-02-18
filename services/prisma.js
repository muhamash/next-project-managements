const { PrismaClient } = require("@prisma/client");

const globalForPrisma = globalThis;

const prisma = globalForPrisma.prisma || new PrismaClient( {
  log: [ 'query', 'info', 'warn', 'error' ],
  datasourceUrl: process.env.DATABASE_URL,
} );

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

prisma.$use( async ( params, next ) =>
{
  try
  {
    return await next( params );
  } catch ( error )
  {
    if ( error.code === 'P1001' )
    {
      console.error( 'Database connection timeout' );
      throw new Error( 'Database connection failed' );
    }
    throw error;
  }
} );

module.exports = { prisma };