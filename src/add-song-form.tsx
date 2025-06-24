"use client"

import type React from "react"

import { useState } from "react"
import { Music, Youtube, Save, X, Play, Search, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"

interface Song {
  title: string
  artist: string
  genre: string
  youtubeUrl: string
  youtubeId: string
  duration: string
  difficulty: string
  language: string
  description: string
}

interface AddSongFormProps {
  onClose?: () => void
  onSave?: (song: Song) => void
}

export default function AddSongForm({ onClose, onSave }: AddSongFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [songData, setSongData] = useState({
    title: "",
    artist: "",
    genre: "",
    youtubeUrl: "",
    youtubeId: "",
    duration: "",
    difficulty: "",
    language: "",
    description: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Extraire l'ID YouTube de l'URL
    const youtubeId = extractYouTubeId(songData.youtubeUrl)
    const finalSongData = { ...songData, youtubeId }

    // Simulation de sauvegarde
    setTimeout(() => {
      setIsLoading(false)

      // Sauvegarder dans localStorage
      const existingSongs = JSON.parse(localStorage.getItem("karaokeLibrary") || "[]")
      const newSong = {
        ...finalSongData,
        id: Date.now(), // ID unique basé sur timestamp
        popularity: Math.floor(Math.random() * 40) + 60, // Popularité aléatoire entre 60-100
      }

      const updatedSongs = [...existingSongs, newSong]
      localStorage.setItem("karaokeLibrary", JSON.stringify(updatedSongs))

      onSave?.(finalSongData)
      console.log("Chanson ajoutée:", finalSongData)

      // Redirection vers le dashboard
      alert("Chanson ajoutée avec succès ! 🎵")
      window.location.href = "/dashboard"
    }, 2000)
  }

  const extractYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : ""
  }

  const handleInputChange = (field: string, value: string) => {
    setSongData((prev) => ({ ...prev, [field]: value }))
  }

  const handleYouTubeUrlChange = (url: string) => {
    setSongData((prev) => ({
      ...prev,
      youtubeUrl: url,
      youtubeId: extractYouTubeId(url),
    }))
  }

  const genres = ["Rock", "Pop", "Disco", "R&B", "Country", "Rap", "Classique", "Variété Française"]
  const difficulties = ["Facile", "Moyen", "Difficile", "Expert"]
  const languages = ["Français", "Anglais", "Espagnol", "Italien", "Autre"]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Ajouter une chanson</h1>
            <p className="text-purple-200">Enrichissez votre bibliothèque karaoké</p>
          </div>
          {onClose && (
            <Button
              variant="outline"
              size="icon"
              className="border-white/20 text-white hover:bg-white/10"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        <Card className="bg-black/20 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Music className="h-5 w-5 mr-2 text-pink-400" />
              Informations de la chanson
            </CardTitle>
            <CardDescription className="text-purple-200">
              Ajoutez une nouvelle chanson à votre bibliothèque karaoké
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Titre et Artiste */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-white">
                    Titre de la chanson *
                  </Label>
                  <Input
                    id="title"
                    type="text"
                    placeholder="Ex: Bohemian Rhapsody"
                    value={songData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-purple-300 focus:border-purple-400"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="artist" className="text-white">
                    Artiste *
                  </Label>
                  <Input
                    id="artist"
                    type="text"
                    placeholder="Ex: Queen"
                    value={songData.artist}
                    onChange={(e) => handleInputChange("artist", e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-purple-300 focus:border-purple-400"
                    required
                  />
                </div>
              </div>

              {/* URL YouTube */}
              <div className="space-y-2">
                <Label htmlFor="youtubeUrl" className="text-white flex items-center">
                  <Youtube className="h-4 w-4 mr-2 text-red-400" />
                  Lien YouTube Karaoké *
                </Label>
                <Input
                  id="youtubeUrl"
                  type="url"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={songData.youtubeUrl}
                  onChange={(e) => handleYouTubeUrlChange(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-purple-300 focus:border-purple-400"
                  required
                />
                {songData.youtubeId && (
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                      ✓ ID YouTube détecté: {songData.youtubeId}
                    </Badge>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="border-purple-500/30 text-purple-300 hover:bg-purple-500/20 hover:text-white"
                      onClick={() => window.open(songData.youtubeUrl, "_blank")}
                    >
                      <Play className="h-3 w-3 mr-1" />
                      Tester
                    </Button>
                  </div>
                )}
              </div>

              {/* Aperçu YouTube */}
              {songData.youtubeId && (
                <Card className="bg-white/5 border-white/10">
                  <CardContent className="p-4">
                    <div className="aspect-video rounded-lg overflow-hidden">
                      <iframe
                        src={`https://www.youtube.com/embed/${songData.youtubeId}?controls=1&rel=0`}
                        title="Aperçu YouTube"
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Genre */}
              <div className="space-y-3">
                <Label className="text-white">Genre musical</Label>
                <div className="flex flex-wrap gap-2">
                  {genres.map((genre) => (
                    <Badge
                      key={genre}
                      className={`cursor-pointer transition-all ${
                        songData.genre === genre
                          ? "bg-purple-600 text-white border-purple-500"
                          : "bg-white/10 text-purple-200 border-white/20 hover:bg-white/20"
                      }`}
                      onClick={() => handleInputChange("genre", genre)}
                    >
                      {genre}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Détails supplémentaires */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-white">Difficulté</Label>
                  <div className="flex flex-wrap gap-1">
                    {difficulties.map((diff) => (
                      <Badge
                        key={diff}
                        className={`cursor-pointer text-xs ${
                          songData.difficulty === diff
                            ? "bg-pink-600 text-white border-pink-500"
                            : "bg-white/10 text-purple-200 border-white/20 hover:bg-white/20"
                        }`}
                        onClick={() => handleInputChange("difficulty", diff)}
                      >
                        <Star className="h-2 w-2 mr-1" />
                        {diff}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Langue</Label>
                  <div className="flex flex-wrap gap-1">
                    {languages.map((lang) => (
                      <Badge
                        key={lang}
                        className={`cursor-pointer text-xs ${
                          songData.language === lang
                            ? "bg-blue-600 text-white border-blue-500"
                            : "bg-white/10 text-purple-200 border-white/20 hover:bg-white/20"
                        }`}
                        onClick={() => handleInputChange("language", lang)}
                      >
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration" className="text-white">
                    Durée (mm:ss)
                  </Label>
                  <Input
                    id="duration"
                    type="text"
                    placeholder="03:45"
                    value={songData.duration}
                    onChange={(e) => handleInputChange("duration", e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-purple-300 focus:border-purple-400"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-white">
                  Notes / Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Notes sur la chanson, conseils pour les chanteurs..."
                  value={songData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-purple-300 focus:border-purple-400 min-h-[80px]"
                />
              </div>

              {/* Boutons */}
              <div className="flex space-x-4 pt-4">
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3"
                  disabled={isLoading || !songData.youtubeId}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                      Ajout...
                    </div>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Ajouter la chanson
                    </>
                  )}
                </Button>
                {onClose && (
                  <Button
                    type="button"
                    variant="outline"
                    className="border-purple-500/30 text-purple-300 hover:bg-purple-500/20 hover:text-white"
                    onClick={onClose}
                  >
                    Annuler
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Résumé */}
        {songData.title && songData.artist && (
          <Card className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 backdrop-blur-sm border-blue-500/30 mt-6">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Search className="h-5 w-5 mr-2 text-blue-400" />
                Résumé de la chanson
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-white">
                <p>
                  <strong>Titre:</strong> {songData.title}
                </p>
                <p>
                  <strong>Artiste:</strong> {songData.artist}
                </p>
                <p>
                  <strong>Genre:</strong> {songData.genre || "Non défini"}
                </p>
                <p>
                  <strong>Difficulté:</strong> {songData.difficulty || "Non définie"}
                </p>
                <p>
                  <strong>Langue:</strong> {songData.language || "Non définie"}
                </p>
                <p>
                  <strong>YouTube ID:</strong> {songData.youtubeId || "Non détecté"}
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
