const express = require('express');
const Sweet = require('../models/Sweet');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

/**
 * ADD SWEET (ADMIN)
 */
router.post(
  '/',
  authMiddleware,
  roleMiddleware('admin'),
  async (req, res) => {
    try {
      const sweet = await Sweet.create(req.body);
      res.json(sweet);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }
);

/**
 * GET ALL SWEETS (PUBLIC)
 */
router.get('/', async (req, res) => {
  const sweets = await Sweet.find();
  res.json(sweets);
});

// UPDATE SWEET (ADMIN ONLY)
router.put('/:id', authMiddleware, roleMiddleware('admin'), async (req, res) => {
    try {
      const updatedSweet = await Sweet.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.json(updatedSweet);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  });
// DELETE SWEET (ADMIN ONLY)
router.delete('/:id', authMiddleware, roleMiddleware('admin'), async (req, res) => {
    try {
      await Sweet.findByIdAndDelete(req.params.id);
      res.json({ msg: 'Sweet removed successfully' });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  });
    

module.exports = router;
