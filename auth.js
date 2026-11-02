'use strict';
// Local interface lock only: data remains on this device, without a server.
window.Auth=(()=>{
 const EMAIL='leonardkitoko6@gmail.com';
 const SALT='c6a0f250760c96a944b3e0a843be90ee';
 const HASH='db3192dce7f5a713b9e91666b6fbada21fec47e04cfe506580b1ede17e97d8ea';
 const KEY='every-send-session',DURATION=30*60*1000;
 let expires=0,timer,attempt=0;
 try{const saved=JSON.parse(sessionStorage.getItem(KEY));if(saved&&Number.isFinite(saved.expires)&&saved.expires>Date.now()&&saved.expires<=Date.now()+DURATION)expires=saved.expires}catch{}
 const gate=document.querySelector('#auth-screen'),form=document.querySelector('#login-form'),error=document.querySelector('#login-error');
 function isAuthenticated(){return expires>Date.now()}
 function sync(){const logged=isAuthenticated();document.body.classList.toggle('locked',!logged);gate.hidden=logged;document.querySelector('.shell').inert=!logged;document.querySelector('#sidebar').inert=!logged;clearTimeout(timer);if(logged)timer=setTimeout(logout,Math.max(1,expires-Date.now()))}
 function logout(){attempt++;expires=0;try{sessionStorage.removeItem(KEY)}catch{}if(window.setMenu)window.setMenu(false);document.querySelector('#modal').close();document.querySelector('#content').replaceChildren();document.querySelector('#main').replaceChildren();document.querySelector('#nav').replaceChildren();form.reset();form.querySelector('[type=submit]').disabled=false;form.querySelector('[type=submit]').textContent='Se connecter';error.textContent='';sync();document.querySelector('#login-email').focus()}
 form.addEventListener('submit',async e=>{
  e.preventDefault();const current=++attempt,button=form.querySelector('[type=submit]');error.textContent='';button.disabled=true;button.textContent='Connexion…';
  const email=form.elements.email.value.trim().toLowerCase(),password=form.elements.password.value;
  try{
   if(!window.crypto?.subtle)throw new Error('crypto-unavailable');
   const bytes=hex=>new Uint8Array(hex.match(/../g).map(v=>parseInt(v,16)));
   const key=await crypto.subtle.importKey('raw',new TextEncoder().encode(password),'PBKDF2',false,['deriveBits']);
   const result=new Uint8Array(await crypto.subtle.deriveBits({name:'PBKDF2',salt:bytes(SALT),iterations:210000,hash:'SHA-256'},key,256));
   if(current!==attempt)return;
   const expected=bytes(HASH);let difference=0;for(let i=0;i<expected.length;i++)difference|=result[i]^expected[i];
   if(email!==EMAIL||difference!==0){error.textContent='Adresse e-mail ou mot de passe incorrect.';return}
   expires=Date.now()+DURATION;try{sessionStorage.setItem(KEY,JSON.stringify({expires}))}catch{}
   form.reset();form.elements.password.type='password';document.querySelector('#password-toggle').textContent='Afficher';document.querySelector('#password-toggle').setAttribute('aria-pressed','false');sync();if(window.render)window.render();if(window.setMenu)window.setMenu(false);document.querySelector('#main').focus();
  }catch{if(current===attempt)error.textContent='La connexion locale nécessite un navigateur récent sur HTTPS ou localhost.'}
  finally{if(current===attempt){button.disabled=false;button.textContent='Se connecter'}}
 });
 document.querySelector('#password-toggle').addEventListener('click',e=>{const input=form.elements.password,visible=input.type==='password';input.type=visible?'text':'password';e.currentTarget.textContent=visible?'Masquer':'Afficher';e.currentTarget.setAttribute('aria-pressed',String(visible))});
 document.addEventListener('visibilitychange',()=>{if(!document.hidden&&expires&&!isAuthenticated())logout()});
 sync();return {isAuthenticated,logout};
})();
