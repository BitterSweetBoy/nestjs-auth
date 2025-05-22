import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthStateService } from "../services/auth-state.service";

export const privateGuard =(): CanActivateFn => {
    return () => {
        const stateService = inject(AuthStateService);
        const router = inject(Router);

        const session = stateService.getSession();
        if(session){
            return true
        }
        router.navigateByUrl('/auth/login');
        return false;
    }
}

export  const publicGuard  =(): CanActivateFn => {
    return () => {
        const stateService = inject(AuthStateService);
        const router = inject(Router);
        const session = stateService.getSession();
        if(session){
            router.navigateByUrl('/dashboard')
            return false
        }

        return true;
    }
}