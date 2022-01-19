console.log("Hello")
/*var j=0;
var f_count = 0;
var c_count = 0;
var r_f_count = 0;
var r_c_count = 0;
var d_c_count = 0;
var d_f_count = 0;
var id_details;
var i_details;
var card_details;
var subject_btn_count=1;
var count_if = 1;
var cards_len;*/
var cardlen;
var flag; //Confirmation Flag
function notes_add() {
  $.ajax({
    type: "POST",
    url: "http://localhost/notes/viewnotes.php",
    dataType: 'json',
    success: function (data) {
      cardlen = data.length
      for (var i = 0; i < cardlen; i++) {
          $(".con").append(`
           <div class="card" id="`+ data[i]['id'] + `">
           <div class="card-body">
           <div class="wrapper">
           </div>
           <h6 class="card-title" >Subject : `+ data[i]['Subject'] + `</h6><hr>
           <h6 class="card-subtitle">Title : `+ data[i]['Title'] + `</h6><hr>
           <div class="notes_div">
           <p class="card-text" id="card-text_`+data[i]['id']+`" onclick="zoomIn(this)">`+ data[i]['Note'] + `</p>
           </div><i class="fa fa-trash-o" id="del_`+data[i]['id']+`" onclick=DeleteNote(this)>
           </i>
           </div>
           </div>
           `)
           if((data[i]['Imp'])=="1")
           {
             $("#"+data[i]['id'] +" .wrapper").append(`
             <input type="checkbox" name="check" checked onclick=UpdateFav(this) class="star_check" id="star_`+ data[i]['id'] + `">
             <label for="star_`+ data[i]['id'] + `"></label>
             `)
           }
           else
           {
            $("#"+data[i]['id'] +" .wrapper").append(`
            <input type="checkbox" name="check"  class="star_check"  onclick=UpdateFav(this) id="star_`+ data[i]['id'] + `">
            <label for="star_`+ data[i]['id'] + `"></label>
            `)
           }
      }

    },
    error: function (request, status, error) {
      alert(error);
    }
  });

}

/*Function To Zoom The notes*/
function zoomIn(e) {
  $id = $("#"+e.id).closest(".card").attr("id")
  $("#View_Pop .modal-sub").text($("#"+$id+" .card-title").text())
  $("#View_Pop .modal-title").text($("#"+$id+" .card-subtitle").text())
  $("#View_Pop .modal-body").text($("#"+$id+" .card-text").text())
  $("#View_Pop").modal("show")
}

/*Favourite Updation Function*/ 
function UpdateFav(e) {
  if(e.checked)
  {
    cnf("add to favourite",'green',addFav,e)
  }
  else
  {
    cnf("remove from favourite",'red',removeFav,e)
  }
}



/*Confirmation Modal*/
    function cnf(content,color,yfn,e) {
      $.confirm({
          title:"Confirmation",
          type:color,
          animation: 'top',
          closeAnimation:'bottom',
          content: "Do you want to "+content,
          buttons: {
            Yes: function () {
                yfn(e)
            },
            No: 
                function () {
                  e.checked = !e.checked                
            }
        }
      });
  }

  function addFav(e)
  {
    $id = $("#"+e.id).closest(".card").attr("id")
    $.ajax({
      type:"POST",
      url:"http://localhost/notes/viewnotes_update_fav.php",
      dataType:'text',
      data:{
       id : $id,
       val : "1"
      },
      success: function(data)
      {
        alert(data)
      },
      error: function (jqXHR, exception) {
        e.checked=!e.checked
    }
    }); 
  }

  function removeFav(e)
  {
    $id = $("#"+e.id).closest(".card").attr("id")
    $.ajax({
      type:"POST",
      url:"http://localhost/notes/viewnotes_update_fav.php",
      dataType:'text',
      data:{
       id : $id,
       val : "0"
      },
      success: function(data)
      {
        alert(data)
      },
      error: function (jqXHR, exception) {
        e.checked=!e.checked
    }
    }); 
  }

/*Delete Note*/

function DeleteNote(e) { 
  cnf("Delete Note",'red',delNote,e)
}

function delNote(e) {
  $id = $("#"+e.id).closest(".card").attr("id")
  $.ajax({
    type:"POST",
    url:"http://localhost/notes/delnotes.php",
    dataType:'text',
    data:{
     id : $id,
    },
    success: function(data)
    {
      alert(data)
      $("#"+$id).remove()
    },
    error: function (jqXHR, exception) {
      alert("Not Deleted")
    }
  }); 
}

