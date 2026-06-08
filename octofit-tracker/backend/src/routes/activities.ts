import { Router, Request, Response } from 'express';
import { Activity } from '../models/Activity';

const router = Router();

/**
 * GET /api/activities - Get all activities
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const activities = await Activity.find()
      .populate('userId', 'username fullName')
      .sort({ date: -1 });
    res.json({
      success: true,
      data: activities,
      count: activities.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching activities',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * GET /api/activities/user/:userId - Get activities for a specific user
 */
router.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const activities = await Activity.find({ userId: req.params.userId })
      .populate('userId', 'username fullName')
      .sort({ date: -1 });
    res.json({
      success: true,
      data: activities,
      count: activities.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user activities',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * POST /api/activities - Create new activity
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const { userId, type, duration, calories, distance, intensity, notes } = req.body;

    if (!userId || !type || !duration || calories === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
      });
    }

    const activity = new Activity({
      userId,
      type,
      duration,
      calories,
      distance,
      intensity,
      notes,
    });

    await activity.save();
    await activity.populate('userId', 'username fullName');

    return res.status(201).json({
      success: true,
      data: activity,
      message: 'Activity created successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error creating activity',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;
