/**
 * This constant is the number of level in the game
 * @type {number}
 */
export const CONST = {
    numberLevel : 4,
    lineWidth : 50,
    strokeColor : '#279fff',
    pointColor : '#ff3487',
    fontSize : 20,
    // Theses points are used to create the path
    path : [
        {
            startY : 0,
            startX : 0.35,
            ctX : -0.1,
            ctY : 0.3,
            endY : 0.13,
            endX : 0.5,
        }, {
            startY : 0.13,
            startX : 0.5,
            ctX : 1.2,
            ctY : -0.05,
            endY : 0.65,
            endX : 0.28,
        },  {
            startY : 0.65,
            startX : 0.28,
            ctX : -0.1,
            ctY : 0.95,
            endY : 1,
            endX : 0.76,
        },
    ]
};