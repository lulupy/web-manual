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

const down$ = Rx.Observable.fromEvent(canvas, 'mousedown').map(()=>'down');
const up$ = Rx.Observable.fromEvent(canvas, 'mouseup').map(()=>'up');

const downAndUp$ = down$.merge(up$)
    .switchMap(action =>{
        return action === 'down' ? diff$ : Rx.Observable.empty()
    });


function draw([first, sec]){
    context.moveTo(first.x, first.y);
    context.lineTo(sec.x, sec.y);
    context.stroke();
}

downAndUp$.subscribe(draw);
