// src/testClient.js - small axios-based client to exercise the API
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const BASE = `http://localhost:${process.env.PORT || 3000}/api/v1/users`;

async function run() {
  try {
    console.log('GET all users');
    let res = await axios.get(BASE);
    console.log(res.data);

    console.log('POST new user');
    res = await axios.post(BASE, { name: 'Test User', email: `test${Date.now()}@example.com` });
    console.log('Created:', res.data);

    const id = res.data.data?.id || res.data.data?.id || res.data.data?.id; // be tolerant
    // We return created object inside ApiResponse -> data
    const created = res.data.data || res.data;
    const userId = created.id;

    console.log('PUT update user');
    const updated = await axios.put(`${BASE}/${userId}`, { name: 'Updated Test', email: `updated${Date.now()}@example.com` });
    console.log('Updated:', updated.data);

    console.log('DELETE user');
    const deleted = await axios.delete(`${BASE}/${userId}`);
    console.log('Deleted:', deleted.data);
  } catch (err) {
    if (err.response) {
      console.error('API error:', err.response.status, err.response.data);
    } else {
      console.error('Error:', err.message);
    }
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  run();
}
