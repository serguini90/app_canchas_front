import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { AuthUseCases } from 'src/app/domain/usecase/auth-use-case';
import { RegisterDto } from 'src/app/domain/models/auth/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  isAlertOpen = false;
  alertButtons = ['OK'];
  MessageAlert = '';
  StatusAlert = '';

  constructor(
    public fb: FormBuilder,
    public _auth: AuthUseCases,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required],
      celular: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern('[0-9]{10}$'),
        ],
      ],
      correo: ['', [Validators.required, Validators.email]],
      indicadorProveedor: [false, Validators.required],
      indicadorHabilitado: [true, Validators.required],
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (!this.registerForm.valid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const form = this.registerForm.value;
    this.validatePhoneEmail(form);
    
  }


  validatePhoneEmail(form:RegisterDto){
    const body = {
      celular:form.celular,
      correo:form.correo
    }

    this._auth.validatePhoneEmail(body).subscribe(
      (data) => {
        if (data.estado == true) {
          this.validateUsername(form)
        }else{
          this.StatusAlert = 'Error';
          this.MessageAlert =
          'El correo o el celular ya se encuentran asociados a otro usuario, verifique e intente nuevamente';
          this.isAlertOpen = true;
        }
      },
      (error) => {
        // Ha ocurrido un error en la petición
        this.StatusAlert = 'Error';
        this.MessageAlert =
          'Ha ocurrido un error, intentelo de nuevo o comuniquese con el administrador';
        this.isAlertOpen = true;
      }
    )
  }

  validateUsername(form:RegisterDto){
    const body = {
      usuario:form.usuario,
    }

    this._auth.validateUser(body).subscribe(
      (data) => {
        if (data.estado == true) {
          this.completeRegistration(form)
        }else{
          this.StatusAlert = 'Error';
          this.MessageAlert =
          'El nombre de usuario ya existe, verifique e intente nuevamente';
          this.isAlertOpen = true;
        }
      },
      (error) => {
        // Ha ocurrido un error en la petición
        this.StatusAlert = 'Error';
        this.MessageAlert =
          'Ha ocurrido un error, intentelo de nuevo o comuniquese con el administrador';
        this.isAlertOpen = true;
      }
    )
  }

  completeRegistration(form:RegisterDto){
    this._auth.registerUser(form).subscribe(
      (data) => {
        // El servidor ha respondido con éxito
        this.StatusAlert = '¡Bienvenido!';
        this.MessageAlert = 'El registro se ha realizado de manera exitosa';
        this.isAlertOpen = true;
        this.registerForm.reset();
        setTimeout(() => {
          this.router.navigate(['/login']);
         }, 2000);
      },
      (error) => {
        // Ha ocurrido un error en la petición
        this.StatusAlert = 'Error';
        this.MessageAlert =
          'Ha ocurrido un error, intentelo de nuevo o comuniquese con el administrador';
        this.isAlertOpen = true;
      }
    );
  }

}
