import { Router, Request, Response } from 'express';
import { Workout } from '../models/Workout';

const router = Router();

/**
 * GET /api/workouts - Get all public workouts
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const workouts = await Workout.find({ isPublic: true })
      .populate('userId', 'username fullName')
      .sort({ createdDate: -1 });
    res.json({
      success: true,
      data: workouts,
      count: workouts.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching workouts',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * GET /api/workouts/user/:userId - Get workouts for a specific user
 */
router.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const workouts = await Workout.find({ userId: req.params.userId })
      .populate('userId', 'username fullName')
      .sort({ createdDate: -1 });
    res.json({
      success: true,
      data: workouts,
      count: workouts.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user workouts',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * POST /api/workouts - Create new workout
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const {
      userId,
      name,
      description,
      exercises,
      difficulty,
      estimatedDuration,
      targetedMuscles,
      isPublic,
    } = req.body;

    if (!userId || !name || !exercises || !estimatedDuration) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
      });
    }

    const workout = new Workout({
      userId,
      name,
      description,
      exercises,
      difficulty,
      estimatedDuration,
      targetedMuscles,
      isPublic,
    });

    await workout.save();
    await workout.populate('userId', 'username fullName');

    return res.status(201).json({
      success: true,
      data: workout,
      message: 'Workout created successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error creating workout',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;
