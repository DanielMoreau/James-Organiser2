import { defineConfig } from "@prisma/config";

export default defineConfig({
  schema: "./prisma/schema.prisma",
  datasource: {
    db: {
      provider: "sqlite",
      url: "file:./local.db",
    },
  },
});
