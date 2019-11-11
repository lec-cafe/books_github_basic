---
permalink: /start_github
---

# GitHubにコードをUPする

ターミナルの基本操作が理解できたところで、
実際にファイルを作成しながら、git の操作方法を体験してみましょう。

## Git を利用する

Git はコマンドベースで利用する、バージョン管理ツールです。

Git でのバージョン管理は、任意のフォルダ単位で行われ、
一つのバージョン管理を行うフォルダを `リポジトリ` と呼びます。

リポジトリでは、ファイルの変更履歴を`コミット`と呼ばれる単位で管理します。

まずはリポジトリを作成して、最初のコミットを作成してみましょう。

### ファイルの準備

まずは、バージョン管理を行うために、一つフォルダを作成してみましょう。

ここでは Web制作のプロジェクトを想定して、
`website` というフォルダに `public` フォルダを作成して、
中に、 `index.html` を作成してみましょう。

```bash
$ mkdir website
$ mkdir website/public
$ touch website/public/index.html
```

これで現在のディレクトリに、 website フォルダが作成され、
public フォルダとその中に index.html が作成されているはずです。

### Git リポジトリの作成

作成した website フォルダでバージョン管理を開始するには、
現在のディレクトリが `website` フォルダになるよう `cd` コマンドで移動し、
`git init` コマンドを実行します。

```bash
$ cd website
$ git init 
```

`git init` コマンドを実行することで、ディレクトリに `.git` フォルダが作成されます。
Git のバージョン情報は全てこの `.git` フォルダに格納されます。

### コミットする

Git のバージョン履歴は全て`コミット` と呼ばれる単位でリポジトリに保存されます。

Git のリポジトリにコミットを追加するには、
まずファイルの情報を `ステージ（インデックス）` に登録し、コミットを行います。

ステージにファイルを登録するには `git add` コマンドを使用します。

```bash
$ git add public/index.html
```

add コマンドは引数に登録するファイル名を指定します。

ステージに登録したファイルの情報でコミットを作成してリポジトリに追加するには `git commit` コマンドを利用します。

```bash
$ git commit -m "add index.html"
```

commit コマンドは `-m` オプションでコミットコメントを指定することができます。

リポジトリに対するファイルの変更は全て コミットの単位で管理されますが、
このコミットに逐次コメントを付けておくことで、後から変更の履歴を振り返るときの参考になります。

## Github を利用する

コミットができたので Github にリポジトリの内容を送信してみましょう。

リポジトリの内容を Github に送信することで、作成したコミットをWeb上で確認することができます。

また Github にコードをUPしておくことで他の人にコードを共有することもできます。

### リポジトリを作成する

以下の URL から GitHub 上でリポジトリを作成する事ができます。

https://github.com/new

### Github のリポジトリを登録する

GitHub でリポジトリが作成できたら、手元で作成した Git リポジトリに、
GitHub のリポジトリURLを登録してみましょう。 

`git remote` コマンドは、GitHub などの外部で同期するリポジトリの URL を管理するためのコマンドです。

```bash
$ git remote add origin {GitHubのURL}
```

登録した リポジトリの一覧は `remote -v` コマンドで確認することができます。

```bash
$ git remote -v
```

### Github にコミットを送信する

リモートが登録できたら、手元のリポジトリから GitHub のリポジトリに先程作成したコミットを送信してみましょう。

コミットをリモートリポジトリに送信するには `push` コマンドが利用可能です。

```bash
$ git push origin master
```

上記のコマンドを実行すると、GitHub にコミットが送信されます。
(送信前に User名と Password が尋ねられる場合、GitHub のログイン情報を入力してください)

GitHub の Web ページ上でかく作成したリポジトリを確認してみると、先程作成したコミットが追加されているのがわかるでしょう。

## 複数のコミットを追加する

次にファイルの変更を行って、コミットを複数追加してみましょう。

`public/index.html` をテキストエディタ等で開いて、以下のようなコードを記述してみましょう。

```html
<!doctype html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>My Website</title>
</head>
<body>
  <h1>Hello World</h1>
</body>
</html>
```

コードの変更をコミットとして登録するには、先ほどと同様に `add` してから `commit` します。

```bash
$ git add public/index.html
$ git commit -m "add html code"
```

コミットができたら、`push` して GitHub にコードを登録します。

```bash
$ git push origin master
```

::: TRY
[Netlify](/9_netlify) のページを確認しながら GitHub にUPされたコードをWebサイトとして公開してみましょう。
:::
