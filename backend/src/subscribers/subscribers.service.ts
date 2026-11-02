
import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Resend } from 'resend';

@Injectable()
export class SubscribersService {
  private resend = new Resend(process.env.RESEND_API_KEY);

  constructor(private readonly prisma: PrismaService) {}

  async create(email: string) {
    const existingEmail = await this.prisma.subscriber.findUnique({
      where: { email },
    });

    if (existingEmail) {
      throw new ConflictException('Email already submitted!');
    }

    // Save email in database
    const subscriber = await this.prisma.subscriber.create({
      data: { email },
    });

    // Send notification to project owner
    try {
      await this.resend.emails.send({
        from: 'Email Project <onboarding@resend.dev>',
        to: process.env.NOTIFICATION_EMAIL!,
        subject: 'New Email Submission',
        html: `
          <h2>New Email Submission</h2>
          <p>Someone submitted their email address:</p>
          <h3>${subscriber.email}</h3>
        `,
      });

      console.log('Notification email sent successfully!');
    } catch (error) {
      console.error('Email notification failed:', error);
    }

    return {
      success: true,
      message: 'Email saved successfully!',
      email: subscriber.email,
    };
  }
}
