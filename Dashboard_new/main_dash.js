// var user_name="saru123";
function load_data()
{

    $.ajax({
        type:"POST",
        url:"http://localhost/Dashboard_new/load_dash_data.php",
        dataType:'json',
        data:{},
        success: function(data)
        {

         document.getElementById('Total_Notes').innerHTML=data['notes_ct'];
         document.getElementById('total_Subjects').innerHTML=data['Total_Subject'];
         document.getElementById('imp_notes').innerHTML=data['Imp'];
         document.getElementById('profile_name').innerHTML=data['user_name'];
        console.log(data['user_name']);
        },
        error: function (request, status, error) {
          alert(error);
      }
    });  
}