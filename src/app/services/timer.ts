import { Injectable, signal, computed } from '@angular/core';
import { TimerMode, TimerState, TimerConfig } from '../models/pomodoro.models';

@Injectable({
  providedIn: 'root',
})
export class Timer {
  
  // Initial timer state
  private config = signal<TimerConfig>({
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
    sessionsBeforeLongBreak: 4
  })

  // Timer Status
  private state = signal<TimerState>({
    mode: 'pomodoro',
    status: 'idle',
    timeRemaining: 25 * 60, // in seconds
    currentSession: 1
  });

  // Total time of the pomodoro.

  // Public signals (read-only)
  readonly timerState = computed(() => this.state());
  readonly timerConfig = computed(() => this.config());

  // useful computed signals
  readonly minutes = computed(() =>
    Math.floor(this.state().timeRemaining / 60)
  );

  readonly seconds = computed(() =>
    this.state().timeRemaining % 60
  );

  readonly progress = computed(() => {
    const total = this.getTotalTime(this.state().mode);
    return ((total - this.state().timeRemaining) / total) * 100;
  });

}
