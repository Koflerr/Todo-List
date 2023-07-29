import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from 'src/app/Todos';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent {
  status: string;
  priority: string;
  due_date: Date;
  @Input() todo: Todo;
  @Input() i: number;
  @Output() todoDelete: EventEmitter<Todo> = new EventEmitter();
  @Output() todoEdit = new EventEmitter<{ todo: Todo; i: number }>();
  onClick(todo: Todo) {
    console.log(todo);
    console.log('onClick has been triggered! Delete button was clicked');
    this.todoDelete.emit(todo);
  }
  onSubmit(todo: Todo, i: number) {
    console.log(i);
    console.log('onSubmit has been triggered! Edit Button was clicked!');
    todo.status = this.status;
    todo.priority = this.priority;
    todo.due_date = this.due_date;
    this.todoEdit.emit({ todo, i });
  }
}
