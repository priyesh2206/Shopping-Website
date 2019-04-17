import { Component, OnInit } from '@angular/core';
import { FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';





interface FeaturedPhotosUrls {
  url1?: string;
  url2?: string;
}

@Component({
  selector: 'app-developers',
  templateUrl: './developers.component.html',
  styleUrls: ['./developers.component.css']
 
})


export class DevelopersComponent implements OnInit {

  myStyle: object = {};
  myParams: object = {};
  width: number = 100;
  height: number = 100;

  featuredPhotoStream: FirebaseObjectObservable<FeaturedPhotosUrls>;

  constructor(private db: AngularFireDatabase) { 
    this.featuredPhotoStream = this.db.object('/photos');
  }

   ngOnInit() {
     
     this.myStyle = {
       'position': 'fixed',
       'width': '100%',
      'height': '100%',
      'z-index': '0',
      'top': 0,
      'left': 0,
      'right': 0,
      'bottom': 0,
  };

  this.myParams = {
    "particles": {
      "number": {
        "value": 150,
        "density": {
          "enable": true,
          "value_area": 900
        }
      },
      "color": {
        "value": ["#aa73ff", "#f8c210", "#83d238", "#33b1f8"]
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 15
        }
      },
      "opacity": {
        "value": 1,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1.5,
          "opacity_min": 0.15,
          "sync": false
        }
      },
      "size": {
        "value": 3.0,
        "random": false,
        "anim": {
          "enable": true,
          "speed": 3,
          "size_min": 0.15,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 110,
        "color": "#2822e5",
        "opacity": 0.4,
        "width": 1.5
      },
      "move": {
        "enable": true,
        "speed": 1.6,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": false,
          "mode": "repulse"
        },
        "onclick": {
          "enable": false,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
};
}
}
