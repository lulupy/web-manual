import Rx from 'rxjs';

const canvas  = document.getElementById('canvas');
const context = canvas.getContext('2d');
const move$ = Rx.Observable.fromEvent(canvas, 'mousemove')
    .map((e)=>{
        return {x: e.offsetX, y: e.offsetY}
    });

const diff$ = move$
    .zip( move$.skip(1), (first, sec)=>{
        return [first, sec];
    } );

const down$ = Rx.Observable.fromEvent(canvas, 'mousedown');
const up$ = Rx.Observable.fromEvent(canvas, 'mouseup');

function draw([first, sec]){
    context.moveTo(first.x, first.y);
    context.lineTo(sec.x, sec.y);
    context.stroke();
}

down$.switchMapTo(diff$)
    .subscribe(draw);
