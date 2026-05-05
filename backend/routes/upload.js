// const express = require('express');
// const multer = require('multer');
// const axios = require('axios');
// const FormData = require('form-data');
// const fs = require('fs');
// const path = require('path');
// const Meeting = require('../models/Meeting');
// const { analyzeMeeting } = require('../services/groq');
// const router = express.Router();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')),
//   filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
// });
// const upload = multer({ storage });

// router.post('/upload', upload.single('audio'), async (req, res) => {
//   try {
//     const filePath = req.file.path;

//     const form = new FormData();
//     form.append('file', fs.createReadStream(filePath));

//     const pyResponse = await axios.post(
//       `${process.env.PYTHON_SERVICE_URL}/transcribe`,
//       form,
//       { headers: form.getHeaders(), maxContentLength: Infinity, maxBodyLength: Infinity }
//     );

//     const transcript = pyResponse.data.text;
//     const analysis = await analyzeMeeting(transcript);

//     const meeting = new Meeting({
//       title: req.body.title || 'My Meeting',
//       audioFile: filePath,
//       transcript,
//       summary: analysis.summary,
//       decisions: analysis.decisions,
//       tasks: analysis.tasks.map(t => ({ ...t, done: false }))
//     });

//     await meeting.save();

//     res.json({
//       success: true,
//       meetingId: meeting._id,
//       transcript,
//       summary: analysis.summary,
//       decisions: analysis.decisions,
//       tasks: analysis.tasks
//     });
//   } catch (err) {
//     console.error('Upload error:', err.message);
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;

// ------------------------------------------------------------------
// Day-2

const express = require('express');
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const Meeting = require('../models/Meeting');
const { analyzeMeeting } = require('../services/groq');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

router.post('/upload', authMiddleware, upload.single('audio'), async (req, res) => {
  try {
    const filePath = req.file.path;

    const form = new FormData();
    form.append('file', fs.createReadStream(filePath));

    const pyResponse = await axios.post(
      `${process.env.PYTHON_SERVICE_URL}/transcribe`,
      form,
      { headers: form.getHeaders(), maxContentLength: Infinity, maxBodyLength: Infinity }
    );

    const transcript = pyResponse.data.text;
    const analysis = await analyzeMeeting(transcript);

    const meeting = new Meeting({
      userId: req.user.id,
      title: req.body.title || 'My Meeting',
      audioFile: filePath,
      transcript,
      summary: analysis.summary,
      decisions: analysis.decisions,
      tasks: analysis.tasks.map(t => ({ ...t, done: false }))
    });

    await meeting.save();

    res.json({
      success: true,
      meetingId: meeting._id,
      transcript,
      summary: analysis.summary,
      decisions: analysis.decisions,
      tasks: analysis.tasks
    });
  } catch (err) {
    console.error('Upload error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;