import { Component, inject } from '@angular/core';
import { AuthStateService } from '../shared/services/auth-state.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styles: ``
})
export default class DashboardComponent {

  private authStateService = inject(AuthStateService);

  signOut(){
    this.authStateService.signOut();
  }

}
