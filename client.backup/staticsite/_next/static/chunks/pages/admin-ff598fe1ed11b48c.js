(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[964],{7953:function(a,b,c){(window.__NEXT_P=window.__NEXT_P||[]).push(["/admin",function(){return c(2840)}])},2319:function(a,b,c){"use strict";var d=c(5893),e=c(9473);b.Z=function(){var a=(0,e.v9)(function(a){return a.elements.errorList}),b=(0,e.v9)(function(a){return a.elements.successMessageList});return a.length>0?(0,d.jsx)("div",{className:"alert alert-danger",children:(0,d.jsx)("ul",{children:a.map(function(a,b){return(0,d.jsxs)("li",{className:"list-unstyled",children:[(0,d.jsx)("img",{src:"/icons/exclamination.svg",alt:"",width:"25px"})," ",a]},b)})})}):b.length>0?(0,d.jsx)("div",{className:"alert alert-success",children:(0,d.jsx)("ul",{children:b.map(function(a,b){return(0,d.jsxs)("li",{className:"list-unstyled",children:[(0,d.jsx)("img",{src:"/icons/tick.svg",alt:"",width:"25px"})," ",a]},b)})})}):null}},2840:function(a,b,c){"use strict";c.r(b),c.d(b,{default:function(){return X}});var d=c(7568),e=c(4051),f=c.n(e),g=c(5893),h=c(7294),i=c(9473),j=c(1163),k=c.n(j),l=c(1964),m=c(4884),n=c(8525),o=c(5789),p=c(7916),q=c(2319),r=c(9775),s=c(4924),t=c(797),u=function(a){var b=(0,i.I0)();(0,i.v9)(function(a){return a.subject.subjectList});var c,e=(0,i.v9)(function(a){return a.tuitionm.tuitionmList}),h=(0,i.v9)(function(a){return a.classtype.addClassType}),j=(c=(0,d.Z)(f().mark(function c(d){var e,g,i,j,l;return f().wrap(function(c){for(;;)switch(c.prev=c.next){case 0:if(d.preventDefault(),""!==h.name){c.next=3;break}return c.abrupt("return",b((0,n.ri)(["You must put classtype name"])));case 3:return c.prev=3,b((0,n.o4)(!0)),c.next=7,p.Z.post("/classtype/add",h);case 7:201===(e=c.sent).status&&(b((0,r.i2)([e.data.classType].concat((0,t.Z)(a.classtypeList)))),b((0,r.se)()),b((0,n.hb)())),c.next=17;break;case 11:c.prev=11,c.t0=c.catch(3),console.log(c.t0),(null===c.t0|| void 0===c.t0?void 0:null===(g=c.t0.response)|| void 0===g?void 0:null===(i=g.data)|| void 0===i?void 0:i.msg)&&b((0,n.ri)([c.t0.response.data.msg])),((null===c.t0|| void 0===c.t0?void 0:null===(j=c.t0.response)|| void 0===j?void 0:j.status)===401||(null===c.t0|| void 0===c.t0?void 0:null===(l=c.t0.response)|| void 0===l?void 0:l.status)===405)&&(window.localStorage.removeItem("user"),k().push("/admin/login"));case 17:return c.prev=17,b((0,n.o4)(!1)),c.finish(17);case 20:return c.abrupt("return",null);case 21:case"end":return c.stop()}},c,null,[[3,11,17,20]])})),function(a){return c.apply(this,arguments)}),l=function(a){b((0,r.xi)((0,s.Z)({},a.target.name,a.target.value)))},m=function(a){var c=(0,t.Z)(h.tuitionmId),d=parseInt(a.target.value,10);if(!0===a.target.checked)c.push(d),b((0,r.xi)({tuitionmId:c}));else{var e=c.indexOf(d);c.splice(e,1),b((0,r.xi)({tuitionmId:c}))}};return(0,g.jsxs)("div",{className:"ClassTypeAdd",children:[(0,g.jsx)("div",{className:"row mx-0 mb-3",children:(0,g.jsx)("div",{className:"col",children:(0,g.jsx)("h1",{className:"h1",children:"Add Class Type"})})}),(0,g.jsxs)("form",{className:"mb-5",onSubmit:j,children:[(0,g.jsx)("div",{className:"row mx-0 mb-3",children:(0,g.jsxs)("div",{className:"col",children:[(0,g.jsx)("label",{htmlFor:"name fs-4",children:"Class Name"}),(0,g.jsx)("input",{type:"text",className:"form-control",placeholder:"E.G. Class 1",name:"name","aria-label":"Recipient's username","aria-describedby":"classtype-addon",onChange:l})]})}),(0,g.jsxs)("div",{className:"row mx-0 mb-3",children:[(0,g.jsx)("p",{className:"fs-4",children:"Tuition Medium"}),e&&e.map(function(a,b){return(0,g.jsx)("div",{className:"col-md-3",children:(0,g.jsxs)("div",{className:"form-check form-check-inline",children:[(0,g.jsx)("input",{className:"form-check-input",type:"checkbox",id:a.name,name:a.name,value:a.id,onChange:m}),(0,g.jsx)("label",{className:"form-check-label",htmlFor:a.name,children:a.name})]})},b)})]}),(0,g.jsx)("div",{className:"row mb-3 mx-0 d-flex",children:(0,g.jsxs)("div",{className:"col",children:[(0,g.jsx)("button",{className:"btn btn-primary w-fit",type:"submit",id:"classtype-addon",children:"Add Class Type"}),(0,g.jsx)("a",{href:"#",className:"btn btn-secondary w-fit",onClick:a.togglePartHandler,role:"button",children:"See class list"})]})})]})]})},v=c(6089),w=c.n(v),x=function(a){return(0,g.jsxs)("div",{className:"jsx-11a653210d86db53 List",children:[(0,g.jsx)("h1",{className:"jsx-11a653210d86db53",children:a.title}),a.list.length>0&&a.list.map(function(b,c){var d,e;return(0,g.jsxs)("div",{className:"jsx-11a653210d86db53 row mx-0 border-bottom",children:[(0,g.jsx)("div",{className:"jsx-11a653210d86db53 col-md-4",children:b.name}),(0,g.jsxs)("div",{className:"jsx-11a653210d86db53 col-md-4",children:[(null==b?void 0:b.Subjects)&&(null==b?void 0:null===(d=b.Subjects)|| void 0===d?void 0:d.length),(null==b?void 0:b.ClassTypes)&&(null==b?void 0:null===(e=b.ClassTypes)|| void 0===e?void 0:e.length)]}),(0,g.jsx)("div",{className:"jsx-11a653210d86db53 col-md-4",children:(0,g.jsx)("div",{className:"jsx-11a653210d86db53 props prop-3 text-end",children:(0,g.jsx)("button",{type:"button",onClick:function(c){return a.deleteHandler(c,b.id)},className:"jsx-11a653210d86db53 btn btn-danger w-fit ",children:"Delete"})})})]},c)}),(0,g.jsx)(w(),{id:"11a653210d86db53",children:".props.jsx-11a653210d86db53{width:33%}"})]})},y=function(){var a,b=(0,i.I0)(),c=(0,j.useRouter)(),e=(0,h.useState)(!1),k=e[0],l=e[1],m=(0,i.v9)(function(a){return a.elements.isLoading}),s=(0,i.v9)(function(a){return a.classtype.classtypeList}),t=(a=(0,d.Z)(f().mark(function a(d,e){var g,h,i,j,k,l;return f().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return d.preventDefault(),a.prev=1,b((0,n.o4)(!0)),a.next=5,p.Z.delete("/classtype/delete/".concat(e));case 5:200===(g=a.sent).status&&(h=s.filter(function(a){return a.id!==e}),b((0,r.i2)(h))),a.next=15;break;case 9:a.prev=9,a.t0=a.catch(1),console.log(a.t0),(null===a.t0|| void 0===a.t0?void 0:null===(i=a.t0.response)|| void 0===i?void 0:null===(j=i.data)|| void 0===j?void 0:j.msg)&&b((0,n.ri)([a.t0.response.data.msg])),((null===a.t0|| void 0===a.t0?void 0:null===(k=a.t0.response)|| void 0===k?void 0:k.status)===401||(null===a.t0|| void 0===a.t0?void 0:null===(l=a.t0.response)|| void 0===l?void 0:l.status)===405)&&(window.localStorage.removeItem("user"),c.push("/admin/login"));case 15:return a.prev=15,b((0,n.o4)(!1)),a.finish(15);case 18:case"end":return a.stop()}},a,null,[[1,9,15,18]])})),function(b,c){return a.apply(this,arguments)}),v=function(a){a.preventDefault(),l(function(a){return a=!a})};return(0,g.jsx)("div",{className:"ClassTypeContent w-full",children:m?(0,g.jsx)(o.Z,{}):(0,g.jsxs)("div",{className:"container",children:[(0,g.jsx)(q.Z,{}),k?(0,g.jsx)(u,{togglePartHandler:v,classtypeList:s}):(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(x,{list:s,title:"Class Type List",deleteHandler:t}),(0,g.jsx)("div",{className:"row my-3 mx-0",children:(0,g.jsx)("a",{href:"#",className:"btn btn-primary w-fit",onClick:v,role:"button",children:"Add Class"})})]})]})})},z=c(6618),A=function(a){var b,c=(0,i.I0)(),e=(0,i.v9)(function(a){return a.subject.addSubject}),h=(b=(0,d.Z)(f().mark(function b(d){var g,h,i,j,l;return f().wrap(function(b){for(;;)switch(b.prev=b.next){case 0:if(d.preventDefault(),""!==e.name){b.next=3;break}return b.abrupt("return",c((0,n.ri)(["You must put subject name"])));case 3:if(0!==e.classTypeId){b.next=5;break}return b.abrupt("return",c((0,n.ri)(["You must select classtype"])));case 5:return b.prev=5,c((0,n.o4)(!0)),b.next=9,p.Z.post("/subject/add",e);case 9:201===(g=b.sent).status&&(c((0,n.hb)()),c((0,z.Ru)([g.data.subject].concat((0,t.Z)(a.subjectList)))),c(z.SA)),b.next=19;break;case 13:b.prev=13,b.t0=b.catch(5),console.log(b.t0),(null===b.t0|| void 0===b.t0?void 0:null===(h=b.t0.response)|| void 0===h?void 0:null===(i=h.data)|| void 0===i?void 0:i.msg)&&c((0,n.ri)([b.t0.response.data.msg])),((null===b.t0|| void 0===b.t0?void 0:null===(j=b.t0.response)|| void 0===j?void 0:j.status)===401||(null===b.t0|| void 0===b.t0?void 0:null===(l=b.t0.response)|| void 0===l?void 0:l.status)===405)&&(window.localStorage.removeItem("user"),k().push("/admin/login"));case 19:return b.prev=19,c((0,n.o4)(!1)),b.finish(19);case 22:case"end":return b.stop()}},b,null,[[5,13,19,22]])})),function(a){return b.apply(this,arguments)}),j=function(a){c((0,z.bd)((0,s.Z)({},a.target.name,a.target.value)))},l=function(a){var b=(0,t.Z)(e.classTypeId),d=parseInt(a.target.value,10);if(!0===a.target.checked)b.push(d),c((0,z.bd)({classTypeId:b}));else{var f=b.indexOf(d);b.splice(f,1),c((0,z.bd)({classTypeId:b}))}};return(0,g.jsxs)("div",{className:"SubjectAdd",children:[(0,g.jsx)("div",{className:"row mx-0 mb-3",children:(0,g.jsx)("div",{className:"col",children:(0,g.jsx)("h1",{className:"h1",children:"Add Subject"})})}),(0,g.jsxs)("form",{className:"mb-5",onSubmit:h,children:[(0,g.jsx)("div",{className:"row mx-0 mb-3",children:(0,g.jsxs)("div",{className:"col",children:[(0,g.jsx)("label",{htmlFor:"name",children:"Subject Name"}),(0,g.jsx)("input",{type:"text",className:"form-control",placeholder:"E.G. Subject 1",name:"name","aria-label":"Recipient's username","aria-describedby":"classtype-addon",onChange:j})]})}),(0,g.jsx)("div",{className:"row mx-0 mb-3",children:a.classtypeList&&a.classtypeList.map(function(a){return(0,g.jsx)("div",{className:"col-md-3",children:(0,g.jsxs)("div",{className:"form-check form-check-inline",children:[(0,g.jsx)("input",{className:"form-check-input",type:"checkbox",id:a.name,name:a.name,value:a.id,onChange:l}),(0,g.jsx)("label",{className:"form-check-label",htmlFor:a.name,children:a.name})]})},a.id)})}),(0,g.jsx)("div",{className:"row mb-3 mx-0 d-flex",children:(0,g.jsxs)("div",{className:"col",children:[(0,g.jsx)("button",{className:"btn btn-primary w-fit",type:"submit",id:"classtype-addon",children:"Add Subject"}),(0,g.jsx)("a",{href:"#",className:"btn btn-secondary w-fit",onClick:a.togglePartHandler,role:"button",children:"See subject list"})]})})]})]})},B=function(){var a,b=(0,h.useState)(!1),c=b[0],e=b[1],k=(0,i.I0)(),l=(0,j.useRouter)(),m=(0,i.v9)(function(a){return a.elements.isLoading}),r=(0,i.v9)(function(a){return a.subject.subjectList}),s=(0,i.v9)(function(a){return a.classtype.classtypeList}),t=function(a){a.preventDefault(),e(function(a){return a=!a})},u=(a=(0,d.Z)(f().mark(function a(b,c){var d,e,g,h,i,j;return f().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(b.preventDefault(),a.prev=1,k((0,n.o4)(!0)),c){a.next=5;break}return a.abrupt("return",k((0,n.ri)(["No id found"])));case 5:return a.next=7,p.Z.delete("/subject/delete/".concat(c));case 7:200===(d=a.sent).status&&(e=r.filter(function(a){return a.id!==c}),k((0,z.Ru)(e)),k((0,n.hb)())),a.next=17;break;case 11:a.prev=11,a.t0=a.catch(1),console.log(a.t0),(null===a.t0|| void 0===a.t0?void 0:null===(g=a.t0.response)|| void 0===g?void 0:null===(h=g.data)|| void 0===h?void 0:h.msg)&&k((0,n.ri)([a.t0.response.data.msg])),((null===a.t0|| void 0===a.t0?void 0:null===(i=a.t0.response)|| void 0===i?void 0:i.status)===401||(null===a.t0|| void 0===a.t0?void 0:null===(j=a.t0.response)|| void 0===j?void 0:j.status)===405)&&(window.localStorage.removeItem("user"),l.push("/admin/login"));case 17:return a.prev=17,k((0,n.o4)(!1)),a.finish(17);case 20:case"end":return a.stop()}},a,null,[[1,11,17,20]])})),function(b,c){return a.apply(this,arguments)});return(0,g.jsx)("div",{className:"ClassTypeContent w-full",children:m?(0,g.jsx)(o.Z,{}):(0,g.jsxs)("div",{className:"container",children:[(0,g.jsx)(q.Z,{}),c?(0,g.jsx)(A,{togglePartHandler:t,classtypeList:s,subjectList:r}):(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(x,{list:r,title:"Subject List",deleteHandler:u}),(0,g.jsx)("div",{className:"row my-3 mx-0",children:(0,g.jsx)("a",{href:"#",className:"btn btn-primary w-fit",onClick:t,role:"button",children:"Add Subject"})})]})]})})},C=c(1664),D=c.n(C),E=c(375),F=c(8987);E.Wb.APPROVED;var G=E.Wb.REJECTED,H=E.Wb.PENDING,I=function(a){var b,c,e=(0,i.I0)(),h=(0,i.v9)(function(a){return a.admin.adminUserTabElement}),j=(b=(0,d.Z)(f().mark(function a(b,c){var d,g,h,i,j;return f().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return b.preventDefault(),a.prev=1,e((0,n.o4)(!0)),a.next=5,p.Z.put("/user/reject/".concat(c));case 5:202===(d=a.sent).status&&(e((0,n.hb)()),e((0,m.bX)(null))),a.next=15;break;case 9:a.prev=9,a.t0=a.catch(1),console.log(a.t0),(null===a.t0|| void 0===a.t0?void 0:null===(g=a.t0.response)|| void 0===g?void 0:null===(h=g.data)|| void 0===h?void 0:h.msg)&&e((0,n.ri)([a.t0.response.data.msg])),((null===a.t0|| void 0===a.t0?void 0:null===(i=a.t0.response)|| void 0===i?void 0:i.status)===401||(null===a.t0|| void 0===a.t0?void 0:null===(j=a.t0.response)|| void 0===j?void 0:j.status)===405)&&(window.localStorage.removeItem("user"),k().push("/admin/login"));case 15:return a.prev=15,e((0,n.o4)(!1)),a.finish(15);case 18:case"end":return a.stop()}},a,null,[[1,9,15,18]])})),function(a,c){return b.apply(this,arguments)}),l=(c=(0,d.Z)(f().mark(function a(b,c){var d,g,h,i,j;return f().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return b.preventDefault(),a.prev=1,e((0,n.o4)(!0)),a.next=5,p.Z.put("/user/accept/".concat(c));case 5:202===(d=a.sent).status&&(e((0,n.hb)()),e((0,m.bX)(null))),a.next=15;break;case 9:a.prev=9,a.t0=a.catch(1),console.log(a.t0),(null===a.t0|| void 0===a.t0?void 0:null===(g=a.t0.response)|| void 0===g?void 0:null===(h=g.data)|| void 0===h?void 0:h.msg)&&e((0,n.ri)([a.t0.response.data.msg])),((null===a.t0|| void 0===a.t0?void 0:null===(i=a.t0.response)|| void 0===i?void 0:i.status)===401||(null===a.t0|| void 0===a.t0?void 0:null===(j=a.t0.response)|| void 0===j?void 0:j.status)===405)&&(window.localStorage.removeItem("user"),k().push("/admin/login"));case 15:return a.prev=15,e((0,n.o4)(!1)),a.finish(15);case 18:case"end":return a.stop()}},a,null,[[1,9,15,18]])})),function(a,b){return c.apply(this,arguments)}),o=function(a,b){a.preventDefault(),e((0,F.lL)(b))};return(0,g.jsxs)("div",{className:"jsx-11a653210d86db53 UserList",children:[(0,g.jsx)("h1",{className:"jsx-11a653210d86db53",children:"User List"}),(0,g.jsx)("ul",{className:"jsx-11a653210d86db53 nav nav-pills bg-danger",children:h.map(function(b){return(0,g.jsx)("li",{className:"jsx-11a653210d86db53 nav-item",children:(0,g.jsx)("button",{type:"button",onClick:function(a){return o(a,b.name)},className:"jsx-11a653210d86db53 "+((b.name===a.selectedTabElement?"nav-link rounded-1 text-capitalize active":"nav-link rounded-1 text-capitalize")||""),children:b.text})},b.id)})}),a.allUserList.length>0&&a.allUserList.map(function(a){return(0,g.jsxs)("div",{className:"jsx-11a653210d86db53 row mt-2 border-bottom",children:[(0,g.jsx)("div",{className:"jsx-11a653210d86db53 col-md-4",children:null==a?void 0:a.name}),(0,g.jsxs)("div",{className:"jsx-11a653210d86db53 col-md-4",children:[(0,g.jsx)("p",{className:"jsx-11a653210d86db53",children:null==a?void 0:a.phone}),(0,g.jsx)("p",{className:"jsx-11a653210d86db53",children:null==a?void 0:a.email})]}),(0,g.jsxs)("div",{className:"jsx-11a653210d86db53 col-md-4 justify-content-end d-flex flex-wrap align-items-center",children:[(0,g.jsx)("button",{type:"button",className:"jsx-11a653210d86db53  mx-1 w-fit h-fit bg-transparent border-0",children:(0,g.jsx)(D(),{href:"/user/detail/?userId=".concat(a.id),children:(0,g.jsx)("img",{src:"/icons/detail.svg",width:20,alt:"",className:"jsx-11a653210d86db53"})})}),a.isActive===H&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("button",{type:"button",onClick:function(b){return l(b,a.id)},className:"jsx-11a653210d86db53  mx-1 w-fit h-fit bg-transparent border-0",children:(0,g.jsx)("img",{src:"/icons/tick.svg",width:20,alt:"",className:"jsx-11a653210d86db53"})}),(0,g.jsx)("button",{type:"button",onClick:function(b){return j(b,a.id)},className:"jsx-11a653210d86db53  mx-1 bg-transparent border-0",children:(0,g.jsx)("img",{src:"/icons/reject.svg",width:20,alt:"",className:"jsx-11a653210d86db53"})})]}),a.isActive===G&&(0,g.jsx)("button",{type:"button",onClick:function(b){return l(b,a.id)},className:"jsx-11a653210d86db53  mx-1 w-fit h-fit bg-transparent border-0",children:(0,g.jsx)("img",{src:"/icons/tick.svg",width:20,alt:"",className:"jsx-11a653210d86db53"})})]})]},a.id)}),(0,g.jsx)(w(),{id:"11a653210d86db53",children:".props.jsx-11a653210d86db53{width:33%}"})]})},J=E.Wb.APPROVED,K=E.Wb.REJECTED,L=E.Wb.PENDING,M=function(){(0,i.I0)();var a=(0,i.v9)(function(a){return a.user.allUserList}),b=(0,i.v9)(function(a){return a.user.allPendingUserList}),c=(0,i.v9)(function(a){return a.user.allRejectedUserList}),d=(0,i.v9)(function(a){return a.user.allApprovedUserList}),e=(0,i.v9)(function(a){return a.admin.selectedTabElement});return(0,g.jsx)("div",{className:"UserContent",children:function(){switch(e){case J:return(0,g.jsx)(I,{allUserList:d,selectedTabElement:e});case L:return(0,g.jsx)(I,{allUserList:b,selectedTabElement:e});case K:return(0,g.jsx)(I,{allUserList:c,selectedTabElement:e});default:return(0,g.jsx)(I,{allUserList:a,selectedTabElement:e})}}()})},N=c(1539),O=c(8316),P=function(a){var b=(0,i.I0)();(0,i.v9)(function(a){return a.classtype.classtypeList});var c,e=(0,i.v9)(function(a){return a.tuitionm.addTuitionm}),h=(c=(0,d.Z)(f().mark(function c(d){var g,h,i,j,l;return f().wrap(function(c){for(;;)switch(c.prev=c.next){case 0:if(d.preventDefault(),""!==e.name){c.next=3;break}return c.abrupt("return",b((0,n.ri)(["You must put tuitionm name"])));case 3:return c.prev=3,b((0,n.o4)(!0)),c.next=7,p.Z.post("/tuitionm/add",e);case 7:201===(g=c.sent).status&&(b((0,O.mV)([g.data.tuitionm].concat((0,t.Z)(a.tuitionmList)))),b((0,O.hs)()),b((0,n.hb)())),c.next=17;break;case 11:c.prev=11,c.t0=c.catch(3),console.log(c.t0),(null===c.t0|| void 0===c.t0?void 0:null===(h=c.t0.response)|| void 0===h?void 0:null===(i=h.data)|| void 0===i?void 0:i.msg)&&b((0,n.ri)([c.t0.response.data.msg])),((null===c.t0|| void 0===c.t0?void 0:null===(j=c.t0.response)|| void 0===j?void 0:j.status)===401||(null===c.t0|| void 0===c.t0?void 0:null===(l=c.t0.response)|| void 0===l?void 0:l.status)===405)&&(window.localStorage.removeItem("user"),k().push("/admin/login"));case 17:return c.prev=17,b((0,n.o4)(!1)),c.finish(17);case 20:return c.abrupt("return",null);case 21:case"end":return c.stop()}},c,null,[[3,11,17,20]])})),function(a){return c.apply(this,arguments)}),j=function(a){b((0,O.qX)((0,s.Z)({},a.target.name,a.target.value)))};return(0,g.jsxs)("div",{className:"TuitionmAdd",children:[(0,g.jsx)("div",{className:"row mx-0 mb-3",children:(0,g.jsx)("div",{className:"col",children:(0,g.jsx)("h1",{className:"h1",children:"Add Tuition Medium"})})}),(0,g.jsxs)("form",{className:"mb-5",onSubmit:h,children:[(0,g.jsx)("div",{className:"row mx-0 mb-3",children:(0,g.jsxs)("div",{className:"col",children:[(0,g.jsx)("label",{htmlFor:"name",children:"Medium Name"}),(0,g.jsx)("input",{type:"text",className:"form-control",name:"name",onChange:j})]})}),(0,g.jsx)("div",{className:"row mb-3 mx-0 d-flex",children:(0,g.jsxs)("div",{className:"col",children:[(0,g.jsx)("button",{className:"btn btn-primary w-fit",type:"submit",id:"tuitionm-addon",children:"Add Class Type"}),(0,g.jsx)("a",{href:"#",className:"btn btn-secondary w-fit",onClick:a.togglePartHandler,role:"button",children:"See class list"})]})})]})]})},Q=function(){var a,b=(0,i.I0)(),c=(0,j.useRouter)(),e=(0,h.useState)(!1),k=e[0],l=e[1],m=(0,i.v9)(function(a){return a.elements.isLoading}),r=(0,i.v9)(function(a){return a.tuitionm.tuitionmList}),s=(a=(0,d.Z)(f().mark(function a(d,e){var g,h,i,j,k,l;return f().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return d.preventDefault(),a.prev=1,b((0,n.o4)(!0)),a.next=5,p.Z.delete("/tuitionm/delete/".concat(e));case 5:200===(g=a.sent).status&&(h=r.filter(function(a){return a.id!==e}),b((0,O.mV)(h))),a.next=15;break;case 9:a.prev=9,a.t0=a.catch(1),console.log(a.t0),(null===a.t0|| void 0===a.t0?void 0:null===(i=a.t0.response)|| void 0===i?void 0:null===(j=i.data)|| void 0===j?void 0:j.msg)&&b((0,n.ri)([a.t0.response.data.msg])),((null===a.t0|| void 0===a.t0?void 0:null===(k=a.t0.response)|| void 0===k?void 0:k.status)===401||(null===a.t0|| void 0===a.t0?void 0:null===(l=a.t0.response)|| void 0===l?void 0:l.status)===405)&&(window.localStorage.removeItem("user"),c.push("/admin/login"));case 15:return a.prev=15,b((0,n.o4)(!1)),a.finish(15);case 18:case"end":return a.stop()}},a,null,[[1,9,15,18]])})),function(b,c){return a.apply(this,arguments)}),t=function(a){a.preventDefault(),l(function(a){return a=!a})};return(0,g.jsx)("div",{className:"TuitionmContent w-full",children:m?(0,g.jsx)(o.Z,{}):(0,g.jsxs)("div",{className:"container",children:[(0,g.jsx)(q.Z,{}),k?(0,g.jsx)(P,{togglePartHandler:t,tuitionmList:r}):(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(x,{list:r,title:"Tuition Medium List",deleteHandler:s}),(0,g.jsx)("div",{className:"row my-3 mx-0",children:(0,g.jsx)("a",{href:"#",className:"btn btn-primary w-fit",onClick:t,role:"button",children:"Add Tuition Medium"})})]})]})})},R=E.OS.CLASS_TYPE,S=E.OS.SUBJECT,T=E.OS.USERS,U=E.OS.MEDIUM,V=function(){var a=(0,i.I0)();(0,N.Z)(768);var b=(0,i.v9)(function(a){return a.admin.adminSidebarElements}),c=(0,i.v9)(function(a){return a.admin.selectedContent}),d=function(b,c){b.preventDefault(),a((0,F.ml)(c))};return(0,g.jsxs)("div",{className:"Dashboard d-flex flex-column flex-md-row",children:[(0,g.jsx)("div",{className:"sidebar bg-danger text-secondary",children:(0,g.jsx)("ul",{className:"d-flex list-unstyled flex-row flex-md-column mb-0",children:b.map(function(a){return(0,g.jsx)("li",{className:c===a.name?"px-4 py-2 menu-item bg-primary":"px-4 py-2 menu-item ",children:(0,g.jsx)("a",{href:"#",role:"button",onClick:function(b){return d(b,a.name)},children:a.text})},a.id)})})}),(0,g.jsx)("div",{className:"content",children:(0,g.jsx)("div",{className:"w-full",children:(0,g.jsx)("div",{className:"p-4",children:function(){switch(c){case U:return(0,g.jsx)(Q,{});case R:return(0,g.jsx)(y,{});case S:return(0,g.jsx)(B,{});case T:return(0,g.jsx)(M,{});default:return(0,g.jsx)(y,{})}}()})})})]})},W=E.uJ.ADMIN,X=function(){var a=(0,j.useRouter)(),b=(0,i.I0)();(0,i.v9)(function(a){return a.elements.isLoading});var c=!1;return(0,h.useEffect)(function(){if(!1===c){b((0,n.o4)(!0));var e=JSON.parse(window.localStorage.getItem("user"));e&&e.role===W?(b((0,m.JE)(!0)),b((0,n.o4)(!1)),(0,d.Z)(f().mark(function a(){return f().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,Promise.all([b((0,m.bX)(null)),b((0,r.yt)()),b((0,z.v6)()),b((0,O.g6)())]);case 2:case"end":return a.stop()}},a)}))()):(b((0,m.JE)(!1)),window.localStorage.removeItem("user"),a.push("/admin/login"))}c=!0},[]),(0,g.jsx)(l.Z,{children:(0,g.jsx)("div",{className:"section-1 Admin",children:(0,g.jsx)(V,{})})})}}},function(a){a.O(0,[664,89,206,774,888,179],function(){var b;return a(a.s=7953)}),_N_E=a.O()}])