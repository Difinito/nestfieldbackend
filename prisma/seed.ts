import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { AchievementType, TransactionStatus, TransactionType, InvestmentStatus, UserRole, CryptoAsset, PaymentMethod } from '../src/common/enums';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Clean database
  await cleanDatabase();

  // Create users
  const users = await seedUsers();

  // Create investment plans
  const plans = await seedInvestmentPlans();

  // Create investments
  await seedInvestments(users, plans);

  // Create transactions
  await seedTransactions(users);

  // Create withdrawals
  await seedWithdrawals(users);

  // Create events
  await seedEvents();

  // Create achievements
  await seedAchievements(users);

  console.log('Seed completed successfully');
}

async function cleanDatabase() {
  console.log('Cleaning database...');
  
  // Order matters due to foreign key constraints
  await prisma.achievement.deleteMany({});
  await prisma.transaction.deleteMany({});
  await prisma.investment.deleteMany({});
  await prisma.investmentPlan.deleteMany({});
  await prisma.event.deleteMany({});
  
  // Delete withdrawals before users due to foreign key constraints
  try {
    // Try to delete withdrawals using raw SQL
    await prisma.$executeRaw`DELETE FROM "Withdrawal"`;
    console.log('Withdrawals deleted');
  } catch (error) {
    console.log('Error deleting withdrawals:', error.message);
  }
  
  // Now delete users
  await prisma.user.deleteMany({});
  
  console.log('Database cleaned');
}

async function seedUsers() {
  console.log('Seeding users...');
  
  const hashedPassword = await bcrypt.hash('password123', 10);
  
  const admin = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'User',
      phone: '+1234567890',
      role: UserRole.ADMIN,
      referralCode: 'ADMIN123',
      isActive: true,
    },
  });
  
  const user1 = await prisma.user.create({
    data: {
      email: 'user1@example.com',
      password: hashedPassword,
      firstName: 'John',
      lastName: 'Doe',
      phone: '+1987654321',
      role: UserRole.USER,
      referralCode: 'JOHNDOE1',
      isActive: true,
    },
  });
  
  const user2 = await prisma.user.create({
    data: {
      email: 'user2@example.com',
      password: hashedPassword,
      firstName: 'Jane',
      lastName: 'Smith',
      phone: '+1555555555',
      role: UserRole.USER,
      referralCode: 'JSMITH12',
      referredBy: 'JOHNDOE1',
      referralBonus: 50,
      isActive: true,
    },
  });
  
  console.log('Users seeded:', { admin: admin.id, user1: user1.id, user2: user2.id });
  return [admin, user1, user2];
}

async function seedInvestmentPlans() {
  console.log('Seeding investment plans...');
  
  const standardPlan = await prisma.investmentPlan.create({
    data: {
      name: 'Standard Plan',
      description: 'Our basic investment plan with 5% return',
      minAmount: 1000,
      maxAmount: 10000,
      returnRate: 5,
      duration: 30, // 30 days
      isActive: true,
    },
  });
  
  const premiumPlan = await prisma.investmentPlan.create({
    data: {
      name: 'Premium Plan',
      description: 'Higher returns with longer investment period',
      minAmount: 5000,
      maxAmount: 50000,
      returnRate: 8,
      duration: 90, // 90 days
      isActive: true,
    },
  });
  
  const platinumPlan = await prisma.investmentPlan.create({
    data: {
      name: 'Platinum Plan',
      description: 'Best returns for serious investors',
      minAmount: 25000,
      maxAmount: null, // unlimited
      returnRate: 12,
      duration: 180, // 180 days
      isActive: true,
    },
  });
  
  console.log('Investment plans seeded:', { standardPlan: standardPlan.id, premiumPlan: premiumPlan.id, platinumPlan: platinumPlan.id });
  return [standardPlan, premiumPlan, platinumPlan];
}

async function seedInvestments(users, plans) {
  console.log('Seeding investments...');
  
  const now = new Date();
  const futureDate1 = new Date(now);
  futureDate1.setDate(futureDate1.getDate() + 30);
  
  const futureDate2 = new Date(now);
  futureDate2.setDate(futureDate2.getDate() + 90);
  
  const nextPayoutDate = new Date(now);
  nextPayoutDate.setDate(nextPayoutDate.getDate() + 1);
  
  // User 1 investments
  const investment1 = await prisma.investment.create({
    data: {
      userId: users[1].id,
      planId: plans[0].id,
      amount: 2000,
      returnAmount: 2100, // 2000 + (2000 * 5% = 100)
      startDate: now,
      endDate: futureDate1,
      status: InvestmentStatus.ACTIVE,
      nextPayoutDate,
    },
  });
  
  const investment2 = await prisma.investment.create({
    data: {
      userId: users[1].id,
      planId: plans[1].id,
      amount: 10000,
      returnAmount: 10800, // 10000 + (10000 * 8% = 800)
      startDate: now,
      endDate: futureDate2,
      status: InvestmentStatus.ACTIVE,
      nextPayoutDate,
    },
  });
  
  // User 2 investments
  const investment3 = await prisma.investment.create({
    data: {
      userId: users[2].id,
      planId: plans[0].id,
      amount: 5000,
      returnAmount: 5250, // 5000 + (5000 * 5% = 250)
      startDate: now,
      endDate: futureDate1,
      status: InvestmentStatus.ACTIVE,
      nextPayoutDate,
    },
  });
  
  console.log('Investments seeded:', { investment1: investment1.id, investment2: investment2.id, investment3: investment3.id });
}

async function seedTransactions(users) {
  console.log('Seeding transactions...');
  
  const now = new Date();
  const pastDate = new Date(now);
  pastDate.setDate(pastDate.getDate() - 5);
  
  // User 1 transactions
  const deposit1 = await prisma.transaction.create({
    data: {
      userId: users[1].id,
      type: TransactionType.DEPOSIT,
      status: TransactionStatus.COMPLETED,
      amount: 5000,
      asset: CryptoAsset.USD,
      notes: 'Initial deposit',
      completedAt: pastDate,
    },
  });
  
  const profit1 = await prisma.transaction.create({
    data: {
      userId: users[1].id,
      type: TransactionType.PROFIT,
      status: TransactionStatus.COMPLETED,
      amount: 27.4,
      asset: CryptoAsset.USD,
      notes: 'Daily profit from Standard Plan investment',
      completedAt: now,
    },
  });
  
  // User 2 transactions
  const deposit2 = await prisma.transaction.create({
    data: {
      userId: users[2].id,
      type: TransactionType.DEPOSIT,
      status: TransactionStatus.COMPLETED,
      amount: 10000,
      asset: CryptoAsset.USD,
      notes: 'Initial deposit',
      completedAt: pastDate,
    },
  });
  
  const withdrawal1 = await prisma.transaction.create({
    data: {
      userId: users[2].id,
      type: TransactionType.WITHDRAWAL,
      status: TransactionStatus.PENDING,
      amount: 1000,
      asset: CryptoAsset.USD,
      walletAddress: '0x1234567890abcdef1234567890abcdef12345678',
      notes: 'Withdrawal request',
    },
  });
  
  const referralBonus = await prisma.transaction.create({
    data: {
      userId: users[1].id,
      type: TransactionType.REFERRAL_BONUS,
      status: TransactionStatus.COMPLETED,
      amount: 50,
      asset: CryptoAsset.USD,
      notes: 'Referral bonus from user2@example.com',
      completedAt: pastDate,
    },
  });
  
  console.log('Transactions seeded:', { 
    deposit1: deposit1.id, 
    profit1: profit1.id, 
    deposit2: deposit2.id, 
    withdrawal1: withdrawal1.id,
    referralBonus: referralBonus.id
  });
}

async function seedWithdrawals(users) {
  console.log('Seeding withdrawals...');
  
  const now = new Date();
  const pastDate = new Date(now);
  pastDate.setDate(pastDate.getDate() - 5);
  
  const processedDate = new Date(now);
  processedDate.setDate(processedDate.getDate() - 2);
  
  try {
    // User 1 withdrawals - using raw SQL
    const accountDetails1 = JSON.stringify({
      bankName: "Chase Bank",
      accountNumber: "****6789",
      accountName: "John Doe"
    });
    
    await prisma.$executeRaw`
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
        ${users[1].id}, 
        500, 
        'USD', 
        'COMPLETED', 
        'BANK_TRANSFER', 
        ${accountDetails1}::jsonb, 
        7.5, 
        492.5, 
        'tx_7b8c9d0e1f2g3h4i5j6k7l8m9n0o1p2q', 
        'Monthly profit withdrawal', 
        ${processedDate}, 
        ${pastDate}
      )
    `;
    
    const accountDetails2 = JSON.stringify({
      walletAddress: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r",
      network: "Ethereum"
    });
    
    await prisma.$executeRaw`
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
        "notes", 
        "createdAt"
      ) VALUES (
        gen_random_uuid(), 
        ${users[1].id}, 
        1000, 
        'USD', 
        'PENDING', 
        'CRYPTO', 
        ${accountDetails2}::jsonb, 
        15, 
        985, 
        'Investment return withdrawal', 
        ${now}
      )
    `;
    
    // User 2 withdrawals
    const accountDetails3 = JSON.stringify({
      bankName: "Bank of America",
      accountNumber: "****1234",
      accountName: "Jane Smith",
      routingNumber: "****5678"
    });
    
    await prisma.$executeRaw`
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
        "notes", 
        "processedAt", 
        "createdAt"
      ) VALUES (
        gen_random_uuid(), 
        ${users[2].id}, 
        2500, 
        'USD', 
        'REJECTED', 
        'WIRE_TRANSFER', 
        ${accountDetails3}::jsonb, 
        37.5, 
        2462.5, 
        'Admin note: Invalid bank account information', 
        ${processedDate}, 
        ${pastDate}
      )
    `;
    
    // Verify the withdrawals were inserted
    const withdrawals = await prisma.$queryRaw`SELECT id FROM "Withdrawal"`;
    console.log('Withdrawals seeded:', withdrawals);
  } catch (error) {
    console.error('Error seeding withdrawals:', error);
  }
}

async function seedEvents() {
  console.log('Seeding events...');
  
  const now = new Date();
  const futureDate1 = new Date(now);
  futureDate1.setDate(futureDate1.getDate() + 7);
  
  const futureDate2 = new Date(now);
  futureDate2.setDate(futureDate2.getDate() + 14);
  
  const futureDate3 = new Date(now);
  futureDate3.setDate(futureDate3.getDate() + 30);
  
  const event1 = await prisma.event.create({
    data: {
      title: 'Investment Webinar',
      description: 'Learn about our investment strategies and how to maximize your returns',
      startDate: futureDate1,
      endDate: new Date(futureDate1.getTime() + 2 * 60 * 60 * 1000), // 2 hours later
      isActive: true,
    },
  });
  
  const event2 = await prisma.event.create({
    data: {
      title: 'Platform Update',
      description: 'Exciting new features and improvements coming to our platform',
      startDate: futureDate2,
      endDate: new Date(futureDate2.getTime() + 1 * 60 * 60 * 1000), // 1 hour later
      isActive: true,
    },
  });
  
  const event3 = await prisma.event.create({
    data: {
      title: 'Annual Investor Conference',
      description: 'Join us for our annual conference with special guest speakers and networking opportunities',
      startDate: futureDate3,
      endDate: new Date(futureDate3.getTime() + 8 * 60 * 60 * 1000), // 8 hours later
      isActive: true,
    },
  });
  
  console.log('Events seeded:', { event1: event1.id, event2: event2.id, event3: event3.id });
}

async function seedAchievements(users) {
  console.log('Seeding achievements...');
  
  // User 1 achievements
  const achievement1 = await prisma.achievement.create({
    data: {
      userId: users[1].id,
      name: 'First Investment',
      description: 'Make your first investment',
      type: AchievementType.INVESTMENT_COUNT,
      targetValue: 1,
      currentValue: 2,
      isComplete: true,
      completedAt: new Date(),
    },
  });
  
  const achievement2 = await prisma.achievement.create({
    data: {
      userId: users[1].id,
      name: 'Investment Master',
      description: 'Make 5 investments',
      type: AchievementType.INVESTMENT_COUNT,
      targetValue: 5,
      currentValue: 2,
      isComplete: false,
    },
  });
  
  const achievement3 = await prisma.achievement.create({
    data: {
      userId: users[1].id,
      name: 'Big Spender',
      description: 'Invest a total of $50,000',
      type: AchievementType.INVESTMENT_AMOUNT,
      targetValue: 50000,
      currentValue: 12000,
      isComplete: false,
    },
  });
  
  // User 2 achievements
  const achievement4 = await prisma.achievement.create({
    data: {
      userId: users[2].id,
      name: 'First Investment',
      description: 'Make your first investment',
      type: AchievementType.INVESTMENT_COUNT,
      targetValue: 1,
      currentValue: 1,
      isComplete: true,
      completedAt: new Date(),
    },
  });
  
  const achievement5 = await prisma.achievement.create({
    data: {
      userId: users[2].id,
      name: 'Deposit Champion',
      description: 'Deposit a total of $25,000',
      type: AchievementType.DEPOSIT_AMOUNT,
      targetValue: 25000,
      currentValue: 10000,
      isComplete: false,
    },
  });
  
  console.log('Achievements seeded:', { 
    achievement1: achievement1.id, 
    achievement2: achievement2.id, 
    achievement3: achievement3.id,
    achievement4: achievement4.id,
    achievement5: achievement5.id
  });
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 