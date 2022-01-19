<?php 
  session_start();
  $main_notes = array();
  $i = 0;
  $user_name = $_SESSION['username'];
  $conn = mysqli_connect("localhost","root","","notes" ) or die ("error" . mysqli_error($conn));
 $query = "SELECT * FROM main_notes where Username= '$user_name'";

 $result = mysqli_query($conn , $query) or die (mysqli_error($conn));
 if (mysqli_num_rows($result) > 0) {
   while ($row = mysqli_fetch_array($result))
    {
            
            $main_notes[$i]['Subject']= strval($row['Subjects']);
            $main_notes[$i]['Title']=strval($row['Title']);
            $main_notes[$i]['Note']=strval($row['Notes']);
            $main_notes[$i]['USERNAME']=$user_name;
            $main_notes[$i]['Imp']=strval($row['IMP']);
            $i= $i+1;
    }
}
echo json_encode(
    $main_notes
  )
?>  