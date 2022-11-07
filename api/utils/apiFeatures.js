//! Building query
class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filter() {
        const queryObj = {...this.queryString}
        const excludedFields = ['page', 'sort', 'limit', 'fields']
        excludedFields.forEach(el => delete queryObj[el])

        // 1.b. Filtering 
        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
        console.log(JSON.parse(queryStr))
        // gtr, gt, lte ,lt

        this.query = this.query.find(JSON.parse(queryStr))
        // let query = Tour.find(JSON.parse(queryStr));

        return this
    }

    sort() {
        // 2) Sorting
        if(this.queryString.sort) {
            
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy)
        } else {
            this.query = this.query.sort('-createdAt')
        }

        return this
    }
    limitFields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields)
        } else {
            this.query = this.query.select('-__v')
        }
        return this
    }

    paginate() {
        // 4) Pagination
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 100;
        const skip = (page -1) * limit

        this.query = this.query.skip(skip).limit(limit)

        return this;
    }

}

module.exports = APIFeatures