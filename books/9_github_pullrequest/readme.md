# GitHub PullRequest の活用

## GitHub Pull Request の活用

GitHub には Pull Reuest と呼ばれるコードのマージ機能があります。

![](/images/4.pullrequest.png)

Pull Request では、コードのマージ前にコードの状態をチェックすることが可能で、
各種機能を用いて、コードの内容を確認することができます。

正しい Pull Request を作成できるよう、
自分で Pull Request を作成した際には、merge を依頼する前に以下の各タブの情報を確認できるようにしておきましょう。

### タイトルと ベース

Pull Request のタイトルには、コードの変更内容がわかりやすいような記載を行います。

base は Pull Request を投げる先と、投げる元の設定で、 Pull Request の画面上では、
`into ... from ... ` の形式で表示されます。
ここの設定が間違っている場合、後述する commit や diff の欄がおかしくなるため注意しましょう。

Pull Request の状態が未了で、まだマージされるべきでない場合 タイトルに `WIP` と付与することで作業中であることを明記できます。

::: tip 
Pull Request は 未了の状態でも WIP の形式で早めに作成しておくようにしましょう。
ラフの状態でレビューを入れてもらうことで、作業内容の間違いや設計の方針ミスに早めに気づけたりします。
:::

### 概要欄

Pull Request を作成する際に、概要を記述することが可能です。

まず概要欄には、関連する Issue の番号を明記するようにしましょう。
例えば 1234 番の Issue を完了させる作業を行っている場合には、
`close #1234` と記述します。

正しく Issue 番号が記載できている場合、 `close` の下に 破線が表示され、
マウスオーバーした際に、`this pullrequest close ...` のメッセージが表示されるようになります。

Pull Requst の内容が、 Issue を完了させない場合には、 `close` ではなく `ref #1234` のような形式で記述します。

その他概要欄には、レビュアーに向けてのコメントを記載します。
以下のようなものが備わっているとレビューがスムーズに進んで良いでしょう。

- 作業を行った上での、気付き、疑問点
- diff が発生している部分に対する注意書きなど
- レビューを行う上で必要な preview url や確認手順など

### Conversation 

コードに対するコメントが確認できるほか、CI などの自動化ツールでの検証結果が確認できます。

CI で 赤い バツが表示されている場合、何かの問題が発生しているケースがほとんどですので、
コードを修正して問題を解決するようにしましょう。

またコンフリクトが発生している場合にも、この画面からコンフリクトの存在を確認できます。
コンフリクトは Web 画面上からも解決できますが、エディタを用いた作業のほうがミスは少ないため、
極力手元でコレを解決してから Pull Request の マージ依頼を行うようにしましょう。

`upstream` の `dev` に対する Pull Request で、現在の `topic_2333` から作業を行っているとします。

コンフリクトを解決するには、`topic_2333` ブランチ上で ベースを pull します。

```bash
$ git pull upstream dev
```

手元で コンフリクトが発生するため、修正を行い、 add してコミットします。
作業内容が確認できたら `topic_2333` ブランチに push して Pull Request の画面が更新されていることを確認しましょう。

```bash
$ git push origin topic_2333
```

### Commits

Commits の欄には、今回の Pull Request で作成される Commit の一覧が表示されます。

ここに 自分に身の覚えのない commit が表示されている場合は、 base の設定が間違っているか、
ブランチをきり間違えている可能性があります。

base の修正で対応できない場合、無関係なブランチを起点として作業を開始してしまっている可能性がありますので、
以下の手順で、Pull Request の作り直しが必要になります。

`upstream` の `dev` に対する Pull Request で、現在の `topic_2333` から作業を行っているとします。

まずは正しくブランチを切り直すために base を fetch してブランチを作成します。

```bash
$ git fetch upstream
$ git branch -b topci_2333_fix upstream/dev
```

上記の手順で `topci_2333_fix` が作成できますので、
ローカルの `topic_2333` 上にある作業状態を checkout コマンドで持ってきましょう。
`git status` でファイルの差分を確認しながら新しいコミットを実施することが可能です。

```bash
$ git checkout topic_2333
$ git status -s
$ git commit -am "commit messege"
```

作業内容が確認できたら push して `topic_2333_fix` から新しい Pull Request を作成しましょう。

```bash
$ git push origin topic_2333_fix
```

### Files Changed

Files Changed の欄には、今回の Pull Request で変更されるファイルの一覧が表示されます。

ここに 自分に身の覚えのない ファイルの変更 が表示されている場合は、作業内容が間違っている可能性があります。

見に覚えのない形でファイルが変更されてしまっている場合、以下の手順で修正することができます。

`upstream` の `dev` に対する Pull Request で、現在の `topic_2333` から作業を行っているとします。

まずはベースのブランチから最新情報を取得するため、base のリポジトリを pull します。

```bash
$ git pull upstream dev
```

例えば、 `package-lock.json` に意図しない変更が入っている場合、以下の手順で 変更を 元に戻すことができます。

```bash
$ git checkout package-lock.json upstream/dev
```

手元で発生した変更を確認して commit し `topic_2333` ブランチに push して、
 Pull Request の画面が更新されていることを確認しましょう。

```bash
$ git push origin topic_2333
```
