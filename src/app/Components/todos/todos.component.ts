import { Component } from '@angular/core';
import { Todo } from '../../Todos';
import { JsonPipe, formatDate } from '@angular/common';
import { Papa } from 'ngx-papaparse';
import { saveAs } from 'file-saver';

let x = { low: 1, medium: 2, high: 2 };
@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent {
  todos: Todo[];
  localItems: string;
  papa: Papa;
  constructor() {
    this.todos = JSON.parse(localStorage.getItem('todos') || '{}');
  }
  deleteTodo(todo: Todo) {
    console.log(todo);
    let i = this.todos.indexOf(todo);
    this.todos.splice(i, 1);
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }
  addTodo(todo: Todo) {
    console.log(todo);
    this.todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }
  editTodo(todoEdit: { todo: Todo; i: number }) {
    console.log(todoEdit.i);
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }
  onClick1() {
    console.log('onClick1 has been triggered! Sorted accoring to Priority');
    this.todos.sort((a, b) => {
      const priorityOrder = ['high', 'medium', 'low'];
      return (
        priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority)
      );
    });
    console.log(this.todos);
  }
  onClick2() {
    console.log('onClick2 has been triggered! Sorted according to Status');
    this.todos.sort((a, b) => {
      const priorityOrder = ['in-progress', 'todo', 'completed'];
      return priorityOrder.indexOf(a.status) - priorityOrder.indexOf(b.status);
    });
    console.log(this.todos);
  }
  onClick3() {
    console.log('onClick3 has been triggered! Sorted According to Due_Date');
    this.todos.sort(
      (a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
    );
    console.log(this.todos);
  }
  exportToCsv() {
    const data = this.todos.map((todo) => [
      todo.title,
      todo.desc,
      todo.priority,
      todo.status,
      this.convertDateToString(todo.due_date),
    ]);

    // Add headers for the CSV
    const csvData = this.papa.unparse({
      fields: ['Title', 'Description', 'Priority', 'Status', 'Due Date'],
      data: data,
    });

    // Create a Blob from the CSV data
    const blob = new Blob([csvData], { type: 'text/csv' });

    // Create a download link and trigger download
    saveAs(blob, 'todos.csv');
  }
  convertDateToString(date: Date): string {
    return formatDate(date, 'yyyy-MM-dd', 'en-US');
  }
}
