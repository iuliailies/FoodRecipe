import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError, Subject, tap, throwError } from "rxjs";
import { User } from "./user.model";

export interface AuthResponseData {
    // from firebase restful auth api
    // format of the data we get back
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean; // optional parameter

}

@Injectable({providedIn: 'root'})
export class AuthService {
    user = new BehaviorSubject<User>(null); // we next a new user when we log in/out
    

    constructor(private http: HttpClient, private router: Router) {

    }

    signUp(email: string, password: string) {
        // send request to the signUp url
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD4nPaYsRuX6rzo9Qp5UlX_8uvfnpClC1E',
        {
            email: email,
            password: password,
            returnSecureToken: true
        }
        ).pipe(catchError(this.handleError), tap(resData => {
            this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
        }));
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD4nPaYsRuX6rzo9Qp5UlX_8uvfnpClC1E',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError), tap(resData => {
            this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
        }));
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/auth'])
    }

    private handleAuthentication(email: string, userId: string, idToken: string, expiresIn: number) {
            const expirationDate = new Date(new Date().getTime() + +expiresIn*1000);
            const user = new User(email, userId, idToken, expirationDate);
            this.user.next(user);
    }

    private handleError(errorRes: HttpErrorResponse) {
        // returns observable
        let errorMessage = 'An unknown error occured!'
        if (!errorRes.error || !errorRes.error.error) {
            // the error format is not what we want
            return throwError(errorMessage); // return observable
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email already exists!'
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'Email or password are invalid'
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'Email or password are invalid'
                break;
        }
        return throwError(errorMessage);
    }
}