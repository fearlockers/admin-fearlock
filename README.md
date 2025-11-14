# Fearlock - B to B管理画面

Next.jsで構築されたB to B向けの管理システムです。

## 必要要件

- Node.js 18.x以上
- npm または yarn

## セットアップ

1. 依存関係のインストール:
```bash
npm install
```

2. 開発サーバーの起動:
```bash
npm run dev
```

3. ブラウザで開く:
```
http://localhost:3000
```

## 機能

- 管理者管理
  - 管理者一覧
  - 管理者グループ一覧
  - 売上入金先一覧
- 講習会管理（準備中）
- 会員管理（準備中）
- 施設管理（準備中）
- 設定（準備中）

## 技術スタック

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Lucide React (アイコン)

## プロジェクト構造

```
admin_fearlock/
├── app/                    # Next.js App Router
│   ├── admin/             # 管理画面ページ
│   ├── globals.css        # グローバルスタイル
│   ├── layout.tsx         # ルートレイアウト
│   └── page.tsx           # ホームページ
├── components/            # Reactコンポーネント
│   ├── Layout/           # レイアウトコンポーネント
│   └── Table/            # テーブルコンポーネント
└── public/               # 静的ファイル
```

