"use client"

import { useState } from "react"
import { Pause, SkipForward, Volume2, Maximize, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface KaraokePlayerProps {
  currentSong: {
    title: string
    artist: string
    singer: string
    youtubeId: string
    image?: string
  }
  onNext?: () => void
  onStop?: () => void
}

export default function YouTubeKaraokePlayer({ currentSong, onNext, onStop }: KaraokePlayerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)

  const handleFullscreen = () => {
    const iframe = document.querySelector("iframe")
    if (iframe) {
      if (!isFullscreen) {
        iframe.requestFullscreen?.()
      } else {
        document.exitFullscreen?.()
      }
      setIsFullscreen(!isFullscreen)
    }
  }

  return (
    <Card className="bg-black/20 backdrop-blur-sm border-white/10 text-white">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center">
            <Users className="h-5 w-5 mr-2 text-pink-400" />
            Karaoké en cours
          </span>
          <div className="flex items-center space-x-2">
            <Badge className="bg-red-500/20 text-red-300 border-red-500/30">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse" />
              LIVE
            </Badge>
            <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">YouTube Karaoké</Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Lecteur YouTube intégré */}
        <div className="relative">
          <div className="aspect-video rounded-lg overflow-hidden border-2 border-purple-500/30 bg-black">
            <iframe
              src={`https://www.youtube.com/embed/${currentSong.youtubeId}?autoplay=1&controls=1&rel=0&modestbranding=1&iv_load_policy=3&cc_load_policy=1`}
              title={`${currentSong.title} - ${currentSong.artist} Karaoké`}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          {/* Overlay avec informations */}
          <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm rounded-lg p-3">
            <div className="flex items-center space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-pink-500 text-white text-xs">
                  {currentSong.singer
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-white font-semibold text-sm">{currentSong.singer}</p>
                <p className="text-purple-200 text-xs">En train de chanter</p>
              </div>
            </div>
          </div>
        </div>

        {/* Informations de la chanson */}
        <div className="flex items-center space-x-4 bg-white/5 rounded-lg p-4">
          <img
            src={currentSong.image || "/placeholder.svg?height=60&width=60"}
            alt="Album cover"
            className="w-15 h-15 rounded-lg object-cover border border-purple-500/30"
          />
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white">{currentSong.title}</h3>
            <p className="text-purple-200">{currentSong.artist}</p>
            <div className="flex items-center mt-1">
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30 text-xs">Karaoké HD</Badge>
            </div>
          </div>
        </div>

        {/* Contrôles du karaoké */}
        <div className="flex items-center justify-center space-x-3">
          <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10" onClick={onNext}>
            <SkipForward className="h-4 w-4 mr-1" />
            Suivant
          </Button>

          <Button
            size="sm"
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
            onClick={handleFullscreen}
          >
            <Maximize className="h-4 w-4 mr-1" />
            Plein écran
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="border-red-500/30 text-red-300 hover:bg-red-500/10"
            onClick={onStop}
          >
            <Pause className="h-4 w-4 mr-1" />
            Arrêter
          </Button>
        </div>

        {/* Conseils karaoké */}
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-3 border border-blue-500/20">
          <div className="flex items-center space-x-2">
            <Volume2 className="h-4 w-4 text-blue-400" />
            <p className="text-blue-200 text-sm">
              <strong>Astuce :</strong> Utilisez les contrôles YouTube pour ajuster le volume et activer les sous-titres
              !
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
