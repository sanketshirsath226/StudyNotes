console.log('Notes');
var count=0;
var alert_box = document.getElementsByClassName("alert");
alert_box[0].style.display="none";
  alert_box[1].style.display="none";
function load_sel()
{
    $.ajax({
    type:"POST",
    url:"http://localhost/notes/load_sel.php",
    dataType:'json',
    success: function(data)
    {
        if(count==0)
        {

            sel_opt = document.getElementById('sel_list');
            for (var val of data)
            {
            var option = document.createElement("option");
            option.value = val;
            option.text = val.toUpperCase();
            sel_opt.appendChild(option); 
            }
        }
    }
    });
   
}
document.getElementById("addBtn").addEventListener("click", function()
{
  alert_box[0].style.display="none";
  alert_box[1].style.display="none";
  console.log('Button Function');
  let addTxt = document.getElementById("addTxt");
  let addTitle = document.getElementById("addTitle");
  let sub_Title = document.getElementById("sel_list");
  
  if(sub_Title.value=="Choose Subject")
  {
    alert_box[1].style.display="block";
    alert_box[1].innerHTML="Please Select Subject";
  }
  else if(addTitle.value==""){
    alert_box[1].style.display="block";
    alert_box[1].innerHTML="Please Enter Title";
  }
  else if(addTxt.value==""){
    alert_box[1].style.display="block";
    alert_box[1].innerHTML="Please Enter Data in Notes";
  }
  else
  {
    document.getElementsByClassName("modal-body")[0].innerHTML= "Do you want to add " + "<b>" + (addTitle.value).toUpperCase() + "</b>" + " to subject " +"<b>" + sub_Title.value + "</b>";
    $('#myModal').modal('show');
  }
});
function add_notes()
{
  $('#myModal').modal('hide')
    let addTxt = document.getElementById("addTxt");
  let addTitle = document.getElementById("addTitle");
  let sub_Title = document.getElementById("sel_list");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let myObj = {
    title: addTitle.value,
    text: addTxt.value,
    subject : sub_Title.value
  }
  notesObj.push(myObj);
  $.ajax({
    type:"POST",
    url:"http://localhost/notes/note_add.php",
    dataType:'text',
    data:{
        title: addTitle.value,
        text: addTxt.value,
        subject : sub_Title.value
    },
    success: function(data)
    {
      alert_box[0].style.display="block";
      alert_box[0].innerHTML=data;
      addTitle.value="";
      sub_Title.value="Choose Subject";
      addTxt.value="";
      setTimeout (function()
      {
        alert_box[0].style.display="none";
      },2000)
    },
    error: function (request, status, error) {
      alert(error);
  }
    });  
}


