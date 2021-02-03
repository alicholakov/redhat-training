class Response {
    
    constructor(data, errors) {
        this.data = data
        this.errors = errors
    }

    static withError = (error) => new Response({}, error)
    static withData = (data) => new Response(data, {})
}

module.exports = Response