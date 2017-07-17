var path = require('path');
var webpack = require('webpack');

module.exports =
{
    context: __dirname + "/src",
    entry: {
      javascript: "./app.js",
      html: "./index.html",
    },
    output:
	{
        path: __dirname+'/dist',
        filename: "app.js"
    },
    module:
	{
        loaders:
		[
	    	{ test: /(\.jsx$|\.js$)/, loaders: ['react-hot-loader', "babel?presets[]=es2015&presets[]=stage-0&presets[]=react"], exclude: /node_modules/ },
        {
          test: /\.html$/,
          loader: "file?name=[name].[ext]",
        },
	    	{ test: /\.css$/, loader: "style!css", exclude: /node_modules/ },
 {
          test: /.*\.(gif|png|jpe?g|svg)$/i,
          loaders: [
            'file?hash=sha512&digest=hex&name=[hash].[ext]',
            'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
          ]
        }
        ]
    }
};
