var backUp = [];

function backUpImplement()
{
    backUp.forEach(month => 
    {
        month = JSON.parse(month);
        createNewFile((parseInt(new Date(month[0].date).getMonth())+1)+"-"+new Date(month[0].date).getFullYear()+".json", JSON.stringify(month));
        navigator.notification.alert("Udało się odczytać kopię!", null, "Sukces")
    });
}

document.querySelector("#copyCreator").addEventListener("click", ()=>
{
    createBackup("asystentPionieraBackUp");
});

document.querySelector("#copyAccept").addEventListener("click", ()=>
{
    
    navigator.notification.confirm("Czy jesteś pewien? Dane z aplikacji zostaną nadpisane?", function(buttonIndex)
        {
            if (buttonIndex==1) readBackUp("asystentPionieraBackUp");
        }, "Potwierdź", ["Tak", "Nie"]);
});


document.querySelector("#accNum").addEventListener("click", ()=>
{
    var text = document.querySelector("#accNum span").innerHTML;
    cordova.plugins.clipboard.copy(text);
    document.querySelector("#accNum span").innerHTML = "<B style = 'color:black; font-size:120%;'>Skopiowano</B>";
    setTimeout(()=>{document.querySelector("#accNum span").innerHTML = text},2000)
});