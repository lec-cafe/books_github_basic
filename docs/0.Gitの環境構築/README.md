---
permalink: /introduction
---

# Git の環境構築

## Git の環境構築

Git は PC 上で利用するツールのためPC へのインストールが必要です。

Mac と Windows で手順が異なるため、それぞれ対象の手順を参考にしてください。

### Windows

Windows の方は Git for Windows をインストールして Git の環境構築を行いましょう。

https://gitforwindows.org/

Git for Windows をインストールすることで、ターミナルアプリの Git Bash もインストールされます。

スタート画面から Git Bash を探して起動することで、コマンド入力の画面を開くことができます。

### Mac 

Mac の場合は標準のターミナルアプリから、Git を利用することができます。

Git がインストールされているか確認するために `git --version` コマンドを実行しましょう。

```bash
$ git --version
xcode-select: note: no developer tools were found at '/Applications/Xcode.app', requesting install. Choose an option in the dialog to download the command line developer tools.
```

上記のような表示でダイアログが表示された場合、まだ Mac に Git がインストールされていないため、
ダイアログの「インストール」 を押して Git の導入を進めてください。

`git --version` を実行した際に以下のような表示でバージョン番号が表示されれば Git のセットアップは完了です。

```bash
$ git --version
git version 2.21.0 (Apple Git-122)
```

## Git の設定

Git を利用する前に、Git のユーザ設定が必要です。

Git ではバージョン履歴を記録する際に、ユーザ名と Email アドレスが必要になります。 

各環境のターミナルアプリで以下のようなコマンドを実行して、
ユーザ名とEmailアドレスを登録しておきましょう。

```
$ git config --global user.name "hoge"
$ git config --global user.email "hoge@example.com"
```
 
## GitHub のアカウント作成

あわせて、GitHub のアカウント作成も行っておきましょう。

GitHub のサイトから `Sign up` を選択して、GitHub のアカウントを作成することが可能です。

https://github.com/

Git が PC 上でバージョン管理を行うツールなのに対して、
GitHub は Git で管理したバージョン情報をWeb上で確認したり共有したりするためのツールです。

