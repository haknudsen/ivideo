<?php
error_reporting( 2 );
//session_start();
$servername = "vdb1a.pair.com";
$username = "working_54_r";
$password = "CuNau25q";
$dbname = "working_videos";
// Create connection
$conn = mysqli_connect( $servername, $username, $password );
// Check connection
if ( !$conn ) {
    die( "Connection failed: " . mysqli_connect_error() );
    echo( "Connection failed: " . mysqli_connect_error() );
    echo "<br>";
}else{
    //echo "<br>Connected<br>";
}
$db = mysqli_select_db( $conn, $dbname );

if ( !$db ) {
    die( "Connection failed: " . mysqli_connect_error() );
    echo "<br>";
}
?>