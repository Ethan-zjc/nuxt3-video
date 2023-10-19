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
  }
})
