import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import  OktaSignIn from '@okta/okta-signin-widget';



import shopickAppConfig from '../config/shopick-app-config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  oktaSignin: any;

  constructor(private oktaAuthService: OktaAuthService) { 

    this.oktaSignin = new OktaSignIn({
      logo: 'assets/Logo/SHOPICK LOGO Banner sm.png',
      baseUrl: shopickAppConfig.oidc.issuer.split('/oauth2')[0],
      clientId: shopickAppConfig.oidc.clientId,
      redirectUri: shopickAppConfig.oidc.redirectUri,
      authParams: {
        pkce: true,
        issuer: shopickAppConfig.oidc.issuer,
        scopes: shopickAppConfig.oidc.scopes
      }
    });

  }

  ngOnInit(): void {
    this.oktaSignin.remove();

    this.oktaSignin.renderEl({
      el: '#okta-sign-in-widget'}, // this name should be same as div tag id in login.component.html
      (response:any) => {
        if (response.status === 'SUCCESS') {
          this.oktaAuthService.signInWithRedirect();
        }
      },
      (error:any) => {
        throw error;
      }
    );
  }

}
