<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="keywords" content="Whiteboard Video, Animation, Explainer Video, Video Production, Web Video, online video,Website Spokesperson Video">
  <meta name="description" content="Some examples of our videos. Talking Heads® can create a Whiteboard Video, Animation, Explainer Video, Video Presentation, or Website Spokesperson Video for you.  Contact us for more information.">
  <meta name="robots" content="index, follow">
  <meta name="author" content="WebsiteTalkingHeads.com">
  <title>iVideo Examples</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <?php include("../includes/css-b4.php"); ?>
</head>

<body>
<?php include ('../includes/header_b4.php'); ?>
<section class="jumbotron">
  <div class="container">
    <form id="choose" action="index.php">
      <div class="row">
        <div class="col-4 offset-4">
          <button id="reporter" type="submit" class="btn btn-primary btn-lg dropdown-toggle btn-block" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Videos</button>
          <div class="dropdown-menu" id="change">
            <li class="dropdown-item" href="#">All</li>
            <div class="dropdown-divider"></div>
            <li class="dropdown-item" href="#">Animation</li>
            <li class="dropdown-item" href="#">Whiteboard</li>
            <li class="dropdown-item" href="#">Presentations</li>
            <li class="dropdown-item" href="#">Typography</li>
            <li class="dropdown-item" href="#">Demo</li>
            <li class="dropdown-item" href="#">Product Demonstration</li>
            <li class="dropdown-item" href="#">Spokespeople</li>
            <li class="dropdown-item" href="#">Specialty</li>
            <li class="dropdown-item" href="#">Logo</li>
            <li class="dropdown-item" href="#">Motion</li>
            <li class="dropdown-item" href="#">elearning</li>
          </div>
        </div>
      </div>
      <input name="videos" id="videos" type="hidden" value="" data-label="">
    </form>
  </div>
</section>
<section class="container-fluid bg-light py-3">
  <?php
  require( "connect-demo.php" );
  $videos = $_GET[ "videos" ];
  ?>
  <h1 class="text-center text-dark">
    <?=$videos?>
  </h1>
  <?php
  require( "connect-demo.php" );
  $keyword = array();
  if ( !$show ) {
    $show = 99;
  }
  $sql = "SELECT * FROM videos";
  switch ( $videos ) {
    case "Whiteboard":
      $sql .= " 	WHERE whiteboard=true";
      array_push( $keyword, "Whiteboard", "Whiteboard Animation", "Whiteboard Explainer", "Explainer", "Drawing", "Sketch" );
      break;
    case "Animation":
      $sql .= " 	WHERE animation=true";
      array_push( $keyword, "Animation", "Animated Video", "Animated Explainer" );
      break;
    case "Presentations":
      $sql .= " 	WHERE presentation=true";
      array_push( $keyword, "Custom Video", "Video Presentation", "Web Marketing Video", "Web Video Production", "Spokesperson Video" );
      break;
    case "Typography":
      $sql .= " 	WHERE Typography=true";
      array_push( $keyword, "Custom Video", "Video Presentation", "Example Video", "Demo Video" );
      break;
    case "Demo":
      $sql .= " 	WHERE demo=true";
      array_push( $keyword, "Custom Video", "Video Presentation", "Example Video", "Demo Video" );
      break;
    case "Product Demonstration":
      $sql .= " 	WHERE product=true";
      array_push( $keyword, "Product Demonstration", "Product Demo", "Overhead Unboxing", "Demo Video" );
      break;
    case "Spokespeople":
      $sql .= " 	WHERE spokespeople=true";
      array_push( $keyword, "Spokespeople", "Website Spokesperson", "Video Spokesperson", "Website Spokespeople", "Video Spokespeople" );
      break;
    case "Specialty":
      $sql .= " 	WHERE specialty=true";
      array_push( $keyword, "Web Video", "Animation", "Animated Video", "Motion Design", "Specialty Video" );
      break;
    case "Motion":
      $sql .= " 	WHERE motion=true";
      array_push( $keyword, "Web Video", "Motion Animation", "Animated Video", "Motion Design" );
      break;
    case "elearning":
      $sql .= " 	WHERE elearning=true";
      array_push( $keyword, "eLearning", "Training Videos", "Educational Videos", "eLearning Video" );
      break;
    case "Logo":
      $sql .= " 	WHERE logo=true";
      array_push( $keyword, "Logo Reveal", "Logo Reveal Animation", "Logo Stinger", "Corporate Logo Reveal" );
      break;
    default:
      $sql .= "";
      array_push( $keyword, "Web Video", "Online Video", "Website Video" );

  }

  if ( $rand === true ) {
    $sql .= " ORDER BY RAND()";
  } else {
    $sql .= " ORDER BY rank";
  }
  if ( $show > 0 ) {
    $sql .= " LIMIT " . $show;
  }
  $result = $conn->query( $sql );
  if ( $result->num_rows > 0 ) {
    echo PHP_EOL;
    echo '<div class="row poster-row">';
    while ( $row = $result->fetch_assoc() ) {
      $altNum = array_rand( $keyword, 1 );
      $alt = $altNum[ $keyword ];
      $name = $row[ "Name" ];
      echo '<div class="col-lg-3">';
      echo PHP_EOL;
      echo '<div class="poster" alt="' . $keyword[ $altNum ] . " Example" . '" data-toggle="modal" data-target=".bd-example-modal-lg" data-video="' . $name . '">';
      echo PHP_EOL;
      echo '<img src="https://www.websitetalkingheads.com/ivideo/videos/' . $name . '.jpg" class="img-fluid video" alt="' . $keyword[ $altNum ] . " Example" . '">';
      echo PHP_EOL;
      echo '<div class="btn-play-small"></div>';
      echo PHP_EOL;
      echo '</div>';
      echo PHP_EOL;
      echo '<div class="poster-title">' . $name . '</div>';
      echo '</div>';
      echo PHP_EOL;
      echo PHP_EOL;
    }
  } else {
    echo "0 results";
  }
  echo PHP_EOL;
  echo '</div>';
  echo PHP_EOL;

  ?>
  </div>
</section>
<?php include("../includes/footer_b4.php"); ?>
<?php include("../styles/includes/modal.php");?>
<script src="ivideo.js" async></script>
<script>
		$( "#change li" ).click( function () {
			console.log( $( this ).text() );
			$( "#reporter" ).text( $( this ).text() );
			$( "#videos" ).val( $( this ).text() );
			$( "#choose" ).submit();
		} );
		$( "#reporter" ).change( function () {
			alert( "hello" );
			$( "#choose" ).submit();
		} )
	</script>
</body>
</html>