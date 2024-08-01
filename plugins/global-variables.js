
export default (context, inject) => {
  const obj = {
    // imgBasePath:"http://192.168.146.235/expedia/public/",
    imgBasePath: "https://expedia-api.savvyskymart.com/public/",
    priceSymbol: "$",
  };
  inject("global", obj);
};
