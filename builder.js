
const exe = require('@angablue/exe');

const build = exe({
    entry: './index.js',
    out: './dist/Heliodor.exe',
    pkg: [ '--public'], // Specify extra pkg arguments
    version: '2.4.2',
    target: 'node16-win-x64',
    icon: './dist/icon.ico', // Application icons must be in .ico format
    properties: {
        FileDescription: 'best discord selfbot',
        ProductName: 'Heliodor',
        LegalCopyright: 'Heliodor https://ktntkot.xyz/',
        OriginalFilename: 'Heliodor.exe'
    }
});

build.then(() => console.log('Build completed!'));