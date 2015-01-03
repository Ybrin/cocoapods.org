$(window).ready(function(){var e="http://localhost:8080",t=e+"/api/v1/pods.picky.hash.json",n=e+"/no_results.json",r=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),i=$('#search input[type="search"]'),s=$("#search fieldset p"),o=/\b(platform|on\:\w+\s?)+/,u=$("#search_results div.platform"),a=$("#search_results div.allocations"),f=$("#results_container"),l=function(e,t){var n=e.total;n>0?_gaq.push(["_trackEvent","search","with results",t,n]):_gaq.push(["_trackEvent","search","not found",t,0])},c=function(){_gaq.push(["_trackEvent","platform","switch platform",u.find("input:checked").val(),1])},h=function(e,t){_gaq.push(["_trackEvent","allocation","filter categories",e,t])},p=function(e){_gaq.push(["_trackEvent","resultlink","click outbound link",e,1])},d=function(){u.find("label").removeClass("selected"),u.find("input:checked + label").addClass("selected")},v=!1,m=function(){v||($("html, body").animate({scrollTop:i.offset().top},300),f.addClass("active"),s.hide(),v=!0)},g=function(){v&&($("html, body").animate({scrollTop:0},300),f.removeClass("active"),s.show(),v=!1)},y=function(){g(),$("#search span.amount").hide(),$("#search span#search_loupe").show(),u.hide(),a.hide(),$("#search_results div.results").hide()},b=function(){m(),$("#search span.amount").show(),$("#search span#search_loupe").hide()},w=function(){u.show(),a.show()},E=function(e){return e.replace(o,"")},S=function(e){u.show(),a.hide(),$.getJSON(n,"query="+E(e),function(e,t,n){var r=e.split[0].join(" "),i=e.split[1],s=$("#results_container .no_results .splits");r&&i>0?s.html("<p>We found "+i+" results searching for <a href='javascript:pickyClient.insert(\""+r+"\");'>"+r+"</a>.</p>"):s.html("");var o=$("#results_container .no_results .tags"),u=[];$.each(e.tag,function(e,t){u.push("<a href='javascript:pickyClient.insert(\"tag:"+e+"\");'>"+e+"</a>")}),o.html("<p>Maybe it helps exploring via one of our keywords? </p>"),o.find("p").append(u.sort().join(", ")).append(".")})},x=function(e){$.ajax({url:"/pod/ORStackView/inline",dataType:"html"}).done(function(t){$(e).addClass("is-expanded"),$(e,".expanded .content")[0].innerHTML=t})},T={ios:"iOS",osx:"OS X"},N=/^http/,C=function(e){var t,n,r=e.source;for(var i in r){if(i=="http")return"";n=r[i];if(n.toString().match(N)){t=n;break}}return t},k=function(e){e.platform=T[e.platforms],e.docs_link=e.documentation_url||"http://cocoadocs.org/docsets/"+e.id+"/"+e.version,e.site_link=e.link||C(e),e.spec_link="https://github.com/CocoaPods/Specs/tree/master/Specs/"+e.id+"/"+e.version+"/"+e.id+".podspec.json";if(e.version.match(/[^.0-9]/))e.clipboard_version=e.version;else{var t=e.version.split(".").slice(0,2).join(".");e.clipboard_version="~> "+t}return e.deprecated_in_favor_of?e.deprecated_in_favor_of_link="http://cocoapods.org?q="+e.deprecated_in_favor_of:e.deprecated_in_favor_of_link="",ich.search_result(e,!0)},L=[],A=function(e){return L[L.length-1]!=e?(L.push(e),!0):!1},O=function(e){if(L.indexOf(e)>=0){while(e.length>0){query=L.shift();if(query==e)return!1}return!0}return!0};pickyClient=new PickyClient({full:t,fullResults:20,live:t,liveResults:20,liveRendered:!0,liveSearchInterval:166,maxSuggestions:5,alwaysShowResults:!0,alwaysShowSelection:!0,wrapResults:'<ol class="results"></ol>',enclosingSelector:"#search",resultsSelector:"#search_results div.results",noResultsSelector:"#results_container .no_results",allocationsSelector:"#search_results div.allocations",hiddenAllocations:"#search_results div.allocations .onrequest",counterSelector:"#search form span.amount",moreSelector:"#search_results .allocations .more",beforeInsert:function(e){if(""!=e){b();var t=e.match(o);if(t){var n=u.find('input[value="'+t[0].replace(/\s+$/g,"")+'"]');n.attr("checked","checked"),u.find("label").removeClass("selected"),u.find("input:checked + label").addClass("selected")}return E(e)}},beforeParams:function(e){return e.sort="popularity",e},before:function(e,t){if(e=="")return"";e=e.replace(o,"");var n=u.find("input:checked").val();n!==undefined&&n!=""&&(e=n+" "+e);if(!A(e))return;return e},success:function(e,t){l(e,t);if(""==i.val())return y(),!1;if(O(t))return!1;0==e.total?S(t):w();var n=e.allocations;return n.each(function(e,t){t.entries=t.entries.map(function(e,t){return k(t)})}),e},after:function(e){$copy_to_clipboard=$("ol.results img.copy");var t=new ZeroClipboard($copy_to_clipboard,{moviePath:"./flashes/ZeroClipboard.swf",forceHandCursor:!0});t.on("noflash",function(e,t){function n(e){setTimeout(function(){!$(e).is(":hover")&&!$(".popover:hover").length?$(e).popover("hide"):n(e)},500)}$copy_to_clipboard.popover({trigger:"manual",container:"body"}).on("click",function(e){e.preventDefault()}).on("mouseenter",function(){$(this).popover("show"),$(".popover input").select()}).on("mouseleave",function(){n(this)})}),t.on("load",function(e){e.on("complete",function(e,t){$("h4.has-flash").text("Saved to clipboard"),$(".popover").addClass("saved")}),t.on("mouseover",function(e,t){$(this).popover("show")}),t.on("mouseout",function(e,t){$(this).popover("hide")})}),a.find("li").on("click",function(e){var t=$(e.currentTarget);h(t.find(".text").text(),t.find(".count").text())}),$("ol.results").find("a").on("click",function(e){p(e.currentTarget.href)}),$("ol.results li").on("click",function(e){var t=$(e.target).parents("li");return console.log("event: ",t),console.log("target: ",t),x(t),e.stopPropagation(),!1})},qualifiers:{en:{dependencies:"uses",platform:"on"}},groups:[["platform"]],choices:{en:{platform:"",name:"name",author:"author",summary:"summary",dependencies:"dependency",tags:"tag",version:"version",subspecs:"subspec","author,name":"author+name","name,author":"name+author","tags,name":"tag+name","name,tags":"name+tag","version,name":"version+name","name,version":"name+version","name,dependencies":"name+dependency","dependencies,name":"dependency+name","author,dependencies":"author+dependency","dependencies,author":"dependency+author","dependencies,version":"dependency+version","version,dependencies":"version+dependency","author,version":"author+version","version,author":"version+author","summary,version":"summary+version","version,summary":"version+summary","tags,summary":"summary+name","summary,tags":"name+summary","summary,name":"summary+name","name,summary":"name+summary","summary,author":"summary+author","author,summary":"author+summary","summary,dependencies":"summary+dependency","dependencies,summary":"dependency+summary","name,subspecs":"name+subspec","subspecs,name":"subspec+name","dependencies,subspecs":"dependency+subspec","subspecs,dependencies":"subspec+dependency"}},explanations:{en:{author:"written by",versions:"on version",dependencies:"using",name:"named",summary:"with summary",tags:"tagged as",subspecs:"with subspec"}},explanationDelimiter:{en:"and"},explanationTokenCallback:function(e,t){if(e=="platform"){var n=t.length;return n==2?"<strong>on</strong> both "+t.join(" & "):"only <strong>on</strong> "+t[0]}}}),i.on("input",function(e){""==this.value?(_gaq.push(["_trackEvent","clear"]),y()):b()}),u.find("input").bind("change",function(e){c(),pickyClient.resend(),d()}),$("#search_container").on("click",function(e){i.focus()});var M=function(e){return e.next()},_=function(e){return e.prev()},D=function(e){var t=$("ol.results li.result"),n=t.closest(".selected").first();n.length>0?(n.removeClass("selected"),n=e(n)):n=t.first(),n.addClass("selected")},P=function(){var e=$("ol.results li.result.selected").first();e.length>0&&(console.log("OK"),x(e))};$("body").keydown(function(e){console.log(e.keyCode);switch(e.keyCode){case 18:var t=$("ol.results li").first()[0];x(t);break;case 40:D(M);break;case 38:D(_);break;case 13:r&&i.blur(),P()}}),window.initial_query!=""&&pickyClient.insertFromURL(window.initial_query)});