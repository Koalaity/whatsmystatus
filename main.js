
const {app, BrowserWindow, Notification, Menu, Tray} = require('electron');
const rpc = require('discord-rich-presence');
const trayMenu = Menu.buildFromTemplate([
  {label: 'Show', click: createWindow, visible: false},
  {label: 'Quit', click: app.quit}
]);


function createWindow() {
  trayMenu.items[0].visible = false;
  tray.setContextMenu(trayMenu);
  let window = new BrowserWindow({ width: 800, height: 600 });
  window.loadFile('pages/index.html');
}

app.on('ready', () => {
  tray = new Tray('resources/icon.png');
  tray.setToolTip("WhatsMyStatus");
  tray.setContextMenu(trayMenu);
  createWindow();
});

app.on('window-all-closed', () => {
  trayMenu.items[0].visible = true;
  tray.setContextMenu(trayMenu);
  let stillOpen = new Notification({
    title: "WhatsMyStatus",
    body: "Hey, WhatsMyStatus is still running in your system tray!"
  });
  stillOpen.show();
});
