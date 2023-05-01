import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { PreferencesService } from 'src/app/infraestructure/preferences.service';
import { ApiInterceptor } from 'src/app/http/api.interceptor';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DashboardPage implements OnInit {

  esProovedor?: boolean;

  constructor(private router: Router, private preferenceService: PreferencesService) { }

  async ngOnInit() {
    const valorProovedor = await this.preferenceService.getItem('indicadorProveedor');
    this.esProovedor = !!valorProovedor && valorProovedor === '1';
  }

  async cerrarSesion(){
    ApiInterceptor.token = null;
    await this.preferenceService.removeItem('token');
    this.router.navigate( [ '/' ] );
  }

}
