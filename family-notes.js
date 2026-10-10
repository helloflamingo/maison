import { firebaseConfig } from './firebase-config.js';
const $ = id => document.getElementById(id);
const status = message => { $('note-status').textContent = message; };
const names = {
  'WWMcGIWcq1TzWfwGG9WnNzxmIRD2': 'Family',
  'WfLNxDUylshGhYv9YBOlfCBV5Jm2': 'Family',
  'IzJcjBWFdRSLHrDoswBP09fdwoj1': 'Lola'
};
const allowed = new Set(Object.keys(names));
const loginButton = $('note-login');
const logoutButton = $('note-logout');
const form = $('note-form');
const input = $('note-input');
const send = $('note-send');
const list = $('notes');

async function main() {
  const [{ initializeApp }, authLib, dbLib] = await Promise.all([
    import('https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js'),
    import('https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js'),
    import('https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js')
  ]);
  const app = initializeApp(firebaseConfig);
  const auth = authLib.getAuth(app);
  const db = dbLib.getFirestore(app);
  let unsubscribe = () => {};
  let user = null;
  loginButton.addEventListener('click', () => {
    document.getElementById('maison-login').showModal();
  });
  document.getElementById('login-cancel').addEventListener('click', () => document.getElementById('maison-login').close());
  document.getElementById('login-form').addEventListener('submit', async event => {
    event.preventDefault();
    const email = $('login-email').value.trim();
    const password = $('login-password').value;
    const error = $('login-error');
    error.textContent = '';
    try {
      await authLib.signInWithEmailAndPassword(auth, email, password);
      $('login-password').value = '';
      document.getElementById('maison-login').close();
    } catch (_) { error.textContent = 'Unable to sign in. Please check your email and password.'; }
  });
  logoutButton.addEventListener('click', () => authLib.signOut(auth));
  authLib.onAuthStateChanged(auth, current => {
    unsubscribe(); unsubscribe = () => {};
    user = current && allowed.has(current.uid) ? current : null;
    loginButton.hidden = !!current;
    logoutButton.hidden = !current;
    input.disabled = !user;
    send.disabled = !user;
    list.replaceChildren();
    if (!current) { list.textContent = 'Sign in to see the family notes.'; status('Private family board'); return; }
    if (!user) { list.textContent = 'This account is not on the family list.'; status('Family access required'); return; }
    status('Signed in · ' + (names[user.uid] || 'Family'));
    const q = dbLib.query(dbLib.collection(db, 'familyNotes'), dbLib.orderBy('createdAt', 'desc'), dbLib.limit(2));
    unsubscribe = dbLib.onSnapshot(q, snapshot => {
      list.replaceChildren();
      if (snapshot.empty) { list.textContent = 'No messages yet. Say hello!'; return; }
      snapshot.forEach(doc => {
        const data = doc.data();
        const item = document.createElement('div'); item.className = 'note';
        const head = document.createElement('div'); head.className = 'note-head';
        const author = document.createElement('strong'); author.textContent = names[data.uid] || 'Family';
        const time = document.createElement('time');
        time.textContent = data.createdAt?.toDate?.().toLocaleTimeString('en-GB', {hour:'2-digit', minute:'2-digit'}) || 'Just now';
        const body = document.createElement('div'); body.className = 'note-body'; body.textContent = data.text || '';
        head.append(author, time); item.append(head, body); list.append(item);
      });
    }, error => { status('Unable to load notes. Check Firestore permissions.'); console.error(error); });
  });
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!user) return;
    const text = input.value.trim();
    if (!text || text.length > 500) return;
    send.disabled = true;
    try {
      await dbLib.addDoc(dbLib.collection(db, 'familyNotes'), {
        uid: user.uid, text, createdAt: dbLib.serverTimestamp()
      });
      input.value = '';
    } catch (error) { status('Message not sent. Check permissions or connection.'); console.error(error); }
    finally { send.disabled = false; }
  });
}
main().catch(error => { status('Firebase could not connect.'); console.error(error); });
