-- CreateEnum
CREATE TYPE "public"."Priority" AS ENUM ('HIGH', 'LOW');

-- CreateEnum
CREATE TYPE "public"."JobStatus" AS ENUM ('TO_APPLY', 'APPLIED');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" UUID NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Job" (
    "id" UUID NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "jobUrl" TEXT NOT NULL,
    "priority" "public"."Priority" NOT NULL DEFAULT 'HIGH',
    "status" "public"."JobStatus" NOT NULL DEFAULT 'TO_APPLY',
    "userId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Task" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "priority" "public"."Priority" NOT NULL DEFAULT 'HIGH',
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "userId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "public"."User"("username");

-- CreateIndex
CREATE INDEX "Job_userId_idx" ON "public"."Job"("userId");

-- CreateIndex
CREATE INDEX "Job_priority_idx" ON "public"."Job"("priority");

-- CreateIndex
CREATE INDEX "Job_status_idx" ON "public"."Job"("status");

-- CreateIndex
CREATE INDEX "Task_userId_idx" ON "public"."Task"("userId");

-- CreateIndex
CREATE INDEX "Task_priority_idx" ON "public"."Task"("priority");

-- CreateIndex
CREATE INDEX "Task_completed_idx" ON "public"."Task"("completed");

-- AddForeignKey
ALTER TABLE "public"."Job" ADD CONSTRAINT "Job_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Task" ADD CONSTRAINT "Task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
