import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  readonly AUTH_URL: string;

  constructor(private https: HttpClient) { 
    this.AUTH_URL = 'http://localhost:3000';
  }

  login(racf: string, senha: string) {
    this.https.post(this.AUTH_URL, { racf: racf, senha: senha })
  }
}
