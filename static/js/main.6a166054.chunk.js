(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{26:function(t,n,e){t.exports=e(69)},31:function(t,n,e){},69:function(t,n,e){"use strict";e.r(n);var a=e(1),r=e.n(a),i=e(16),o=e.n(i),c=(e(31),e(32),e(6)),l=e(22),s=e(5),u=e.n(s),d=e(20),h=e(21),f=e.n(h),v=new d.GraphQLClient("https://api.thegraph.com/subgraphs/name/philippemts/bloom"),y=0,m=0,p=function(t,n){var e=[],a=!0,r=!1,i=void 0;try{for(var o,c=function(){var n=o.value;t.some(function(t){return t.id===n.source})&&t.some(function(t){return t.id===n.target})&&e.push(Object.assign({},n))},l=n[Symbol.iterator]();!(a=(o=l.next()).done);a=!0)c()}catch(s){r=!0,i=s}finally{try{a||null==l.return||l.return()}finally{if(r)throw i}}return e},w=function(t){var n={},e=[],a=!0,r=!1,i=void 0;try{for(var o,c=t[Symbol.iterator]();!(a=(o=c.next()).done);a=!0){var l=o.value,s="".concat(l.source,"-").concat(l.target),u=n[s];u?e[u].width+=1:(u=e.push({source:l.source,target:l.target,width:1}),n[s]=u-1)}}catch(d){r=!0,i=d}finally{try{a||null==c.return||c.return()}finally{if(r)throw i}}return e},b=function(){var t=r.a.useState(!1),n=Object(c.a)(t,2),e=n[0],a=n[1],i=r.a.useState([]),o=Object(c.a)(i,2),s=o[0],d=o[1],h=r.a.useState([]),b=Object(c.a)(h,2),g=b[0],k=b[1],O=function(t){return function(n){var e=n.identities,a=[],r=!0,i=!1,o=void 0;try{for(var c,l=e[Symbol.iterator]();!(r=(c=l.next()).done);r=!0){var s=c.value,h=s.id,f=s.bltBalance,v=s.subjectOf,m=s.attesterOf,p=void 0,w=void 0,b=void 0,g=0<m.length,k=u()(f).divide(u()(10).pow(u()(18))).valueOf();g?(w=m.length,p="#00f000",b="Role: attester"):(w=k,p="#0000f0",b="Role: User"),b+=", Addresses: [".concat(s.addresses.map(function(t){var n=t.id;return"".concat(n.substr(0,6),"\u2026").concat(n.substr(38,4)," ")}),"], \nBLT Balance: ").concat(k,", Nb Attestations: ").concat(v.length+m.length),w=Math.min(20,Math.max(1,w)),a.push({id:h,val:w,color:p,name:b})}}catch(S){i=!0,o=S}finally{try{r||null==l.return||l.return()}finally{if(i)throw o}}var O=t.concat(a);d(O),y+=1,256===e.length&&j(O)}},j=function(t){v.request("\n    {\n        identities(where: { disabled: false }, skip: ".concat(256*y,", first: ").concat(256,") {\n            id\n            bltBalance\n            subjectOf {\n                id\n            }\n            attesterOf {\n                id\n            }\n            addresses {\n                id\n            }\n        }\n    }\n")).then(O(t))},S=function(t){return function(n){var e=n.attestations,a=[],r=!0,i=!1,o=void 0;try{for(var c,l=e[Symbol.iterator]();!(r=(c=l.next()).done);r=!0){var s=c.value;a.push({source:s.attesterIdentity.id,target:s.subjectIdentity.id})}}catch(d){i=!0,o=d}finally{try{r||null==l.return||l.return()}finally{if(i)throw o}}var u=t.concat(a);k(u),m+=1,256===e.length&&x(u)}},x=function(t){v.request("\n    {\n        attestations(skip: ".concat(256*m,", first: ").concat(256,") {\n            id\n            subjectIdentity {\n                id\n            }\n            attesterIdentity {\n                id\n            }\n        }\n    }\n")).then(S(t))};e||(a(!0),j([]),x([]));var B={nodes:s,links:w(p(s,g))};return s.length?r.a.createElement(l.a,{graphData:B,linkWidth:"width",linkDirectionalParticles:2,linkDirectionalParticleWidth:.64}):r.a.createElement("div",{className:"centeringWrapper"},r.a.createElement(f.a,{type:"Grid",color:"#0000a0",height:100,width:100}))};var g=function(){return r.a.createElement(b,null)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(g,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})}},[[26,1,2]]]);
//# sourceMappingURL=main.6a166054.chunk.js.map