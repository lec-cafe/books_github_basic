---
permalink: /git_remote
---

# git remote 

## リモートを管理する 

`git remote` は Git に登録されている リモートリポジトリの一覧を管理するためのコマンドです。

`-v` は 登録されている リモートリポジトリの一覧を表示するためのコマンドです。

```bash
$ git remote -v
```

`remote add` コマンドは 新しくリモートを登録します。引数にリモート名と リモートのURL を取ります。

```bash
$ git remote add {REMOTE_NAME} {REMOTE_URL}
```

`remote rm` コマンドはすでに追加されたリモートを削除します。引数に削除する対象のリモート名をとります。

```bash
$ git remote rm {TARGET_REMOTE_NAME}
```

`remote rename` コマンドはすでに追加されたリモートの名前を変更します。引数に名前を変更する対象のリモート名と新しいリモート名を取ります。

```bash
$ git remote rename {TARGET_REMOTE_NAME} {NEW_REMOTE_NAME}
```
