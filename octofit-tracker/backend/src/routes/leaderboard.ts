import { Router, Request, Response } from 'express';
import { Leaderboard } from '../models/Leaderboard';

const router = Router();

/**
 * GET /api/leaderboard - Get all leaderboard entries sorted by rank
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const leaderboard = await Leaderboard.find()
      .populate('userId', 'username fullName profilePicture')
      .sort({ rank: 1 });
    res.json({
      success: true,
      data: leaderboard,
      count: leaderboard.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching leaderboard',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * GET /api/leaderboard/user/:userId - Get leaderboard entry for specific user
 */
router.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const entry = await Leaderboard.findOne({ userId: req.params.userId })
      .populate('userId', 'username fullName profilePicture');
    if (!entry) {
      return res.status(404).json({
        success: false,
        message: 'Leaderboard entry not found',
      });
    }
    return res.json({
      success: true,
      data: entry,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching leaderboard entry',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * GET /api/leaderboard/top/:count - Get top N users
 */
router.get('/top/:count', async (req: Request, res: Response) => {
  try {
    const count = Math.min(parseInt(req.params.count as string) || 10, 100);
    const topUsers = await Leaderboard.find()
      .populate('userId', 'username fullName profilePicture')
      .sort({ rank: 1 })
      .limit(count);
    return res.json({
      success: true,
      data: topUsers,
      count: topUsers.length,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching top users',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;
