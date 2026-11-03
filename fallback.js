(function(){
  var T={
    my:{noapp:"App မရှိသေးဘူးလား",soon:"မကြာမီ ရောက်လာပါမယ်",open:"ShweU app ဖွင့်မည်",privacy:"ကိုယ်ရေးမူဝါဒ",terms:"စည်းကမ်း",
      confirm:["အီးမေးလ် အတည်ပြုပြီးပါပြီ","အီးမေးလ် အတည်ပြုပြီးပါပြီ။ ShweU app ကိုဖွင့်ပြီး ဝင်ရောက်ပါ။"],
      "reset-password":["စကားဝှက် အသစ်ပြောင်းရန်","စကားဝှက်အသစ် ထည့်ဖို့ ShweU app ကို ဖွင့်ပါ။"],
      expired:["လင့်ခ် သက်တမ်းကုန်သွားပါပြီ","ဒီလင့်ခ်က သက်တမ်းကုန်သွားပြီ (သို့) သုံးပြီးသား ဖြစ်နေပါတယ်။ ShweU app ထဲကနေ လင့်ခ်အသစ် တောင်းပါ။"]},
    en:{noapp:"Don't have the app yet?",soon:"Coming soon",open:"Open ShweU app",privacy:"Privacy",terms:"Terms",
      confirm:["Email confirmed","Your email is confirmed. Open the ShweU app and sign in."],
      "reset-password":["Reset your password","Open the ShweU app to choose a new password."],
      expired:["This link has expired","The link has expired or was already used. Request a new link in the ShweU app."]}
  };
  var q=new URLSearchParams(location.search), h=new URLSearchParams(location.hash.replace(/^#/,""));
  function g(k){return q.get(k)||h.get(k)||"";}
  function norm(l){l=(l||"").toLowerCase();return (/^(my|mya|bur)\b/.test(l)||/^(my|mya|bur)(-|_|$)/.test(l))?"my":(l?"en":"");}
  var lang=g("lang");
  lang=(lang==="my"||lang==="en")?lang:"";
  var saved="";try{saved=localStorage.getItem("shweu_lang")||"";}catch(e){}
  if(!lang&&(saved==="my"||saved==="en"))lang=saved;
  if(!lang){var ls=navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language||""];lang=norm(ls[0])||"en";}
  var state=document.body.getAttribute("data-state");
  var err=g("error")+" "+g("error_code");
  // Supabase reports a used/expired link as error=access_denied&error_code=otp_expired (hash or query).
  if(/access_denied|otp_expired|invalid|expired/.test(err)) state="expired";
  var link={confirm:"shweu://confirm","reset-password":"shweu://reset-password",expired:"shweu://"}[state];
  // Pass Supabase tokens/code through to the app so it can finish sign-in (not for expired).
  if(state!=="expired"){
    if(location.hash.length>1&&h.get("access_token")) link+=location.hash;
    else if(q.get("code")) link+="?code="+encodeURIComponent(q.get("code"));
  }
  if(state==="expired"&&document.body.getAttribute("data-state")!=="expired"){
    var b=document.querySelector(".fb-badge");
    b.style.background="#F5E6C8";
    b.innerHTML='<svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#6B0F1A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>';
  }
  var t=T[lang];
  document.documentElement.lang=lang;
  document.title=t[state][0]+" — ShweU";
  var m={title:t[state][0],body:t[state][1],open:t.open,noapp:t.noapp,soon:t.soon,privacy:t.privacy,terms:t.terms};
  document.querySelectorAll("[data-t]").forEach(function(e){e.textContent=m[e.getAttribute("data-t")];});
  document.getElementById("open").href=link;
  document.getElementById("code").textContent=link.split(/[?#]/)[0];
  document.querySelectorAll(".lang a").forEach(function(a){
    var l=a.getAttribute("data-lang"); if(l===lang)a.className="on";
    var p=new URLSearchParams(location.search); p.set("lang",l);
    a.href=location.pathname+"?"+p.toString()+location.hash;
    a.addEventListener("click",function(){try{localStorage.setItem("shweu_lang",l);}catch(e){}});
  });
})();
