---
permalink: /github_issues
---

# GitHub Issue の活用

## GitHub Issue 

GitHub Isseu は、GitHub 上で提供される、タスク管理の機能です。

GitHub の Issues のタブから Issue の機能を利用する事ができます。
`New issue` のボタンから 新しい Issue を登録することができ、
開発上で必要なタスク等をメモすることができます。

Issue には 担当者(Assignees) を設定したり、分類用の Label を設定したりすることも可能で、
一旦作成された Issue には、コメントを付与することも可能です。

### Issue の関連付け

Issue にはそれぞれ番号が割り振られます。

ある Issue の中で別の Issue の番号を記述して、Issue と Issue を相互に紐づけることができます。

Issue の番号を記述する際には `#52` の様に番号の前に `#` を付与して記述します。

`#52` のような番号を記述した側の Issue では、
Issue 番号に自動的にリンクが付与され、 
記述された側の Issue (#52) の方では、リンクを付与した側の Issue の情報が表示されます。

## Issue の自動 Close 

作業が完了した Issue は Close することで Issue の一覧から非表示にすることができます。

Issue は Issue の画面上から Close する他にも Git の操作で自動的に Close 処理を行うことも可能になっています。

例えば コミットコメントに `fix #52` と記述して送信されたコミットを、

GitHub の master ブランチに Push すると #52 の Issue は自動的に Close されます。

Pull Request でも 本文の欄に `fix #52` と記述することで、
Pull Request がマージされた際に自動的に Issue を Close するよう設定することが可能です。

