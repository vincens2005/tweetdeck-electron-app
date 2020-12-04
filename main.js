// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')
const { protocol } = require('electron');
var Cookies;

const Store = require('./cookies.js');
protocol.registerSchemesAsPrivileged([{
    scheme: 'app',
    privileges: {
        standard: true,
        secure: true
    }
}]);
function createWindow () {
  
  // Create the browser window.

  var widthandheight = Cookies.get('windowBounds');
  const mainWindow = new BrowserWindow({
    width: widthandheight.width,
    height: widthandheight.height,
    backgroundColor:"#1DA1F2",
    icon: path.join(__dirname, 'assets/icons/png/512x512.png'),
    webPreferences: {
      webviewTag: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadURL('https://tweetdeck.twitter.com')
  mainWindow.setMenu(null)
  mainWindow.on('resize', () => {
    let { width, height } = mainWindow.getBounds();
    Cookies.set('windowBounds', { width, height });
  });
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
   Cookies = new Store({
    configName: 'widthh',
    defaults: {
      windowBounds: { width: 1000, height: 800 }
    }
  });
  protocol.registerFileProtocol('app', (request, callback) => {
    const url = request.url.substr(6);
    callback({
        path: path.normalize(`${__dirname}/${url}`)
    });
}, (error) => {
    if (error) console.error('Failed to register protocol');
});
  createWindow()
  
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
