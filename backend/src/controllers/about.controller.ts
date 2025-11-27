import { Response } from 'express';
import { About } from '../models/About';
import { AuthRequest } from '../middleware/auth.middleware';

// Get about content
export const getAbout = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // Get the first about document or create a default one
    let about = await About.findOne();

    if (!about) {
      // Create default about content
      about = await About.create({
        sections: [],
        mission: 'Default mission statement',
        vision: 'Default vision statement',
      });
    }

    res.status(200).json({
      success: true,
      data: about,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch about content',
    });
  }
};

// Update about content (protected)
export const updateAbout = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    let about = await About.findOne();

    if (!about) {
      // Create new if doesn't exist
      about = await About.create(req.body);
      res.status(201).json({
        success: true,
        data: about,
      });
      return;
    }

    // Update existing
    about = await About.findOneAndUpdate(
      {},
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      data: about,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message || 'Failed to update about content',
    });
  }
};

