(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{52:function(t,e,n){t.exports=n(96)},57:function(t,e,n){},96:function(t,e,n){"use strict";n.r(e);var a=n(4),r=n.n(a),i=n(32),o=n.n(i),c=(n(57),n(58),n(33)),l=n(34),s=n(47),d=n(35),u=n(48),h=n(9),f=n(18),v=n(14),b=n(36),m=n(23),p=n(46),w=n(19),y=n.n(w),g=n(40),O=n.n(g);function j(){var t=Object(b.a)(["\n    {\n      identities(where: { disabled: false }, first: 1000) {\n        id\n        bltBalance\n        subjectOf {\n          id\n        }\n        attesterOf {\n          id\n        }\n        addresses {\n          id\n        }\n      }\n      attestations(first: 1000) {\n        id\n        subjectIdentity {\n          id\n        }\n        attesterIdentity {\n          id\n        }\n      }\n    }\n  "]);return j=function(){return t},t}var k=function(){var t=Object(f.b)(j()),e=Object(m.a)(t),n=e.loading,a=e.error,i=e.data;if(n)return r.a.createElement("div",{className:"centeringWrapper"},r.a.createElement(O.a,{type:"Grid",color:"#0000a0",height:100,width:100}));if(a)return"error: ".concat(a);var o=i.identities,c=i.attestations,l=[],s=[],d=!0,u=!1,h=void 0;try{for(var v,b=o[Symbol.iterator]();!(d=(v=b.next()).done);d=!0){var w=v.value,g=w.id,k=w.bltBalance,E=w.subjectOf,B=w.attesterOf,I=void 0,x=void 0,W=void 0,D=0<B.length,A=y()(k).divide(y()(10).pow(y()(18))).valueOf();D?(x=B.length,I="#00f000",W="Role: attester"):(x=A,I="#0000f0",W="Role: User"),W+=", Addresses: [".concat(w.addresses.map(function(t){var e=t.id;return"".concat(e.substr(0,6),"\u2026").concat(e.substr(38,4)," ")}),"], \nBLT Balance: ").concat(A,", Nb Attestations: ").concat(E.length+B.length),x=Math.min(20,Math.max(1,x)),l.push({id:g,val:x,color:I,name:W})}}catch(G){u=!0,h=G}finally{try{d||null==b.return||b.return()}finally{if(u)throw h}}var J=!0,M=!1,N=void 0;try{for(var P,R=c[Symbol.iterator]();!(J=(P=R.next()).done);J=!0){var S=P.value;s.push({source:S.attesterIdentity.id,target:S.subjectIdentity.id})}}catch(G){M=!0,N=G}finally{try{J||null==R.return||R.return()}finally{if(M)throw N}}var C={nodes:l,links:s};return r.a.createElement(p.a,{graphData:C,linkDirectionalParticles:2,linkDirectionalParticleWidth:.64})};var E=new f.a({uri:"https://api.thegraph.com/subgraphs/name/philippemts/bloom",cache:new v.a}),B=function(t){function e(){return Object(c.a)(this,e),Object(s.a)(this,Object(d.a)(e).apply(this,arguments))}return Object(u.a)(e,t),Object(l.a)(e,[{key:"render",value:function(){return r.a.createElement(h.a,{client:E},r.a.createElement(k,null))}}]),e}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(B,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})}},[[52,1,2]]]);
//# sourceMappingURL=main.efa3daad.chunk.js.map