(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[603],{3417:function(a,b,c){(window.__NEXT_P=window.__NEXT_P||[]).push(["/search",function(){return c(1045)}])},4157:function(a,b,c){"use strict";var d=c(5893);c(7294),b.Z=function(a){var b=function(b,c){a.setStars?a.setStars(b,c):console.log("No event found")};return(0,d.jsx)("div",{className:"stars",children:function(){for(var c=function(c){var f="/icons/star-outline.svg";f=Number.isNaN(a.limit)?"/icons/star-outline.svg":c+1>a.limit?"/icons/star-outline.svg":"/icons/star.svg";var g=(0,d.jsx)("li",{onClick:function(a){return b(a,c+1)},role:"button",children:(0,d.jsx)("img",{width:20,src:f,alt:""})},c);e.push(g)},e=[],f=0;f<5;f+=1)c(f);return(0,d.jsx)("ul",{className:"stars d-flex align-items-center justify-content-between list-unstyled w-fit",children:e})}()})}},1045:function(a,b,c){"use strict";c.r(b),c.d(b,{default:function(){return E}});var d=c(7568),e=c(4051),f=c.n(e),g=c(5893),h=c(7294),i=c(9473),j=c(8525),k=c(4862),l=c(9775),m=c(6618),n=c(8316),o=c(1964),p=c(4532),q=c(6042),r=c(9396),s=c(1664),t=c.n(s),u=c(1163),v=c.n(u),w=c(1673),x=c(375),y=c(4157),z=x.uJ.STUDENT,A=x.Wb.ANY,B=x.V5.ONLINE,C=function(){var a=(0,i.I0)(),b=(0,i.v9)(function(a){return a.user.authUserInfo}),c=(0,i.v9)(function(a){return a.search.searchUserList}),d=(0,i.v9)(function(a){return a.search.searchParams}),e=(0,i.v9)(function(a){return a.classtype.classtypeList}),f=(0,i.v9)(function(a){return a.subject.subjectList}),h=(0,i.v9)(function(a){return a.search.searchAllUserList}),j=(0,i.v9)(function(a){return a.search.rpStart}),l=(0,i.v9)(function(a){return a.search.rpTotal}),m=(0,i.v9)(function(a){return a.search.rpTotalPage}),n=(0,i.v9)(function(a){return a.search.rpCurrentPage}),o=function(b,c){b.preventDefault(),a((0,k.Me)((c-1)*l)),a((0,k.Mo)(c));var d=h.slice((c-1)*l,c*l);a((0,k.u1)(d))},p=function(b){if(b.preventDefault(),1!==n){var c=n-1,d=j/l;a((0,k.Me)(d)),a((0,k.Mo)(c));var e=(c-1)*l,f=(c-1)*l+l,g=h.slice(e,f);a((0,k.u1)(g))}},s=function(b){if(b.preventDefault(),n!==m){var c=n+1,d=j/l;a((0,k.Me)(d)),a((0,k.Mo)(c));var e=(c-1)*l,f=(c-1)*l+l,g=h.slice(e,f);a((0,k.u1)(g))}},u=function(b,c){b.preventDefault();var g={receverId:c};"0"===d.ClassTypeId||""===d.ClassTypeId||d.ClassTypeId===A?g.ClassTypeId=e[1].id:g.ClassTypeId=parseInt(d.ClassTypeId,10),"0"===d.SubjectId||""===d.SubjectId||d.SubjectId===A?g.SubjectId=f[1].id:g.SubjectId=parseInt(d.SubjectId,10);var h=B;""!==d.tutionplace&&d.tutionplace!==A&&(h=d.tutionplace),a((0,w.Qg)((0,r.Z)((0,q.Z)({},g),{tutionplace:h})));var i=JSON.parse(window.localStorage.getItem("search")),j=(0,q.Z)({},i,g);window.localStorage.setItem("search",JSON.stringify(j)),v().push("/search/request/".concat(c))},C=function(a){for(var b=a.Reviewtaker.length,c=0,d=0;d<b;d+=1)c+=a.Reviewtaker[d].stars;return c/b};return(0,g.jsx)("div",{className:"SearchResult",children:c&&(0,g.jsx)("div",{className:"container search-result",children:c.length>0?(0,g.jsxs)(g.Fragment,{children:[c.map(function(a){var c,d;return(0,g.jsx)("div",{className:"card my-3",children:(0,g.jsxs)("div",{className:"search-card-row row g-0",children:[(0,g.jsx)("div",{className:"col-md-3",children:(null==a?void 0:a.image)?(0,g.jsx)("img",{src:(c=a.image,"".concat(x.z0,"/").concat(c)),className:"rounded-start",alt:null==a?void 0:a.name}):(0,g.jsx)("img",{src:"/img/default-img.jpg",className:"rounded-start",alt:null==a?void 0:a.name})}),(0,g.jsx)("div",{className:"col-md-6",children:(0,g.jsxs)("div",{className:"card-body",children:[(0,g.jsxs)("div",{className:"d-flex justify-content-between",children:[(0,g.jsx)("h5",{className:"card-title text-capitalize",children:null==a?void 0:a.name}),(0,g.jsx)("h5",{className:"card-title text-capitalize",children:(0,g.jsx)(y.Z,{limit:C(a)})})]}),(0,g.jsxs)("p",{className:"card-text",children:["Experience: ",null==a?void 0:a.experience," years"]}),(d=a,(0,g.jsxs)("div",{className:"hstack gap-3",children:[d.ol_rate&&(0,g.jsxs)("p",{className:"alert alert-primary w-fit",children:["Online - ",d.ol_rate," tk"]}),d.tl_rate&&(0,g.jsxs)("p",{className:"alert alert-primary w-fit",children:["Teacher's Location - ",d.tl_rate," tk"]}),d.sl_rate&&(0,g.jsxs)("p",{className:"alert alert-primary w-fit",children:["Student's Location - ",d.sl_rate," tk "]})]}))]})}),(0,g.jsxs)("div",{className:"col-md-3 vertical-center ",children:[(null==b?void 0:b.role)===z&&(0,g.jsx)("button",{type:"button",className:"btn btn-primary my-2 request-details",onClick:function(b){return u(b,a.id)},children:"Send Request"}),(0,g.jsx)("button",{type:"button",className:"btn btn-primary my-2 request-details",children:(0,g.jsx)(t(),{href:"/search/detail/?userId=".concat(a.id),children:"View Details"})})]})]})},a.id)}),(0,g.jsx)("nav",{className:"w-full",children:(0,g.jsxs)("ul",{className:"pagination justify-content-center",children:[(0,g.jsx)("li",{className:1===n?"page-item disabled":"page-item",onClick:p,role:"presentation",children:(0,g.jsx)("a",{className:"page-link",children:"Previous"})}),m&&Array(m).fill().map(function(a,b){return(0,g.jsx)("li",{className:b+1===n?"page-item active":"page-item",onClick:function(a){return o(a,b+1)},role:"presentation",children:(0,g.jsx)("a",{className:"page-link",href:"#",children:b+1})},b)}),(0,g.jsx)("li",{className:n===m?"page-item disable":"page-item",onClick:s,role:"presentation",children:(0,g.jsx)("a",{className:"page-link",href:"#",children:"Next"})})]})})]}):(0,g.jsx)("div",{className:"alert alert-danger",children:"No result found"})})})};c(5789);var D=c(7916),E=function(){var a,b=!1,c=(0,i.I0)(),e=(0,i.v9)(function(a){return a.search.searchParams}),q=(0,i.v9)(function(a){return a.search.rpStart}),r=(0,i.v9)(function(a){return a.search.rpTotal});(0,i.v9)(function(a){return a.elements.isLoading});var s=(a=(0,d.Z)(f().mark(function a(){var b,d,g,h;return f().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,c((0,j.o4)(!0)),a.next=4,D.Z.get("/search/teacher",{params:e});case 4:200===(b=a.sent).status&&(c((0,k.rT)(b.data.teachers)),d=b.data.teachers.slice(q,r),c((0,k.u1)(d)),c((0,k.$S)(Math.ceil(b.data.teachers.length/r)))),a.next=13;break;case 8:a.prev=8,a.t0=a.catch(0),console.log(a.t0),(null===a.t0|| void 0===a.t0?void 0:null===(g=a.t0.response)|| void 0===g?void 0:null===(h=g.data)|| void 0===h?void 0:h.msg)&&c((0,j.ri)([a.t0.response.data.msg]));case 13:return a.prev=13,c((0,j.o4)(!1)),a.finish(13);case 16:case"end":return a.stop()}},a,null,[[0,8,13,16]])})),function(){return a.apply(this,arguments)});return(0,h.useEffect)(function(){if(!1===b){if(c((0,j.o4)(!0)),JSON.stringify(k.f2)===JSON.stringify(e)){var a=localStorage.getItem("search");a&&c((0,k.tr)(JSON.parse(a))),(0,d.Z)(f().mark(function a(){return f().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(!1!==b){a.next=3;break}return a.next=3,Promise.all([c((0,l.zL)()),c((0,m.Ii)()),c((0,n.gD)())]);case 3:case"end":return a.stop()}},a)}))()}s().catch(function(a){return console.log(a)}),c((0,j.o4)(!1))}b=!0},[]),(0,g.jsx)(o.Z,{children:(0,g.jsxs)("div",{className:"search",children:[(0,g.jsx)("section",{className:"bg-secondary search-form",children:(0,g.jsx)("div",{className:"container",children:(0,g.jsx)(p.Z,{})})}),(0,g.jsx)("section",{className:"section section-2 search-result",children:(0,g.jsx)("div",{className:"container",children:(0,g.jsx)(C,{})})})]})})}}},function(a){a.O(0,[255,997,206,532,774,888,179],function(){var b;return a(a.s=3417)}),_N_E=a.O()}])