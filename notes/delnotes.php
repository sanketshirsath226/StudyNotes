<?php

    if(isset($_POST["id"]))
    {
        session_start();
        $id = $_POST["id"];
        $user_name =  $_SESSION['username'];
        $conn = mysqli_connect("localhost","root","","notes" ) or die ("error" . mysqli_error($conn));
        // Check connection
          if ($conn->connect_error) 
          {
              die("Connection failed: " . $conn->connect_error);
          }
          else
          {
            $sql = "DELETE FROM `main_notes` where Username = '$user_name' AND ID=$id";
            if ($conn->query($sql) === TRUE)
            {
                      echo "Successful Deleted";
            } 
            else
            {
                      echo "Try Again Later";
            }
        }
    }
   

?>
