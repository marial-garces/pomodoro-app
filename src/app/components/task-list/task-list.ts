import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task';

@Component({
  selector: 'app-task-list',
  imports: [FormsModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList {
  protected readonly taskService = inject(TaskService);

  showInput = signal(false);
  newTaskTitle = signal('');

  openInput(): void {
    this.showInput.set(true);
  }
  // add a task duh
  addTask(): void {
    const title = this.newTaskTitle().trim();
    if(title) {
      this.taskService.addTask(title);
      this.newTaskTitle.set('');
      this.showInput.set(false);
    }
  }
  // cancel adding a task DUH 
  cancelAdd(): void {
    this.newTaskTitle.set('');
    this.showInput.set(false);
  }
  // KEY PRESS enter and escape DUUUH
  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') this.addTask();
    if (event.key === 'Escape') this.cancelAdd();
  }
}
