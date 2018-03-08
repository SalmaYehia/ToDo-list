/*global $ */
"use strict";
function hidec1() {
    document.getElementById("c1").style.display = 'block';
    document.getElementById("c2").style.display = 'none';
    document.getElementById("c3").style.display = 'none';
    document.getElementById("c4").style.display = 'none';
}

function hidec2() {
    document.getElementById("c1").style.display = 'none';
    document.getElementById("c2").style.display = 'block';
    document.getElementById("c3").style.display = 'none';
    document.getElementById("c4").style.display = 'none';
}

function hidec3() {
    document.getElementById("c1").style.display = 'none';
    document.getElementById("c2").style.display = 'none';
    document.getElementById("c3").style.display = 'block';
    document.getElementById("c4").style.display = 'none';
}

function hidec4() {
   document.getElementById("c1").style.display = 'none';
    document.getElementById("c2").style.display = 'none';
    document.getElementById("c3").style.display = 'none';
    document.getElementById("c4").style.display = 'block';
}
function addone(){


   document.getElementById("add11").style.display = 'block'}

 function addonee()      {
           document.getElementById("add11").style.display = 'none'

}
function editone(){


   document.getElementById("Edit11").style.display = 'block'}

 function editonee()      {
           document.getElementById("Edit11").style.display = 'none'

}




$(document).ready(function(){
      $('table tbody tr').hover(function(){ $(this).css({"background-color":"#b2ebf2"});}
     ,function(){   $(this).css({"background-color":"#fff"});}
        );

});

BootstrapDialog.confirm({
            title: 'WARNING',
            message: 'Warning! Drop your banana?',
            type: BootstrapDialog.TYPE_WARNING, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
            closable: true, // <-- Default value is false
            draggable: true, // <-- Default value is false
            btnCancelLabel: 'Do not drop it!', // <-- Default value is 'Cancel',
            btnOKLabel: 'Drop it!', // <-- Default value is 'OK',
            btnOKClass: 'btn-warning', // <-- If you didn't specify it, dialog type will be used,
            callback: function(result) {
                // result will be true if button was click, while it will be false if users close the dialog directly.
                if(result) {
                    alert('Yup.');
                }else {
                    alert('Nope.');
                }
            }
        });
