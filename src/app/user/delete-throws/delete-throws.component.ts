import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { HelperService } from '../../services/helper.service';

@Component({
    selector: 'app-delete-throws',
    templateUrl: './delete-throws.component.html',
    styleUrls: ['./delete-throws.component.css']
})
export class DeleteThrowsComponent implements OnInit {

    deleteForm: FormGroup = this._formBuilder.group({});

    constructor(
        private _userService: UserService,
        private _helper: HelperService,
        private _formBuilder: FormBuilder,
        private _activatedRoute: ActivatedRoute,
        private _router: Router
    ) { }

    ngOnInit(): void {
    }

    delete(){
        const id = this._activatedRoute.snapshot.params.id;

        this._userService.delete(id).subscribe((resp: {message: string} | HttpErrorResponse) => {
            if(this._helper.isHttpErrorResponse(resp)){
                Swal.fire('Error', resp.error.message, 'error');
            } else {
                Swal.fire('Success', resp.message, 'success');
                this._router.navigateByUrl('/');
            }
        });
    }

}
