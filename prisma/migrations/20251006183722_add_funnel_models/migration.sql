-- CreateTable
CREATE TABLE "funnel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "funnel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "funnel_step" (
    "id" TEXT NOT NULL,
    "funnelId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "funnel_step_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "funnel_step_component" (
    "id" TEXT NOT NULL,
    "stepId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "content" JSONB NOT NULL,
    "style" JSONB,
    "settings" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "funnel_step_component_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "funnel_slug_key" ON "funnel"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "funnel_step_funnelId_order_key" ON "funnel_step"("funnelId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "funnel_step_component_stepId_order_key" ON "funnel_step_component"("stepId", "order");

-- AddForeignKey
ALTER TABLE "funnel" ADD CONSTRAINT "funnel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "funnel_step" ADD CONSTRAINT "funnel_step_funnelId_fkey" FOREIGN KEY ("funnelId") REFERENCES "funnel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "funnel_step_component" ADD CONSTRAINT "funnel_step_component_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "funnel_step"("id") ON DELETE CASCADE ON UPDATE CASCADE;
