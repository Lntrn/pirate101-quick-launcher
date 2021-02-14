// note that the fs package does not exist on a normal browser
const fs = require("fs");

//a dialog box module from electron
const { dialog } = require("electron").remote;
const Accounts = JSON.parse(fs.readFileSync('./accounts.json', 'utf8'));

// Also note that document does not exist in a normal node environment
// button click event

function saveAccount() {

    let data = `,\n{\n"username": "${document.getElementById('username').value}",\n"password": "${document.getElementById('password').value}",\n"region": "${document.getElementById('region').value}"\n}]`


    console.log(data)

    fs.readFile("accounts.json", { encoding: 'utf8' }, (err, oldData) => {
        let newData;
        console.log(oldData + " = old")
        console.log(data)
        if (oldData !== undefined) {
            newData = oldData.replace("]", data);
        } else {
            newData = data.replace(",", "[");
        }
        fs.writeFile("accounts.json", newData, (err) => { 
            if (err) 
              console.log(err); 
            else { 
              console.log("File written successfully\n"); 
              console.log("The written has the following contents:"); 
              console.log(fs.readFileSync("accounts.json", "utf8")); 
            }
        });
    });

    //console.log()
    
    console.log("good job");
}

function old(x) {
    console.log("good job");

    let newBat = "test"//`cd /d C:\\ProgramData\\KingsIsle Entertainment\\Pirate101\\Bin\nstart Pirate.exe -U username password -L login.us.pirate101.com 12000\nexit`

    console.log(x)

    fs.writeFile("quicklauncher.bat", newBat, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("success");
        }
    })
}

async function loadAccount(form) {
    let selectedUsername = form.selectAccount.value;
    let desiredAccount;
    let accountList = [];
    fs.readFile("./accounts.json", (err, data) => {
        accountList = JSON.parse(data);
        console.log(selectedUsername)
        console.log(accountList)

        let user;
        let pass;
        let rg;

        for (acct of accountList) {
            if (acct.username === selectedUsername) {
                user = acct.username;
                pass = acct.password;
                rg = acct.region;
            }
        }

        let newBat = `cd /d C:\\ProgramData\\KingsIsle Entertainment\\Pirate101\\Bin\nstart Pirate.exe -U ${user} ${pass} -L login.${rg}.pirate101.com 12000\nexit`

        console.log(newBat)
        fs.writeFile("quicklauncher.bat", newBat, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("success");
            }
        })

        require('child_process').exec("quicklauncher.bat", function (err, stdout, stderr) {
            if (err) {
                // Ooops.
                // console.log(stderr);
                console.log(err);
            }
        
            // Done.
            console.log(stdout);
        });
    });
    //console.log(accountList)
}
