-- CreateTable
CREATE TABLE "Manager" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "employer_id" INTEGER NOT NULL,
    CONSTRAINT "Manager_employer_id_fkey" FOREIGN KEY ("employer_id") REFERENCES "Employer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
