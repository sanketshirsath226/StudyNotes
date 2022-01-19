<?php
    if(isset($_POST["id"]))
    {
        session_start();
        $id = $_POST["id"];
        $val = $_POST["val"];
        $user_name =  $_SESSION['username'];
        $conn = mysqli_connect("localhost","root","","notes" ) or die ("error" . mysqli_error($conn));
        // Check connection
          if ($conn->connect_error) 
          {
              die("Connection failed: " . $conn->connect_error);
          }
          else
          {
             $sql = "UPDATE `main_notes` SET `IMP`='$val' WHERE Username='$user_name' and ID=$id";
            if ($conn->query($sql) === TRUE)
            {
                      echo "Successful Updated";
            } 
            else
            {
                      echo "Try Again Later";
            }
        }
    }
   

?>
