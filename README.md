# Maison v0.7 — Rotating Family Notes

GitHub Pages deployment: upload **all files** in this folder to the root of `helloflamingo/maison`, overwriting existing files of the same names. Especially ensure `firebase-config.js`, `family-notes.js`, and `index.html` are uploaded. Do not upload a ZIP as a single file.

The Firebase web app configuration is already included. These are public Firebase app identifiers, not account credentials. Never upload passwords or Firebase service account credentials.

## Firebase prerequisites
- Firebase Authentication Email/Password enabled; family users created.
- Firestore `(default)` database created.
- Firestore rules published allowing only the three approved UIDs to read `familyNotes`, and create `{uid,text,createdAt}` messages with server timestamps. No other fields; updates/deletes blocked.
- No need to manually create a `familyNotes` collection; first message creates it.

## Using it
Open the published Maison URL, tap Sign in, use the email and password set up in Firebase Authentication. Post a note; it should appear on the dashboard of any other signed-in family device. The five most recent messages rotate two at a time every 15 seconds. Rotation pauses while writing, hovering over the notes, or when the page is hidden. New messages appear immediately.

**Name labels:** `family-notes.js` has a `names` mapping for the three approved UIDs. Lola is already labelled; the other two are currently labelled `Family` until you specify their preferred display names. Edit the names in that file and re-upload to GitHub to personalize them.

## Troubleshooting
If the site still says messaging needs setup, hard refresh or reload after the GitHub Pages deployment completes. If sign-in fails, check the account credentials and Firebase Authentication settings. If signed in but no notes appear, check Firestore Rules match the published schema. The page uses Firebase CDN ES modules and needs an internet connection.

## Privacy
GitHub Pages site and its source files are public, including any photos in the repo. Firestore notes remain private only if the restrictive rules stay published. Any authorized family member with access to the site can read all notes.
