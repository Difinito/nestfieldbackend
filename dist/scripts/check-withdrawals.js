"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../generated/prisma");
const prisma = new prisma_1.PrismaClient();
async function main() {
    console.log('Checking for withdrawals...');
    try {
        console.log('Listing all tables:');
        const tables = await prisma.$queryRaw `SELECT table_name FROM information_schema.tables WHERE table_schema='public'`;
        console.log('Available tables:', tables);
        console.log('Trying lowercase "withdrawal" table:');
        try {
            const result = await prisma.$queryRaw `SELECT * FROM "withdrawal"`;
            console.log(`Found ${Array.isArray(result) ? result.length : 0} withdrawals (lowercase table):`);
            console.log(JSON.stringify(result, null, 2));
        }
        catch (innerError) {
            console.error('Error with lowercase table name:', innerError);
        }
        console.log('Trying capitalized "Withdrawal" table:');
        try {
            const result = await prisma.$queryRaw `SELECT * FROM "Withdrawal"`;
            console.log(`Found ${Array.isArray(result) ? result.length : 0} withdrawals (capitalized table):`);
            console.log(JSON.stringify(result, null, 2));
        }
        catch (innerError) {
            console.error('Error with capitalized table name:', innerError);
        }
    }
    catch (error) {
        console.error('Error fetching database information:', error);
    }
    finally {
        await prisma.$disconnect();
    }
}
main();
//# sourceMappingURL=check-withdrawals.js.map