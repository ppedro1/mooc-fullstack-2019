(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{12:function(e,t,n){e.exports=n(38)},37:function(e,t,n){},38:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),u=n(11),l=n.n(u),c=n(2),i=function(e){var t=e.newName,n=(e.setNewName,e.newNumber),a=(e.setNewNumber,e.persons,e.setPersons,e.handleNewName),u=e.handleNewNumber,l=e.insertRecord;return r.a.createElement("form",{onSubmit:l},r.a.createElement("h3",null,"Lis\xe4\xe4 uusi kontakti"),r.a.createElement("div",null,"nimi: ",r.a.createElement("br",null)," ",r.a.createElement("input",{value:t,onChange:a})),r.a.createElement("div",null,"numero: ",r.a.createElement("br",null)," ",r.a.createElement("input",{value:n,onChange:u})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"lis\xe4\xe4")))},o=function(e){var t=e.persons,n=(e.setPersons,e.newFilter),a=e.handleDelete,u=n.length>0?t.filter(function(e){return e.name.match(new RegExp(n,"gi"))}):t;return r.a.createElement("div",null,r.a.createElement("h2",null,"Kontaktit"),r.a.createElement("ul",null,u.map(function(e){return r.a.createElement("li",{key:e.id,className:"list"},r.a.createElement("div",{className:"list-name"},e.name),r.a.createElement("div",{className:"list-number"},e.number),r.a.createElement("div",{className:"list-delete"},r.a.createElement("button",{onClick:function(){return a(e.id)}},"delete")))})))},m=function(e){var t=e.newFilter,n=e.setNewFilter;return r.a.createElement("div",null,r.a.createElement("form",null,r.a.createElement("input",{value:t,onChange:function(e){n(e.target.value)}})))},s=function(e){var t=e.message;return null===t?null:r.a.createElement("div",{className:"notif-panel"},t)},f=function(e){var t=e.errorMessage;return null===t?null:r.a.createElement("div",{className:"error-panel"},"Virhe! ",t)},d=n(3),E=n.n(d),b="http://localhost:3001/persons",h=function(){return E.a.get(b).then(function(e){return e.data})},v=function(e){return E.a.post(b,e).then(function(e){return e.data})},w=function(e,t){return E.a.put("".concat(b,"/").concat(e),t).then(function(e){return e.data})},p=function(e){return E.a.delete("".concat(b,"/").concat(e)).then(function(e){return e.data})},N=(n(37),function(){var e=Object(a.useState)([]),t=Object(c.a)(e,2),n=t[0],u=t[1],l=Object(a.useState)(""),d=Object(c.a)(l,2),E=d[0],b=d[1],N=Object(a.useState)(""),k=Object(c.a)(N,2),g=k[0],j=k[1],O=Object(a.useState)(""),S=Object(c.a)(O,2),F=S[0],y=S[1],K=Object(a.useState)(null),P=Object(c.a)(K,2),T=P[0],C=P[1],D=Object(a.useState)(null),R=Object(c.a)(D,2),x=R[0],I=R[1];Object(a.useEffect)(function(){h().then(function(e){return u(e)})},[]);var J=n.filter(function(e){return e.name===E}).length>0,M=n.filter(function(e){return e.number===g}).length>0;return r.a.createElement("div",null,r.a.createElement("h2",null,"Puhelinluettelo"),r.a.createElement(s,{message:T}),r.a.createElement(f,{errorMessage:x}),r.a.createElement(i,{persons:n,setPersons:u,newName:E,setNewName:b,newNumber:g,setNewNumber:j,handleNewName:function(e){return b(e.target.value)},handleNewNumber:function(e){return j(e.target.value)},insertRecord:function(e){if(e.preventDefault(),M){var t=n.filter(function(e){return e.number===g})[0];C("".concat(t.number," on asetettu jo kontaktille ").concat(t.name)),setTimeout(function(){C(null)},1500),j("")}else{var a={name:E,number:g};if(J){if(window.confirm("Kontakti ".concat(E," on jo luettelossa, haluatko korvata numeron uudella?"))){var r=n.filter(function(e){return e.name===E})[0];w(r.id,a).then(function(e){u(n.map(function(t){return t.id===r.id?e:t})),C("Kontaktin ".concat(E," numero p\xe4ivitetty.")),setTimeout(function(){C(null)},2500)})}}else v(a).then(function(e){u(n.concat(e)),C("Uusi kontakti ".concat(E," lis\xe4tty")),setTimeout(function(){C(null)},2500)});b(""),j("")}}}),r.a.createElement("h3",null,"Rajaa henkil\xf6it\xe4"),r.a.createElement(m,{newFilter:F,setNewFilter:y}),r.a.createElement(o,{persons:n,setPersons:u,newFilter:F,handleDelete:function(e){var t=n.find(function(t){return t.id===e});window.confirm("Haluatko poistaa kontaktin ".concat(t.name," (ID: ").concat(t.id,")"))&&p(e).then(function(a){u(n.filter(function(t){return t.id!==e})),C("Kontakti ".concat(t.name," poistettu")),setTimeout(function(){C(null)},2500)}).catch(function(a){I("Kontakti ".concat(t.name," on jo poistettu!")),u(n.filter(function(t){return t.id!==e})),setTimeout(function(){I(null)},2500)})}}))});l.a.render(r.a.createElement(N,null),document.getElementById("root"))}},[[12,1,2]]]);
//# sourceMappingURL=main.fd6ae11b.chunk.js.map