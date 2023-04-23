import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-new-suppliers',
  templateUrl: './new-suppliers.page.html',
  styleUrls: ['./new-suppliers.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class NewSuppliersPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
