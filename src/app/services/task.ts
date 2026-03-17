import { Injectable, signal, computed } from '@angular/core';
import { Task } from '../models/pomodoro.models'

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks = signal<Task[]>([]);

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
  }

  // DELEEEEEETE
  removeTask(id: string): void {
    this.tasks.update(tasks => tasks.filter(t => t.id !== id));
  }

  // completed something
  toggleComplete(id: string): void {
    this.tasks.update(tasks =>
      tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    );
  }
}
