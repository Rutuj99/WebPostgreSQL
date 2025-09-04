-- Table: public.TODO_Master
-- DROP TABLE IF EXISTS public."TODO_Master";

CREATE TABLE IF NOT EXISTS public."TODO_Master"
(
    "TodoId" Serial NOT NULL,
    "TodoTitle" text,
    "TodoDescription" text,
    "Priority" integer,
    "Status" bit(1) NOT NULL DEFAULT (1)::bit(1),
    "CreatedDate" timestamp without time zone NOT NULL DEFAULT now(),
    "CreatedBy" text COLLATE pg_catalog."default",
    "UpdatedDate" timestamp without time zone,
    "UpdatedBy" text COLLATE pg_catalog."default",
    CONSTRAINT "TODO_Master_pkey" PRIMARY KEY ("TodoId")
);