-- CreateTable
CREATE TABLE "todo" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP,

    CONSTRAINT "todo_pkey" PRIMARY KEY ("id")
);
