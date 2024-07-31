// const imgBasePath = "https://expedia-api.savvyskymart.com/";
export default (context, inject) => {
    const obj={
        // imgBasePath:"http://192.168.243.235/expedia/",
        imgBasePath:"https://expedia-api.savvyskymart.com/api/",
        priceSymbol:'$'
    }
  inject("global", obj);
};
