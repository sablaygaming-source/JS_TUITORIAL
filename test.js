fs = require("node:fs/promises");
inpStr = require("prompt-sync")();

async function fPrintStr(pStr) {
    process.stdout.write(pStr);
}

function fArrToCsv(pArr) {

    head = Object.keys(pArr[0]).join(',');
    console.log("\ndebug head ", head);
    let ret = "";

    ret = pArr.map((item) => {
        subRet = Object.values(item).join(',');
        return subRet;
    }).join('\n');

    head.replaceAll('\n00A0', '');
    return head + '\n' + ret;

    /* global variable version 
    pArr.forEach((item) => {
        ret = ret + Object.values(item).join(',') + '\n';
        //return ret;
    });
    */
    //console.log("\ndebug retSecond ", retSecond);
    //console.log("\ndebug retData ", retData);

}

function fCsvToArr(pStr) {//2
    if (pStr.length === 0) {
        fPrintData("\nRSM Error string must be csv type.");
    }
    const befHead = pStr.split("\r\n");

    console.log("\ndebug befHead ", befHead);

    const head = befHead[0].split(",");

    /*befHead.forEach((item, index) => {
        befHead[index] = item.split('\r');
    });*/

    //console.log("\ndebug befHead ", befHead);
    let data = [];
    let i = 0;
    const retData = befHead.map((item, index) => {
        if (index != 0) {
            console.log();
            rowStr = item.split(",");
            data.push({});
            //console.log("\ndebug rowStr ", rowStr);
            subData = {};
            rowStr.forEach((item, index) => {
                data[i][head[index]] = item; //im use for test only it give byreference
                subData[head[index]] = item; //i use one by one assigning to avoid byreference
            });
            i += 1;

            //console.log("\ndebug data ", data);
            return subData;
        } else return null;
        //return data[index];
    })

    console.log("\ndebug retdata ", retData);

    return data;
}//2
async function fReadData(pFile) {//2
    try {//3
        sContent = await fs.readFile(pFile, "utf8");
        console.log("\ndebug sContent ", sContent);
        const dArr = fCsvToArr(sContent);

        return dArr;
    } catch (err) {//3
        fPrintStr("\nRSM Erorr: " + err.message + err.name);
    }//3
    return [];
}//2
async function fAdd(pData, pIdKey) {//2
    pData();
    while (true) {//3
        fPrintStr("\n\nSell Menu\ns sell\nview\nb back");
        ch = inpStr();
        switch (ch.toLowerCase()) {//4
            case 's':

                break;
        }//4
        if (ch == 'b') {//5
        }//5
    }//3    
}//2

function fTest() {
    data = [{ id: "1", item: "soap" }, { id: "2", item: "salt" }];
    subS = Object.keys(data).join(',');
    //let cleanedString = subS.replace(/\u00A0/g, '');
    let cleanedString = subS.replace('\u00A0', '');

    //let cleanedString = subS.replace(/\s/g, '');
    console.log("\naacleanedString|" + cleanedString + "|");

}

//console.log("\nsubS|", subS, "|");


async function main() {//2
    //asuming all database has initialize array [ ]
    //idKey date id item pcs amount totalAmount
    let data = [];
    let stocksData = [];
    stocksData = await fReadData("stocks.csv");
    console.log("\ndebug stocksData ", stocksData);

    const outCome = fArrToCsv(stocksData);

    console.log("\ndebug outCome", outCome);

    fTest();
    //asuming sIdKey has initial to 0 

    while (true) {//3
        fPrintStr("\n\nMain Menu\na add\nq exit  ");
        ch = await inpStr();

        if (ch.toLowerCase() == 'q') {//4
            break;
        } else if (ch.toLowerCase() == 'a') {//4
            fadd(pData, sIdKey);
            break;
        }//4
    }//3      
    console.log("\n\nexit prog... ");
}//2
main();