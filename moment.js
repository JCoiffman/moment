const moment = require("moment-timezone");

function formatAnyInputToStandardDate(input) {
    if(input.length == 10){
        if(!isNaN(input.slice(0, 2))){
            if(parseInt(input.slice(0, 3)) > 12){
                console.log(moment(input, "DD/MM/YYYY").format("MM/DD/YYYY"));
            }else{
                console.log(moment(input, "MM/DD/YYYY").format("MM/DD/YYYY"));
            }
        }else{
            var month = (parseInt(input.slice(1, 3)) * 3);
            var year = input.slice(6, 10);
            var date = month + '/1/' + year;
            console.log(moment(date, "MM/DD/YYYY").format("MM/DD/YYYY"));
        }
    }else{
        console.log(moment(input, "ddd, DD MMM YYYY").format("MM/DD/YYYY"));
    }   
}

function getFirstMondayOfYear(year) {
    var month = '01';
    var day = 1;
    var weekday = moment(month + '/' + day + '/' + year, "MM/DD/YYYY");
    for(day; day < 8; day++){
        if(weekday.format('dddd') == "Monday"){
            console.log(weekday.format("MM/DD/YYYY"));
            return;
        }
        weekday = weekday.add(1, 'day');
    }
}

function getLastMondayOfYear(year) {
    var month = '12';
    var day = 31;
    var weekday = moment(month + '/' + day + '/' + year, "MM/DD/YYYY");
    for(var x = 1; x < 8; x++){
        if(weekday.format('dddd') == "Monday"){
            console.log(weekday.format("MM/DD/YYYY"));
            return;
        }
        weekday = weekday.subtract(1, 'day');
    }
}

function differenceBetweenTwoDates(dateA, timeA, dateB, timeB){
    var first = moment(dateA + ":" + timeA, "MM/DD/YYYY:hh:mm");
    var second = moment(dateB + ":" + timeB, "MM/DD/YYYY:hh:mm");
    var durration = moment.duration(first.diff(second))
    var years = durration.years();   // Takes into acount leap years
    var months = durration.months(); // Calculates months not as 30 days, but rather calander months
                                     // for example, Feb 4th to March 4th is 1 month
    var days = durration.days();     // Takes into acount daylight savings
    var hours = durration.hours();
    var minutes = durration.minutes();
    var comma = ",";
    years = Math.abs(years) + " Year"; 
    months = " " + Math.abs(months) + " Month"; 
    days = " " + Math.abs(days) + " Day";
    hours = " " + Math.abs(hours) + " Hour";
    minutes = " " + Math.abs(minutes)  + " Minute";

    
    var dif = [years, months, days, hours, minutes];
    var answer = '';
    for(var x = 0; x < dif.length; x++){
        var amount = parseInt(dif[x].slice(0, 3));
        if(amount > 1 || amount == 0){
            dif[x] += 's';
        }
        if(x == 4){
            answer += " and"
        }
        answer += dif[x]
        if(x < 3){
            answer += comma;
        }
    }
    console.log(answer)

}

function closestToNow(){
    var monthA = Math.floor(Math.random() * (13 - 1) + 1);
    var monthB = Math.floor(Math.random() * (13 - 1) + 1);
    var yearA = Math.floor(Math.random() * (9999 - 0) + 1);
    var yearB = Math.floor(Math.random() * (9999 - 0) + 1);
    var date1 = moment(monthA + '/' + yearA, "MM/YYYY");
    var date2 = moment(monthB + '/' + yearB, "MM/YYYY");

    var dayA = Math.floor(Math.random() * (30 - 1) + 1);
    var dayB = Math.floor(Math.random() * (30 - 1) + 1);

    // so we can make sure the day is truly random, but still wthin the month or next month, not an invalid date 
    date1.add(dayA, "days");
    date2.add(dayB, "days");

    if(parseInt(date1.fromNow(true)) > parseInt(date2.fromNow(true))){
        return date2.format("MM/DD/YYYY");
    }else{
        return date1.format("MM/DD/YYYY");
    }
}

function FIFAWorldCupCountdownLocal(){
    var today = moment("8:00", "h:mm");
    var todayMonth = parseInt(today.format("MM"));
    var todayDay = parseInt(today.format("DD"));
    var todayYear = parseInt(today.format("YYYY"));
    // check if we have passes the start of the world cup
    if(todayMonth > 11 || (todayMonth == 11 && todayDay > 20) || todayYear > 2022){
        return "0 Months, 0 Days, 0 hours, 0 minutes, 0 seconds";
    }
    var fifa = moment("11/20/2022:11:00", "MM/DD/YYYY:hh:mm"); // source: https://www.sportingnews.com/us/soccer/news/fifa-world-cup-schedule-2022-match-dates-times-team-fixtures/rikum04od4igad8n0o8yanoo
    var durration = moment.duration(fifa.diff(today));
    var months = durration.months();
    var days = durration.days();
    var hours = durration.hours();
    var minutes = durration.minutes();
    var seconds = durration.seconds();
    var time = months + " Months, " + days + " Days, " + hours + " Hours, " + minutes + " Minutes and " + seconds + " Seconds";
    return time;
}

function FIFAWorldCupCountdownQatar(){
    var today = moment("8:00", "h:mm").utcOffset(+3, true);
    var todayMonth = parseInt(today.format("MM"));
    var todayDay = parseInt(today.format("DD"));
    var todayYear = parseInt(today.format("YYYY"));
    // check if we have passes the start of the world cup
    if(todayMonth > 11 || (todayMonth == 11 && todayDay > 20) || todayYear > 2022){
        return "0 Months, 0 Days, 0 hours, 0 minutes, 0 seconds";
    }
    var fifa = moment("11/20/2022:19:00", "MM/DD/YYYY:hh:mm").utcOffset(+3, true); // source: https://www.fourfourtwo.com/features/what-will-the-kick-off-times-be-at-the-qatar-world-cup-2022
    var durration = moment.duration(fifa.diff(today));
    var months = durration.months();
    var days = durration.days();
    var hours = durration.hours();
    var minutes = durration.minutes();
    var seconds = durration.seconds();
    var time = months + " Months, " + days + " Days, " + hours + " Hours, " + minutes + " Minutes and " + seconds + " Seconds";
    return time;
}

function timezoneHourDifference(dateAndTime, timezone1, timezone2){
    var date = moment(dateAndTime, "MM/DD/YYYY LT");
    var offset1 = date.clone().tz(timezone1).utcOffset();
    var offset2 = date.clone().tz(timezone2).utcOffset();
    var difference = Math.abs(offset1 - offset2) / 60;
    console.log(difference);
}
