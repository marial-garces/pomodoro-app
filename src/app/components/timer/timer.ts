import { Component, inject } from '@angular/core';
import { TimerService as TimerService } from '../../services/timerService';
import { TaskList } from '../task-list/task-list';

@Component({
  selector: 'app-timer',
  imports: [TaskList],
  templateUrl: './timer.html',
  styleUrl: './timer.css',
})
export class Timer {
  // lit INJECTS the services xd
  protected readonly timer = inject(TimerService);

  //modes for the timer
  readonly modes: { key: 'pomodoro' | 'shortBreak' | 'longBreak'; label: string }[] = [
    { key: 'pomodoro', label: 'Pomodoro' },
    { key: 'shortBreak', label: 'Short Break' },
    { key: 'longBreak', label: 'Long Break' },
  ]

  // function that do the scwitches
  switchMode(mode: 'pomodoro' | 'shortBreak' | 'longBreak'): void {
    this.timer.switchMode(mode);
  }
  
  toggleTimer(): void {
    this.timer.toggleTimer();
  }

  resetTimer(): void {
    this.timer.reset();
  }

}
