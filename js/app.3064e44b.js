(function(t){function e(e){for(var r,c,o=e[0],i=e[1],d=e[2],s=0,f=[];s<o.length;s++)c=o[s],Object.prototype.hasOwnProperty.call(a,c)&&a[c]&&f.push(a[c][0]),a[c]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(t[r]=i[r]);l&&l(e);while(f.length)f.shift()();return u.push.apply(u,d||[]),n()}function n(){for(var t,e=0;e<u.length;e++){for(var n=u[e],r=!0,c=1;c<n.length;c++){var o=n[c];0!==a[o]&&(r=!1)}r&&(u.splice(e--,1),t=i(i.s=n[0]))}return t}var r={},c={app:0},a={app:0},u=[];function o(t){return i.p+"js/"+({}[t]||t)+"."+{"chunk-936453fc":"f43289cf"}[t]+".js"}function i(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.e=function(t){var e=[],n={"chunk-936453fc":1};c[t]?e.push(c[t]):0!==c[t]&&n[t]&&e.push(c[t]=new Promise((function(e,n){for(var r="css/"+({}[t]||t)+"."+{"chunk-936453fc":"7b5e57bd"}[t]+".css",a=i.p+r,u=document.getElementsByTagName("link"),o=0;o<u.length;o++){var d=u[o],s=d.getAttribute("data-href")||d.getAttribute("href");if("stylesheet"===d.rel&&(s===r||s===a))return e()}var f=document.getElementsByTagName("style");for(o=0;o<f.length;o++){d=f[o],s=d.getAttribute("data-href");if(s===r||s===a)return e()}var l=document.createElement("link");l.rel="stylesheet",l.type="text/css",l.onload=e,l.onerror=function(e){var r=e&&e.target&&e.target.src||a,u=new Error("Loading CSS chunk "+t+" failed.\n("+r+")");u.code="CSS_CHUNK_LOAD_FAILED",u.request=r,delete c[t],l.parentNode.removeChild(l),n(u)},l.href=a;var p=document.getElementsByTagName("head")[0];p.appendChild(l)})).then((function(){c[t]=0})));var r=a[t];if(0!==r)if(r)e.push(r[2]);else{var u=new Promise((function(e,n){r=a[t]=[e,n]}));e.push(r[2]=u);var d,s=document.createElement("script");s.charset="utf-8",s.timeout=120,i.nc&&s.setAttribute("nonce",i.nc),s.src=o(t);var f=new Error;d=function(e){s.onerror=s.onload=null,clearTimeout(l);var n=a[t];if(0!==n){if(n){var r=e&&("load"===e.type?"missing":e.type),c=e&&e.target&&e.target.src;f.message="Loading chunk "+t+" failed.\n("+r+": "+c+")",f.name="ChunkLoadError",f.type=r,f.request=c,n[1](f)}a[t]=void 0}};var l=setTimeout((function(){d({type:"timeout",target:s})}),12e4);s.onerror=s.onload=d,document.head.appendChild(s)}return Promise.all(e)},i.m=t,i.c=r,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)i.d(n,r,function(e){return t[e]}.bind(null,r));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/vue-ts-trello-test/",i.oe=function(t){throw console.error(t),t};var d=window["webpackJsonp"]=window["webpackJsonp"]||[],s=d.push.bind(d);d.push=e,d=d.slice();for(var f=0;f<d.length;f++)e(d[f]);var l=s;u.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("cd49")},"034f":function(t,e,n){"use strict";n("85ec")},"85ec":function(t,e,n){},"85ee":function(t,e,n){"use strict";n.d(e,"r",(function(){return c})),n.d(e,"d",(function(){return a})),n.d(e,"c",(function(){return u})),n.d(e,"e",(function(){return o})),n.d(e,"a",(function(){return i})),n.d(e,"g",(function(){return d})),n.d(e,"p",(function(){return s})),n.d(e,"j",(function(){return f})),n.d(e,"n",(function(){return l})),n.d(e,"m",(function(){return p})),n.d(e,"o",(function(){return b})),n.d(e,"b",(function(){return g})),n.d(e,"h",(function(){return m})),n.d(e,"i",(function(){return h})),n.d(e,"q",(function(){return v})),n.d(e,"k",(function(){return k})),n.d(e,"f",(function(){return O})),n.d(e,"l",(function(){return j}));var r=n("d257"),c={cards:[{title:"Hello World",id:Object(r["d"])(),tasks:[{title:"First task",description:"First task description",id:Object(r["d"])()}]}]},a="CARDS",u="CARD",o="CARD_INDEX",i="ADD_CARD",d="INSERT_CARD",s="UPDATE_CARD_TITLE",f="REMOVE_CARD",l="TASKS",p="TASK",b="TASK_INDEX",g="ADD_TASK",m="INSERT_TASK",h="INSERT_TASK_SAME",v="UPDATE_TASK",k="REMOVE_TASK",O="DRAGGING_ELEMENT",j="SET_DRAGGING"},cd49:function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),c=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},a=[],u=(n("034f"),n("2877")),o={},i=Object(u["a"])(o,c,a,!1,null,null,null),d=i.exports,s=(n("d3b7"),n("8c4f"));r["a"].use(s["a"]);var f,l,p,b=[{path:"/",name:"Home",component:function(){return n.e("chunk-936453fc").then(n.bind(null,"bb51"))}},{path:"*",name:"AnyPage",component:function(){return n.e("chunk-936453fc").then(n.bind(null,"bb51"))}}],g=new s["a"]({mode:"history",base:"/vue-ts-trello-test/",routes:b}),m=g,h=(n("d81d"),n("a434"),n("ade3")),v=n("5530"),k=n("85ee"),O=n("d257"),j=n("2f62");r["a"].use(j["a"]);var I=new j["a"].Store({plugins:[O["c"]],state:Object(v["a"])(Object(v["a"])({},JSON.parse(localStorage.getItem("state"))||k["r"]),{},{dragging:{type:null,taskId:null,cardId:null}}),mutations:(f={},Object(h["a"])(f,k["b"],(function(t,e){var n=e.newTask,r=e.cardIndex;t.cards[r].tasks.push(n)})),Object(h["a"])(f,k["a"],(function(t,e){t.cards.push(e)})),Object(h["a"])(f,k["k"],(function(t,e){var n=e.cardIndex,r=e.taskIndex;t.cards[n].tasks.splice(r,1)})),Object(h["a"])(f,k["j"],(function(t,e){t.cards.splice(e,1)})),Object(h["a"])(f,k["q"],(function(t,e){var n=e.updatedTask,r=e.cardIndex;t.cards[r].tasks=t.cards[r].tasks.map((function(t){return t.id===n.id?n:t}))})),Object(h["a"])(f,k["p"],(function(t,e){var n=e.cardIndex,r=e.cardTitle;t.cards[n].title=r})),Object(h["a"])(f,k["h"],(function(t,e){var n=e.cardIndex,r=e.taskIndex,c=e.newTask;t.cards[n].tasks.splice(r,0,c)})),Object(h["a"])(f,k["i"],(function(t,e){var n=e.cardIndex,r=e.taskIndex,c=e.targetTaskIndex,a=e.task;t.cards[n].tasks.splice(r,1),t.cards[n].tasks.splice(c,0,a)})),Object(h["a"])(f,k["g"],(function(t,e){t.cards.splice(e.cardIndex,1),t.cards.splice(e.targetCardIndex,0,e.card)})),Object(h["a"])(f,k["l"],(function(t,e){t.dragging=e})),f),actions:(l={},Object(h["a"])(l,k["b"],(function(t,e){var n=e.newTask,r=e.cardId;t.commit(k["b"],{cardIndex:t.getters[k["e"]](r),newTask:n})})),Object(h["a"])(l,k["a"],(function(t,e){var n=t.commit;n(k["a"],e)})),Object(h["a"])(l,k["k"],(function(t,e){var n=e.cardId,r=e.taskId;t.commit(k["k"],{cardIndex:t.getters[k["e"]](n),taskIndex:t.getters[k["o"]](n,r)})})),Object(h["a"])(l,k["j"],(function(t,e){t.commit(k["j"],t.getters[k["e"]](e))})),Object(h["a"])(l,k["q"],(function(t,e){var n=e.updatedTask,r=e.cardId;t.commit(k["q"],{updatedTask:n,cardIndex:t.getters[k["e"]](r)})})),Object(h["a"])(l,k["p"],(function(t,e){var n=e.cardId,r=e.cardTitle;t.commit(k["p"],{cardIndex:t.getters[k["e"]](n),cardTitle:r})})),Object(h["a"])(l,k["h"],(function(t,e){t.commit(k["h"],{cardIndex:t.getters[k["e"]](e.cardId),taskIndex:t.getters[k["o"]](e.cardId,e.taskId),newTask:e.newTask})})),Object(h["a"])(l,k["i"],(function(t,e){var n=e.cardId,r=e.task,c=e.targetTask;t.commit(k["i"],{cardIndex:t.getters[k["e"]](n),taskIndex:t.getters[k["o"]](n,r.id),targetTaskIndex:t.getters[k["o"]](n,c.id),task:r})})),Object(h["a"])(l,k["g"],(function(t,e){var n=e.card,r=e.targetCard;t.commit(k["g"],{cardIndex:t.getters[k["e"]](n.id),targetCardIndex:t.getters[k["e"]]("string"===typeof r?r:r.id),card:n})})),Object(h["a"])(l,k["l"],(function(t,e){var n=t.commit;n(k["l"],e)})),l),getters:(p={},Object(h["a"])(p,k["d"],(function(t){return t.cards})),Object(h["a"])(p,k["c"],(function(t){return function(e){return Object(O["a"])(t.cards,e)}})),Object(h["a"])(p,k["n"],(function(t,e){return function(n){return t.cards[e[k["e"]](n)].tasks}})),Object(h["a"])(p,k["m"],(function(t,e){return function(t,n){return Object(O["a"])(e[k["c"]](t).tasks,n)}})),Object(h["a"])(p,k["e"],(function(t){return function(e){return Object(O["b"])(t.cards,e)}})),Object(h["a"])(p,k["o"],(function(t,e){return function(t,n){return Object(O["b"])(e[k["c"]](t).tasks,n)}})),Object(h["a"])(p,k["f"],(function(t){return t.dragging})),p)});r["a"].config.productionTip=!1,new r["a"]({router:m,store:I,render:function(t){return t(d)}}).$mount("#app")},d257:function(t,e,n){"use strict";n.d(e,"c",(function(){return r})),n.d(e,"d",(function(){return c})),n.d(e,"b",(function(){return a})),n.d(e,"a",(function(){return u}));n("7db0"),n("c740"),n("d3b7"),n("25f0");var r=function(t){t.subscribe((function(t,e){return localStorage.setItem("state",JSON.stringify(e))}))},c=function(){return Math.round(Math.random()*Math.pow(10,12)).toString(16)},a=function(t,e){return t.findIndex((function(t){return t.id===e}))},u=function(t,e){return t.find((function(t){return t.id===e}))}}});
//# sourceMappingURL=app.3064e44b.js.map