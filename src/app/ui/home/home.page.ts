import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage implements OnInit {
  config = {
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }
  };

  slides = [
    { title: 'Slide 1', image: 'https://res.cloudinary.com/dlmuauyqc/image/upload/v1681272394/app_canchas/128623-soccer-player-kick-the-ball-on-goal-post_qoccbn.gif' },
    { title: 'Slide 3', image: 'https://res.cloudinary.com/dlmuauyqc/image/upload/v1681272394/app_canchas/129091-soccer-player-kick-on-the-goal-post_wvpeyx.gif' },
    { title: 'Slide 4', image: 'https://res.cloudinary.com/dlmuauyqc/image/upload/v1681272394/app_canchas/129085-soccer-player-kick-the-ball_wiohkl.gif' }
  ];
  constructor() { }

  ngOnInit() {
  }

}
