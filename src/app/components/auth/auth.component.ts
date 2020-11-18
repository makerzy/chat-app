import { Component, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { onAuthUIStateChange, CognitoUserInterface, AuthState } from '@aws-amplify/ui-components';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  
})
export class AuthComponent implements OnInit, OnDestroy {
 title = 'ionic-angular-auth';
  user: CognitoUserInterface | undefined;
  authState: AuthState;
  constructor(private ref: ChangeDetectorRef) {}

  ngOnInit() {
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData as CognitoUserInterface;
      if (!this.ref['destroyed']) {
        this.ref.detectChanges();
      }
    })
  }

  ngOnDestroy() {
    return onAuthUIStateChange;
  }
}
