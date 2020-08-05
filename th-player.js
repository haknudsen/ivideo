// JavaScript Document
// Talking Heads Player version 0.9.1
////controls- true,false, mouse
//  autostart- no, yes, mouse, mute
let talkingHeadsVideo = {
  holder: $("#player-holder"),
  player: $("#talking-head-player"),
  container: {
    controls: $("#controls"),
    barWidth: $("#controls").outerWidth()
  },
  btns: {
    bigPlayBtn: $('#bigPlayBtn'),
    restart: $('#btn-restart'),
    playToggle: $('#btn-play-toggle'),
    stop: $('#btn-stop'),
    mute: $('#btn-mute'),
    captions: $('#btn-captions'),
    fullscreen: $('#btn-fullscreen')
  },
  started: false
};
var th = talkingHeadsVideo.player,
  progress = $("#progress"),
  volumeBar = $("#volume-bar"),
  holder = talkingHeadsVideo.holder,
  btns = talkingHeadsVideo.btns,
  progressBar = $("#progress-bar"),
  time = $("#time"),
  player = talkingHeadsVideo.player[0];
//get controls width and set seekbar width
function setProgressBar() {
  if ($("#controls").outerWidth() < 500) {
    volumeBar.css("display", "none");
    volumeBar.width(0);
    time.css("display", "none");
    time.css("width", 0);
  } else {
    var newWidth = parseInt($("#controls").outerWidth() / 8);
    volumeBar.width(newWidth);
    volumeBar.css("display", "block");
  }
  let width = 0;
  $("#controls").children().each(function () {
    let x = $(this).outerWidth(true);
    width += x;
  });
  width = width - $("#progress-bar").outerWidth() + 6;
  let progressBarWidth = ($("#controls").outerWidth() - width) + "px";
  progressBar.css("width", progressBarWidth);
}

function createTalkingHead(title, autostart, controls, captions, actor) {
  let path, videoPath, posterPath;
  //Create Player Object
  if (autostart === undefined) {
    autostart = "mouse";
  } //autostart 
  if (controls === undefined || controls === "") {
    controls = true;
  }
  if (actor === undefined || actor === "") {
    path = "https://www.websitetalkingheads.com/ivideo/videos/";
    videoPath = "";
    posterPath = "";
  } else {
    path = "https://www.websitetalkingheads.com/spokespeople/";
    videoPath = "videos/";
    posterPath = "posters/";
  }
  if (sessionStorage.volume) {
    player.volume = sessionStorage.volume;
    volumeBar.val(sessionStorage.volume);
  }
  talkingHeadsVideo.autostart = autostart;
  talkingHeadsVideo.controls = controls;
  talkingHeadsVideo.path = path;
  talkingHeadsVideo.video = path + videoPath + title + ".mp4";
  talkingHeadsVideo.poster = path + posterPath + title + ".jpg";
  th.attr("poster", talkingHeadsVideo.poster);
  th.attr("src", talkingHeadsVideo.video);
  setProgressBar();
  //-----------------------Check for CC
  if (captions) {
    talkingHeadsVideo.controls = "mouse";
    var url = "https://www.websitetalkingheads.com/ivideo/captions/" + title + ".vtt";
    var captions = CheckUrl(url);
    if (captions) {
      var track = '<track src="' + url + '" label="English" kind="captions" srclang="en-us" default >';
      th.prepend(track);
    }
    async function CheckUrl(url) {
      const response = await fetch(url, {
        method: "head",
        mode: "no-cors"
      });
      return response.status == 200;
    }
  }
  //-------------------------------Set Controls
  switch (talkingHeadsVideo.controls) {
    case "true":
      $("#controls").addClass("visible");
      $("#controls").css("opacity", 1);
      break;
    case "false":
      $("#controls").addClass("invisible");
      break;
    default:
      talkingHeadsVideo.holder.addClass("mouse-controls");
      break;
  }
  //--------------------------------Set autostart
  switch (talkingHeadsVideo.autostart) {
    case "no":
      player.preload = "none";
      poster();
      break;
    case "yes":
      tryAutostart();
      break;
    case "mute":
      playMuted();
      break;
    default:
      launchMouse();
      break;
  }
  ///autoplay mouse
  function launchMouse() {
    if (!talkingHeadsVideo.started) {
      holder.mouseover(function () {
        player.muted = true;
        player.play();
      });
      holder.mouseout(function (e) {
        if (e.toElement || e.relatedTarget) {
          return;
        }
        player.pause();
      });
      holder.click(function () {
        talkingHeadsVideo.started = true;
        holder.unbind();
        player.load();
        player.muted = false;
        player.play();
        btns.bigPlayBtn.hide("slow");
        showPause();
        btnFunctions();
      });
    }
  }
  //autostart muted
  function playMuted() {
    player.muted = true;
    th.attr('loop', 'loop');
    btns.mute.addClass("btn-unmute");
    btns.mute.removeClass("btn-mute");
    btns.bigPlayBtn.show("slow");
    player.play();
    showPlay();
    btnFunctions();
  }
  //-----------------autostart poster
  function poster() {
    holder.click(function () {
      talkingHeadsVideo.started = true;
      holder.unbind();
      player.load();
      player.muted = false;
      player.play();
      btns.bigPlayBtn.hide("slow");
      showPause();
      btnFunctions();
    });
  }
  //Start functions--------------------------------------------------
  function tryAutostart() {
    let promise = player.play();
    if (promise !== undefined) {
      promise.then(_ => {
        showPause();
        btns.bigPlayBtn.hide("slow");
      }).catch(error => {
        playMuted();
      });
      btnFunctions();
    }
  }

  function showPause() {
    btns.playToggle.addClass("btn-pause");
    btns.playToggle.removeClass("btn-play");
    btns.bigPlayBtn.hide("slow");
  }

  function showPlay() {
    btns.playToggle.removeClass("btn-pause");
    btns.playToggle.addClass("btn-play");
    btns.bigPlayBtn.show("slow");
  }
  //create button functions
  function btnFunctions() {
    //buttons functions--------------------------------------
    $('#player-holder').click(function () {
      if (!talkingHeadsVideo.started) {
        talkingHeadsVideo.started = true;
        player.currentTime = 0;
        player.muted = false;
        showPause();
        th.removeAttr('loop');
      } else {
        switch (event.target.id) {
          case "btn-restart":
            player.currentTime = 0;
            break;
          case "btn-play-toggle":
          case "player-holder":
          case "talking-head-player":
          case "bigPlayBtn":
            playToggle();
            break;
          case "btn-stop":
            stopPlayer();
            break;
          case "volume-bar":
            volumeChange();
            break;
          case "btn-mute":
            mutePlayer();
            break;
          case "progress":
          case "progress-bar":
            changeTime(event.offsetX);
            break;
          case "btn-captions":
            captionToggle();
            break;
          case "btn-fullscreen":
            goFullScreen();
            break;
          default:
            //  console.log("click default-" + event.target.id);
        }
      }
    });
  }

  function playToggle() {
    if (player.paused) {
      btns.bigPlayBtn.hide("slow");
      player.play();
      showPause();
    } else {
      player.pause();
      btns.bigPlayBtn.show("slow");
      showPlay();
    }
  }

  function stopPlayer() {
    player.currentTime = 0;
    player.autoplay = false;
    player.loop = false;
    player.pause();
    showPlay();
  }

  function mutePlayer() {
    if (player.muted) {
      player.muted = false;
      btns.mute.addClass("btn-unmute");
      btns.mute.removeClass("btn-mute");
    } else {
      player.muted = true;
      btns.mute.addClass("btn-mute");
      btns.mute.removeClass("btn-unmute");
    }
  }

  function goFullScreen() {
    player.requestFullscreen();
  }

  function changeTime(offset) {
    let w = (offset / progressBar.width());
    progress.css("width", w + '%');
    player.pause();
    player.currentTime = player.duration * w;
    btns.bigPlayBtn.hide("slow");
    player.play();
  }
  //video ended function
  player.onended = function () {
    player.currentTime = 0;
    btns.bigPlayBtn.show("slow");
    showPlay();
  }
  // Update the seek bar as the player plays
  player.ontimeupdate = function () {
    let progressBar = (player.currentTime / player.duration * 100);
    progress.css("width", progressBar + "%")
    time.text(showTime());
  };
  //Show time funcion
  function showTime() {
    let cur = getTime(player.currentTime);
    let dur = getTime(player.duration);
    return cur + "/" + dur;
  }
  //get time - used for current time and duration
  function getTime(timenow) {
    if (parseInt(timenow) / 60 >= 1) {
      let h = Math.floor(timenow / 3600);
      if (isNaN(h)) {
        h = 0
      }
      timenow = timenow - h * 3600;
      let m = Math.floor(timenow / 60);
      if (isNaN(m)) {
        m = 0
      }
      let s = Math.floor(timenow % 60);
      if (isNaN(s)) {
        s = 0
      }
      if (m.toString().length < 2) {
        m = m;
      }
      if (s.toString().length < 2) {
        s = '0' + s;
      }
      return (m + ':' + s);
    } else {
      let m = Math.floor(timenow / 60);
      if (isNaN(m)) {
        m = 0
      }
      let s = Math.floor(timenow % 60);
      if (isNaN(s)) {
        s = 0
      }
      if (s.toString().length < 2) {
        s = '0' + s;
      }
      return (m + ':' + s);
    }
  }
  // Update the video volume
  volumeBar.change(function () {
    if (player.muted) {
      player.muted = false;
      btns.mute.addClass("btn-mute");
      btns.mute.removeClass("btn-unmute");
    }
    player.volume = volumeBar.val();
    volumeChange();
  });

  function volumeChange() {
    sessionStorage.volume = volumeBar.val();
    btns.mute.removeClass("btn-mute");
    btns.mute.addClass("btn-unmute");
  }

  function captionToggle() {
    var curCaption = player.textTracks[0].mode;
    if (curCaption === "showing") {
      player.textTracks[0].mode = 'hidden';
      btns.captions.removeClass("btn-captions");
      btns.captions.addClass("btn-captions-off");
    } else {
      player.textTracks[0].mode = 'showing';
      btns.captions.removeClass("btn-captions-off");
      btns.captions.addClass("btn-captions");
    }
    console.log(curCaption);
  }
//Update controls on window resize
$(window).resize(function () {
  setProgressBar();
});
}
