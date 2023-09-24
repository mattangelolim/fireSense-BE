const express = require('express');
const router = express.Router();
const Case = require('../models/Case');

// Route to get all cases sorted by district in descending order
router.get('/fire/cases', async (req, res) => {
  try {
    const cases = await Case.findAll({
      order: [['district', 'DESC']]
    });

    res.json(cases);
  } catch (error) {
    console.error('Error fetching cases:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
