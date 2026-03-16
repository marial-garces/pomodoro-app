import { Routes } from '@angular/router';
import { Timer } from './components/timer/timer';
import { Settings } from './components/settings/settings';

export const routes: Routes = [
    { path: '', redirectTo: 'timer', pathMatch: 'full' },
    { path: 'timer', component: Timer },
    { path: 'settings', component: Settings }
];
