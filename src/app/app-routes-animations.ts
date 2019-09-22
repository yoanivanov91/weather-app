import { animate, animateChild, group, query as q, style, transition, trigger } from '@angular/animations';
const query = (s,a,o={optional:true})=>q(s,a,o);

export const rightToLeft = trigger('routerTransition', [
  transition('* => *', [
    query(':enter, :leave', style({ position: 'fixed', width:'100%',height:'100%' })),
    query(':enter', style({ transform: 'translateX(100%)' })),
    
    group([
      query(':leave', [
        style({ transform: 'translateX(0%)' }),
        animate('1.0s ease-in-out', style({transform: 'translateX(-100%)'}))
      ]),
      query(':enter', [
        animate('1.0s ease-in-out', style({transform: 'translateX(0%)'})),
        animateChild()
      ])
    ]),
  ]),
]);

export const fader =
  trigger('routerTransition', [
    transition('* <=> *', [
      // Set a default  style for enter and leave
      query(':enter, :leave', [
        style({
          position: 'absolute',
          left: 0,
          width: '100%',
          opacity: 0,
          transform: 'scale(0) translateY(100%)',
        }),
      ]),
      // Animate the new page in
      query(':enter', [
        animate('600ms ease', style({ opacity: 1, transform: 'scale(1) translateY(0)' })),
      ])
    ]),
]);


export const bottomToTop = trigger('routerTransition', [
  transition('* => *', [
    query(':enter, :leave', style({ position: 'fixed', width:'100%',height:'100%' })),
    query(':enter', style({ transform: 'translateY(100%)' })),
    
    group([
      query(':leave', [
        style({ transform: 'translateY(0%)' }),
        animate('1.0s ease-in-out', style({transform: 'translateY(-100%)'}))
      ]),
      query(':enter', [
        animate('1.0s ease-in-out', style({transform: 'translateY(0%)'})),
        animateChild()
      ])
    ]),
  ]),
]);