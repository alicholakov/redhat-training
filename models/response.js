class Response {
    
    constructor(data, errors = {}) {
        this.data = data
        this.errors = errors
    }
}

module.exports = Response