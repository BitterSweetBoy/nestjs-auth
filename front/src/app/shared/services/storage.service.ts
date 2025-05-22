import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
})

export class StorageService {
    private storage = localStorage;

    get<T>(key: string): T | null {
        const value = this.storage.getItem(key);

        if(!value) return null

        return JSON.parse(value) as T;
    }

    set<T>(key: string, value: string): void {
        this.storage.setItem(key, value);
    }

    remove(key: string): void {
        this.storage.removeItem(key);
    }

}