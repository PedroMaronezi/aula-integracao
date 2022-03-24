import { Injectable } from '@angular/core';
import { WebRequestService } from '../services/web-request.service';

@Injectable({
  providedIn: 'root'
})
export class IntegracaoService {

  constructor(private webReqService: WebRequestService) { }

  createTask(task: any) {
    return this.webReqService.post('tasks', task)
  }

  getTasks() {
    return this.webReqService.get('tasks')
  }

  toggleTask(id: number, reminder: boolean){
    return this.webReqService.patch(`tasks/${id}`, { reminder: reminder })
  }
}
