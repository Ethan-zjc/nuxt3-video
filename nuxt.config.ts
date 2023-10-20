// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: ['@element-plus/nuxt', '@nuxtjs/i18n', 'dayjs-nuxt'],
    i18n: {
        vueI18n: './i18n.config.ts'
    },
    css: [
        'element-plus/dist/index.css',
        'element-plus/theme-chalk/display.css',
        '@/assets/css/main.css',
    ],
    app: {
        head: {
            viewport: 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no',
            title: '影视CMS-Nodejs快速搭建影视类网站',
            meta: [
                { name: 'keywords', content: '影视,最新电影，最新电视剧' },
                { name: 'description', content: '影视更新最快的影视网站之一，收集了全网最新高分电影,电视剧,综艺,动漫等热播剧目免费在线观看！' }
            ],
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
            ]
        }
    },
    nitro: {
        // 客户端静态文件代理
        devProxy: {
            '/server': {
                target: 'http://api.yinchunyu.com',
                changeOrigin: true
            },
        },
        // 该配置用于服务端请求转发
        routeRules: {
            '/server/**': {
                proxy: 'http://api.yinchunyu.com/**'
            }
        }
    },
    runtimeConfig: {
        public: {
            baseUrl: '/server/'
        }
    },
    // 构建后不使用样式内联
    experimental: {
        inlineSSRStyles: false,
    }
})
