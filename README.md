# Maison v0.5 — Family Notes

Replaces headlines with a compact, shared Family Notes panel. Shows the two latest notes, with a short composer. Weather, French radio, Lola in Lund, Ingarö and Rambo remain.

## Publish
Upload the contents of this folder to your existing `helloflamingo/maison` GitHub repository, **replacing** `index.html` and adding `family-notes.js`, `firebase-config.js` and `firestore.rules`. GitHub Pages republishes automatically.

## Important: Firebase setup is required before messages work
GitHub Pages cannot store shared messages by itself. Until configured, the panel will clearly say `Not connected yet`. No fake messages are shown.

1. At https://console.firebase.google.com create a Firebase project and add a **Web app**. Copy the app's configuration values into `firebase-config.js`.
2. In Firebase **Authentication → Sign-in method**, enable **Email/Password**. In **Authentication → Users**, create accounts for each family member using their own email addresses and passwords. Never put passwords into GitHub.
3. In **Firestore Database**, create a database. Before sharing the site, open **Rules**, paste the contents of `firestore.rules`, and replace the two placeholder email addresses with the exact account emails. Publish the rules. **Do not use open/test-mode rules on this public site.**
4. In Authentication → Settings → Authorized domains, ensure `helloflamingo.github.io` is authorized if needed for your sign-in setup.
5. In GitHub, upload the edited `firebase-config.js` and the other v0.5 files. Open Maison, tap Sign in, and enter your account details. Lola signs in separately from Lund. The latest two notes sync in real time.

**Note:** This example uses email/password sign-in. Some Firebase projects may not set `email_verified` to true automatically for manually created users. If you use console-created accounts, verify the users' emails through Firebase's supported verification flow before expecting Firestore access. Do not weaken the rules to bypass family-only access.

The repository is public, but the notes are not readable without an authorized Firebase account **when these rules are correctly published**. Web Firebase config is not a secret. Keep all passwords private.
