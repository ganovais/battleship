import path from "path";

export default {
   mode: "development",
   entry: [
      "./src/index.js",
      "./src/pages/login/login.controller.js",
      "./src/pages/components/header/header.controller.js",
      "./src/pages/components/header/header.module.js",
   ],
   output: {
      path: path.resolve("public"),
      filename: "bundle.js",
   },
   devServer: {
      static: {
         directory: path.resolve("public"),
      },
      port: 3000,
      // open: true,
      hot: true,
      compress: true,
      historyApiFallback: true,
   },
   module: {
      rules: [
         {
            test: /\.css$/i,
            include: path.resolve('src'),
            use: ['style-loader', 'css-loader'],
          },
         {
            test: /\.m?js/,
            type: "javascript/auto",
         },
         {
            test: /\.m?js/,
            resolve: {
               fullySpecified: false,
            },
         },
         {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
               loader: "babel-loader",
               options: {
                  presets: ["@babel/preset-env", "@babel/preset-react"],
               },
            },
         },
         {
            test: /\.html$/i,
            loader: "html-loader",
            exclude: /(node_modules|bower_components)/,
            options: {
               esModule: false,
            },
         },
      ],
   },
};
