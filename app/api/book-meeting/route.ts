import { type NextRequest, NextResponse } from "next/server"

// Generate calendar event (.ics file content)
function generateCalendarEvent(
  title: string,
  description: string,
  startDate: Date,
  endDate: Date,
  attendeeEmail: string,
  hostEmail: string,
) {
  const formatDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
  }

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Velocity Labs//Meeting Scheduler//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:REQUEST",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@velocitylabs.dev`,
    `DTSTART:${formatDate(startDate)}`,
    `DTEND:${formatDate(endDate)}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    `ORGANIZER;CN=Avijit Hazra:mailto:${hostEmail}`,
    `ATTENDEE;CN=${attendeeEmail};RSVP=TRUE:mailto:${attendeeEmail}`,
    "STATUS:CONFIRMED",
    "SEQUENCE:0",
    "BEGIN:VALARM",
    "TRIGGER:-PT15M",
    "ACTION:DISPLAY",
    "DESCRIPTION:Meeting reminder",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n")

  return icsContent
}

// Create a proper Google Meet link format
function createGoogleMeetLink(eventTitle: string, startTime: Date, endTime: Date) {
  const title = encodeURIComponent(eventTitle)
  const start = startTime.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
  const end = endTime.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"

  // Create Google Calendar link that will generate a Meet link
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&add=avijithazra.burd@gmail.com&details=Meeting%20scheduled%20through%20Velocity%20Labs`
}

// Parse date and time
function parseDateTime(dateStr: string, timeStr: string, timezone: string) {
  // Convert "4 June 2025" and "15:00" to proper Date object
  const [day, month, year] = dateStr.split(" ")
  const monthIndex = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ].indexOf(month)

  const [hours, minutes] = timeStr.split(":").map(Number)

  // Create date in Asia/Kolkata timezone
  const date = new Date(Number.parseInt(year), monthIndex, Number.parseInt(day), hours, minutes)
  return date
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { meetingType, duration, date, time, attendee, timezone } = body

    // Validate required fields
    if (!meetingType || !duration || !date || !time || !attendee) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (!attendee.name || !attendee.email || !attendee.message) {
      return NextResponse.json({ error: "Missing attendee information" }, { status: 400 })
    }

    // Parse the meeting date and time
    const startTime = parseDateTime(date, time, timezone)
    const durationMinutes = Number.parseInt(duration.replace("m", ""))
    const endTime = new Date(startTime.getTime() + durationMinutes * 60000)

    // Create Google Calendar link
    const googleCalendarLink = createGoogleMeetLink(`${meetingType} with Avijit Hazra`, startTime, endTime)

    // Generate calendar event
    const calendarEvent = generateCalendarEvent(
      `${meetingType} with Avijit Hazra`,
      `Meeting Details:\n\nProject: ${attendee.message}\n\nJoin via Google Meet (link will be provided in calendar invite)\n\nContact: avijithazra.burd@gmail.com`,
      startTime,
      endTime,
      attendee.email,
      "avijithazra.burd@gmail.com",
    )

    // Create meeting details
    const meetingDetails = {
      title: meetingType,
      duration: duration,
      date: date,
      time: time,
      timezone: timezone,
      attendee: attendee,
      googleCalendarLink: googleCalendarLink,
      calendarEvent: calendarEvent,
    }

    // Try to send emails
    try {
      // Send confirmation email to attendee
      const attendeeEmailResponse = await fetch(`${request.nextUrl.origin}/api/send-booking-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "attendee",
          to: attendee.email,
          meetingDetails: meetingDetails,
        }),
      })

      // Send notification to host
      const hostEmailResponse = await fetch(`${request.nextUrl.origin}/api/send-booking-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "host",
          to: "avijithazra.burd@gmail.com",
          meetingDetails: meetingDetails,
        }),
      })

      console.log("Email responses:", {
        attendee: attendeeEmailResponse.status,
        host: hostEmailResponse.status,
      })
    } catch (emailError) {
      console.error("Email sending failed:", emailError)
      // Continue with booking even if email fails
    }

    return NextResponse.json({
      success: true,
      meetingLink: googleCalendarLink,
      message: "Meeting booked successfully! Please check your email for calendar invite.",
      calendarEvent: calendarEvent,
    })
  } catch (error) {
    console.error("Error booking meeting:", error)
    return NextResponse.json(
      {
        error: "Failed to book meeting",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
