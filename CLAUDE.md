# AIエージェント向け作業ルール

このリポジトリは「AIによる開発自動化」の検証用です。AIエージェント（Claude Code 等）は以下に従って作業してください。

## 技術スタック
- Node.js 24 / TypeScript / Vite / Vitest
- デプロイ: GitHub Pages（GitHub Actions 経由）

## 開発フロー
1. `main` に直接コミットしない。必ずブランチを切る
   - 命名: `feat/<内容>`, `fix/<内容>`, `chore/<内容>`
2. 変更したらテストを追加・更新する（ロジックは `src/` に、テストは `tests/` に）
3. コミット前に `npm run ci`（型チェック → テスト → ビルド）を通す
4. コミットメッセージは Conventional Commits 形式（例: `feat: 完了済みを一括削除`）
5. `gh pr create` で PR を作成し、`.github/pull_request_template.md` を埋める
6. CI が緑になったことを確認してから人間にレビューを依頼する
7. マージは人間が行う。マージ後は deploy ワークフローが自動で GitHub Pages に公開する

## やってはいけないこと
- `main` への force push、ワークフローの無効化
- シークレット・トークンをコードやログに出力すること
- 依頼範囲外の大きなリファクタリング

## 社内ルール
フェーズ2以降、社内の開発標準を `docs/rules/` に置きます。置かれている場合はそちらを優先してください。
