(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[149],{2565:function(a,b,c){(window.__NEXT_P=window.__NEXT_P||[]).push(["/user/register/form",function(){return c(4210)}])},239:function(a,b,c){"use strict";var d=c(797),e=c(5893),f=c(9473),g=c(7294),h=c(4884),i=c(9775),j=c(6618),k=c(8316);b.Z=function(a){var b=(0,g.useState)([]),c=b[0],l=b[1],m=(0,g.useState)([]),n=m[0],o=m[1],p=(0,g.useState)([]),q=p[0],r=p[1],s=(0,f.I0)(),t=(0,f.v9)(function(a){return a.tuitionm.tuitionmList}),u=(0,f.v9)(function(a){return a.tuitionm.selectedTuitionmList}),v=(0,f.v9)(function(a){return a.classtype.classtypeList}),w=(0,f.v9)(function(a){return a.classtype.displayClassType}),x=(0,f.v9)(function(a){return a.subject.subjectList}),y=(0,f.v9)(function(a){return a.subject.displaySubject}),z=(0,f.v9)(function(a){return a.classtype.selectedClasstypeList}),A=(0,f.v9)(function(a){return a.subject.selectedSubjectList}),B=(0,f.v9)(function(a){return a.user.userSubjects}),C=(0,f.v9)(function(a){return a.user.userTuitionmList}),D=(0,f.v9)(function(a){return a.user.userClassTypes}),E=function(a,b){try{if(a.find(function(a){return a.id===b}))return!0}catch(c){console.log(c)}return!1},F=function(a){for(var b=a.map(function(a){return a.Subjects}),c=[],e=0;e<b.length;e+=1)for(var f=b[e],g=0;g<f.length;g+=1)c.push(f[g].id);var h=(0,d.Z)(new Set(c));return r(h),h},G=function(a){if(z.length>0){var b=z.filter(function(b){return a.includes(b)}),c=(0,d.Z)(new Set(b));s((0,h.Vn)({ClassTypeId:c})),s((0,i.tL)(c))}},H=function(a){if(A.length>0){var b=A.filter(function(b){return a.includes(b)}),c=(0,d.Z)(new Set(b));s((0,h.Vn)({SubjectId:c})),s((0,j.qU)(c))}},I=function(a,b){var e=[];e=!0===a.target.checked?(0,d.Z)(u).concat([b]):c.filter(function(a){return a!==b});var f=t.filter(function(a){return e.includes(a.id)});s((0,h.Vn)({TuitionmId:e})),s((0,k.B8)(e)),l(e);for(var g=f.map(function(a){return a.ClassTypes}),m=[],n=0;n<g.length;n+=1)for(var p=g[n],q=0;q<p.length;q+=1)m.push(p[q].id);var r=(0,d.Z)(new Set(m));o(r),G(r);var w=F(v.filter(function(a){return r.includes(a.id)}));H(w),r.length>0?s((0,i.XG)(!0)):(s((0,i.XG)(!1)),s((0,j.DL)(!1)))},J=function(a,b){var c=[];c=!0===a.target.checked?(0,d.Z)(z).concat([b]):z.filter(function(a){return a!==b}),s((0,h.Vn)({ClassTypeId:c})),s((0,i.tL)(c));var e=F(v.filter(function(a){return c.includes(a.id)}));H(e),c.length>0?s((0,j.DL)(!0)):s((0,j.DL)(!1))},K=function(a,b){var c=[];c=!0===a.target.checked?(0,d.Z)(A).concat([b]):A.filter(function(a){return a!==b}),s((0,h.Vn)({SubjectId:c})),s((0,j.qU)(c))};return(0,e.jsxs)("div",{className:"ClassSubjectForm",children:[(0,e.jsx)("div",{className:"row mx-0 mb-3",children:(0,e.jsx)("div",{className:"card",children:(0,e.jsxs)("div",{className:"card-body",children:[(0,e.jsx)("h4",{className:"card-title",children:"Preffered Tuition Medium"}),(0,e.jsx)("div",{className:"row py-3",children:t.map(function(a,b){return(0,e.jsxs)("div",{className:"col-md-3 d-flex justify-content-end align-items-center flex-row-reverse",children:[(0,e.jsx)("label",{className:"fs-6 fw-light",htmlFor:a.id,children:a.name.substring(0,1).toUpperCase()+a.name.substring(1).toLowerCase()}),(0,e.jsx)("input",{name:a.id,type:"checkbox",className:"class-subject-checkbox mx-2",onChange:function(b){return I(b,a.id)},defaultChecked:E(C,a.id)})]},b)})})]})})}),w&&(0,e.jsx)("div",{className:"row mx-0 mb-3",children:(0,e.jsx)("div",{className:"card",children:(0,e.jsxs)("div",{className:"card-body",children:[(0,e.jsx)("h4",{className:"card-title",children:"Preffered Classes"}),(0,e.jsx)("div",{className:"row my-3",children:(function(){for(var a=[],b=0;b<v.length;b+=1)n.includes(v[b].id)&&a.push(v[b]);return 0===a.length?v:a})().map(function(a,b){return(0,e.jsxs)("div",{className:"col-md-3 d-flex justify-content-end align-items-center flex-row-reverse",children:[(0,e.jsx)("label",{className:"fs-6 fw-light",htmlFor:a.id,children:a.name.substring(0,1).toUpperCase()+a.name.substring(1).toLowerCase()}),(0,e.jsx)("input",{name:a.id,type:"checkbox",className:"class-subject-checkbox mx-2",onChange:function(b){return J(b,a.id)},defaultChecked:E(D,a.id)})]},b)})})]})})}),y&&(0,e.jsx)("div",{className:"row mx-0 mb-3",children:(0,e.jsx)("div",{className:"card",children:(0,e.jsxs)("div",{className:"card-body",children:[(0,e.jsx)("h4",{className:"card-title",children:"Preffered Subjects"}),(0,e.jsx)("div",{className:"row py-3",children:(function(){for(var a=[],b=0;b<x.length;b+=1)q.includes(x[b].id)&&a.push(x[b]);return 0===a.length?x:a})().map(function(a,b){return(0,e.jsxs)("div",{className:"col-md-3 d-flex justify-content-end align-items-center flex-row-reverse",children:[(0,e.jsx)("label",{className:"fs-6 fw-light",htmlFor:a.id,children:a.name.substring(0,1).toUpperCase()+a.name.substring(1).toLowerCase()}),(0,e.jsx)("input",{name:a.id,type:"checkbox",className:"class-subject-checkbox mx-2",onChange:function(b){return K(b,a.id)},defaultChecked:E(B,a.id)})]},b)})})]})})})]})}},4210:function(a,b,c){"use strict";c.r(b);var d=c(7568),e=c(6042),f=c(4051),g=c.n(f),h=c(5893),i=c(9473),j=c(1163),k=c(7294),l=c(375),m=c(8525),n=c(9775),o=c(6618),p=c(8316),q=c(4884),r=c(1964),s=c(8396),t=c(239),u=c(9373),v=c(5789),w=c(2319),x=c(7916),y=l.uJ.STUDENT;b.default=function(){var a,b=!0,c=!0,f=(0,j.useRouter)(),z=(0,i.I0)(),A=(0,k.useState)(null),B=A[0],C=A[1],D=(0,i.v9)(function(a){return a.user.selectedStep}),E=(0,i.v9)(function(a){return a.elements.isLoading}),F=(0,i.v9)(function(a){return a.user.registerableUser}),G=(0,i.v9)(function(a){return a.tuitionm.selectedTuitionmList}),H=(0,i.v9)(function(a){return a.classtype.selectedClasstypeList}),I=(0,i.v9)(function(a){return a.subject.selectedSubjectList}),J=(0,i.v9)(function(a){return a.elements.noValidate}),K=(a=(0,d.Z)(g().mark(function a(b){var d,h,i,j;return g().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(b.preventDefault(),z((0,m.Z5)(!1)),!1!==c){a.next=4;break}return a.abrupt("return",null);case 4:if(d=(0,e.Z)({},F),0!==G.length){a.next=7;break}return a.abrupt("return",z((0,m.ri)(["Please select a tuition medium"])));case 7:if(0!==H.length){a.next=9;break}return a.abrupt("return",z((0,m.ri)(["Please select a class"])));case 9:return a.prev=9,z((0,m.o4)(!0)),d.SubjectId=I,d.ClassTypeId=H,d.TuitionmId=G,console.log(F),console.log(d),a.next=18,x.Z.put("/user/register/".concat(B),d,{headers:{"Content-Type":"application/json"}});case 18:(202===(h=a.sent).status||201===h.status||200===h.status)&&(z((0,m.hb)()),z((0,m.Cr)(["Registered user successfully, now you can login"])),z((0,q.hZ)()),f.push("/user/login")),a.next=28;break;case 22:a.prev=22,a.t0=a.catch(9),console.log(a.t0),(null===a.t0|| void 0===a.t0?void 0:null===(i=a.t0.response)|| void 0===i?void 0:null===(j=i.data)|| void 0===j?void 0:j.msg)?z((0,m.ri)([a.t0.response.data.msg])):z((0,m.ri)([JSON.stringify(a.t0.response.data)])),z((0,m.o4)(!1));case 28:return a.abrupt("return",null);case 29:case"end":return a.stop()}},a,null,[[9,22]])})),function(b){return a.apply(this,arguments)}),L=function(a){c=a},M=function(a){return a.preventDefault(),z((0,m.hb)()),z((0,q.lk)(D-1))},N=function(a){var b,d;return(2===D&&F.role,null===(b=a,d=D,(b.preventDefault(),2===d&&(z((0,m.Z5)(!1)),console.log({validationPassed:c}),!1===c))?null:(z((0,m.hb)()),z((0,q.lk)(d)))))?null:z((0,q.lk)(D+1))};return(0,k.useEffect)(function(){if(z((0,m.hb)()),z((0,q.hZ)()),z((0,m.L$)()),b){var a=new URLSearchParams(window.location.search).get("userId");a?(C(a),(0,d.Z)(g().mark(function a(){return g().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return z((0,m.hb)()),a.next=3,Promise.all([z((0,n.yt)(null)),z((0,o.v6)(null)),z((0,p.g6)(null))]);case 3:case"end":return a.stop()}},a)}))()):(z((0,q.y4)(l.Nz)),f.push("/user/register"))}b=!1},[]),(0,h.jsx)(r.Z,{children:(0,h.jsx)("div",{className:"Registration container",children:E?(0,h.jsx)(v.Z,{}):(0,h.jsxs)("section",{className:"section",children:[(0,h.jsx)(w.Z,{}),(0,h.jsxs)("h1",{className:"Register text-capitalize",children:["Register (",F.role&&F.role,")"]}),(0,h.jsxs)("form",{onSubmit:K,noValidate:J,children:[2===D?(0,h.jsx)(s.Z,{changeValidationPassed:L,noValidate:J,userId:B}):3===D?(0,h.jsx)(t.Z,{registerableUser:F}):(0,h.jsx)(u.Z,{}),(0,h.jsx)("div",{className:"row mb-3",children:3===D?(0,h.jsxs)("div",{className:"d-flex",children:[1!==D&&(0,h.jsx)("button",{className:"btn btn-secondary w-fit",type:"button",onClick:M,children:"Previous"}),(0,h.jsx)("button",{className:"btn btn-primary w-fit mx-3",type:"submit",children:"Register"})]}):(0,h.jsxs)("div",{className:1===D?"d-flex w-full justify-content-center":"d-flex",children:[1!==D&&(0,h.jsx)("button",{className:"btn btn-secondary w-fit",type:"button",onClick:M,children:"Previous"}),2===D&&F.role===y?(0,h.jsx)("button",{className:"btn btn-primary w-fit mx-3",type:"submit",children:"Register"}):(0,h.jsx)("button",{className:"btn btn-primary w-fit mx-3",type:"button",onClick:N,children:"Next"})]})})]})]})})})}}},function(a){a.O(0,[255,664,206,728,774,888,179],function(){var b;return a(a.s=2565)}),_N_E=a.O()}])