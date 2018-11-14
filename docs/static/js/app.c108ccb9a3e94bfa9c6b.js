webpackJsonp([1],{"19jp":function(e,t){},"6A3X":function(e,t){},LCVb:function(e,t){},LCdA:function(e,t){},LhVI:function(e,t){},NHnr:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=s("7+uW"),o={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("h1",[this._v("Word Search Toolset")]),this._v(" "),t("router-view")],1)},staticRenderFns:[]};var r=s("VU/8")({name:"app"},o,!1,function(e){s("19jp")},null,null).exports,a=s("/ocq"),i=s("mtWM"),l=s.n(i),d={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("h2",[this._v("Loading...")]),this._v(" "),t("div",{staticClass:"sk-folding-cube"},[t("div",{staticClass:"sk-cube1 sk-cube"}),this._v(" "),t("div",{staticClass:"sk-cube2 sk-cube"}),this._v(" "),t("div",{staticClass:"sk-cube4 sk-cube"}),this._v(" "),t("div",{staticClass:"sk-cube3 sk-cube"})])])}]};var c=s("VU/8")({name:"CubeSpinner"},d,!1,function(e){s("wamj")},"data-v-fe181480",null).exports;s("6A3X");var u={name:"MessageContainer",props:{message:Object},data:function(){return{showMessage:!0}},methods:{close:function(){this.showMessage=!1}}},v={render:function(){var e=this.$createElement,t=this._self._c||e;return t("transition",{attrs:{name:"fade",appear:"",tag:"div"}},[t("li",{directives:[{name:"show",rawName:"v-show",value:this.showMessage,expression:"showMessage"}],class:[this.message.type,"message"]},[this._v("\n    "+this._s(this.message.text)+"\n    "),t("button",{on:{click:this.close}},[this._v("close")])])])},staticRenderFns:[]};var m=s("VU/8")(u,v,!1,function(e){s("LhVI")},"data-v-353fa968",null).exports;s("6A3X");var p={name:"MessageContainer",props:{messages:Array},components:{"message-item":m}},h={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",[this.messages.length>0?t("ul",this._l(this.messages,function(e){return t("message-item",{key:e.text,attrs:{message:e}})})):this._e()])},staticRenderFns:[]};var g=s("VU/8")(p,h,!1,function(e){s("LCVb")},"data-v-55061970",null).exports;s("6A3X");var _={name:"WordSearch",components:{spinner:c,"message-container":g},data:function(){return{results:null,wordList:[],messages:[],phrase:"",soundsLike:"",startLetter:"",endLetter:"",showSpinner:!1}},methods:{addWord:function(e){if(-1===this.wordList.indexOf(e)){this.wordList.push(e),console.log("Added "+e+" to wordList.");var t={type:"success",text:e+" successfully added to word list."};this.messages.push(t)}else{console.log("Word is already on wordlist.");var s={type:"info",text:e+" is already in the word list."};this.messages.push(s)}},removeWord:function(e){this.wordList.splice(this.wordList.indexOf(e),1);var t={type:"success",text:e+" removed from the word list."};this.messages.push(t)},findWords:function(){var e=this;this.showSpinner=!0,this.results=null,l.a.get("https://api.datamuse.com/words",{params:{ml:this.phrase,sl:this.soundsLike,sp:this.startLetter+"*"+this.endLetter}}).then(function(t){e.showSpinner=!1,e.results=t.data}).catch(function(t){e.showSpinner=!1;var s={type:"error",text:t.message};e.messages.push(s)})}}},f={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("div",[s("p",[s("router-link",{attrs:{to:{name:"WordSearch"}}},[e._v("Word Search")]),e._v("\n    •\n    "),s("router-link",{attrs:{to:{name:"Dogs"}}},[e._v("Dog Photo Finder")])],1)]),e._v(" "),s("div",{staticClass:"messages"},[s("message-container",{attrs:{messages:e.messages}})],1),e._v(" "),s("div",{staticClass:"word-search"},[s("form",{on:{submit:function(t){return t.preventDefault(),e.findWords(t)}}},[s("p",[s("label",[e._v("Find synonyms for "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.phrase,expression:"phrase"}],attrs:{type:"text",placeholder:"word or phrase"},domProps:{value:e.phrase},on:{input:function(t){t.target.composing||(e.phrase=t.target.value)}}}),e._v(" that:")])]),e._v(" "),s("ul",[s("li",[s("label",[e._v("sounds like "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.soundsLike,expression:"soundsLike"}],attrs:{type:"text",placeholder:"word or phrase"},domProps:{value:e.soundsLike},on:{input:function(t){t.target.composing||(e.soundsLike=t.target.value)}}})])]),e._v(" "),s("li",[s("label",[e._v("start with the letter "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.startLetter,expression:"startLetter"}],attrs:{type:"text",placeholder:"single letter"},domProps:{value:e.startLetter},on:{input:function(t){t.target.composing||(e.startLetter=t.target.value)}}})])]),e._v(" "),s("li",[s("label",[e._v("end with the letter "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.endLetter,expression:"endLetter"}],attrs:{type:"text",placeholder:"single letter"},domProps:{value:e.endLetter},on:{input:function(t){t.target.composing||(e.endLetter=t.target.value)}}})])])]),e._v(" "),e._m(0)])]),e._v(" "),s("div",{staticClass:"word-list-container"},[s("h2",[e._v("Word List")]),e._v(" "),s("ul",{staticClass:"word-list"},[s("transition-group",{attrs:{name:"slideRight",tag:"div",appear:""}},e._l(e.wordList,function(t){return s("li",{key:t},[e._v(e._s(t)+" "),s("button",{staticClass:"remove-word",on:{click:function(s){e.removeWord(t)}}},[e._v("x")])])}))],1)]),e._v(" "),s("div",{staticClass:"results-container"},[e.showSpinner?s("spinner"):e._e(),e._v(" "),e.results&&e.results.length>0?s("h2",[e._v(e._s(e.results.length)+" Words Found")]):e._e(),e._v(" "),e.results&&e.results.length>0?s("ul",{staticClass:"results"},[s("transition-group",{attrs:{name:"fade",tag:"div",appear:""}},e._l(e.results,function(t){return s("li",{key:t.word,staticClass:"item"},[s("p",{staticClass:"result-word"},[e._v(e._s(t.word))]),e._v(" "),s("p",[s("button",{staticClass:"add-word",on:{click:function(s){e.addWord(t.word)}}},[e._v("Add to WordList")])])])}))],1):e._e(),e._v(" "),e.results&&0===e.results.length?s("div",{staticClass:"no-results"},[s("h2",[e._v("No Words Found")]),e._v(" "),s("p",[e._v("Try your search name again with different parameters.")])]):e._e()],1)])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("p",[t("button",{attrs:{type:"submit"}},[this._v("Search")])])}]};var k=s("VU/8")(_,f,!1,function(e){s("dI2f")},"data-v-128d37a8",null).exports;s("6A3X");var w={name:"Dogs",data:function(){return{results:null,errors:[],phrase:"",rhyme:"",posts:null,dogSelection:null,dogUrls:"",dogPic:"",photoIndex:0,likelist:[],dogComment:""}},methods:{getDog:function(){var e=this;l.a.get("https://dog.ceo/api/breed/"+this.dogSelection+"/images").then(function(t){e.results=t.data,e.dogUrls=t.data.message,e.photoIndex=Math.floor(Math.random()*e.dogUrls.length),e.dogPic=e.dogUrls[e.photoIndex]}).catch(function(t){e.errors.push(t)})},removeWord:function(e){this.likelist.splice(this.likelist.indexOf(e),1),console.log(e)}},created:function(){var e=this;l.a.get("https://dog.ceo/api/breeds/list/all").then(function(t){e.posts=t.data}).catch(function(t){e.errors.push(t)})}},C={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"rhyme-mine"},[s("p",[s("router-link",{attrs:{to:{name:"WordSearch"}}},[e._v("Word Search")]),e._v("\n  •\n  "),s("router-link",{attrs:{to:{name:"Dogs"}}},[e._v("Dog Photo Finder")])],1),e._v(" "),s("label",{attrs:{for:"petChooser"}},[e._v("Pick a dog breed:")]),e._v(" "),s("select",{directives:[{name:"model",rawName:"v-model",value:e.dogSelection,expression:"dogSelection"}],on:{change:[function(t){var s=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){return"_value"in e?e._value:e.value});e.dogSelection=t.target.multiple?s:s[0]},function(t){e.results=null}]}},[s("option",{attrs:{disabled:"",value:""}},[e._v("Please select one")]),e._v(" "),e._l(e.posts.message,function(t,n){return s("option",{domProps:{value:n}},[e._v(e._s(n))])})],2),e._v(" "),e.dogSelection?s("form",{on:{submit:function(t){return t.preventDefault(),e.getDog(t)}}},[s("p",[s("button",{attrs:{type:"submit"}},[e._v("Get a random "+e._s(e.dogSelection)+" photo")])])]):e._e(),e._v(" "),e.errors.length>0?s("ul",{staticClass:"errors"},e._l(e.errors,function(t){return s("li",[e._v("\n    "+e._s(t.message)+"\n    ")])})):e._e(),e._v(" "),e.results?s("ul",{staticClass:"photobox"},[e.dogUrls?s("p",[e._v("keep clicking for more random "+e._s(e.dogSelection)+" photos")]):e._e(),e._v(" "),s("img",{staticClass:"dogImg",attrs:{src:e.dogPic},on:{click:e.getDog}}),e._v(" "),s("ul",{staticClass:"likebar"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.dogComment,expression:"dogComment"}],attrs:{type:"text",placeholder:"Add Optional Comment Here"},domProps:{value:e.dogComment},on:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key,"Enter"))return null;e.likelist.push({dog:e.dogSelection,link:e.dogPic,comment:e.dogComment}),e.dogComment=""},input:function(t){t.target.composing||(e.dogComment=t.target.value)}}}),e._v(" "),s("button",{on:{click:function(t){e.likelist.push({dog:e.dogSelection,link:e.dogPic,comment:e.dogComment}),e.dogComment=""}}},[e._v(" Like Dog ")])])]):e._e(),e._v(" "),s("div",{staticClass:"liked"},[e.likelist.length>0?s("p",[e._v("My Favorite Dogs:")]):e._e(),e._v(" "),s("transition-group",{attrs:{name:"slideRight",tag:"div",appear:""}},e._l(e.likelist,function(t){return s("ul",{key:e.likelist.indexOf(t),staticClass:"likeHistory"},[s("li",{staticClass:"likeHistoryelement"},[s("a",{attrs:{href:t.link,target:"_blank"}},[s("img",{staticClass:"thumbnail",attrs:{src:t.link}}),e._v(e._s(t.dog)+" ")]),e._v(" "),t.comment?s("span",[e._v('"'+e._s(t.comment)+'"')]):e._e(),s("button",{staticClass:"remove-word",on:{click:function(s){e.removeWord(t)}}},[e._v("[remove dog]")])])])}))],1)])},staticRenderFns:[]};var b=s("VU/8")(w,C,!1,function(e){s("LCdA")},"data-v-629f5906",null).exports;n.a.use(a.a);var y=new a.a({routes:[{path:"/",name:"WordSearch",component:k},{path:"/Dogs",name:"Dogs",component:b}]});n.a.config.productionTip=!1,new n.a({el:"#app",router:y,template:"<App/>",components:{App:r}})},dI2f:function(e,t){},wamj:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.c108ccb9a3e94bfa9c6b.js.map