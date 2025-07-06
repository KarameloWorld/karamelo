"use client";

import type React from "react";

import { useState } from "react";
import { Calendar, Users, Palette, Save, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

interface Event {
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  theme: string;
  maxParticipants: number;
  location: string;
  description: string;
}

interface AddEventFormProps {
  onClose?: () => void;
  onSave?: (event: Event) => void;
}

export default function AddEventForm({ onClose, onSave }: AddEventFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [eventData, setEventData] = useState({
    name: "",
    date: "",
    startTime: "",
    endTime: "",
    theme: "",
    description: "",
    maxParticipants: "",
    location: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulation de sauvegarde
    setTimeout(() => {
      setIsLoading(false);

      // Sauvegarder dans localStorage
      const existingEvents = JSON.parse(
        localStorage.getItem("karaokeEvents") || "[]",
      );
      const newEvent = {
        ...eventData,
        id: Date.now(), // ID unique basé sur timestamp
        participants: 0,
        maxParticipants: Number.parseInt(eventData.maxParticipants) || 50,
        status: "Programmée",
      };

      const updatedEvents = [...existingEvents, newEvent];
      localStorage.setItem("karaokeEvents", JSON.stringify(updatedEvents));

      onSave?.({
        ...eventData,
        maxParticipants: Number.parseInt(eventData.maxParticipants) || 50,
      });
      console.log("Soirée créée:", eventData);

      // Redirection vers le dashboard
      alert("Soirée créée avec succès ! 🎉");
      window.location.href = "/dashboard";
    }, 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    setEventData((prev) => ({ ...prev, [field]: value }));
  };

  const themes = [
    "Hits des années 80",
    "Spécial Noël",
    "Rock Legends",
    "Pop Français",
    "Disco Fever",
    "Karaoké Libre",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Créer une soirée</h1>
            <p className="text-purple-200">
              Organisez votre prochaine soirée karaoké
            </p>
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
              <Calendar className="h-5 w-5 mr-2 text-pink-400" />
              Informations de la soirée
            </CardTitle>
            <CardDescription className="text-purple-200">
              Remplissez les détails de votre événement karaoké
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nom de la soirée */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">
                  Nom de la soirée *
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Ex: Soirée Hits des années 80"
                  value={eventData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-purple-300 focus:border-purple-400"
                  required
                />
              </div>

              {/* Date et heures */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-white">
                    Date *
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={eventData.date}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                    className="bg-white/10 border-white/20 text-white focus:border-purple-400"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="startTime" className="text-white">
                    Heure de début *
                  </Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={eventData.startTime}
                    onChange={(e) =>
                      handleInputChange("startTime", e.target.value)
                    }
                    className="bg-white/10 border-white/20 text-white focus:border-purple-400"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime" className="text-white">
                    Heure de fin
                  </Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={eventData.endTime}
                    onChange={(e) =>
                      handleInputChange("endTime", e.target.value)
                    }
                    className="bg-white/10 border-white/20 text-white focus:border-purple-400"
                  />
                </div>
              </div>

              {/* Thème */}
              <div className="space-y-3">
                <Label className="text-white">Thème de la soirée</Label>
                <div className="flex flex-wrap gap-2">
                  {themes.map((theme) => (
                    <Badge
                      key={theme}
                      className={`cursor-pointer transition-all ${
                        eventData.theme === theme
                          ? "bg-purple-600 text-white border-purple-500"
                          : "bg-white/10 text-purple-200 border-white/20 hover:bg-white/20"
                      }`}
                      onClick={() => handleInputChange("theme", theme)}
                    >
                      <Palette className="h-3 w-3 mr-1" />
                      {theme}
                    </Badge>
                  ))}
                </div>
                <Input
                  type="text"
                  placeholder="Ou créez votre propre thème..."
                  value={eventData.theme}
                  onChange={(e) => handleInputChange("theme", e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-purple-300 focus:border-purple-400"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-white">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Décrivez votre soirée karaoké..."
                  value={eventData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  className="bg-white/10 border-white/20 text-white placeholder:text-purple-300 focus:border-purple-400 min-h-[100px]"
                />
              </div>

              {/* Participants et lieu */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maxParticipants" className="text-white">
                    Nombre max de participants
                  </Label>
                  <Input
                    id="maxParticipants"
                    type="number"
                    placeholder="50"
                    value={eventData.maxParticipants}
                    onChange={(e) =>
                      handleInputChange("maxParticipants", e.target.value)
                    }
                    className="bg-white/10 border-white/20 text-white placeholder:text-purple-300 focus:border-purple-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-white">
                    Lieu
                  </Label>
                  <Input
                    id="location"
                    type="text"
                    placeholder="Bar Le Melody"
                    value={eventData.location}
                    onChange={(e) =>
                      handleInputChange("location", e.target.value)
                    }
                    className="bg-white/10 border-white/20 text-white placeholder:text-purple-300 focus:border-purple-400"
                  />
                </div>
              </div>

              {/* Boutons */}
              <div className="flex space-x-4 pt-4">
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                      Création...
                    </div>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Créer la soirée
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

        {/* Aperçu */}
        <Card className="bg-gradient-to-r from-green-500/20 to-emerald-600/20 backdrop-blur-sm border-green-500/30 mt-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Users className="h-5 w-5 mr-2 text-green-400" />
              Aperçu de la soirée
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-white">
              <p>
                <strong>Nom:</strong> {eventData.name || "Non défini"}
              </p>
              <p>
                <strong>Date:</strong> {eventData.date || "Non définie"}
              </p>
              <p>
                <strong>Horaires:</strong> {eventData.startTime || "Non défini"}{" "}
                - {eventData.endTime || "Non défini"}
              </p>
              <p>
                <strong>Thème:</strong> {eventData.theme || "Aucun thème"}
              </p>
              <p>
                <strong>Lieu:</strong> {eventData.location || "Non défini"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
