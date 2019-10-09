import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'twid-pwa';

  public showMyMessage = false

  showMessageSoon() {
    setTimeout(() => {
      this.showMyMessage = true
    }, 3000)
  }
}
