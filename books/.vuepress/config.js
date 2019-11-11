// .vuepress/config.js
module.exports = {
    title: 'Terminal での Git/Github入門 - Netlify でWebサイト公開',
    description: `
Terminal (黒い画面) を使っての Git/Github の使い方をマスターします。

Githubを操作しながら Web サイトの公開ができる Netlify を利用して、 実際のWebサイト制作をイメージしながら Git の操作を体験してみましょう。

Git の基本操作 (コミット・ブランチの操作)
Github の使い方 （push / pull）
GIthub のチームでの使い方 ( Issue / Pull Request )    `,
    head: [
        ['script', { src: "https://static.codepen.io/assets/embed/ei.js"}]
    ],
    locales: {
        '/': {
            lang: 'ja',
        },
    },
    markdown: {
        anchor: {
            level: [1,2,3],
            slugify: (s) => encodeURIComponent(String(s).trim().toLowerCase().replace(/\s+/g, '-')),
            permalink: true,
            permalinkBefore: true,
            permalinkSymbol: '#'
        },
        config: md => {
            md.use(require('markdown-it-playground'))
        },
        linkify: true
    },
    themeConfig: {
        nav: [
            { text: 'Lec Café', link: 'https://leccafe.connpass.com/' },
        ],
        sidebar: [
            '/',
            '/0.Gitの環境構築/',
            '/1_terminal/',
            '/2_start_github/',
            '/3.branch/',
            '/4.github_workflow/',
            {
                title: 'いろいろなGitコマンド',
                children: [
                    '/8_git_status/',
                    '/8_git_remote/',
                    '/8_git_push/',
                ]
            },
            {
                title: '補足',
                children: [
                    '/9_netlify/',
                    '/9_github_issues/',
                ]
            },
        ],
        repo: 'lec-cafe/book_github_intro',
        repoLabel: 'Github',
        docsDir: 'books',
        editLinks: true,
        editLinkText: 'ページに不明点や誤字等があれば、Github にて修正を提案してください！'
    }
}
