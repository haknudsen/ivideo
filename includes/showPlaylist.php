<?php
/*variables available
 $type-  type of videos
 $show-number to show
 $perRow = number of slides on row
 Video types
 Whiteboard
 Animation
 Presentation
 Typography
 Demo
 */
require( "connect-demo.php" );
$keyword = array();
if ( !$show ) {
  $show = 10;
}
if ( !$perRow ) {
  $perRow = 3;
}
switch ( $perRow ) {
  case 3:
    $col = 4;
    break;
  case 4:
    $col = 3;
    break;
  case 6:
    $col = 2;
    break;
  default:
    $col = 4;
}
$sql = "SELECT * FROM videos";
$mrss = strtolower( $type );
switch ( $type ) {
  case "Whiteboard":
    $sql .= " 	WHERE whiteboard=true";
    array_push( $keyword, "Whiteboard", "Whiteboard Animation", "Whiteboard Explainer", "Explainer", "Drawing", "Sketch" );
    break;
  case "Animation":
    $sql .= " 	WHERE animation=true";
    array_push( $keyword, "Animation", "Animated Video", "Animated Explainer" );
    break;
  case "Presentation":
    $sql .= " 	WHERE Presentation=true";
    array_push( $keyword, "Custom Video", "Video Presentation", "Web Marketing Video", "Web Video Production", "Spokesperson Presentation Video" );
    $mrss = "custom";
    break;
  case "Demo":
    $sql .= " 	WHERE demo=true";
    array_push( $keyword, "Custom Video", "Video Presentation", "Example Video", "Demo Video" );
    break;
  case "product":
    $sql .= " 	WHERE product=true";
    array_push( $keyword, "Product Demo", "Video Demonstration", "Product Demo Video", "Demo Video" );
    break;
  case "Typography":
    $sql .= " 	WHERE Typography=true";
    array_push( $keyword, "Kinetic Typography", "Typography Animation", "Motion Typography", "Typography Video", "Motion Design", "Cool Typography", "Best Typography", "Typography Motion Graphics" );
    break;
  case "elearning":
    $sql .= " 	WHERE elearning=true";
    array_push( $keyword, "eLearning", "Training Videos", "Educational Videos" );
    break;
  case "Specialty":
    $sql .= " 	WHERE specialty=true";
    array_push( $keyword, "Web Video", "Animation", "Animated Video", "Motion Design", "Specialty Video" );
    break;
  case "Logo":
    $sql .= " 	WHERE logo=true";
    array_push( $keyword, "Logo Reveal", "Logo Reveal Animation", "Logo Stinger", "Corporate Logo Reveal" );
    break;
  case "Motion":
    $sql .= " 	WHERE motion=true";
    array_push( $keyword, "Web Video", "Motion Animation", "Animated Video", "Motion Design" );
    break;
  default:
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
  echo '<div id="playlist">
			<div id="myCarousel" class="carousel slide" data-ride="carousel" data-interval="0">
				<ol class="carousel-indicators">
    ';
  $i = 0;
  while ( $i < ceil( $show / $perRow ) ) {
    echo '<li data-target="#myCarousel" data-slide-to="' . $i . '" ></li>';
    echo PHP_EOL;
    $i++;
  }
  echo '   </ol>
    <div class="carousel-inner">
	';
  $x = 1;
  $first = true;
  while ( $row = $result->fetch_assoc() ) {
    $altNum = array_rand( $keyword, 1 );
    $alt = $altNum[ $keyword ];
    $name = $row[ "Name" ];
    $description = $row[ "description" ];
    if ( strlen( $name ) > 18 ) {
      $lastSpace = strrpos( $name, ' ' );
      $shortName = trim( substr( $name, 0, $lastSpace ) );
    } else {
      $shortName = $name;
    }
    if ( $x === 1 ) {
      echo '<div class="carousel-item py-2">
						<div class="row">
    ';
    }
    if ( $first === true ) {
      $id = 'id="first" ';
      $first = false;
    } else {
      $id = '';
    }
    echo '
    <div class="col-sm-' . $col . '" data="' . $x . '"><img class="img-fluid video" src="https://www.websitetalkingheads.com/ivideo/videos/640/' . $name . '.jpg" alt="' . $keyword[ $altNum ] . '" data-video="' . $name . '" ' . $id . '></div>
  ';
    if ( $x < $perRow ) {
    $x++;
    }else{
      echo '
    </div>
          </div>';
        $x = 1;
    }
  }
    if( $x !== $perRow){
        echo('
                </div>');
    }
} else {
  echo "0 results";
}
echo '
    </div>
    </div>
      <a class="carousel-control-prev" href="#myCarousel" data-slide="prev">
        <svg width="2rem" height="2rem" aria-hidden="true" focusable="false" data-prefix="fal" data-icon="chevron-circle-left" class="svg-inline--fa fa-chevron-circle-left fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M504 256C504 119 393 8 256 8S8 119 8 256s111 248 248 248 248-111 248-248zM256 472c-118.7 0-216-96.1-216-216 0-118.7 96.1-216 216-216 118.7 0 216 96.1 216 216 0 118.7-96.1 216-216 216zm-86.6-224.5l115.1-115c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L209 256l99.5 99.5c4.7 4.7 4.7 12.3 0 17l-7.1 7.1c-4.7 4.7-12.3 4.7-17 0l-115.1-115c-4.6-4.8-4.6-12.4.1-17.1z"></path></svg>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#myCarousel" data-slide="next">
        <svg width="2rem" height="2rem" aria-hidden="true" focusable="false" data-prefix="fal" data-icon="chevron-circle-right" class="svg-inline--fa fa-chevron-circle-right fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M8 256c0 137 111 248 248 248s248-111 248-248S393 8 256 8 8 119 8 256zM256 40c118.7 0 216 96.1 216 216 0 118.7-96.1 216-216 216-118.7 0-216-96.1-216-216 0-118.7 96.1-216 216-216zm86.6 224.5l-115.1 115c-4.7 4.7-12.3 4.7-17 0l-7.1-7.1c-4.7-4.7-4.7-12.3 0-17L303 256l-99.5-99.5c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0l115.1 115c4.6 4.8 4.6 12.4-.1 17.1z"></path></svg>
        <span class="sr-only">Next</span>
      </a>
  </div>
</div>';
?>