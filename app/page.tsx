"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  ArrowRight,
  Star,
  Zap,
  Rocket,
  Shield,
  Globe,
  Check,
  ExternalLink,
  Play,
  Bell,
  Sparkles,
  Layers,
  Code,
  TrendingUp,
  DollarSign,
  Activity,
  BarChart3,
  Clock,
  Heart,
  Moon,
  Target,
  Video,
  Award,
  PenTool,
  ImageIcon,
  BarChart,
  Search,
  Filter,
  Settings,
  ThumbsUp,
  Share2,
  Eye,
} from "lucide-react"
import { motion } from "framer-motion"
import { CaseStudyModal } from "@/components/case-study-modal"

export default function HomePage() {
  const [isYearly, setIsYearly] = useState(false)
  const [currentMonth, setCurrentMonth] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [isCaseStudyOpen, setIsCaseStudyOpen] = useState(false)

  // Refs for scrolling to sections
  const servicesRef = useRef<HTMLElement>(null)
  const workRef = useRef<HTMLElement>(null)
  const pricingRef = useRef<HTMLElement>(null)
  const testimonialsRef = useRef<HTMLElement>(null)

  const [pricingType, setPricingType] = useState('pro')

  useEffect(() => {
    // Get current month name
    const date = new Date()
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
    setCurrentMonth(monthNames[date.getMonth()])
    setIsLoaded(true)

    // Handle hash navigation on page load
    const hash = window.location.hash
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      }, 100)
    }
  }, [])

  // Scroll to section function
  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Booking functionality - redirect to internal booking page
  const openBooking = (meetingType: string) => {
    // window.location.href = `/book?type=${meetingType}`
    window.location.href = "https://cal.com/avijit-hazra" + (meetingType ? `/${meetingType}` : "")
  }

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  }

  // Screenshot UI Components
  const FinTechDashboardOverview = () => (
    <div className="w-full bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
      <div className="h-8 bg-gray-800 flex items-center px-3 gap-1.5">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <div className="text-xs text-gray-400 ml-2">FinanceFlow Dashboard</div>
      </div>
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Total Balance", value: "$24,156.00", change: "+12.5%", color: "blue" },
            { label: "Monthly Profit", value: "$3,247", change: "+8.2%", color: "green" },
            { label: "Investments", value: "$18,900", change: "+15.3%", color: "purple" },
            { label: "Savings", value: "$5,256", change: "+4.1%", color: "cyan" },
          ].map((stat, i) => (
            <div key={i} className={`bg-${stat.color}-500/10 border border-${stat.color}-500/20 rounded-lg p-4`}>
              <div className="text-xs text-gray-400 mb-1">{stat.label}</div>
              <div className="text-lg font-bold text-white">{stat.value}</div>
              <div className="text-xs text-green-400 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                {stat.change}
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-gray-800/50 rounded-lg p-4">
            <div className="text-sm font-medium text-white mb-4">Portfolio Performance</div>
            <div className="h-32 flex items-end gap-1">
              {[65, 45, 78, 52, 89, 67, 94, 73, 85, 91, 76, 88].map((height, i) => (
                <div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-blue-500 to-cyan-400 rounded-sm"
                  style={{ height: `${height}%` }}
                ></div>
              ))}
            </div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4">
            <div className="text-sm font-medium text-white mb-4">Asset Allocation</div>
            <div className="space-y-3">
              {[
                { name: "Stocks", percentage: 45, color: "blue" },
                { name: "Bonds", percentage: 30, color: "green" },
                { name: "Crypto", percentage: 15, color: "purple" },
                { name: "Cash", percentage: 10, color: "gray" },
              ].map((asset, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-xs text-gray-300">{asset.name}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-gray-700 rounded-full">
                      <div
                        className={`h-2 bg-${asset.color}-500 rounded-full`}
                        style={{ width: `${asset.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-400">{asset.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const FinTechTransactionHistory = () => (
    <div className="w-full bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
      <div className="h-8 bg-gray-800 flex items-center px-3 gap-1.5">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <div className="text-xs text-gray-400 ml-2">Transaction History</div>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Recent Transactions</h3>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </div>
        <div className="space-y-3">
          {[
            { company: "Apple Inc.", type: "Buy", amount: "+$1,234.56", date: "Today, 2:30 PM", status: "completed" },
            { company: "Tesla", type: "Sell", amount: "-$567.89", date: "Today, 1:15 PM", status: "completed" },
            { company: "Microsoft", type: "Buy", amount: "+$890.12", date: "Yesterday, 4:45 PM", status: "completed" },
            { company: "Amazon", type: "Buy", amount: "+$2,156.78", date: "Yesterday, 11:20 AM", status: "pending" },
            { company: "Google", type: "Sell", amount: "-$1,445.33", date: "2 days ago", status: "completed" },
          ].map((transaction, i) => (
            <div key={i} className="flex items-center justify-between bg-gray-800/30 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white">{transaction.company}</div>
                  <div className="text-xs text-gray-400">{transaction.date}</div>
                </div>
              </div>
              <div className="text-right">
                <div
                  className={`text-sm font-medium ${transaction.type === "Buy" ? "text-green-400" : "text-red-400"}`}
                >
                  {transaction.amount}
                </div>
                <div className="text-xs text-gray-400 capitalize">{transaction.status}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const WellnessMeditationTimer = () => (
    <div className="w-full bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
      <div className="h-8 bg-gray-800 flex items-center px-3 gap-1.5">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <div className="text-xs text-gray-400 ml-2">Meditation Timer</div>
      </div>
      <div className="p-8 text-center">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-2">5-Minute Breathing Exercise</h3>
          <p className="text-gray-400">Focus on your breath and find inner peace</p>
        </div>
        <div className="relative mb-8">
          <div className="w-48 h-48 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-400/20 border-4 border-green-500/30 mx-auto flex items-center justify-center">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-500 to-emerald-400 flex items-center justify-center">
              <Play className="w-12 h-12 text-white" />
            </div>
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-white">
            05:00
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: "Sessions Today", value: "3" },
            { label: "Total Time", value: "45m" },
            { label: "Streak", value: "7 days" },
          ].map((stat, i) => (
            <div key={i} className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
              <div className="text-lg font-bold text-white">{stat.value}</div>
              <div className="text-xs text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-4">
          <Button className="bg-green-500 hover:bg-green-600">Start Session</Button>
          <Button variant="outline" className="border-gray-600 text-gray-300">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>
    </div>
  )

  const ELearningCourseDashboard = () => (
    <div className="w-full bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
      <div className="h-8 bg-gray-800 flex items-center px-3 gap-1.5">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <div className="text-xs text-gray-400 ml-2">Course Dashboard</div>
      </div>
      <div className="p-6">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-2">My Learning Dashboard</h3>
          <p className="text-gray-400">Track your progress and continue learning</p>
        </div>
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
            <div className="text-sm text-gray-400 mb-2">Current Course</div>
            <div className="text-lg font-semibold text-white mb-2">React Development Masterclass</div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-400">Progress</span>
              <span className="text-xs text-purple-400">75% Complete</span>
            </div>
            <div className="w-full h-2 bg-gray-700 rounded-full">
              <div className="h-2 bg-gradient-to-r from-purple-500 to-indigo-400 rounded-full w-3/4"></div>
            </div>
          </div>
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <div className="text-sm text-gray-400 mb-2">Learning Stats</div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-lg font-bold text-white">24</div>
                <div className="text-xs text-gray-400">Lessons Completed</div>
              </div>
              <div>
                <div className="text-lg font-bold text-white">18h</div>
                <div className="text-xs text-gray-400">Total Watch Time</div>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="text-sm font-medium text-white mb-3">Enrolled Courses</div>
          {[
            { title: "React Development Masterclass", progress: 75, instructor: "John Doe" },
            { title: "Advanced JavaScript Concepts", progress: 45, instructor: "Jane Smith" },
            { title: "Node.js Backend Development", progress: 20, instructor: "Mike Johnson" },
          ].map((course, i) => (
            <div key={i} className="flex items-center justify-between bg-gray-800/30 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <Video className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white">{course.title}</div>
                  <div className="text-xs text-gray-400">by {course.instructor}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-purple-400">{course.progress}%</div>
                <div className="w-16 h-1 bg-gray-700 rounded-full mt-1">
                  <div className="h-1 bg-purple-500 rounded-full" style={{ width: `${course.progress}%` }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const AIContentGenerator = () => (
    <div className="w-full bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
      <div className="h-8 bg-gray-800 flex items-center px-3 gap-1.5">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <div className="text-xs text-gray-400 ml-2">AI Content Generator</div>
      </div>
      <div className="p-6">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-2">AI Content Studio</h3>
          <p className="text-gray-400">Generate engaging content with AI assistance</p>
        </div>
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="bg-pink-500/10 border border-pink-500/20 rounded-lg p-4">
            <div className="text-sm text-gray-400 mb-3">Content Prompt</div>
            <div className="bg-gray-800/50 rounded-lg p-3 mb-3">
              <div className="text-sm text-gray-300">
                "Create an engaging social media post about sustainable fashion trends for Gen Z audience. Include
                relevant hashtags and call-to-action."
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" className="bg-pink-500 hover:bg-pink-600">
                <PenTool className="w-4 h-4 mr-2" />
                Generate
              </Button>
              <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                <ImageIcon className="w-4 h-4 mr-2" />
                Add Image
              </Button>
            </div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4">
            <div className="text-sm text-gray-400 mb-3">Generated Content</div>
            <div className="bg-gray-700/50 rounded-lg p-3 mb-3">
              <div className="text-sm text-gray-300">
                "🌱 Sustainable fashion isn't just a trend—it's the future! ✨ From thrifted finds to eco-friendly
                brands, Gen Z is leading the charge towards conscious consumption. 💚 #SustainableFashion #EcoFriendly
                #GenZ #ThriftFinds"
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                  <ThumbsUp className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
              <Button size="sm" className="bg-pink-500 hover:bg-pink-600">
                Schedule Post
              </Button>
            </div>
          </div>
        </div>
        <div className="bg-gray-800/30 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-medium text-white">Today's Generation Stats</div>
            <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
              <Eye className="w-4 h-4 mr-2" />
              View All
            </Button>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "Posts Generated", value: "24", color: "pink" },
              { label: "Images Created", value: "12", color: "purple" },
              { label: "Videos Edited", value: "8", color: "blue" },
              { label: "Scheduled", value: "16", color: "green" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-lg font-bold text-white">{stat.value}</div>
                <div className="text-xs text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  // Featured projects with real UI mockups and screenshot components
  const projects = [
    {
      title: "Fintech Dashboard",
      description:
        "A comprehensive financial analytics platform with real-time data visualization, transaction monitoring, and AI-powered insights.",
      tags: ["React", "TypeScript", "D3.js", "Firebase"],
      color: "from-blue-500 to-cyan-400",
      features: ["Real-time analytics", "Interactive charts", "Dark/light mode", "Mobile responsive"],
      mainImage: "/images/fintech-dashboard-main.png",
      screenshots: [
        {
          title: "Dashboard Overview",
          image: "dashboard-overview",
          description: "Main dashboard with financial metrics and portfolio performance",
          component: <FinTechDashboardOverview />,
        },
        {
          title: "Transaction History",
          image: "transaction-history",
          description: "Detailed transaction history with filtering and search capabilities",
          component: <FinTechTransactionHistory />,
        },
        {
          title: "Investment Analytics",
          image: "investment-analytics",
          description: "Advanced analytics with predictive modeling and trend analysis",
          component: <FinTechDashboardOverview />,
        },
      ],
    },
    {
      title: "Wellness App",
      description:
        "A mindfulness and wellness application with meditation tracking, mood journaling, and personalized recommendations.",
      tags: ["React Native", "Expo", "Redux", "Node.js"],
      color: "from-green-500 to-emerald-400",
      features: ["Guided meditations", "Progress tracking", "Sleep analysis", "Community features"],
      mainImage: "/images/wellness-app-main.png",
      screenshots: [
        {
          title: "Meditation Timer",
          image: "meditation-timer",
          description: "Customizable meditation timer with ambient sounds and guided sessions",
          component: <WellnessMeditationTimer />,
        },
        {
          title: "Mood Tracking",
          image: "mood-tracking",
          description: "Daily mood tracking with pattern recognition and insights",
          component: <WellnessMeditationTimer />,
        },
        {
          title: "Sleep Analysis",
          image: "sleep-analysis",
          description: "Comprehensive sleep tracking with quality analysis and recommendations",
          component: <WellnessMeditationTimer />,
        },
      ],
    },
    {
      title: "E-Learning Platform",
      description:
        "An interactive learning management system with course creation tools, student progress tracking, and video conferencing.",
      tags: ["Next.js", "Tailwind CSS", "PostgreSQL", "WebRTC"],
      color: "from-purple-500 to-indigo-400",
      features: ["Interactive quizzes", "Video lessons", "Certificate generation", "Student analytics"],
      mainImage: "/images/elearning-platform-main.png",
      screenshots: [
        {
          title: "Course Dashboard",
          image: "course-dashboard",
          description: "Personalized dashboard showing enrolled courses and progress",
          component: <ELearningCourseDashboard />,
        },
        {
          title: "Video Player",
          image: "video-player",
          description: "Interactive video player with note-taking and bookmarking features",
          component: <ELearningCourseDashboard />,
        },
        {
          title: "Quiz Interface",
          image: "quiz-interface",
          description: "Engaging quiz interface with immediate feedback and explanations",
          component: <ELearningCourseDashboard />,
        },
      ],
    },
    {
      title: "AI Content Studio",
      description:
        "A content creation platform powered by AI that helps marketers generate, optimize, and schedule social media content.",
      tags: ["Vue.js", "OpenAI API", "Express", "MongoDB"],
      color: "from-pink-500 to-rose-400",
      features: ["AI text generation", "Image editing", "Content calendar", "Performance analytics"],
      mainImage: "/images/ai-content-studio-main.png",
      screenshots: [
        {
          title: "Content Generator",
          image: "content-generator",
          description: "AI-powered content generation tool with brand voice customization",
          component: <AIContentGenerator />,
        },
        {
          title: "Content Calendar",
          image: "content-calendar",
          description: "Visual content calendar with drag-and-drop scheduling",
          component: <AIContentGenerator />,
        },
        {
          title: "Analytics Dashboard",
          image: "analytics-dashboard",
          description: "Comprehensive analytics dashboard showing content performance metrics",
          component: <AIContentGenerator />,
        },
      ],
    },
  ]

  // Create UI mockup components for each project
  const FinTechDashboard = () => (
    <div className="w-full max-w-md bg-gray-900/90 backdrop-blur-sm rounded-lg border border-gray-700 shadow-xl overflow-hidden">
      {/* Header */}
      <div className="h-12 bg-gray-800 flex items-center px-4 gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <div className="text-xs text-gray-400 ml-2">FinanceFlow Dashboard</div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Top Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="w-4 h-4 text-blue-400" />
              <span className="text-xs text-gray-400">Total Balance</span>
            </div>
            <div className="text-lg font-bold text-white">$24,156.00</div>
            <div className="text-xs text-green-400 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +12.5%
            </div>
          </div>
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Activity className="w-4 h-4 text-green-400" />
              <span className="text-xs text-gray-400">Monthly Profit</span>
            </div>
            <div className="text-lg font-bold text-white">$3,247</div>
            <div className="text-xs text-green-400 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +8.2%
            </div>
          </div>
        </div>

        {/* Chart Area */}
        <div className="bg-gray-800/50 rounded-lg p-3">
          <div className="text-xs text-gray-400 mb-2">Portfolio Performance</div>
          <div className="h-20 flex items-end gap-1">
            {[65, 45, 78, 52, 89, 67, 94, 73, 85, 91, 76, 88].map((height, i) => (
              <div
                key={i}
                className="flex-1 bg-gradient-to-t from-blue-500 to-cyan-400 rounded-sm"
                style={{ height: `${height}%` }}
              ></div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="space-y-2">
          <div className="text-xs text-gray-400">Recent Transactions</div>
          {[
            { name: "Apple Inc.", amount: "+$1,234", type: "buy" },
            { name: "Tesla", amount: "-$567", type: "sell" },
            { name: "Microsoft", amount: "+$890", type: "buy" },
          ].map((transaction, i) => (
            <div key={i} className="flex items-center justify-between bg-gray-800/30 rounded p-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center">
                  <BarChart3 className="w-3 h-3 text-gray-400" />
                </div>
                <span className="text-xs text-gray-300">{transaction.name}</span>
              </div>
              <span className={`text-xs font-medium ${transaction.type === "buy" ? "text-green-400" : "text-red-400"}`}>
                {transaction.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const WellnessApp = () => (
    <div className="w-full max-w-md bg-gray-900/90 backdrop-blur-sm rounded-lg border border-gray-700 shadow-xl overflow-hidden">
      {/* Header */}
      <div className="h-12 bg-gray-800 flex items-center px-4 gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <div className="text-xs text-gray-400 ml-2">MindfulLife App</div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Welcome Message */}
        <div className="text-center">
          <div className="text-sm font-medium text-white mb-1">Good Morning, Sarah</div>
          <div className="text-xs text-gray-400">Ready for your daily mindfulness?</div>
        </div>

        {/* Today's Progress */}
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
          <div className="text-xs text-gray-400 mb-2">Today's Progress</div>
          <div className="flex justify-between items-center">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center mb-1">
                <Heart className="w-5 h-5 text-green-400" />
              </div>
              <div className="text-xs text-gray-400">Meditation</div>
              <div className="text-xs text-green-400 font-medium">15 min</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mb-1">
                <Moon className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-xs text-gray-400">Sleep</div>
              <div className="text-xs text-blue-400 font-medium">8.2 hrs</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mb-1">
                <Target className="w-5 h-5 text-purple-400" />
              </div>
              <div className="text-xs text-gray-400">Goals</div>
              <div className="text-xs text-purple-400 font-medium">3/4</div>
            </div>
          </div>
        </div>

        {/* Meditation Timer */}
        <div className="bg-gray-800/50 rounded-lg p-4 text-center">
          <div className="text-xs text-gray-400 mb-2">Quick Session</div>
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-400 mx-auto mb-3 flex items-center justify-center">
            <Play className="w-8 h-8 text-white" />
          </div>
          <div className="text-sm font-medium text-white mb-1">5-Minute Breathing</div>
          <div className="text-xs text-gray-400">Calm your mind</div>
        </div>

        {/* Streak Counter */}
        <div className="flex justify-between items-center bg-gray-800/30 rounded-lg p-3">
          <div>
            <div className="text-xs text-gray-400">Mindfulness Streak</div>
            <div className="text-lg font-bold text-white">7 days</div>
          </div>
          <div className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">+2 today</div>
        </div>
      </div>
    </div>
  )

  const ELearningPlatform = () => (
    <div className="w-full max-w-md bg-gray-900/90 backdrop-blur-sm rounded-lg border border-gray-700 shadow-xl overflow-hidden">
      {/* Header */}
      <div className="h-12 bg-gray-800 flex items-center px-4 gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <div className="text-xs text-gray-400 ml-2">EduTech Platform</div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Course Progress */}
        <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs text-gray-400">Current Course</div>
            <div className="text-xs text-purple-400">75% Complete</div>
          </div>
          <div className="text-sm font-medium text-white mb-2">React Development Masterclass</div>
          <div className="w-full h-2 bg-gray-700 rounded-full">
            <div
              className="h-2 bg-gradient-to-r from-purple-500 to-indigo-400 rounded-full"
              style={{ width: "75%" }}
            ></div>
          </div>
        </div>

        {/* Video Player */}
        <div className="bg-gray-800/50 rounded-lg overflow-hidden">
          <div className="h-24 bg-gray-700 flex items-center justify-center relative">
            <Video className="w-8 h-8 text-gray-400" />
            <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
              12:34 / 18:45
            </div>
          </div>
          <div className="p-3">
            <div className="text-xs text-gray-400 mb-1">Lesson 4</div>
            <div className="text-sm font-medium text-white">Component State Management</div>
          </div>
        </div>

        {/* Course Modules */}
        <div className="space-y-2">
          <div className="text-xs text-gray-400">Course Modules</div>
          {[
            { title: "Introduction to React", completed: true, duration: "45 min" },
            { title: "JSX and Components", completed: true, duration: "60 min" },
            { title: "State and Props", completed: true, duration: "75 min" },
            { title: "Event Handling", completed: false, duration: "50 min" },
          ].map((module, i) => (
            <div key={i} className="flex items-center justify-between bg-gray-800/30 rounded p-2">
              <div className="flex items-center gap-2">
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center ${
                    module.completed ? "bg-purple-500" : "bg-gray-700"
                  }`}
                >
                  {module.completed && <Check className="w-2 h-2 text-white" />}
                </div>
                <span className="text-xs text-gray-300">{module.title}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3 h-3 text-gray-400" />
                <span className="text-xs text-gray-400">{module.duration}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Achievement */}
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 flex items-center gap-3">
          <Award className="w-6 h-6 text-yellow-400" />
          <div>
            <div className="text-xs text-yellow-400 font-medium">Achievement Unlocked!</div>
            <div className="text-xs text-gray-400">Completed 3 lessons in a row</div>
          </div>
        </div>
      </div>
    </div>
  )

  const AIContentStudio = () => (
    <div className="w-full max-w-md bg-gray-900/90 backdrop-blur-sm rounded-lg border border-gray-700 shadow-xl overflow-hidden">
      {/* Header */}
      <div className="h-12 bg-gray-800 flex items-center px-4 gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <div className="text-xs text-gray-400 ml-2">ContentCraft Studio</div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* AI Generation Stats */}
        <div className="bg-pink-500/10 border border-pink-500/20 rounded-lg p-3">
          <div className="text-xs text-gray-400 mb-2">Today's Generation</div>
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center">
              <div className="text-lg font-bold text-white">24</div>
              <div className="text-xs text-gray-400">Posts</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-white">12</div>
              <div className="text-xs text-gray-400">Images</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-white">8</div>
              <div className="text-xs text-gray-400">Videos</div>
            </div>
          </div>
        </div>

        {/* Content Generator */}
        <div className="bg-gray-800/50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <PenTool className="w-4 h-4 text-pink-400" />
            <span className="text-xs text-gray-400">AI Content Generator</span>
          </div>
          <div className="bg-gray-700/50 rounded p-2 mb-2">
            <div className="text-xs text-gray-300">
              "Create an engaging social media post about sustainable fashion trends for Gen Z audience..."
            </div>
          </div>
          <div className="flex gap-2">
            <Button size="sm" className="bg-pink-500 hover:bg-pink-600 text-white text-xs px-3 py-1">
              Generate
            </Button>
            <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 text-xs px-3 py-1">
              <ImageIcon className="w-3 h-3 mr-1" />
              Add Image
            </Button>
          </div>
        </div>

        {/* Content Calendar */}
        <div className="space-y-2">
          <div className="text-xs text-gray-400">Content Calendar - June 2025</div>
          <div className="grid grid-cols-7 gap-1">
            {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
              <div key={i} className="text-xs text-gray-400 text-center p-1">
                {day}
              </div>
            ))}
            {[...Array(28)].map((_, i) => {
              const hasContent = [2, 5, 9, 14, 18, 21, 25].includes(i)
              return (
                <div
                  key={i}
                  className={`aspect-square rounded-sm flex items-center justify-center text-xs ${
                    hasContent
                      ? "bg-gradient-to-br from-pink-500 to-rose-400 text-white"
                      : "bg-gray-800/50 text-gray-400"
                  }`}
                >
                  {i + 1}
                </div>
              )
            })}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-gray-800/30 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <BarChart className="w-4 h-4 text-pink-400" />
            <span className="text-xs text-gray-400">This Week's Performance</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-sm font-bold text-white">2.4K</div>
              <div className="text-xs text-gray-400">Engagement</div>
            </div>
            <div>
              <div className="text-sm font-bold text-white">89%</div>
              <div className="text-xs text-gray-400">Quality Score</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-gray-800 sticky">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Velocity Labs</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection(servicesRef)}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection(workRef)}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Our Work
              </button>
              <button
                onClick={() => scrollToSection(pricingRef)}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Pricing
              </button>
              <button
                onClick={() => scrollToSection(testimonialsRef)}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Testimonials
              </button>
              <Button 
              onClick={() => openBooking("quick-chat")}
              className="bg-white text-black hover:bg-gray-100">
                Book a Call
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Rest of the component content remains the same */}
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

        <div className="max-w-7xl mx-auto text-center relative">
          <Badge className="mb-6 bg-purple-500/10 text-purple-400 border-purple-500/20">
            <Zap className="w-4 h-4 mr-2" />
            {"Slots Available for June →"}
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Ship Your Product in
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">14 Days</span>
          </h1>

          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            We build lightning-fast web applications and mobile apps that scale. From concept to launch, we deliver
            results that drive growth.
          </p>

          <Button
            size="lg"
            onClick={() => openBooking("quick-chat")}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 text-lg"
          >
            Book a Call <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>

        {/* Partner Logos */}
        <div className="mt-20 max-w-6xl mx-auto">
          <p className="text-center text-gray-500 mb-8">Trusted by innovative companies</p>
          <div className="flex justify-center items-center space-x-12 opacity-50">
            <div className="text-2xl font-bold">TechCorp</div>
            <div className="text-2xl font-bold">InnovateLab</div>
            <div className="text-2xl font-bold">StartupX</div>
            <div className="text-2xl font-bold">FutureApp</div>
            <div className="text-2xl font-bold">NextGen</div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} id="services" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What We Build</h2>
            <p className="text-gray-400 text-lg">Full-stack solutions that scale with your business</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gray-900 border-gray-800 p-6 hover:border-purple-500/50 transition-colors">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Web Applications</h3>
                <p className="text-gray-400">
                  Modern, responsive web apps built with React, Next.js, and cutting-edge technologies.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800 p-6 hover:border-pink-500/50 transition-colors">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-pink-500/10 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-pink-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Mobile Apps</h3>
                <p className="text-gray-400">
                  Native and cross-platform mobile applications that deliver exceptional user experiences.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800 p-6 hover:border-blue-500/50 transition-colors">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">API Development</h3>
                <p className="text-gray-400">Robust, scalable APIs and backend systems that power your applications.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Work Section */}
      <section ref={workRef} id="work" className="py-20 px-4 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Work</h2>
            <p className="text-gray-400 text-lg">Projects that drive results and exceed expectations</p>
          </div>

          <motion.div
            className="grid md:grid-cols-2 gap-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {projects.map((project, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="bg-gray-900 border-gray-800 overflow-hidden group hover:border-purple-500/50 transition-all duration-500">
                  <div className="relative">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20 group-hover:opacity-30 transition-opacity duration-500`}
                    ></div>
                    <div className="h-64 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>

                      {/* Project Preview UI */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        {project.title === "Fintech Dashboard" && <FinTechDashboard />}
                        {project.title === "Wellness App" && <WellnessApp />}
                        {project.title === "E-Learning Platform" && <ELearningPlatform />}
                        {project.title === "AI Content Studio" && <AIContentStudio />}
                      </div>
                    </div>

                    <Button
                      size="sm"
                      className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm hover:bg-black/70"
                      onClick={() => {
                        setSelectedProject(project)
                        setIsCaseStudyOpen(true)
                      }}
                    >
                      <Play className="w-4 h-4" />
                    </Button>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-purple-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 mb-4">{project.description}</p>

                    <div className="mb-4">
                      <div className="text-sm font-medium text-gray-300 mb-2">Key Features:</div>
                      <div className="flex flex-wrap gap-2">
                        {project.features.map((feature, i) => (
                          <div key={i} className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-full">
                            <Check className="w-3 h-3 inline mr-1 text-green-400" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} className="bg-gray-800 text-gray-300 border-gray-700">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex justify-between items-center">
                      <Button
                        variant="ghost"
                        className="text-purple-400 hover:text-purple-300 p-0"
                        onClick={() => {
                          setSelectedProject(project)
                          setIsCaseStudyOpen(true)
                        }}
                      >
                        View Case Study <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>

                      <div className="flex -space-x-2">
                        {[...Array(3)].map((_, i) => (
                          <div
                            key={i}
                            className="w-6 h-6 rounded-full bg-gray-700 border-2 border-gray-900 flex items-center justify-center text-xs text-white"
                          >
                            {["JD", "MK", "TS"][i]}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section ref={pricingRef} id="pricing" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Choose Your Plan</h2>
            <p className="text-gray-400 text-lg mb-8">Transparent pricing for every stage of your journey</p>

            {/* <div className="flex items-center justify-center space-x-4">
              <span className={`text-sm ${!isYearly ? "text-white" : "text-gray-400"}`}>Monthly</span>
              <Switch checked={isYearly} onCheckedChange={setIsYearly} className="data-[state=checked]:bg-purple-500" />
              <span className={`text-sm ${isYearly ? "text-white" : "text-gray-400"}`}>
                Yearly <Badge className="ml-2 bg-green-500/10 text-green-400 border-green-500/20">Save 20%</Badge>
              </span>
            </div> */}
          </div>

          <div className="max-w-md mx-auto">
            <Card className="relative bg-gray-900/80 border-gray-700 p-8 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="flex items-center justify-between mb-6">
                  <Badge className="bg-green-500/10 text-green-400 border-green-500/20">
                    <Bell className="w-4 h-4 mr-2" />1 Slots Left
                  </Badge>
                  <div className="flex items-center space-x-2">
                    <div 
                    onClick={() => setPricingType("standard")}
                    className={`${pricingType === "standard" ? "bg-gradient-to-r from-orange-400 to-yellow-400 px-3 py-1 rounded-full" : "bg-gray-800 px-3 py-1 rounded-full"} cursor-pointer`}>
                      <span className={pricingType === "standard"? "text-black font-semibold text-sm" :"text-gray-400"} >Standard</span>
                    </div>
                    <div 
                    onClick={() => setPricingType("pro")}
                    className={`${pricingType === "pro" ? "bg-gradient-to-r from-orange-400 to-yellow-400 px-3 py-1 rounded-full" : "bg-gray-800 px-3 py-1 rounded-full"} cursor-pointer`}>
                      <span className={pricingType === "pro"? "text-black font-semibold text-sm" :"text-gray-400"}>Pro 🔥</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <Badge className="bg-gray-800 text-gray-300 mb-2">Recurring Payment</Badge>
                  <div className="text-4xl font-bold mb-2 text-white">{pricingType === "pro" ? "$2997" : "$1997"}</div>
                  <p className="text-gray-400">{pricingType === "pro" ? "Recurring Payment for MVP Development" : "One time payment for MVP Development"}</p>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold mb-4 text-white">What's Included</h4>
                  <div className="space-y-3">
                    {(pricingType === "pro" ? [
                      "Everything in Standard +",
                      "Min 90 Hours of Development time per month",
                      "Time Flexibility",
                      "Continuous Maintenance and Updates",
                      "Quick Emergency Support",
                      "Marketing Support",
                    ] : [
                      "MVP Development in 1 Month",
                      "Founder Led Development",
                      "Free Maintenence for Next Month",
                      "Scalable Tech Stack Nextjs, Supabase",
                      "Regular Updates"
                    ]).map((feature, index) => (
                      <div key={index} className="flex items-center text-gray-300">
                        <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={() => openBooking("")}
                  className="w-full bg-white text-black hover:bg-gray-100 font-semibold"
                >
                  Reserve <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20 px-4 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Process</h2>
            <p className="text-gray-400 text-lg">From idea to launch in just 14 days</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Discovery",
                desc: "We understand your vision and requirements",
                icon: <Sparkles className="w-6 h-6 text-white" />,
              },
              {
                step: "02",
                title: "Design",
                desc: "Create beautiful, user-centered designs",
                icon: <Layers className="w-6 h-6 text-white" />,
              },
              {
                step: "03",
                title: "Develop",
                desc: "Build with modern, scalable technologies",
                icon: <Code className="w-6 h-6 text-white" />,
              },
              {
                step: "04",
                title: "Deploy",
                desc: "Launch and optimize for performance",
                icon: <Rocket className="w-6 h-6 text-white" />,
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section ref={testimonialsRef} id="testimonials" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What Clients Say</h2>
            <p className="text-gray-400 text-lg">Real results from real partnerships</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-gray-900 border-gray-800 p-6">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4">
                  "Velocity Labs delivered our MVP in record time. The quality exceeded our expectations and helped us
                  secure our Series A funding."
                </p>
                <div className="flex items-center">
                  <Avatar className="w-10 h-10 mr-3">
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-white">John Smith</p>
                    <p className="text-gray-400 text-sm">CEO, TechStartup</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800 p-6">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4">
                  "The team's expertise in modern web technologies is outstanding. They built exactly what we
                  envisioned, on time and on budget."
                </p>
                <div className="flex items-center">
                  <Avatar className="w-10 h-10 mr-3">
                    <AvatarFallback>MJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-white">Maria Johnson</p>
                    <p className="text-gray-400 text-sm">CTO, InnovateNow</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Build Something Amazing?</h2>
          <p className="text-gray-400 text-lg mb-8">
            {"Let's discuss your project and see how we can help you achieve your goals."}
          </p>
          <Button
            size="lg"
            onClick={() => openBooking('')}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 text-lg"
          >
            Schedule a Free Consultation
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Rocket className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">Velocity Labs</span>
          </div>
          <p className="text-gray-400 mb-2">© 2025 Velocity Labs. All rights reserved.</p>
          <p className="text-gray-400">
            Contact us: <a href="mailto:avijithazra.burd@gmail.com" className="text-purple-400 hover:text-purple-300">avijithazra.burd@gmail.com</a>
          </p>
        </div>
      </footer>
      {selectedProject && (
        <CaseStudyModal isOpen={isCaseStudyOpen} onClose={() => setIsCaseStudyOpen(false)} project={selectedProject} />
      )}
    </div>
  );
}