
<?php include 'includes/connection.php';?>
<?php
session_start();
if (isset($_POST['signup'])) {
require "gump.class.php";
$gump = new GUMP();
$_POST = $gump->sanitize($_POST); 

$gump->validation_rules(array(
  'username'    => 'required|alpha_numeric|max_len,20|min_len,4',
  'name'        => 'required|alpha_space|max_len,30|min_len,5',
  'email'       => 'required|valid_email',
  'password'    => 'required|max_len,50|min_len,6',
));
$gump->filter_rules(array(
  'username' => 'trim|sanitize_string',
  'name'     => 'trim|sanitize_string',
  'password' => 'trim',
  'email'    => 'trim|sanitize_email',
  ));
$validated_data = $gump->run($_POST);

if($validated_data === false) {
  ?>
  <center><font color="red" > <?php echo $gump->get_readable_errors(true); ?> </font></center>
  <?php
}
else if ($_POST['password'] !== $_POST['repassword']) 
{
  echo  "<center><font color='red'>Passwords do not match </font></center>";
}
else {
      $username = $validated_data['username'];
      $checkusername = "SELECT * FROM users WHERE username = '$username'";
      $run_check = mysqli_query($conn , $checkusername) or die(mysqli_error($conn));
      $countusername = mysqli_num_rows($run_check); 
      if ($countusername > 0 ) {
    echo  "<center><font color='red'>Username is already taken! try a different one</font></center>";
}
$email = $validated_data['email'];
$checkemail = "SELECT * FROM users WHERE email = '$email'";
      $run_check = mysqli_query($conn , $checkemail) or die(mysqli_error($conn));
      $countemail = mysqli_num_rows($run_check); 
      if ($countemail > 0 ) {
    echo  "<center><font color='red'>Email is already taken! try a different one</font></center>";
}

  else {
      $name = $validated_data['name'];
      $email = $validated_data['email'];
      $pass = $validated_data['password'];
      $password = password_hash("$pass" , PASSWORD_DEFAULT);
      $course = $_POST['course'];
      $gender = $_POST['gender'];
      $joindate = date("F j, Y");
      $query = "INSERT INTO users(username,name,email,password,course,gender,joindate,token) VALUES ('$username' , '$name' , '$email', '$password', '$course', '$gender' , '$joindate' , '' )";
      $result = mysqli_query($conn , $query) or die(mysqli_error($conn));
      if (mysqli_affected_rows($conn) > 0) { 
        echo "<script>alert('SUCCESSFULLY REGISTERED');
        window.location.href='index.php';</script>";
}
else {
  echo "<script>alert('Error Occured');</script>";
}
}
}
}

if (isset($_POST['login'])) {
	$username  = $_POST['user'];
	$password = $_POST['pass'];
	mysqli_real_escape_string($conn, $username);
	mysqli_real_escape_string($conn, $password);
  $query = "SELECT * FROM users WHERE username = '$username'";
  $result = mysqli_query($conn , $query) or die (mysqli_error($conn));
  if (mysqli_num_rows($result) > 0) {
	while ($row = mysqli_fetch_array($result)) {
	  $id = $row['id'];
	  $user = $row['username'];
	  $pass = $row['password'];
	  $name = $row['name'];
	  $email = $row['email'];
	  $course = $row['course'];
	  if (password_verify($password, $pass )) {
		$_SESSION['id'] = $id;
		$_SESSION['username'] = $user;
		$_SESSION['name'] = $name;
		$_SESSION['email']  = $email;
		$_SESSION['course'] = $course;
		header('location: ../Loading');
		
	  }
	  else {
		echo "<script>alert('invalid username/password');
		window.location.href= 'index.php';</script>";
  
	  }
	}
  }
  else {
		echo "<script>alert('invalid username/password');
		window.location.href= 'index.php';</script>";
  
	  }
  }
?>

<html lang="en">
<head>
	<title>Login</title>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
	<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
	<script src="https://kit.fontawesome.com/a076d05399.js"></script>
	<link href="assets/img/favicon.png" rel="icon">
	<link rel="stylesheet" type="text/css" href="login.css">
</head>
<body>
<div class="home_btn">
  <input type="checkbox" id="check" style="display:none;" onchange='window.open("../Home/Home.php", "_self")'>
  <label for="check" class="checkbtn">
  <i class="fas fa-home" style="font-size:25px;color:black;"></i> </label>
  </div>

<div class="container_new" id="container_new">
	<div class="form-container_new sign-up-container_new">
	<div class = "container mt-3">
	<h1>Create Account</h1>	
	<div class = "container mt-3">
                <div   class = "container md">
					<form id="signup_form" method="POST">
						<div   class = "container mt-3">
						<div   class = "form-group row">
						<label for   = "name" class = "col-5 col-form-label">Name</label>
						<div   class = "col-sm-7">
								<input type  = "text" class      = "form-control" id = "InputName" placeholder = "First and last name" name="name" required>
						</div>
						</div>

						<div   class = "form-group row">
						<label for   = "email" class = "col-5 col-form-label">Email</label>
						<div   class = "col-sm-7">
						<input type  = "email" class = "form-control" id = "exampleInputEmail1" placeholder = "example@domain.com" name="email" required>
						  </div>
						</div>

						<div   class = "form-group row">
						<label for   = "username" class = "col-5 col-form-label">Create a username</label>
						<div   class = "col-sm-7">
						<input type  = "text" class = "form-control" id = "username" placeholder = "username" name="username" required>
						  </div>
						</div>

						<div   class = "form-group row">
						  <label for   = "password" class = "col-5 col-form-label">Create a password</label>
							  <div   class = "col-sm-7">
								  <input type  = "password" class      = "form-control" id = "ph_num" placeholder = "Password" name="password" required>
							  </div>
						  </div>

						  <div   class = "form-group row">
						  <label for   = "password" class = "col-5 col-form-label">Confirm your password</label>
							  <div   class = "col-sm-7">
								  <input type  = "password" class      = "form-control" id = "ph_num" placeholder = "Password" name="repassword" required>
							  </div>
						  </div>


						  <div   class = "form-group row">
						  <label for   = "gender" class = "col-5 col-form-label">Gender</label>
							  <div   class = "col-sm-7">
							  <select class="form-control" name="gender"required>
           						 <option value="Male">Male</option>
            					 <option value="Female">Female</option>
            					 </select>
							  </div>
						  </div>
									 
						   <div   class = "form-group row">
						  <label for   = "course" class = "col-5 col-form-label">I Study..</label>
							  <div   class = "col-sm-7">
							  <select class="form-control" name="course"required>
           							 <option value="Computer Science">Computer Sc Engineering</option>
            						 <option value="Electrical">Electrical Engineering</option>
            					     <option value="Mechanical">Mechanical Engineering</option>
            				  </select>
							  </div>
						  </div>

						<div   class = "container mt-4">
						  <div class="text-center">
							<button type="button" class="btn btn-primary btn-sm">Cancel</button>
							<input  class="btn btn-primary btn-sm" name="signup" tabindex="5" value="Sign me up!" type="submit">                  
						  </div>
						</div>
					  </div>
					</div>
					</form>
              </div>
	</div>
	</div>
	<div class="form-container_new sign-in-container_new">
		<form id="sign_form"method="POST">
			<h1>Sign in</h1>
			<span>or use your account</span>
			<input type="text" name="user" placeholder="Username" />
			<input type="password" name="pass" placeholder="Password" />
			<a href="#">Forgot your password?</a>
			<button type="submit" name="login" class="login login-submit" >Sign In</button>
		</form>
	</div>
	<div class="overlay-container_new">
		<div class="overlay">
			<div class="overlay-panel overlay-left">
				<h1>Welcome Back!</h1>
				<p>To keep connected with us please login with your personal info</p>
				<button class="ghost" id="signIn">Sign In</button>
			</div>
			<div class="overlay-panel overlay-right">
				<h1>Hello, Friend!</h1>
				<p>Enter your personal details and start journey with us</p>
				<button class="ghost" id="signUp">Sign Up</button>
			</div>
		</div>
	</div>
</div>


	
<!--===============================================================================================-->
	<script src="login.js"></script>

</body>
</html>