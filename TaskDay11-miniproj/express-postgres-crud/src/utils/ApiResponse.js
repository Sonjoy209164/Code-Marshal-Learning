// src/utils/ApiResponse.js
export class ApiResponse {
  constructor(status = 'success', data = null, message = '') {
    this.status = status;
    this.data = data;
    this.message = message;
    this.timestamp = new Date().toISOString();
  }
}
