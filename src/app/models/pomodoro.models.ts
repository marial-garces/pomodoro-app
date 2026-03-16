export type TimerMode = 'pomodoro' | 'shortBreak' | 'longBreak';

export type TimerStatus = 'running' | 'paused' | 'idle';

export interface TimerState {
    mode: TimerMode;
    status: TimerStatus;
    timeRemaining: number; // in seconds
    currentSession: number; // number of completed pomodoro sessions
}

export interface TimerConfig {
    pomodoro: number; // duration of a pomodoro session in minutes
    shortBreak: number; // duration of a short break in minutes
    longBreak: number; // duration of a long break in minutes
    sessionsBeforeLongBreak: number; // number of pomodoro sessions before a long break
}

export interface Task {
    id: string;
    title: string;
    completed: boolean;
    createdAt: Date;
    pomodorosEstimated: number; // estimated number of pomodoro sessions needed
    pomodorosCompleted: number; // number of pomodoro sessions completed for this task
}

export interface Session {
    id: string;
    mode: TimerMode;
    completedAt: Date;
    duration: number; // in seconds
    taskId?: string; // optional reference to a task 
}