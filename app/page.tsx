"use client"

import { useChat } from "@ai-sdk/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, Bot, User, Loader2 } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export default function ChatbotPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content:
          "Hello! I'm your AI assistant. I can help you with questions about our services, provide support, or just have a conversation. How can I assist you today?",
      },
    ],
  })

  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Mobile-first responsive container */}
      <div className="h-screen flex flex-col max-w-6xl mx-auto">
        {/* Header - responsive */}
        <div className="text-center py-4 px-4 md:py-8">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-1 md:mb-2">AI Customer Support</h1>
          <p className="text-sm md:text-base text-gray-600 hidden sm:block">
            Get instant answers to your questions with our AI-powered assistant
          </p>
        </div>

        {/* Main chat container - responsive height */}
        <div className="flex-1 px-2 md:px-4 pb-2 md:pb-4">
          <Card className="h-full flex flex-col shadow-xl">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg py-3 md:py-6">
              <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                <Bot className="w-5 h-5 md:w-6 md:h-6" />
                <span className="hidden sm:inline">Customer Support Chat</span>
                <span className="sm:hidden">Support Chat</span>
              </CardTitle>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col p-0 min-h-0">
              {/* Messages area - responsive */}
              <ScrollArea className="flex-1 p-2 md:p-4" ref={scrollAreaRef}>
                <div className="space-y-3 md:space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-2 md:gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`flex gap-2 md:gap-3 max-w-[85%] md:max-w-[80%] ${
                          message.role === "user" ? "flex-row-reverse" : "flex-row"
                        }`}
                      >
                        <Avatar className="w-7 h-7 md:w-8 md:h-8 flex-shrink-0">
                          <AvatarFallback
                            className={message.role === "user" ? "bg-blue-500 text-white" : "bg-gray-500 text-white"}
                          >
                            {message.role === "user" ? (
                              <User className="w-3 h-3 md:w-4 md:h-4" />
                            ) : (
                              <Bot className="w-3 h-3 md:w-4 md:h-4" />
                            )}
                          </AvatarFallback>
                        </Avatar>

                        <div
                          className={`rounded-lg px-3 py-2 md:px-4 md:py-2 ${
                            message.role === "user" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-900"
                          }`}
                        >
                          <p className="text-sm md:text-sm whitespace-pre-wrap break-words">{message.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex gap-2 md:gap-3 justify-start">
                      <Avatar className="w-7 h-7 md:w-8 md:h-8">
                        <AvatarFallback className="bg-gray-500 text-white">
                          <Bot className="w-3 h-3 md:w-4 md:h-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-gray-100 rounded-lg px-3 py-2 md:px-4 md:py-2">
                        <div className="flex items-center gap-2">
                          <Loader2 className="w-3 h-3 md:w-4 md:h-4 animate-spin" />
                          <span className="text-xs md:text-sm text-gray-600">Thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Error message - responsive */}
              {error && (
                <div className="px-3 py-2 md:px-4 md:py-2 bg-red-50 border-t border-red-200">
                  <p className="text-red-600 text-xs md:text-sm">Sorry, I encountered an error. Please try again.</p>
                </div>
              )}

              {/* Input area - responsive */}
              <div className="p-3 md:p-4 border-t bg-gray-50">
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <Input
                    value={input}
                    onChange={handleInputChange}
                    placeholder={isMobile ? "Type message..." : "Type your message here..."}
                    disabled={isLoading}
                    className="flex-1 text-sm md:text-base"
                  />
                  <Button type="submit" disabled={isLoading || !input.trim()} size={isMobile ? "sm" : "default"}>
                    <Send className="w-3 h-3 md:w-4 md:h-4" />
                    <span className="sr-only">Send message</span>
                  </Button>
                </form>
                <p className="text-xs text-gray-500 mt-2 hidden md:block">
                  This chatbot uses AI to provide helpful responses. For urgent matters, please contact our support team
                  directly.
                </p>
                <p className="text-xs text-gray-500 mt-1 md:hidden">
                  AI-powered responses • Contact support for urgent matters
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Feature cards - responsive grid */}
        <div className="px-2 md:px-4 pb-4 md:pb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardContent className="p-3 md:p-4">
                <h3 className="font-semibold mb-1 md:mb-2 text-sm md:text-base">Quick Support</h3>
                <p className="text-xs md:text-sm text-gray-600">
                  Get instant answers to common questions about our services.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardContent className="p-3 md:p-4">
                <h3 className="font-semibold mb-1 md:mb-2 text-sm md:text-base">24/7 Available</h3>
                <p className="text-xs md:text-sm text-gray-600">
                  Our AI assistant is available around the clock to help you.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur-sm sm:col-span-2 lg:col-span-1">
              <CardContent className="p-3 md:p-4">
                <h3 className="font-semibold mb-1 md:mb-2 text-sm md:text-base">Smart Responses</h3>
                <p className="text-xs md:text-sm text-gray-600">
                  Powered by advanced AI for relevant, helpful responses.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
