import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { AuthService } from '../auth.service';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';


interface FeaturedPhotosUrls {
  url1?: string;
  url2?: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  featuredPhotoStream: FirebaseObjectObservable<FeaturedPhotosUrls>;

  constructor(private db: AngularFireDatabase, public auth: AuthService) {

    this.featuredPhotoStream = this.db.object('/photos');
  }

  login() 
  {
    this.auth.login();
  }

}
