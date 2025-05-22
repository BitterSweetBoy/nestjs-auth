import { inject, Injectable } from '@angular/core';
import { StorageService } from './storage.service';

interface Session {
  access_token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  private storageService = inject(StorageService);

    getSession(): Session | null {
        let currentSession: Session | null = null;
        const maybeSession = this.storageService.get<Session>('session');
        console.log({ maybeSession });
        if (maybeSession !== null) {
        if (this._isValidSession(maybeSession)) {
            currentSession = maybeSession;
        } else {
            this.signOut();
        }
        }
        return currentSession;
    }

    signOut() {
      this.storageService.remove('session');
    }

    private _isValidSession(maybeSession: unknown): boolean {
        return (
        typeof maybeSession === 'object' &&
        maybeSession !== null &&
        'access_token' in maybeSession
        );
    }
}
