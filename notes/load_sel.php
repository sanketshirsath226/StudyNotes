<?php 
  session_start();

 $conn = mysqli_connect("localhost","root","","notes" ) or die ("error" . mysqli_error($conn));
 $query = "SELECT * FROM subject";
 $result = mysqli_query($conn , $query) or die (mysqli_error($conn));
 if (mysqli_num_rows($result) > 0) {
   while ($row = mysqli_fetch_array($result)) {
    $sub[] = strval($row['Sub1']);
    $sub[] = strval($row['Sub2']);
    $sub[] = strval($row['Sub3']);
    $sub[] = strval($row['Sub4']);
    $sub[] = strval($row['Sub5']);
 }
}
 echo json_encode(
    $sub
  )
?>