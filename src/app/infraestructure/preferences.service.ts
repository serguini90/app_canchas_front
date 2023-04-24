import { Injectable } from "@angular/core";
import { Preferences } from '@capacitor/preferences';

@Injectable({
    providedIn: 'root'
})
export class PreferencesService {

    constructor(){}

    async setItem(key: string, value: any){
        await Preferences.set({ key, value });
        return true;
    }

    async getItem(key: string){
        const {value} = await Preferences.get({ key });
        return value;
    }
}