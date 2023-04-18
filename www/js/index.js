var scrollYPosition = 0, touchXBufor, touchYBufor;

function buttons()
{
    document.querySelectorAll("a.active").forEach(function (button)
    {
        //button.style = "background-color: #b6b6b6; border-radius: 100px;";
        setTimeout(()=>{button.style = "background-color: inherit; border-radius: inherit;"}, 200);
    })
}
window.addEventListener("load", buttons);

Date.prototype.publications;
Date.prototype.films;
Date.prototype.hours;
Date.prototype.minutes;
Date.prototype.visits;
Date.prototype.studies;
Date.prototype.notes;
Date.prototype.ldpbHours;
Date.prototype.ldpbMinutes;

class DaysToSave
{
    constructor(day)
    {
        this.date = day.getFullYear()+"-"+(parseInt(day.getMonth()+parseInt(1)))+"-"+day.getDate();
        this.publications = day.publications;
        this.films = day.films;
        this.hours = day.hours;
        this.minutes = day.minutes;
        this.visits = day.visits;
        this.studies = day.studies;
        this.notes = day.notes;
        this.ldpbHours = day.ldpbHours;
        this.ldpbMinutes = day.ldpbMinutes;
    }
}

class Month
{
    constructor(scores, number)
    {
        this.number = parseInt(number.getMonth())+1;
        this.year = number.getFullYear();
        this.name = this.getName(this.number);
        try 
        {
            this.scores = JSON.parse(scores);
        }
        catch(err)
        {
            this.scores = []
        }

        this.days =[];

        this.publications = 0;
        this.films = 0;
        this.hours = 0;
        this.minutes = 0;
        this.visits = 0;
        this.studies = 0;
        this.ldpbHours = 0;
        this.ldpbMinutes = 0;
        
        this.generateProperties();

        this.file = (parseInt(this.days[1].getMonth())+1) + "-" + this.days[1].getFullYear() + ".json"

    }

    getName(number)
    {
        switch (number)
        {
            case 1:
            return "Styczeń";
            break;
            case 2:
                return "Luty";
            break;
            case 3:
                return "Marzec";
            break;
            case 4:
                return "Kwiecień";
            break;
            case 5:
                return "Maj";
            break;
            case 6:
                return "Czerwiec";
            break;
            case 7:
                return "Lipiec";
            break;
            case 8:
                return "Sierpień";
            break;
            case 9:
                return "Wrzesień";
            break;
            case 10:
                return "Październik";
            break;
            case 11:
                return "Listopad";
            break;
            case 12:
                return "Grudzień";
            break;
        }
    }


    generateProperties()
    {
        for (var i=1;i<=31;i++)
        {
            this.days[i] = new Date(this.year+"-"+this.number+"-"+i);
            if (this.days[i].getMonth()+1==this.number && this.scores[i] != undefined)
            {
                this.days[i].publications = this.scores[i].publications;
                this.days[i].films = this.scores[i].films;
                this.days[i].hours = this.scores[i].hours;
                this.days[i].minutes = this.scores[i].minutes;
                this.days[i].visits = this.scores[i].visits;
                this.days[i].studies = this.scores[i].studies;
                this.days[i].ldpbHours = this.scores[i].ldpbHours;
                this.days[i].ldpbMinutes = this.scores[i].ldpbMinutes;
                this.days[i].notes = this.scores[i].notes;
                this.length = i;
            }
            else
            {
                this.scores[i] = new DaysToSave(this.days[i]);
            }

            if (this.scores[0] == undefined)
            {
                this.scores[0] = new DaysToSave(this.days[1]);
            }


            this.days[i].publications ??= 0;
            this.days[i].films ??= 0;
            this.days[i].hours ??= 0;
            this.days[i].minutes ??= 0;
            this.days[i].visits ??= 0;
            this.days[i].studies ??= 0;
            this.days[i].ldpbHours ??= 0;
            this.days[i].ldpbMinutes ??= 0;
            this.days[i].notes ??= "";

            this.publications += parseInt(this.days[i].publications);
            this.films += parseInt(this.days[i].films);
            this.hours += parseInt(this.days[i].hours);
            this.minutes += parseInt(this.days[i].minutes);
            this.visits += parseInt(this.days[i].visits);
            this.studies += parseInt(this.days[i].studies);
            this.ldpbHours += parseInt(this.days[i].ldpbHours);
            this.ldpbMinutes += parseInt(this.days[i].ldpbMinutes); 

            if (this.days[i].getMonth()+1==this.number)
            {
                this.length = i;
            }
        }
        if (this.scores[0] != undefined)
        {
            this.remarks = this.scores[0].notes;
        }
        this.remarks ??= "";

        if (this.minutes>=60) this.hours += Math.floor(this.minutes/60);
        if (this.ldpbMinutes>=60) this.ldpbHours += Math.floor(this.ldpbMinutes/60);
    }

    updateScore(property, score, day, saveAlert = true)
    {   
        if (property == "remarks") 
        {
            this.scores[0].notes = score;
        }
        else if (property == "notes")
        {
            this.scores[day][property] ??= "";
            this.scores[day].notes = score;
        }
        else
        {
            this.scores[day][property] ??= 0;

            if (property == "minutes")
            {
                this.updateScore("hours", Math.floor((this.scores[day].minutes + parseInt(score))/60), day);
                score = score%60-60*(Math.floor((this.scores[day].minutes + parseInt(score))/60));
            }
            if (property == "ldpbMinutes")
            {
                this.updateScore("ldpbHours", Math.floor((this.scores[day].minutes + parseInt(score))/60), day);
                score = score%60-60*(Math.floor((this.scores[day].minutes + parseInt(score))/60));
            }

            this.scores[day][property] += parseInt(score);
        }
        this.generateProperties();
        

        document.addEventListener("deviceready", () =>
        {
            try
            {
                if (saveAlert==true) document.querySelector("#loadingScreen").style.display = "block";
            }
            catch(err){}
            if (fileWrited==true) 
            {
                try
                {
                    fileWrited = false;
                    createNewFile(this.file, this.scores);
                }
                catch(err)
                {
                    alert(err.message)
                }
            }
            else
            {
                const writing = setInterval(() => 
                {
                    if (fileWrited==true) 
                    {
                        try
                        {
                            fileWrited = false;
                            createNewFile(this.file, this.scores);
                            clearInterval(writing);
                        }
                        catch(err)
                        {
                            alert(err.message)
                        }
                    }
                    }, 10);
            }

        }, {once: true});
    }
    
}


document.addEventListener("deviceready",()=>
{
    readCurrentMonthFromFile((parseInt(today.getMonth())+1) + "-" + today.getFullYear() + ".json", today);
    readTimeBuforFromFile("timeBufor.txt");
    readSettingsFromFile("settings.json");

}, false);

var today = new Date();
var currentMonth = "";
var settings = new Object;
const tx = document.getElementsByTagName("textarea");


for (let i = 0; i < tx.length; i++) 
{
  tx[i].addEventListener("input", OnInput, false);
}

function OnInput()
{
  this.style.height = 0;
  this.style.height = (this.scrollHeight) + "px";
  try
    {
        document.querySelector("#notesLabel").style.height = (this.scrollHeight-10) + "px";
    }
    catch(err){}
}

window.addEventListener("scroll", ()=>
{
    if (window.pageYOffset > scrollYPosition)
    {
        document.querySelector("header").style.top = "-60px";
        document.querySelector("nav").style.bottom = "-55px";
    }
    if (window.pageYOffset < scrollYPosition)
    {
        document.querySelector("header").style.top = "0px";
        document.querySelector("nav").style.bottom = "0px";
    };
    scrollYPosition = window.pageYOffset;
});

document.querySelector("main").addEventListener("touchstart", (e)=>
{
    touchXBufor = e.touches[0].clientX;
    touchYBufor = e.touches[0].clientY;
});

document.querySelector("main").addEventListener("touchmove", (e)=>
{
    if(e.touches[0].clientX-touchXBufor>50)
    {
        document.querySelector("main").addEventListener("touchend", ()=>
        {
            switch(window.location.href)
            {
                case "https://localhost/index.html": 
                window.location.assign("../raport.html");
                break;
                case "https://localhost/raport.html": 
                break;
                case "https://localhost/history.html": 
                window.location.assign("../index.html");
                break;
            }
        }, {once : true});
    }
    if(e.touches[0].clientX-touchXBufor<-50)
    {
        document.querySelector("main").addEventListener("touchend", ()=>
        {
            switch(window.location.href)
            {
                case "https://localhost/index.html": 
                window.location.assign("../history.html");
                break;
                case "https://localhost/raport.html": 
                window.location.assign("../index.html");
                break;
                case "https://localhost/history.html":
                break;
            }
        }, {once : true});   
    }
});

document.addEventListener("deviceready", ()=>
{
    document.addEventListener("backbutton", ()=>
    {
        if (window.location.href!="https://localhost/index.html") window.location.assign("../index.html");
    });
});