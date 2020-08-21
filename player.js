// JavaScript Document
// Talking Heads Player version 1.0.1
////controls- true,false, mouse
//  autostart- no, yes, mouse, mute


function createTalkingHead(title, autostart, controls, captions, color, actor) {
  var th = {
    title: title,
    autostart: autostart,
    controls: controls,
    color: color,
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
    setVideo: function () {
      th.player.attr("poster", th.poster);
      th.player.attr("src", th.video);
    },
    playlist: {
      currentVideo: 0,
      setHeight: function () {
        let w = th.holder.width();
        let h = (w / 16) * 3;
        $("#playlist").height(h);
      },
      newVideo: function () {
        th.player.attr("poster", th.poster);
        th.player.attr("src", th.video);
        th.stopPlayer();
        setTimeout(function () {
          th.playToggle();
        }, 100);
      },
      getPlaylist: function () {
        let playlistList = [];
        $('#myCarousel img').each(function () {
          playlistList.push(this.title);
        });
        return playlistList;
      }
    },
    interactive: {
      chapter: 0,
      hotspot:0,
      getLesson: function () {
        $.ajax({
          'async': false,
          'global': false,
          'url': "chapters/interactive.json",
          'dataType': "json",
          'success': function (data) {
            <!--            console.log(data);-->
            th.interactive.data = data;
          }
        });
      }
    },
    captions: {
      use: function () {
        if (captions === "true") {
          th.controls = "mouse";
          th.player.prepend('<track src="captions/' + title + '.vtt" label="English" kind="captions" srclang="en-us" default >');
          return true;
        } else {
          th.btns.captions.css({
            "width": "0",
            "margin": "0"
          });
          return false;
        }
      },
      captionToggle: function () {
        th.captions.curCaption = th.player[0].textTracks[0].mode;
        if (th.captions.curCaption === "showing") {
          th.player[0].textTracks[0].mode = 'hidden';
          th.btns.captions.removeClass("btn-captions");
          th.btns.captions.addClass("btn-captions-off");
        } else {
          th.player[0].textTracks[0].mode = 'showing';
          th.btns.captions.removeClass("btn-captions-off");
          th.btns.captions.addClass("btn-captions");
        }
      },
    },
    setColor: function () {
      if (th.color.length === 6) {
        $("#controls").css({
          "background-color": th.convertHex(color, 80),
          "border-color": "#" + color
        });
        $(".progress-bar").css("background-color", "#" + color);
        $("#bigPlayBtn").css("background-color", th.convertHex(color, 70));
        $("#bigPlayBtn").css("border-color", th.convertHex(color, 90));
        $(".carousel-control-prev").css("color", "#" + color);
        $(".carousel-control-next").css("color", "#" + color);
        $("#playlist-player").css("background-color", "#" + color);
        $("#btn-restart").removeClass("btn-restart").addClass("btn-white-restart");
        $("#btn-play-toggle").removeClass("btn-play").addClass("btn-white-play");
        $("#btn-stop").removeClass("btn-stop").addClass("btn-white-stop");
        $("#btn-mute").removeClass("btn-unmute").addClass("btn-white-unmute");
        $("#btn-captions").removeClass("btn-captions").addClass("btn-white-captions");
        $("#btn-fullscreen").removeClass("btn-fullscreen-enter").addClass("btn-white-fullscreen-enter");
        $("#time").css({
          "text-shadow": "1px 1px #" + color,
          "color": "white"
        });
        $(".progress").css("background-color", "white");
        $("input[type=range]").addClass("slideThumb");
        let c = "[type='range']::-webkit-slider-runnable-track{border:2px solid #" + color + "}[type='range']::-webkit-slider-thumb{background:#FFFFFF;border:2px solid #" + color + "}[type='range']::-moz-range-track{background:#" + color + ";border:2px solid #FFFFFF}[type='range']::-moz-range-thumb{background:#FFFFFF;border:2px solid #" + color + "}[type='range']::-ms-fill-lower{background:#006fe6;border:2px solid #FFFFFF}[type='range']::-ms-fill-upper{background:#" + color + ";border:2px solid #FFFFFF}[type='range']::-ms-thumb{background:#FFFFFF;border:2px solid #" + color + "}";
        $("<style type='text/css'> " + c + " </style>").appendTo("head");
      } else {
        th.color = false;
      }
    },
    convertHex: function (hex, opacity) {
      hex = hex.replace('#', '');
      var r = parseInt(hex.substring(0, 2), 16);
      var g = parseInt(hex.substring(2, 4), 16);
      var b = parseInt(hex.substring(4, 6), 16);
      return 'rgba(' + r + ',' + g + ',' + b + ',' + opacity / 100 + ')';
    },
    setHeight: function () {
      let w = th.holder.width();
      let h = (w / 16) * 9;
      th.holder.height(h);
      th.container.controls.css("top", h - 42);
      $("#bigPlayBtn").css({
        "top": (w / 16) * 4,
        "left": (w / 2) - ($("#bigPlayBtn").innerWidth() / 2),
        "opacity": 0.9
      });
    },
    setProgressBar: function () {
      if (th.container.barWidth < 500) {
        th.btns.volumeBar.css("display", "none");
        th.btns.volumeBar.width(0);
        th.btns.time.css("display", "none");
        th.btns.time.css("width", 0);
      } else {
        var newWidth = parseInt(th.container.barWidth / 8);
        th.btns.volumeBar.width(newWidth);
        th.btns.volumeBar.css("display", "block");
      }
      th.btns.width = 0;
      $("#controls").children().each(function () {
        let x = $(this).outerWidth(true);
        th.btns.width += x;
      });
      th.btns.width += 6 - $("#progress-bar").outerWidth();
      th.btns.progressBarWidth = (th.container.barWidth - th.btns.width);
      $("#progress-bar").outerWidth(th.btns.progressBarWidth);
    },
    preLoad: function () {
      th.player.attr("preload", "meta");
      var i = setInterval(function () {
        if (th.player[0].readyState > 0) {
          th.btns.time.text(th.showTime());
          clearInterval(i);
        }
      }, 200);
    },
    posterStart: function () {
      th.preLoad();
      th.holder.click(function () {
        th.started = true;
        th.holder.unbind();
        th.player[0].muted = false;
        th.player[0].play();
        th.showPause();
        th.btnFunctions();
        if (event.target.id === "btn-fullscreen") {
          th.goFullScreen();
        }
        if (event.target.id === "volume-bar") {
          th.volumeChange();
        }
      });
    },
    showPause: function () {
      if (th.color === false) {
        th.btns.playToggle.addClass("btn-pause");
        th.btns.playToggle.removeClass("btn-play");
      } else {
        th.btns.playToggle.addClass("btn-white-pause");
        th.btns.playToggle.removeClass("btn-white-play");
      }
      th.btns.bigPlayBtn.fadeOut("slow");
    },
    showPlay: function () {
      if (th.color === false) {
        th.btns.playToggle.removeClass("btn-pause");
        th.btns.playToggle.addClass("btn-play");
      } else {
        th.btns.playToggle.removeClass("btn-white-pause");
        th.btns.playToggle.addClass("btn-white-play");
      }
      th.btns.bigPlayBtn.fadeIn("slow");
    },
    playToggle: function () {
      if (th.player[0].paused) {
        th.btns.bigPlayBtn.fadeOut("slow");
        th.player[0].play();
        th.showPause();
      } else {
        th.player[0].pause();
        th.btns.bigPlayBtn.fadeIn("slow");
        th.showPlay();
      }
    },
    stopPlayer: function () {
      th.preLoad();
      th.player[0].pause();
      th.player[0].currentTime = 0;
      th.player[0].autoplay = false;
      th.player[0].loop = false;
      th.autostart = "no";
      th.btns.progress.css("width", "0%");
      th.showPlay();
      th.player[0].load();
    },
    volumeChange: function () {
      th.volume = th.btns.volumeBar.val();
      th.player[0].volume = th.volume;
      sessionStorage.volume = th.volume;
      if (th.player[0].muted) {
        th.mute.check();
      }

    },
    mute: {
      toggleOn: function () {
        th.player[0].muted = false;
        if (th.color === false) {
          th.btns.mute.addClass("btn-unmute");
          th.btns.mute.removeClass("btn-mute");
        } else {

          th.btns.mute.addClass("btn-white-unmute");
          th.btns.mute.removeClass("btn-white-mute");
        }
      },
      toggleOff: function () {
        th.player[0].muted = true;
        if (th.color === false) {
          th.btns.mute.addClass("btn-mute");
          th.btns.mute.removeClass("btn-unmute");
        } else {
          th.btns.mute.addClass("btn-white-mute");
          th.btns.mute.removeClass("btn-white-unmute");
        }
      },
      check: function () {
        if (th.player[0].muted) {
          th.mute.toggleOn();
        } else {
          th.mute.toggleOff();
        }
      }
    },
    changeTime: function (offset) {
      let w = (offset / th.btns.progressBar.width());
      th.btns.progress.css("width", w + '%');
      th.player[0].pause();
      th.player[0].currentTime = th.player[0].duration * w;
      th.btns.bigPlayBtn.fadeOut("slow");
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
    goFullScreen: function () {
      th.player[0].requestFullscreen();
    },
    tryAutostart: function () {
      let promise = th.player[0].play();
      if (promise !== undefined) {
        promise.then(_ => {
          th.showPause();
          th.btns.bigPlayBtn.fadeOut("slow");
        }).catch(error => {
          th.autostart = "mute";
          th.playMuted();
        });
        th.btnFunctions();
      }
    },
    playMuted: function () {
      th.player[0].muted = true;
      th.player.attr('loop', 'loop');
      th.btns.mute.addClass("btn-unmute");
      th.btns.mute.removeClass("btn-mute");
      th.btns.bigPlayBtn.fadeIn("slow");
      th.player[0].play();
      th.holder.click(function () {
        th.mute.toggleOff();
        th.holder.unbind();
        th.stopPlayer()
        th.started = true;
        th.autostart = "yes";
        th.player[0].muted = false;
        th.player[0].play();
        th.showPause();
        th.btnFunctions();
        console.log(event.target.id);
        if (event.target.id === "btn-fullscreen") {
          th.goFullScreen();
        }
        if (event.target.id === "volume-bar") {
          th.volumeChange();
        }
      });
    },
    btnFunctions: function () {
      th.holder.click(function () {
        //        console.log(event.target.id);
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
            th.mute.check();
            break;
          case "progress":
          case "progress-bar":
            th.changeTime(event.offsetX);
            break;
          case "btn-captions":
            th.captions.captionToggle();
            break;
          case "btn-fullscreen":
            th.goFullScreen();
            break;
          default:
            //  console.log("click default-" + event.target.id);
        }
      });
    },
    checkVolume: function () {
      if (sessionStorage.volume) {
        th.volume = sessionStorage.volume;
        th.btns.volumeBar.val(th.volume);
        th.player[0].volume = th.volume;
      }
    },
    getTitle: function () {
      switch (th.title) {
        case "interactive":
          th.interactive.getLesson();
          title = th.interactive.data[th.interactive.chapter].video;
          th.path = "videos/";
          th.video = th.path + title + ".mp4";
          th.poster = "images/poster.jpg";
          break;
        case "playlist":
          th.playlist.setHeight();
          title = th.playlist.getPlaylist()[th.playlist.currentVideo];
          break;
        default:
          if (actor === undefined || actor === "") {
            th.path = "https://www.websitetalkingheads.com/ivideo/videos/";
            th.video = th.path + title + ".mp4";
            th.poster = th.path + title + ".jpg";
          } else {
            th.path = "https://www.websitetalkingheads.com/spokespeople/";
            th.video = th.path + "videos/" + title + ".mp4";
            th.poster = th.path + "posters/" + title + ".jpg";
          }
      }
    },
    setControls: function () {
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
    },
    setAutostart: function () {
      switch (th.autostart) {
        case "no":
          th.posterStart();
          break;
        case "yes":
          th.tryAutostart();
          break;
        case "mute":
          th.playMuted();
          break;
        default:
          th.autostart = "no";
          th.posterStart();
          break;
      }
    }
  }


  th.setControls();
  th.setColor();
  th.getTitle();
  th.setVideo();
  th.setHeight();
  th.checkVolume();
  th.captions.use();
  th.setProgressBar();
  th.setAutostart();
  //video ended function
  th.player[0].onended = function () {
    if (th.title === "playlist") {
      th.playlist.currentVideo++;
      title = th.playlist.getPlaylist()[th.playlist.currentVideo];
      th.poster = th.path + title + ".jpg";
      th.video = th.path + title + ".mp4";
      th.playlist.newVideo();

    }
    if (th.autostart != "mute") {
      th.stopPlayer();
    }
  }
  // Update the seek bar as the player plays
  th.player[0].ontimeupdate = function () {
    let progressBarLength = (th.player[0].currentTime / th.player[0].duration * 100);
    th.btns.progress.css("width", progressBarLength + "%")
    th.btns.time.text(th.showTime());
    console.log(th.interactive.data);
  };
  $(window).resize(function () {
    th.setProgressBar();
    th.setHeight();
  });
  th.player.bind("webkitfullscreenchange mozfullscreenchange fullscreenchange", function () {
    let state = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
    if (state === false) {
      th.setProgressBar();
    }
  });
  $(".video").click(function () {
    th.poster = th.path + this.title + ".jpg";
    th.video = th.path + this.title + ".mp4";
    if (!th.started) {
      th.holder.unbind();
      th.started = true;
      th.btnFunctions();
    }
    th.playlist.newVideo();
  });
}
