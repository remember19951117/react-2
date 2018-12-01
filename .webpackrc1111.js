export default {
    entry: "src/index.js",
    env: {
    development: {
      extraBabelPlugins: [
        ["import", { "libraryName": "antd-mobile","style": true }],
        ["import", {"libraryName": "antd", "libraryDirectory": "es", "style": "css" },""]
      ],
      plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: function(){
                    return [px2viewport({viewportWidth: 750})];
                }
            }
        })
    ]
    },
    production: {
      extraBabelPlugins: [
        ["import", { "libraryName": "antd-mobile","style": true }],
        ["import", {"libraryName": "antd", "libraryDirectory": "es", "style": "css" },""]
      ]
    }
  }
}