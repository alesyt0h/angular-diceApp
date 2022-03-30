import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    constructor(
        public authService: AuthService,
        private _router: Router
    ){}

    ngOnInit(): void {
        this.authService.loadUser();
    }

    logout() {
        this.authService.logout().subscribe(resp => {
            this._router.navigateByUrl('/auth/login');
        });
    }

    mobileMenu() {
        if (this._router.url.includes('throws') && document.querySelector('#trash')) {
            const trash = document.querySelector('#trash');
            trash?.classList.toggle('hidden');

            const throwsContainer = document.querySelector('#throws-container');
            throwsContainer?.classList.toggle('relative');
        }

        const mobileMenu = document.querySelector('#mobile-menu-4');
        mobileMenu?.classList.toggle('hidden');
    }

    isAdmin(){
        return this.authService.getAdmin;
    }

    isHttpErrorResponse(object: any): object is HttpErrorResponse {
        return 'error' in object;
    }
}
