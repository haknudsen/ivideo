<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Talking Heads Video</title>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<meta http-equiv="x-ua-compatible" content="ie=edge">
<meta name="description"  content="Video Player for Talking Heads">
<!--CSS-->
<link href="css/style.css" rel="stylesheet" type="text/css">
</head>
<!--<body oncontextmenu="return false;">-->
<body>
  <div id="player-holder">
    <video id="talking-head-player" preload playsinline width="100%">
      <p>Your browser does not support the video tag. Please Visit <a href="https://www.websitetalkingheads.com/support/" title="Please Visit Support"> https://www.websitetalkingheads.com/support/ </a> </p>
    </video>
    <div id="bigPlayBtn"></div>
    <div id="controls">
      <div id="btn-restart" class="player-btn btn-restart" title="replay" accesskey="R"></div>
      <div id="btn-play-toggle" class="player-btn btn-play" title="play" accesskey="P"></div>
      <div id="btn-stop" class="player-btn btn-stop" title="stop" accesskey="X"></div>
      <input type="range" id="volume-bar" title="volume" min="0" max="1" step="0.01" value="1">
      <div id="btn-mute" class="player-btn btn-unmute" title="mute"></div>
      <div id="time" title="time">0:00/0:00</div>
      <div class="progress" id="progress-bar" title="duration">
        <div id="progress" class="progress-bar progress-bar-striped" title="current time"></div>
      </div>
      <div id="btn-bookmark" class="player-btn btn-bookmark" title="bookmark" accesskey="B"></div>
      <div id="btn-captions" class="player-btn btn-captions" title="toggle captions" accesskey="C"></div>
      <div id="btn-fullscreen" class="player-btn btn-fullscreen-enter" title="toggle full screen" accesskey="T"></div>
    </div>
  </div>
  <div id="videoModal" class="modal fade" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Modal title</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button>
        </div>
        <div class="modal-body">
          <p id="modal-message" class="text-capitalize">Restart Course or go to bookmark</p>
        </div>
        <div class="modal-footer">
          <button id="btn-yes" type="button" class="btn btn-primary">Save changes</button>
          <button id="btn-no" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
  <!--Java Script--> 
  <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script> 
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script> 
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script> 
  <script src="player.js"></script>
  <?php
  $video = $_GET[ "video" ];
  $autostart = $_GET[ "autostart" ];
  $controls = $_GET[ "controls" ];
  $captions = $_GET[ "captions" ];
  $actor = $_GET[ "actor" ];
  $color = $_GET[ "color" ];
  if ( empty( $autostart ) ) {
    $autostart = false;
  }
  if ( empty( $controls ) ) {
    $controls = false;
  }
  if ( empty( $captions ) ) {
    $captions = false;
  }
  if ( empty( $actor ) ) {
    $actor = false;
  }
  if ( empty( $color ) ) {
    $color = false;
  }
  ?>
  <script>
		$( document ).ready( function () {
			createTalkingHead( "<?=$video?>","<?=$autostart?>","<?=$controls?>","<?=$captions?>","<?=$color?>","<?=$actor?>" );
		} );
	</script>
</body>
</html>