module.exports = {
    // presets: ['@vue/app'],
    presets: ['@vue/cli-plugin-babel/preset'],
    plugins: [
        [
            'import',
            {
                libraryName: 'vant',
                libraryDirectory: 'es',
                style: name => `${name}/style/less`
            },
            'vant'
        ]
    ]
};
