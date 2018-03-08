function draw_or_not() {
  if (all_tasks.first == true) {
    all_tasks.first = false;
    //alert("sigfioweifo");
    all_tasks.drawtable("All Tasks");
      all_tasks.count_all();
  }
}
var all_tasks = {
    counter_all: 0,
    counter_in:0,
    counter_c:0,
    counter_ar:0,
    tasks:[],
    current_table:[],
    status:"All Tasks",
    sorting_all:"Name",
    sorting_in:"Name",
    sorting_ar:"Name",
    sorting_c:"Name",
    edited:" " ,
    n_checked:0,
    first:true,
  //1 inprogress , 2 archieved , 3 completed
  update_tasks: function() {
    //all_tasks.first = false;
    $.get("list", function(data){
        all_tasks.tasks = data;
    });

  },
  update_counters: function() {
    //alert("counttttttttttt");
    //all_tasks.first = false;
    $.get("update_counters", function(data){
      //alert(data);
      all_tasks.counter_all = data[0];
        all_tasks.counter_in = data[1];
        all_tasks.counter_ar = data[2];
        all_tasks.counter_c = data[3];
    });

  },
  send_tasks: function() {
    //from client to server
    if (all_tasks.tasks.length != 0) {
      $.ajax({
                 url: 'http://localhost:8888/update_tasks',
                 type: 'GET',
                 data: {
                   task:all_tasks.tasks,
                 },
      });
    }
    else {
      $.ajax({
                 url: 'http://localhost:8888/list_zero',
                 type: 'GET'
      });
    }



  },send_counters: function() {
    //from client to server

    $.ajax({
               url: 'http://localhost:8888/count_all',
               type: 'GET',
               data: {
                 all: all_tasks.counter_all,
                   in: all_tasks.counter_in,
                   c:all_tasks.counter_c,
                   ar:all_tasks.counter_ar
               },
               success: function(data){
                  // console.log(data);
               }
    });

  },

  add_task: function(){
    var  newname = document.getElementById('newname').value;
    if (!newname.trim()){
      return;
    }
    var newtask = document.getElementById('newtask').value;
    var datepicker = document.getElementById('datepicker').value;
    if (!datepicker.trim()){
      //datepicker= get the date of the day
    }
    if(this.status=="All Tasks"){
      var new_task = {id:all_tasks.counter_all, name:newname, desc:newtask, date:datepicker , status:"In progress"};
    }
    else{
      var new_task = {id:all_tasks.counter_all, name:newname, desc:newtask, date:datepicker , status:this.status};
    }
      all_tasks.tasks.push(new_task);
      document.getElementById('newname').value="";
      document.getElementById('newtask').value="";
      document.getElementById('datepicker').value="";

      all_tasks.counter_all++;
      if(this.status=="All Tasks"){
        all_tasks.counter_in++;
      }
      else if(this.status=="In progress"){
        all_tasks.counter_in++;
      }
      else if(this.status=="Completed Tasks"){
        all_tasks.counter_c++;
      }
      else if(this.status=="Archived"){
        all_tasks.counter_ar++;
      }

      all_tasks.count_all();

      all_tasks.drawtable(this.status);

      addonee();////to make the dialog invisible
},

  drawtable: function(status){
    //sorting
    if (all_tasks.first == true) {
      //alert("welcome");
      all_tasks.update_tasks();
      all_tasks.update_counters();
      document.getElementById('bad1').innerHTML=all_tasks.counter_all;
      document.getElementById('bad2').innerHTML=all_tasks.counter_in;
      document.getElementById('bad3').innerHTML=all_tasks.counter_c;
      document.getElementById('bad4').innerHTML=all_tasks.counter_ar;

    }
    else {
      all_tasks.send_tasks();
      all_tasks.send_counters();

    }
    all_tasks.elected=[];
    if(status=="All Tasks"){all_tasks.sort(all_tasks.sorting_all);}
    else if(status=="In progress"){all_tasks.sort(all_tasks.sorting_in);}
    else if(status=="Completed Tasks"){all_tasks.sort(all_tasks.sorting_c);}
    else if(status=="Archived"){all_tasks.sort(all_tasks.sorting_ar);}

    this.current_table=[];
    this.status = status;
    var table = document.getElementById("All");
    var body = document.getElementById("table_body");
    var i;
      document.getElementById("title").innerHTML = status;
      body.innerHTML="";
      for (i=0 ; i < all_tasks.tasks.length ; i++) {
          if(this.status!="All Tasks"){
            if(this.status!=this.tasks[i].status){continue;}
          }
          this.current_table.push(i);
          if(this.tasks[i].status=="In progress"){
            body.innerHTML += "<tr id='divbutton'><td <span title ="+all_tasks.tasks[i].desc+"></span><div class='checkbox'>"+
            "<label><input onClick='all_tasks.checkboxes(this)' id='ch"+i+"' type='checkbox'"+
            "value=''>"+all_tasks.tasks[i].name+"</label></div></td>"+
            "<td>"+all_tasks.tasks[i].date+"</td><td><div class='dropdown'><button class='btn btn-primary dropdown-toggle'"+
            " type='button' id='button1'  style='display: none;' data-toggle='dropdown'><span class='caret'</span></button><ul id='list' class='dropdown-menu'>"+
            "<li ><a onClick='all_tasks.archived(this);return false' href='#'>Archive</a></li>"+
            "<li ><a onClick='all_tasks.show_edit(this);return false' href='#'>Edit Task</a></li>"+
            "<li ><a onClick='all_tasks.delete_task(this);return false' href='#'>Delete Task</a></li>"+
            "<li ><a onClick='all_tasks.mark_done(this);return false' href='#'>Mark as Done</a></li>"+
            "</ul></div></td></tr>";
          }
          else if(this.tasks[i].status=="Completed Tasks" && this.status=="All Tasks"){
            var str_name = all_tasks.tasks[i].name.strike();
            var str_date = all_tasks.tasks[i].date.strike();
            body.innerHTML += "<tr  id='divbutton'><td <span title ="+all_tasks.tasks[i].desc+"></span><div class='checkbox'>"+
            "<label><input onClick='all_tasks.checkboxes(this)'  id='ch"+i+"' type='checkbox'"+
            "value=''>"+str_name+"</label></div></td>"+
            "<td>"+str_date+"</td><td><div class='dropdown'><button class='btn btn-primary dropdown-toggle'"+
            " type='button'id='button1'  style='display: none;' data-toggle='dropdown'><span class='caret'</span></button><ul id='list' class='dropdown-menu'>"+
            "<li ><a onClick='all_tasks.archived(this);return false' href='#'>Archive</a></li>"+
            "<li ><a  onClick='all_tasks.show_edit(this);return false' href='#'>Edit Task</a></li>"+
            "<li ><a onClick='all_tasks.delete_task(this);return false' href='#'>Delete Task</a></li>"+
              "</ul></div></td></tr>";
          }
          else if(this.tasks[i].status=="Completed Tasks"){
            body.innerHTML += "<tr  id='divbutton'><td <span title ="+all_tasks.tasks[i].desc+"></span><div class='checkbox'>"+
            "<label><input onClick='all_tasks.checkboxes(this)'  id='ch"+i+"' type='checkbox'"+
            "value=''>"+all_tasks.tasks[i].name+"</label></div></td>"+
            "<td>"+all_tasks.tasks[i].date+"</td><td><div class='dropdown'><button class='btn btn-primary dropdown-toggle'"+
            " type='button'id='button1'  style='display: none;' data-toggle='dropdown'><span class='caret'</span></button><ul id='list' class='dropdown-menu'>"+
            "<li ><a onClick='all_tasks.archived(this);return false' href='#'>Archive</a></li>"+
            "<li ><a  onClick='all_tasks.show_edit(this);return false' href='#'>Edit Task</a></li>"+
            "<li ><a onClick='all_tasks.delete_task(this);return false' href='#'>Delete Task</a></li>"+
              "</ul></div></td></tr>";
          }
          else if(this.tasks[i].status=="Archived"){
            body.innerHTML += "<tr  id='divbutton'><td <span title ="+all_tasks.tasks[i].desc+"></span><div class='checkbox'>"+
            "<label><input onClick='all_tasks.checkboxes(this)'  id='ch"+i+"' type='checkbox'"+
            "value=''>"+all_tasks.tasks[i].name+"</label></div></td>"+
            "<td>"+all_tasks.tasks[i].date+"</td><td><div class='dropdown'><button class='btn btn-primary dropdown-toggle'"+
            " type='button' id='button1'  style='display: none;' data-toggle='dropdown'><span class='caret'</span></button><ul id='list' class='dropdown-menu'>"+
            "<li ><a  onClick='all_tasks.show_edit(this);return false' href='#'>Edit Task</a></li>"+
            "<li ><a onClick='all_tasks.delete_task(this);return false' href='#'>Delete Task</a></li>"+
            "<li ><a onClick='all_tasks.mark_done(this);return false' href='#'>Mark as Done</a></li>"+
            "</ul></div></td></tr>";
          }
      }
      all_tasks.n_checked=0;
  },

    count_all: function (){
      //alert("enter count");
      document.getElementById('bad1').innerHTML=all_tasks.counter_all;
      document.getElementById('bad2').innerHTML=all_tasks.counter_in;
      document.getElementById('bad3').innerHTML=all_tasks.counter_c;
      document.getElementById('bad4').innerHTML=all_tasks.counter_ar;

    },
    show_edit: function(btn){
      all_tasks.edited = btn ;
      var row = btn.parentNode.parentNode.parentNode.parentNode.parentNode;
      var index = row.rowIndex-1;
      var task = this.tasks[this.current_table[index]];
      document.getElementById('enewname').value=task.name;
      document.getElementById('enewtask').value=task.desc;
      document.getElementById('edatepicker').value=task.date;
      document.getElementById("Edit11").style.display = 'block';


    },
edit_task: function (){
  var row = all_tasks.edited.parentNode.parentNode.parentNode.parentNode.parentNode;
  var index = row.rowIndex-1;
  var task = this.tasks[this.current_table[index]];
  task.name = document.getElementById('enewname').value;
  task.desc = document.getElementById('enewtask').value;
  task.date = document.getElementById('edatepicker').value;

  document.getElementById('enewname').value="";
  document.getElementById('enewtask').value="";
  document.getElementById('edatepicker').value="";
document.getElementById("Edit11").style.display = 'none';
  this.drawtable(this.status);
},
delete_task: function(btn){
  var r = confirm("Are you sure you want to delete that task??!!");
    if (r == false) {
      return;
    }
  var row = btn.parentNode.parentNode.parentNode.parentNode.parentNode;
  var index = row.rowIndex-1;
  var task = this.tasks[this.current_table[index]];
  all_tasks.counter_all--;
  if(task.status=="In progress"){
    all_tasks.counter_in--;
  }
  else if(task.status=="Completed Tasks"){
    all_tasks.counter_c--;
  }
  else if(task.status=="Archived"){
    all_tasks.counter_ar--;
  }
  this.tasks.splice(this.current_table[index],1);
  all_tasks.count_all();
  this.drawtable(this.status);
},
mark_done: function(btn){
  var row = btn.parentNode.parentNode.parentNode.parentNode.parentNode;
  var index = row.rowIndex-1;
  var task = this.tasks[this.current_table[index]];
  if(task.status=="In progress"){
    all_tasks.counter_in--;
  }
  else if(task.status=="Archived"){
    all_tasks.counter_ar--;
  }
  task.status = "Completed Tasks";
  all_tasks.counter_c++;
  all_tasks.count_all();
  this.drawtable(this.status);
},
archived: function(btn){
  var row = btn.parentNode.parentNode.parentNode.parentNode.parentNode;
  var index = row.rowIndex-1;
  var task = this.tasks[this.current_table[index]];
  if(task.status=="In progress"){
    all_tasks.counter_in--;
  }
  else if(task.status=="Completed Tasks"){
    all_tasks.counter_c--;
  }
  task.status = "Archived";
  all_tasks.counter_ar++;
  all_tasks.count_all();
  this.drawtable(this.status);

},
sort: function(by){
  if(by=="Name"){
    all_tasks.tasks.sort(function(a, b){
        if(a.name< b.name) return -1;
        if(a.name> b.name) return 1;
        return 0;
    })
  }
  else if(by=="Date"){
    all_tasks.tasks.sort(function(a,b) {
      if(!a.date.trim()){return 1;}
      else if(!b.date.trim()){return -1;}
    return new Date(a.date)- new Date(b.date);
    });
  }

},
change_sorting: function(by){
  if(this.status=="All Tasks"){all_tasks.sorting_all=by;}
  else if(this.status=="In progress"){all_tasks.sorting_in=by;}
  else if(this.status=="Completed Tasks"){all_tasks.sorting_c=by;}
  else if(this.status=="Archived"){all_tasks.sorting_ar=by;}
  all_tasks.drawtable(this.status);

},
delete_all: function(){
  var r = confirm("Are you sure you want to delete that tasks??!!");
    if (r == false) {
      return;
    }
  var i,y;
  var del=0;
  for(i=0 ,y=0; y<all_tasks.tasks.length ;i++){
    var task = all_tasks.tasks[y];
    if(this.status=="All Tasks" || this.status==task.status){
      var box = document.getElementById("ch"+i);
      if (box.checked)
      {
        del++;
        all_tasks.counter_all--;
        if(task.status=="In progress"){
          all_tasks.counter_in--;
        }
        else if(task.status=="Completed Tasks"){
          all_tasks.counter_c--;
        }
        else if(task.status=="Archived"){
          all_tasks.counter_ar--;
        }
        this.tasks.splice(i-del+1,1);

      }
      else {
        y++;
      }
    }
    else {
      y++;
    }

  }
  document.getElementById("trying").style.display='none';
  all_tasks.count_all();
  this.drawtable(this.status);
}
,
mark_all: function(){
  var i,y;
  for(i=0,y=0 ; i<all_tasks.tasks.length ; i++){
    var task = all_tasks.tasks[i];
    if(this.status=="All Tasks" || this.status==task.status){
      var box = document.getElementById("ch"+i);
      box.checked = true ;
      y++;
    }
  }
  if(y>0){
    document.getElementById("trying").style.display = 'block';
  }
  all_tasks.n_checked=y;
},
unmark_all: function(){
  var i;
  for(i=0 ; i<all_tasks.tasks.length ; i++){
    var task = all_tasks.tasks[i];
    if(this.status=="All Tasks" || this.status==task.status){
      var box = document.getElementById("ch"+i);
      box.checked = false ;
    }
  }
  document.getElementById("trying").style.display = 'none';
  all_tasks.n_checked=0;
},
checkboxes:function(btn){
  if(btn.checked){
    all_tasks.n_checked++;
  }
  else {
    all_tasks.n_checked--;
  }
  if(all_tasks.n_checked>0){
    document.getElementById("trying").style.display = 'block';
  }
  else {
    document.getElementById("trying").style.display = 'none';
  }
}


}
var x=1;
/*  $(document).ready(function(){
    $("p").click(function(){$(this).hide();});
    document.getElementById("insert").innerHTML="hello =D";
  });*/

  /*function see(){
    if(x==1){document.getElementById("insert").innerHTML="hello =D";x=-1;}
    else{document.getElementById("insert").innerHTML="error";x=1;}
    $(this).hide();

  }*/

  function validate(){
    var text = document.getElementById("number").value;
    if (text>0 && text<10){
      document.getElementById("result_validation").innerHTML = "GOOD INPUT";
    }
    else {
      document.getElementById("result_validation").innerHTML = "WRONG INPUT";
    }
  }
