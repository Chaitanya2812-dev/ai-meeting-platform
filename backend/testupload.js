require('dotenv').config();
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5Zjg4OTE2N2VkNGNlZDA3NzUxYzk3NSIsIm5hbWUiOiJDaGFpdGFueWEiLCJlbWFpbCI6ImNobkBnbWFpbC5jb20iLCJpYXQiOjE3Nzc4OTU5NDUsImV4cCI6MTc3ODUwMDc0NX0.eAhaGihZoiGlmbc7DMA9UEebtQkyVytI_GvrW8oiDsg';
const AUDIO_PATH = "D:/test.mp3.mp3";

async function testUpload() {
  const form = new FormData();
  form.append('audio', fs.createReadStream(AUDIO_PATH));
  form.append('title', 'Test Meeting');

  try {
    console.log('Uploading... please wait');
    const res = await axios.post('http://localhost:5000/api/upload', form, {
      headers: {
        ...form.getHeaders(),
        Authorization: `Bearer ${TOKEN}`
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity
    });
    console.log('SUCCESS!');
    console.log('Meeting ID:', res.data.meetingId);
    console.log('Summary:', res.data.summary);
    console.log('Tasks:', JSON.stringify(res.data.tasks, null, 2));
  } catch (err) {
    console.error('Error:', err.response?.data || err.message);
  }
}

testUpload();