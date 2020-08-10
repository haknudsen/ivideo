// JavaScript Document
// Talking Heads Player version 0.9.1
////controls- true,false, mouse
//  autostart- no, yes, mouse, mute


function createTalkingHead(title, autostart, controls, captions, actor) {
  var th = {
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
      fullscreen: $('#btn-fullscreen'),
      started: false,
      progress: $("#progress"),
      volumeBar: $("#volume-bar"),
      progressBar: $("#progress-bar"),
      width: 0,
      time: $("#time")
    },
    setProgressBar: function () {
      if ($("#controls").outerWidth() < 500) {
        th.btns.volumeBar.css("display", "none");
        th.btns.volumeBar.width(0);
        th.btns.time.css("display", "none");
        th.btns.time.css("width", 0);
      } else {
        var newWidth = parseInt($("#controls").outerWidth() / 8);
        th.btns.volumeBar.width(newWidth);
        th.btns.volumeBar.css("display", "block");
      }
      $("#controls").children().each(function () {
        let x = $(this).outerWidth(true);
        th.btns.width += x;
      });
      th.btns.width += 6 - $("#progress-bar").outerWidth();
      th.btns.progressBarWidth = ($("#controls").outerWidth() - th.btns.width) + "px";
      $("#progress-bar").outerWidth(th.btns.progressBarWidth);
    },
    posterStart: function () {
      th.holder.click(function () {
        th.started = true;
        th.holder.unbind();
        th.player.muted = false;
        th.player[0].play();
        th.showPause();
        th.btnFunctions();
      });
    },
    showPause: function () {
      th.btns.playToggle.addClass("btn-pause");
      th.btns.playToggle.removeClass("btn-play");
      th.btns.bigPlayBtn.hide("slow");
    },
    showPlay: function () {
      th.btns.playToggle.removeClass("btn-pause");
      th.btns.playToggle.addClass("btn-play");
      th.btns.bigPlayBtn.show("slow");
    },
    playToggle: function () {
      if (th.player[0].paused) {
        th.btns.bigPlayBtn.hide("slow");
        th.player[0].play();
        th.showPause();
      } else {
        th.player[0].pause();
        th.btns.bigPlayBtn.show("slow");
        th.showPlay();
      }
    },
    stopPlayer: function () {
      th.player[0].pause();
      th.player[0].currentTime = 0;
      th.player[0].autoplay = false;
      th.player[0].loop = false;
      th.showPlay();
      th.player[0].load();

    },
    volumeChange: function () {
      th.volume = th.btns.volumeBar.val();
      th.player[0].volume = th.volume;
      sessionStorage.volume = th.volume;
      if (th.player[0].muted) {
        th.muteToggle();
      }

    },
    muteToggle: function () {
      if (th.player[0].muted === true) {
        th.player[0].muted = false;
        th.btns.mute.addClass("btn-unmute");
        th.btns.mute.removeClass("btn-mute");
      } else {
        th.player[0].muted = true;
        th.btns.mute.addClass("btn-mute");
        th.btns.mute.removeClass("btn-unmute");
      }

    },
    changeTime: function (offset) {
      let w = (offset / th.btns.progressBar.width());
      th.btns.progress.css("width", w + '%');
      th.player[0].pause();
      th.player[0].currentTime = th.player[0].duration * w;
      th.btns.bigPlayBtn.hide("slow");
      th.player[0].play();

    },
    showTime: function () {
      let cur = th.getTime(th.player[0].currentTime);
      let dur = th.getTime(th.player[0].duration);
      return cur + "/" + dur;
    },
    getTime: function (timenow) {
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

    },
    btnFunctions: function () {
      th.holder.click(function () {
        console.log(event.target.id);
        switch (event.target.id) {
          case "btn-restart":
            th.player.currentTime = 0;
            break;
          case "btn-play-toggle":
          case "player-holder":
          case "talking-head-player":
          case "bigPlayBtn":
            th.playToggle();
            break;
          case "btn-stop":
            th.stopPlayer();
            break;
          case "volume-bar":
            th.volumeChange();
            break;
          case "btn-mute":
            th.muteToggle();
            break;
          case "progress":
          case "progress-bar":
            th.changeTime(event.offsetX);
            break;
          case "btn-captions":
            th.captionToggle();
            break;
          case "btn-fullscreen":
            th.goFullScreen();
            break;
          default:
            //  console.log("click default-" + event.target.id);
        }
      });
    }
  }


  //----end creation
  if (autostart === undefined) {
    th.autostart = true;
  } else {
    th.autostart = autostart
  }
  if (controls === undefined || controls === "") {
    th.controls = true;
  } else {
    th.controls = controls;
  }
  if (captions === undefined || captions === "") {
    th.captions = false;
  } else {
    th.captions = captions;
  }
  if (actor === undefined || actor === "") {
    th.path = "https://www.websitetalkingheads.com/ivideo/videos/";
    th.video = th.path + title + ".mp4";
    th.poster = th.path + title + ".jpg";
  } else {
    th.path = "https://www.websitetalkingheads.com/spokespeople/";
    th.video = th.path + "videos/" + title + ".mp4";
    th.poster = th.path + "posters/" + title + ".jpg";
  }
  if (sessionStorage.volume) {
    th.volume = sessionStorage.volume;
    th.btns.volumeBar.val(th.volume);
  }
  th.player.attr("poster", th.poster);
  th.player.attr("src", th.video);
  //-------------------------------Set Controls
  switch (th.controls) {
    case "true":
      $("#controls").addClass("visible");
      $("#controls").css("opacity", 1);
      break;
    case "false":
      $("#controls").addClass("invisible");
      break;
    default:
      th.holder.addClass("mouse-controls");
      break;
  }
  //--------------------------------Set autostart
  switch (th.autostart) {
    case "no":
      th.player.attr("preload", "meta");
      var i = setInterval(function () {
        if (th.player[0].readyState > 0) {
          console.log(th.player[0].readyState);
          console.log(th.player[0].duration);
         th.btns.time.text(th.showTime());
          clearInterval(i);
        }
      }, 200);
      th.posterStart();
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
  console.log(th);
  th.setProgressBar();
  // Update the seek bar as the player plays
  th.player[0].ontimeupdate = function () {
    let progressBar = (th.player[0].currentTime / th.player[0].duration * 100);
    th.btns.progress.css("width", progressBar + "%")
    th.btns.time.text(th.showTime());
  };
} [0]
