import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { AuthUseCases } from 'src/app/domain/usecase/auth-use-case';
import { decodeToken } from 'src/app/infraestructure/helpers/jwt-auth.helper';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, RouterModule]
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  isAlertOpen = false;
  alertButtons = ['OK'];
  MessageAlert = '';
  StatusAlert = '';

  constructor(public fb: FormBuilder,
    public _auth: AuthUseCases,
    private router: Router
    ) {
     this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  onSubmit(){
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const form = this.loginForm.value;
    this._auth.loginUser(form).subscribe(
      (data) => {
        // El servidor ha respondido con éxito
        if (data.estado == true) {
          localStorage.setItem('token',data.respuesta);
          const decoded = decodeToken(data.respuesta);
          localStorage.setItem('idUsuario',decoded.usuario.idUsuario);
          localStorage.setItem('indicadorProveedor',decoded.usuario.indicadorProveedor);
          localStorage.setItem('usuario',decoded.usuario.usuario);
          this.StatusAlert = '¡Bienvenido!';
          this.MessageAlert = 'Inicio de sesión exitoso';
          this.isAlertOpen = true;
          setTimeout(() => {
            //this.router.navigate(['/home']);
          }, 2000);
        }else{
          this.StatusAlert = 'Error';
          this.MessageAlert = 'El usuario y la contraseña no coinciden';
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

}
