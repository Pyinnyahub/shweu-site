// One language per page (2026-11-06). English is the default; /my/... is Myanmar.
// A visitor who chose Myanmar before (switch or fallback pages, key "shweu_lang") is sent to the
// Myanmar page unless the URL says ?lang=en. Clicking EN / မြန်မာ saves the choice.
(function(){
  var KEY="shweu_lang", path=location.pathname, isMy=path.indexOf("/my/")===0;
  var q=new URLSearchParams(location.search).get("lang");
  var saved="";try{saved=localStorage.getItem(KEY)||"";}catch(e){}
  if(q==="en"||q==="my"){try{localStorage.setItem(KEY,q);}catch(e){} saved=q;}
  if(!isMy&&saved==="my"&&q!=="en"){location.replace("/my"+path+location.hash);return;}
  document.addEventListener("click",function(e){
    var a=e.target.closest&&e.target.closest("a[data-lang]");
    if(a){try{localStorage.setItem(KEY,a.getAttribute("data-lang"));}catch(err){}}
  });
})();
