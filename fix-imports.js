const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

const files = [
  'src/transactions/dto/create-transaction.dto.ts',
  'src/transactions/transactions.module.ts',
  'src/investments/investment-plans.controller.ts',
  'src/events/events.controller.ts',
  'src/achievements/dto/create-achievement.dto.ts',
  'src/achievements/achievements.service.ts'
];

async function fixFile(filePath) {
  try {
    console.log(`Processing ${filePath}...`);
    let content = await readFileAsync(filePath, 'utf8');
    
    // Remove imports from generated prisma
    content = content.replace(/import\s+{[^}]+}\s+from\s+['"](?:\.\.\/)*generated\/prisma['"];?/g, '');
    
    // Replace enum usages directly with string literals where needed
    content = content.replace(/TransactionType\./g, "'");
    content = content.replace(/CryptoAsset\./g, "'");
    content = content.replace(/AchievementType\./g, "'");
    content = content.replace(/InvestmentStatus\./g, "'");
    
    // Fix types in class property declarations
    content = content.replace(/: TransactionType;/g, ': string;');
    content = content.replace(/: CryptoAsset;/g, ': string;');
    content = content.replace(/: AchievementType;/g, ': string;');
    content = content.replace(/: InvestmentStatus;/g, ': string;');
    
    // Fix @IsEnum decorators
    content = content.replace(/@IsEnum\(TransactionType\)/g, '@IsString()');
    content = content.replace(/@IsEnum\(CryptoAsset\)/g, '@IsString()');
    content = content.replace(/@IsEnum\(AchievementType\)/g, '@IsString()');
    content = content.replace(/@IsEnum\(InvestmentStatus\)/g, '@IsString()');
    
    await writeFileAsync(filePath, content);
    console.log(`Fixed ${filePath}`);
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
}

async function main() {
  for (const file of files) {
    await fixFile(file);
  }
  console.log('All files processed');
}

main(); 