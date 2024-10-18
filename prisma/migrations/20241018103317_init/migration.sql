/*
  Warnings:

  - You are about to drop the `Bank` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Deposit` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Region` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Transaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserBalanceHistory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Bank" DROP CONSTRAINT "Bank_region_id_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_insurance_id_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_user_id_fkey";

-- DropForeignKey
ALTER TABLE "_UserBalanceHistory" DROP CONSTRAINT "_UserBalanceHistory_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserBalanceHistory" DROP CONSTRAINT "_UserBalanceHistory_B_fkey";

-- DropTable
DROP TABLE "Bank";

-- DropTable
DROP TABLE "Deposit";

-- DropTable
DROP TABLE "Region";

-- DropTable
DROP TABLE "Transaction";

-- DropTable
DROP TABLE "UserBalanceHistory";

-- CreateTable
CREATE TABLE "regions" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "regions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "banks" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "percentage" DECIMAL(2,2) NOT NULL DEFAULT 0.0,
    "region_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "banks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "deposits" (
    "id" SERIAL NOT NULL,
    "incasator_id" INTEGER,

    CONSTRAINT "deposits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "insurance_id" INTEGER,
    "vendor_id" INTEGER,
    "anketa_id" INTEGER,
    "account" TEXT,
    "amount" BIGINT DEFAULT 0,
    "structure_id" INTEGER,
    "region_id" INTEGER,
    "request" JSONB,
    "response" JSONB,
    "payerPhone" TEXT,
    "merchantId" TEXT,
    "terminalId" TEXT,
    "partner_transaction_id" TEXT,
    "bank_transaction_id" TEXT,
    "status" INTEGER DEFAULT 0,
    "smsNotify" INTEGER DEFAULT 0,
    "paymentType" INTEGER DEFAULT 0,
    "currency" TEXT,
    "paymentId" INTEGER DEFAULT 0,
    "partnerId" INTEGER DEFAULT 0,
    "chequeDetails" TEXT,
    "cardNumber" TEXT,
    "cardExpire" TEXT,
    "retry" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_balance_history" (
    "id" SERIAL NOT NULL,
    "transaction_id" INTEGER NOT NULL,

    CONSTRAINT "user_balance_history_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "transactions_user_id_vendor_id_partner_transaction_id_accou_idx" ON "transactions"("user_id", "vendor_id", "partner_transaction_id", "account", "status", "paymentId", "partnerId", "createdAt");

-- AddForeignKey
ALTER TABLE "banks" ADD CONSTRAINT "banks_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "regions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_insurance_id_fkey" FOREIGN KEY ("insurance_id") REFERENCES "insurances"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserBalanceHistory" ADD CONSTRAINT "_UserBalanceHistory_A_fkey" FOREIGN KEY ("A") REFERENCES "transactions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserBalanceHistory" ADD CONSTRAINT "_UserBalanceHistory_B_fkey" FOREIGN KEY ("B") REFERENCES "user_balance_history"("id") ON DELETE CASCADE ON UPDATE CASCADE;
