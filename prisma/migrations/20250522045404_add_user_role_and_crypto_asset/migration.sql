/*
  Warnings:

  - The `asset` column on the `Transaction` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "CryptoAsset" AS ENUM ('USD', 'BTC', 'ETH', 'USDT', 'USDC');

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "txHash" TEXT,
ADD COLUMN     "walletAddress" TEXT,
DROP COLUMN "asset",
ADD COLUMN     "asset" "CryptoAsset" NOT NULL DEFAULT 'USD';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER';
