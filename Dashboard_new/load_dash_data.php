<?php
    session_start();
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "notes";
    $user_name = $_SESSION['username'];
  
    $conn = new mysqli($servername, $username, $password, $dbname);
      // Check connection
      if ($conn->connect_error) 
      {
          die("Connection failed: " . $conn->connect_error);
      }
      else{
        $sql="SELECT * FROM main_notes where Username='$user_name'";
        if ($result=mysqli_query($conn,$sql))
        {
          $rowcount=mysqli_num_rows($result);        
          // Return the number of rows in result set
        }
        else
        {
          $rowcount="0";
        }
        $data['notes_ct'] = $rowcount;
        $sql="SELECT * FROM main_notes where Username='$user_name' AND IMP = '1'";
        if ($result=mysqli_query($conn,$sql))
        {
          $rowcount=mysqli_num_rows($result);        
          // Return the number of rows in result set
        }
        else
        {
          $rowcount="0";
        }
        $data['Imp'] = $rowcount;
        $sql="SELECT * FROM main_notes where Username='$user_name'";
        if ($result=mysqli_query($conn,$sql))
        {
          $rowcount=mysqli_num_rows($result);        
          // Return the number of rows in result set
        }
        else
        {
          $rowcount="0";
        }
        $data['Total_Subject'] = $rowcount;
        $data['user_name'] = $user_name;
        mysqli_close($conn);
        echo json_encode(
          $data
        );
    }
?>
  

