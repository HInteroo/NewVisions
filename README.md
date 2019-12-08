# NewVisions

Javascript Engineering Resident Performance Task - New Visions for Public Schools

Steps Taken:
First - Webserver. I used a web server called XAMPP:https://www.apachefriends.org/download.html. 

Note: Reasons for using XAMPP was mainly because i was already familiar with this web server which allowed me to use the students.json file on my Google Chrome and create a index.html file that allowed me to insert my data from findLowestAverages() & groupByGrade(). I was also familiar with working/using localhost/NewVisions/index.html on my Google Chrome browser.
   
Second - In order to use XAMPP, one must put the file "NewVisions" inside /htdocs/ folder inside XAMPP so that you can use the server alongside the program.

Note: In my case, i had to put NewVisions folder inside C:\xampp\htdocs\ which allowed me to get onto my localserver: http://localhost/NewVisions/index.html.

URL for the program: https://hinteroo.github.io/NewVisions/index.html

I have written down some notes in my files.
   

NewVisions: 
Step 1 – 
The first step that I took was trying to get the data from Students.json and insert the data to my Javascript/NewVisions.js file. I accomplish that by using JQuery since I’m familiar with JQuery itself.
```
  $.getJSON('Javascript/students.json', function(data) {
    groupByGrade(data);
    findLowestAverages(data);
  });
```
I get the JSON file and display its content by using $.getJSON() and in return I’d get the data “Data” if it succeeds in getting the contents from the Students.json.

Step 2 – 
I first created 2 Let Variables called gradeAverages and gradedgrouped each containing no arrays.
```
   let gradeAverages = new Array();
   let gradedGrouped = new Array(); 
```
gradedGrouped will contain a an array of grouped Students.json data. This is used for groupByGrade(data) method.
gradeAverages will contain students with the lowest score average for each grade (6,7 and 8). This variable will be used for findLowestAverages(data). The data will be gradedGrouped. Therefore, the method groupByGrade(data) needs to be called first.

Step 3 – 
The creation of:
```
	function groupByGrade(data) {
	}
```
The data comes from $.getJSON('Javascript/students.json', function(data) {}).
var Key is declared by getting the keys from data. (0,1,2,3,..,19).
I created a for loop to go through each student’s grade by using Key as my index and declaring a variable called grade that stores in the grade of each student using data[index].grade. 
I passed in the array I wanted the grade and data to be inserted into, the grade to properly group each individual student and the student’s data to addToArray(array ,key, value).
```
	function findLowestAverages(data){
	}

```
let studentData = gradedGrouped. This takes place because I wanted the data that’s akready grouped up by grades to passed through the method addToArray(). The reason behind this is to make it a bit more organized rather than seeing Grade 6,8,7 or 7,8,6.
let sum=0 : The sum is always 0 until I receive the average of each individual students and then back to 0
let lowAvg=100: I start by making lowAvg = 100, lowAvg is eather 0<= x <=100 at first. I record every average that’s lower than the previous lowAvg.  
let gradeAvg; The grade of the student with the lowest average is stored in gradeAvg.
let nameAvg; The name of the student with the lowest average is stored in gradeAvg.
let grade; grade stores the grade of each students I am looping through.
let name; name stores the name of each students I am looping through.
```
	function addToArray(array ,key, value){
	}
```
Since I was using a similar loop in both groupByGrade(data) and findLowestAverages(data) where I add the data inside two different arrays that stores two different types of data than I made the loop itself into a method that is called by both groupByGrade(data) and findLowestAverages(data).
```
Key = grade.
```
I made sure that if array[grade] didn’t exist, then all I had to do was create one as an empty array and then adding a data to the end of the array in  array[grade].
If array[grade] did indeed exist than I’ll skip making an empty array[grade] and just simply push the data of the student inside of array[grade]

