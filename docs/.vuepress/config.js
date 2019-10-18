// .vuepress/config.js
module.exports = {
    markdown: {
        linkify: true
        // // options for markdown-it-anchor
        // anchor: { permalink: false },
        // // options for markdown-it-toc
        // toc: { includeLevel: [1, 2] },
        // extendMarkdown: md => {
        //     // use more markdown-it plugins!
        //     md.use(require('markdown-it-xxx'))
        // }
    },
    themeConfig: {
        sidebar: [
            '/',
            '/0.Gitの環境構築/',
            '/1.ターミナルの基本操作/',
            '/2_GitHubにコードをUPする/',
        ]
    }
}
