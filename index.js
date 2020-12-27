const readline = require("readline");
const { openWebPage } = require("./services/openWebPage");
const { scrapper } = require("./services/scrapperService");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const mainFunction = () => {
  rl.question("kindly enter the keyword to search? ", async (keyword) => {
    //opens the webpage
    const page = await openWebPage(keyword);

    //returns the html content of the webpage
    let html = await page.evaluate(async () => await document.body.innerHTML);

    //scraps the requisite data
    await scrapper(html);
    mainFunction();
  });
};

mainFunction();

rl.on("close", function () {
  console.log("thanks for using the api");
  process.exit(0);
});
