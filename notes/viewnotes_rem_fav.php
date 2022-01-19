<?php

    session_start();
    $Subject = $_POST['Subject'];
    $Title = $_POST['Title'];
    $Notes = $_POST['Notes'];
    $main_notes = array();
    $i = 0;
    $user_name =  $_SESSION['username'];
    $conn = mysqli_connect("localhost","root","","notes" ) or die ("error" . mysqli_error($conn));
    // Check connection
      if ($conn->connect_error) 
      {
          die("Connection failed: " . $conn->connect_error);
      }
      else
      {
         $sql = "Update main_notes SET IMP = '0' where Username = '$user_name' AND Title = '$Title' AND Subject like '$Subject' AND Notes = '$Notes'";
        if ($conn->query($sql) === TRUE)
        {
                  echo "Successful Registration";
        } 
        else
        {
                  echo "Try Again Later";
        }
    }

?>
