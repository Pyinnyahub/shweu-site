// Shared profile page: https://shweu.app/p/?u=<profile id> (2026-11-17).
// Shows the name, photo and bio of a Pro / Business / ShweU profile and opens the app with
// shweu://profile/<id>. Any other case (bad id, plain user, network error) keeps the
// general text and still opens the app. Only the publishable key is used here: the same
// public key the app ships, and profiles are readable by everyone (RLS "profiles: anyone reads").
(function(){
  var API="https://lnhqjlhxvskpejhxlqsn.supabase.co";
  var KEY="sb_publishable_3H6uUUWUjaxuU8TBu7LTkA_eAzhsRJC";
  var T={
    my:{open:"ShweU app မှာ ဖွင့်မည်",general:"ဒီပရိုဖိုင်ကို ShweU app မှာ ကြည့်ပါ။",noapp:"App မရှိသေးဘူးလား",soon:"မကြာမီ ရောက်လာပါမယ်",privacy:"ကိုယ်ရေးမူဝါဒ",terms:"စည်းကမ်း",
      roles:{pro:"ကျွမ်းကျင်သူ",business:"လုပ်ငန်းရှင်",admin:"ShweU"}},
    en:{open:"Open in the ShweU app",general:"See this profile in the ShweU app.",noapp:"Don't have the app yet?",soon:"Coming soon",privacy:"Privacy",terms:"Terms",
      roles:{pro:"Pro",business:"Business",admin:"ShweU"}}
  };
  var q=new URLSearchParams(location.search);
  function norm(l){l=(l||"").toLowerCase();return /^(my|mya|bur)(-|_|$)/.test(l)?"my":(l?"en":"");}
  var lang=q.get("lang");
  lang=(lang==="my"||lang==="en")?lang:"";
  var saved="";try{saved=localStorage.getItem("shweu_lang")||"";}catch(e){}
  if(!lang&&(saved==="my"||saved==="en"))lang=saved;
  if(!lang){var ls=navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language||""];lang=norm(ls[0])||"en";}
  var t=T[lang];
  function el(id){return document.getElementById(id);}
  document.documentElement.lang=lang;
  el("open").textContent=t.open;
  el("about").textContent=t.general;
  el("noapp").textContent=t.noapp;
  el("soon").textContent=t.soon;
  el("privacy").textContent=t.privacy;
  el("terms").textContent=t.terms;
  if(lang==="my"){el("privacy").href="/my/privacy/";el("terms").href="/my/terms/";}
  document.querySelectorAll(".lang a").forEach(function(a){
    var l=a.getAttribute("data-lang"); if(l===lang)a.className="on";
    var p=new URLSearchParams(location.search); p.set("lang",l);
    a.href=location.pathname+"?"+p.toString();
    a.addEventListener("click",function(){try{localStorage.setItem("shweu_lang",l);}catch(e){}});
  });

  var id=(q.get("u")||"").toLowerCase();
  if(!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(id))return;
  el("open").href="shweu://profile/"+id;

  fetch(API+"/rest/v1/profiles?id=eq."+id+"&select=display_name,about,avatar_path,role",{headers:{apikey:KEY}})
    .then(function(r){return r.ok?r.json():[];})
    .then(function(rows){
      var p=rows&&rows[0];
      if(!p||!t.roles[p.role])return;
      var name=(p.display_name||"").trim();
      if(!name)return;
      el("name").textContent=name;
      document.title=name+" — ShweU";
      el("role").textContent=t.roles[p.role];
      el("role").hidden=false;
      var about=(p.about||"").trim();
      if(about)el("about").textContent=about;
      var path=(p.avatar_path||"").trim();
      if(path){
        var img=el("avatar");
        img.onload=function(){img.hidden=false;el("avatar-none").setAttribute("hidden","");};
        img.src=API+"/storage/v1/object/public/avatars/"+path.split("/").map(encodeURIComponent).join("/");
      }
    })
    .catch(function(){});
})();
