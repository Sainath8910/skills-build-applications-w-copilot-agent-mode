import mongoose from 'mongoose';
import { User } from '../models/User';
import { Team } from '../models/Team';
import { Activity } from '../models/Activity';
import { Leaderboard } from '../models/Leaderboard';
import { Workout } from '../models/Workout';

/**
 * Seed the octofit_db database with test data
 */

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✓ Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);
    console.log('✓ Cleared existing data');

    // Create sample users
    const users = await User.create([
      {
        username: 'alex_runner',
        email: 'alex@octofit.com',
        password: 'hashedpassword123',
        fullName: 'Alex Johnson',
        bio: 'Marathon enthusiast 🏃',
        streak: 15,
        totalActivities: 48,
      },
      {
        username: 'jordan_gym',
        email: 'jordan@octofit.com',
        password: 'hashedpassword123',
        fullName: 'Jordan Smith',
        bio: 'Gym rat and fitness lover 💪',
        streak: 22,
        totalActivities: 65,
      },
      {
        username: 'casey_cyclist',
        email: 'casey@octofit.com',
        password: 'hashedpassword123',
        fullName: 'Casey Williams',
        bio: 'Cycling through life 🚴',
        streak: 8,
        totalActivities: 32,
      },
      {
        username: 'morgan_swimmer',
        email: 'morgan@octofit.com',
        password: 'hashedpassword123',
        fullName: 'Morgan Davis',
        bio: 'Swimming is life 🏊',
        streak: 12,
        totalActivities: 40,
      },
      {
        username: 'taylor_yogi',
        email: 'taylor@octofit.com',
        password: 'hashedpassword123',
        fullName: 'Taylor Brown',
        bio: 'Finding balance through yoga 🧘',
        streak: 30,
        totalActivities: 120,
      },
    ]);
    console.log(`✓ Created ${users.length} users`);

    // Create sample teams
    const teams = await Team.create([
      {
        name: 'Morning Runners',
        description: 'Early birds who run at dawn',
        leader: users[0]._id,
        members: [users[0]._id, users[2]._id],
        totalScore: 1250,
        memberCount: 2,
      },
      {
        name: 'Gym Warriors',
        description: 'Dedicated gym enthusiasts',
        leader: users[1]._id,
        members: [users[1]._id, users[4]._id],
        totalScore: 2100,
        memberCount: 2,
      },
      {
        name: 'Outdoor Adventure Squad',
        description: 'Cyclists, swimmers, and nature lovers',
        leader: users[2]._id,
        members: [users[2]._id, users[3]._id],
        totalScore: 980,
        memberCount: 2,
      },
    ]);
    console.log(`✓ Created ${teams.length} teams`);

    // Create sample activities
    const activities = await Activity.create([
      {
        userId: users[0]._id,
        type: 'running',
        duration: 45,
        calories: 450,
        distance: 8.5,
        intensity: 'high',
        notes: 'Morning run through the park',
      },
      {
        userId: users[0]._id,
        type: 'running',
        duration: 30,
        calories: 300,
        distance: 5.2,
        intensity: 'medium',
        notes: 'Evening jog',
      },
      {
        userId: users[1]._id,
        type: 'gym',
        duration: 60,
        calories: 600,
        intensity: 'high',
        notes: 'Chest and triceps day',
      },
      {
        userId: users[1]._id,
        type: 'gym',
        duration: 50,
        calories: 520,
        intensity: 'medium',
        notes: 'Leg workout',
      },
      {
        userId: users[2]._id,
        type: 'cycling',
        duration: 75,
        calories: 750,
        distance: 35,
        intensity: 'high',
        notes: 'Long distance cycling',
      },
      {
        userId: users[3]._id,
        type: 'swimming',
        duration: 40,
        calories: 400,
        distance: 2,
        intensity: 'medium',
        notes: 'Pool swimming session',
      },
      {
        userId: users[4]._id,
        type: 'yoga',
        duration: 60,
        calories: 250,
        intensity: 'low',
        notes: 'Relaxing yoga flow',
      },
      {
        userId: users[4]._id,
        type: 'walking',
        duration: 30,
        calories: 150,
        distance: 2.5,
        intensity: 'low',
        notes: 'Morning walk',
      },
    ]);
    console.log(`✓ Created ${activities.length} activities`);

    // Create sample leaderboard entries
    const leaderboardEntries = await Leaderboard.create([
      {
        userId: users[4]._id,
        rank: 1,
        score: 3600,
        totalActivities: 120,
        totalCalories: 15000,
        streak: 30,
      },
      {
        userId: users[1]._id,
        rank: 2,
        score: 2340,
        totalActivities: 65,
        totalCalories: 9100,
        streak: 22,
      },
      {
        userId: users[0]._id,
        rank: 3,
        score: 2100,
        totalActivities: 48,
        totalCalories: 8400,
        streak: 15,
      },
      {
        userId: users[3]._id,
        rank: 4,
        score: 1600,
        totalActivities: 40,
        totalCalories: 6800,
        streak: 12,
      },
      {
        userId: users[2]._id,
        rank: 5,
        score: 1200,
        totalActivities: 32,
        totalCalories: 5600,
        streak: 8,
      },
    ]);
    console.log(`✓ Created ${leaderboardEntries.length} leaderboard entries`);

    // Create sample workouts
    const workouts = await Workout.create([
      {
        userId: users[1]._id,
        name: 'Full Body Strength',
        description: 'Complete workout targeting all major muscle groups',
        exercises: [
          { name: 'Squats', sets: 4, reps: 8 },
          { name: 'Bench Press', sets: 4, reps: 8 },
          { name: 'Deadlifts', sets: 3, reps: 5 },
          { name: 'Rows', sets: 4, reps: 8 },
        ],
        difficulty: 'advanced',
        estimatedDuration: 60,
        targetedMuscles: ['chest', 'back', 'legs', 'arms'],
        isPublic: true,
      },
      {
        userId: users[0]._id,
        name: 'Beginner Running Program',
        description: 'Great for those starting their running journey',
        exercises: [
          { name: 'Warm-up jog', sets: 1, reps: 1, duration: 5 },
          { name: 'Interval running', sets: 8, reps: 1, duration: 25 },
          { name: 'Cool-down walk', sets: 1, reps: 1, duration: 5 },
        ],
        difficulty: 'beginner',
        estimatedDuration: 35,
        targetedMuscles: ['legs', 'cardio'],
        isPublic: true,
      },
      {
        userId: users[4]._id,
        name: 'Yoga Flexibility Flow',
        description: 'Improve flexibility and mobility with yoga',
        exercises: [
          { name: 'Sun Salutation', sets: 5, reps: 1 },
          { name: 'Hamstring Stretch', sets: 2, reps: 30 },
          { name: 'Pigeon Pose', sets: 2, reps: 1 },
          { name: 'Corpse Pose', sets: 1, reps: 1, duration: 10 },
        ],
        difficulty: 'beginner',
        estimatedDuration: 45,
        targetedMuscles: ['flexibility', 'relaxation'],
        isPublic: true,
      },
    ]);
    console.log(`✓ Created ${workouts.length} workouts`);

    console.log('\n✅ Database seeding completed successfully!');
    console.log(`📊 Summary:`);
    console.log(`   - Users: ${users.length}`);
    console.log(`   - Teams: ${teams.length}`);
    console.log(`   - Activities: ${activities.length}`);
    console.log(`   - Leaderboard: ${leaderboardEntries.length}`);
    console.log(`   - Workouts: ${workouts.length}`);

    process.exit(0);
  } catch (error) {
    console.error('✗ Seeding failed:', error);
    process.exit(1);
  }
}

seedDatabase();
