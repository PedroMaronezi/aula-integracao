import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Login } from '../models/login';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup | any;

  constructor() { }

  ngOnInit(): void {
    this.createForm(new Login());
  }

  createForm(login: Login){
    this.formLogin = new FormGroup({
      racf: new FormControl(login.racf),
      senha: new FormControl(login.senha)
    })
  }

  onSubmit() {
    console.log(this.formLogin.value)
  }

}
