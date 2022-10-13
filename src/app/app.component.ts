import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string = 'MSAL';
  isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private _MsalService: MsalService) { }

  ngOnInit(): void {
    this._MsalService.instance.handleRedirectPromise().then((res) => {
      if (res && res.account) {
        this._MsalService.instance.setActiveAccount(res.account);
        this.isLoggedIn$.next(!(this._MsalService.instance.getActiveAccount() === null));
      } else {
        this._MsalService.loginRedirect()
      }
    }, (err) => { console.log(err) })
  }
}
