import { Injectable, inject } from '@angular/core';
import { Auth, User as AuthUser, GoogleAuthProvider, authState, getAdditionalUserInfo, signInWithPopup, signOut } from '@angular/fire/auth';
import { Firestore, doc, docData, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, map, of, switchMap, tap } from 'rxjs';
import { User, UserData, newUserData } from '../types/user.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private firestore = inject(Firestore);
  private auth = inject(Auth);
  private router = inject(Router);

  readonly user$ = authState(this.auth).pipe(
    switchMap((user: AuthUser) => {
      if (user) {
        return docData(doc(this.firestore, `users/${user.uid}`)).pipe(
          map((data: UserData) => ({ ...user, ...data })),
        ) as Observable<User>;
      }
      else return of(null);
    }),
  );

  async login(): Promise<void> {
    const provider = new GoogleAuthProvider();
    const credential = await signInWithPopup(this.auth, provider);

    if (getAdditionalUserInfo(credential).isNewUser) {
      await this.setUser(credential.user.uid, newUserData);
    }

    await this.router.navigateByUrl('/dashboard');
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
    await this.router.navigateByUrl('/');
  }
  
  async setUser(uid: string, data: UserData): Promise<void> {
    await setDoc(doc(this.firestore, `users/${uid}`), data);
  }
}

