# Maison v0.9 — Maison Mystère

This release adds a daily shared family riddle under Rambo’s Corner. Stephen, Vanessa and Lola each enter their answer; successful solves are displayed in chronological order across devices. All previous features are retained.

## Installation

1. Upload **all files** in this package to the root of the existing GitHub repository, replacing files of the same names. Keep `firebase-config.js` (it contains the existing public Firebase project configuration).
2. **IMPORTANT:** In Firebase Console → Firestore Database → Rules, replace the current rules with the content of `firestore.rules` and click **Publish**. These rules preserve Family Notes and add the new `riddleSolves` collection. If your existing rules include other custom permissions, merge rather than blindly replace.
3. Refresh Maison after GitHub Pages finishes publishing. iPad home-screen users may need to close and reopen the app to pick up the updated service worker.

## How it works

- The riddle changes at **midnight Stockholm time**, with a curated bank of 60 riddles (repeats after 60 days).
- The same riddle is displayed to all devices. A correct guess saves one document per family member per day to Firestore.
- Names are ordered by Firestore creation timestamp; ties use UID as a deterministic fallback.
- Incorrect guesses stay private; only successful solves are stored.
- The riddle answer is checked in browser JavaScript, so this is a **friendly family game, not a cheat-proof competition**.
- If you deploy the website before publishing the new rules, the puzzle will display but scores cannot be saved.
