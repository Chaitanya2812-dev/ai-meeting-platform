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

// const express = require('express');
// const Meeting = require('../models/Meeting');
// const { chatWithMeeting } = require('../services/groq');
// const authMiddleware = require('../middleware/auth');
// const router = express.Router();

// // Get one meeting
// router.get('/meeting/:id', authMiddleware, async (req, res) => {
//   try {
//     const meeting = await Meeting.findOne({
//       _id: req.params.id,
//       userId: req.user.id
//     });
//     if (!meeting) return res.status(404).json({ error: 'Meeting not found.' });
//     res.json(meeting);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Get all meetings for logged in user
// router.get('/meetings', authMiddleware, async (req, res) => {
//   try {
//     const meetings = await Meeting.find({ userId: req.user.id })
//       .sort({ createdAt: -1 })
//       .select('-transcript');
//     res.json(meetings);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Chat with meeting
// router.post('/chat/:id', authMiddleware, async (req, res) => {
//   try {
//     const meeting = await Meeting.findOne({
//       _id: req.params.id,
//       userId: req.user.id
//     });
//     if (!meeting) return res.status(404).json({ error: 'Meeting not found.' });
//     const answer = await chatWithMeeting(meeting.transcript, req.body.question);
//     res.json({ answer });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;



// -----------------------------------------------------------------

const express = require('express');
const Meeting = require('../models/Meeting');
const { chatWithMeeting } = require('../services/groq');
const authMiddleware = require('../middleware/auth');
const mongoose = require('mongoose');
const router = express.Router();

// Get one meeting
router.get('/meeting/:id', authMiddleware, async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);
    const meeting = await Meeting.findOne({
      _id: req.params.id,
      $or: [{ userId }, { userId: null }]
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
    const userId = new mongoose.Types.ObjectId(req.user.id);
    const meetings = await Meeting.find({
      $or: [{ userId }, { userId: null }]
    })
      .sort({ createdAt: -1 })
      .select('-transcript');
    res.json(meetings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rename meeting title
router.patch('/meeting/:id', authMiddleware, async (req, res) => {
  try {
    const { title } = req.body;
    if (!title || !title.trim()) return res.status(400).json({ error: 'Title cannot be empty.' });
    const userId = new mongoose.Types.ObjectId(req.user.id);
    const meeting = await Meeting.findOneAndUpdate(
      { _id: req.params.id, $or: [{ userId }, { userId: null }] },
      { title: title.trim() },
      { new: true }
    );
    if (!meeting) return res.status(404).json({ error: 'Meeting not found.' });
    res.json({ success: true, title: meeting.title });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete meeting
router.delete('/meeting/:id', authMiddleware, async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);
    const meeting = await Meeting.findOneAndDelete({
      _id: req.params.id,
      $or: [{ userId }, { userId: null }]
    });
    if (!meeting) return res.status(404).json({ error: 'Meeting not found.' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Chat with meeting
router.post('/chat/:id', authMiddleware, async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);
    const meeting = await Meeting.findOne({
      _id: req.params.id,
      $or: [{ userId }, { userId: null }]
    });
    if (!meeting) return res.status(404).json({ error: 'Meeting not found.' });
    const answer = await chatWithMeeting(meeting.transcript, req.body.question);
    res.json({ answer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// --------------------

// TEMPORARY DEBUG - remove after testing
router.get('/debug/meeting/:id', async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.id);
    if (!meeting) return res.json({ found: false, message: 'No meeting with this ID in DB at all' });
    res.json({ found: true, userId: meeting.userId, userIdType: typeof meeting.userId });
  } catch (err) {
    res.json({ error: err.message });
  }
});


module.exports = router;