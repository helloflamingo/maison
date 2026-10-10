import { firebaseConfig } from './firebase-config.js';
const $ = id => document.getElementById(id);
const status = text => $('note-status').textContent = text;
const ready = firebaseConfig.apiKey !== 'REPLACE_ME' && firebaseConfig.projectId !== 'REPLACE_ME';
if (!ready) { status('Not connected yet · See README'); $('note-login').hidden=true; }
else start().catch(e=>status('Connection failed: '+e.message));
async function start(){
 const [{initializeApp},{getAuth,onAuthStateChanged,signInWithEmailAndPassword,signOut},{getFirestore,collection,query,orderBy,limit,onSnapshot,addDoc,serverTimestamp}] = await Promise.all([
 import('https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js'),
 import('https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js'),
 import('https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js')]);
 const app=initializeApp(firebaseConfig),auth=getAuth(app),db=getFirestore(app);
 let stop=()=>{},user=null;
 $('note-login').onclick=async()=>{
   const email=prompt('Family email address:');if(!email)return;
   const password=prompt('Password:');if(!password)return;
   try{await signInWithEmailAndPassword(auth,email.trim(),password)}catch(e){status('Sign in failed. Check your email/password.');}
 };
 $('note-logout').onclick=()=>signOut(auth);
 onAuthStateChanged(auth,u=>{
   stop();user=u;
   $('note-login').hidden=!!u;$('note-logout').hidden=!u;
   $('note-input').disabled=!u;$('note-send').disabled=!u;
   if(!u){$('notes').textContent='Sign in to read family notes.';status('Private family board · Sign in');return;}
   status('Connected as '+(u.email||'family'));
   const q=query(collection(db,'familyNotes'),orderBy('createdAt','desc'),limit(2));
   stop=onSnapshot(q,snap=>{
     $('notes').replaceChildren();
     if(snap.empty){$('notes').textContent='No notes yet. Say hello!';return;}
     snap.forEach(d=>{const x=d.data();const note=document.createElement('div');note.className='note';
       const head=document.createElement('div');head.className='note-head';
       const author=document.createElement('strong');author.textContent=x.author||'Family';
       const time=document.createElement('time');time.textContent=x.createdAt?.toDate?.().toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'})||'Just now';
       const body=document.createElement('div');body.className='note-body';body.textContent=x.text||'';
       head.append(author,time);note.append(head,body);$('notes').append(note);
     });
   },()=>status('Cannot load notes. Check Firestore rules.'));
 });
 $('note-form').onsubmit=async e=>{
   e.preventDefault();if(!user)return;
   const field=$('note-input'),text=field.value.trim();if(!text||text.length>280)return;
   $('note-send').disabled=true;
   try{await addDoc(collection(db,'familyNotes'),{text,author:user.email.split('@')[0],authorUid:user.uid,createdAt:serverTimestamp()});field.value='';}
   catch(e){status('Could not send. Check permissions.');}
   finally{$('note-send').disabled=false;}
 };
}
