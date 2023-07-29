import { Component, EventEmitter, Output } from '@angular/core';
import { Todo } from 'src/app/Todos';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css'],
})
export class AddTodoComponent {
  title: string;
  desc: string;
  status: string;
  priority: string;
  due_date: Date;
  @Output() todoAdd: EventEmitter<Todo> = new EventEmitter();
  onSubmit() {
    const todo = {
      title: this.title,
      desc: this.desc,
      status: this.status,
      priority: this.priority,
      due_date: this.due_date,
    };
    console.log('onSubmit has been triggered!Add Todo has been clicked!');
    this.todoAdd.emit(todo);
  }
}
