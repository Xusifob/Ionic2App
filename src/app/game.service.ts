import { Injectable } from '@angular/core';

@Injectable()
export class GameService {

    private _currentLevel : number;
    private _width: number;
    private _height: number;
    levels = [];


    get width():number {
        return this._width;
    }

    set width(value:number) {
        this._width = value;
    }

    get height():number {
        return this._height;
    }

    set height(value:number) {
        this._height = value;
    }


    get currentLevel():number {
        return this._currentLevel;
    }

    set currentLevel(value:number) {
        this._currentLevel = value;
    }


    /**
     * Returns a point in the quadratic curve defined by the control points
     * t is a parameter from 0 to 1 : if t=0, it will return [startX,startY],
     * if t=1 it will return [endX,endY], otherwise it's an intermediate point in the curve.
     */
    bezier(startX,startY,ctX,ctY,endX,endY, t) {
        var res = [0,0];
        var points = [
            [startX,startY],
            [ctX,ctY],
            [endX,endY]
        ];
        var m = points.length-1;
        for (var i=0;i<=m;i++) {
            var coeff = this.binomial(i,m)*Math.pow(t,i)*Math.pow(1-t,m-i);
            res[0] += points[i][0]*coeff;
            res[1] += points[i][1]*coeff;
        }
        return res;
    }


    /**
     * returns (k,n) = n!/(k!(n-k)!)
     */
    private binomial(k,n) {
        return this.factorial(n)/(this.factorial(k)*this.factorial(n-k));
    }



    /**
     * returns n!
     */
    private factorial(n) {
        if (n == 0)
            return 1;
        return n*this.factorial(n-1);
    }

}