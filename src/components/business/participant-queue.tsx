"use client";

import { useState, useEffect } from "react";
import {
  Clock,
  Music,
  Users,
  Mic,
  Play,
  Star,
  ArrowLeft,
  RefreshCw,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { useKaraokeData } from "../../hooks/use-karaoke-data";

export default function ParticipantQueue() {
  const { participants, songs } = useKaraokeData();
  const [currentTime, setCurrentTime] = useState(new Date());

  // Mettre à jour l'heure toutes les secondes
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Simuler une file d'attente avec les participants
  const queue = participants.filter((p) => p.status === "En attente");
  const currentParticipant = participants.find((p) => p.status === "En cours");

  const currentSong = {
    title: "My Way",
    artist: "Frank Sinatra",
    singer: currentParticipant?.name || "Marie Dubois",
    youtubeId: "qQzdAsjWGPg",
    duration: 275,
    currentTime: 120,
  };

  const getEstimatedWaitTime = (position: number) => {
    const avgSongDuration = 4; // minutes
    const estimatedMinutes = position * avgSongDuration;
    return estimatedMinutes;
  };

  const formatTime = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}min`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">
              File d'attente Karaoké
            </h1>
            <p className="text-purple-200">
              Suivez votre position en temps réel
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              className="border-purple-500/30 text-purple-300 hover:bg-purple-500/20 hover:text-white"
              onClick={() => window.location.reload()}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Actualiser
            </Button>
            <Button
              variant="outline"
              className="border-purple-500/30 text-purple-300 hover:bg-purple-500/20 hover:text-white"
              onClick={() => (window.location.href = "/register")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour
            </Button>
          </div>
        </div>

        {/* Chanson en cours */}
        <Card className="bg-black/20 backdrop-blur-sm border-white/10 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              <span className="flex items-center">
                <Mic className="h-5 w-5 mr-2 text-pink-400" />
                En cours de diffusion
              </span>
              <Badge className="bg-red-500/20 text-red-300 border-red-500/30">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse" />
                LIVE
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-3 rounded-lg">
                <Music className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white">
                  {currentSong.title}
                </h3>
                <p className="text-purple-200">{currentSong.artist}</p>
                <div className="flex items-center mt-2">
                  <Avatar className="h-6 w-6 mr-2">
                    <AvatarFallback className="bg-pink-500 text-white text-xs">
                      {currentSong.singer
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-purple-200">
                    {currentSong.singer}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white text-sm">Progression</p>
                <Progress
                  value={(currentSong.currentTime / currentSong.duration) * 100}
                  className="w-24 h-2 mt-1"
                />
                <p className="text-purple-200 text-xs mt-1">
                  {Math.floor(currentSong.currentTime / 60)}:
                  {(currentSong.currentTime % 60).toString().padStart(2, "0")} /
                  {Math.floor(currentSong.duration / 60)}:
                  {(currentSong.duration % 60).toString().padStart(2, "0")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-r from-blue-500/20 to-cyan-600/20 backdrop-blur-sm border-blue-500/30">
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">
                {participants.length}
              </p>
              <p className="text-blue-200 text-sm">Participants</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500/20 to-emerald-600/20 backdrop-blur-sm border-green-500/30">
            <CardContent className="p-4 text-center">
              <Clock className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{queue.length}</p>
              <p className="text-green-200 text-sm">En attente</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-yellow-500/20 to-orange-600/20 backdrop-blur-sm border-yellow-500/30">
            <CardContent className="p-4 text-center">
              <Music className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{songs.length}</p>
              <p className="text-yellow-200 text-sm">Chansons dispo</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-pink-500/20 to-purple-600/20 backdrop-blur-sm border-pink-500/30">
            <CardContent className="p-4 text-center">
              <Star className="h-8 w-8 text-pink-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">
                {currentTime.toLocaleTimeString()}
              </p>
              <p className="text-pink-200 text-sm">Heure actuelle</p>
            </CardContent>
          </Card>
        </div>

        {/* File d'attente */}
        <Card className="bg-black/20 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Clock className="h-5 w-5 mr-2 text-blue-400" />
              File d'attente ({queue.length} participants)
            </CardTitle>
            <CardDescription className="text-purple-200">
              Ordre de passage et temps d'attente estimé
            </CardDescription>
          </CardHeader>
          <CardContent>
            {queue.length === 0 ? (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-white text-lg font-semibold mb-2">
                  Aucun participant en attente
                </h3>
                <p className="text-purple-200">
                  La file d'attente est vide pour le moment.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {queue.map((participant, index) => {
                  const waitTime = getEstimatedWaitTime(index + 1);
                  const isNext = index === 0;

                  return (
                    <div
                      key={participant.id}
                      className={`flex items-center space-x-4 p-4 rounded-lg transition-all ${
                        isNext
                          ? "bg-gradient-to-r from-green-500/20 to-emerald-600/20 border border-green-500/30"
                          : "bg-white/5 hover:bg-white/10"
                      }`}
                    >
                      <div
                        className={`rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold ${
                          isNext
                            ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                            : "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                        }`}
                      >
                        {index + 1}
                      </div>

                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-purple-600 text-white">
                          {participant.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <h4 className="text-white font-semibold">
                          {participant.name}
                        </h4>
                        <div className="flex items-center space-x-2">
                          <p className="text-purple-200 text-sm">
                            {participant.song?.title}
                          </p>
                          <span className="text-purple-300">•</span>
                          <p className="text-purple-300 text-sm">
                            {participant.song?.artist}
                          </p>
                        </div>
                        {participant.song?.genre && (
                          <Badge
                            variant="outline"
                            className="border-purple-500/30 text-purple-300 text-xs mt-1"
                          >
                            {participant.song.genre}
                          </Badge>
                        )}
                      </div>

                      <div className="text-right">
                        {isNext ? (
                          <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                            À vous bientôt !
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="border-blue-500/30 text-blue-300"
                          >
                            ~{formatTime(waitTime)}
                          </Badge>
                        )}
                        <p className="text-purple-200 text-xs mt-1">
                          {new Date(
                            participant.registeredAt,
                          ).toLocaleTimeString()}
                        </p>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-purple-300 hover:text-white hover:bg-purple-500/20 p-1"
                        onClick={() => {
                          if (participant.song?.youtubeId) {
                            window.open(
                              `https://www.youtube.com/watch?v=${participant.song.youtubeId}`,
                              "_blank",
                            );
                          }
                        }}
                      >
                        <Play className="h-4 w-4" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="mt-8 text-center">
          <Button
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
            onClick={() => (window.location.href = "/register")}
          >
            <Users className="h-4 w-4 mr-2" />
            Ajouter un participant
          </Button>
        </div>
      </div>
    </div>
  );
}
