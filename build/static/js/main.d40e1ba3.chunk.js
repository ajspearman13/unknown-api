(this["webpackJsonpunknown-api"]=this["webpackJsonpunknown-api"]||[]).push([[0],{21:function(e,t,n){},40:function(e,t,n){},41:function(e,t,n){},43:function(e,t,n){"use strict";n.r(t);var c=n(1),s=n.n(c),i=n(16),a=n.n(i),r=(n(21),n(3)),o=n(4),l=n.n(o),j=(n(40),n(41),n(0));function b(e){var t=Object(c.useState)(""),n=Object(r.a)(t,2),s=n[0],i=n[1],a=Object(c.useState)(""),o=Object(r.a)(a,2),b=o[0],u=o[1],p=Object(c.useState)(""),O=Object(r.a)(p,2),f=O[0],h=O[1],x=Object(c.useState)(""),m=Object(r.a)(x,2),v=m[0],g=m[1],k=Object(c.useState)(""),y=Object(r.a)(k,2),w=y[0],C=y[1],N=Object(c.useState)(""),S=Object(r.a)(N,2),E=S[0],A=S[1],F=Object(c.useState)(""),B=Object(r.a)(F,2),D=B[0],T=B[1];return Object(c.useEffect)((function(){l.a.get(e.link).then((function(e){var t;i(e.data.name.toLocaleUpperCase()),u(e.data.types.map((function(e){return e.type.name.toLocaleUpperCase()+" "}))),h(e.data.sprites.front_default),g(e.data.base_experience),A("normal"===(t=e.data.types[0].type.name)?"#A8A77A":"fire"===t?"#EE8130":"water"===t?"#6390F0":"electric"===t?"#F7D02C":"grass"===t?"#7AC74C":"ice"===t?"#96D9D6":"fighting"===t?"#C22E28":"poison"===t?"#A33EA1":"ground"===t?"#E2BF65":"flying"===t?"#A98FF3":"psychic"===t?"#F95587":"bug"===t?"#A6B91A":"rock"===t?"#B6A136":"ghost"===t?"#735797":"dragon"===t?"#6F35FC":"dark"===t?"#705746":"steel"===t?"#B7B7CE":"fairy"===t?"#D685AD":"white"),T(e.data.id),C(e.data.stats.map((function(e){return Object(j.jsxs)("li",{children:[" ",Object(j.jsx)("span",{children:e.stat.name.toUpperCase()}),Object(j.jsxs)("span",{children:[e.base_stat,"  "]})]})})))})).catch((function(e){console.error(e)}))}),[e.link]),Object(j.jsx)("div",{children:Object(j.jsx)(d,{name:s,type:b,baseEx:v,stats:w,pic:f,color:E,id:D})})}function d(e){var t=e.color,n=Object(c.useRef)(),s=Object(c.useRef)(),i=Object(c.useState)("drop-info"),a=Object(r.a)(i,2),o=a[0],l=a[1];return Object(j.jsxs)("div",{style:{backgroundColor:t},className:"poke-box",children:[Object(j.jsxs)("div",{children:[Object(j.jsxs)("p",{className:"poke-id",children:[" No. ",e.id]}),Object(j.jsx)("div",{className:"poke-pic",children:Object(j.jsx)("img",{src:e.pic,className:"pic",alt:e.name})}),Object(j.jsx)("p",{className:"poke-name",children:e.name}),Object(j.jsxs)("p",{className:"poke-type",children:["  ",e.type]}),Object(j.jsx)("button",{className:"drop-button",onClick:function(){return l("drop-info"===o?"show":"drop-info")},children:"Stats"})]}),Object(j.jsx)("div",{className:"dropdown",ref:s,children:Object(j.jsx)("div",{ref:n,className:o,children:Object(j.jsxs)("ul",{children:[Object(j.jsxs)("li",{children:[" EXP ",Object(j.jsxs)("span",{children:[e.baseEx," "]})]}),e.stats]})})})]},e.name)}var u=function(e){var t=e.urls.map((function(e){return Object(j.jsx)(b,{link:e},e)}));return Object(j.jsx)("div",{id:"list-wrapper",children:Object(j.jsx)("div",{id:"poke-list",children:t})})},p=n.p+"static/media/arrow-pic.b8a1f3ca.png";var O=function(){var e=Object(c.useState)([]),t=Object(r.a)(e,2),n=t[0],s=t[1],i=Object(c.useState)("https://pokeapi.co/api/v2/pokemon/?limit=20"),a=Object(r.a)(i,2),o=a[0],b=a[1],d=Object(c.useState)([]),O=Object(r.a)(d,2),f=O[0],h=O[1],x=Object(c.useRef)(),m=Object(c.useRef)();return Object(c.useEffect)((function(){l.a.get(o).then((function(e){null===e.data.previous?x.current.style.visibility="hidden":x.current.style.visibility="visible",null===e.data.next?m.current.style.visibility="hidden":m.current.style.visibility="visible"}))}),[o]),Object(c.useEffect)((function(){l.a.get(o).then((function(e){h(e.data.results.map((function(e){return e.name}))),s(e.data.results.map((function(e){return e.url})))})).catch((function(e){console.error(e)}))}),[o]),Object(j.jsxs)("div",{className:"App",children:[Object(j.jsxs)("div",{className:"header",children:[Object(j.jsxs)("div",{children:["  ",Object(j.jsx)("button",{className:"pg-btn",id:"prev-btn",ref:x,onClick:function(){l.a.get(o).then((function(e){b(e.data.previous)})),window.scrollTo(0,0)},children:" prev "})]}),Object(j.jsx)("h1",{children:"Pokedex"}),Object(j.jsxs)("div",{children:[" ",Object(j.jsx)("button",{className:"pg-btn",id:"next-btn",ref:m,onClick:function(){l.a.get(o).then((function(e){b(e.data.next)})),window.scrollTo(0,0)},children:" next "})," "]})]}),Object(j.jsx)(u,{names:f,urls:n}),Object(j.jsx)("button",{onClick:function(){window.scrollTo(0,0)},id:"top-btn",children:Object(j.jsx)("img",{id:"arrow-pic",src:p,alt:"up-arrow"})})]})},f=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,44)).then((function(t){var n=t.getCLS,c=t.getFID,s=t.getFCP,i=t.getLCP,a=t.getTTFB;n(e),c(e),s(e),i(e),a(e)}))};a.a.render(Object(j.jsx)(s.a.StrictMode,{children:Object(j.jsx)(O,{})}),document.getElementById("root")),f()}},[[43,1,2]]]);
//# sourceMappingURL=main.d40e1ba3.chunk.js.map