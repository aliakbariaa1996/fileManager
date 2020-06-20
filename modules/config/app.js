const path = require('path');

module.exports = {
    baseUrl: "",
    cdnUrl: "",
    paths: {
        controllers: {
            api: path.resolve('./modules/controllers/api')
        },
        models: {
            api: path.resolve('./modules/models/api')
        },
        helpers: {
            api: path.resolve('./modules/helpers/api'),
        },
        core: {
            api: path.resolve('./modules/core/api')
        },
        routes: {
            api: path.resolve('./modules/routes/api')
        },
        middlewares: {
            api: path.resolve('./modules/routes/middlewares/api')
        },
        transforms: {
            api: path.resolve('./modules/transforms/api')
        },
        configs: {
            pathBase: path.resolve('./modules/config')
        }
    },
    upload: {
        directoryName: "cdn.localhost/",
        basePath: './public/uploads/',
        avatarPath:'avatar/',
        fileManagerPath:'fileList/',
        typeFile:[
            'image/jpg',
            'image/png',
            'image/jpeg',
            'image/*',
            'video/mkv',
            'video/mp3',
            'video/*'
        ],
        typeAvatar:[
            'image/jpg',
            'image/png',
            'image/jpeg',
            'image/*'
        ]
    },
    paginateLimit : 20,
    regexEmail: '/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/',
};