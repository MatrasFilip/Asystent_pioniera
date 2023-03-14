function makeRaport()
{
    document.querySelector('#raportH2 span').innerHTML = currentMonth.name;
    document.querySelector('tr:nth-child(1) td:nth-child(2)').innerHTML =currentMonth.publications;
    document.querySelector('tr:nth-child(2) td:nth-child(2)').innerHTML =currentMonth.films;
    document.querySelector('tr:nth-child(3) td:nth-child(2)').innerHTML =currentMonth.hours;
    document.querySelector('tr:nth-child(4) td:nth-child(2)').innerHTML =currentMonth.visits;
    document.querySelector('tr:nth-child(5) td:nth-child(2)').innerHTML =currentMonth.studies;
    document.querySelector('textarea').innerHTML = currentMonth.remarks;
    document.querySelector('textarea').style.height = (document.querySelector('textarea').scrollHeight) + "px";

    document.querySelector("#minutes").classList.remove("visible");
    document.querySelector("#ldpbHours").classList.remove("visible");
    document.querySelector("#ldpbMinutes").classList.remove("visible");

    if (currentMonth.minutes%60!=0)
    {
        document.querySelector("#minutes").classList.add("visible");
        document.querySelector("#minutes #value").innerHTML = currentMonth.minutes%60;
    }
    if (currentMonth.ldpbHours!=0)
    {
        document.querySelector("#ldpbHours .value").innerHTML = currentMonth.ldpbHours;
        document.querySelector("#ldpbHours").classList.add("visible");
    }

    if (currentMonth.ldpbMinutes!=0)
    {
        document.querySelector("#ldpbMinutes .value").innerHTML = currentMonth.ldpbMinutes;
        document.querySelector("#ldpbMinutes").classList.add("visible");
    }
}
document.querySelector('textarea').addEventListener('input', ()=>
{
    currentMonth.updateScore("remarks", document.querySelector('textarea').value, today);
});