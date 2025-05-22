import { Routes } from "@angular/router";

export default [
    {
        path: 'login',
        loadComponent: () => import('../log-in/log-in.component')
    },
    {
        path: 'signup',
        loadComponent: () => import('../sign-up/sign-up.component')
    },
    {
        path: '**',
        redirectTo: 'login'
    }
] as Routes