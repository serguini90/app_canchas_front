import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tabs-footer',
  templateUrl: './tabs-footer.page.html',
  styleUrls: ['./tabs-footer.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterModule]
})
export class TabsFooterPage implements OnInit {
  
  indicadorProveedor: string;
  
  constructor() { 
    this.indicadorProveedor = localStorage.getItem('indicadorProveedor') ?? '0';
  }

  ngOnInit() {
  }

}
