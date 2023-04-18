var previousMonth, nextMonth, activeDay = null;

//wybór miesięcy
function monthChoises()
{
    
    
    document.querySelector("#currentMonth").innerHTML = currentMonth.name;

    document.querySelector("#previousMonth").innerHTML = previousMonth.name;

    document.querySelector("#nextMonth").innerHTML = nextMonth.name;


    document.querySelector(".year").innerHTML = "<h3>"+currentMonth.days[1].getFullYear()+"</h3>";

}

document.querySelector("#previousMonth").addEventListener("click", ()=>
    {
        activeDay = null;
        readCurrentMonthFromFile(previousMonth.file, previousMonth.days[1]);
    });

    document.querySelector("#nextMonth").addEventListener("click", ()=>
    {
        activeDay = null;
        readCurrentMonthFromFile(nextMonth.file, nextMonth.days[1]);
    });


//edycja wyników
document.querySelectorAll('.property input').forEach((input)=>
{
    
var bufor = 0;
    input.addEventListener('click', ()=>
    {
        bufor = input.value;
    })
    input.addEventListener('change', ()=>
    {
        if (input.id!="notes")
        {
            try{currentMonth.updateScore(input.id, (input.value-bufor), document.querySelector(".activeDay").innerHTML);}catch(err){alert("Wybierz dzień!")}
        }
        else
        {
            try{currentMonth.updateScore(input.id, input.value, document.querySelector(".activeDay").innerHTML);}catch(err){}
        }
        
        document.querySelectorAll("td div").forEach((day)=>
        {
                if(((currentMonth.days[day.innerHTML].hours!=0)||
                (currentMonth.days[day.innerHTML].publications!=0)||
                (currentMonth.days[day.innerHTML].films!=0)||
                (currentMonth.days[day.innerHTML].minutes!=0)||
                (currentMonth.days[day.innerHTML].visits!=0)||
                (currentMonth.days[day.innerHTML].studies!=0)||
                (currentMonth.days[day.innerHTML].ldpbHours!=0)||
                (currentMonth.days[day.innerHTML].ldpbMinutes!=0))&&
                !(day.classList.contains("otherDays")))  

                day.classList.add("dayWithNotes");
                else day.classList.remove("dayWithNotes");

                if ((currentMonth.days[day.innerHTML].notes!="")&&!(day.classList.contains("otherDays")))
                day.classList.add("notesForDay");
                else day.classList.remove("notesForDay");
        });

        input.blur();

    })
});

document.querySelector('textarea').addEventListener('input', ()=>
{
    try
        {
            currentMonth.updateScore(document.querySelector('textarea').id, document.querySelector('textarea').value, document.querySelector(".activeDay").innerHTML, false);
        }
        catch(err){}

    document.querySelectorAll("td div").forEach((day)=>
        {
                if(((currentMonth.days[day.innerHTML].hours!=0)||
                (currentMonth.days[day.innerHTML].publications!=0)||
                (currentMonth.days[day.innerHTML].films!=0)||
                (currentMonth.days[day.innerHTML].minutes!=0)||
                (currentMonth.days[day.innerHTML].visits!=0)||
                (currentMonth.days[day.innerHTML].studies!=0)||
                (currentMonth.days[day.innerHTML].ldpbHours!=0)||
                (currentMonth.days[day.innerHTML].ldpbMinutes!=0))&&
                !(day.classList.contains("otherDays")))  

                day.classList.add("dayWithNotes");
                else day.classList.remove("dayWithNotes");

                if ((currentMonth.days[day.innerHTML].notes!="")&&!(day.classList.contains("otherDays")))
                day.classList.add("notesForDay");
                else day.classList.remove("notesForDay");
        });

});


//wybór lat
document.querySelector(".year").addEventListener("click", showYears);

function hideYears()
{
    document.querySelector(".year").classList.remove("activeYear");
    document.querySelector(".year").innerHTML = "<h3>"+currentMonth.days[1].getFullYear()+"</h3>";
    document.querySelector("body").removeEventListener("click", hideYears);
    document.querySelector(".year").addEventListener("click", showYears);

}

function showYears()
{
    document.querySelector(".year").removeEventListener("click", showYears);
    document.querySelector(".year").innerHTML = "<hr>";
    for (i=currentMonth.days[1].getFullYear()-10; i<=today.getFullYear(); i++)
    {
        document.querySelector(".year").innerHTML+=("<h3>"+i+"</h3><hr>");
    }

    document.querySelector(".year").classList.add("activeYear");
    document.querySelector(".year").scrollBy(0,1000);
    document.querySelectorAll(".year h3").forEach((year)=>
    {
        year.addEventListener("click",()=>
        {
            readCurrentMonthFromFile((parseInt(today.getMonth())+1) + "-" + year.innerHTML + ".json", new Date(year.innerHTML+"-"+currentMonth.number+"-1"));
        });
    });

    setTimeout(()=>
    {
        document.querySelector("body").addEventListener("click",hideYears);
    }, 1);
};


//wyświetlenie dni
function displayDays()
{   
    var firstDay = currentMonth.days[1].getDay();
    if (firstDay==0) firstDay = 7;

    var table = "";
    document.querySelector("#calendar").innerHTML = table;
    table +="<tr><td>PON</td><td>WT</td><td>ŚR</td><td>CZW</td><td>PT</td><td>SOB</td><td>NIEDZ</td></tr><tr>";
    for (i=1; i<firstDay; i++)
    {
        table +=("<td><div class = 'otherDays'>"+(previousMonth.length-(firstDay-1-i))+"</div></td>");
    }
    for (i=1; i<= (7-(firstDay-1)); i++)
    {
        table+="<td><div>"+currentMonth.days[i].getDate()+"</div></td>";
        var first = i;
    }
    table +="</tr>";

    for (i=1; i<=Math.floor((currentMonth.length-(7-(firstDay-1)))/7); i++)
    {
        table+="<tr>";
        for (j=1; j<=7; j++)
        {
            table+="<td><div>"+((7*(i-1))+j+first)+"</td></div>";
            var lastDay = (7*(i-1))+j+first;
        }
        table+="</tr>";
    }

    table+="<tr>"
    for (i=1; i<=currentMonth.length-lastDay; i++)
    {
        table+="<td><div>"+(lastDay+i)+"</div></td>";
        var nextDays = 7-i;
    }

    for (i=1; i<=nextDays; i++)
    {
        table+="<td><div class = 'otherDays'>"+i+"</div></td>";
    }


    table+="</tr>";

    document.querySelector("#calendar").innerHTML += table;

    document.querySelectorAll("td div").forEach((day)=>
    {
        day.classList.remove("activeDay");

        if(((currentMonth.days[day.innerHTML].hours!=0)||
            (currentMonth.days[day.innerHTML].publications!=0)||
            (currentMonth.days[day.innerHTML].films!=0)||
            (currentMonth.days[day.innerHTML].minutes!=0)||
            (currentMonth.days[day.innerHTML].visits!=0)||
            (currentMonth.days[day.innerHTML].studies!=0)||
            (currentMonth.days[day.innerHTML].ldpbHours!=0)||
            (currentMonth.days[day.innerHTML].ldpbMinutes!=0))&&
            !(day.classList.contains("otherDays")))  

        day.classList.add("dayWithNotes");

        if ((currentMonth.days[day.innerHTML].notes!="")&&!(day.classList.contains("otherDays")))
        day.classList.add("notesForDay");


        if (day.innerHTML==today.getDate()&&!(day.classList.contains("otherDays"))&&(currentMonth.number==(today.getMonth()+1))&&currentMonth.days[1].getFullYear()==today.getFullYear())
        {
            day.classList.add("today");
            day.classList.add("activeDay");
            activeDay = day.innerHTML;
        }

        day.addEventListener("click",()=>
        {
            if (!day.classList.contains("otherDays"))
            {
                document.querySelectorAll("td div").forEach((day)=>
                {
                    day.classList.remove("activeDay");
                });
                day.classList.add("activeDay");
                activeDay = day.innerHTML;
                displayScores(activeDay);
            }
        })
    })
}


//reset wyników
function resetScores()
{
    document.querySelector("#hours").value = 0;
    document.querySelector("#publications").value = 0;
    document.querySelector("#films").value = 0;
    document.querySelector("#visits").value = 0;
    document.querySelector("#minutes").value = 0;
    document.querySelector("#studies").value = 0;
    document.querySelector("#ldpbHours").value = 0;
    document.querySelector("#ldpbMinutes").value = 0;
    document.querySelector("#notes").value = "";
    document.querySelector('#notes').style.height = (document.querySelector('#notes').scrollHeight) + "px";
    document.querySelector("#notesLabel").style.height = (document.querySelector('#notes').scrollHeight-10) + "px";

}

function displayScores(day)
{
    document.querySelector('.property #notes').style.height = "30px";
    if (day!=null)
    {
        document.querySelector("#hours").value = currentMonth.days[day].hours;
        document.querySelector("#publications").value = currentMonth.days[day].publications;
        document.querySelector("#films").value = currentMonth.days[day].films;
        document.querySelector("#visits").value = currentMonth.days[day].visits;
        document.querySelector("#minutes").value = currentMonth.days[day].minutes;
        document.querySelector("#studies").value = currentMonth.days[day].studies;
        document.querySelector("#ldpbHours").value = currentMonth.days[day].ldpbHours;
        document.querySelector("#ldpbMinutes").value = currentMonth.days[day].ldpbMinutes;
        document.querySelector("#notes").value = currentMonth.days[day].notes;
        document.querySelector('#notes').style.height = (document.querySelector('#notes').scrollHeight) + "px";
        document.querySelector("#notesLabel").style.height = (document.querySelector('#notes').scrollHeight-10) + "px";
    }
    else resetScores();
}