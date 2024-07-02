// let baseURl='https://www.expedia-api.savvyskymart.com/api/'
let baseURl='http://localhost:8000/'
export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Ride_2_Umrah',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
   { rel:"stylesheet", href:"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css", integrity:"sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==", crossorigin:"anonymous", referrerpolicy:"no-referrer" }
    ]
  },

  router: {
    base: process.env.NODE_ENV == 'development' ? '/' : '/' + '',
    // middleware: ['checkAuth'],
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'ant-design-vue/dist/antd.css','~assets/scss/shortHandClasses.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/antd-ui'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
  ],
  auth: {
    strategies: {
      local: {
        user: {
          property: false,
        },
        login: {
          property: 'token',
        },
        token: {
          property: 'token',
          global: true,
        },
        endpoints: {
          login: {
            // url: 'login',
            // method: 'posts',

            url: 'user',
            method: 'get',
          },
          logout: false,
          user: false,
        },
        tokenRequired: true,
        tokenType: 'bearer',
      },
    },
    redirect: {
      // login: 'auth/login',
      // logout:'auth/login',
      // home: 'admin/dashboard',
    },
    fullPathRedirect: true,
    token: {
      prefix: '_token.',
    },
  },
  axios: {
    baseURL:baseURl,
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
