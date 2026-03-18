import { Injectable, signal, computed, OnDestroy } from '@angular/core';
import { TimerMode, TimerState, TimerConfig } from '../models/pomodoro.models';

@Injectable({
  providedIn: 'root',
})
export class TimerService implements OnDestroy{
  // Internal timer interval ID
  private intervalId: ReturnType<typeof setInterval> | null = null;
  
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

  readonly displayMinutes = computed(() =>
    String(this.minutes()).padStart(2, '0')
  );

  readonly displaySeconds = computed(() =>
    String(this.seconds()).padStart(2, '0')
  );

  //Lable for the current modes !
  readonly modeLable = computed(() => {
    const mode = this.state().mode;
    switch(mode){
      case 'pomodoro': return 'Focus Timee !!!';
      case 'shortBreak': return 'Short Break, Relax a bit !';
      case 'longBreak': return 'Long Break, Lets have a snack !!';
    }
  });

  //Lable for button to start or pause the timer
  readonly buttonLabel = computed(() => {
    const status = this.state().status;
    switch(status){
      case 'idle': return 'Start';
      case 'running': return 'Pause';
      case 'paused': return 'Resume';
    }
  });

  // Total time for the current mode in seconds
  getTotalTime(mode: TimerMode): number{
    const cfg = this.config();
    switch(mode){
      case 'pomodoro': return cfg.pomodoro * 60;
      case 'shortBreak': return cfg.shortBreak * 60;
      case 'longBreak': return cfg.longBreak * 60;
    }
  }


  // Timer control methods
  toggleTimer(): void {
    const current = this.state();
    if(current.status === 'running'){

    }else {

    }
  }

  start(): void {
    this.state.update(s => ({ ...s, status: 'running' }));
    this.intervalId = setInterval(() => {
      this.state.update(s => {
        if(s.timeRemaining <= 1){
          this.onTimerComplete();
          return{ ...s, timeRemaining: 0, status: 'idle' };
        }
        return { ...s, timeRemaining: s.timeRemaining - 1 };
      });
    }, 1000);
  }

  pause(): void {
    if(this.intervalId){
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.state.update(s => ({ ...s, status: 'paused' }));
  }

  reset(): void {
    if(this.intervalId){
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    const mode = this.state().mode;
    this.state.update(s => ({
      ...s, status: 'idle',timeRemaining: this.getTotalTime(mode),
    }));
  }

  switchMode(mode: TimerMode): void {
    if (this.intervalId){
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.state.update(s => ({
      ...s,
      mode,
      status: 'idle',
      timeRemaining: this.getTotalTime(mode),
    }));
  }

  //when the timers end kinda stuff to do
  private onTimerComplete(): void {
    if(this.intervalId){
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    const current = this.state();
    if(current.mode === 'pomodoro'){

      //after a pomodoro, lets go to a break o a long break
      const cfg = this.config();
      const isLongBreak = current.currentSession % cfg.sessionsBeforeLongBreak === 0;
      const nextMode: TimerMode = isLongBreak ? 'longBreak' : 'shortBreak';

      this.state.update(s => ({
        ...s,
        mode: nextMode,
        status: 'idle',
        timeRemaining: this.getTotalTime(nextMode),
        currentSession: s.currentSession + 1,
      }));
    } else {
      //after a break, back to work !!
      this.state.update(s => ({
        ...s,
        mode: 'pomodoro',
        status: 'idle',
        timeRemaining: this.getTotalTime('pomodoro'),
      }));
    }
  }

  ngOnDestroy(): void {
    if(this.intervalId){
      clearInterval(this.intervalId);
    }
  }

  // this updates the timer config
  updateConfig(newConfig: Partial<TimerConfig>): void{
    this.config.update(c => ({ ...c, ...newConfig }));
    // IFF the time is IDLEE, update!!
    if(this.state().status === 'idle'){
      const mode = this.state().mode;
      this.state.update(s => ({ ...s, timeRemaining: this.getTotalTime(mode) }));
    }
  }

}
