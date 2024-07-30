// const imgBasePath = "https://expedia-api.savvyskymart.com/";
export default (context, inject) => {
    const obj={
        imgBasePath:"http://192.168.71.235/expedia/",
        priceSymbol:'$'
    }
  inject("global", obj);
};
