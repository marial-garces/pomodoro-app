export type TimerMode = 'pomodoro' | 'shortBreak' | 'longBreak';

export type TimerStatus = 'running' | 'paused' | 'stopped';

export interface TimerState {
    mode: TimerMode;
    status: TimerStatus;
    timeRemaining: number; // in seconds
    currentSession: number; // number of completed pomodoro sessions
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