/*
  Warnings:

  - The primary key for the `Airdrop` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `isDeleted` on the `Airdrop` table. All the data in the column will be lost.
  - The primary key for the `CheckIn` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `type` to the `Airdrop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Airdrop` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CheckIn" DROP CONSTRAINT "CheckIn_airdropId_fkey";

-- AlterTable
ALTER TABLE "Airdrop" DROP CONSTRAINT "Airdrop_pkey",
DROP COLUMN "isDeleted",
ADD COLUMN     "type" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Airdrop_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Airdrop_id_seq";

-- AlterTable
ALTER TABLE "CheckIn" DROP CONSTRAINT "CheckIn_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "airdropId" SET DATA TYPE TEXT,
ADD CONSTRAINT "CheckIn_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "CheckIn_id_seq";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "airdropId" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Airdrop" ADD CONSTRAINT "Airdrop_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_airdropId_fkey" FOREIGN KEY ("airdropId") REFERENCES "Airdrop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CheckIn" ADD CONSTRAINT "CheckIn_airdropId_fkey" FOREIGN KEY ("airdropId") REFERENCES "Airdrop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
