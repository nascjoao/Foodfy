CREATE TABLE "files" (
    "id" SERIAL PRIMARY KEY,
    "name" text,
    "path" text NOT NULL
);

CREATE TABLE "recipes" (
    "id" SERIAL PRIMARY KEY,
    "chef_id" int,
    "title" text,
    "ingredients" text[],
    "preparation" text[],
    "information" text,
    "created_at" timestamp DEFAULT(now())
);

CREATE TABLE "recipe_files" (
    "id" SERIAL PRIMARY KEY,
    "recipe_id" int REFERENCES recipes(id),
    "file_id" int REFERENCES files(id)
);

CREATE TABLE "chefs" (
    "id" SERIAL PRIMARY KEY,
    "file_id" int REFERENCES files(id),
    "name" text,
    "created_at" timestamp DEFAULT(now())
);