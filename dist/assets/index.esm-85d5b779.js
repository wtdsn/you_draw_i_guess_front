function o(t,r,s=!1){let e=null,a=!1;return function(){if(a){clearTimeout(e),s?e=setTimeout(()=>{a=!1},t):e=setTimeout(()=>{a=!1,r.apply(this,arguments)},t);return}a=!0,s?(r.apply(this,arguments),e=setTimeout(()=>{a=!1},t)):e=setTimeout(()=>{a=!1,r.apply(this,arguments)},t)}}var p=o;function i(t,r,s=!0){let e=0,a=0;return function(){let n=Date.now();if(n-e>=t){s&&(clearTimeout(a),a=0),r.apply(this,arguments),e=n;return}s&&!a&&(a=setTimeout(()=>{r.apply(this,arguments),e=n,a=0},t))}}var h=i;function l(t){t=t.trim();let r=/^(.+?):\/\/([A-z0-9\.]+)(?:\:([0-9]{0,5}))?([^\?\#\:]+)*(?:\?([^#]*))?(?:\#(.*))?$/i,s;try{let e=t.match(r);return s={url:t,scheme:e[1],domain:e[2],port:e[3],path:e[4],query:e[5],hash:e[6]},s}catch(e){return console.log(`fail to parse ${t}
`,e),{}}}function u(t){let r;try{r=t.match(/(?:\?([^#]*))/i)[1]}catch(e){console.log(`fail to getQuery ${t}
`,e)}if(!r)return{};const s={};return r=decodeURI(r),r.split("&").forEach(e=>{const[a,n]=e.split("=");s[a]=n}),s}function c(t="",r){let s=[];for(const e in r)Object.hasOwnProperty.call(r,e)&&s.push([e]+"="+r[e]);return`${t}?${encodeURI(s.join("&"))}`}var f={parse:l,getQuery:u,setQuery:c},m=f;export{p as d,m as q,h as t};
