<?php
    session_start();
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "notes";
    $title = $_POST['title'];
    $text = $_POST['text'];
    $Subject = $_POST['subject'];
    $user_name = $_SESSION['username'];
    
    $conn = new mysqli($servername, $username, $password, $dbname);
      // Check connection
      if ($conn->connect_error) 
      {
          die("Connection failed: " . $conn->connect_error);
      }
      else{
         $sql = "INSERT INTO  main_notes (Username,Subjects,Title,Notes) VALUES ('$user_name','$Subject', '$title' , '$text')";
        if ($conn->query($sql) === TRUE) {
                  echo "Successful Registration";
        } else {
                  echo "Error Sql 2";
        }
          }
   ?>
  

