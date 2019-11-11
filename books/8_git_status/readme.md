---
permalink: /git_status
---

# git status 

## リポジトリとローカルの状態の差分を確認する

`git status` は リポジトリとローカルの状態の差分を確認するコマンドです。

デフォルトの表示では情報量が多く見ずらいので、通常は `-s` をつけて簡易版表示で確認することが多いでしょう。

```bash
$ git status -s
 M public/contact.html
M  public/index.html
A  public/logo.png
?? public/sample.png
```

一列目に文字が表示されている場合、そのファイルがaddされていることを表しています。
二列目に文字が表示されている場合、そのファイルがまだ add されていないことを表しています。

それぞれのマークは以下のような意味合いを持っています。

- `M` 修正されたファイル
- `A` リポジトリに新規追加されたファイル
- `?` リポジトリにまだ追加されていないファイル
- `U` コンフリクトしたファイル

また、`b` オプションと合わせることで現在のブランチ名も表示することが可能です。

```bash
$ git status -sb
# master
 M public/contact.html
M  public/index.html
A  public/logo.png
?? public/sample.png
```
