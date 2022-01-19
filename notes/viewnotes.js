var j=0;
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
var cards_len;
function notes_add()
{
    $.ajax({
        type:"POST",
        url:"http://localhost/notes/viewnotes.php",
        dataType:'json',
        data:{
          
        },
        success: function(data)
        {
           
          cards_len = data.length
          for(var i =0 ; i<data.length;i++)
          {
            // console.log("Subject : " + String(data[i]['Subject']));
            var card = document.createElement('div');
            card.className="card";
            card.id="card "+i;
            document.getElementsByClassName('con')[0].appendChild(card);
            
           
            var cardbody = document.createElement('div');
            cardbody.className="card-body";
            card.appendChild(cardbody);
            
            var wrapper = document.createElement('div');
            wrapper.className="wrapper";
            cardbody.appendChild(wrapper);

            var checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = "st "+i;    
            checkbox.name="check";
            checkbox.className="star_check";
            if((data[i]['Imp'])=="1")
            {
                checkbox.checked=true;
            }
            
            wrapper.appendChild(checkbox);

            var label = document.createElement('label')
            label.htmlFor = 'st '+i;
            wrapper.appendChild(label);


            var cardtitle= document.createElement('h6');
            cardtitle.className="card-title";
            cardbody.appendChild(cardtitle);
            cardtitle.innerHTML="Subject : " + String(data[i]['Subject']);            

            var hr = document.createElement('hr');
            cardbody.appendChild(hr);


            var cardsubtitle= document.createElement('h6');
            cardsubtitle.className="card-subtitle";
            cardbody.appendChild(cardsubtitle);
            cardsubtitle.innerHTML="Title : "+data[i]['Title']

          
           
            var hr = document.createElement('hr');
            cardbody.appendChild(hr);
            
            var note_div = document.createElement('div')
            note_div.className="notes_div"
            cardbody.appendChild(note_div);

            var p = document.createElement('p');
            p.className="card-text";
            p.id = "card-text "  + i;
            note_div.appendChild(p);
            p.innerHTML= data[i]['Note'];
            
            var i_el = document.createElement('i');
            i_el.className="fa fa-trash-o";
            i_el.id = "i "+i;    
            cardbody.appendChild(i_el);
            
          }
        var notes_space = document.getElementsByClassName('card-text');
        for(j=0;j<notes_space.length;j++)
        {
          notes_space[j].addEventListener('click',function()
          {
            card_details = this.id;
            card_details = card_details.split(' ')[1];
            document.getElementsByClassName('modal-title')[0].innerHTML=document.getElementById('card ' + card_details).getElementsByClassName('card-title')[0].innerHTML
            document.getElementsByClassName('modal-title')[1].innerHTML=document.getElementById('card ' + card_details).getElementsByClassName('card-subtitle')[0].innerHTML
            document.getElementsByClassName('modal-body')[0].innerHTML=document.getElementById('card ' + card_details).getElementsByClassName('card-text')[0].innerHTML
            $('#View_Pop').modal('show');
          })
        }
        var checkboxes = document.getElementsByClassName("star_check");
         for(i=0;i<checkboxes.length;i++)
          {
            checkboxes[i].addEventListener('click', function()
            {
            id_details=this.id;
            id_details = id_details.split(' ')[1];
             if(this.checked)
             {
               f_count = 0;
               c_count=0;
               $('#fav').modal('show');
               document.getElementById("fav").getElementsByClassName("btn")[1].addEventListener('click' , function()
               {
                if(f_count == 0)
                {
                 $.ajax({
                  type:"POST",
                  url:"http://localhost/notes/viewnotes_add_fav.php",
                  dataType:'text',
                  data:{
                    Subject  : document.getElementById('card ' + id_details).getElementsByClassName('card-title')[0].innerHTML.substring(document.getElementById('card ' + id_details).getElementsByClassName('card-title')[0].innerHTML.lastIndexOf(':')+2),
                    Title : document.getElementById('card ' + id_details).getElementsByClassName('card-subtitle')[0].innerHTML.substring(document.getElementById('card ' + id_details).getElementsByClassName('card-subtitle')[0].innerHTML.lastIndexOf(':')+2),
                    Notes : document.getElementById('card ' + id_details).getElementsByClassName('card-text')[0].innerHTML
                  },
                  success: function(data)
                  {

                  }
                }); 
                $('#fav').modal('hide');
                f_count++;
                }
                },false);
                document.getElementById("fav").getElementsByClassName("btn")[0].addEventListener('click' , function()
                {
                  if(c_count==0)
                  {
                    console.log('Cancel'+ id_details);
                    $('#fav').modal('hide');
                    c_count++;
                    document.getElementById('st ' +id_details).checked=false;
                  }
                },false);
              }
             else{
               /* Remove Favourite Model */
              $('#rem_fav').modal('show');
              f_count = 0;
              c_count=0;
              document.getElementById("rem_fav").getElementsByClassName("btn")[1].addEventListener('click' , function()
              {
                if(r_f_count == 0)
                {
                  $.ajax({
                    type:"POST",
                    url:"http://localhost/notes/viewnotes_rem_fav.php",
                    dataType:'text',
                    data:{
                      Subject  : document.getElementById('card ' + id_details).getElementsByClassName('card-title')[0].innerHTML.substring(document.getElementById('card ' + id_details).getElementsByClassName('card-title')[0].innerHTML.lastIndexOf(':')+2),
                      Title : document.getElementById('card ' + id_details).getElementsByClassName('card-subtitle')[0].innerHTML.substring(document.getElementById('card ' + id_details).getElementsByClassName('card-subtitle')[0].innerHTML.lastIndexOf(':')+2),
                      Notes : document.getElementById('card ' + id_details).getElementsByClassName('card-text')[0].innerHTML
                    },
                    success: function(data)
                    {
                         /*  document.getElementsByClassName('message')[0].style.display="block";
/*                           $('.message').toggleClass('comein');
                          $('.check').toggleClass('scaledown');
                          document.body.scrollTop = 0; */

                    }
                  }); 
                $('#rem_fav').modal('hide');
                r_f_count++;
                }
              },false);
              document.getElementById("rem_fav").getElementsByClassName("btn")[0].addEventListener('click' , function()
                {
                  if(r_c_count==0)
                  {
                    console.log('Cancel'+ id_details);
                    $('#fav').modal('hide');
                    r_c_count++;
                    document.getElementById('st '+id_details).checked=true;
                  }
                },false);
            }
            },false);
          }
        },
        error: function (request, status, error) {
          alert(error);
      }
        });  
        
}

function removeElement(elementId) {
  // Removes an element from the document
  var element = document.getElementById(elementId);
  element.parentNode.removeChild(element);
}

/*Favourite */
function dis_fav()
{
  for(i=0;i<cards_len;i++)
  {
    if(document.getElementById("st "+i).checked==false)
    {
      document.getElementById('card '+i).classList.add('hide');
    }
  }
}
function all_show()
{
  for(i=0;i<cards_len;i++)
  {
    removeElement("card "+i)
  }
  notes_add();
}

function subject_opt()
{
  subject_btn_count++;
  if(subject_btn_count%2==0)
  {
    document.getElementsByClassName("check_filter_1")[0].checked=true;
  }
  else{
    document.getElementsByClassName('check_filter_1')[0].checked=false;
  }
}
function dis_sub(str)
{
  console.log('Hello'); 
  for(i=0;i<10;i++){
  var n = (document.getElementsByClassName('card')[i].getElementsByClassName('card-title')[0].innerHTML).includes(str.id);
  if(!n)
  {
    document.getElementById('card '+i).classList.add('hide');
  }
  else
  {
    document.getElementById('card '+i).classList.remove('hide');

  }  
}
}
document.getElementsByClassName('check_filter')[0].addEventListener('click',function()
{
  if(count_if!=1){
  if(!document.getElementsByClassName('check_filter')[0].checked)
  {
    document.getElementsByClassName('check_filter_1')[0].checked=false;
    count_if=1;
  }
  else{

  }
}
else
{
  count_if++;
}
},false);

