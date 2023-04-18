var fileWrited = true;
//errors
function onErrorLoadFs()
{
    alert("error with requestFileSystem");
}

function onErrorCreateFile()
{
    alert("error with getFile");
}

function onErrorReadFile()
{
    alert("error with read file");
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
                        settings = JSON.parse(this.result);
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