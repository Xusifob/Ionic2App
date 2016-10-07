import { Component,ViewChild,AfterViewInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LevelPage } from '../level/level';

import { CONST } from '../../app/app.settings';
import { GameService } from '../../app/game.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements AfterViewInit{

  constructor(public navCtrl: NavController, public gameService: GameService) {}

  context:CanvasRenderingContext2D;
  @ViewChild("game") game;

  width: number = window.innerWidth;
  height: number = window.innerHeight + CONST.lineWidth;


  /**
   * When the view is init
   */
  ngAfterViewInit() {

    let canvas = this.game.nativeElement;
    this.context = canvas.getContext("2d");

    // Init the canvas
    var ctx = this.context;

    // Init canvas data
    ctx.canvas.width = this.width;
    ctx.canvas.height = this.height;
    ctx.lineWidth = CONST.lineWidth;
    ctx.strokeStyle = CONST.strokeColor;

    // Generate the path
    for (var i = 0; i < CONST.path.length; i++) {

      this.generatePath(
          ctx,
          CONST.path[i].startX,
          CONST.path[i].startY,
          CONST.path[i].ctX,
          CONST.path[i].ctY,
          CONST.path[i].endX,
          CONST.path[i].endY
      );
    }


    // Generate all the points
    for(var i=0;i<CONST.numberLevel;i++){

      var x = 0.5 + (i+0.5-CONST.numberLevel/2)/CONST.numberLevel; // x is between 0 and 1
      var j = Math.floor(x*(CONST.path.length)); // The point to select
      var t = x*CONST.path.length % 1; // t is from 0 to 1, 0 for (startX,startY), 1 for (endX,endY)

      var point = this.gameService.bezier(
          CONST.path[j].startX,
          CONST.path[j].startY,
          CONST.path[j].ctX,
          CONST.path[j].ctY,
          CONST.path[j].endX,
          CONST.path[j].endY,
          t
      );
      this.generateCircle(ctx, point[0],point[1],i);
    }


  }


  /**
   * Draw a circle
   *
   * @param ctx
   * @param x
   * @param y
   * @param i
   */
  private generateCircle(ctx,x,y,i) {

    // This array is used for the click
    this.gameService.levels.push({
      x : x*this.width,
      y : y*this.height,
    });

    ctx.font = CONST.fontSize + 'px Arial';

    ctx.beginPath();
    ctx.arc(x*this.width,y*this.height,(CONST.lineWidth/2-2),0,2*Math.PI);
    ctx.fillStyle = CONST.pointColor;
    ctx.fill();
    ctx.fillStyle = CONST.strokeColor;
    ctx.fillText(i+1,x*this.width-(CONST.fontSize/4),y*this.height+(CONST.fontSize/4));
  }



  /**
   *
   * @param ctx
   * @param startX
   * @param startY
   * @param cpx
   * @param cpy
   * @param endX
   * @param endY
   */
  private generatePath(ctx: CanvasRenderingContext2D,startX:number,startY:number,cpx: number,cpy: number,endX: number,endY :number) : void {


    // Draw first path
    ctx.beginPath();
    // Starting point = top middle
    ctx.moveTo(this.width*startX,this.height*startY);

    // Ending point = bottom middle
    ctx.quadraticCurveTo(this.width*cpx ,this.height*cpy ,this.width*endX ,this.height*endY);
    ctx.stroke();

  }



  /**
   * Event on click on the canvas
   * @param event
   */
  onClick(event){

    var x = event.clientX;
    var y = event.clientY;

    // The radius is bigger on purpose, to make sure the click on touchscreen is properly done
    var radius = CONST.lineWidth;

    for(var i =0;i<this.gameService.levels.length;i++){

      var level = this.gameService.levels[i];

      // If the user click on a level
      if(x >= level.x - radius && x <= level.x + radius && y >= level.y - radius && y <= level.y + radius){


        this.gameService.currentLevel = i+1;

        this.navCtrl.push(LevelPage);

        break;
      }
    }
  }

}
