import { Router, Request, Response } from 'express';
import { Team } from '../models/Team';

const router = Router();

/**
 * GET /api/teams - Get all teams
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const teams = await Team.find()
      .populate('leader', 'username fullName')
      .populate('members', 'username fullName');
    res.json({
      success: true,
      data: teams,
      count: teams.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching teams',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * GET /api/teams/:id - Get team by ID
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const team = await Team.findById(req.params.id)
      .populate('leader', 'username fullName')
      .populate('members', 'username fullName');
    if (!team) {
      return res.status(404).json({
        success: false,
        message: 'Team not found',
      });
    }
    return res.json({
      success: true,
      data: team,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching team',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * POST /api/teams - Create new team
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, description, leader } = req.body;

    if (!name || !leader) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
      });
    }

    const team = new Team({
      name,
      description,
      leader,
      members: [leader],
      memberCount: 1,
    });

    await team.save();
    await team.populate('leader', 'username fullName');

    return res.status(201).json({
      success: true,
      data: team,
      message: 'Team created successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error creating team',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;
