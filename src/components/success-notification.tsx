"use client"

import { useEffect } from "react"
import { CheckCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface SuccessNotificationProps {
  message: string
  show: boolean
  onClose: () => void
  autoClose?: boolean
  duration?: number
}

export default function SuccessNotification({
  message,
  show,
  onClose,
  autoClose = true,
  duration = 3000,
}: SuccessNotificationProps) {
  useEffect(() => {
    if (show && autoClose) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [show, autoClose, duration, onClose])

  if (!show) return null

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2">
      <Card className="bg-gradient-to-r from-green-500/20 to-emerald-600/20 backdrop-blur-sm border-green-500/30 shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-5 w-5 text-green-400" />
            <span className="text-white font-medium">{message}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-green-300 hover:text-white hover:bg-white/10 ml-2"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
