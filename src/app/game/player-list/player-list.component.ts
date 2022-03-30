import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { User } from '../../auth/interfaces/interfaces';
import { Players } from '../interfaces/playerList';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { HelperService } from '../../services/helper.service';

@Component({
    selector: 'app-player-list',
    templateUrl: './player-list.component.html',
    styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit, AfterViewChecked {

    loading: boolean = true;
    players: User[] = [];
    pageOfItems!: Array<any>;

    constructor(
        private _gameService: GameService,
        private _helper: HelperService
    ) { }

    ngAfterViewChecked(): void {
        this.changeJwPaginationText();
    }

    ngOnInit(): void {
        this._gameService.playerList().subscribe((resp: Players | HttpErrorResponse) => {
            if (this._helper.isHttpErrorResponse(resp)) {
                Swal.fire('Error', resp.error.message, 'error')
            } else if (resp.users) {
                this.players = resp.users;
                this.loading = false;
            } else {
                this.loading = false;
            }
        });
    }

    onChangePage(pageOfItems: Array<any>) {
        this.pageOfItems = pageOfItems;
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
