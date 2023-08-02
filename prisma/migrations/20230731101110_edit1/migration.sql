/*
  Warnings:

  - You are about to drop the column `email` on the `Department` table. All the data in the column will be lost.
  - You are about to drop the `_DepartmentToEmployee` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[departmentId]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "_DepartmentToEmployee" DROP CONSTRAINT "_DepartmentToEmployee_A_fkey";

-- DropForeignKey
ALTER TABLE "_DepartmentToEmployee" DROP CONSTRAINT "_DepartmentToEmployee_B_fkey";

-- DropIndex
DROP INDEX "Department_email_key";

-- AlterTable
ALTER TABLE "Department" DROP COLUMN "email";

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "departmentId" INTEGER;

-- DropTable
DROP TABLE "_DepartmentToEmployee";

-- CreateIndex
CREATE UNIQUE INDEX "Employee_departmentId_key" ON "Employee"("departmentId");

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;
