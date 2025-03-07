import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { NgIf } from '@angular/common'; 

@Component({
  selector: 'app-login',
  standalone: true, 
  imports: [FormsModule, NgIf], 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], 
})
export class LoginComponent {
  username: string = ''; 
  password: string = ''; 
  errorMessage: string | null = null;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object 
  ) {}

  login(): void {
    // Validar las credenciales
    if (this.username === 'admin' && this.password === 'admin123') {
      if (isPlatformBrowser(this.platformId)) { 
        localStorage.setItem('token', 'fake-token'); 
        this.router.navigate(['/products']); 
      }
    } else {
      this.errorMessage = 'Credenciales incorrectas. Inténtalo de nuevo.'; 
    }
  }
}