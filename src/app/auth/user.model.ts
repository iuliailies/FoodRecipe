
export class User {
    constructor(
        private email: string, 
        id: string, 
        private _token: string, 
        private _tokenExpirationDate: Date) {}

    get token() {
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) // token expired
            return null;
        return this._token;
    }
}