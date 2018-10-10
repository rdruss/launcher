const path = require('path');

module.exports = {
    getExampleFilename(componentPath) {
        return componentPath.replace(/\.tsx?$/, '.examples.md')
    },
    propsParser: require('react-docgen-typescript').parse,
    require: [path.join(__dirname, 'src/index.css')],
    webpackConfig: require('react-scripts-ts/config/webpack.config.dev'),
};