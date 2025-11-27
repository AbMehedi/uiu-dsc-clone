import { Request, Response } from 'express';
import { Contact } from '../models/Contact';
import { AuthRequest } from '../middleware/auth.middleware';

// Submit contact form
export const submitContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const contact = await Contact.create({
      ...req.body,
      submittedAt: new Date(),
    });

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: contact,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message || 'Failed to submit contact form',
    });
  }
};

// Get all submissions (protected)
export const getAllSubmissions = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const contacts = await Contact.find().sort({ submittedAt: -1 });
    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch contact submissions',
    });
  }
};

// Mark as read (protected)
export const markAsRead = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { status } = req.body;
    const validStatuses = ['new', 'read', 'replied'];

    if (status && !validStatuses.includes(status)) {
      res.status(400).json({
        success: false,
        error: `Status must be one of: ${validStatuses.join(', ')}`,
      });
      return;
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: status || 'read' },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!contact) {
      res.status(404).json({
        success: false,
        error: 'Contact submission not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message || 'Failed to update contact status',
    });
  }
};

