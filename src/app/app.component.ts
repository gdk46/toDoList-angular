import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { toDoList } from 'src/models/todolist.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title: String = 'Minhas tarefas';
  public toDoList: toDoList[] = [];
  public form: FormGroup;  
  public mode: String = 'list';

  /**
   *
   */
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required,
      ])]
    });

    this.load();
  }

  changeMode(mode: String) {
    this.mode = mode;
  }

  add() {
    const title = this.form.controls['title'].value;
    const id = this.toDoList.length + 1;
    this.toDoList.push(new toDoList(id, title, false));
    this.save();
    this.clear();
    this.changeMode('list');
  }

  clear() {
    this.form.reset();
  }
  
  /**
   * remove a resource from the list
   */
  remove(toDoList: toDoList){
    const index = this.toDoList.indexOf(toDoList);
    if(index >= 0) {
      this.toDoList.splice(index, 1)
    };
    this.save();
  }

  /**
   * mark as done an activity in todolist
   */
  markAsDone(toDoList: toDoList){
    toDoList.done = true;
    this.save();
  }

  /**
   * mark as undone an activity in todolist
   */
  markAsUndone(toDoList: toDoList){
    toDoList.done = false;
    this.save();
  }
  
  save() {
    const data = JSON.stringify(this.toDoList);
    localStorage.setItem('toDoList', data);
  }

  load() {
    const data = localStorage.getItem('toDoList');
    if (data) {
      this.toDoList = JSON.parse(data);
    } else {
      this.toDoList = [];
    }
  }

}
