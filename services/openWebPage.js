const puppeteer = require("puppeteer");

const openWebPage = async (keyword) => {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: false,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-infobars",
        "--disable-features=site-per-process",
        "--window-position=0,0",
        "--disable-extensions",
        '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X   10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0    Safari/537.36"',
      ],
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 800 });
    await page.goto(
      `https://www.amazon.in/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=${keyword}`,
      { waitUntil: "load", timeout: 30000 }
    );
    await page.waitForSelector("#search > div.s-desktop-width-max");
    return page;
  } catch (e) {
    console.log("Amazon scrap error-> ", e);
    await browser.close();
  }
};

module.exports = { openWebPage };
