const pkg = require('./package')

module.exports = {
  // mode: 'universal',
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      // { httpEquiv: "Access-Control-Allow-Origin", content: "*" },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    '@nuxtjs/vuetify',
  ],
  env: {
    WS_URL: process.env.WS_URL || 'http://127.0.0.1:3000'
  },
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },
  // vuetify: {
  //   theme: {
  //     primary: '#1976D2',
  //     secondary: '#424242',
  //     accent: '#82B1FF',
  //     error: '#FF5252',
  //     info: '#2196F3',
  //     success: '#4CAF50',
  //     warning: '#FFC107'
  //   }
  // },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {

    }
  },
  generate: {
    dir: '../backend/public/game'
    // dir: './_buildTest'
  }
}
