"use client"

import type React from "react"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Users, Target, TrendingUp, ExternalLink, Github, Monitor, Smartphone, Tablet } from "lucide-react"
import { useState } from "react"

interface CaseStudyModalProps {
  isOpen: boolean
  onClose: () => void
  project: {
    title: string
    description: string
    tags: string[]
    color: string
    features: string[]
    mainImage?: string
    screenshots?: {
      title: string
      image: string
      description: string
      component?: React.ReactNode
    }[]
  }
}

export function CaseStudyModal({ isOpen, onClose, project }: CaseStudyModalProps) {
  const [activeImage, setActiveImage] = useState(0)

  const getCaseStudyData = (title: string) => {
    switch (title) {
      case "Fintech Dashboard":
        return {
          client: "FinanceFlow Inc.",
          duration: "8 weeks",
          team: ["Frontend Developer", "Backend Developer", "UI/UX Designer"],
          challenge:
            "Create a comprehensive financial dashboard that provides real-time insights, transaction monitoring, and portfolio management for both individual and business users.",
          solution:
            "We developed a modern, responsive dashboard using React and D3.js for data visualization, with real-time WebSocket connections for live data updates and a clean, intuitive interface.",
          results: [
            "40% increase in user engagement",
            "60% reduction in support tickets",
            "99.9% uptime achieved",
            "50% faster data processing",
          ],
          technologies: ["React", "TypeScript", "D3.js", "Node.js", "PostgreSQL", "WebSocket", "AWS"],
          liveUrl: null,
          githubUrl: null,
        }

      case "Wellness App":
        return {
          client: "MindfulLife Wellness",
          duration: "6 weeks",
          team: ["Mobile Developer", "Backend Developer", "UI/UX Designer"],
          challenge:
            "Design and develop a comprehensive wellness app that helps users track their mental health, meditation progress, and overall wellbeing with personalized recommendations.",
          solution:
            "We created a React Native app with a beautiful, calming interface, integrated meditation timers, mood tracking, and AI-powered insights to help users maintain their wellness journey.",
          results: [
            "85% user retention rate",
            "4.8/5 app store rating",
            "200% increase in daily active users",
            "70% improvement in user wellness scores",
          ],
          technologies: ["React Native", "Expo", "Redux", "Node.js", "MongoDB", "Firebase", "AI/ML"],
          liveUrl: null,
          githubUrl: null,
        }

      case "E-Learning Platform":
        return {
          client: "EduTech Solutions",
          duration: "10 weeks",
          team: ["Full-stack Developer", "Frontend Developer", "UI/UX Designer", "DevOps Engineer"],
          challenge:
            "Build a scalable e-learning platform that supports video streaming, interactive quizzes, progress tracking, and real-time collaboration between students and instructors.",
          solution:
            "We developed a comprehensive platform using Next.js with video streaming capabilities, interactive components, real-time chat, and a robust content management system for educators.",
          results: [
            "500+ courses hosted successfully",
            "95% course completion rate",
            "30% increase in student engagement",
            "Zero downtime during peak usage",
          ],
          technologies: ["Next.js", "Tailwind CSS", "PostgreSQL", "WebRTC", "AWS S3", "Redis", "Docker"],
          liveUrl: null,
          githubUrl: null,
        }

      case "AI Content Studio":
        return {
          client: "ContentCraft Agency",
          duration: "12 weeks",
          team: ["AI Engineer", "Frontend Developer", "Backend Developer", "UI/UX Designer"],
          challenge:
            "Create an AI-powered content creation platform that helps marketers generate, optimize, and schedule social media content across multiple platforms with brand consistency.",
          solution:
            "We built an intelligent content studio using Vue.js and OpenAI API, featuring automated content generation, brand voice training, multi-platform scheduling, and performance analytics.",
          results: [
            "300% increase in content output",
            "80% reduction in content creation time",
            "90% brand consistency score",
            "150% improvement in engagement rates",
          ],
          technologies: ["Vue.js", "OpenAI API", "Express.js", "MongoDB", "Redis", "AWS", "Stripe"],
          liveUrl: null,
          githubUrl: null,
        }

      default:
        return null
    }
  }

  const caseStudy = getCaseStudyData(project.title)

  if (!caseStudy) return null

  // Get the appropriate main image based on project title
  const getMainImage = () => {
    switch (project.title) {
      case "Fintech Dashboard":
        return "/images/fintech-dashboard-main.png"
      case "Wellness App":
        return "/images/wellness-app-main.png"
      case "E-Learning Platform":
        return "/images/elearning-platform-main.png"
      case "AI Content Studio":
        return "/images/ai-content-studio-main.png"
      default:
        return "/placeholder.svg?height=600&width=1200&text=Project+Overview"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-white mb-2">{project.title}</DialogTitle>
          <p className="text-gray-400 text-lg">{project.description}</p>
        </DialogHeader>

        <div className="space-y-8">
          {/* Main Project Image */}
          <div className="relative rounded-lg overflow-hidden border border-gray-700 group">
            <img
              src={getMainImage() || "/placeholder.svg"}
              alt={project.title}
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6">
              <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
              <p className="text-gray-300 max-w-2xl">{project.description}</p>
            </div>
          </div>

          {/* Project Overview */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-blue-400" />
                  <span className="font-semibold">Client</span>
                </div>
                <p className="text-gray-300">{caseStudy.client}</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5 text-green-400" />
                  <span className="font-semibold">Duration</span>
                </div>
                <p className="text-gray-300">{caseStudy.duration}</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-5 h-5 text-purple-400" />
                  <span className="font-semibold">Team Size</span>
                </div>
                <p className="text-gray-300">{caseStudy.team.length} members</p>
              </CardContent>
            </Card>
          </div>

          {/* Challenge & Solution */}
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-white">The Challenge</h3>
              <p className="text-gray-300 leading-relaxed">{caseStudy.challenge}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-white">Our Solution</h3>
              <p className="text-gray-300 leading-relaxed">{caseStudy.solution}</p>
            </div>
          </div>

          {/* Project Screenshots */}
          {project.screenshots && project.screenshots.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-6 text-white">Project Showcase</h3>

              {/* Main Screenshot */}
              <div className="mb-4 relative rounded-lg overflow-hidden border border-gray-700">
                {project.screenshots[activeImage]?.component ? (
                  <div className="w-full bg-gray-900 p-4">{project.screenshots[activeImage].component}</div>
                ) : (
                  <div className="w-full h-96 bg-gray-800 flex items-center justify-center">
                    <div className="text-gray-400">Screenshot Preview</div>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm p-4">
                  <h4 className="font-medium text-white">{project.screenshots[activeImage]?.title || "Screenshot"}</h4>
                  <p className="text-sm text-gray-300">
                    {project.screenshots[activeImage]?.description || "Project screenshot"}
                  </p>
                </div>
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-3 gap-4">
                {project.screenshots.map((screenshot, index) => (
                  <div
                    key={index}
                    className={`relative cursor-pointer rounded-md overflow-hidden border-2 transition-all ${
                      activeImage === index ? "border-purple-500 scale-[1.02]" : "border-gray-700 hover:border-gray-500"
                    }`}
                    onClick={() => setActiveImage(index)}
                  >
                    {screenshot.component ? (
                      <div className="w-full h-24 bg-gray-800 flex items-center justify-center overflow-hidden">
                        <div className="scale-[0.3] origin-top-left w-[300%] h-[300%]">{screenshot.component}</div>
                      </div>
                    ) : (
                      <div className="w-full h-24 bg-gray-800 flex items-center justify-center">
                        <div className="text-xs text-gray-400">{screenshot.title}</div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <span className="text-white text-xs font-medium">{screenshot.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technologies Used */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {caseStudy.technologies.map((tech, index) => (
                <Badge key={index} className="bg-gray-800 text-gray-300 border-gray-700">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Results */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Results & Impact</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {caseStudy.results.map((result, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                  </div>
                  <span className="text-gray-300">{result}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Team */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Team Members</h3>
            <div className="flex flex-wrap gap-2">
              {caseStudy.team.map((role, index) => (
                <Badge key={index} className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                  {role}
                </Badge>
              ))}
            </div>
          </div>

          {/* Responsive Design Showcase */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Responsive Design</h3>
            <div className="flex items-center gap-6 text-gray-300">
              <div className="flex items-center gap-2">
                <Monitor className="w-5 h-5 text-blue-400" />
                <span>Desktop</span>
              </div>
              <div className="flex items-center gap-2">
                <Tablet className="w-5 h-5 text-green-400" />
                <span>Tablet</span>
              </div>
              <div className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-purple-400" />
                <span>Mobile</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-800">
            {caseStudy.liveUrl && (
              <Button
                onClick={() => window.open(caseStudy.liveUrl || "", "_blank")}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View Live Demo
              </Button>
            )}
            {caseStudy.githubUrl && (
              <Button
                variant="outline"
                onClick={() => window.open(caseStudy.githubUrl || "", "_blank")}
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
              >
                <Github className="w-4 h-4 mr-2" />
                View Code
              </Button>
            )}
            <Button
              variant="outline"
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
              onClick={() => window.open("/book?type=strategy-call", "_self")}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Discuss Similar Project
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
