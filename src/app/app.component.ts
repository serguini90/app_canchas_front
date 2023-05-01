import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { register } from 'swiper/element/bundle';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PreferencesService } from 'src/app/infraestructure/preferences.service';
import { ApiInterceptor } from './http/api.interceptor';

register();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent implements OnInit {
  constructor(private preferenceService: PreferencesService) {}

  async ngOnInit() {
      ApiInterceptor.token = await this.preferenceService.getItem('token');
  }
}
