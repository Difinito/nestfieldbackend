"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../generated/prisma");
const prisma = new prisma_1.PrismaClient();
async function main() {
    console.log('Inserting a test withdrawal...');
    try {
        const user = await prisma.user.findFirst();
        if (!user) {
            console.error('No users found in the database');
            return;
        }
        console.log(`Using user: ${user.id}`);
        const now = new Date();
        const processedDate = new Date(now);
        processedDate.setDate(processedDate.getDate() - 1);
        const accountDetails = JSON.stringify({
            bankName: "Test Bank",
            accountNumber: "****1234",
            accountName: "Test User"
        });
        const result = await prisma.$executeRaw `
      INSERT INTO "Withdrawal" (
        "id", 
        "userId", 
        "amount", 
        "currency", 
        "status", 
        "paymentMethod", 
        "accountDetails", 
        "fee", 
        "netAmount", 
        "transactionHash", 
        "notes", 
        "processedAt", 
        "createdAt"
      ) VALUES (
        gen_random_uuid(), 
        ${user.id}, 
        500, 
        'USD', 
        'COMPLETED', 
        'BANK_TRANSFER', 
        ${accountDetails}::jsonb, 
        7.5, 
        492.5, 
        'tx_test123', 
        'Test withdrawal', 
        ${processedDate}, 
        ${now}
      )
    `;
        console.log('Withdrawal inserted, rows affected:', result);
        const withdrawals = await prisma.$queryRaw `SELECT * FROM "Withdrawal"`;
        console.log('Withdrawals after insert:', JSON.stringify(withdrawals, null, 2));
    }
    catch (error) {
        console.error('Error inserting withdrawal:', error);
    }
    finally {
        await prisma.$disconnect();
    }
}
main();
//# sourceMappingURL=insert-withdrawal.js.map