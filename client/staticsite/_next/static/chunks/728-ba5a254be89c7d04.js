(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[728],{2319:function(a,b,c){"use strict";var d=c(5893),e=c(9473);b.Z=function(){var a=(0,e.v9)(function(a){return a.elements.errorList}),b=(0,e.v9)(function(a){return a.elements.successMessageList});return a.length>0?(0,d.jsx)("div",{className:"alert alert-danger",children:(0,d.jsx)("ul",{children:a.map(function(a,b){return(0,d.jsxs)("li",{className:"list-unstyled",children:[(0,d.jsx)("img",{src:"/icons/exclamination.svg",alt:"",width:"25px"})," ",a]},b)})})}):b.length>0?(0,d.jsx)("div",{className:"alert alert-success",children:(0,d.jsx)("ul",{children:b.map(function(a,b){return(0,d.jsxs)("li",{className:"list-unstyled",children:[(0,d.jsx)("img",{src:"/icons/tick.svg",alt:"",width:"25px"})," ",a]},b)})})}):null}},7624:function(a,b,c){"use strict";var d=c(5893),e=c(9473),f=c(6508),g=c.n(f),h=c(8525);b.Z=function(a){var b=(0,e.I0)(),c=(0,e.v9)(function(a){return a.elements.openPriceCalc}),f=function(a){a.preventDefault(),b((0,h.bC)(!1))};return(0,d.jsx)("div",{className:"".concat(g().priceCalculatorWrapper," position-absolute top-0 start-0 ").concat(c?"d-block":"d-none"),role:"button",children:(0,d.jsxs)("div",{className:"".concat(g().PriceCalculator," bg-secondary position-absolute top-50 start-50 translate-middle mt-1 p-2"),children:[(0,d.jsxs)("div",{className:"d-flex justify-content-between",children:[(0,d.jsx)("h2",{className:"fs-2 mt-5",children:null==a?void 0:a.title}),(0,d.jsx)("button",{className:"btn btn-outline-none",type:"button",children:(0,d.jsx)("img",{src:"/icons/close.svg",alt:"",onClick:f,role:"button"})})]}),(0,d.jsxs)("div",{className:"row mb-3",children:[(0,d.jsx)("div",{className:"col-md-6",children:(0,d.jsx)("label",{htmlFor:"monthly_earning",children:"Total Monthly Earning"})}),(0,d.jsx)("div",{className:"col-md-6",children:(0,d.jsx)("input",{onChange:a.inputPriceChangeHandler,defaultValue:a.defaultEarn,className:"rate-inputs form-control",name:"monthly_earning",type:"number"})})]}),(0,d.jsxs)("div",{className:"row mb-3",children:[(0,d.jsx)("div",{className:"col-md-6",children:(0,d.jsx)("label",{htmlFor:"days_of_month",children:"Total days of Month"})}),(0,d.jsx)("div",{className:"col-md-6",children:(0,d.jsx)("input",{onChange:a.inputPriceChangeHandler,defaultValue:a.defaultDays,className:"rate-inputs form-control",name:"days_of_month",type:"number"})})]}),(0,d.jsxs)("div",{className:"row mb-3",children:[(0,d.jsx)("hr",{}),(0,d.jsx)("div",{className:"col-md-12",children:(0,d.jsxs)("h2",{className:"fs-2",children:["Per hour rate ",null==a?void 0:a.result," Tk"]})})]}),(0,d.jsx)("div",{className:"w-full btn-wrapper d-flex justify-content-center",children:(0,d.jsx)("button",{className:"btn btn-primary",type:"button",onClick:f,children:"Ok"})})]})})}},8396:function(a,b,c){"use strict";var d=c(4924),e=c(797),f=c(5893),g=c(7294),h=c(9473),i=c(7054),j=c(4884),k=c(8316),l=c(9775),m=c(8525),n=c(375),o=c(5789),p=c(7624),q=n.uJ.TEACHER,r=n.uJ.STUDENT,s="online";b.Z=function(a){var b,c=(0,h.I0)(),t=(0,g.useRef)(null),u=(0,g.useRef)(null),v=(0,g.useRef)(null),w=(0,g.useRef)(null),x=(0,i.Ji)({googleMapsApiKey:n.Ej,libraries:n.S_}).isLoaded,y=(0,h.v9)(function(a){return a.user.registerableUser}),z=(0,h.v9)(function(a){return a.tuitionm.tuitionmList}),A=(0,h.v9)(function(a){return a.classtype.classtypeList}),B=(0,g.useState)(null),C=B[0],D=B[1],E=(0,g.useState)(s),F=E[0],G=E[1],H=(0,g.useState)("untitled"),I=H[0],J=H[1],K=(0,g.useState)(15),L=K[0],M=K[1],N=(0,g.useState)(15),O=N[0],P=N[1],Q=(0,g.useState)(15),R=Q[0],S=Q[1],T=(0,g.useState)(15),U=T[0],V=T[1],W=(0,g.useState)(3e3),X=W[0],Y=W[1],Z=(0,g.useState)(3e3),$=Z[0],_=Z[1],aa=(0,g.useState)(3e3),ab=aa[0],ac=aa[1],ad=(0,g.useState)(3e3),ae=ad[0],af=ad[1],ag=(0,g.useState)(null),ah=ag[0],ai=ag[1],aj=(0,g.useState)(!1),ak=aj[0],al=aj[1],am=(0,g.useState)(!1),an=am[0],ao=am[1],ap=(0,g.useState)(!1),aq=ap[0],ar=ap[1],as=function(a){switch(a.target.name){case s:al(function(a){return!a});break;case"tl":ar(function(a){return!a});break;case"sl":ao(function(a){return!a})}if(a.target.checked)c((0,j.A_)({tutionplace:(0,e.Z)(y.tutionplace).concat([a.target.name.toUpperCase()])}));else{var b=y.tutionplace.filter(function(b){return b.toUpperCase()!==a.target.name.toUpperCase()});c((0,j.A_)({tutionplace:b}))}},at=function(a,b){switch(a.preventDefault(),G(b),b){case s:J("Online rate"),ai(y.ol_rate),Y($),M(O);break;case"tl":J("Teacher's location rate"),ai(y.tl_rate),Y(ae),M(U);break;case"sl":J("Student's Location rate"),ai(y.sl_rate),Y(ab),M(R)}c((0,m.bC)(!0))},au=function(a){c((0,j.A_)((0,d.Z)({},a.target.name,a.target.value)))},av=function(a){c((0,j.A_)((0,d.Z)({},a.target.name,parseInt(a.target.value,10))))},aw=function(a){c((0,k.B8)([parseInt(a.target.value,10)]))},ax=function(a){c((0,l.tL)([parseInt(a.target.value,10)]))},ay=function(a){var b=120,d=null,e=null;switch("monthly_earning"===a.target.name?(d=parseInt(a.target.value,10),e=L,b=(d/L).toFixed(2)):"days_of_month"===a.target.name&&(d=X,e=parseInt(a.target.value,10),b=(X/e).toFixed(2)),ai(b),F){case s:c((0,j.A_)({ol_rate:parseInt(b,10)})),u.current.value=b,_(d),P(e);break;case"sl":c((0,j.A_)({sl_rate:parseInt(b,10)})),w.current.value=b,ac(d),S(e);break;case"tl":c((0,j.A_)({tl_rate:parseInt(b,10)})),v.current.value=b,af(d),V(e)}},az=function(a){c((0,j.A_)((0,d.Z)({},a.target.name,a.target.checked)))},aA=function(a){az(a),a.target.checked?(t.current.disabled=!0,t.current.value=null):t.current.disabled=!1},aB="fs-6 fw-light text-danger",aC=function(b,c){return""===b||null===b?(a.changeValidationPassed(!1),(0,f.jsxs)("p",{className:!1===a.noValidate?aB:"".concat(aB," text-danger d-none"),children:[c," can not be empty"]})):null},aD=function(){var a=C.getPlace().geometry.location.lat(),b=C.getPlace().geometry.location.lng();try{c((0,j.A_)({presentaddress:"".concat(C.getPlace().name,", ").concat(C.getPlace().formatted_address,", (").concat(b,", ").concat(a,")")}))}catch(d){console.log(d)}};if(!x)return(0,f.jsx)(o.Z,{});var aE=function(a){D(a)};return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsxs)("div",{className:"row mb-3",children:[(0,f.jsxs)("div",{className:"col-md-6",children:[(0,f.jsx)("label",{htmlFor:"firstname",children:"Name*"}),(0,f.jsx)("input",{type:"text",className:"form-control",name:"name",id:"name",defaultValue:null==y?void 0:y.name,onChange:au,required:!0}),aC(y.name,"Name")]}),(0,f.jsxs)("div",{className:"col-md-6",children:[(0,f.jsx)("label",{htmlFor:"email",children:"Email*"}),(0,f.jsx)("input",{type:"email",className:"form-control",name:"email",id:"email",defaultValue:null==y?void 0:y.email,onChange:au,required:!0}),aC(y.email,"Email")]})]}),(0,f.jsxs)("div",{className:"row mb-3",children:[y.role===q&&(0,f.jsxs)("div",{className:"col-md-6",children:[(0,f.jsx)("label",{htmlFor:"profession",children:"Profession*"}),(0,f.jsx)("input",{type:"profession",className:"form-control",name:"profession",id:"profession",defaultValue:null==y?void 0:y.profession,onChange:au}),aC(y.profession,"Profession")]}),(0,f.jsxs)("div",{className:y.role!==q?"col-md-12":"col-md-6",children:[(0,f.jsx)("label",{htmlFor:"institution",children:"Institution*"}),(0,f.jsx)("input",{type:"institution",className:"form-control",name:"institution",id:"institution",defaultValue:null==y?void 0:y.institution,onChange:au,required:!0}),aC(y.institution,"Institution")]})]}),(0,f.jsxs)("div",{className:"row mb-3",children:[y.role===q&&(0,f.jsxs)("div",{className:"col-md-6",children:[(0,f.jsx)("label",{htmlFor:"experience",children:"Experience(years)*"}),(0,f.jsx)("input",{type:"number",className:"form-control",name:"experience",id:"experience",defaultValue:null==y?void 0:y.experience,onChange:au}),aC(y.experience,"Experience")]}),(0,f.jsxs)("div",{className:y.role!==q?"col-md-12":"col-md-6",children:[(0,f.jsx)("label",{htmlFor:"district",children:"Present Address*"}),(0,f.jsx)(i.F2,{onLoad:aE,onPlaceChanged:aD,className:"form-control p-0",children:(0,f.jsx)("input",{type:"text",className:"form-control",id:"presentaddress",name:"presentaddress",onChange:au})}),aC(y.presentaddress,"Location")]})]}),y.role===q&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsxs)("div",{className:"row mb-3",children:[(0,f.jsxs)("div",{className:"col-md-6",children:[(0,f.jsx)("label",{htmlFor:"firstname",children:"highest Education*"}),(0,f.jsx)("input",{type:"text",className:"form-control",name:"degree",id:"degree",defaultValue:null==y?void 0:y.degree,onChange:au}),aC(y.degree,"Degree")]}),(0,f.jsxs)("div",{className:"col-md-6",children:[(0,f.jsx)("label",{htmlFor:"major",children:"Major / Subject*"}),(0,f.jsx)("input",{type:"text",className:"form-control",name:"major",id:"major",defaultValue:null==y?void 0:y.major,onChange:au}),aC(y.major,"Major")]})]}),(0,f.jsxs)("div",{className:"row mb-3",children:[(0,f.jsxs)("div",{className:"col-md-6",children:[(0,f.jsx)("label",{htmlFor:"passing_year",children:"Passing Year*"}),(0,f.jsx)("input",{type:"number",className:"form-control",name:"passing_year",id:"passing_year",ref:t,defaultValue:null==y?void 0:y.passing_year,onChange:au})]}),(0,f.jsxs)("div",{className:"col-md-6 d-flex flex-row-reverse justify-content-end align-items-center",children:[(0,f.jsx)("label",{htmlFor:"running_study",className:"mt-4",children:"Currently running study"}),(0,f.jsx)("input",{type:"checkbox",name:"running_study",className:"mx-2 mt-4",id:"running_study",onChange:aA})]})]}),(0,f.jsx)("div",{className:"row mb-3",children:(0,f.jsxs)("div",{className:"col-md-12",children:[(0,f.jsx)("label",{htmlFor:"tuitionstyle",children:"Tuition Style"}),(0,f.jsxs)("div",{className:"row",children:[(0,f.jsx)("div",{className:"col-md-3",children:(0,f.jsx)("div",{className:"input-item d-flex align-items-start justify-content-start flex-column",children:(0,f.jsxs)("div",{className:"form-check",children:[(0,f.jsx)("input",{className:"form-check-input",name:s,type:"checkbox",onChange:as,id:s}),(0,f.jsx)("label",{className:"form-check-label",htmlFor:s,children:"Online"})]})})}),(0,f.jsx)("div",{className:"col-md-3",children:(0,f.jsx)("div",{className:"input-item d-flex align-items-start justify-content-start flex-column",children:(0,f.jsxs)("div",{className:"form-check",children:[(0,f.jsx)("input",{className:"form-check-input",name:"tl",type:"checkbox",onChange:as,id:"tl"}),(0,f.jsx)("label",{className:"form-check-label",htmlFor:"tl",children:"Teacher's location"})]})})}),(0,f.jsx)("div",{className:"col-md-3",children:(0,f.jsx)("div",{className:"input-item d-flex align-items-start justify-content-start flex-column",children:(0,f.jsxs)("div",{className:"form-check",children:[(0,f.jsx)("input",{className:"form-check-input",name:"sl",type:"checkbox",onChange:as,id:"sl"}),(0,f.jsx)("label",{className:"form-check-label",htmlFor:"sl",children:"Student's location"})]})})})]}),(0,f.jsxs)("div",{className:"row",children:[(0,f.jsx)("div",{className:"col-md-3",children:ak&&(0,f.jsx)("div",{className:"price-form",children:(0,f.jsxs)("div",{className:"input-group mb-3",children:[(0,f.jsx)("div",{className:"form-floating p-0",children:(0,f.jsx)("input",{type:"number",className:"form-control",ref:u,defaultValue:null==y?void 0:y.ol_rate,name:"ol_rate",onChange:av})}),(0,f.jsx)("span",{className:"input-group-text",children:(0,f.jsx)("img",{src:"/icons/calculator.svg",alt:"",onClick:function(a){return at(a,s)},role:"button"})})]})})}),(0,f.jsx)("div",{className:"col-md-3",children:aq&&(0,f.jsx)("div",{className:"price-form",children:(0,f.jsxs)("div",{className:"input-group mb-3",children:[(0,f.jsx)("div",{className:"form-floating p-0",children:(0,f.jsx)("input",{type:"number",className:"form-control",ref:v,onChange:av,defaultValue:null==y?void 0:y.tl_rate,id:"tl_rate",name:"tl_rate"})}),(0,f.jsx)("span",{className:"input-group-text",children:(0,f.jsx)("img",{src:"/icons/calculator.svg",alt:"",onClick:function(a){return at(a,"tl")},role:"button"})})]})})}),(0,f.jsx)("div",{className:"col-md-3",children:an&&(0,f.jsx)("div",{className:"price-form",children:(0,f.jsxs)("div",{className:"input-group mb-3",children:[(0,f.jsx)("div",{className:"form-floating p-0",children:(0,f.jsx)("input",{type:"number",className:"form-control",ref:w,onChange:av,defaultValue:null==y?void 0:y.sl_rate,id:"sl_rate",name:"sl_rate"})}),(0,f.jsx)("span",{className:"input-group-text",children:(0,f.jsx)("img",{src:"/icons/calculator.svg",alt:"",onClick:function(a){return at(a,"sl")},role:"button"})})]})})})]}),function(){if(y.tutionplace.length<1)return a.changeValidationPassed(!1),(0,f.jsx)("p",{className:!1===a.noValidate?aB:"".concat(aB," text-danger d-none"),children:"You must select atleast one style"});if(y.tutionplace.length>0){var b="",c=!0;return(ak&&(null===y.ol_rate||""===y.ol_rate)&&(c=!1,b+="Online, "),an&&(null===y.sl_rate||""===y.sl_rate)&&(c=!1,b+="Student's Location, "),aq&&(null===y.tl_rate||""===y.tl_rate)&&(c=!1,b+="Teacher's Location "),c)?null:(a.changeValidationPassed(!1),(0,f.jsxs)("p",{className:!1===a.noValidate?aB:"".concat(aB," text-danger d-none"),children:["Rates can not be empty for ",b]}))}return null}()]})}),(0,f.jsx)(p.Z,{title:I,inputPriceChangeHandler:ay,result:ah,defaultDays:L,defaultEarn:X})]}),y.role===r&&(0,f.jsxs)("div",{className:"row mb-3",children:[(0,f.jsxs)("div",{className:"col-md-6",children:[(0,f.jsx)("label",{htmlFor:"tutionm",children:"Medium*"}),(0,f.jsxs)("select",{className:"form-control",name:"tutionm",id:"tutionm",defaultValue:null===(b=z[0])|| void 0===b?void 0:b.id,onChange:aw,children:[(0,f.jsx)("option",{value:"0",selected:!0,children:"Select a medium"}),z.map(function(a){return(0,f.jsx)("option",{value:a.id,children:a.name},a.id)})]})]}),(0,f.jsxs)("div",{className:"col-md-6",children:[(0,f.jsx)("label",{htmlFor:"classtype",children:"Class Name*"}),(0,f.jsxs)("select",{className:"form-control",name:"classtype",id:"classtype",onChange:ax,children:[(0,f.jsx)("option",{value:"0",selected:!0,children:"Select a class"}),A.map(function(a){return(0,f.jsx)("option",{value:a.id,children:a.name},a.id)})]})]})]}),(0,f.jsx)("div",{className:"row mb-3",children:(0,f.jsxs)("div",{className:"col-md-6",children:[(0,f.jsx)("label",{htmlFor:"ref",children:"Reference no.(Optional)"}),(0,f.jsx)("input",{type:"number",onChange:au,name:"ref",id:"ref",className:"form-control"})]})})]})}},9373:function(a,b,c){"use strict";var d=c(5893),e=c(9473),f=c(4884),g=c(375),h=g.uJ.TEACHER,i=g.uJ.STUDENT;b.Z=function(){var a=(0,e.I0)(),b=(0,e.v9)(function(a){return a.user.registerableUser}),c=function(b,c){b.preventDefault(),a((0,f.A_)({role:c}))};return(0,d.jsx)("div",{className:"row mb-3 mx-0 text-center",children:(0,d.jsxs)("div",{className:"buttons my-3",children:[(0,d.jsx)("button",{type:"button",onClick:function(a){return c(a,h)},className:b.role===h?"btn btn-primary border  p-5 fs-3":"btn btn-primary-outline border  p-5 fs-3",children:"Register as teacher"}),(0,d.jsx)("button",{type:"button",className:b.role===i?"btn btn-primary border  p-5 fs-3":"btn btn-primary-outline border  p-5 fs-3",onClick:function(a){return c(a,"STUDENT")},children:"Register as student"})]})})}},6508:function(a){a.exports={priceCalculatorWrapper:"PriceCalculator_priceCalculatorWrapper__UUdVs",PriceCalculator:"PriceCalculator_PriceCalculator___ykp5"}}}])