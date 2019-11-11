---
permalink: /netlify
---
# Netlify を使ってWebサイトをUpする

Netlify を利用すれば、Netlify に自分のGitHub リポジトリからWebサイトをUPすることができます。

## Netlify を利用する

Netlify は GitHub と連携して静的サイトの作成ができる Web サービスです。

以下の URL から Login を選択して Github アカウントを利用したサインアップが可能です。

https://www.netlify.com/

### Netlify でサイトを作成する

Netlify にログインしたら、 `New site from Git` から GitHub のリポジトリを選択します。


リポジトリ選択後は、以下のような設定で `Deploy Site` をクリックすると Web サイトの生成が始まります。

- Build Command: サイトにビルドコマンドを利用している場合、コマンドを記載
- Publish Directory: Web に公開するフォルダ名を記載

## Netlify の Deploy 設定

### ブランチデプロイ

`Setting` のタブより、`Build & deploy` の `Deploy contexts` の設定を行うことで、
ブランチごとのデプロイ設定を行うことができます。

`Branch Deploy` の設定項目は以下のような内容になっています。

- `All` リポジトリ上の全てのブランチをデプロイする
- `None production` ブランチのみをデプロイする
- `Let me add individual branches` デプロイするブランチを個別に指定する

デフォルトでは `None` に設定されており、production ブランチ(通常 `master`) のみが
Netlify にデプロイされます。

`All` や `Let me add individual branches` で個別にブランチを設定するなどすることで、
`master` 以外のブランチもNetlify での デプロイ対象に含めることが可能になり、
ブランチごとのサイトプレビューを `Deploy` のセクションから確認することができるようになります。
