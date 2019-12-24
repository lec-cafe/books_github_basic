# GitHub Actions の活用

GitHub Actions は、 GitHub 上で動作する CI サービスです。

ワークフローと呼ばれる単位でタスクを記述し、
GitHub 上での push や pull-request のオープンといった処理をトリガーに
各種処理を発行することができます。

## Getting Started 

ワークフローはそれぞれ１つの Yaml ファイルから作成する事ができます。

試しにリポジトリに `.github/workflows/simple.yml` を作成し、以下のような内容を記述してみましょう。

```yaml
name: Simple Jobs

on: [push]

jobs:
  simple:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
      - name: Sample Task
        run: |
          echo "sample task"
```

この状態で、リポジトリにコードを push すると GitHub の Actions のタブから、タスクが実行されているのが確認できるはずです。

## ワークフローの構文

ワークフローは、Yaml 形式のファイルで記述され、複数のワークフローを定義することも可能です。

`name` は 画面上に表示されるワークフローの名称として機能します。

`on` はワークフローをトリガーするイベントの種別を定義します。

配列の形式で記述し、`push` `pull_request` といったキーワードが利用可能です。

```yaml
# プッシュあるいはプルリクエストでワークフローをトリガー
on: [push, pull_request]
```

イベントの反応するブランチ種別を制限したい場合、オブジェクトの形式で記述することができます。

`branch` を使ってブランチ名を、 `types` を使ってイベント種別を定義できます。

```yaml
on:
  push:
  pull_request:
    branches:
      - master
    types: 
      - created
```

上記の記述では、 push イベントはすべてのブランチに反応しますが、
pull_request は master ブランチのみで、また PR が作成されたときのみ反応します。

ワークフローで利用可能なすべてのイベントタイプは以下から確認可能です。

https://help.github.com/ja/actions/automating-your-workflow-with-github-actions/events-that-trigger-workflows

### jobs の記載

jobs は ワークフローで実行する ジョブの本体です。

jobs.{jobName} の形式で複数のジョブを記述可能で、
それぞれのジョブは並列に、異なる環境で実行されます。

```yaml
jobs:
  simple:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
      - name: Sample Task
        run: |
          echo "sample task"
```

`runs-on` は実行する環境の定義で、通常 `ubuntu-latest` を利用することがほとんどでしょう。

`steps` にはジョブ内の処理を記述していきます。
`name` は、各ステップに添えられる名称です。
ステップ内では、`use` キーワードを用いて 予め定義された処理セットを参照することが可能です。
ステップ内で処理する内容を自分で記述する場合には、`run` でコマンドを記述します。

上記のジョブでは `actions/checkout@v1` を利用してソースのダウンロードを行い、`echo` でメッセージを出力しています。

### その他のワークフロー構文

ワークフロー構文は随時変更が加えられており、利用可能な機能・構文は以下の公式ドキュメントから参照することが可能です。

https://help.github.com/ja/actions/automating-your-workflow-with-github-actions/workflow-syntax-for-github-actions#

## Badge の利用

GitHub Actions の実行ステータスを README 等に記載する場合、以下の形式の Badge が利用可能です。

```markdown
[![Actions Status](https://github.com/{owner}/{repo}/workflows/{workflowName}/badge.svg)](https://github.com/{owner}/{repo}/actions)
```

## カスタムアクションの利用

自分で定義したアクション処理を、ワークフロー内で実行する事も可能です。

ワークフローは JavaScript を用いて記述することが可能です。

試しに、フォルダ `.github/actions/sample_action` を作成して以下のような構成を整えてみましょう。

```text
.github/actions/sample_action/
├── node_modules
├── README.md
├── action.yml
├── index.js
├── package-lock.json
└── package.json
```

package.json は以下のような形で記述します。

```json
{
  "name": "sample_action",
  "version": "1.0.0",
  "description": "https://help.github.com/ja/actions/automating-your-workflow-with-github-actions/building-actions",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@actions/core": "^1.2.0",
    "@actions/github": "^2.0.0"
  }
}
```

必要なモジュールとして `@actions/core` と `@actions/github` をインストールするよう記述しておいてください。


action.yml はカスタムアクションの定義ファイルです。

`input` `outputs` でアクションの入出力を定義することが可能です。

```yaml
name: 'Hello World'
description: 'Greet someone and record the time'
inputs:
  who-to-greet:  # id of input
    description: 'Who to greet'
    required: true
    default: 'World'
outputs:
  time: # id of output
    description: 'The time we greeted you'
runs:
  using: 'node12'
  main: 'index.js'
```

処理を記述する JavaScript のファイルは以下のようになります。

```js
const core = require('@actions/core');
const github = require('@actions/github');

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello ${nameToGreet}!`);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
```

`@actions/core` を利用して Input / Output のハンドリングが行える他、
`@actions/github` 経由で、GitHub 上のデータアクセスを行うことが可能です。

こうして作成された actions は以下のような形でワークフローから利用することが可能です。

```yaml
jobs:
  custom_actions:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v1
    - name: Hello world action step
      uses: ./.github/actions/sample_action # Uses an action in the root directory
      id: hello
      with:
        who-to-greet: 'Mona the Octocat'
    # `hello`ステップからの出力を利用
    - name: Get the output time
      run: echo "The time was ${{ steps.hello.outputs.time }}"
    - name: Install Dependencies
      run: |
        npm ci
    - name: Execute tests
      run: |
        npm run test
```

## 各言語ごとの構成

各種言語ごとの構成については、以下のサンプルリポジトリをご確認下さい。

Github Actions on Laravel 

https://github.com/chatbox-inc/laravel-github-actions

Github Actions on Nuxt.js 

https://github.com/chatbox-inc/nuxtjs_github_actions
