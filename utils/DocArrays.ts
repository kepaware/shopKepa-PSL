//Main:

export const mainOverview = [
  { key: 0, text: `OVERVIEW` },
  {
    key: 1,
    text: `This application provides an easy-to-manage, mobile shopping list.  Simply create a menu of items, and from then on, just select them as needed.`,
  },
  {
    key: 2,
    text: `To edit a menu item, simply press and hold that item's label on the Menu page.`,
  },
  {
    key: 3,
    text: `Selecting items will create your list automatically, with headings for "Main", "Fruit & Veges", "Pet Items" and "General".`,
  },
  {
    key: 4,
    text: `As you collect the items at your store, simply tick them off until the list is empty (or not).`,
  },

  {
    key: 5,
    text: `This app is completely offline, i.e it doesn't require internet access, or use the internet in any way.  Your menu items are stored in an internal database, accessible only on this one device.`,
  },
];

export const recovery = [
  { key: 0, text: `RECOVERY` },
  {
    key: 1,
    text: `Your menu items can be backed up, and restored from, your device's internal storage.  Press the "docs" icon on the Recovery page to learn more.`,
  },
];

export const uninstall = [
  { key: 0, text: `UNINSTALLING` },
  { key: 1, text: `If uninstalling, follow these steps:` },
  { key: 2, text: `1.  Log out. This will send you to the "Log In" page.` },
  { key: 3, text: `2.  Press the "Uninstalling this application" link.` },
  { key: 4, text: `3.  Press the "Delete Database" button that appears.` },
  {
    key: 5,
    text: `This will avoid any possibility of the database not being removed when the app is uninstalled.`,
  },
  { key: 6, text: `4.  Close the app, and go to  "Settings/Apps".` },
  { key: 7, text: `5.  Find the settings for shopkepa-psl.` },
  { key: 8, text: `6.  Select "Storage", and press "Clear Data".` },
  { key: 9, text: `7.  Uninstall the application.` },
  {
    key: 10,
    text: `If you are not planning to reinstall this app and you have backed up your menu from the Recovery page, use your device's file explorer to remove the "menu.txt" file from your chosen folder on your internal storage.`,
  },
];

// Recovery:
export const overview = [
  { key: 0, text: "OVERVIEW:" },
  {
    key: 1,
    text: `This application has it's own built-in database. Because it is internal, it could be overwritten by future updates, or accidental uninstallation and subsequent reinstallation of the app.`,
  },
  {
    key: 2,
    text: `To mitigate against this, you can create a backup of your menu on your device's internal/external storage, which is completely outside of, and unaffected by, this application.`,
  },
  {
    key: 3,
    text: `This will allow you to restore all your menu items in one press of a button, instead of having to re-create each one manually.`,
  },
  {
    key: 4,
    text: `For security, the Save and Restore operations are completely automated, to prevent potentially malicious user intervention.`,
  },
];

export const permissions = [
  { key: 0, text: "PERMISSIONS:" },
  {
    key: 1,
    text: `This application does not automatically have access to your internal storage.`,
  },
  {
    key: 2,
    text: `When saving or restoring, you will be asked to allow access to the folder of your choosing.  This access is permanent, unless you cancel it in Settings.`,
  },
  { key: 3, text: `To revoke the permissions:` },
  { key: 4, text: `1.  Press the "Clear Permissions: button.` },
  { key: 5, text: `2.  Select the "Storage" option.` },
  { key: 6, text: `3.  "Press the "CLEAR ACCESS" button.` },
];

export const saving = [
  { key: 0, text: "SAVING:" },
  { key: 1, text: `1.  Select a folder on your internal storage.` },
  { key: 2, text: `2.  Press the "Allow Access to..." button.` },
  {
    key: 3,
    text: `A recovery file named "menu.txt" will be created in the folder of your choosing, e.g "Downloads".`,
  },
  {
    key: 4,
    text: `Subsequent saves will delete the existing file, and re-create it to avoid any potential duplication of menu items.`,
  },
];

export const restoring = [
  { key: 0, text: "RESTORING:" },
  { key: 1, text: `1.  Select the folder that holds your "menu.txt" file.` },
  { key: 2, text: `2.  Press the "Allow Access to..." button.` },
  { key: 3, text: `3.  Your recovery file will be read, then:` },
  { key: 4, text: `4.  Your internal database will be cleared.` },
  { key: 5, text: `5.  The read items will be written to the database.` },
];

export const contact = [
  { key: 0, text: "CONTACT:" },
  { key: 1, text: `To contact kepaWare, email this address:` },
  { key: 20, text: `kepaware2160@gmail.com` },
];
