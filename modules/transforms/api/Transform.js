class Transform {
    transformCollection(items){
        if(this.withPaginateStatus){
            return {
                [this.collecationName()] : items.docs.map(this.transform.bind(this)),
                ...this.paginateItem(items)
            }
        }
        return {[this.collecationName()] : items.map(this.transform.bind(this))};
    }

    paginateItem(items){
        return{
            total : items.totalDocs,
            limit : items.limit,
            page  : parseInt(items.page),
            pages : items.totalPages 
        }
    }

    collecationName(){
        return 'items';
    }

    withPaginate(){
        this.withPaginateStatus = true;
        return this;
    }
}
module.exports = Transform;