-- CreateEnum
CREATE TYPE "Status" AS ENUM ('APPROVED', 'REJECTED', 'HALTED', 'ONGOING', 'SUSPENDED');

-- CreateTable
CREATE TABLE "Ministry" (
    "mid" TEXT NOT NULL,
    "central" BOOLEAN NOT NULL,
    "stateId" TEXT,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,

    CONSTRAINT "Ministry_pkey" PRIMARY KEY ("mid")
);

-- CreateTable
CREATE TABLE "Person" (
    "pid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "area" TEXT[],
    "position" TEXT[],
    "photo" TEXT NOT NULL,
    "stateIds" TEXT[],
    "projectIds" TEXT[],
    "schemeIds" TEXT[],
    "localIds" TEXT[],

    CONSTRAINT "Person_pkey" PRIMARY KEY ("pid")
);

-- CreateTable
CREATE TABLE "Project" (
    "pid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "start" BIGINT NOT NULL,
    "end" BIGINT,
    "status" "Status" NOT NULL,
    "stateIds" TEXT[],
    "photos" JSONB[],
    "central" BOOLEAN NOT NULL,
    "localIds" TEXT[],
    "ministryId" TEXT,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("pid")
);

-- CreateTable
CREATE TABLE "State" (
    "sid" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "State_pkey" PRIMARY KEY ("sid")
);

-- CreateTable
CREATE TABLE "Cashflow" (
    "eid" TEXT NOT NULL,
    "photo" TEXT,
    "desc" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "projectId" TEXT,
    "schemeId" TEXT,
    "incomeId" TEXT,
    "ministryId" TEXT,
    "central" BOOLEAN NOT NULL,
    "stateId" TEXT NOT NULL,

    CONSTRAINT "Cashflow_pkey" PRIMARY KEY ("eid")
);

-- CreateTable
CREATE TABLE "Income" (
    "iid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "date" BIGINT NOT NULL,
    "t_amount" TEXT NOT NULL,
    "central" BOOLEAN NOT NULL,
    "stateId" TEXT,
    "localId" TEXT,
    "ministryId" TEXT,

    CONSTRAINT "Income_pkey" PRIMARY KEY ("iid")
);

-- CreateTable
CREATE TABLE "Local" (
    "lid" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Local_pkey" PRIMARY KEY ("lid")
);

-- CreateTable
CREATE TABLE "Scheme" (
    "sid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "central" BOOLEAN NOT NULL,
    "stateIds" TEXT[],
    "start" BIGINT NOT NULL,
    "end" BIGINT,
    "status" "Status" NOT NULL,
    "photos" JSONB[],
    "ministryId" TEXT,
    "localIds" TEXT[],

    CONSTRAINT "Scheme_pkey" PRIMARY KEY ("sid")
);

-- CreateTable
CREATE TABLE "_PersonMinistry" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PersonMinistry_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_PersonMinistry_B_index" ON "_PersonMinistry"("B");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_ministryId_fkey" FOREIGN KEY ("ministryId") REFERENCES "Ministry"("mid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cashflow" ADD CONSTRAINT "Cashflow_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("pid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cashflow" ADD CONSTRAINT "Cashflow_schemeId_fkey" FOREIGN KEY ("schemeId") REFERENCES "Scheme"("sid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cashflow" ADD CONSTRAINT "Cashflow_incomeId_fkey" FOREIGN KEY ("incomeId") REFERENCES "Income"("iid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cashflow" ADD CONSTRAINT "Cashflow_ministryId_fkey" FOREIGN KEY ("ministryId") REFERENCES "Ministry"("mid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cashflow" ADD CONSTRAINT "Cashflow_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State"("sid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Income" ADD CONSTRAINT "Income_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State"("sid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Income" ADD CONSTRAINT "Income_localId_fkey" FOREIGN KEY ("localId") REFERENCES "Local"("lid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Income" ADD CONSTRAINT "Income_ministryId_fkey" FOREIGN KEY ("ministryId") REFERENCES "Ministry"("mid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scheme" ADD CONSTRAINT "Scheme_ministryId_fkey" FOREIGN KEY ("ministryId") REFERENCES "Ministry"("mid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PersonMinistry" ADD CONSTRAINT "_PersonMinistry_A_fkey" FOREIGN KEY ("A") REFERENCES "Ministry"("mid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PersonMinistry" ADD CONSTRAINT "_PersonMinistry_B_fkey" FOREIGN KEY ("B") REFERENCES "Person"("pid") ON DELETE CASCADE ON UPDATE CASCADE;
