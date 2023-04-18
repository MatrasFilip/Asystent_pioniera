var startTime="-", startHour="-", startMinute="-", stopHour, stopMinute, timing = true;
function displayTime()
{
    if (timing==true)
    {
        today = new Date;
        var currentTime = today.getTime() - startTime;
        
        var seconds = Math.floor(currentTime/1000)%60;
        var minutes = Math.floor(currentTime/1000/60)%60;
        var hours = Math.floor(currentTime/1000/60/60);

        if (hours<10) hours = "0"+parseInt(hours);
        if (minutes<10) minutes = "0"+parseInt(minutes);
        if (seconds<10) seconds = "0"+seconds;

        document.querySelector("#time").innerHTML = (hours)+":"+(minutes)+":"+(seconds);
        setTimeout("displayTime()", 1000);
    }

}

function stoperStart()
{
    today = new Date();
    if (startTime=="-")
    {
        startTime = today.getTime();
        startHour = today.getHours();
        startMinute = today.getMinutes();
        createNewFile("timeBufor.txt", startTime+","+startHour+","+startMinute);
    }

    timing = true;

    document.querySelector("#stoperControl").src = "img/stop.png";
    document.querySelector("#stoperControl").alt = "stop";
    document.querySelector("#stoper h1").innerHTML = "Przerwij służbę";

    displayTime();
}

function stoperStop()
{
    function displayTimeScores(stopHour, stopMinute)
    {
        if (startHour=="") startHour=0;
        if (startHour<10) startHour = "0"+ parseInt(startHour);

        if (startMinute===undefined) startMinute=0;
        if (startMinute<10) startMinute = "0"+ parseInt(startMinute);

        document.querySelector("#startHour").value = startHour+":"+startMinute;

        if (stopHour=="") stopHour=0;
        if (stopHour<10) stopHour = "0"+ parseInt(stopHour);

        if (stopMinute===undefined) stopMinute=0;
        if (stopMinute<10) stopMinute = "0"+ parseInt(stopMinute);

        document.querySelector("#stopHour").value = stopHour+":"+stopMinute;

        if (stopHour-startHour<0) 
        {
            var hoursScore = 24+(document.querySelector("#stopHour").value.split(":")[0]-document.querySelector("#startHour").value.split(":")[0]);
        }
        else var hoursScore = stopHour-startHour;
        

        if (stopMinute-startMinute<0) 
        {
            if(stopHour==startHour) hoursScore = 23;
            else hoursScore--;
            var minuteScore = 60+(document.querySelector("#stopHour").value.split(":")[1]-document.querySelector("#startHour").value.split(":")[1]);
        }
        else var minuteScore = stopMinute-startMinute;
        if (minuteScore == 1) minuteScore = minuteScore+" minuta";
        else if ((minuteScore>10&&minuteScore<20)) minuteScore = minuteScore+" minut";
        else if (minuteScore%10==5||
                minuteScore%10==6||
                minuteScore%10==7||
                minuteScore%10==8||
                minuteScore%10==9||
                minuteScore%10==0) minuteScore = minuteScore+" minut";
        else if (minuteScore%10==2||
                minuteScore%10==3||
                minuteScore%10==4) minuteScore = minuteScore+" minuty";

                if (hoursScore == 1) hoursScore = hoursScore+" godzina";
        else if ((hoursScore>10&&hoursScore<20)) hoursScore = hoursScore+" godzin";
        else if (hoursScore%10==5||
                hoursScore%10==6||
                hoursScore%10==7||
                hoursScore%10==8||
                hoursScore%10==9||
                hoursScore%10==0) hoursScore = hoursScore+" godzin";
        else if (hoursScore%10==2||
                hoursScore%10==3||
                hoursScore%10==4) hoursScore = hoursScore+" godziny";

        document.querySelector("#timeScore").innerHTML = hoursScore+"<br><br>"+minuteScore;
    }




    document.querySelector("#stoperControl").src = "img/start.png";
    document.querySelector("#stoperControl").alt = "start";

    timing = false;

    document.querySelector("#timeAlert").style.display = "block";

    today = new Date();
    displayTimeScores(today.getHours(), today.getMinutes());

    document.querySelectorAll("#timeAlert input[type='time']").forEach(()=>
    {
            this.addEventListener("change",()=>
        {
            startHour = document.querySelector("#startHour").value.split(":")[0];
            startMinute = document.querySelector("#startHour").value.split(":")[1];

            displayTimeScores(document.querySelector("#stopHour").value.split(":")[0], document.querySelector("#stopHour").value.split(":")[1]);
        });
    });

    createNewFile("timeBufor.txt", "-,-,-");
    startTime = "-";
    startHour = "-";
    startMinute = "-";


    //anulowanie czasu
    setTimeout(()=>
    {
        document.querySelector("header").addEventListener("click", ()=>
        {
            document.querySelector("#timeAlert").style.display = "none";
        }, {once:true});

        document.querySelector("main").addEventListener("click", f = ()=>
        {
            document.querySelector("#timeAlert").style.display = "none";
        }, {once:true});
    }, 1);
    document.querySelector("#stoper h1").innerHTML = "Zacznij służbę!";
}

function displayDate(place, date)
{
    if (date.getDate()<10)
    var d = "0"+date.getDate();
    else
    var d = date.getDate();

    if ((date.getMonth()+1)<10)
    var m = "0"+(date.getMonth()+1);
    else
    var m = date.getMonth()+1;

    place.innerHTML = d+"."+m+"."+today.getFullYear();
}

displayDate(document.getElementById("data"), today);

document.querySelectorAll('input[type="number"], input[type="text"]').forEach((input)=>
{
    input.addEventListener('change', ()=>
    {
        if (input.id=="notes")
        {
            try
            {
                if (currentMonth.days[today.getDate()].notes!="") currentMonth.updateScore(input.id, currentMonth.days[today.getDate()].notes + "\n" + input.value, today.getDate());
                else currentMonth.updateScore(input.id, input.value, today.getDate());
            }
            catch(err){}
        }
        else
        {
            if (document.querySelector("#ldpbBII img").alt == "buttonOff") {try{currentMonth.updateScore(input.id, input.value, today.getDate());}catch(err){alert(err.message)}}
            else 
            {
                if (input.id=="hours") {try{currentMonth.updateScore("ldpbHours", input.value, today.getDate());}catch(err){alert(err.message)}}
                if (input.id=="minutes") {try{currentMonth.updateScore("ldpbMinutes", input.value, today.getDate());}catch(err){alert(err.message)}}
            
            }
        }
        input.blur();
        input.value = "";
    })
});

document.querySelector("#stoperControl").addEventListener("click",()=>
{
    if (document.querySelector("#stoperControl").alt == "start")
    stoperStart();
    else stoperStop();
});

document.querySelector("#timeButton").addEventListener("click",()=>
    {
        document.querySelector("#timeAlert").style.display = "none";
        document.querySelector("#time").innerHTML = "00:00:00";
        if (document.querySelector("#ldpbBI img").alt == "buttonOff")
        {
            try{currentMonth.updateScore("hours", document.querySelector("#timeScore").innerHTML.split("<br><br>")[0].split(" ")[0], today.getDate());}catch(err){alert(err.message)}
            if (fileWrited==true) try{currentMonth.updateScore("minutes", document.querySelector("#timeScore").innerHTML.split("<br><br>")[1].split(" ")[0], today.getDate());}catch(err){alert(err.message)}
            else
            {
                const writing = setInterval(() => 
                {
                    if (fileWrited==true) 
                    {
                        try
                        {
                            currentMonth.updateScore("minutes", document.querySelector("#timeScore").innerHTML.split("<br><br>")[1].split(" ")[0], today.getDate());
                            clearInterval(writing);
                        }
                        catch(err){alert(err.message)}
                    }
                    }, 10);
            }
        }
        else
        {
            try{currentMonth.updateScore("ldpbHours", document.querySelector("#timeScore").innerHTML.split("<br><br>")[0].split(" ")[0], today.getDate());}catch(err){alert(err.message)}
            try{currentMonth.updateScore("ldpbMinutes", document.querySelector("#timeScore").innerHTML.split("<br><br>")[1].split(" ")[0], today.getDate());}catch(err){alert(err.message)}
        }
    });

document.querySelector("#ldpbBI").addEventListener("click",()=>
{
    if (document.querySelector("#ldpbBI img").alt == "buttonOff")
    {
        document.querySelector("#ldpbBI img").src = "img/buttonOn.png";
        document.querySelector("#ldpbBI img").alt = "buttonOn";
    }
    else
    {
        document.querySelector("#ldpbBI img").src = "img/buttonOff.png";
        document.querySelector("#ldpbBI img").alt = "buttonOff";
    }
});

document.querySelector("#ldpbBII").addEventListener("click",()=>
{
    if (document.querySelector("#ldpbBII img").alt == "buttonOff")
    {
        document.querySelector("#ldpbBII img").src = "img/buttonOn.png";
        document.querySelector("#ldpbBII img").alt = "buttonOn";
    }
    else
    {
        document.querySelector("#ldpbBII img").src = "img/buttonOff.png";
        document.querySelector("#ldpbBII img").alt = "buttonOff";
    }
});