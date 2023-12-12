//include advance format for date
dayjs.extend(window.dayjs_plugin_advancedFormat);

//set the current date and hour variable
var currentDate = dayjs().format("dddd Do MMMM, YYYY");
$("#currentDay").text(currentDate);
var currentHour = dayjs().format("H");

//change the content colour depending on if hour is in past current or future
$(".time-block").each(function(){
    //get the hour from the id 
    var divTime = $(this).attr("id").split("-")[1];
    //load in tasks saved in local storage
    if (localStorage.getItem(divTime) != null) {
        $(this).children(".description").text(localStorage.getItem(divTime));
    }
    if(currentHour > divTime) {
        //remove present if on child then replace it with past
        $(this).children(".description").removeClass("present");
        $(this).children(".description").addClass("past");
    } else if (currentHour < divTime) {
        $(this).children(".description").addClass("future");
    } else if (currentHour == divTime) {
        //when time becomes current remove future class and put to current class
        $(this).children(".description").removeClass("future");
        $(this).children(".description").addClass("present");
    }
})

//save items to local storage based on each
$(".saveBtn").click(function(event) {
    event.preventDefault();
    let task = $(this).siblings(".description").val();
    let time = $(this).parent().attr("id").split("-")[1];
    localStorage.setItem(time, task);
})