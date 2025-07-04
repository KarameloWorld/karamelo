"use client"
import { Calendar, Plus, Edit, Trash2, Users, Clock, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useKaraokeData } from "./hooks/use-karaoke-data"

// Données de démonstration des soirées (non utilisé actuellement)
/*
const initialEvents = [
  {
    id: 1,
    name: "Soirée Hits des années 80",
    date: "2024-12-15",
    startTime: "20:00",
    endTime: "00:00",
    theme: "Hits des années 80",
    participants: 24,
    maxParticipants: 50,
    location: "Bar Le Melody",
    status: "En cours",
    description: "Une soirée nostalgique avec les plus grands hits des années 80 !",
  },
  {
    id: 2,
    name: "Spécial Noël",
    date: "2024-12-22",
    startTime: "19:30",
    endTime: "01:00",
    theme: "Spécial Noël",
    participants: 18,
    maxParticipants: 40,
    location: "Bar Le Melody",
    status: "Programmée",
    description: "Chantez vos chansons de Noël préférées dans une ambiance festive !",
  },
  {
    id: 3,
    name: "Réveillon 2025",
    date: "2024-12-31",
    startTime: "21:00",
    endTime: "06:00",
    theme: "Réveillon 2025",
    participants: 35,
    maxParticipants: 60,
    location: "Bar Le Melody",
    status: "Programmée",
    description: "Fêtez la nouvelle année en musique avec notre soirée karaoké géante !",
  },
  {
    id: 4,
    name: "Rock Legends",
    date: "2025-01-15",
    startTime: "20:00",
    endTime: "23:30",
    theme: "Rock Legends",
    participants: 0,
    maxParticipants: 45,
    location: "Bar Le Melody",
    status: "Ouverte",
    description: "Une soirée dédiée aux légendes du rock ! Sortez vos voix les plus puissantes.",
  },
]
*/

export default function EventManagement() {
  const { events, deleteEvent } = useKaraokeData()

  const handleAddEvent = () => {
    window.location.href = "/add-event"
  }

  const handleEditEvent = (eventId: number) => {
    console.log("Modifier soirée:", eventId)
    // Redirection vers formulaire d'édition
  }

  const handleDeleteEvent = (eventId: number) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette soirée ?")) {
      deleteEvent(eventId)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "En cours":
        return "bg-green-500/20 text-green-300 border-green-500/30"
      case "Programmée":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30"
      case "Ouverte":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
      case "Terminée":
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
      default:
        return "bg-purple-500/20 text-purple-300 border-purple-500/30"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Gestion des Soirées</h1>
            <p className="text-purple-200">Organisez et gérez vos événements karaoké</p>
          </div>
          <Button
            onClick={handleAddEvent}
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nouvelle soirée
          </Button>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-gradient-to-r from-green-500/20 to-emerald-600/20 backdrop-blur-sm border-green-500/30">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-500">{events.filter((e) => e.status === "En cours").length}</p>
                <p className="text-green-500 text-sm">En cours</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500/20 to-cyan-600/20 backdrop-blur-sm border-blue-500/30">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">
                  {events.filter((e) => e.status === "Programmée").length}
                </p>
                <p className="text-blue-200 text-sm">Programmées</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-yellow-500/20 to-orange-600/20 backdrop-blur-sm border-yellow-500/30">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">
                  {events.reduce((total, event) => total + event.participants, 0)}
                </p>
                <p className="text-yellow-200 text-sm">Total participants</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-pink-500/20 to-purple-600/20 backdrop-blur-sm border-pink-500/30">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{events.length}</p>
                <p className="text-pink-200 text-sm">Total soirées</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Liste des soirées */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {events.map((event) => (
            <Card key={event.id} className="bg-black/20 backdrop-blur-sm border-white/10">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">{event.name}</CardTitle>
                  <Badge className={getStatusColor(event.status)}>{event.status}</Badge>
                </div>
                <CardDescription className="text-purple-200">{formatDate(event.date)}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Informations principales */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-blue-400" />
                    <span className="text-white text-sm">
                      {event.startTime} - {event.endTime}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-green-400" />
                    <span className="text-white text-sm">{event.location}</span>
                  </div>
                </div>

                {/* Participants */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-pink-400" />
                    <span className="text-white text-sm">
                      {event.participants} / {event.maxParticipants} participants
                    </span>
                  </div>
                  <div className="w-24 bg-white/10 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full"
                      style={{
                        width: `${Math.min((event.participants / event.maxParticipants) * 100, 100)}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Thème */}
                <div className="flex items-center space-x-2">
                  <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">{event.theme}</Badge>
                </div>

                {/* Description */}
                <p className="text-purple-200 text-sm">{event.description}</p>

                {/* Actions */}
                <div className="flex space-x-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-purple-500/30 text-purple-300 hover:bg-purple-500/20 hover:text-white"
                    onClick={() => handleEditEvent(event.id)}
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Modifier
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-red-500/30 text-red-300 hover:bg-red-500/20 hover:text-white"
                    onClick={() => handleDeleteEvent(event.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Message si aucune soirée */}
        {events.length === 0 && (
          <Card className="bg-black/20 backdrop-blur-sm border-white/10">
            <CardContent className="p-8 text-center">
              <Calendar className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-white text-lg font-semibold mb-2">Aucune soirée programmée</h3>
              <p className="text-purple-200 mb-4">Commencez par créer votre première soirée karaoké !</p>
              <Button
                onClick={handleAddEvent}
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Créer une soirée
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
