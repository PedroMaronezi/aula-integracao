import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task';

import { FormGroup, FormControl } from '@angular/forms';
import { IntegracaoService } from './integracao.service';

@Component({
  selector: 'app-integracao',
  templateUrl: './integracao.component.html',
  styleUrls: ['./integracao.component.scss']
})
export class IntegracaoComponent implements OnInit {
  formTask: FormGroup | any;

  showAdd : Boolean = false;
  text: string = 'Adicionar';

  tasks:Array<any> = [];
  tasksServer: any;

  constructor(private integracaoService: IntegracaoService) { }

  ngOnInit(): void {
    this.createForm(new Task());
    this.getTasksFromServer()
  }

  // Função que pega todas as tasks do server
  // É realizado um GET de todas as tasks
  getTasksFromServer() {
    try{
      this.integracaoService.getTasks().subscribe((response) => {
        this.tasksServer = response
        this.tasks = this.tasksServer
        console.log(this.tasks)
      })
    } catch(err) {
      alert(err)
    }
  }

  onAdd(){
    this.showAdd = !this.showAdd

    if(this.showAdd) {
      this.text = 'Fechar'
    } else {
      this.text = 'Adicionar'
    }
  }

  createForm(task: Task){
    this.formTask = new FormGroup({
      id: new FormControl(task.id),
      tarefa: new FormControl(task.tarefa),
      data: new FormControl(task.data),
      reminder: new FormControl(task.reminder)
    })
  }

  // Função que cria uma nova task
  // É realizado um POST da nova task
  onSubmit() {
    try{
      let id = this.tasks.length + 1
      let task = {
        id: id,
        tarefa: this.formTask.value.tarefa,
        data: this.formTask.value.data,
        reminder: this.formTask.value.data
      }

      this.integracaoService.createTask(task).subscribe((res) => {
        this.integracaoService.getTasks().subscribe((response) => {
          this.tasksServer = response
          this.tasks = this.tasksServer
        })
      })
    } catch(err) {
      alert(err)
    }
    console.log(this.formTask.value.tarefa)
  }

  // Função que altera a opção de reminder
  // É realizado um PATCH que atualiza a task com o id passado
  toggleReminder(id: number) {
    this.tasks = this.tasks.map((task) => {
      return task.id === id ? { ...task, reminder: !task.reminder} : task
    })

    try{
      let updTask = this.tasks.filter((t) => t.id === id)[0]
      console.log(updTask)
      this.integracaoService.toggleTask(id, updTask.reminder).subscribe((res) => {
        this.integracaoService.getTasks().subscribe((response) => {
          this.tasksServer = response
          this.tasks = this.tasksServer
        })
      })
    } catch(err) {
      alert(err)
    }
  }

}
