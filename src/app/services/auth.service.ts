import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object 
  ) {}

  // Verifica si hay un token en el localStorage
  private hasToken(): boolean {
    if (isPlatformBrowser(this.platformId)) { 
      return !!localStorage.getItem('authToken');
    }
    return false; 
  }

  
  get isAuthenticated$(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  // Retorna el estado actual de autenticación
  get isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  // Método para iniciar sesión
  login(token: string): void {
    if (isPlatformBrowser(this.platformId)) { 
      localStorage.setItem('authToken', token); 
    }
    this.isAuthenticatedSubject.next(true); 
  }

  // Método para cerrar sesión
  logout(): void {
    if (isPlatformBrowser(this.platformId)) { 
      localStorage.removeItem('authToken'); 
    }
    this.isAuthenticatedSubject.next(false); 
    this.router.navigate(['/login']); 
  }
}