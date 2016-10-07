import { Component} from '@angular/core';
import { NavController } from 'ionic-angular';

import { GameService } from '../../app/game.service';

import { HomePage } from '../home/home';


@Component({
  selector: 'page-level',
  templateUrl: 'level.html',
})
export class LevelPage  {

  constructor(public navCtrl:NavController,public gameService : GameService) {}


  Return() : void{
    this.navCtrl.push(HomePage);
  }

}