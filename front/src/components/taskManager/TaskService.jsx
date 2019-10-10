// auth/auth-service.js
import axios from 'axios';

class TaskService {
  constructor() {
    this.service = axios.create({
      baseURL: 'http://localhost:3010/task',
      withCredentials: true
    });
  }

  all = () => {
    return this.service.get('/all')
    .then(response => response.data)
  }

  delete = (id) => {
    return this.service.delete(`/${id}`)
    .then(response => response.data)
  }

  addTask = (name, bio, time, frequency) => {
    return this.service.post('/addTask', {name, bio, time, frequency})
    .then(response => response.data)
  }
}

export default TaskService;