import { trigger, state, style, transition, animate } from "@angular/core";

export let animation = {
  host: {
    '[@slideInOutright]': 'true',
    'style': 'display:inline-block'
  },
  animations: [

    trigger('slideInOutright', [

      state('true', style({ transform: 'translateX(0)' })),

      transition('void => *', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('251ms 500ms', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition('* => void', [
        style({transform: 'translateX(0)', opacity: 1}),
        animate('250ms', style({transform: 'translateX(-100%)', opacity: 0}))
      ])
    ])
  ]
}
