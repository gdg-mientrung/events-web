import path from "path";
import NuxtConfiguration from "nuxt";
import webpack from "webpack";

const config: NuxtConfiguration = {
  mode: "spa",
  head: {
    title: "starter",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Nuxt TS project" }
    ],
    script: [],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href:
          "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/icon?family=Material+Icons"
      }
    ]
  },
  // loading: { color: '#3B8070' },
  css: ["~/assets/scss/app.scss"],
  plugins: [
    "~/plugins/axios",
    "~/plugins/helpers",
    "~/plugins/firebase",
    "~/plugins/fireauth",
    "~/plugins/antd-ui"
  ],
  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/moment",
    "@nuxtjs/auth",
    "@nuxtjs/vendor"
  ],
  vendor: ["debounce", "ant-design-vue"],
  build: {
    // extractCSS: true,
    // hardSource: true,
    extend(config, ctx) {},
    loaders: [
      {
        test: /\.css$/,
        loader: "vue-style-loader!css-loader"
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url",
        query: {
          limit: 10000,
          name: path.posix.join("/assets", "fonts/[name].[hash:7].[ext]")
        }
      }
    ],
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
      })
    ],
    babel: {
      plugins: [
        ["@babel/plugin-proposal-decorators", { legacy: true }],
        ["@babel/plugin-proposal-class-properties", { loose: true }]
      ]
    }
  },
  loading: {
    color: "#80DDC8",
    height: "2px"
  },
  // auth: {
  //   plugins: ["~/plugins/auth"],
  //   strategies: {}
  // },
  router: {
    middleware: "router-auth"
  }
};

export default config;
