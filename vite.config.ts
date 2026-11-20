import { defineConfig } from "vitest/config";

// GitHub Pages（プロジェクトページ）は https://<user>.github.io/<repo>/ で配信されるため、
// デプロイ時は BASE_PATH=/<repo>/ を渡す。ローカルでは "/" のまま。
export default defineConfig({
  base: process.env.BASE_PATH ?? "/",
  define: {
    // デプロイが反映されたかを画面上で確認するためのビルド時刻
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
  },
  test: {
    include: ["tests/**/*.test.ts"],
    environment: "node",
  },
});
