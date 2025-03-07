import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-logout',
  template: `<p>Cerrando sesión...</p>`,
})
export class LogoutComponent {
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object 
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) { 
      localStorage.removeItem('token'); 
      this.router.navigate(['/login']); 
    }
  }
}