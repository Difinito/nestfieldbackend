import { PrismaClient } from '../generated/prisma';
import { TransactionStatus, PaymentMethod, CryptoAsset } from '../src/common/enums';

const prisma = new PrismaClient();

async function main() {
  console.log('Inserting a test withdrawal...');
  
  try {
    // First get a user
    const user = await prisma.user.findFirst();
    
    if (!user) {
      console.error('No users found in the database');
      return;
    }
    
    console.log(`Using user: ${user.id}`);
    
    // Insert a withdrawal using raw SQL
    const now = new Date();
    const processedDate = new Date(now);
    processedDate.setDate(processedDate.getDate() - 1);
    
    const accountDetails = JSON.stringify({
      bankName: "Test Bank",
      accountNumber: "****1234",
      accountName: "Test User"
    });
    
    // Try inserting with raw SQL, using string values for enums
    const result = await prisma.$executeRaw`
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
    
    // Verify the withdrawal was inserted
    const withdrawals = await prisma.$queryRaw`SELECT * FROM "Withdrawal"`;
    console.log('Withdrawals after insert:', JSON.stringify(withdrawals, null, 2));
    
  } catch (error) {
    console.error('Error inserting withdrawal:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 