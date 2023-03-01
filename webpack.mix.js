import {NodePolyfillPlugin} from "node-polyfill-webpack-plugin"
mix.webpackConfig(webpack => {
    return {
        plugins: [
            new NodePolyfillPlugin()
        ]
    };
});