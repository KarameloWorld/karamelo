"use client";

import { useState, useEffect } from "react";
import {
  Clock,
  Users,
  Music,
  Play,
  UserPlus,
  RefreshCw,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useKaraokeData } from "../../hooks/use-karaoke-data";

export default function LiveQueueDisplay() {
  const { participants } = useKaraokeData();
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Auto-refresh toutes les 10 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
      // Recharger les données depuis localStorage
      window.location.reload();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const currentParticipant = participants.find((p) => p.status === "En cours");
  const waitingParticipants = participants.filter(
    (p) => p.status === "En attente",
  );

  const getEstimatedWaitTime = (position: number) => {
    const avgSongDuration = 4; // minutes
    const estimatedMinutes = position * avgSongDuration;
    return estimatedMinutes < 60
      ? `${estimatedMinutes} min`
      : `${Math.floor(estimatedMinutes / 60)}h ${estimatedMinutes % 60}min`;
  };

  return (
    <div className="space-y-6">
      {/* Header avec stats */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">
            File d'attente en direct
          </h2>
          <p className="text-purple-200">
            Dernière mise à jour: {lastUpdate.toLocaleTimeString()}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
            <Zap className="h-3 w-3 mr-1" />
            Live
          </Badge>
          <Button
            variant="outline"
            size="sm"
            className="border-white/20 text-white hover:bg-white/10"
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="h-3 w-3 mr-1" />
            Actualiser
          </Button>
        </div>
      </div>

      {/* Participant en cours */}
      {currentParticipant ? (
        <Card className="bg-gradient-to-r from-green-500/20 to-emerald-600/20 backdrop-blur-sm border-green-500/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Play className="h-5 w-5 mr-2 text-green-400" />
              En cours de performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-green-600 text-white">
                  {currentParticipant.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white">
                  {currentParticipant.name}
                </h3>
                <div className="flex items-center space-x-2">
                  <Music className="h-4 w-4 text-green-400" />
                  <span className="text-white">
                    {currentParticipant.song?.title}
                  </span>
                  <span className="text-green-300">•</span>
                  <span className="text-green-200">
                    {currentParticipant.song?.artist}
                  </span>
                </div>
                {currentParticipant.song?.genre && (
                  <Badge className="bg-green-500/20 text-green-300 border-green-500/30 mt-1">
                    {currentParticipant.song.genre}
                  </Badge>
                )}
              </div>
              {currentParticipant.song?.youtubeId && (
                <Button
                  variant="outline"
                  size="sm"
                  className="border-green-500/30 text-green-300 hover:bg-green-500/10"
                  onClick={() =>
                    window.open(
                      `https://www.youtube.com/watch?v=${currentParticipant.song.youtubeId}`,
                      "_blank",
                    )
                  }
                >
                  <Play className="h-3 w-3 mr-1" />
                  Voir vidéo
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-gradient-to-r from-gray-500/20 to-slate-600/20 backdrop-blur-sm border-gray-500/30">
          <CardContent className="p-6 text-center">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-white text-lg font-semibold mb-2">
              Aucun participant en cours
            </h3>
            <p className="text-gray-200">En attente du premier participant</p>
          </CardContent>
        </Card>
      )}

      {/* File d'attente */}
      <Card className="bg-black/20 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <span className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-blue-400" />
              Prochains participants
            </span>
            <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
              {waitingParticipants.length} en attente
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {waitingParticipants.length === 0 ? (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-white text-lg font-semibold mb-2">
                File d'attente vide
              </h3>
              <p className="text-purple-200 mb-4">
                Aucun participant en attente pour le moment
              </p>
              <Button
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                onClick={() => window.open("/register", "_blank")}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Ouvrir inscription
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {waitingParticipants.map((participant, index) => {
                const isNext = index === 0;
                return (
                  <div
                    key={participant.id}
                    className={`flex items-center space-x-4 p-4 rounded-lg transition-all ${
                      isNext
                        ? "bg-gradient-to-r from-yellow-500/20 to-orange-600/20 border border-yellow-500/30"
                        : "bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <div
                      className={`rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold ${
                        isNext
                          ? "bg-gradient-to-r from-yellow-500 to-orange-600 text-white"
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
                        <Music className="h-3 w-3 text-purple-400" />
                        <span className="text-purple-200 text-sm">
                          {participant.song?.title || "Chanson non définie"}
                        </span>
                        <span className="text-purple-300">•</span>
                        <span className="text-purple-300 text-sm">
                          {participant.song?.artist || "Artiste inconnu"}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        {participant.song?.genre && (
                          <Badge
                            variant="outline"
                            className="border-purple-500/30 text-purple-300 text-xs"
                          >
                            {participant.song.genre}
                          </Badge>
                        )}
                        <span className="text-purple-400 text-xs">
                          Inscrit à{" "}
                          {new Date(
                            participant.registeredAt,
                          ).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      {isNext ? (
                        <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                          À vous bientôt !
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="border-blue-500/30 text-blue-300"
                        >
                          ~{getEstimatedWaitTime(index + 1)}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      {participant.song?.youtubeId && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-purple-400 hover:text-white hover:bg-white/10"
                          onClick={() =>
                            window.open(
                              `https://www.youtube.com/watch?v=${participant.song.youtubeId}`,
                              "_blank",
                            )
                          }
                        >
                          <Play className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Actions rapides */}
      <div className="flex justify-center space-x-4">
        <Button
          variant="outline"
          className="border-white/20 text-white hover:bg-white/10"
          onClick={() => (window.location.href = "/participants")}
        >
          <Users className="h-4 w-4 mr-2" />
          Gestion complète
        </Button>
        <Button
          className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
          onClick={() => window.open("/register", "_blank")}
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Nouvelle inscription
        </Button>
      </div>
    </div>
  );
}
