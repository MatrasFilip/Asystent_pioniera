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
Date.prototype.getProperty = function(property, scores)
{
    var getted = false;
    if (property == "remarks"|| property == "notes") var searchedProperty = "";
    else searchedProperty = 0;
    scores.forEach((date)=>
    {
        if (date.match(new RegExp("day:"+this.getDate()+",")))
        {
            if (property!="remarks")
            {
                if (property == "notes")
                {
                    if (date.match(/notes[\s\S]*&/)) searchedProperty = date.match(/notes[\s\S]*&/).toString().replace(/&$/, "").replace("notes:", "");
                }
                else
                {
                    date = date.split(",");
                    date.forEach((prop)=>
                    {
                        if (prop.match(property))
                        {
                            prop = prop.split(":");
                            searchedProperty =  prop[1];
                        }
                    })
                }
                getted = true;
            }
        }
    });
    if (!getted&&(property=="remarks"))
    {
        scores.forEach((segment)=>
        {
            if(segment.match(/remarks[\s\S]*&/)) searchedProperty = segment.match(/remarks[\s\S]*&/).toString().replace(/&$/, "").replace("remarks:", "");
        })
    }
    return searchedProperty;
}

class Month
{
    constructor(scores, number)
    {
        this.number = parseInt(number.getMonth())+1;
        this.year = number.getFullYear();        
        this.scores = scores.split(";");
        this.name = this.getName(this.number);

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

        this.file = (parseInt(this.days[1].getMonth())+1) + "-" + this.days[1].getFullYear() + ".txt"

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
            if (this.days[i].getMonth()+1==this.number)
            {
                this.days[i].publications = this.days[i].getProperty("publications", this.scores);
                this.publications += parseInt(this.days[i].publications);
                this.days[i].films = this.days[i].getProperty("films", this.scores);
                this.films += parseInt(this.days[i].films);
                this.days[i].hours = this.days[i].getProperty("hours", this.scores);
                this.hours += parseInt(this.days[i].hours);
                this.days[i].minutes = this.days[i].getProperty("minutes", this.scores);
                this.minutes += parseInt(this.days[i].minutes);
                this.days[i].visits = this.days[i].getProperty("visits", this.scores);
                this.visits += parseInt(this.days[i].visits);
                this.days[i].studies = this.days[i].getProperty("studies", this.scores);
                this.studies += parseInt(this.days[i].studies);
                this.days[i].ldpbHours = this.days[i].getProperty("ldpbHours", this.scores);
                this.ldpbHours += parseInt(this.days[i].ldpbHours);          
                this.days[i].ldpbMinutes = this.days[i].getProperty("ldpbMinutes", this.scores);
                this.ldpbMinutes += parseInt(this.days[i].ldpbMinutes);          
                this.days[i].notes = this.days[i].getProperty("notes", this.scores);
                this.length = i;
            }
        }
        this.remarks = this.days[1].getProperty("remarks",this.scores);
        if (this.minutes>=60) this.hours += Math.floor(this.minutes/60);
    }

    updateScore(property, score, day, alert = true)
    {
        if ((score==null || !score || isNaN(score)) && property!="remarks" && property!="notes") score = 0;
        var updated = false;
        if (property== "remarks")
        {
            this.scores.forEach((segment, i)=>
            {
                if (segment.match(property))
                {
                    var propBufor = segment.split(":");
                    propBufor[1] = score;
                    propBufor[1]+="&";
                    propBufor[1] = propBufor[1].replace(/;/g, "");
                    this.scores[i] = propBufor[0]+":"+propBufor[1];
                    updated = true;
                }
            })
            if (!updated)
            {
                this.scores[0]="remarks:"+score.replace(/;/g, "")+";"+this.scores[0];
                    
                var scoreBufor = this.scores.join(';');
                this.scores = scoreBufor.split(";");
                updated = true;
            }
        }
        else
        {
                if (property == "minutes")
                {
                    var allMinutes = parseInt(this.days[day].minutes)+parseInt(score);
                    var calcHours = Math.floor(allMinutes/60);
                    score = (allMinutes%60)-parseInt(this.days[day].minutes);
                }
                if (property == "ldpbMinutes")
                {
                    var ldpbHours = Math.floor((parseInt(this.days[day].ldpbMinutes)+parseInt(score))/60);
                    this.updateScore("ldpbHours", ldpbHours, day);
                    score = ((parseInt(this.days[day].ldpbMinutes)+parseInt(score))%60)-parseInt(this.days[day].ldpbMinutes);
                }
                this.scores.forEach((date, j)=>
                {
                    if (date.match(new RegExp("day:"+day+","))||date.match(new RegExp("day:"+day+'$')))
                    {
                        if (property == "notes")
                        {
                            if (date.match(/notes[\s\S]*&/))
                            {
                                var notesBufor = date.match(/notes[\s\S]*&/).toString()
                                date = date.replace(notesBufor, "notes:"+score.replace(/;/g, "")+"&");
                            }
                            else date +=",notes:"+score.replace(/;/g, "")+"&";
                            this.scores[j]=date;
                            updated = true;
                        }
                        else
                        {
                            date = date.split(",");
                            var dateBufor = "";
                            date.forEach((prop, i)=>
                            {
                                if (prop.match(property))
                                {
                                    prop = prop.split(":")
                                    if (property!="notes") prop[1] = parseInt(prop[1])+parseInt(score);
                                    else prop[1] = prop[1]+score;
                                    prop = prop[0]+":"+prop[1];
                                    updated = true;
                                }
                                dateBufor += prop;
                                if (i != (date.length-1)) dateBufor +=',';
                            })
                            if (!updated)
                            {
                                dateBufor +=","+property+":"+score;
                                updated = true;
                            }
                            this.scores[j] = dateBufor;
                        }
                    }
                })
                if (!updated)
                {
                    this.scores[this.scores.length]="day:"+day;
                    this.updateScore(property, score, day);
                }

        }
        
        try{this.generateProperties();}catch(err){alert(err.message)}
        updated = false;
        document.addEventListener("deviceready", () =>
        {
            fileWrited = false;
            try
            {
                if (alert==true)document.querySelector("#loadingScreen").style.display = "block";
            }
            catch(err){}
            createNewFile(this.file, this.scores.join(";"));
        }, {once: true});

        if (property=="minutes"&&calcHours!=0) 
        {
            if (fileWrited==true) try{this.updateScore("hours", calcHours, day);}catch(err){alert(err.message)}
            else
            {
                const writing = setInterval(() => 
                {
                    if (fileWrited==true) 
                    {
                        try
                        {
                            this.updateScore("hours", calcHours, day);
                            clearInterval(writing);
                        }
                        catch(err){alert(err.message)}
                    }
                    }, 10);
            }
        }
    }
    
}


document.addEventListener("deviceready",()=>
{
    readCurrentMonthFromFile((parseInt(today.getMonth())+1) + "-" + today.getFullYear() + ".txt", today);
    readTimeBuforFromFile("timeBufor.txt");

}, false);

var today = new Date();
var currentMonth = "";

const tx = document.getElementsByTagName("textarea");
for (let i = 0; i < tx.length; i++) 
{
  //tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px;");
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