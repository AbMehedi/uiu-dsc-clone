import { Response } from 'express';
import { Event } from '../models/Event';
import { AuthRequest } from '../middleware/auth.middleware';

// Get all events
export const getAllEvents = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const events = await Event.find().sort({ date: -1 });
    res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch events',
    });
  }
};

// Get upcoming events only
export const getUpcomingEvents = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const now = new Date();
    const events = await Event.find({
      $or: [
        { date: { $gte: now } },
        { status: 'upcoming' },
      ],
    })
      .sort({ date: 1 })
      .limit(10);

    res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch upcoming events',
    });
  }
};

// Get single event
export const getEventById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      res.status(404).json({
        success: false,
        error: 'Event not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch event',
    });
  }
};

// Create event (protected)
export const createEvent = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json({
      success: true,
      data: event,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message || 'Failed to create event',
    });
  }
};

// Update event (protected)
export const updateEvent = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!event) {
      res.status(404).json({
        success: false,
        error: 'Event not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: event,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message || 'Failed to update event',
    });
  }
};

// Delete event (protected)
export const deleteEvent = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      res.status(404).json({
        success: false,
        error: 'Event not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Event deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to delete event',
    });
  }
};

