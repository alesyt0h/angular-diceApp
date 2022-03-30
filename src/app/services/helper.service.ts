import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class HelperService {

    constructor() { }

    isHttpErrorResponse(object: any): object is HttpErrorResponse {
        return 'error' in object;
    }
}
