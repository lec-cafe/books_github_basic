---
permalink: /terminal
---

# ターミナルの基本操作

## ターミナルの基本操作

Gitの操作を覚える前にまずはターミナルの操作を理解しましょう。

ターミナルは 文字コマンドベースで PC を操作するツールです。

Windows の Explorer や Mac の Finder のように、ターミナルでも「今いるフォルダ」という概念が存在します。

ターミナルで、現在のフォルダを確認するには `pwd` コマンドを利用します。

```bash
$ pwd 
```

ターミナルを開いたときに表示されるフォルダは、`ホームディレクトリ` と呼ばれます。

現在のターミナルで開いているフォルダを Explorer や Finder で確認するには、

Mac の場合、

```bash
$ open .
```

Windows の場合、

```bash
$ explorer .
```

### ディレクトリの作成、ファイルの作成

`mkdir` コマンドを利用して、現在のディレクトリに、新しいフォルダを作成することができます。

```bash
$ mkdir sample_site
$ mkdir sample_site/public
```

`tough` コマンドを利用して、現在のディレクトリに新しいファイルを作成することができます。

```bash
$ touch sample_file.txt
$ touch sample_site/public/index.html
```

`/` を利用して深い階層のディレクトリにもディレクトリ、ファイルを作成することが可能です。

### ディレクトリの確認・移動

`ls` コマンドで、ディレクトリを移動することができます。

`ls` コマンドで、 `ls -al` 

```bash
$ ls -al 
```

現在のディレクトリは、 `cd` で移動することができます。

cd する

```bash
$ cd sample_site
```
