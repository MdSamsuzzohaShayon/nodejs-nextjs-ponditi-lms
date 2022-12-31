(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[998],{6848:function(a,b,c){(window.__NEXT_P=window.__NEXT_P||[]).push(["/user/login",function(){return c(7746)}])},2319:function(a,b,c){"use strict";var d=c(5893),e=c(9473);b.Z=function(){var a=(0,e.v9)(function(a){return a.elements.errorList}),b=(0,e.v9)(function(a){return a.elements.successMessageList});return a.length>0?(0,d.jsx)("div",{className:"alert alert-danger",children:(0,d.jsx)("ul",{children:a.map(function(a,b){return(0,d.jsxs)("li",{className:"list-unstyled",children:[(0,d.jsx)("img",{src:"/icons/exclamination.svg",alt:"",width:"25px"})," ",a]},b)})})}):b.length>0?(0,d.jsx)("div",{className:"alert alert-success",children:(0,d.jsx)("ul",{children:b.map(function(a,b){return(0,d.jsxs)("li",{className:"list-unstyled",children:[(0,d.jsx)("img",{src:"/icons/tick.svg",alt:"",width:"25px"})," ",a]},b)})})}):null}},7746:function(a,b,c){"use strict";c.r(b);var d=c(7568),e=c(4924),f=c(4051),g=c.n(f),h=c(5893),i=c(9473),j=c(7294),k=c(1163),l=c.n(k),m=c(1664),n=c.n(m),o=c(7916),p=c(8525),q=c(4884),r=c(1964),s=c(2319),t=c(5789);b.default=function(){var a,b,c,f="fs-6 fw-light text-danger",k=!0,m=(0,i.I0)(),u=(0,i.v9)(function(a){return a.elements.isLoading}),v=(0,i.v9)(function(a){return a.user.loginInfo}),w=(0,i.v9)(function(a){return a.user.authUserInfo}),x=(0,i.v9)(function(a){return a.elements.noValidate}),y=(c=(0,d.Z)(g().mark(function a(b){var c,d,e;return g().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(b.preventDefault(),m((0,p.hb)()),m((0,p.Z5)(!1)),!1!==k){a.next=5;break}return a.abrupt("return",null);case 5:return a.prev=5,m((0,p.o4)(!0)),console.log({isLoading:u}),a.next=10,o.Z.post("/user/login",v,{headers:{"Content-Type":"application/json"}});case 10:200===(c=a.sent).status&&(m((0,p.hb)()),window.localStorage.setItem("user",JSON.stringify(c.data.user)),l().push("/user/dashboard")),a.next=20;break;case 14:a.prev=14,a.t0=a.catch(5),console.log(a.t0),(null===a.t0|| void 0===a.t0?void 0:null===(d=a.t0.response)|| void 0===d?void 0:null===(e=d.data)|| void 0===e?void 0:e.msg)&&m((0,p.ri)([a.t0.response.data.msg])),m((0,p.o4)(!1));case 20:case"end":return a.stop()}},a,null,[[5,14]])})),function(a){return c.apply(this,arguments)}),z=function(a){m((0,q.mm)((0,e.Z)({},a.target.name,a.target.value)))};return(0,j.useEffect)(function(){return m((0,p.hb)()),m((0,p.o4)(!1)),function(){m((0,p.L$)()),m((0,q.Le)())}},[]),(0,j.useEffect)(function(){w.id&&l().push("/user/dashboard")},[w]),(0,h.jsx)(r.Z,{children:u?(0,h.jsx)(t.Z,{}):(0,h.jsxs)("section",{className:"Login d-flex p-0 m-0",children:[(0,h.jsx)("div",{className:"side left-side bg-danger-deep d-none d-md-block",children:(0,h.jsx)("div",{className:"left-side-wrapper h-full vertical-center",children:(0,h.jsx)("div",{className:"login-shape",children:(0,h.jsx)("img",{src:"/shape/login.svg",alt:"Login"})})})}),(0,h.jsx)("div",{className:"side right-side",children:(0,h.jsxs)("div",{className:"right-side-wrapper h-full vertical-center",children:[(0,h.jsx)("h1",{className:"login",children:"Login"}),(0,h.jsx)("div",{className:"row",children:(0,h.jsx)("div",{className:"col-md-12",children:(0,h.jsx)(s.Z,{})})}),(0,h.jsxs)("form",{onSubmit:y,noValidate:x,children:[(0,h.jsx)("div",{className:"row mb-3",children:(0,h.jsxs)("div",{className:"col-md-12",children:[(0,h.jsx)("label",{htmlFor:"phone",children:"Phone*"}),(0,h.jsx)("input",{type:"number",className:"form-control",name:"phone",id:"phone",onChange:z,required:!0}),""===(a=v.phone)||null===a?(k=!1,(0,h.jsx)("p",{className:!1===x?f:"".concat(f," text-danger d-none"),children:"Phone number can not be empty"})):a.length<11?(k=!1,(0,h.jsx)("p",{className:!1===x?f:"".concat(f," text-danger d-none"),children:"Please put a valid phone number."})):null]})}),(0,h.jsx)("div",{className:"row mb-3",children:(0,h.jsxs)("div",{className:"col-md-12",children:[(0,h.jsx)("label",{htmlFor:"password",children:"Password*"}),(0,h.jsx)("input",{type:"password",className:"form-control",name:"password",id:"password",onChange:z,required:!0}),""===(b=v.password)||null===b?(k=!1,(0,h.jsx)("p",{className:!1===x?f:"".concat(f," text-danger d-none"),children:"Password can not be empty"})):b.length<6?(k=!1,(0,h.jsx)("p",{className:!1===x?f:"".concat(f," text-danger d-none"),children:"Password can not be less than 6 char long."})):null]})}),(0,h.jsx)("div",{className:"row mb-3",children:(0,h.jsx)("div",{className:"col",children:(0,h.jsx)("button",{type:"submit",className:"btn btn-primary w-fit",children:"Login"})})}),(0,h.jsx)("div",{className:"row mb-3",children:(0,h.jsxs)("div",{className:"col d-flex flex-column",children:[(0,h.jsx)(n(),{href:"/user/passwordrecover",children:(0,h.jsx)("a",{className:"text-decoration-underline text-capitalize text-dark",children:"Password forgotten?"})}),(0,h.jsx)(n(),{href:"/user/register",children:(0,h.jsx)("a",{className:"text-decoration-underline text-capitalize text-dark",children:"Don't have an account?"})})]})})]})]})})]})})}}},function(a){a.O(0,[997,206,774,888,179],function(){var b;return a(a.s=6848)}),_N_E=a.O()}])