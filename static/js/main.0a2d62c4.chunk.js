(this["webpackJsonplyrics-frontend"]=this["webpackJsonplyrics-frontend"]||[]).push([[0],{101:function(t,e,n){"use strict";n.r(e);var o=n(11),a=n(1),r=n.n(a),c=n(7),l=n.n(c),s=n(32),i=n(27),d=n(28),u=n(33),h=n(31),p=n(105),m=n(0),f=30,y=30,g=30,v=30,b=window.innerWidth,w=.85*window.innerHeight,x=function(t){return t.toLowerCase().replace(/[^0-9a-z]/gi,"")},W=function(t){Object(u.a)(n,t);var e=Object(h.a)(n);function n(){var t;Object(i.a)(this,n);for(var o=arguments.length,a=new Array(o),r=0;r<o;r++)a[r]=arguments[r];return(t=e.call.apply(e,[this].concat(a))).state={textAreaContent:"",selectedWord:"the",selectedPunc:"!"},t.handleTextIn=function(e,n){var o=n.value;return t.setState({textAreaContent:o})},t}return Object(d.a)(n,[{key:"componentDidMount",value:function(){alert("Welcome!\n\nPaste your text to visualize in the bottom right input area, or just draft by typing there.\n\nThen scroll and hover over individual words and punctuations to see how redundant and well-paced your inputted text was.\n\nHappy proof-reading :)")}},{key:"render",value:function(){var t=this,e=this.state.textAreaContent;e||(e="Oh my God\nYou can run on for a long time\nRun on for a long time\nRun on for a long time\nSooner or later God'll cut you down\nSooner or later God'll cut you down\nGo tell that long tongue liar\nGo and tell that midnight rider\nTell the rambler, the gambler, the back biter\nTell 'em that God's gonna cut 'em down\nTell 'em that God's gonna cut 'em down\nWell my goodness gracious let me tell you the news\nMy head's been wet with the midnight dew\nI've been down on bended knee\nTalkin' to the man from Galilee\nHe spoke to me in the voice so sweet\nI thought I heard the shuffle of the angel's feet\nHe called my name and my heart stood still\nWhen he said, \"John, go do my will!\"\nGo tell that long tongue liar\nGo and tell that midnight rider\nTell the rambler, the gambler, the back biter\nTell 'em that God's gonna cut 'em down\nTell 'em that God's gonna cut 'em down\nYou can run on for a long time\nRun on for a long time\nRun on for a long time\nSooner or later God'll cut you down\nSooner or later God'll cut you down\nWell you may throw your rock and hide your hand\nWorkin' in the dark against your fellow man\nBut as sure as God made black and white\nWhat's down in the dark will be brought to the light\nYou can run on for a long time\nRun on for a long time\nRun on for a long time\nSooner or later God'll cut you down\nSooner or later God'll cut you down\nGo tell that long tongue liar\nGo and tell that midnight rider\nTell the rambler, the gambler, the back biter\nTell 'em that God's gonna cut you down\nTell 'em that God's gonna cut you down\nTell 'em that God's gonna cut you down\nOh yeah\nCut him down\nCut him down\nCut him down");for(var n=(e=e.trimEnd().replaceAll("\n"," ")).split(" "),a=n.length,r=e.replaceAll(" ","").length,c=new Set(n.map((function(t){return x(t)}))).size,l={"!":{appearances:[],strName:"exclamation"},",":{appearances:[],strName:"comma"},".":{appearances:[],strName:"period"},"?":{appearances:[],strName:"question"},";":{appearances:[],strName:"semi-colon"}},i=[],d={},u=null,h=null,W=0,k=0,G=(w-f-g)/a,O=this.state.selectedWord,C=m.c().domain([0,r]).range([v,b-v-y]),R=m.c().domain([0,a]).range([g,w-f]),N=0;N<a;N++){var T=n[N],_=x(T);_ in d?d[_]=d[_]+1:(d[_]=1,Object.keys(d).length===c&&(u=T,h=W));for(var j=T.length,A=C(j)-y,z=[],D=0;D<j;D++)T.charAt(D)in l&&z.push(T.charAt(D));for(var P=0;P<z.length;P++)l[z[P]].appearances.push({x:W+A*((P+1)/z.length),occurance:l[z[P]].appearances.length+1});i.push({originalWord:T,cleanedWord:_,punctuationsArray:z,x:W,y:k,width:A,height:G,occurance:d[_]}),W+=A,k+=G}m.e("#viz").select("svg").remove();var S=m.e("#viz").append("svg").attr("width",b).attr("height",w);m.e("#viz").select("div").remove();var I=m.e("#viz").append("div").style("position","absolute").style("visibility","hidden").style("text-align","center").style("font-size","28px");S.append("g").call(m.a(C)).attr("transform","translate(0,".concat(w-g,")")),S.append("g").call(m.b(R)).attr("transform","translate(".concat(v,",0)")),S.append("text").html("X: Characters Used / ".concat(r)).attr("color","black").attr("transform","translate(".concat(C(.01*r),",").concat(R(.04*a),")")).attr("text-align","left"),S.append("text").html("Y: Words Remaining / ".concat(a)).attr("color","black").attr("transform","translate(".concat(C(.01*r),",").concat(R(.07*a),")")).attr("text-align","left"),S.append("path").style("stroke","black").style("fill","red").attr("d",m.g().type(m.h).size(230)).attr("transform","translate(".concat(C(.015*r),",").concat(R(.1*a),")rotate(180)")),S.append("text").html('"'.concat(u,'" ~ last of ').concat(c," unique words used")).attr("color","black").attr("transform","translate(".concat(C(.025*r),",").concat(R(.115*a),")")).attr("text-align","center"),S.append("path").style("stroke","black").style("fill","red").attr("d",m.g().type(m.h).size(230)).attr("transform","translate(".concat(h+v,",").concat(R(.99*a),")rotate(180)")),S.selectAll("bars").data(i).enter().append("rect").attr("class",(function(t){return"WORD_".concat(t.cleanedWord)})).attr("width",(function(t){return t.width})).attr("height",(function(t){return t.height})).attr("x",(function(t){return t.x+v})).attr("y",(function(t){return w-t.y-g-i[0].height})).attr("fill",(function(t){return t.cleanedWord===O?"red":"blue"})).on("click",(function(e,n){t.setState({selectedWord:n.cleanedWord})})).on("mouseover",(function(t,e){m.e(this).style("cursor","pointer"),m.f(".WORD_".concat(e.cleanedWord)).classed("hovered",!0),I.style("visibility","visible")})).on("mousemove",(function(t,e){I.html("".concat(e.occurance," / ").concat(d[e.cleanedWord],' uses of "').concat(e.cleanedWord,'"')).style("left","".concat(t.pageX+5,"px")).style("top","".concat(t.pageY+10,"px"))})).on("mouseout",(function(t,e){I.style("visibility","hidden"),m.f(".WORD_".concat(e.cleanedWord)).classed("hovered",!1)})),S.selectAll("bottomBars").data(i).enter().append("rect").attr("class",(function(t){return"WORD_".concat(t.cleanedWord)})).attr("width",(function(t){return t.width})).attr("height",8).attr("x",(function(t){return t.x+v})).attr("y",w-g).attr("fill",(function(t){return t.cleanedWord===O?"red":"none"})).on("mouseover",(function(t,e){m.e(this).style("cursor","crosshair"),m.f(".WORD_".concat(e.cleanedWord)).classed("hovered",!0),I.style("visibility","visible")})).on("mousemove",(function(t,e){I.html("".concat(e.occurance," / ").concat(d[e.cleanedWord],' uses of "').concat(e.cleanedWord,'"')).style("left","".concat(t.pageX+5,"px")).style("top","".concat(t.pageY+10,"px"))})).on("mouseout",(function(t,e){I.style("visibility","hidden"),m.f(".WORD_".concat(e.cleanedWord)).classed("hovered",!1)}));for(var Y=Object.keys(l).filter((function(t){return l[t].appearances.length>0})),U=function(e){var n=Y[e],o=l[n].strName,r=l[n].appearances,c=r.length;S.selectAll("punctuations").data(r).enter().append("text").attr("class",(function(t){return"PUNC_ PUNC_".concat(o)})).attr("transform",(function(t){return"translate(".concat(t.x+v,",").concat(R(a*(1.03-t.occurance/c)),")")})).attr("font-size","85px").html(n).classed("punc-hovered",n===t.state.selectedPunc).on("click",(function(e,o){t.setState({selectedPunc:n})})).on("mouseover",(function(t,e){m.e(this).style("cursor","pointer"),m.f(".PUNC_").classed("punc-hovered",!1),m.f(".PUNC_".concat(o)).classed("punc-hovered",!0),I.html("".concat(e.occurance," / ").concat(c,' uses of "').concat(n,'"')).style("visibility","visible")})).on("mousemove",(function(t){I.style("left","".concat(t.pageX+12,"px")).style("top","".concat(t.pageY,"px"))})).on("mouseout",(function(e,n){I.style("visibility","hidden"),m.f(".PUNC_").classed("punc-hovered",!1),m.f(".PUNC_".concat(l[t.state.selectedPunc].strName)).classed("punc-hovered",!0)}))},E=0;E<Y.length;E++)U(E);m.e("#wordCount").select("ol").remove();var H=m.d().domain([1,Math.max.apply(Math,Object(s.a)(Object.values(d)))]).range([15,75]);return m.e("#wordCount").append("ol").style("list-style-type","none").selectAll("li").data(Object.keys(d).sort((function(t,e){return d[t]===d[e]?0:d[t]<d[e]?1:-1}))).enter().append("li").attr("class",(function(t){return"WORD_".concat(t)})).text((function(t){return t})).style("font-size",(function(t){return"".concat(H(d[t]),"px")})).style("color",(function(e){return"".concat(e===t.state.selectedWord?"red":"blue")})).on("click",(function(e,n){t.setState({selectedWord:n})})).on("mouseover",(function(t,e){m.e(this).style("cursor","pointer"),m.f(".WORD_".concat(e)).classed("hovered",!0),I.html('"'.concat(e,'" used ').concat(d[e]," time").concat(d[e]>1?"s":"")).style("visibility","visible")})).on("mousemove",(function(t){I.style("left","".concat(t.pageX+12,"px")).style("top","".concat(t.pageY,"px"))})).on("mouseout",(function(t,e){I.style("visibility","hidden"),m.f(".WORD_".concat(e)).classed("hovered",!1)})),Object(o.jsx)(p.a,{placeholder:"BEGIN DRAFTING HERE! (currently using default Johnny Cash lyrics) === "+e,onChange:this.handleTextIn})}}]),n}(r.a.Component);l.a.render(Object(o.jsx)(W,{}),document.getElementById("textIn"))}},[[101,1,2]]]);
//# sourceMappingURL=main.0a2d62c4.chunk.js.map