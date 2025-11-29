export const overview = [
  { key: 0, text: "OVERVIEW:" },
  {
    key: 1,
    text: `This application has it's own built-in database. Because it is internal, it could be overwritten by future updates, or accidental uninstallation and reinstallation of the app.`,
  },
  {
    key: 2,
    text: `To mitigate against this, you can create a backup of your menu on your internal storage, which is completely outside of, and unaffected by, this application.`,
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
