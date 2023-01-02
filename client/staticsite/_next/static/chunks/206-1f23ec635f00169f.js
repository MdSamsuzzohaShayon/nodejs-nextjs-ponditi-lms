"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[206],{5789:function(a,b,c){var d=c(5893);b.Z=function(){return(0,d.jsx)("div",{className:"d-flex justify-content-center spinner-wrapper vertical-center",children:(0,d.jsx)("div",{className:"spinner-grow text-primary",role:"status",children:(0,d.jsx)("span",{className:"visually-hidden",children:"Loading..."})})})}},1964:function(a,b,c){c.d(b,{Z:function(){return D}});var d=c(5893),e=c(7294),f=c(9473),g=c(1163),h=c(8525),i=c(4884),j=c(7568),k=c(4051),l=c.n(k),m=c(6089),n=c.n(m),o=c(1664),p=c.n(o),q=c(375),r=c(7916),s=c(1848),t=c(1539),u=q.uJ.ADMIN,v=q.uJ.STUDENT,w=q.uJ.TEACHER,x=q.Wb.PENDING,y=q.Wb.APPROVED,z=q.Wb.REJECTED,A=function(){var a,b=(0,f.I0)(),c=(0,g.useRouter)(),k=(0,t.Z)(768),m=(0,f.v9)(function(a){return a.elements.menuItemList}),o=(0,f.v9)(function(a){return a.elements.socialItems}),q=(0,f.v9)(function(a){return a.user.userUnseenNotifications}),A=(0,f.v9)(function(a){return a.user.userNotifications}),B=(0,f.v9)(function(a){return a.user.authenticatedUser}),C=(0,f.v9)(function(a){return a.user.authUserInfo}),D=(0,e.useState)("/initial"),E=D[0],F=D[1],G=(0,e.useState)(!1),H=G[0],I=G[1],J=(0,e.useState)(38),K=J[0],L=J[1],M=(0,e.useState)(!1),N=M[0],O=M[1],P=(0,e.useRef)(null),Q=!1;(0,e.useEffect)(function(){if(!1===Q){var a=localStorage.getItem("user"),b=JSON.parse(a);null!==a&&(b.role===u?F("/admin"):F("/user/dashboard"))}Q=!0},[]);var R=(a=(0,j.Z)(l().mark(function a(d){var e;return l().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return d.preventDefault(),a.prev=1,b((0,h.o4)(!0)),a.next=5,r.Z.post("/user/logout");case 5:e=a.sent,b((0,i.JE)()),c.push("/"),a.next=13;break;case 10:a.prev=10,a.t0=a.catch(1),console.log(a.t0);case 13:return a.prev=13,window.localStorage.removeItem("user"),a.finish(13);case 16:case"end":return a.stop()}},a,null,[[1,10,13,16]])})),function(b){return a.apply(this,arguments)}),S=function(a){a.preventDefault(),I(function(a){return!a}),L(30+P.current.offsetTop)},T=function(a){a.preventDefault(),I(!1)},U=function(a,d){a.preventDefault();var e=window.location.origin,f=window.location.origin,g=null;switch(d.comment.includes("(")&&(g=parseInt(d.comment.substring(d.comment.indexOf("(")+1,d.comment.indexOf(")")),10)),d.type){case s.wq:b((0,i.ml)(x)),f=g?"".concat(e,"/scheduledclass/detail/").concat(g):"".concat(e,"/user/requesthistory");break;case s.kf:b((0,i.ml)(y)),f=g?"".concat(e,"/scheduledclass/detail/").concat(g):"".concat(e,"/user/requesthistory");break;case s.lc:b((0,i.ml)(z)),f=g?"".concat(e,"/scheduledclass/detail/").concat(g):"".concat(e,"/user/requesthistory");break;case s.M3:case s.Bs:f=g?"".concat(e,"/scheduledclass/detail/").concat(g):"".concat(e,"/user/requesthistory")}c.push(f)};return(0,d.jsx)(d.Fragment,{children:(0,d.jsxs)("div",{className:n().dynamic([["5b26a13dc1359c2e",[100/m.length,K]]])+" Header bg-primary text-white p-0 m-0",children:[k?(0,d.jsxs)("div",{className:n().dynamic([["5b26a13dc1359c2e",[100/m.length,K]]])+" d-md-none container",children:[(0,d.jsxs)("div",{className:n().dynamic([["5b26a13dc1359c2e",[100/m.length,K]]])+" w-full d-flex justify-content-between",children:[(0,d.jsx)("img",{src:"/logo.png",alt:"",className:n().dynamic([["5b26a13dc1359c2e",[100/m.length,K]]])+" img-logo"}),N?(0,d.jsx)("img",{src:"/icons/close-contradicts.svg",alt:"",onClick:function(a){return O(!1)},className:n().dynamic([["5b26a13dc1359c2e",[100/m.length,K]]])}):(0,d.jsx)("img",{src:"/icons/menu-contradict.svg",alt:"",onClick:function(a){return O(!0)},className:n().dynamic([["5b26a13dc1359c2e",[100/m.length,K]]])})]}),N&&(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)("div",{className:n().dynamic([["5b26a13dc1359c2e",[100/m.length,K]]])+" d-flex align-items-start w-full h-full flex-column flex-md-row",children:m.map(function(a,b){return m.length,(0,d.jsx)("div",{className:n().dynamic([["5b26a13dc1359c2e",[100/m.length,K]]])+" d-flex flex-column justify-content-start",children:(0,d.jsx)(p(),{href:a.link,children:a.name})},a.id)})}),(0,d.jsxs)("div",{className:n().dynamic([["5b26a13dc1359c2e",[100/m.length,K]]])+" auth py-md-0 py-2",children:[B?(0,d.jsxs)("ul",{className:n().dynamic([["5b26a13dc1359c2e",[100/m.length,K]]])+" list-unstyled d-flex justify-content-start align-items-center flex-column",children:[C.role===u&&(0,d.jsx)("li",{className:n().dynamic([["5b26a13dc1359c2e",[100/m.length,K]]]),children:(0,d.jsx)(p(),{href:"/admin",children:"Dashboard"})}),C.role===v||C.role===w?(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)("li",{className:n().dynamic([["5b26a13dc1359c2e",[100/m.length,K]]])+" text-lowercase",children:(0,d.jsx)(p(),{href:E,children:"Profile (".concat(C.role.toLowerCase(),")")})}),(0,d.jsxs)("li",{className:n().dynamic([["5b26a13dc1359c2e",[100/m.length,K]]])+" d-flex",children:[(0,d.jsx)("div",{className:n().dynamic([["5b26a13dc1359c2e",[100/m.length,K]]])+" p-1",children:(0,d.jsx)(p(),{href:"/user/requesthistory",children:"Request history"})}),q.length>0&&(0,d.jsx)("div",{className:n().dynamic([["5b26a13dc1359c2e",[100/m.length,K]]])+" bg-danger text-white p-1 w-fit rounded-3",children:q.length})]}),(0,d.jsxs)("li",{role:"button",onClick:S,"aria-hidden":"true",ref:P,className:n().dynamic([["5b26a13dc1359c2e",[100/m.length,K]]])+" d-flex",children:[(0,d.jsx)("div",{className:n().dynamic([["5b26a13dc1359c2e",[100/m.length,K]]])+" p-1",children:q.length>0?(0,d.jsx)("img",{src:"/icons/notification-dot.svg",alt:"notification",height:25,className:n().dynamic([["5b26a13dc1359c2e",[100/m.length,K]]])}):(0,d.jsx)("img",{height:25,src:"/icons/notification.svg",alt:"notification",className:n().dynamic([["5b26a13dc1359c2e",[100/m.length,K]]])})}),q.length>0&&(0,d.jsx)("div",{className:n().dynamic([["5b26a13dc1359c2e",[100/m.length,K]]])+" bg-danger text-white p-1 w-fit rounded-3",children:q.length})]})]}):null,(0,d.jsx)("li",{className:n().dynamic([["5b26a13dc1359c2e",[100/m.length,K]]])+" ",children:(0,d.jsx)("button",{href:"#",type:"button",onClick:R,className:n().dynamic([["5b26a13dc1359c2e",[100/m.length,K]]])+" bg-transparent border-0 mx-2 text-white",children:"Logout"})})]}):(0,d.jsxs)("div",{className:n().dynamic([["5b26a13dc1359c2e",[100/m.length,K]]])+" d-flex justify-content-start align-items-start flex-column",children:[(0,d.jsx)(p(),{href:"/user/login",children:"Login"}),(0,d.jsx)(p(),{href:"/user/register",children:"Register"})]}),(0,d.jsx)("div",{className:n().dynamic([["5b26a13dc1359c2e",[100/m.length,K]]])+" "+((H?"notification-bar card position-absolute":"notification-bar card position-absolute d-none")||""),children:(0,d.jsxs)("div",{className:n().dynamic([["5b26a13dc1359c2e",[100/m.length,K]]])+" card-body",children:[(0,d.jsxs)("div",{className:n().dynamic([["5b26a13dc1359c2e",[100/m.length,K]]])+" d-flex w-full justify-content-between align-items-center mb-2",children:[(0,d.jsx)("h5",{className:n().dynamic([["5b26a13dc1359c2e",[100/m.length,K]]])+" card-title text-dark",children:"Notifications"}),(0,d.jsx)("img",{src:"/icons/close.svg",width:30,alt:"close","aria-hidden":"true",onClick:T,className:n().dynamic([["5b26a13dc1359c2e",[100/m.length,K]]])})]}),(0,d.jsx)("ul",{className:n().dynamic([["5b26a13dc1359c2e",[100/m.length,K]]])+" list-group",children:A.length>0?A.map(function(a,b){return(0,d.jsx)("li",{onClick:function(b){return U(b,a)},role:"button","aria-hidden":"true",className:n().dynamic([["5b26a13dc1359c2e",[100/m.length,K]]])+" "+((a.viewed?"list-group-item":"list-group-item bg-secondary")||""),children:a.comment},b)}):(0,d.jsx)("li",{className:n().dynamic([["5b26a13dc1359c2e",[100/m.length,K]]])+" list-group-item",children:"No notification found"})})]})})]})]})]}):(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)("div",{className:n().dynamic([["5b26a13dc1359c2e",[100/m.length,K]]])+" row m-0 d-flex flex-column flex-md-row",children:[(0,d.jsx)("div",{className:n().dynamic([["5b26a13dc1359c2e",[100/m.length,K]]])+" logo-column p-0 text-center",children:(0,d.jsx)("img",{src:"/logo.png",alt:"",className:n().dynamic([["5b26a13dc1359c2e",[100/m.length,K]]])+" img-logo"})}),(0,d.jsxs)("div",{className:n().dynamic([["5b26a13dc1359c2e",[100/m.length,K]]])+" nav-column p-0",children:[(0,d.jsx)("div",{className:n().dynamic([["5b26a13dc1359c2e",[100/m.length,K]]])+" top-header bg-primary-deep w-full",children:(0,d.jsxs)("div",{className:n().dynamic([["5b26a13dc1359c2e",[100/m.length,K]]])+" top-header-wrapper d-flex justify-content-between h-full flex-md-row flex-column align-items-start align-items-md-center py-0 py-md-3",children:[(0,d.jsx)("div",{className:n().dynamic([["5b26a13dc1359c2e",[100/m.length,K]]])+" social d-flex h-full py-md-0 py-2",children:(0,d.jsx)("ul",{className:n().dynamic([["5b26a13dc1359c2e",[100/m.length,K]]])+" d-flex justify-centent-start align-items-center m-0 px-1",children:o.map(function(a){return(0,d.jsx)("li",{className:n().dynamic([["5b26a13dc1359c2e",[100/m.length,K]]])+" nav-item list-unstyled",children:(0,d.jsx)("a",{href:"#",className:n().dynamic([["5b26a13dc1359c2e",[100/m.length,K]]])+" nav-link",children:(0,d.jsx)("img",{src:"/icons/".concat(a.icon),alt:a.name,className:n().dynamic([["5b26a13dc1359c2e",[100/m.length,K]]])})})},a.id)})})}),(0,d.jsxs)("div",{className:n().dynamic([["5b26a13dc1359c2e",[100/m.length,K]]])+" auth py-md-0 py-2",children:[B?(0,d.jsxs)("ul",{className:n().dynamic([["5b26a13dc1359c2e",[100/m.length,K]]])+" list-unstyled d-flex justify-content-center align-items-center flex-direction-column flex-md-direction-row m-0",children:[C.role===u&&(0,d.jsx)("li",{className:n().dynamic([["5b26a13dc1359c2e",[100/m.length,K]]])+" mx-2",children:(0,d.jsx)(p(),{href:"/admin",children:"Dashboard"})}),C.role===v||C.role===w?(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)("li",{className:n().dynamic([["5b26a13dc1359c2e",[100/m.length,K]]])+" mx-2 text-lowercase",children:(0,d.jsx)(p(),{href:E,children:"Profile (".concat(C.role.toLowerCase(),")")})}),(0,d.jsxs)("li",{className:n().dynamic([["5b26a13dc1359c2e",[100/m.length,K]]])+" mx-2 d-flex",children:[(0,d.jsx)("div",{className:n().dynamic([["5b26a13dc1359c2e",[100/m.length,K]]])+" p-1",children:(0,d.jsx)(p(),{href:"/user/requesthistory",children:"Request history"})}),q.length>0&&(0,d.jsx)("div",{className:n().dynamic([["5b26a13dc1359c2e",[100/m.length,K]]])+" bg-danger text-white p-1 w-fit rounded-3",children:q.length})]}),(0,d.jsxs)("li",{role:"button",onClick:S,"aria-hidden":"true",ref:P,className:n().dynamic([["5b26a13dc1359c2e",[100/m.length,K]]])+" mx-2 d-flex",children:[(0,d.jsx)("div",{className:n().dynamic([["5b26a13dc1359c2e",[100/m.length,K]]])+" p-1",children:q.length>0?(0,d.jsx)("img",{src:"/icons/notification-dot.svg",alt:"notification",height:25,className:n().dynamic([["5b26a13dc1359c2e",[100/m.length,K]]])}):(0,d.jsx)("img",{height:25,src:"/icons/notification.svg",alt:"notification",className:n().dynamic([["5b26a13dc1359c2e",[100/m.length,K]]])})}),q.length>0&&(0,d.jsx)("div",{className:n().dynamic([["5b26a13dc1359c2e",[100/m.length,K]]])+" bg-danger text-white p-1 w-fit rounded-3",children:q.length})]})]}):null,(0,d.jsx)("li",{className:n().dynamic([["5b26a13dc1359c2e",[100/m.length,K]]])+" ",children:(0,d.jsx)("button",{href:"#",type:"button",onClick:R,className:n().dynamic([["5b26a13dc1359c2e",[100/m.length,K]]])+" bg-transparent border-0  mx-2 text-white",children:"Logout"})})]}):(0,d.jsxs)("div",{className:n().dynamic([["5b26a13dc1359c2e",[100/m.length,K]]])+" mx-2",children:[(0,d.jsx)("button",{href:"#",type:"button",className:n().dynamic([["5b26a13dc1359c2e",[100/m.length,K]]])+" mx-2 bg-transparent border-0",children:(0,d.jsx)(p(),{href:"/user/login",children:"Login"})}),(0,d.jsx)(p(),{href:"/user/register",children:"Register"})]}),(0,d.jsx)("div",{className:n().dynamic([["5b26a13dc1359c2e",[100/m.length,K]]])+" "+((H?"notification-bar card position-absolute":"notification-bar card position-absolute d-none")||""),children:(0,d.jsxs)("div",{className:n().dynamic([["5b26a13dc1359c2e",[100/m.length,K]]])+" card-body",children:[(0,d.jsxs)("div",{className:n().dynamic([["5b26a13dc1359c2e",[100/m.length,K]]])+" d-flex w-full justify-content-between align-items-center mb-2",children:[(0,d.jsx)("h5",{className:n().dynamic([["5b26a13dc1359c2e",[100/m.length,K]]])+" card-title text-dark",children:"Notifications"}),(0,d.jsx)("img",{src:"/icons/close.svg",width:30,alt:"close","aria-hidden":"true",onClick:T,className:n().dynamic([["5b26a13dc1359c2e",[100/m.length,K]]])})]}),(0,d.jsx)("ul",{className:n().dynamic([["5b26a13dc1359c2e",[100/m.length,K]]])+" list-group",children:A.length>0?A.map(function(a,b){return(0,d.jsx)("li",{onClick:function(b){return U(b,a)},role:"button","aria-hidden":"true",className:n().dynamic([["5b26a13dc1359c2e",[100/m.length,K]]])+" "+((a.viewed?"list-group-item":"list-group-item bg-secondary")||""),children:a.comment},b)}):(0,d.jsx)("li",{className:n().dynamic([["5b26a13dc1359c2e",[100/m.length,K]]])+" list-group-item",children:"No notification found"})})]})})]})]})}),(0,d.jsx)("div",{className:n().dynamic([["5b26a13dc1359c2e",[100/m.length,K]]])+" bottom-header w-full",children:(0,d.jsx)("div",{className:n().dynamic([["5b26a13dc1359c2e",[100/m.length,K]]])+" bottom-header-wrapper",children:(0,d.jsx)("div",{className:n().dynamic([["5b26a13dc1359c2e",[100/m.length,K]]])+" d-flex justify-content-around align-items-start align-items-md-center w-full h-full flex-column flex-md-row",children:m.map(function(a,b){return b===m.length-1?(0,d.jsx)("div",{className:n().dynamic([["5b26a13dc1359c2e",[100/m.length,K]]])+" menu-item d-flex flex-column justify-content-center text-md-center mx-2 mx-md-0 border-right-slim",children:(0,d.jsx)(p(),{href:a.link,children:a.name})},a.id):(0,d.jsx)("div",{className:n().dynamic([["5b26a13dc1359c2e",[100/m.length,K]]])+" menu-item d-flex flex-column justify-content-center text-md-center mx-2 mx-md-0",children:(0,d.jsx)(p(),{href:a.link,children:a.name})},a.id)})})})})]})]}),(0,d.jsx)("div",{className:n().dynamic([["5b26a13dc1359c2e",[100/m.length,K]]])+" border-of-header w-full bg-primary-deep"})]}),(0,d.jsx)(n(),{id:"5b26a13dc1359c2e",dynamic:[100/m.length,K],children:".menu-item.__jsx-style-dynamic-selector{width:".concat(100/m.length,"%}.notification-bar.__jsx-style-dynamic-selector{top:").concat(K,"px}.notification-bar.__jsx-style-dynamic-selector a.__jsx-style-dynamic-selector{color:black!important}")})]})})},B=function(){return(0,d.jsx)("footer",{className:"Footer w-full text-white ",children:(0,d.jsx)("div",{className:"footer-bottom bg-primary d-flex justify-content-center flex-column align-items-center",children:(0,d.jsxs)("div",{className:"container d-flex flex-column-reverse flex-md-row justify-content-between align-items-center",children:[(0,d.jsx)("div",{className:"copyright",children:(0,d.jsx)("span",{children:"Copyright \xa9 2023 Ponditil All Rights Reserved"})}),(0,d.jsx)("div",{className:"policies",children:(0,d.jsxs)("ul",{className:"d-flex flex-column flex-md-row justify-content-end align-items-center w-full px-0 m-0 footer-bottom-policies",children:[(0,d.jsx)("li",{className:"list-unstyled px-3 footer-bottom-list-item",children:(0,d.jsx)("a",{href:"#",children:"Privacy Policy"})}),(0,d.jsx)("li",{className:"list-unstyled px-3 footer-bottom-list-item",children:(0,d.jsx)("a",{href:"#",children:"Contact"})}),(0,d.jsx)("li",{className:"list-unstyled px-3 footer-bottom-list-item",children:(0,d.jsx)("a",{href:"#",children:"FAQs"})})]})})]})})})},C=c(5789),D=function(a){var b=a.children,c=!1,j=(0,g.useRouter)(),k=(0,f.I0)(),l=(0,f.v9)(function(a){return a.elements.isLoading});return(0,e.useEffect)(function(){if(!1===c){k((0,h.o4)(!0));var a=localStorage.getItem("user");null===a?(k((0,i.JE)(!1)),k((0,i.uJ)())):(k((0,i.JE)(!0)),k((0,i.Vk)(JSON.parse(a)))),k((0,h.o4)(!1))}c=!0},[]),(0,e.useEffect)(function(){var a=function(a){return a!==j.asPath&&k((0,h.o4)(!0))},b=function(a){return a===j.asPath&&k((0,h.o4)(!1))};return j.events.on("routeChangeStart",a),j.events.on("routeChangeComplete",b),j.events.on("routeChangeError",b),function(){j.events.off("routeChangeStart",a),j.events.off("routeChangeComplete",b),j.events.off("routeChangeError",b)}}),(0,d.jsxs)("div",{className:"Layout",children:[(0,d.jsx)(A,{}),l?(0,d.jsx)(C.Z,{}):b,(0,d.jsx)(B,{})]})}},1539:function(a,b,c){var d=c(7294),e=function(a){var b=(0,d.useState)(!1),c=b[0],e=b[1],f=(0,d.useCallback)(function(a){a.matches?e(!0):e(!1)},[]);return(0,d.useEffect)(function(){var b=window.matchMedia("(max-width: ".concat(a,"px)"));return b.addEventListener("change",f),b.matches&&e(!0),function(){return b.removeEventListener("change",f)}},[]),c};b.Z=e}}])