const fetch = require("node-fetch");
const { printLog } = require("../console_messages/console-msg");

const testUrl = async (urlArray, filterResult = null) => {
  const protocolRegex = /^www(.+)/gi;
  if(filterResult != 200) process.exitCode = 1;
  for (let url of urlArray) {
    if (protocolRegex.test(url)) {
      url = "https://" + url;
    }

    fetch(url, { method: "head", timeout: 1500 })
    .then((urlTest) => {
      if(filterResult === null){
        if (urlTest.status == 200) printLog(`URL: ${url} Status: 200`, 200);
        else if (urlTest.status == 400 || urlTest.status == 404){ 
         printLog(`URL: ${url} Status: 400`, 400);
         process.exitCode = 1;
        }
        else {
          process.exitCode = 1;
          printLog(`URL: ${url} Status: Unknown`, 9999); 
        }
      }
      else {  
        if((urlTest.status == filterResult) || (filterResult == 400 && urlTest.status == 404)) printLog(`URL: ${url} Status: ${filterResult}`, filterResult);
        else if((filterResult == 9999) && urlTest.status != 200 && urlTest.status && 400 && urlTest.status != 404 ) printLog(`URL: ${url} Status: Unknown`, 9999);
      }
    })
    .catch((error) => {
      if(!filterResult){
        printLog(`URL: ${url} Status: 400`, 400);
      }
    });
  }
};

module.exports = {
  testUrl,
};