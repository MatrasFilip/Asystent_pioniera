var fileWrited = true;
//errors
function onErrorLoadFs(e)
{
    alert("error with filesystem. Number: "+e.code);
    try
            {
                setTimeout(function(){document.querySelector("#loadingScreen").style.display = "none"}, 500);
            }
            catch(err){}
}

function onErrorCreateFile(e)
{
    alert("error with creating file. Number: "+e.code);
    try
            {
                setTimeout(function(){document.querySelector("#loadingScreen").style.display = "none"}, 500);
            }
            catch(err){}
}

function onErrorReadFile(e)
{
    alert("error with reading file. Number: "+e.code);
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
            if (e.target.error.code==2)
            {
                alert("Aplikacja potrzebuje dostępu do pamięci! Proszę udzielić go w ustawieniach telefonu");
            }
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
                                    dirEntry.getFile(fileName+".json", { create: true, exclusive: false }, function (fileEntry) 
                                        {
                                            writeFile(fileEntry, fileData);
                                            if (fileName!="")
                                            {
                                                window.plugins.socialsharing.shareWithOptions(
                                                    {
                                                        message: "Kopia zapasowa aplikacji Asystent pioniera",
                                                        files:[cordova.file.dataDirectory+fileName+".json"]
                                                    }, null, function(result)
                                                    {
                                                        navigator.notification.alert("Nie udało się znaleźć kopii na urządzeniu. Sprawdź folder 'pobrane', lub zezwól aplikacji na dostęp do pamięci urządzenia. Następnie spróbuj ponownie", null, "BŁĄD: '"+result+"'")
                                                    });
                                            }
                                        
                                        }, onErrorCreateFile);
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
    cordova.wavemaker.filePicker.selectFiles(false, // to select multiple files
    function(selectedFilePaths) 
    {
        window.resolveLocalFileSystemURL(selectedFilePaths[0].replace(new RegExp(fileName + "_*[0-9]*.json"), ""), function (dirEntry)
        {
            try{
                    dirEntry.getFile((selectedFilePaths[0].match(new RegExp(fileName + "_*[0-9]*.json"))[0]), { create: true, exclusive: false }, function (fileEntry) 
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

                            reader.onerror = function(e)
                            {
                                alert("error with reading file. Number: "+e.code);
                            };

                            reader.readAsText(file);

                        }, onErrorReadFile);

                    }, onErrorCreateFile);
                }catch(err)
                {
                    navigator.notification.alert("Wybierz plik o nazwie: "+fileName+".json", null, "Nieprawidłowy plik!");
                }
        }, onErrorLoadFs)
    }, function(error) 
       {
            if (error==1) navigator.notification.alert("Aby odczytać kopię zapasową, niezbędny jest dostep aplikacji do pamięci urządzenia", null, "Udziel dostępu do pamięci!");
       });
}

function testPermissions()
{
    var permissions = cordova.plugins.permissions;

    

    permissions.checkPermission("android.permission.WRITE_EXTERNAL_STORAGE", success, error);

function error() {
    permissions.requestPermission("android.permission.WRITE_EXTERNAL_STORAGE", ()=>{}, ()=>
    {
        console.warn('write_external_storage permission is not turned on')
    })
}

function success( status ) {
  if( !status.hasPermission ) error();
}
}