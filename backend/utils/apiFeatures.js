class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };
    //remove some field for category
    const removeFields = ["keyword", "page", "limit"];
    
    removeFields.forEach((key) => delete queryCopy[key]);
    
        //Filter for price and ratings
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  pagination(resultPerPage){
      const currentPage = Number(this.queryStr.page) || 1;
      const productSkip = resultPerPage *(currentPage-1);

      this.query = this.query.limit(resultPerPage).skip(productSkip);
      return this;
  }
}

module.exports = ApiFeatures;
