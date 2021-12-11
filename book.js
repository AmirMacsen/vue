module.exports = {
    // 书籍信息
    "title": "Vue基础",
    "description": "Vue语法基础",
    "isbn": "0001",
    "author": "amir",
    "lang": "zh-cn",

    //插件列表
    "plugins": ["-lunr", "-search", "search-pro", "code", "theme-hqbook",
        "folding-chapters", "expandable-chapters", "back-to-top-button",
        "halogenpi-staticpagefooter"],

    //插件全局配置
    "pluginsConfig": {
        "halogenpi-staticpagefooter": {
            "wordcount": "%d words",
        },
        "folding-chapters": {},
        "theme-hqbook": {
            // "favicon": "./favicon.ico",
            "logo": "/images/logo.png",
            "search-placeholder": "输入关键字搜索",
            "copyButtons": true,
            "copyLines": true,
            "dragSplitter": true,
            "hide-elements": [
                ".summary .gitbook-link"
            ],
            "flexible-linkcard": {
                "title": "flexible-linkcard",
                "hrefUrl": "https://github.com/HaoqiangChen/gitbook-plugin-flexible-linkcard",
                "target": "_blank",
                // "imgSrc": "./book/logo.png",
                "imgClass": "rect"
            }
        }
    },
    //模板变量
    variables: {}
}



