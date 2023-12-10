-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "sold" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_product" ("description", "id", "image", "name", "price") SELECT "description", "id", "image", "name", "price" FROM "product";
DROP TABLE "product";
ALTER TABLE "new_product" RENAME TO "product";
CREATE INDEX "product_name_idx" ON "product"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
