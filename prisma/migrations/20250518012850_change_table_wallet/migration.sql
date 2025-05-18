/*
  Warnings:

  - You are about to drop the column `value` on the `wallets` table. All the data in the column will be lost.
  - Added the required column `balance` to the `wallets` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_wallets" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "balance" REAL NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "wallets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_wallets" ("id", "userId") SELECT "id", "userId" FROM "wallets";
DROP TABLE "wallets";
ALTER TABLE "new_wallets" RENAME TO "wallets";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
