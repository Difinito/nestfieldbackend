import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

async function main() {
  console.log('Checking for withdrawals...');
  
  try {
    // List all tables
    console.log('Listing all tables:');
    const tables = await prisma.$queryRaw`SELECT table_name FROM information_schema.tables WHERE table_schema='public'`;
    console.log('Available tables:', tables);
    
    // Try with lowercase "withdrawal"
    console.log('Trying lowercase "withdrawal" table:');
    try {
      const result = await prisma.$queryRaw`SELECT * FROM "withdrawal"`;
      console.log(`Found ${Array.isArray(result) ? result.length : 0} withdrawals (lowercase table):`);
      console.log(JSON.stringify(result, null, 2));
    } catch (innerError) {
      console.error('Error with lowercase table name:', innerError);
    }
    
    // Try with capitalized "Withdrawal"
    console.log('Trying capitalized "Withdrawal" table:');
    try {
      const result = await prisma.$queryRaw`SELECT * FROM "Withdrawal"`;
      console.log(`Found ${Array.isArray(result) ? result.length : 0} withdrawals (capitalized table):`);
      console.log(JSON.stringify(result, null, 2));
    } catch (innerError) {
      console.error('Error with capitalized table name:', innerError);
    }
  } catch (error) {
    console.error('Error fetching database information:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 