/*
  Warnings:

  - Made the column `code` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "insurances" ALTER COLUMN "company_id" DROP NOT NULL,
ALTER COLUMN "service_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "code" SET NOT NULL;

-- CreateTable
CREATE TABLE "Region" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Region_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bank" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "percentage" DECIMAL(2,2) NOT NULL DEFAULT 0.0,
    "region_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Bank_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Deposit" (
    "id" SERIAL NOT NULL,
    "incasator_id" INTEGER,

    CONSTRAINT "Deposit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
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

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserBalanceHistory" (
    "id" SERIAL NOT NULL,
    "transaction_id" INTEGER NOT NULL,

    CONSTRAINT "UserBalanceHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserBalanceHistory" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE INDEX "Transaction_user_id_vendor_id_partner_transaction_id_accoun_idx" ON "Transaction"("user_id", "vendor_id", "partner_transaction_id", "account", "status", "paymentId", "partnerId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "_UserBalanceHistory_AB_unique" ON "_UserBalanceHistory"("A", "B");

-- CreateIndex
CREATE INDEX "_UserBalanceHistory_B_index" ON "_UserBalanceHistory"("B");

-- CreateIndex
CREATE INDEX "insurances_anketaId_status_polis_id_vendor_id_order_id_crea_idx" ON "insurances"("anketaId", "status", "polis_id", "vendor_id", "order_id", "created_at");

-- CreateIndex
CREATE INDEX "structures_name_status_created_at_idx" ON "structures"("name", "status", "created_at");

-- CreateIndex
CREATE INDEX "user_balances_balance_user_id_created_at_idx" ON "user_balances"("balance", "user_id", "created_at");

-- CreateIndex
CREATE INDEX "users_code_status_cash_count_latitude_longitude_structure_i_idx" ON "users"("code", "status", "cash_count", "latitude", "longitude", "structure_id", "incasator_id", "created_at");

-- AddForeignKey
ALTER TABLE "Bank" ADD CONSTRAINT "Bank_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_insurance_id_fkey" FOREIGN KEY ("insurance_id") REFERENCES "insurances"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserBalanceHistory" ADD CONSTRAINT "_UserBalanceHistory_A_fkey" FOREIGN KEY ("A") REFERENCES "Transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserBalanceHistory" ADD CONSTRAINT "_UserBalanceHistory_B_fkey" FOREIGN KEY ("B") REFERENCES "UserBalanceHistory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
