// auth/auth-service.js
import axios from 'axios';

class TaskService {
  constructor() {
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/task`,
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

  updateTime = (id, minutes, seconds, millis, timeLapsed) => {
    return this.service.post(`/${id}/updateTime`, {minutes, seconds, millis, timeLapsed})
    .then(response => response.data)
  }

  retrieveTime = (id) => {
    return this.service.get(`/${id}/retrieveTime`)
    .then(response => response.data)
  }
}

export default TaskService;