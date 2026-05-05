// const express = require('express');
// const Meeting = require('../models/Meeting');
// const { chatWithMeeting } = require('../services/groq');
// const router = express.Router();

// router.get('/meeting/:id', async (req, res) => {
//   try {
//     const meeting = await Meeting.findById(req.params.id);
//     if (!meeting) return res.status(404).json({ error: 'Meeting not found' });
//     res.json(meeting);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// router.get('/meetings', async (req, res) => {
//   try {
//     const meetings = await Meeting.find().sort({ createdAt: -1 }).select('-transcript');
//     res.json(meetings);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// router.post('/chat/:id', async (req, res) => {
//   try {
//     const meeting = await Meeting.findById(req.params.id);
//     if (!meeting) return res.status(404).json({ error: 'Meeting not found' });
//     const answer = await chatWithMeeting(meeting.transcript, req.body.question);
//     res.json({ answer });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;

// --------------------------------------------------------
// DAY-2

const express = require('express');
const Meeting = require('../models/Meeting');
const { chatWithMeeting } = require('../services/groq');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Get one meeting
router.get('/meeting/:id', authMiddleware, async (req, res) => {
  try {
    const meeting = await Meeting.findOne({
      _id: req.params.id,
      userId: req.user.id
    });
    if (!meeting) return res.status(404).json({ error: 'Meeting not found.' });
    res.json(meeting);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all meetings for logged in user
router.get('/meetings', authMiddleware, async (req, res) => {
  try {
    const meetings = await Meeting.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .select('-transcript');
    res.json(meetings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Chat with meeting
router.post('/chat/:id', authMiddleware, async (req, res) => {
  try {
    const meeting = await Meeting.findOne({
      _id: req.params.id,
      userId: req.user.id
    });
    if (!meeting) return res.status(404).json({ error: 'Meeting not found.' });
    const answer = await chatWithMeeting(meeting.transcript, req.body.question);
    res.json({ answer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;