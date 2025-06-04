"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Clock,
  Video,
  Globe,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Calendar,
  User,
  Mail,
  MessageSquare,
  Loader2,
  Download,
  ExternalLink,
} from "lucide-react"
import Link from "next/link"

export default function BookingPage() {
  const searchParams = useSearchParams()
  const meetingType = searchParams.get("type") || "quick-chat"

  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 5)) // June 2025
  const [selectedDate, setSelectedDate] = useState(4)
  const [selectedTime, setSelectedTime] = useState("15:00")
  const [step, setStep] = useState(1) // 1: Select time, 2: Enter details, 3: Confirmation
  const [isLoading, setIsLoading] = useState(false)
  const [meetingLink, setMeetingLink] = useState("")
  const [calendarEvent, setCalendarEvent] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const timeSlots = [
    "14:15",
    "14:30",
    "14:45",
    "15:00",
    "15:15",
    "15:30",
    "15:45",
    "16:00",
    "16:15",
    "16:30",
    "16:45",
    "17:00",
  ]

  const meetingTypes = {
    "quick-chat": {
      title: "Quick Chat",
      description: "A Quick Meeting to discuss the Idea.",
      duration: "15m",
    },
    "strategy-call": {
      title: "Strategy Call",
      description: "Comprehensive discussion about your project requirements and timeline.",
      duration: "30m",
    },
    "pro-consultation": {
      title: "InDepth Discussion",
      description: "Meet for In Depth discussion for the idea and MVP",
      duration: "30m",
    },
  }

  const currentMeeting = meetingTypes[meetingType as keyof typeof meetingTypes] || meetingTypes["quick-chat"]

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }

    return days
  }

  const monthNames = [
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
  ]

  const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]

  const handleBooking = async () => {
    setIsLoading(true)

    try {
      const bookingData = {
        meetingType: currentMeeting.title,
        duration: currentMeeting.duration,
        date: `${selectedDate} ${monthNames[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`,
        time: selectedTime,
        attendee: formData,
        timezone: "Asia/Kolkata",
      }

      const response = await fetch("/api/book-meeting", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      })

      // Check if response is ok before trying to parse JSON
      if (!response.ok) {
        const errorText = await response.text()
        console.error("Response not ok:", response.status, errorText)
        throw new Error(`HTTP ${response.status}: ${errorText}`)
      }

      // Check if response is JSON
      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        const responseText = await response.text()
        console.error("Response is not JSON:", responseText)
        throw new Error("Server returned non-JSON response")
      }

      const result = await response.json()

      if (result.success) {
        setMeetingLink(result.meetingLink)
        setCalendarEvent(result.calendarEvent)
        setStep(3)
      } else {
        throw new Error(result.error || "Failed to book meeting")
      }
    } catch (error) {
      console.error("Booking error:", error)
      let errorMessage = "Failed to book meeting. Please try again."

      if (error instanceof Error) {
        errorMessage = error.message
      }

      alert(`Booking failed: ${errorMessage}`)
    } finally {
      setIsLoading(false)
    }
  }

  const downloadCalendarEvent = () => {
    if (calendarEvent) {
      const blob = new Blob([calendarEvent], { type: "text/calendar" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "meeting-invite.ics"
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  if (step === 3) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <Card className="bg-gray-900 border-gray-800 max-w-2xl w-full">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-8 h-8 text-green-400" />
            </div>

            <h1 className="text-3xl font-bold mb-4">Booking Confirmed! 🎉</h1>
            <p className="text-gray-400 mb-8">
              Your meeting has been scheduled successfully. Please add this meeting to your Google Calendar to get the
              Google Meet link.
            </p>

            <div className="bg-gray-800 rounded-lg p-6 mb-8 text-left">
              <h3 className="font-semibold mb-4 text-center">Meeting Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Meeting:</span>
                  <span>{currentMeeting.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Date:</span>
                  <span>
                    {selectedDate} {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Time:</span>
                  <span>{selectedTime} (Asia/Kolkata)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Duration:</span>
                  <span>{currentMeeting.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Host:</span>
                  <span>Avijit Hazra</span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4 mb-6">
              <h4 className="text-yellow-400 font-semibold mb-2">📅 Next Steps:</h4>
              <ol className="text-left text-gray-300 space-y-1 text-sm">
                <li>1. Click "Add to Google Calendar" below</li>
                <li>2. Google will automatically create a Meet link</li>
                <li>3. You'll receive the Meet link in your calendar</li>
                <li>4. Join the meeting 2-3 minutes early</li>
              </ol>
            </div>

            <div className="space-y-4">
              <Button
                onClick={() => window.open(meetingLink, "_blank")}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Add to Google Calendar
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>

              {calendarEvent && (
                <Button
                  onClick={downloadCalendarEvent}
                  variant="outline"
                  className="w-full border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Calendar File (.ics)
                </Button>
              )}

              <Link href="/">
                <Button variant="outline" className="w-full border-gray-700 text-gray-300 hover:bg-gray-800">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>

            <p className="text-gray-500 text-sm mt-6">
              Need to reschedule? Contact us at{" "}
              <a href="mailto:avijithazra.burd@gmail.com" className="text-purple-400 hover:text-purple-300">
                avijithazra.burd@gmail.com
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-gray-800 p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center text-gray-400 hover:text-white">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">Book a Meeting</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4">
        {step === 1 && (
          <div className="grid lg:grid-cols-[400px_1fr] gap-8 mt-8">
            {/* Left Panel - Meeting Info */}
            <div className="space-y-6">
              {/* Profile Section */}
              <Card className="bg-gray-900 border-gray-800 p-6">
                <CardContent className="p-0">
                  <div className="flex items-center space-x-4 mb-6">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src="/images/avijit-profile.jpg" alt="Avijit Hazra" />
                      <AvatarFallback className="bg-purple-500 text-white text-lg">AH</AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-2xl font-bold text-white">Avijit Hazra</h2>
                      <p className="text-gray-400">Founder & Lead Developer</p>
                    </div>
                  </div>

                  <div className="space-y-4 text-gray-300">
                    <p>
                      <strong>Hey there,</strong>
                    </p>
                    <p>
                      I'm Avijit founder of <strong>Velocity Labs</strong>, an agency where founders come to turn their
                      product ideas into MVPs and raise capital.
                    </p>
                    <p>
                      We specialize in building all kinds of <strong>Web products, AI apps, and AI automations</strong>.
                    </p>
                    <p className="flex items-start">
                      <Calendar className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                      <em>Please book a meeting slot only if you're serious about building an MVP with us.</em>
                    </p>
                    <p>
                      And don't forget to <strong>add some context</strong> about what you're looking to build it helps
                      us come prepared.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Meeting Options */}
              <div className="space-y-4">
                <Card
                  className={`bg-gray-900 border-gray-800 p-4 cursor-pointer transition-colors ${
                    meetingType === "quick-chat"
                      ? "border-purple-500 ring-1 ring-purple-500/20"
                      : "hover:border-gray-700"
                  }`}
                  onClick={() => (window.location.href = "/book?type=quick-chat")}
                >
                  <CardContent className="p-0">
                    <h3 className="font-semibold text-white mb-1">Quick Chat</h3>
                    <p className="text-gray-400 text-sm mb-2">A Quick Meeting to discuss the Idea.</p>
                    <div className="flex items-center text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      <span className="text-sm">15m</span>
                    </div>
                  </CardContent>
                </Card>

                <Card
                  className={`bg-gray-900 border-gray-800 p-4 cursor-pointer transition-colors ${
                    meetingType === "pro-consultation"
                      ? "border-purple-500 ring-1 ring-purple-500/20"
                      : "hover:border-gray-700"
                  }`}
                  onClick={() => (window.location.href = "/book?type=pro-consultation")}
                >
                  <CardContent className="p-0">
                    <h3 className="font-semibold text-white mb-1">InDepth Discussion</h3>
                    <p className="text-gray-400 text-sm mb-2">Meet for In Depth discussion for the idea and MVP</p>
                    <div className="flex items-center text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      <span className="text-sm">30m</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Right Panel - Calendar */}
            <Card className="bg-gray-900 border-gray-800 p-6">
              <CardContent className="p-0">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{currentMeeting.title}</h3>
                  <div className="flex items-center space-x-4 text-gray-400">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{currentMeeting.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <Video className="w-4 h-4 mr-2" />
                      <span>Google Meet</span>
                    </div>
                    <div className="flex items-center">
                      <Globe className="w-4 h-4 mr-2" />
                      <span>Asia/Kolkata</span>
                    </div>
                  </div>
                </div>

                {/* Calendar Header */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-white">
                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                      className="text-gray-400 hover:text-white"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                      className="text-gray-400 hover:text-white"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Week Days */}
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {weekDays.map((day) => (
                    <div key={day} className="text-center text-gray-400 text-sm font-medium py-2">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-2 mb-6">
                  {getDaysInMonth(currentMonth).map((day, index) => (
                    <button
                      key={index}
                      onClick={() => day && setSelectedDate(day)}
                      className={`
                        h-10 rounded-lg text-sm font-medium transition-colors
                        ${!day ? "invisible" : ""}
                        ${day === selectedDate ? "bg-white text-black" : "text-gray-300 hover:bg-gray-800"}
                      `}
                      disabled={!day}
                    >
                      {day}
                    </button>
                  ))}
                </div>

                {/* Time Slots */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-white">
                      {weekDays[new Date(currentMonth.getFullYear(), currentMonth.getMonth(), selectedDate).getDay()]}{" "}
                      {selectedDate.toString().padStart(2, "0")}
                    </h4>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" className="text-gray-400">
                        12h
                      </Button>
                      <Button variant="ghost" size="sm" className="text-white bg-gray-800">
                        24h
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`
                          px-4 py-2 rounded-lg text-sm transition-colors text-center
                          ${
                            time === selectedTime
                              ? "bg-purple-500 text-white"
                              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                          }
                        `}
                      >
                        {time}
                      </button>
                    ))}
                  </div>

                  <Button
                    onClick={() => setStep(2)}
                    className="w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    Continue
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {step === 2 && (
          <div className="max-w-2xl mx-auto mt-8">
            <Card className="bg-gray-900 border-gray-800 p-8">
              <CardContent className="p-0">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-white mb-2">Enter Your Details</h2>
                  <p className="text-gray-400">Please provide your information so we can prepare for our meeting.</p>
                </div>

                {/* Meeting Summary */}
                <div className="bg-gray-800 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-white mb-2">Meeting Summary</h3>
                  <div className="text-sm text-gray-300 space-y-1">
                    <p>
                      <strong>{currentMeeting.title}</strong> ({currentMeeting.duration})
                    </p>
                    <p>
                      {selectedDate} {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()} at{" "}
                      {selectedTime}
                    </p>
                    <p>Google Meet • Asia/Kolkata timezone</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      Full Name *
                    </label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your full name"
                      className="bg-gray-800 border-gray-700 text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Enter your email address"
                      className="bg-gray-800 border-gray-700 text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <MessageSquare className="w-4 h-4 inline mr-2" />
                      Tell us about your project *
                    </label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your project idea, goals, and what you'd like to discuss..."
                      className="bg-gray-800 border-gray-700 text-white min-h-[120px]"
                      required
                    />
                  </div>
                </div>

                <div className="flex space-x-4 mt-8">
                  <Button
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800"
                    disabled={isLoading}
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleBooking}
                    disabled={!formData.name || !formData.email || !formData.message || isLoading}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Booking...
                      </>
                    ) : (
                      "Confirm Booking"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
