import { Injectable ,NgZone} from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { User } from '../_models/user.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: "root",
})
export class AuthService {
userData: any;
user_email :String;
user_role : String;
uid : String;
  constructor(
    private _Router: Router,
    public _AngularFirestore: AngularFirestore, // Inject Firestore service
    public _AngularFireAuth: AngularFireAuth, // Inject Firebase auth service
    public _NgZone: NgZone
  ) {}

  // Returns true when user is looged in and email is verified
  isLoggedIn(): boolean {
  return !! localStorage.getItem('user_uid');

  }






 // Sign up with email/password
  SignUp(email, password,phoneNumber) {
    return this._AngularFireAuth.createUserWithEmailAndPassword(email, password,)
      .then((result) => {
        /** Get the role updated in the role collection */
        this._AngularFirestore.collection('roles').add({
          "email":result.user.email,
          "role":'user'
        })
        /* Yeni kullanıcı kaydolduğunda user gelirse hatta mesajı ver. */
        this.sendEmailVerification();
        console.log(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }



//dashobard roter

// Sign in with email/password
 SignIn(email, password) {
    return this._AngularFireAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        if (result.user.emailVerified !== true) {
          this.sendEmailVerification();
          window.alert('Lütfen e-posta adresinizi doğrulayın. Lütfen e-mail gelen kutunuzu kontrol edin.');
        }else {
          this._NgZone.run(() => {
               /** */
                this._AngularFirestore.collection("roles", res => res.where('email', '==', result.user.email ))
                  .snapshotChanges().pipe(map(list => {
                      return list.map(item => {
                          var role = item.payload.doc.data()['role'];
                          if (role == 'user') {
                              window.alert('Lütfen Firma ile iltişime geçiniz. Adminlik satın alınız.')
                          } else
                            localStorage.setItem('user_uid', result.user.tenantId);
                          })
                      })).subscribe(data => {
                        this._Router.navigate(['']);
                      });
               }     /***  */
        )};
      }).catch((error) => {
        window.alert(error.message)
      })
  }



// Yeni kullanıcı kaydolduğunda e-posta doğrulaması gönder
sendEmailVerification() {
    var user = firebase.auth().currentUser;
    user.sendEmailVerification().then(() => {
      this._Router.navigate(['verifyemailaddress']);
    }).catch(function(error) {
      // Bir hata oluştu.
    });
}


  getuser() {
  var user = firebase.auth().currentUser;
   this.userData = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified
   }
   console.log(this.userData)
   return this.userData;
 }


  // Sign out
  SignOut() {
    return this._AngularFireAuth.signOut().then(() => {
      localStorage.clear();
      this._Router.navigate(['']);
    })
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail) {
    return this._AngularFireAuth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Şifre sıfırlama e-postası gönderildi, gelen kutunuzu kontrol edin.');
    }).catch((error) => {
      window.alert(error)
    })
  }






}


