const path = require('path');

module.exports = {
    propsParser: require('react-docgen-typescript').parse,
    require: [path.join(__dirname, 'src/index.css')],
    getExampleFilename(componentPath) {
        return componentPath.replace(/\/([^\/]*)\.tsx?$/, '/__examples__/$1.md')
    },
    webpackConfig: require('react-scripts-ts/config/webpack.config.dev'),
    exampleMode: 'collapse',
    usageMode: 'collapse',
    pagePerSection: true,
    sections: [
        {
            name: 'Generic Components',
            components: 'src/shared/components/**/*.tsx',
        },
        {
            name: 'Wizard Components',
            components: 'src/app/components/wizard/**/*.tsx',
        }
    ],
};