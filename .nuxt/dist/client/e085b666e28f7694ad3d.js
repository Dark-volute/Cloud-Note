(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{186:function(t,e,o){var content=o(192);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(17).default)("06444ad5",content,!0,{sourceMap:!1})},187:function(t,e,o){var content=o(194);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(17).default)("117a3265",content,!0,{sourceMap:!1})},188:function(t,e,o){var content=o(198);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(17).default)("175c86e9",content,!0,{sourceMap:!1})},189:function(t,e,o){"use strict";var n={name:"mPopover",props:{position:{type:String,default:"top",validator:function(t){return["top","bottom","left","right"].indexOf(t)>=0}},trigger:{type:String,default:"click",validator:function(t){return["click","hover"].indexOf(t)>=0}}},data:function(){return{visible:!1}},mounted:function(){this.addPopoverListeners()},beforeDestroy:function(){this.putBackContent(),this.removePopoverListeners()},computed:{openEvent:function(){return"click"===this.trigger?"click":"mouseenter"},closeEvent:function(){return"click"===this.trigger?"click":"mouseleave"}},methods:{addPopoverListeners:function(){"click"===this.trigger?this.$refs.popover.addEventListener("click",this.onClick):(this.$refs.popover.addEventListener("mouseenter",this.open),this.$refs.popover.addEventListener("mouseleave",this.close))},removePopoverListeners:function(){"click"===this.trigger?this.$refs.popover.removeEventListener("click",this.onClick):(this.$refs.popover.removeEventListener("mouseenter",this.open),this.$refs.popover.removeEventListener("mouseleave",this.close))},putBackContent:function(){var t=this.$refs,e=t.contentWrapper,o=t.popover;e&&o.appendChild(e)},positionContent:function(){var t=this.$refs,e=t.contentWrapper,o=t.triggerWrapper;document.body.appendChild(e);var n=o.getBoundingClientRect(),r=n.width,c=n.height,l=n.top,d=n.left,f=e.getBoundingClientRect().height,h={top:{top:l+window.scrollY,left:d+window.scrollX},bottom:{top:l+c+window.scrollY,left:d+window.scrollX},left:{top:l+window.scrollY+(c-f)/2,left:d+window.scrollX},right:{top:l+window.scrollY+(c-f)/2,left:d+window.scrollX+r}};e.style.left=h[this.position].left+"px",e.style.top=h[this.position].top+"px"},onClickDocument:function(t){this.$refs.popover&&(this.$refs.popover===t.target||this.$refs.popover.contains(t.target))||this.$refs.contentWrapper&&(this.$refs.contentWrapper===t.target||this.$refs.contentWrapper.contains(t.target))||this.close()},open:function(){var t=this;this.visible=!0,this.$nextTick(function(){t.positionContent(),document.addEventListener("click",t.onClickDocument)})},close:function(){this.visible=!1,document.removeEventListener("click",this.onClickDocument)},onClick:function(t){this.$refs.triggerWrapper.contains(t.target)&&(!0===this.visible?this.close():this.open())}}},r=(o(191),o(20)),component=Object(r.a)(n,function(){var t,e=this.$createElement,o=this._self._c||e;return o("div",{ref:"popover",staticClass:"popover"},[this.visible?o("div",{ref:"contentWrapper",staticClass:"content-wrapper",class:(t={},t["position-"+this.position]=!0,t)},[this._t("content",null,{close:this.close})],2):this._e(),this._v(" "),o("span",{ref:"triggerWrapper",staticStyle:{display:"inline-block"}},[this._t("default")],2)])},[],!1,null,"76120395",null);e.a=component.exports},190:function(t,e,o){t.exports=o.p+"img/fa2c050.png"},191:function(t,e,o){"use strict";var n=o(186);o.n(n).a},192:function(t,e,o){(t.exports=o(16)(!1)).push([t.i,'.popover[data-v-76120395]{display:inline-block;vertical-align:top;position:relative}.content-wrapper[data-v-76120395]{position:absolute;border:1px solid #ccc;border-radius:4px;background:#fff;padding:.5em 1em;max-width:20em;word-break:break-all;cursor:pointer}.content-wrapper[data-v-76120395]:after,.content-wrapper[data-v-76120395]:before{content:"";display:block;border:10px solid transparent;width:0;height:0;position:absolute}.content-wrapper.position-top[data-v-76120395]{-webkit-transform:translateY(-100%);transform:translateY(-100%);margin-top:-10px}.content-wrapper.position-top[data-v-76120395]:after,.content-wrapper.position-top[data-v-76120395]:before{left:10px}.content-wrapper.position-top[data-v-76120395]:before{border-top-color:#ccc;border-bottom:none;top:100%}.content-wrapper.position-top[data-v-76120395]:after{border-top-color:#fff;border-bottom:none;top:calc(100% - 1px)}.content-wrapper.position-bottom[data-v-76120395]{margin-top:10px}.content-wrapper.position-bottom[data-v-76120395]:after,.content-wrapper.position-bottom[data-v-76120395]:before{left:10px}.content-wrapper.position-bottom[data-v-76120395]:before{border-top:none;border-bottom-color:#ccc;bottom:100%}.content-wrapper.position-bottom[data-v-76120395]:after{border-top:none;border-bottom-color:#fff;bottom:calc(100% - 1px)}.content-wrapper.position-left[data-v-76120395]{-webkit-transform:translateX(-100%);transform:translateX(-100%);margin-left:-10px}.content-wrapper.position-left[data-v-76120395]:after,.content-wrapper.position-left[data-v-76120395]:before{-webkit-transform:translateY(-50%);transform:translateY(-50%);top:50%}.content-wrapper.position-left[data-v-76120395]:before{border-left-color:#ccc;border-right:none;left:100%}.content-wrapper.position-left[data-v-76120395]:after{border-left-color:#fff;border-right:none;left:calc(100% - 1px)}.content-wrapper.position-right[data-v-76120395]{margin-left:10px}.content-wrapper.position-right[data-v-76120395]:after,.content-wrapper.position-right[data-v-76120395]:before{-webkit-transform:translateY(-50%);transform:translateY(-50%);top:50%}.content-wrapper.position-right[data-v-76120395]:before{border-right-color:#ccc;border-left:none;right:100%}.content-wrapper.position-right[data-v-76120395]:after{border-right-color:#fff;border-left:none;right:calc(100% - 1px)}',""])},193:function(t,e,o){"use strict";var n=o(187);o.n(n).a},194:function(t,e,o){(t.exports=o(16)(!1)).push([t.i,".m-aside{height:100%;flex-basis:60px;background:#f8f8f8;padding:40px 20px}.m-aside header{color:#fff;align-items:center;margin-bottom:40px}.m-aside .info,.m-aside header{display:flex;justify-content:space-between}.m-aside .info{height:100%;flex-direction:column}.m-aside .tab-list{color:#263d96;font-size:12px}.m-aside .tab-list li{cursor:pointer;margin-bottom:30px;border:1px solid #ccc;border-radius:50%;display:inline-block;padding:10px;transition:.4s}.m-aside .tab-list .nuxt-link-exact-active,.m-aside .tab-list li:hover{background:#727abd;color:#fff;border-color:#727abd}.m-aside .user{cursor:pointer}.m-aside .user img{height:45px;width:45px;display:inline-block}",""])},195:function(t,e,o){var content=o(205);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(17).default)("8beba00e",content,!0,{sourceMap:!1})},196:function(t,e,o){"use strict";o(49);var n={computed:{user:function(){return this.$store.state.user}},methods:{loginOut:function(){this.$axios.post("/logOut"),this.$router.push("/login")}},components:{mPopover:o(189).a}},r=(o(193),o(20)),component=Object(r.a)(n,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"m-aside"},[n("div",{staticClass:"info"},[n("ul",{staticClass:"tab-list"},[t._m(0),t._v(" "),n("nuxt-link",{attrs:{to:"/",tag:"li"}},[n("i",{staticClass:"iconfont icon-note"})]),t._v(" "),n("nuxt-link",{attrs:{to:"/book",tag:"li"}},[n("i",{staticClass:"iconfont icon-notebook"})]),t._v(" "),n("nuxt-link",{attrs:{to:"/trash",tag:"li"}},[n("i",{staticClass:"iconfont icon-trash"})]),t._v(" "),n("nuxt-link",{attrs:{to:"/search",tag:"li"}},[n("i",{staticClass:"iconfont icon-search"})])],1),t._v(" "),n("m-popover",{attrs:{position:"right"}},[t.user?n("div",{staticClass:"user"},[n("img",{attrs:{src:o(190)}})]):t._e(),t._v(" "),n("template",{slot:"content"},[n("span",{on:{click:t.loginOut}},[t._v("登出")])])],2)],1)])},[function(){var t=this.$createElement,e=this._self._c||t;return e("li",{staticStyle:{color:"#ffbd39"}},[e("i",{staticClass:"iconfont icon-star"})])}],!1,null,null,null);e.a=component.exports},197:function(t,e,o){"use strict";var n=o(188);o.n(n).a},198:function(t,e,o){(t.exports=o(16)(!1)).push([t.i,".m-button{font-size:14px;height:2em;padding:0 1em;border-radius:4px;border:1px solid #727abd;background:#727abd;color:#fff;cursor:pointer}",""])},199:function(t,e,o){"use strict";var n={name:"mButton",props:{icon:{},loading:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},iconPosition:{type:String,default:"left",validator:function(t){return!("left"!==t&&"right"!==t)}}}},r=(o(197),o(20)),component=Object(r.a)(n,function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("button",{staticClass:"m-button",class:["icon-"+t.iconPosition,t.disabled?"m-button--disabled":""],attrs:{disabled:t.disabled},on:{click:function(e){return t.$emit("click")}}},[o("div",{staticClass:"m-button-content"},[t._t("default")],2)])},[],!1,null,null,null);e.a=component.exports},204:function(t,e,o){"use strict";var n=o(195);o.n(n).a},205:function(t,e,o){(t.exports=o(16)(!1)).push([t.i,".m-confirm{position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);border:1px solid #eee;box-sizing:border-box;z-index:99;background:#fff;border-radius:4px}.m-confirm--container{padding:10px;width:300px}.m-confirm--container .header{display:flex;justify-content:space-between}.m-confirm--container .header .close{cursor:pointer;font-size:16px}.m-confirm--container .body{padding:10px 0 40px}.m-confirm--container .footer{display:flex;justify-content:flex-end}.m-confirm--container .footer button{outline:none;padding:.5em 1em;border:none;background:#fff;border-radius:4px;cursor:pointer}.m-confirm--container .footer .confirm{background:#409eff;color:#fff;border:1px solid #409eff;margin-left:6px}.m-confirm--container .footer .cancel{border:1px solid #eee}.m-modal{position:fixed;left:0;top:0;right:0;border-bottom:0;width:100%;height:100%;opacity:.5;background:#000;z-index:98}",""])},206:function(t,e,o){var content=o(220);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(17).default)("d7714792",content,!0,{sourceMap:!1})},208:function(t,e,o){"use strict";var n,r={name:"mConfirm",data:function(){return{visible:!1}},mounted:function(){this.onRouteChange(),this.localScroll()},methods:{handleAction:function(t){"success"===t?this.success():this.cancel(),this.canScroll()},onRouteChange:function(){var t=this,e=function(){t.handleAction()};window.addEventListener("hashchange",e),window.addEventListener("popstate",e),window.addEventListener("pagehide",e)},localScroll:function(){document.documentElement.style.overflowY="hidden"},canScroll:function(){document.documentElement.style.overflowY="scroll"}},beforeDestroy:function(){this.canScroll(),this.$el.remove()}},c=(o(204),o(20)),l=Object(c.a)(r,function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("div",{directives:[{name:"show",rawName:"v-show",value:t.visible,expression:"visible"}],staticClass:"m-confirm"},[o("div",{staticClass:"m-confirm--container"},[o("div",{staticClass:"header"},[o("span",[t._v(t._s(t.title))]),t._v(" "),o("span",{staticClass:"close",on:{click:function(e){return t.handleAction("cancel")}}},[t._v("x")])]),t._v(" "),o("div",{staticClass:"body"},[t._v("\n            "+t._s(t.message)+"\n        ")]),t._v(" "),o("div",{staticClass:"footer"},[o("button",{staticClass:"cancel",on:{click:function(e){return t.handleAction("cancel")}}},[t._v("取消")]),t._v(" "),o("button",{staticClass:"confirm",on:{click:function(e){return t.handleAction("success")}}},[t._v("确认")])])])]),t._v(" "),o("div",{directives:[{name:"show",rawName:"v-show",value:t.visible,expression:"visible"}],staticClass:"m-modal"})])},[],!1,null,null,null).exports,d=o(0),f=d.a.extend(l);function h(){n&&(n.visible=!1,n.$el.remove(),n=null)}d.a.prototype.$confirm=function(t,title,e){return function(t,title){n||((n=new f({el:document.createElement("div"),data:{message:t||"这是一段内容",title:title||"提示"}})).visible=!0,document.body.appendChild(n.$el))}(t,title),new Promise(function(t,e){n.success=function(){t(),h()},n.cancel=function(){e(),h()}})}},219:function(t,e,o){"use strict";var n=o(206);o.n(n).a},220:function(t,e,o){(t.exports=o(16)(!1)).push([t.i,".dropStyle{position:absolute;z-index:996;background:#ccc;color:#fff;opacity:.8}.container{position:relative}.trash-list{flex-basis:100%;padding:20px}.trash-list .recover{padding-bottom:20px;border-bottom:1px solid #ccc}.trash-list .list{display:flex;flex-wrap:wrap}.trash-list .list::-webkit-scrollbar{display:none}.trash-list .list li{box-sizing:border-box;cursor:pointer;padding:20px 20px 40px;margin:10px 10px 10px 0;justify-content:space-between;border:1px solid #ccc;height:160px;width:180px;border-radius:4px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.trash-list .list li.active{border:1px solid #727abd}.trash-list .list li .title{display:flex;justify-content:space-between;margin-bottom:5px}.trash-list .list li time{display:inline-block;margin-bottom:10px;color:#ccc;font-size:12px}.trash-list .list li .content{max-width:200px;word-wrap:break-word}",""])},225:function(t,e,o){"use strict";o.r(e);o(35);var n,r,c,l=o(3),aside=o(196),d=o(199),f=(o(208),{fetch:function(){var t=Object(l.a)(regeneratorRuntime.mark(function t(e){return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:e.app,e.store,e.params;case 1:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}(),asyncData:function(){var t=Object(l.a)(regeneratorRuntime.mark(function t(e){var o,n,r;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return o=e.app,t.next=3,o.$axios.get("/note",{params:{isTrashed:1}});case 3:return n=t.sent,r=n.data&&n.data.length>0?n.data[0].id:null,t.abrupt("return",{notes:n.data,selected_Id:r});case 6:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}(),data:function(){return{active:0}},computed:{substr:function(t){return function(t){return t&&t.length>20?t.substr(0,20)+"...":t}}},methods:{mousedown:function(t,e){e=e||event,c=e.currentTarget,n=e.currentTarget.getBoundingClientRect().left,r=e.currentTarget.getBoundingClientRect().top,this.isMoving=!0,this.x0=e.currentTarget.offsetLeft,this.y0=e.currentTarget.offsetTop,this.x1=e.clientX,this.y1=e.clientY,this.isMoving=!0,this.L0=0,this.R0=document.documentElement.clientWidth,this.T0=0,this.B0=document.documentElement.clientHeight,this.EH=e.currentTarget.offsetHeight,this.EW=e.currentTarget.offsetWidth,e.currentTarget.style.top=r+"px",e.currentTarget.style.left=n+"px",e.currentTarget.classList.add("dropStyle")},mousemove:function(t,e){if(this.isMoving){var o=(e=e||event).clientX,n=e.clientY,r=this.x0+(o-this.x1),c=this.y0+(n-this.y1),l=r,d=r+this.EW,f=c,h=c+this.EH;l-this.L0<10&&(r=this.L0),this.R0-d<10&&(r=this.R0-this.EW),f-this.T0<10&&(c=this.T0),this.B0-h<10&&(c=this.B0-this.EH),e.currentTarget.style.left=r+"px",e.currentTarget.style.top=c+"px"}},mouseup:function(t,e){},selectNote:function(t,e){},recoverNote:function(){console.log(this.selected_Id),this.$axios.patch("/note/trashOrRecover/".concat(this.selected_Id),{isTrashed:0}).then(function(t){})},deleteNote:function(){var t=this;this.$confirm("确认彻底删除?").then(function(){t.$axios.delete("/note/delete/".concat(t.selected_Id)).then(function(e){0===e.code&&t.initNotes()})})}},mounted:function(){var t=this;document.addEventListener("mouseup",function(e){t.isMoving=!1,c.style.top=r+"px",c.style.left=n+"px",c.classList.remove("dropStyle")})},components:{mAside:aside.a,mButton:d.a}}),h=(o(219),o(20)),component=Object(h.a)(f,function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("section",{staticClass:"container"},[o("m-aside"),t._v(" "),o("div",{staticClass:"trash-list"},[t.selected_Id?o("div",{staticClass:"recover"},[o("m-button",{on:{click:t.recoverNote}},[t._v("恢复笔记")]),t._v(" "),o("m-button",{on:{click:t.deleteNote}},[t._v("彻底删除")])],1):t._e(),t._v(" "),o("ul",{staticClass:"list"},t._l(t.notes,function(e,n){return o("li",{key:e.id,class:{active:t.active===n},on:{click:function(o){return t.selectNote(e,n)},mousedown:function(o){return t.mousedown(e,o)},mousemove:function(o){return t.mousemove(e,o)},mouseleave:function(o){return t.mouseup(e,o)}}},[o("div",{staticClass:"title"},[o("h4",[t._v(t._s(e.title))]),t._v(" "),o("span",{on:{click:function(o){return o.stopPropagation(),t.recoverNote(e.id,n)}}})]),t._v(" "),o("time",[t._v(t._s(t._f("timestampToDate")(e.update_date)))]),t._v(" "),o("div",{staticClass:"content",domProps:{innerHTML:t._s(t.substr(e.content))}})])}),0)])],1)},[],!1,null,null,null);e.default=component.exports}}]);