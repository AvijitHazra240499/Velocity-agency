import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { type, to, meetingDetails } = await request.json()

    const { title, duration, date, time, timezone, attendee, googleCalendarLink } = meetingDetails

    let subject: string
    let htmlContent: string

    if (type === "attendee") {
      subject = `Meeting Confirmed: ${title} with Avijit Hazra - ${date} at ${time}`
      htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Meeting Confirmation</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
            <h1 style="margin: 0; font-size: 28px;">🎉 Meeting Confirmed!</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Your meeting with Avijit Hazra has been scheduled</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
            <h2 style="color: #667eea; margin-top: 0;">📅 Meeting Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Meeting Type:</td>
                <td style="padding: 8px 0;">${title} (${duration})</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Date & Time:</td>
                <td style="padding: 8px 0;">${date} at ${time} (${timezone})</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Platform:</td>
                <td style="padding: 8px 0;">Google Meet (link will be in calendar invite)</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Host:</td>
                <td style="padding: 8px 0;">Avijit Hazra (avijithazra.burd@gmail.com)</td>
              </tr>
            </table>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${googleCalendarLink}" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block; font-size: 16px;">
              📅 Add to Google Calendar
            </a>
          </div>
          
          <div style="background: #e8f4fd; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea; margin-bottom: 25px;">
            <h3 style="color: #667eea; margin-top: 0;">📝 Your Project Details:</h3>
            <p style="margin: 0; font-style: italic;">"${attendee.message}"</p>
          </div>
          
          <div style="background: #fff3cd; padding: 15px; border-radius: 8px; border-left: 4px solid #ffc107; margin-bottom: 25px;">
            <h4 style="color: #856404; margin-top: 0;">⚠️ Important Instructions:</h4>
            <ol style="margin: 0; color: #856404;">
              <li>Click "Add to Google Calendar" above to add this meeting to your calendar</li>
              <li>Google Meet link will be automatically generated when you add to calendar</li>
              <li>You'll receive a calendar invite with the Meet link</li>
              <li>Join the meeting 2-3 minutes before the scheduled time</li>
            </ol>
          </div>
          
          <div style="text-align: center; padding: 20px; border-top: 1px solid #eee; color: #666; font-size: 14px;">
            <p>Need to reschedule? Contact us at <a href="mailto:avijithazra.burd@gmail.com" style="color: #667eea;">avijithazra.burd@gmail.com</a></p>
            <p>Looking forward to discussing your project! 🚀</p>
            <p style="margin-top: 20px; font-size: 12px; color: #999;">
              This email was sent by Velocity Labs<br>
              © 2025 Velocity Labs. All rights reserved.
            </p>
          </div>
        </body>
        </html>
      `
    } else {
      // Host notification email
      subject = `🔔 New Meeting Booked: ${title} with ${attendee.name}`
      htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>New Meeting Notification</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
            <h1 style="margin: 0; font-size: 28px;">📅 New Meeting Booked!</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">You have a new meeting scheduled</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
            <h2 style="color: #28a745; margin-top: 0;">👤 Client Information</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Name:</td>
                <td style="padding: 8px 0;">${attendee.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td>
                <td style="padding: 8px 0;"><a href="mailto:${attendee.email}" style="color: #28a745;">${attendee.email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Meeting Type:</td>
                <td style="padding: 8px 0;">${title} (${duration})</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Date & Time:</td>
                <td style="padding: 8px 0;">${date} at ${time} (${timezone})</td>
              </tr>
            </table>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${googleCalendarLink}" style="background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block; font-size: 16px;">
              📅 Add to Your Calendar
            </a>
          </div>
          
          <div style="background: #e8f4fd; padding: 20px; border-radius: 8px; border-left: 4px solid #28a745; margin-bottom: 25px;">
            <h3 style="color: #28a745; margin-top: 0;">📝 Project Details:</h3>
            <p style="margin: 0; font-style: italic;">"${attendee.message}"</p>
          </div>
          
          <div style="background: #fff3cd; padding: 15px; border-radius: 8px; border-left: 4px solid #ffc107;">
            <h4 style="color: #856404; margin-top: 0;">📋 Action Items:</h4>
            <ul style="margin: 0; color: #856404;">
              <li>Add this meeting to your Google Calendar</li>
              <li>Review the client's project details above</li>
              <li>Prepare relevant questions and materials</li>
              <li>Join the meeting 2-3 minutes early</li>
            </ul>
          </div>
          
          <div style="text-align: center; padding: 20px; border-top: 1px solid #eee; color: #666; font-size: 14px;">
            <p style="margin-top: 20px; font-size: 12px; color: #999;">
              This notification was sent by Velocity Labs Booking System<br>
              © 2025 Velocity Labs. All rights reserved.
            </p>
          </div>
        </body>
        </html>
      `
    }

    // Try to use Resend if available, otherwise use a fallback method
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import("resend")
        const resend = new Resend(process.env.RESEND_API_KEY)

        const emailData = await resend.emails.send({
          from: "Velocity Labs <bookings@velocitylabs.dev>",
          to: [to],
          subject: subject,
          html: htmlContent,
        })

        return NextResponse.json({ success: true, emailData })
      } catch (resendError) {
        console.error("Resend failed:", resendError)
        // Fall back to console logging
      }
    }

    // Fallback: Log email details
    console.log("=".repeat(50))
    console.log("EMAIL SENT (Simulated)")
    console.log("=".repeat(50))
    console.log(`To: ${to}`)
    console.log(`Subject: ${subject}`)
    console.log(`Type: ${type}`)
    console.log("=".repeat(50))

    return NextResponse.json({
      success: true,
      message: "Email sent (simulated - check console)",
      emailDetails: { to, subject, type },
    })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
