var fileWrited = true;
//errors
function onErrorLoadFs(e)
{
    alert("Aplikacja potrzebuje dostępu do pamięci! Proszę udzielić go w ustawieniach telefonu");
    navigator.app.exitApp();
    try
            {
                setTimeout(function(){document.querySelector("#loadingScreen").style.display = "none"}, 500);
            }
            catch(err){}
}

function onErrorCreateFile(e)
{
    alert("error number: "+e.code);
    try
            {
                setTimeout(function(){document.querySelector("#loadingScreen").style.display = "none"}, 500);
            }
            catch(err){}
}

function onErrorReadFile(e)
{
    alert("error number: "+e.code);
    try
            {
                setTimeout(function(){document.querySelector("#loadingScreen").style.display = "none"}, 500);
            }
            catch(err){}
}





//functions
function writeFile(fileEntry, dataObj)
{
    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter(function (fileWriter)
    {
        fileWriter.onwriteend = function()
        {
            console.log("Successful file write...");
            try
            {
                setTimeout(function(){document.querySelector("#loadingScreen").style.display = "none"}, 500);
            }
            catch(err){alert(err.message)}
            fileWrited = true;
        };

        fileWriter.onerror = function (e)
        {
            alert("Failed file write: " + e.toString());
        };

        // If data object is not passed in,
        // create a new Blob instead.
        if (!dataObj)
        {
            dataObj = new Blob(['some file data'], { type: 'text/plain' });
        }

        fileWriter.write(dataObj);
    });
}



//main
function createNewFile(fileName, fileData)
{
    try
    {
        window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (dirEntry) {
            dirEntry.getFile(fileName, { create: true, exclusive: false }, function (fileEntry) 
            {
                writeFile(fileEntry, fileData);

            }, onErrorCreateFile);
        }, onErrorLoadFs);

    }
    catch(err)
    {
        alert(err.message);
    }
}


//ustaw obecny miesiąc na fileName
function readCurrentMonthFromFile(fileName, fileDate, updateFlag = false)
{
    try
    {
        window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (dirEntry)
        {
            dirEntry.getFile(fileName, { create: true, exclusive: false }, function (fileEntry) 
            {
                fileEntry.file(function (file)
                {
                    var reader = new FileReader();

                    reader.onloadend = function()
                    {
                        if (updateFlag == true)
                        {
                            update(this.result, fileDate);
                        }
                        else
                        {
                            console.log("Successful file read: " + this.result);
                            currentMonth = new Month(this.result, fileDate);
                            try {makeRaport();}
                            catch(err){}
                            if (currentMonth.number!=1)
                            var date = new Date (currentMonth.days[1].getFullYear()+"-"+(currentMonth.number-1)+"-1");
                            else
                            var date = new Date ((currentMonth.days[1].getFullYear()-1)+"-12-1");

                            try{readPreviousMonthFromFile((parseInt(date.getMonth())+1) + "-" + date.getFullYear() + ".json", date);}
                            catch(err){}


                            if (currentMonth.number!=12)
                            var date =  new Date (currentMonth.days[1].getFullYear()+"-"+(currentMonth.number+1)+"-1");
                            else
                            var date =  new Date ((currentMonth.days[1].getFullYear()+1)+"-1-1");

                            try{readNextMonthFromFile((parseInt(date.getMonth())+1) + "-" + date.getFullYear() + ".json", date);}
                            catch(err){}
                        }
                    };

                    reader.readAsText(file);

                }, onErrorReadFile);

            }, onErrorCreateFile);
        }, onErrorLoadFs);

    }
    catch(err)
    {
        alert(err.message);
    }
}

function readPreviousMonthFromFile(fileName, fileDate)
{
    try
    {
        window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (dirEntry)
        {
            dirEntry.getFile(fileName, { create: true, exclusive: false }, function (fileEntry) 
            {
                fileEntry.file(function (file)
                {
                    var reader = new FileReader();

                    reader.onloadend = function()
                    {
                        console.log("Successful file read: " + this.result);
                        previousMonth = new Month(this.result, fileDate);
                        try {monthChoises();}
                        catch(err){}
                        try{displayDays(currentMonth);}
                        catch(err){}
                        try{displayScores(activeDay);}
                        catch(err){}
                    };

                    reader.readAsText(file);

                }, onErrorReadFile);

            }, onErrorCreateFile);
        }, onErrorLoadFs);

    }
    catch(err)
    {
        alert(err.message);
    }
}

function readNextMonthFromFile(fileName, fileDate)
{
    try
    {
        window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (dirEntry)
        {
            dirEntry.getFile(fileName, { create: true, exclusive: false }, function (fileEntry) 
            {
                fileEntry.file(function (file)
                {
                    var reader = new FileReader();

                    reader.onloadend = function()
                    {
                        console.log("Successful file read: " + this.result);
                        nextMonth = new Month(this.result, fileDate);
                        try {monthChoises();}
                        catch(err){}
                        try{displayDays(currentMonth);}
                        catch(err){}
                        try{displayScores(activeDay);}
                        catch(err){}
                    };

                    reader.readAsText(file);

                }, onErrorReadFile);

            }, onErrorCreateFile);
        }, onErrorLoadFs);

    }
    catch(err)
    {
        alert(err.message);
    }
}

function readTimeBuforFromFile(fileName)
{
    try
    {
        window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (dirEntry)
        {
            dirEntry.getFile(fileName, { create: true, exclusive: false }, function (fileEntry) 
            {
                fileEntry.file(function (file)
                {
                    var reader = new FileReader();

                    reader.onloadend = function()
                    {
                        console.log("Successful file read: " + this.result);
                        startTime = this.result.split(",")[0];
                        startHour = this.result.split(",")[1];
                        startMinute = this.result.split(",")[2];
                        if (this.result!="-,-,-"&&this.result!="")
                        {
                            try {stoperStart();}
                            catch(err){}
                        }
                        else startTime="-";
                    };

                    reader.readAsText(file);

                }, onErrorReadFile);

            }, onErrorCreateFile);
        }, onErrorLoadFs);

    }
    catch(err)
    {
        alert(err.message);
    }
}

function readSettingsFromFile(fileName)
{
    try
    {
        window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (dirEntry)
        {
            dirEntry.getFile(fileName, { create: true, exclusive: false }, function (fileEntry) 
            {
                fileEntry.file(function (file)
                {
                    var reader = new FileReader();

                    reader.onloadend = function()
                    {
                        console.log("Successful file read: " + this.result);
                        try{settings = JSON.parse(this.result);}catch(err){}
                        try{checkUpdates();}catch(err){}
                    };

                    reader.readAsText(file);

                }, onErrorReadFile);

            }, onErrorCreateFile);
        }, onErrorLoadFs);

    }
    catch(err)
    {
        alert(err.message);
    }
}

function createBackup(fileName)
{
    var fileList = [];
    var fileData = [];
    try
    {
        window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (dirEntry)
        {
            var reader = dirEntry.createReader();

            reader.readEntries(function(entries)
            {
                entries.forEach(element => 
                {
                    var pattern = /-[0-9][0-9][0-9][0-9].json/;
                    if (element.name.match(pattern)!=null) fileList.push(element.name);
                });

                fileList.forEach((fileN, index)=>
                {
                    dirEntry.getFile(fileN, { create: true, exclusive: false }, function (fileEntry) 
                    {
                        fileEntry.file(function (file)
                        {
                            var reader = new FileReader();

                            reader.onloadend = function()
                            {
                                if (this.result!="") fileData.push(this.result);


                                if (index==fileList.length-1)
                                {
                                    window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory+"Download/", function (dirEntry) {
            
            
                                        dirEntry.getFile(fileName, { create: true, exclusive: false }, function (fileEntry) 
                                        {
                                            writeFile(fileEntry, fileData);
                                            navigator.notification.confirm("Kopia zapisana na urządzeniu. Czy chcesz ją udostępnić?", function(buttonIndex)
                                            {
                                                if (buttonIndex==1) window.plugins.socialsharing.shareWithOptions(
                                                    {
                                                        message: "Kopia zapasowa aplikacji Asystent pioniera",
                                                        files:[cordova.file.externalRootDirectory+"Download/"+fileName]
                                                    }, null, function(result)
                                                    {
                                                        navigator.notification.alert("Nie udało się znaleźć kopii na urządzeniu. Sprawdź folder 'pobrane', lub zezwól aplikacji na dostęp do pamięci urządzenia. Następnie spróbuj ponownie", null, "BŁĄD: '"+result+"'")
                                                    });
                                            }, "Co dalej?", ["Tak", "Nie"])
                                        
                                        }, onErrorCreateFile);
                                    }, onErrorLoadFs);
                                }
                            };

                            reader.readAsText(file);

                        }, onErrorReadFile);

                    }, onErrorCreateFile);
                });
                
            });

            

            
        }, onErrorLoadFs);
        
        
    }
    catch(err)
    {
        alert(err.message);
    }
}

function readBackUp(fileName)
{
    try
    {
        window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory+"Download/", function (dirEntry)
        {
            dirEntry.getFile(fileName, { create: true, exclusive: false }, function (fileEntry) 
            {
                fileEntry.file(function (file)
                {
                    var reader = new FileReader();

                    reader.onloadend = function()
                    {
                        console.log("Successful file read: " + this.result);
                        try{backUp = JSON.parse(this.result);}catch(err){}
                        try{backUpImplement();}catch(err){}
                    };

                    reader.readAsText(file);

                }, onErrorReadFile);

            }, onErrorCreateFile);
        }, onErrorLoadFs);

    }
    catch(err)
    {
        alert(err.message);
    }
}