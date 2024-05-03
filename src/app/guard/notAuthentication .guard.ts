import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';

export const notAuthenticationGuard: CanActivateFn = (route, state) => {
  
   const router = inject(Router);
   const token = localStorage.getItem('authToken');
   if (!token) return true;
   router.navigate(['']);
   return false;
};
