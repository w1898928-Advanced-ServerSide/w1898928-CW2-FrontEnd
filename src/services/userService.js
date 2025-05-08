import api from './api';
import { userDTO } from '../dto/userDto';

class UserService {
  async register(userData) {
    const response = await api.post('/auth/register', userData);
    return userDTO(response.data);
  }

  async login(credentials) {
    const response = await api.post('/auth/login', credentials);
    return userDTO(response.data);
  }

  async getCurrentUser() {
    const response = await api.get('/auth/me');
    return userDTO(response.data);
  }

  async getUserById(id) {
    const response = await api.get(`/users/${id}`);
    return userDTO(response.data);
  }

  async getUserByUsername(username) {
    const response = await api.get(`/users/username/${username}`);
    return userDTO(response.data);
  }

  async updateUser(id, userData) {
    const response = await api.put(`/users/${id}`, userData);
    return userDTO(response.data);
  }

  async getAllUsers() {
    const response = await api.get('/users');
    return response.data.map(userDTO);
  }

  async getBlogPostsByUserId(userId) {
    const response = await api.get(`/posts/user/${userId}`);
    return response.data;
  }
}

export default new UserService();