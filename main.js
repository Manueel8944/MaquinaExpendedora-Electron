const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  const window = new BrowserWindow({
    width: 1200,
    height: 700,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    })
    window.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()
})
