(this["webpackJsonp@ayase/vc-align"]=this["webpackJsonp@ayase/vc-align"]||[]).push([[0],{102:function(e,t,n){"use strict";n.r(t);var o=n(0);const a={style:{margin:"50px"}},i=Object(o.createTextVNode)(" \xa0\xa0\xa0 "),r=Object(o.createTextVNode)(" \xa0\xa0\xa0 "),c=Object(o.createTextVNode)(" Monitor window resize "),l=Object(o.createTextVNode)(" Random Size "),u=Object(o.createTextVNode)(" Disabled "),s=Object(o.createVNode)("input",{style:{width:"100%"}},null,-1);var d={components:{Align:n(5).a},data:function(){return{state:{monitor:!0,random:!1,disabled:!1,randomWidth:100,align:{points:["cc","cc"]},sourceWidth:50}}},mounted:function(){var e=this;this.id=setInterval((function(){e.state.random&&(e.state.randomWidth=60+40*Math.random())}),1e3)},beforeUnmount:function(){clearInterval(this.id)},methods:{getTarget:function(){return this.$container||(this.$container=document.getElementById("container")),this.$container},containerRef:function(e){this.$container=e},alignRef:function(e){this.$align=e},toggleMonitor:function(){this.state.monitor=!this.state.monitor},toggleRandom:function(){this.state.random=!this.state.random},toggleDisabled:function(){this.state.disabled=!this.state.disabled},forceAlign:function(){this.$align.forceAlign()},toggleSourceSize:function(){this.state.sourceWidth=this.state.sourceWidth+10},onAlign:function(){for(var e,t=arguments.length,n=new Array(t),o=0;o<t;o++)n[o]=arguments[o];(e=console).log.apply(e,["onAlign"].concat(n))}},render:function(e,t,n,d,f,b){const g=Object(o.resolveComponent)("Align");return Object(o.openBlock)(),Object(o.createBlock)("div",a,[Object(o.createVNode)("p",null,[Object(o.createVNode)("button",{type:"button",onClick:t[1]||(t[1]=(...e)=>b.forceAlign(...e))},"Force align"),i,Object(o.createVNode)("button",{type:"button",onClick:t[2]||(t[2]=(...e)=>b.toggleSourceSize(...e))},"Resize Source"),r,Object(o.createVNode)("label",null,[Object(o.createVNode)("input",{type:"checkbox",checked:f.state.monitor,onChange:t[3]||(t[3]=(...e)=>b.toggleMonitor(...e))},null,40,["checked"]),c]),Object(o.createVNode)("label",null,[Object(o.createVNode)("input",{type:"checkbox",checked:f.state.random,onChange:t[4]||(t[4]=(...e)=>b.toggleRandom(...e))},null,40,["checked"]),l]),Object(o.createVNode)("label",null,[Object(o.createVNode)("input",{type:"checkbox",checked:f.state.disabled,onChange:t[5]||(t[5]=(...e)=>b.toggleDisabled(...e))},null,40,["checked"]),u])]),Object(o.createVNode)("div",{id:"container",ref:b.containerRef,style:{border:"1px solid red",width:"80%",height:"500px",...f.state.random?{width:f.state.randomWidth+"%"}:null}},[Object(o.createVNode)(g,{ref:b.alignRef,target:b.getTarget,"monitor-window-resize":f.state.monitor,align:f.state.align,disabled:f.state.disabled,onAlign:b.onAlign},{default:Object(o.withCtx)(()=>[Object(o.createVNode)("div",{style:{position:"absolute",width:f.state.sourceWidth+"px",height:"50px",background:"yellow"}},[s],4)]),_:1},8,["target","monitor-window-resize","align","disabled","onAlign"])],4)])}};t.default=d},103:function(e,t,n){"use strict";n.r(t);var o=n(0);const a=Object(o.createVNode)("span",null,null,-1);var i=n(38),r=n.n(i);function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}var l={components:{Align:n(5).a},data:function(){return{state:{props:null}}},methods:{alignRef:function(e){this.state.props=e?function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){r()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},e.$props):null,console.log(e)}},render:function(e,t,n,i,r,c){const l=Object(o.resolveComponent)("Align");return Object(o.openBlock)(),Object(o.createBlock)(o.Fragment,null,[Object(o.createVNode)(l,{ref:c.alignRef},{default:Object(o.withCtx)(()=>[a]),_:1},512),Object(o.createVNode)("pre",null,Object(o.toDisplayString)(JSON.stringify(r.state.props,(e,t)=>void 0===t?"~undefined~":t,2)),1)],64)}};t.default=l},104:function(e,t,n){"use strict";n.r(t);var o=n(0);const a={style:{marginBottom:"170px"}};var i={components:{Align:n(5).a},data:function(){return{state:{point:null}}},methods:{onClick:function(e){var t=e.pageX,n=e.pageY;this.state.point={pageX:t,pageY:n}}},render:function(e,t,n,i,r,c){const l=Object(o.resolveComponent)("Align");return Object(o.openBlock)(),Object(o.createBlock)("div",a,[Object(o.createVNode)("div",{style:{margin:"20px",border:"1px solid red",padding:"100px 0",textAlign:"center"},onClick:t[1]||(t[1]=(...e)=>c.onClick(...e))}," Click this region please : ) "),Object(o.createVNode)(l,{target:r.state.point,align:{points:["cc","cc"]}},{default:Object(o.withCtx)(()=>[Object(o.createVNode)("div",{style:{position:"absolute",width:"100px",height:"100px",background:"rgba(0, 255, 0, 0.5)",pointerEvents:"none"}}," Align ",4)]),_:1},8,["target"])])}};t.default=i},5:function(e,t,n){"use strict";n.d(t,"a",(function(){return j}));var o=n(4),a=n.n(o),i=n(31),r=n.n(i),c=n(3),l=n(32),u=n.n(l),s=n(33),d=n(34),f=n.n(d);function b(e,t){var n=null,o=null;var i=new s.a((function(e){var i=a()(e,1)[0].target;if(document.contains(i)){var r=i.getBoundingClientRect(),c=r.width,l=r.height,u=Math.floor(c),s=Math.floor(l);n===u&&o===s||Promise.resolve().then((function(){t({width:u,height:s})})),n=u,o=s}}));return e&&i.observe(e),function(){i.disconnect()}}var g=n(22),v=n(35),p=n(21),O=n(0);function h(e){return"function"!==typeof e?null:e()}function m(e){return"object"===r()(e)&&e?e:null}var j=Object(O.defineComponent)({name:"Align",props:{align:c.a.shape({points:c.a.arrayOf(c.a.string).def(void 0),offset:c.a.arrayOf(c.a.number).def(void 0),targetOffset:c.a.arrayOf(c.a.number).def(void 0),overflow:c.a.shape({adjustX:c.a.oneOfType([c.a.bool,c.a.number]),adjustY:c.a.oneOfType([c.a.bool,c.a.number])}).loose,useCssRight:c.a.bool.def(void 0),useCssBottom:c.a.bool.def(void 0),useCssTransform:c.a.bool.def(void 0)}).loose.def(p.a),target:c.a.oneOfType([c.a.func,c.a.shape({clientX:c.a.number,clientY:c.a.number,pageX:c.a.number,pageY:c.a.number}).loose]).def(p.a),monitorBufferTime:c.a.number.def(0),monitorWindowResize:c.a.bool.def(void 0),disabled:c.a.bool.def(void 0)},emits:["align"],setup:function(e,t){var n=function(e,n){return t.emit("align",e,n)},o=Object(O.ref)({}),i=Object(O.ref)(),r=Object(O.ref)({});r.value.disabled=e.disabled,r.value.target=e.target,r.value.onAlign=n;var c=Object(O.toRef)(e,"disabled");Object(O.watch)([c,Object(O.toRef)(e,"target")],(function(e){var t=a()(e,2),n=t[0],o=t[1];r.value.disabled=n,r.value.target=o}));var l=function(e,t){var n=Object(O.ref)(!1),o=Object(O.ref)(null);function a(){window.clearTimeout(o.value)}return[function i(r){if(n.value&&!0!==r)a(),o.value=window.setTimeout((function(){n.value=!1,i()}),t);else{if(!1===e())return;n.value=!0,a(),o.value=window.setTimeout((function(){n.value=!1}),t)}},function(){n.value=!1,a()}]}((function(){var t=r.value,a=t.disabled,c=t.target;if(!a&&c){var l,u=i.value,s=h(c),d=m(c);o.value.element=s,o.value.point=d;var b=document.activeElement;return s?l=Object(g.a)(u,s,e.align):d&&(l=Object(g.b)(u,d,e.align)),function(e,t){e!==document.activeElement&&f()(t,e)&&"function"===typeof e.focus&&e.focus()}(b,u),n(u,l),!0}return!1}),e.monitorBufferTime),s=a()(l,2),d=s[0],v=s[1],p=Object(O.ref)({cancel:function(){}}),j=Object(O.ref)({cancel:function(){}});Object(O.watchEffect)((function(){var t,n,a=h(e.target),r=m(e.target);i.value!==j.value.element&&(j.value.cancel(),j.value.element=i.value,j.value.cancel=b(i.value,d)),o.value.element===a&&((t=o.value.point)===(n=r)||t&&n&&("pageX"in n&&"pageY"in n?t.pageX===n.pageX&&t.pageY===n.pageY:"clientX"in n&&"clientY"in n&&t.clientX===n.clientX&&t.clientY===n.clientY))||(d(),p.value.element!==a&&(p.value.cancel(),p.value.element=a,p.value.cancel=b(a,d)))}),{flush:"post"}),Object(O.watch)(c,(function(e){e?v():d()}));var w=Object(O.ref)(null);return Object(O.watchEffect)((function(){e.monitorWindowResize?w.value||(w.value=u()(window,"resize",d)):w.value&&(w.value.remove(),w.value=null)})),Object(O.onUnmounted)((function(){p.value.cancel(),j.value.cancel(),w.value&&w.value.remove(),v()})),{forceAlign:function(){return d(!0)},nodeRef:i}},render:function(){var e=this.$slots.default()[0];return Object(O.isVNode)(e)&&(e=Object(O.cloneVNode)(e,{ref:Object(v.composeRef)(e.ref,"nodeRef")})),e}})},60:function(e,t,n){var o={"./Point.vue":104,"./Simple.vue":102,"./VueTypes.vue":103};function a(e){var t=i(e);return n(t)}function i(e){if(!n.o(o,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return o[e]}a.keys=function(){return Object.keys(o)},a.resolve=i,e.exports=a,a.id=60}},[[105,1,2]]]);
//# sourceMappingURL=main.5f7bcc44.chunk.js.map