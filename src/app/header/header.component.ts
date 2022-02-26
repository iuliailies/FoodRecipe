import { Component, EventEmitter, Output, OnInit, OnDestroy
} from "@angular/core";
import { DataStorageService } from "../shared/data-storage.server";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs/internal/Subscription"; 

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
}) 
export class HeaderComponent implements OnInit, OnDestroy{

    constructor (private dataStorageService: DataStorageService, private authService: AuthService) {}

    collapsed = true;
    private userSub: Subscription;
    isAuthenticated = false;

    
    ngOnInit(): void {
        // set up subscription to user
        this.userSub = this.authService.user.subscribe(user => {
            // null if not logged in, exists if we are
            this.isAuthenticated = !user ? false : true;
        });
    }

    onSaveData() {
        this.dataStorageService.storeRecipes();
    }

    onFetchData() {
        this.dataStorageService.fetchRecipes().subscribe();
    }

    onLogout() {
        this.authService.logout();
    }

    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }



}