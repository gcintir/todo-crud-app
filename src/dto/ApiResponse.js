export class ApiResponse {
    constructor(data, errorMessage) {
        this.data = data
        this.errorMessage = errorMessage
    }

    getData() {
        return this.data
    }

    getErrorMessage() {
        return this.errorMessage
    }
}
