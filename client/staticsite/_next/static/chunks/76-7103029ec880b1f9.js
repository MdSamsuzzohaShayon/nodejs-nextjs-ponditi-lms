(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[76],{2319:function(a,b,c){"use strict";var d=c(5893),e=c(9473);b.Z=function(){var a=(0,e.v9)(function(a){return a.elements.errorList}),b=(0,e.v9)(function(a){return a.elements.successMessageList});return a.length>0?(0,d.jsx)("div",{className:"alert alert-danger",children:(0,d.jsx)("ul",{children:a.map(function(a,b){return(0,d.jsxs)("li",{className:"list-unstyled",children:[(0,d.jsx)("img",{src:"/icons/exclamination.svg",alt:"",width:"25px"})," ",a]},b)})})}):b.length>0?(0,d.jsx)("div",{className:"alert alert-success",children:(0,d.jsx)("ul",{children:b.map(function(a,b){return(0,d.jsxs)("li",{className:"list-unstyled",children:[(0,d.jsx)("img",{src:"/icons/tick.svg",alt:"",width:"25px"})," ",a]},b)})})}):null}},2314:function(a,b,c){"use strict";c.d(b,{Z:function(){return v}});var d=c(4924),e=c(797),f=c(5893),g=c(7294),h=c(9473),i=c(7054),j=c(4884),k=c(8316),l=c(9775),m=c(8525),n=c(375),o=c(5789),p=c(6508),q=c.n(p),r=function(a){var b=(0,h.I0)(),c=(0,h.v9)(function(a){return a.elements.openPriceCalc}),d=function(a){a.preventDefault(),b((0,m.bC)(!1))};return(0,f.jsx)("div",{className:"".concat(q().priceCalculatorWrapper," position-absolute top-0 start-0 ").concat(c?"d-block":"d-none"),role:"button",children:(0,f.jsxs)("div",{className:"".concat(q().PriceCalculator," bg-secondary position-absolute top-50 start-50 translate-middle mt-1 p-2"),children:[(0,f.jsxs)("div",{className:"d-flex justify-content-between",children:[(0,f.jsx)("h2",{className:"fs-2 mt-5",children:null==a?void 0:a.title}),(0,f.jsx)("button",{className:"btn btn-outline-none",type:"button",children:(0,f.jsx)("img",{src:"/icons/close.svg",alt:"",onClick:d,role:"button"})})]}),(0,f.jsxs)("div",{className:"row mb-3",children:[(0,f.jsx)("div",{className:"col-md-6",children:(0,f.jsx)("label",{htmlFor:"monthly_earning",children:"Total Monthly Earning"})}),(0,f.jsx)("div",{className:"col-md-6",children:(0,f.jsx)("input",{onChange:a.inputPriceChangeHandler,defaultValue:a.defaultEarn,className:"rate-inputs form-control",name:"monthly_earning",type:"number"})})]}),(0,f.jsxs)("div",{className:"row mb-3",children:[(0,f.jsx)("div",{className:"col-md-6",children:(0,f.jsx)("label",{htmlFor:"days_of_month",children:"Total days of Month"})}),(0,f.jsx)("div",{className:"col-md-6",children:(0,f.jsx)("input",{onChange:a.inputPriceChangeHandler,defaultValue:a.defaultDays,className:"rate-inputs form-control",name:"days_of_month",type:"number"})})]}),(0,f.jsxs)("div",{className:"row mb-3",children:[(0,f.jsx)("hr",{}),(0,f.jsx)("div",{className:"col-md-12",children:(0,f.jsxs)("h2",{className:"fs-2",children:["Per hour rate ",null==a?void 0:a.result," Tk"]})})]}),(0,f.jsx)("div",{className:"w-full btn-wrapper d-flex justify-content-center",children:(0,f.jsx)("button",{className:"btn btn-primary",type:"button",onClick:d,children:"Ok"})})]})})},s=n.uJ.TEACHER,t=n.uJ.STUDENT,u="online",v=function(a){var b=(0,h.I0)(),c=(0,g.useRef)(null),p=(0,g.useRef)(null),q=(0,g.useRef)(null),v=(0,g.useRef)(null),w=(0,i.Ji)({googleMapsApiKey:n.Ej,libraries:n.S_}).isLoaded,x=(0,h.v9)(function(a){return a.user.registerableUser}),y=(0,h.v9)(function(a){return a.tuitionm.tuitionmList}),z=(0,h.v9)(function(a){return a.classtype.classtypeList}),A=(0,g.useState)(null),B=A[0],C=A[1],D=(0,g.useState)(u),E=D[0],F=D[1],G=(0,g.useState)("untitled"),H=G[0],I=G[1],J=(0,g.useState)(15),K=J[0],L=J[1],M=(0,g.useState)(15),N=M[0],O=M[1],P=(0,g.useState)(15),Q=P[0],R=P[1],S=(0,g.useState)(15),T=S[0],U=S[1],V=(0,g.useState)(3e3),W=V[0],X=V[1],Y=(0,g.useState)(3e3),Z=Y[0],$=Y[1],_=(0,g.useState)(3e3),aa=_[0],ab=_[1],ac=(0,g.useState)(3e3),ad=ac[0],ae=ac[1],af=(0,g.useState)(null),ag=af[0],ah=af[1],ai=(0,g.useState)(!1),aj=ai[0],ak=ai[1],al=(0,g.useState)(!1),am=al[0],an=al[1],ao=(0,g.useState)(!1),ap=ao[0],aq=ao[1],ar=function(a){switch(a.target.name){case u:ak(function(a){return!a});break;case"tl":aq(function(a){return!a});break;case"sl":an(function(a){return!a})}if(a.target.checked)b((0,j.A_)({tutionplace:(0,e.Z)(x.tutionplace).concat([a.target.name.toUpperCase()])}));else{var c=x.tutionplace.filter(function(b){return b.toUpperCase()!==a.target.name.toUpperCase()});b((0,j.A_)({tutionplace:c}))}},as=function(a,c){switch(a.preventDefault(),F(c),c){case u:I("Online rate"),ah(x.ol_rate),X(Z),L(N);break;case"tl":I("Teacher's location rate"),ah(x.tl_rate),X(ad),L(T);break;case"sl":I("Student's Location rate"),ah(x.sl_rate),X(aa),L(Q)}b((0,m.bC)(!0))},at=function(a){b((0,j.A_)((0,d.Z)({},a.target.name,a.target.value)))},au=function(a){b((0,j.A_)((0,d.Z)({},a.target.name,parseInt(a.target.value,10))))},av=function(a){b((0,k.B8)([parseInt(a.target.value,10)]))},aw=function(a){b((0,l.tL)([parseInt(a.target.value,10)]))},ax=function(a){var c=120,d=null,e=null;switch("monthly_earning"===a.target.name?(d=parseInt(a.target.value,10),e=K,c=(d/K).toFixed(2)):"days_of_month"===a.target.name&&(d=W,e=parseInt(a.target.value,10),c=(W/e).toFixed(2)),ah(c),E){case u:b((0,j.A_)({ol_rate:parseInt(c,10)})),p.current.value=c,$(d),O(e);break;case"sl":b((0,j.A_)({sl_rate:parseInt(c,10)})),v.current.value=c,ab(d),R(e);break;case"tl":b((0,j.A_)({tl_rate:parseInt(c,10)})),q.current.value=c,ae(d),U(e)}},ay=function(a){b((0,j.A_)((0,d.Z)({},a.target.name,a.target.checked)))},az=function(a){ay(a),a.target.checked?(c.current.disabled=!0,c.current.value=null):c.current.disabled=!1},aA="fs-6 fw-light text-danger",aB=function(b,c){return""===b||null===b?(a.changeValidationPassed(!1),(0,f.jsxs)("p",{className:!1===a.noValidate?aA:"".concat(aA," text-danger d-none"),children:[c," can not be empty"]})):null},aC=function(){var a=B.getPlace().geometry.location.lat(),c=B.getPlace().geometry.location.lng();try{b((0,j.A_)({presentaddress:"".concat(B.getPlace().name,", ").concat(B.getPlace().formatted_address,", (").concat(c,", ").concat(a,")")}))}catch(d){console.log(d)}};if(!w)return(0,f.jsx)(o.Z,{});var aD=function(a){C(a)};return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsxs)("div",{className:"row mb-3",children:[(0,f.jsxs)("div",{className:"col-md-6",children:[(0,f.jsx)("label",{htmlFor:"firstname",children:"Name*"}),(0,f.jsx)("input",{type:"text",className:"form-control",name:"name",id:"name",defaultValue:null==x?void 0:x.name,onChange:at,required:!0}),aB(x.name,"Name")]}),(0,f.jsxs)("div",{className:"col-md-6",children:[(0,f.jsx)("label",{htmlFor:"email",children:"Email*"}),(0,f.jsx)("input",{type:"email",className:"form-control",name:"email",id:"email",defaultValue:null==x?void 0:x.email,onChange:at,required:!0}),aB(x.email,"Email")]})]}),(0,f.jsxs)("div",{className:"row mb-3",children:[x.role===s&&(0,f.jsxs)("div",{className:"col-md-6",children:[(0,f.jsx)("label",{htmlFor:"profession",children:"Profession*"}),(0,f.jsx)("input",{type:"profession",className:"form-control",name:"profession",id:"profession",defaultValue:null==x?void 0:x.profession,onChange:at}),aB(x.profession,"Profession")]}),(0,f.jsxs)("div",{className:x.role!==s?"col-md-12":"col-md-6",children:[(0,f.jsx)("label",{htmlFor:"institution",children:"Institution*"}),(0,f.jsx)("input",{type:"institution",className:"form-control",name:"institution",id:"institution",defaultValue:null==x?void 0:x.institution,onChange:at,required:!0}),aB(x.institution,"Institution")]})]}),(0,f.jsxs)("div",{className:"row mb-3",children:[x.role===s&&(0,f.jsxs)("div",{className:"col-md-6",children:[(0,f.jsx)("label",{htmlFor:"experience",children:"Experience(years)*"}),(0,f.jsx)("input",{type:"number",className:"form-control",name:"experience",id:"experience",defaultValue:null==x?void 0:x.experience,onChange:at}),aB(x.experience,"Experience")]}),(0,f.jsxs)("div",{className:x.role!==s?"col-md-12":"col-md-6",children:[(0,f.jsx)("label",{htmlFor:"district",children:"Present Address*"}),(0,f.jsx)(i.F2,{onLoad:aD,onPlaceChanged:aC,className:"form-control p-0",children:(0,f.jsx)("input",{type:"text",className:"form-control",id:"presentaddress",name:"presentaddress",onChange:at})}),aB(x.presentaddress,"Location")]})]}),x.role===s&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsxs)("div",{className:"row mb-3",children:[(0,f.jsxs)("div",{className:"col-md-6",children:[(0,f.jsx)("label",{htmlFor:"firstname",children:"highest Education*"}),(0,f.jsx)("input",{type:"text",className:"form-control",name:"degree",id:"degree",defaultValue:null==x?void 0:x.degree,onChange:at}),aB(x.degree,"Degree")]}),(0,f.jsxs)("div",{className:"col-md-6",children:[(0,f.jsx)("label",{htmlFor:"major",children:"Major / Subject*"}),(0,f.jsx)("input",{type:"text",className:"form-control",name:"major",id:"major",defaultValue:null==x?void 0:x.major,onChange:at}),aB(x.major,"Major")]})]}),(0,f.jsxs)("div",{className:"row mb-3",children:[(0,f.jsxs)("div",{className:"col-md-6",children:[(0,f.jsx)("label",{htmlFor:"passing_year",children:"Passing Year*"}),(0,f.jsx)("input",{type:"number",className:"form-control",name:"passing_year",id:"passing_year",ref:c,defaultValue:null==x?void 0:x.passing_year,onChange:at})]}),(0,f.jsxs)("div",{className:"col-md-6 d-flex flex-row-reverse justify-content-end align-items-center",children:[(0,f.jsx)("label",{htmlFor:"running_study",className:"mt-4",children:"Currently running study"}),(0,f.jsx)("input",{type:"checkbox",name:"running_study",className:"mx-2 mt-4",id:"running_study",onChange:az})]})]}),(0,f.jsx)("div",{className:"row mb-3",children:(0,f.jsxs)("div",{className:"col-md-12",children:[(0,f.jsx)("label",{htmlFor:"tuitionstyle",children:"Tuition Style"}),(0,f.jsxs)("div",{className:"row",children:[(0,f.jsx)("div",{className:"col-md-3",children:(0,f.jsx)("div",{className:"input-item d-flex align-items-start justify-content-start flex-column",children:(0,f.jsxs)("div",{className:"form-check",children:[(0,f.jsx)("input",{className:"form-check-input",name:u,type:"checkbox",onChange:ar,id:u}),(0,f.jsx)("label",{className:"form-check-label",htmlFor:u,children:"Online"})]})})}),(0,f.jsx)("div",{className:"col-md-3",children:(0,f.jsx)("div",{className:"input-item d-flex align-items-start justify-content-start flex-column",children:(0,f.jsxs)("div",{className:"form-check",children:[(0,f.jsx)("input",{className:"form-check-input",name:"tl",type:"checkbox",onChange:ar,id:"tl"}),(0,f.jsx)("label",{className:"form-check-label",htmlFor:"tl",children:"Teacher's location"})]})})}),(0,f.jsx)("div",{className:"col-md-3",children:(0,f.jsx)("div",{className:"input-item d-flex align-items-start justify-content-start flex-column",children:(0,f.jsxs)("div",{className:"form-check",children:[(0,f.jsx)("input",{className:"form-check-input",name:"sl",type:"checkbox",onChange:ar,id:"sl"}),(0,f.jsx)("label",{className:"form-check-label",htmlFor:"sl",children:"Student's location"})]})})})]}),(0,f.jsxs)("div",{className:"row",children:[(0,f.jsx)("div",{className:"col-md-3",children:aj&&(0,f.jsx)("div",{className:"price-form",children:(0,f.jsxs)("div",{className:"input-group mb-3",children:[(0,f.jsx)("div",{className:"form-floating p-0",children:(0,f.jsx)("input",{type:"number",className:"form-control",ref:p,defaultValue:null==x?void 0:x.ol_rate,name:"ol_rate",onChange:au})}),(0,f.jsx)("span",{className:"input-group-text",children:(0,f.jsx)("img",{src:"/icons/calculator.svg",alt:"",onClick:function(a){return as(a,u)},role:"button"})})]})})}),(0,f.jsx)("div",{className:"col-md-3",children:ap&&(0,f.jsx)("div",{className:"price-form",children:(0,f.jsxs)("div",{className:"input-group mb-3",children:[(0,f.jsx)("div",{className:"form-floating p-0",children:(0,f.jsx)("input",{type:"number",className:"form-control",ref:q,onChange:au,defaultValue:null==x?void 0:x.tl_rate,id:"tl_rate",name:"tl_rate"})}),(0,f.jsx)("span",{className:"input-group-text",children:(0,f.jsx)("img",{src:"/icons/calculator.svg",alt:"",onClick:function(a){return as(a,"tl")},role:"button"})})]})})}),(0,f.jsx)("div",{className:"col-md-3",children:am&&(0,f.jsx)("div",{className:"price-form",children:(0,f.jsxs)("div",{className:"input-group mb-3",children:[(0,f.jsx)("div",{className:"form-floating p-0",children:(0,f.jsx)("input",{type:"number",className:"form-control",ref:v,onChange:au,defaultValue:null==x?void 0:x.sl_rate,id:"sl_rate",name:"sl_rate"})}),(0,f.jsx)("span",{className:"input-group-text",children:(0,f.jsx)("img",{src:"/icons/calculator.svg",alt:"",onClick:function(a){return as(a,"sl")},role:"button"})})]})})})]}),function(){if(x.tutionplace.length<1)return a.changeValidationPassed(!1),(0,f.jsx)("p",{className:!1===a.noValidate?aA:"".concat(aA," text-danger d-none"),children:"You must select atleast one style"});if(x.tutionplace.length>0){var b="",c=!0;return(aj&&(null===x.ol_rate||""===x.ol_rate)&&(c=!1,b+="Online, "),am&&(null===x.sl_rate||""===x.sl_rate)&&(c=!1,b+="Student's Location, "),ap&&(null===x.tl_rate||""===x.tl_rate)&&(c=!1,b+="Teacher's Location "),c)?null:(a.changeValidationPassed(!1),(0,f.jsxs)("p",{className:!1===a.noValidate?aA:"".concat(aA," text-danger d-none"),children:["Rates can not be empty for ",b]}))}return null}()]})}),(0,f.jsx)(r,{title:H,inputPriceChangeHandler:ax,result:ag,defaultDays:K,defaultEarn:W})]}),x.role===t&&(0,f.jsxs)("div",{className:"row mb-3",children:[(0,f.jsxs)("div",{className:"col-md-6",children:[(0,f.jsx)("label",{htmlFor:"tutionm",children:"Medium"}),(0,f.jsx)("select",{className:"form-control",name:"tutionm",id:"tutionm",onChange:av,children:y.map(function(a){return(0,f.jsx)("option",{value:a.id,children:a.name},a.id)})})]}),(0,f.jsxs)("div",{className:"col-md-6",children:[(0,f.jsx)("label",{htmlFor:"classtype",children:"Class Name"}),(0,f.jsx)("select",{className:"form-control",name:"classtype",id:"classtype",onChange:aw,children:z.map(function(a){return(0,f.jsx)("option",{value:a.id,children:a.name},a.id)})})]})]})]})}},9373:function(a,b,c){"use strict";var d=c(5893),e=c(9473),f=c(4884),g=c(375),h=g.uJ.TEACHER,i=g.uJ.STUDENT;b.Z=function(){var a=(0,e.I0)(),b=(0,e.v9)(function(a){return a.user.registerableUser}),c=function(b,c){b.preventDefault(),a((0,f.A_)({role:c}))};return(0,d.jsx)("div",{className:"row mb-3 mx-0 text-center",children:(0,d.jsxs)("div",{className:"buttons my-3",children:[(0,d.jsx)("button",{type:"button",onClick:function(a){return c(a,h)},className:b.role===h?"btn btn-primary border  p-5 fs-3":"btn btn-primary-outline border  p-5 fs-3",children:"Register as teacher"}),(0,d.jsx)("button",{type:"button",className:b.role===i?"btn btn-primary border  p-5 fs-3":"btn btn-primary-outline border  p-5 fs-3",onClick:function(a){return c(a,"STUDENT")},children:"Register as student"})]})})}},6508:function(a){a.exports={priceCalculatorWrapper:"PriceCalculator_priceCalculatorWrapper__UUdVs",PriceCalculator:"PriceCalculator_PriceCalculator___ykp5"}}}])