let talkingHeadsVideo={holder:$("#player-holder"),player:$("#talking-head-player"),container:{controls:$("#controls"),barWidth:$("#controls").outerWidth()},btns:{bigPlayBtn:$('#bigPlayBtn'),restart:$('#btn-restart'),playToggle:$('#btn-play-toggle'),stop:$('#btn-stop'),mute:$('#btn-mute'),fullscreen:$('#btn-fullscreen')},started:false};var th=talkingHeadsVideo.player,progress=$("#progress"),volumeBar=$("#volume-bar"),holder=talkingHeadsVideo.holder,btns=talkingHeadsVideo.btns,progressBar=$("#progress-bar"),time=$("#time"),player=talkingHeadsVideo.player[0];function setProgressBar(){if($("#controls").outerWidth()<500){volumeBar.css("display","none");volumeBar.width(0);time.css("display","none");time.css("width",0);}else{var newWidth=parseInt($("#controls").outerWidth()/8);volumeBar.width(newWidth);volumeBar.css("display","block");}
let width=0;$("#controls").children().each(function(){let x=$(this).outerWidth(true);width+=x;});width=width-$("#progress-bar").outerWidth()+10;let progressBarWidth=($("#controls").outerWidth()-width)+"px";progressBar.css("width",progressBarWidth);}
function createTalkingHead(title,autostart,controls,actor,color){let path,videoPath,posterPath;if(autostart===undefined||controls===""){autostart="no";}
if(controls===undefined||controls===""){controls=true;}
if(actor===undefined||actor===""){actor=false;}
if(actor){path="https://www.websitetalkingheads.com/spokespeople/";videoPath="videos/";posterPath="posters/";}else{path="https://www.websitetalkingheads.com/ivideo/videos/";videoPath="";posterPath="";}
talkingHeadsVideo.autostart=autostart;talkingHeadsVideo.controls=controls;talkingHeadsVideo.path=path;talkingHeadsVideo.video=path+videoPath+title+".mp4";talkingHeadsVideo.poster=path+posterPath+title+".jpg";th.attr("poster",talkingHeadsVideo.poster);th.attr("src",talkingHeadsVideo.video);setProgressBar();if(talkingHeadsVideo.color!==false){$("#controls").css("background-color",convertHex(color,80));$(".progress-bar").css("background-color","#"+color);$("#bigPlayBtn").css("background-color",convertHex(color,70));$("#bigPlayBtn").css("border-color",convertHex(color,90));$("#player-holder").css("border-color","#"+color);}
switch(talkingHeadsVideo.controls){case"true":$("#controls").addClass("visible");$("#controls").css("opacity",1);break;case"false":$("#controls").addClass("invisible");break;default:talkingHeadsVideo.holder.addClass("mouse-controls");break;}
switch(talkingHeadsVideo.autostart){case"no":player.preload="none";poster();break;case"yes":tryAutostart();break;case"mute":playMuted();break;default:launchMouse();break;}
function launchMouse(){if(!talkingHeadsVideo.started){holder.mouseover(function(){player.muted=true;player.play();});holder.mouseout(function(e){if(e.toElement||e.relatedTarget){return;}
player.pause();});holder.click(function(){talkingHeadsVideo.started=true;holder.unbind();player.load();player.muted=false;player.play();btns.bigPlayBtn.hide("slow");showPause();btnFunctions();});}}
function playMuted(){player.muted=true;th.attr('loop','loop');btns.mute.addClass("btn-unmute");btns.mute.removeClass("btn-mute");btns.bigPlayBtn.show("slow");player.play();showPlay();btnFunctions();}
function poster(){holder.click(function(){talkingHeadsVideo.started=true;holder.unbind();player.load();player.muted=false;player.play();btns.bigPlayBtn.hide("slow");showPause();btnFunctions();});}
function tryAutostart(){let promise=player.play();if(promise!==undefined){promise.then(_=>{showPause();btns.bigPlayBtn.hide("slow");btnFunctions();}).catch(error=>{playMuted();});}}
function showPause(){btns.playToggle.addClass("btn-pause");btns.playToggle.removeClass("btn-play");btns.bigPlayBtn.hide("slow");}
function showPlay(){btns.playToggle.removeClass("btn-pause");btns.playToggle.addClass("btn-play");btns.bigPlayBtn.show("slow");}
function btnFunctions(){$('#player-holder').click(function(){if(!talkingHeadsVideo.started){talkingHeadsVideo.started=true;player.currentTime=0;player.muted=false;showPause();th.removeAttr('loop');}else{switch(event.target.id){case"btn-restart":player.currentTime=0;break;case"btn-play-toggle":case"player-holder":case"talking-head-player":case"bigPlayBtn":playToggle();break;case"btn-stop":stopPlayer();break;case"volume-bar":volumeChange();break;case"btn-mute":mutePlayer();break;case"progress":case"progress-bar":changeTime(event.offsetX);break;case"btn-fullscreen":goFullScreen();break;default:console.log("click default-"+event.target.id);}}});}
function playToggle(){if(player.paused){btns.bigPlayBtn.hide("slow");player.play();showPause();}else{player.pause();btns.bigPlayBtn.show("slow");showPlay();}}
function stopPlayer(){player.currentTime=0;player.pause();showPlay();}
function volumeChange(){}
function mutePlayer(){if(player.muted){player.muted=false;btns.mute.addClass("btn-unmute");btns.mute.removeClass("btn-mute");}else{player.muted=true;btns.mute.addClass("btn-mute");btns.mute.removeClass("btn-unmute");}}
function goFullScreen(){player.requestFullscreen();}
function changeTime(offset){let w=(offset/progressBar.width());progress.css("width",w+'%');player.pause();player.currentTime=player.duration*w;btns.bigPlayBtn.hide("slow");player.play();}
player.onended=function(){player.currentTime=0;btns.bigPlayBtn.show("slow");showPlay();}
player.ontimeupdate=function(){let progressBar=(player.currentTime/player.duration*100);progress.css("width",progressBar+"%")
time.text(showTime());};function showTime(){let cur=getTime(player.currentTime);let dur=getTime(player.duration);return cur+"/"+dur;}
function getTime(timenow){if(parseInt(timenow)/60>=1){let h=Math.floor(timenow/3600);if(isNaN(h)){h=0}
timenow=timenow-h*3600;let m=Math.floor(timenow/60);if(isNaN(m)){m=0}
let s=Math.floor(timenow%60);if(isNaN(s)){s=0}
if(m.toString().length<2){m=m;}
if(s.toString().length<2){s='0'+s;}
return(m+':'+s);}else{let m=Math.floor(timenow/60);if(isNaN(m)){m=0}
let s=Math.floor(timenow%60);if(isNaN(s)){s=0}
if(s.toString().length<2){s='0'+s;}
return(m+':'+s);}}
volumeBar.change(function(){if(player.muted){player.muted=false;btns.mute.addClass("btn-mute");btns.mute.removeClass("btn-unmute");}
player.volume=volumeBar.val();});$(window).resize(function(){setProgressBar();});function convertHex(hex,opacity){hex=hex.replace('#','');r=parseInt(hex.substring(0,2),16);g=parseInt(hex.substring(2,4),16);b=parseInt(hex.substring(4,6),16);result='rgba('+r+','+g+','+b+','+opacity/100+')';return result;}}