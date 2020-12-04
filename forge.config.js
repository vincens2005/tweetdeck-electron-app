module.exports = {
    makers: [
        {
            name: '@electron-forge/maker-deb',
            config: {
              options: {
                maintainer: 'Cukmekerb',
                homepage: 'https://cukmekerb.github.io'
              }
            }
          },
          {
            name: '@electron-forge/maker-flatpak',
            config: {
              options: {
                categories: ['Utility']
              }
            }
          }
    ]
}