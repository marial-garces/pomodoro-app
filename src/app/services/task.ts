import { Injectable, signal, computed } from '@angular/core';
import { Task } from '../models/pomodoro.models'

const STORAGE_KEY = 'matchafocus_tasks';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks = signal<Task[]>(this.loadTasks());

  readonly allTasks = computed(() => this.tasks());
  readonly hasTasks = computed(() => this.tasks().length > 0);

  // add a task
  addTask(title: string, pomodorosEstimated: number = 1): void {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      createdAt: new Date(),
      pomodorosEstimated,
      pomodorosCompleted: 0,
    };
    this.tasks.update(tasks => [...tasks, newTask]);
    this.saveTasks();
  }

  // DELEEEEEETE
  removeTask(id: string): void {
    this.tasks.update(tasks => tasks.filter(t => t.id !== id));
    this.saveTasks();
  }

  // completed something
  toggleComplete(id: string): void {
    this.tasks.update(tasks =>
      tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    );
    this.saveTasks();
  }

  // LOCALSTORAGE task persistence
  private loadTasks(): Task[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw){
        const parsed = JSON.parse(raw) as Task[];
        return parsed.map(t => ({ ...t, createAt: new Date(t.createdAt) }));
      }
    }catch {}
    return [];
  }

  private saveTasks(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tasks()));
    } catch {}
  }
}
