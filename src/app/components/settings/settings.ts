import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TimerService } from '../../services/timerService';

@Component({
  selector: 'app-settings',
  imports: [FormsModule],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings {
  private readonly timer = inject(TimerService);

  // ALL the config options for the timer
  pomodoro = this.timer.timerConfig().pomodoro;
  shortBreak = this.timer.timerConfig().shortBreak;
  longBreak = this.timer.timerConfig().longBreak;
  sessionsBeforeLongBreak = this.timer.timerConfig().sessionsBeforeLongBreak;

  // save new settings
  save(): void {
    this.timer.updateConfig({
      pomodoro: this.pomodoro,
      shortBreak: this.shortBreak,
      longBreak: this.longBreak,
      sessionsBeforeLongBreak: this.sessionsBeforeLongBreak,
    });
  }
}
