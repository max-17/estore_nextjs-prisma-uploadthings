-- CreateTable
CREATE TABLE "product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "image" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "product_name_idx" ON "product"("name");
