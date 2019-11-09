
$( document ).ready(function() {
  $.getJSON('Javascript/students.json', function(data) {
    groupByGrade(data);
    findLowestAverages(data);
  });

  $(".Content .mainButton").click(function(){ //When the View Data Button is clicked.
    $(this).hide(); //Hide the View Data Button
    addToPage("Average"); //Start adding the data to the page.

    $(".studentContents").toggle(); //set the display from none -> "". Makes the div visible
      $(".Content .Average").toggle(function(){ //i change the colors of the top buttons
        $(this).css({
            "background-color": "gray",  // Gray means -> currently Active
            "color":"white",
            "opacity":1                 //Giving it a bit of an animation (FadeIn)
          });
        });

      $(".Content .Group").toggle(function(){ //the .Group button is not active and therefore white
        $(this).css("opacity","1");           //giving it a bit of an animation
      });

      $(".Content").css({                     //More animation/transition. Increasing the height
          "height": "420px",
          "margin-top":"-210px"               //while making sure the content is in the middle
      });

      $(".Content .mainButton").css({
          "margin-top":"-60px"
      });

    });

    $(".Content .Average").click(function(){  //Event Handler, when the .Average button is clicked
      buttonsClicked($(".Content .Average"),$(".Content .Group")); //do this buttonsClicked(Name, Othername)
      addToPage("Average"); //When .Average button is clicked, add the findLowestAverages() DOM
    });

    $(".Content .Group").click(function(){    //Event Handler for .Group Button
      buttonsClicked($(".Content .Group"),$(".Content .Average")); //Gives some CSS feedback to what button is active/inactive
      addToPage("Group");
    });

});
// ---------------------------------------------------------------------------------------------------------------------------------------

let gradeAverages = new Array(); //Data after running findLowestAverages()
let gradedGrouped = new Array(); //Data after running groupByGrade : 6: {id{name:.., }},7: {id{name:.., }},8: {id{name:.., }}

function groupByGrade(data) {
  var keys = Object.keys(data); //creates keys : 0,1,2,3..,20

  for (var index in keys) {
      var grade = data[index].grade; //grade of the students in index index
      addToArray(gradedGrouped ,grade, data[index]); //method to creating an array
    }
    console.log(gradedGrouped);
}

function findLowestAverages(data){
  let studentData = gradedGrouped;
  let sum=0;
  let lowAvg=100;
  let gradeAvg;
  let nameAvg;
  let grade;
  let name;

  for (var index in studentData){ //studentData = already grouped data
    grade = data[index].grade;    //I take note on the grades
    for (var students in studentData[index]){   //i get the students on said grade.
      name = studentData[index][students].name;  //The name of the student
      for (var subjects in studentData[index][students].scores){
        sum+= studentData[index][students].scores[subjects].value;
      }
      sum = sum/4;
      if (sum<=lowAvg && lowAvg != sum) {
        gradeAvg = grade;   //i keep the name of the grade with lowest average grade
        nameAvg = name;    //i keep the name of the name with lowest average grade
        lowAvg = sum;     //i keep the name of the average with of the student with the lowest average grade
      }
      sum = 0;
    }
    addToArray(gradeAverages, grade, {grade: gradeAvg, name: nameAvg, average: lowAvg}); //{grade: 6, name: "John Smith", average: 55}
    lowAvg = 100; //
  }
  console.log(gradeAverages);
}

// ---------------------------------------------------------------------------------------------------------------------------------------
function addToPage(type){
  $(".studentContents .informationDIV").remove(); //I remove the div .informationDIV if its active on DOM
  $(".studentContents #avg").remove();            //I remove the <p id = "avg">Average </p> if i dont need it (Grouping)

  if (type == "Group") {                       //if the button Group was clicked, do this:
    $('.studentContents').append('<div class = "informationDIV"></div>');   //appends a div that contains the information of students
      for (var grade in gradedGrouped) {        //Grades of each students using Grouped data
        for (var id in gradedGrouped[grade]) {  //IDs of the students using Grouped data (0,1,2,3..,7 in the case of students in 6th grade)
          let name = gradedGrouped[grade][id].name;
          $('.informationDIV').append(          //informationDIV will contain divs inside of it.
            '<div id = "studentInfo"><div id="studentsGrade">'+grade+'</div><div id="Name">'+name+'</div></div>'
          );
      }
    }
  }
  else{
    $('.studentContents').append('<p id = "avg">Average Grades</p>');    //appending/creating the <p></p> which lets the reader know what type of data.
    $('.studentContents').append('<div class = "informationDIV"></div>');//appends informationDIV/creates a new refreshed informationDIV
    for (var grade in gradeAverages) {      //Grades : 6,7,8
      for (var id in gradeAverages[grade]) {  //IDs or Numbers of students in grades 6,7,8: 7 in grade 6, 7 in grade 7 and 6 in grade 8 (Total = 20 Students)
        let name = gradeAverages[grade][id].name;
        let average = gradeAverages[grade][id].average;
        $('.informationDIV').append(
          '<div id = "studentInfo"><div id="studentsGrade">'+grade+'</div><div id="Name">'+name+'</div><div id="Average">'+average+'</div></div>'
        );
      }
    }
  }
}

function buttonsClicked(name, otherName){ // when buttons are clicked, make the button thats clicked
  name.click(function(){                  //active and the otherone look inactive
    name.css({                            // Grade = active, white = inactive
        "background-color": "gray",
        "color":"white",
      });
      otherName.css({
          "background-color": "white",
          "color":"#4CAF50",
      });
  });
}
function addToArray(array ,key, value){ //Making a new array and adding it's key and values.
  if (!array[key]){           //if array[key] doesnt exist, create one while empty
    array[key] = new Array();
  }
  array[key].push(value);    //find the key in the array and add a value at the end of the array who's key is key
  return array;
}
