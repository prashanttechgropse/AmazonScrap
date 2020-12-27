const $ = require("cheerio");

const scrapper = async (html) => {
  let productDetailsArray = [];
  let imageUrls = [];
  let prices = [];
  let productNames = [];
  imageUrls = await imageUrlScrapper(html);
  prices = await priceScrapper(html);
  productNames = await nameScrapper(html);
  for (i = 0; i <= 3; i++) {
    await productDetailsArray.push({
      productName: productNames[i],
      productImageUrl: imageUrls[i],
      productPrice: prices[i],
    });
  }
  console.log(productDetailsArray);
};

//function to scrap the urls of the image of the products
const imageUrlScrapper = async (html) => {
  let array = [];
  $(".s-image", html).each(async function (i, e) {
    await array.push($(this).attr().src);
  });
  return array;
};

//function to scrap the price  of the products
const priceScrapper = async (html) => {
  let array = [];
  $(".a-price-whole", html).each(async function (i, e) {
    await array.push($(this).text());
  });
  return array;
};

//function to scrap the name  of the products
const nameScrapper = async (html) => {
  let array = [];
  $(".s-image", html).each(async function (i, e) {
    let name = $(this).attr().alt;
    name = await name.replace("Sponsored Ad - ", "");
    await array.push(name);
  });
  return array;
};

module.exports = { scrapper };
