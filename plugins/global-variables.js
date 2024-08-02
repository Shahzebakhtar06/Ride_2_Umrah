
export default (context, inject) => {
  const obj = {
    // imgBasePath:"http://192.168.28.235/expedia/public/",
    imgBasePath: "https://expedia-api.savvyskymart.com/public/",
    priceSymbol: "$",
  };
  inject("global", obj);
};
