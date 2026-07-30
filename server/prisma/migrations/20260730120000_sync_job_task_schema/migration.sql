-- CreateEnum
CREATE TYPE "public"."Priority" AS ENUM ('HIGH', 'LOW');

-- AlterEnum
BEGIN;
CREATE TYPE "public"."JobStatus_new" AS ENUM ('TO_APPLY', 'APPLIED');
ALTER TABLE "public"."Job" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "public"."Job" ALTER COLUMN "status" TYPE "public"."JobStatus_new" USING (
    CASE
        WHEN "status"::text IN ('DRAFT', 'ACTIVE') THEN 'TO_APPLY'
        ELSE 'APPLIED'
    END::text::"public"."JobStatus_new"
);
ALTER TYPE "public"."JobStatus" RENAME TO "JobStatus_old";
ALTER TYPE "public"."JobStatus_new" RENAME TO "JobStatus";
DROP TYPE "public"."JobStatus_old";
ALTER TABLE "public"."Job" ALTER COLUMN "status" SET DEFAULT 'TO_APPLY';
COMMIT;

-- DropForeignKey
ALTER TABLE "public"."Category" DROP CONSTRAINT "Category_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Job" DROP CONSTRAINT "Job_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Task" DROP CONSTRAINT "Task_jobId_fkey";

-- DropIndex
DROP INDEX "public"."Job_categoryId_idx";

-- DropIndex
DROP INDEX "public"."Task_jobId_idx";

-- AlterTable
ALTER TABLE "public"."Job" RENAME COLUMN "title" TO "jobTitle";

-- AlterTable
ALTER TABLE "public"."Job"
DROP COLUMN "description",
ADD COLUMN     "jobUrl" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "priority" "public"."Priority" NOT NULL DEFAULT 'HIGH';

-- AlterTable
ALTER TABLE "public"."Task"
DROP COLUMN "description",
DROP COLUMN "jobId",
ADD COLUMN     "priority" "public"."Priority" NOT NULL DEFAULT 'HIGH';

-- DropTable
DROP TABLE "public"."Category";

-- CreateIndex
CREATE INDEX "Job_priority_idx" ON "public"."Job"("priority");

-- CreateIndex
CREATE INDEX "Job_status_idx" ON "public"."Job"("status");

-- CreateIndex
CREATE INDEX "Task_priority_idx" ON "public"."Task"("priority");