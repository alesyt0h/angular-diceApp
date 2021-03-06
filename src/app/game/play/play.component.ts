import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { GameService } from '../../services/game.service';
import { Throw, ThrowResponse } from '../interfaces/throw';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { HelperService } from '../../services/helper.service';

@Component({
    selector: 'app-play',
    templateUrl: './play.component.html',
    styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

    thrown: boolean = false;
    lastThrow!: Throw;

    constructor(
        private _gameService: GameService,
        private _helper: HelperService
    ) { }

    ngOnInit(): void {
    }

    play(id: string) {
        this._gameService.play(id).subscribe((resp: ThrowResponse | HttpErrorResponse) => {
            if(this._helper.isHttpErrorResponse(resp)){
                Swal.fire('Error', resp.error.message, 'error');
            } else {
                this.thrown = true;
                this.lastThrow = resp.result;
            }
        });
    }

    getUserId() {
        return this._gameService.getUserId;
    }

}
