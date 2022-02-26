import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthResponseData, AuthService } from "./auth.service";

@Component ({
    selector: 'app-auth',
    templateUrl:'./auth.component.html'
})
export class AuthComponent {
    isLoginMode = true;
    isLoading = false;
    error: string = null;

    constructor(private authService: AuthService, private router: Router) {}

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return; // just in case, but we should not reach this
        }
        const email = form.value.email;
        const password = form.value.password;

        let authObv: Observable<AuthResponseData>;

        this.isLoading = true;

        if (this.isLoginMode) {
            authObv =  this.authService.login(email, password);
        } else {
            authObv = this.authService.signUp(email, password);
        }

        authObv.subscribe(resData => {
                console.log(resData);
                this.isLoading = false;
                this.router.navigate(['/recipes']);
            }, errorMessage => {
                // get error message from the observable
                console.log(errorMessage);
                this.error = errorMessage;
                this.isLoading = false;
            })

        form.reset();
    }
}