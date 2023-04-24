import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { BookingPage } from "./booking.page";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
    imports: [IonicModule, RouterModule.forChild([{ path: '', component: BookingPage }]),
      CommonModule, FormsModule, ReactiveFormsModule ],
    declarations: [BookingPage],
    exports: [BookingPage]
  })
  export class BookingPageModule {}