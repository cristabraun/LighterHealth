import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'support@getlighterapp.com';
const ADMIN_NOTIFICATION_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL || 'support@getlighterapp.com';

function getAdminEmails(): string[] {
  const adminEmails = process.env.ADMIN_EMAILS?.split(',').map(e => e.trim()).filter(e => e) || [];
  if (!adminEmails.includes(ADMIN_NOTIFICATION_EMAIL)) {
    adminEmails.push(ADMIN_NOTIFICATION_EMAIL);
  }
  return Array.from(new Set(adminEmails));
}

export async function sendPasswordResetEmail(
  toEmail: string,
  resetUrl: string,
  firstName?: string | null
): Promise<{ success: boolean; error?: string }> {
  const greeting = firstName ? `Hi ${firstName}` : 'Hello';
  
  try {
    console.log('[Email] Sending password reset email to:', toEmail.substring(0, 3) + '***');
    
    const { data, error } = await resend.emails.send({
      from: `Lighter™ <${FROM_EMAIL}>`,
      to: toEmail,
      subject: 'Reset your Lighter™ password',
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0f0f11; color: #ffffff; padding: 40px 20px; margin: 0;">
  <div style="max-width: 500px; margin: 0 auto; background: linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%); border-radius: 16px; padding: 32px; border: 1px solid rgba(255,255,255,0.1);">
    <div style="text-align: center; margin-bottom: 24px;">
      <span style="font-size: 24px; font-weight: 300; background: linear-gradient(to right, #fcd34d, #f97316, #eab308); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">✨ Lighter™</span>
    </div>
    
    <h1 style="color: #ffffff; font-size: 22px; font-weight: 400; margin: 0 0 16px 0;">${greeting},</h1>
    
    <p style="color: rgba(255,255,255,0.7); font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">
      We received a request to reset your password. Click the button below to create a new password:
    </p>
    
    <div style="text-align: center; margin: 32px 0;">
      <a href="${resetUrl}" style="display: inline-block; background: linear-gradient(to right, #f59e0b, #f97316, #f59e0b); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 12px; font-weight: 600; font-size: 16px;">
        Reset Password
      </a>
    </div>
    
    <p style="color: rgba(255,255,255,0.5); font-size: 14px; line-height: 1.5; margin: 24px 0 0 0;">
      This link will expire in 1 hour. If you didn't request a password reset, you can safely ignore this email.
    </p>
    
    <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 24px 0;">
    
    <p style="color: rgba(255,255,255,0.4); font-size: 12px; text-align: center; margin: 0;">
      Can't click the button? Copy and paste this URL into your browser:<br>
      <span style="color: rgba(255,255,255,0.6); word-break: break-all;">${resetUrl}</span>
    </p>
  </div>
</body>
</html>
      `,
      text: `${greeting},\n\nWe received a request to reset your Lighter™ password.\n\nClick this link to reset your password:\n${resetUrl}\n\nThis link will expire in 1 hour.\n\nIf you didn't request this, you can safely ignore this email.\n\n— The Lighter™ Team`,
    });

    if (error) {
      console.error('[Email] Resend API error:', error);
      return { success: false, error: error.message };
    }

    console.log('[Email] Password reset email sent successfully, ID:', data?.id);
    return { success: true };
  } catch (err: any) {
    console.error('[Email] Failed to send password reset email:', err?.message || err);
    return { success: false, error: err?.message || 'Unknown error' };
  }
}

export async function sendAdminMessageNotification(
  userName: string,
  userEmail: string,
  messageContent: string,
  subject?: string | null
): Promise<{ success: boolean; error?: string }> {
  const adminEmails = getAdminEmails();
  
  try {
    console.log('[Email] Sending admin notification for new message from:', userEmail.substring(0, 3) + '***');
    
    const { data, error } = await resend.emails.send({
      from: `Lighter™ <${FROM_EMAIL}>`,
      to: adminEmails,
      subject: `New Lighter™ message from ${userName}`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8f9fa; color: #333; padding: 40px 20px; margin: 0;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; padding: 32px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <div style="margin-bottom: 24px; padding-bottom: 16px; border-bottom: 2px solid #f59e0b;">
      <h1 style="color: #f97316; font-size: 20px; font-weight: 600; margin: 0;">✨ New Lighter™ Support Message</h1>
    </div>
    
    <div style="background: #f8f9fa; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
      <p style="margin: 0 0 8px 0;"><strong>From:</strong> ${userName}</p>
      <p style="margin: 0 0 8px 0;"><strong>Email:</strong> <a href="mailto:${userEmail}" style="color: #f97316;">${userEmail}</a></p>
      ${subject ? `<p style="margin: 0;"><strong>Subject:</strong> ${subject}</p>` : ''}
    </div>
    
    <div style="margin-bottom: 20px;">
      <h3 style="color: #333; font-size: 16px; font-weight: 600; margin: 0 0 12px 0;">Message:</h3>
      <div style="background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px;">
        <p style="color: #374151; font-size: 15px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${messageContent}</p>
      </div>
    </div>
    
    <p style="color: #6b7280; font-size: 13px; margin: 0;">
      Reply to this user by emailing them directly at ${userEmail} or through the Lighter™ admin panel.
    </p>
  </div>
</body>
</html>
      `,
      text: `New Lighter™ Support Message\n\nFrom: ${userName}\nEmail: ${userEmail}${subject ? `\nSubject: ${subject}` : ''}\n\nMessage:\n${messageContent}\n\n---\nReply directly to ${userEmail}`,
    });

    if (error) {
      console.error('[Email] Resend API error for admin notification:', error);
      return { success: false, error: error.message };
    }

    console.log('[Email] Admin message notification sent successfully, ID:', data?.id);
    return { success: true };
  } catch (err: any) {
    console.error('[Email] Failed to send admin notification:', err?.message || err);
    return { success: false, error: err?.message || 'Unknown error' };
  }
}

export async function sendNewUserNotification(
  userEmail: string,
  firstName?: string | null,
  lastName?: string | null
): Promise<{ success: boolean; error?: string }> {
  const adminEmails = getAdminEmails();
  const fullName = [firstName, lastName].filter(Boolean).join(' ') || 'New User';
  const createdAt = new Date().toISOString();
  
  try {
    console.log('[Email] Sending new user notification for:', userEmail.substring(0, 3) + '***');
    
    const { data, error } = await resend.emails.send({
      from: `Lighter™ <${FROM_EMAIL}>`,
      to: adminEmails,
      subject: `🎉 New Lighter™ signup: ${fullName}`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8f9fa; color: #333; padding: 40px 20px; margin: 0;">
  <div style="max-width: 500px; margin: 0 auto; background: #ffffff; border-radius: 12px; padding: 32px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <div style="text-align: center; margin-bottom: 24px;">
      <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 16px;">
        <span style="font-size: 28px;">🎉</span>
      </div>
      <h1 style="color: #f97316; font-size: 22px; font-weight: 600; margin: 0;">New User Signup!</h1>
    </div>
    
    <div style="background: #fef3c7; border-radius: 8px; padding: 20px; margin-bottom: 20px; text-align: center;">
      <p style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600; color: #92400e;">${fullName}</p>
      <p style="margin: 0; color: #b45309;"><a href="mailto:${userEmail}" style="color: #b45309;">${userEmail}</a></p>
    </div>
    
    <div style="text-align: center; color: #6b7280; font-size: 14px;">
      <p style="margin: 0;">Registered at: ${new Date(createdAt).toLocaleString()}</p>
      <p style="margin: 8px 0 0 0;">30-day beta access started</p>
    </div>
  </div>
</body>
</html>
      `,
      text: `New Lighter™ User Signup!\n\nName: ${fullName}\nEmail: ${userEmail}\nRegistered at: ${createdAt}\n\n30-day beta access has started.`,
    });

    if (error) {
      console.error('[Email] Resend API error for new user notification:', error);
      return { success: false, error: error.message };
    }

    console.log('[Email] New user notification sent successfully, ID:', data?.id);
    return { success: true };
  } catch (err: any) {
    console.error('[Email] Failed to send new user notification:', err?.message || err);
    return { success: false, error: err?.message || 'Unknown error' };
  }
}
