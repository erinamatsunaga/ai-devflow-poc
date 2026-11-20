# ai-devflow-poc

AIによる開発自動化（開発 → CI → PR → 自動デプロイ）を検証するためのリポジトリです。
題材は小さな Todo アプリ（Vite + TypeScript）、デプロイ先は GitHub Pages です。

```
feature ブランチ ──PR──▶ CI (typecheck/test/build) ──レビュー・マージ──▶ main ──▶ Deploy ──▶ GitHub Pages
```

## 構成
| パス | 役割 |
|---|---|
| `src/` | アプリ本体（ロジックは `todo.ts`） |
| `tests/` | Vitest のテスト |
| `.github/workflows/ci.yml` | PR・main push で型チェック/テスト/ビルド |
| `.github/workflows/deploy.yml` | main push で GitHub Pages へ自動デプロイ |
| `.github/pull_request_template.md` | PR テンプレート |
| `.github/ISSUE_TEMPLATE/` | Issue テンプレート |
| `CLAUDE.md` | AIエージェント向けの作業ルール |
| `docs/verification-plan.md` | 検証計画と記録表 |
| `docs/rules/` | フェーズ2で社内ルールを置く場所 |

## 前提ツール（Windows）
- Node.js 22.12 以上（推奨 24）
- Git
- GitHub CLI（`gh`）… `winget install GitHub.cli` → `gh auth login`

## 初回セットアップ（PowerShell）
```powershell
cd ~\ai-devflow-poc

# 1. 依存を入れてローカルで動作確認（package-lock.json が生成されます）
npm install
npm run ci
npm run dev        # http://localhost:5173

# 2. Git 初期化と初回コミット
git init -b main
git add .
git commit -m "chore: initial scaffold"

# 3. GitHub にリポジトリを作成して push（無料プランの Pages は public が必要）
gh repo create ai-devflow-poc --public --source . --push

# 4. Pages の公開元を「GitHub Actions」に設定
gh api -X POST "repos/{owner}/{repo}/pages" -f build_type=workflow

# 5. デプロイを実行（初回のみ手動。以降は main への push で自動）
gh workflow run deploy.yml
gh run watch
```
公開URL: `https://<GitHubユーザー名>.github.io/ai-devflow-poc/`

> `package-lock.json` は CI の `npm ci` に必要なので必ずコミットしてください。

## main を保護する（PR経由を強制・推奨）
```powershell
@'
{
  "required_status_checks": { "strict": true, "contexts": ["typecheck / test / build"] },
  "enforce_admins": false,
  "required_pull_request_reviews": { "required_approving_review_count": 0 },
  "restrictions": null
}
'@ | Set-Content -Encoding ascii protection.json

gh api -X PUT "repos/{owner}/{repo}/branches/main/protection" --input protection.json
Remove-Item protection.json
```
（GitHub の Settings > Branches からも設定できます）

## AIに試させる流れ（例）
1. `gh issue create` でお題を起票（例: 完了済みを一括削除）
2. AIに「Issue #1 を CLAUDE.md のルールに従って実装し、PR を作って」と依頼
3. PR 上で CI が走るのを確認 → レビュー → マージ
4. Pages の画面に表示される build 時刻が更新されればデプロイ成功
