# Gitを用いたチーム開発の形

Git を用いることでチーム開発を行う場合、いくつかの方法があります。

## ブランチを用いた開発 - Git flow

Git flow は ブランチを用いてリリースを管理する手法です。

Git flow の解説図としては、以下の記事に掲載されている図がよく用いられます。

https://qiita.com/KosukeSone/items/514dd24828b485c69a05

### Git flow とブランチ

Git flow では、様々なブランチを用いてコードのリリース状態を管理します。

ブランチ名は一例ですが、主に以下のようなブランチが用いられます。

- `master` 本番環境でリリースされているブランチ
- `dev` staging環境でリリースされているブランチ
- `topic_xxxx` 現在開発中のタスクが積み上げられていくブランチ
- `hotfix` 開発中のラインとは別に緊急で本番環境に修正を加えるためのブランチ

Git を使ったワークフローにおいて、プロジェクトで運用している特定の環境と、
Git 上の状態を必ず一致させるというのは非常に重要です。

通常のプロジェクトでは、本番環境の他にテスト環境または staging 環境と呼ばれる環境が用意されるため、
`master` `dev` といったブランチをこの環境と同期させるよう手配します。

ブランチの状態と環境のソースの状態を一致させるには CD などの活用がおすすめです。

### 開発作業のリリース

Git flow では、staging 環境に UP する前の開発用の作業場として、
開発ライン毎に `topic_xxxx` という形の開発ブランチが用意されます。

このような開発ブランチは topic ブランチ・feature ブランチと呼ばれることが多く、
その開発ラインの機能名または、関連する issue の名称でブランチが切られることが多いでしょう。

topic ブランチの内容は開発の終了タイミングで dev ブランチなどの試験環境と結びつくブランチへとマージされ、
プロジェクトメンバーによるテストを経て master ブランチにマージされ本番リリースとなります。

他の topic ブランチのリリースにより、
master や dev 等のメインとなるブランチが切り替わった場合は、
適宜 topic ブランチに最新の状態を取り込むための merge を実施する必要があります。

新しい topic ブランチをスタートする場合は通常は master ブランチを起点にブランチを起こしますが、
現在 dev ブランチにて試験中の機能に依存する開発を行う場合などは dev ブランチをベースにブランチを立てる必要があります。

### 緊急な修正のリリース

開発中の topic ブランチや dev ブランチの状態を無視して、
緊急で master ブランチの状態を変更させる場合、
master ブランチを起点に hotfix ブランチを立て、
hotfix ブランチ上で修正を行いつつ、master ブランチにコードを反映します。

緊急修正の場合でも、topic ブランチの変更と同様に master ブランチ上に起こった修正は、
dev や topic ブランチに対してマージされます。

### Git flow の問題点

Git flow は Git を用いた開発の手法としてはベーシックなものですが、
プロジェクトの規模が大きくなると次第に運用コストが大きくなります。

Git flow の欠点としては、主に以下のようなものが挙げられます。

- プロジェクト内に複数のブランチが乱立し、複雑化する
- 並行で進む topic ブランチが増えるほど、マージのコストが増大する

Git flow における管理コストの問題は、
GitHub flow を導入することで解決可能ですが、
GitHub flow を用いながら部分的に Git flow を導入する事も可能です。

## GitHubを用いた開発 - GitHub flow

GitHub flow は GitHub の Pull Request を用いてリリースを管理する手法です。

GitHub flow の解説図としては、以下の記事などが利用可能です。

https://gist.github.com/Gab-km/3705015

### GitHub flow とブランチ 

GitHub flow では、プロジェクトのリリースの管理をシンプルにするため、
プロジェクト内で利用されるブランチを限りなく少なくします。

GitHub flow における必要なブランチは `master` のみの一本で、
この master ブランチは、本番環境の状態と一致したものになります。

各種変更作業は メインのリポジトリから fork されたリポジトリから行われ、
変更は、 GitHub の Pull Request を通じて メインリポジトリの master にマージされます。

開発の便宜上で `dev` ブランチも用意し、 `dev` ブランチ と `master` ブランチの２本で GitHub flow を運用するケースもあります。

### GitHub flow の運用

GitHub flow では ２つのリポジトリを利用します。

ここでは便宜上、メインのリポジトリを upstream、フォークしたリポジトリを origin と呼ぶようにしましょう。

`git remote` コマンドを利用して upstream と origin の２つを リモートとして登録します。

リモートの登録状況は `git remote -v` で確認できます。

```bash
$ git remote -v 
origin  https://github.com/mikakane/lec-cafe (fetch)
origin  https://github.com/mikakane/lec-cafe (push)
upstream  https://github.com/lec-cafe/lec-cafe (fetch)
upstream  https://github.com/lec-cafe/lec-cafe (push)
```

GitHub flow で修正作業を行う場合には、毎回トピックブランチを自分のリポジトリ上に作成する必要があります。

トピックブランチを作成する際には、起点となる upstream 上のブランチを確認する必要があります。
これはプロジェクトによって異なるため、必ず作業前に確認するようにしましょう。

まず、 起点となる upstream 上のブランチの最新情報を取得するため、 `fetch` を行います。

```bash
$ git fetch upstream
```

次に起点となるブランチをベースに、手元でブランチを作成します。ここでは upstream の `dev` をベースに `topic_2333` を作成するものとします。

```bash
$ git checkout -b topic_2333 upstream/dev
```

ブランチが作成できたらブランチ上で修正作業を行います。
修正作業が終わったら 自分のリポジトリ origin に push して修正内容を GitHub 上に送信します。

```bash
$ git push origin topic_2333
```

この状態では、フォークしたリポジトリにしか変更が反映されていないため、
最後に Pull Request を作成して upstream にデータを送信します。
`upstream/dev` ← `origin/topic_2333` となるように Pull Request の設定を調整し、
Pull Request の Diff が予期した形になっているかを確認しましょう。

### GitHub flow と Squeash Merge

GitHub flow では、様々な変更を Fork したリポジトリ上の topic ブランチで処理し、
個別にマージを実施するため、小さい単位での分業に耐えうるというメリットがあります。

マージが複数回実施されるケースでは、マージコミットが煩雑になりがちですが、
GitHub の Pull Request では、Squash Merge と呼ばれる機能が用意されており、
これを利用することで Merge Commit を作成することなく、Pull Request 上のコミットを一つのコミットにまとめて処理することができます。

