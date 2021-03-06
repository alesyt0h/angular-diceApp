import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { GameService } from '../../services/game.service';
import { ThrowsResponse, Throw } from '../interfaces/throw';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { HelperService } from '../../services/helper.service';

@Component({
    selector: 'app-throws',
    templateUrl: './throws.component.html',
    styleUrls: ['./throws.component.css']
})
export class ThrowsComponent implements OnInit, AfterViewChecked {

    throws: Throw[] = [];
    winningPercentage: number = 0;
    pageOfItems!: Array<any>;

    constructor(
        private _gameService: GameService,
        private _helper: HelperService
    ){}

    ngAfterViewChecked(): void {
        this.changeJwPaginationText();
    }

    ngOnInit(): void {
        this._gameService.throws(this._gameService.getUserId).subscribe((resp: ThrowsResponse | HttpErrorResponse) => {
            if(this._helper.isHttpErrorResponse(resp)){
                Swal.fire('Error',resp.error.message,'error')
            } else {
                this.throws = resp.throws;
                this.winningPercentage = resp.winning_percentage;
            }
        });
    }

    onChangePage(pageOfItems: Array<any>) {
        this.pageOfItems = pageOfItems;
    }

    getUserId(){
        return this._gameService.getUserId;
    }

    changeJwPaginationText(){
        const previous = document.querySelector('.previous-item a');
        const next = document.querySelector('.next-item a');

        if(previous && next){
            previous.innerHTML = '<';
            next.innerHTML = '>';
        }
    }
}
