import Rx from 'rxjs';

const canvas  = document.getElementById('canvas');
const context = canvas.getContext('2d');
const move$ = Rx.Observable.fromEvent(canvas, 'mousemove');

console.log(Rx);

move$
    .map((e)=>{
        return {x: e.offsetX, y: e.offsetY}
    })
    .bufferCount(2)
    .subscribe(([first, sec])=>{
        context.moveTo(first.x, first.y);
        context.lineTo(sec.x, sec.y);
        context.stroke();
    });
