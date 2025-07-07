"use client";
import {
  Users,
  Play,
  Pause,
  SkipForward,
  Trash2,
  Clock,
  Music,
  Star,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useKaraokeData } from "../../hooks/use-karaoke-data";

export default function ParticipantManagement() {
  const { participants, deleteParticipant, updateParticipantStatus } =
    useKaraokeData();

  const handleDeleteParticipant = (participantId: number) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce participant ?")) {
      deleteParticipant(participantId);
    }
  };

  const handleStatusChange = (participantId: number, newStatus: string) => {
    updateParticipantStatus(participantId, newStatus);
  };

  const handleNextParticipant = () => {
    // Passer le participant "En cours" à "Terminé" et le premier "En attente" à "En cours"
    const currentParticipant = participants.find(
      (p) => p.status === "En cours",
    );
    const nextParticipant = participants.find((p) => p.status === "En attente");

    if (currentParticipant) {
      updateParticipantStatus(currentParticipant.id, "Terminé");
    }
    if (nextParticipant) {
      updateParticipantStatus(nextParticipant.id, "En cours");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "En cours":
        return "bg-green-500/20 text-green-300 border-green-500/30";
      case "En attente":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "Terminé":
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
      default:
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
    }
  };

  const currentParticipant = participants.find((p) => p.status === "En cours");
  const waitingParticipants = participants.filter(
    (p) => p.status === "En attente",
  );
  const finishedParticipants = participants.filter(
    (p) => p.status === "Terminé",
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Gestion des Participants
            </h1>
            <p className="text-purple-200">
              Gérez la file d'attente et les performances
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              onClick={handleNextParticipant}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
              disabled={!currentParticipant && waitingParticipants.length === 0}
            >
              <SkipForward className="h-4 w-4 mr-2" />
              Participant suivant
            </Button>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-r from-blue-500/20 to-cyan-600/20 backdrop-blur-sm border-blue-500/30">
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">
                {participants.length}
              </p>
              <p className="text-blue-200 text-sm">Total participants</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500/20 to-emerald-600/20 backdrop-blur-sm border-green-500/30">
            <CardContent className="p-4 text-center">
              <Play className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">
                {currentParticipant ? 1 : 0}
              </p>
              <p className="text-green-200 text-sm">En cours</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-yellow-500/20 to-orange-600/20 backdrop-blur-sm border-yellow-500/30">
            <CardContent className="p-4 text-center">
              <Clock className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">
                {waitingParticipants.length}
              </p>
              <p className="text-yellow-200 text-sm">En attente</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-gray-500/20 to-slate-600/20 backdrop-blur-sm border-gray-500/30">
            <CardContent className="p-4 text-center">
              <Star className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">
                {finishedParticipants.length}
              </p>
              <p className="text-gray-200 text-sm">Terminés</p>
            </CardContent>
          </Card>
        </div>

        {/* Participant en cours */}
        {currentParticipant && (
          <Card className="bg-gradient-to-r from-green-500/20 to-emerald-600/20 backdrop-blur-sm border-green-500/30 mb-8">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Play className="h-5 w-5 mr-2 text-green-400" />
                Participant en cours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-green-600 text-white text-lg">
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
                  <p className="text-green-200">{currentParticipant.email}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-2">
                      <Music className="h-4 w-4 text-green-400" />
                      <span className="text-white">
                        {currentParticipant.song?.title}
                      </span>
                    </div>
                    <span className="text-green-300">•</span>
                    <span className="text-green-200">
                      {currentParticipant.song?.artist}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-green-500/30 text-green-300 hover:bg-green-500/20 hover:text-white"
                    onClick={() => {
                      if (currentParticipant.song?.youtubeId) {
                        window.open(
                          `https://www.youtube.com/watch?v=${currentParticipant.song.youtubeId}`,
                          "_blank",
                        );
                      }
                    }}
                  >
                    <Play className="h-3 w-3 mr-1" />
                    Voir vidéo
                  </Button>
                  <Button
                    onClick={() =>
                      handleStatusChange(currentParticipant.id, "Terminé")
                    }
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  >
                    <Pause className="h-4 w-4 mr-1" />
                    Terminer
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Table des participants */}
        <Card className="bg-black/20 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Users className="h-5 w-5 mr-2 text-pink-400" />
              Tous les participants ({participants.length})
            </CardTitle>
            <CardDescription className="text-purple-200">
              Gérez l'ordre de passage et les statuts
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10">
                    <TableHead className="text-purple-200">
                      Participant
                    </TableHead>
                    <TableHead className="text-purple-200">Chanson</TableHead>
                    <TableHead className="text-purple-200">Statut</TableHead>
                    <TableHead className="text-purple-200">
                      Inscription
                    </TableHead>
                    <TableHead className="text-purple-200">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {participants.map((participant) => (
                    <TableRow
                      key={participant.id}
                      className="border-white/10 hover:bg-white/5"
                    >
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarFallback className="bg-purple-600 text-white">
                              {participant.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <span className="text-white font-medium">
                              {participant.name}
                            </span>
                            {participant.email && (
                              <p className="text-purple-200 text-sm">
                                {participant.email}
                              </p>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-white font-medium">
                            {participant.song?.title}
                          </p>
                          <p className="text-purple-200 text-sm">
                            {participant.song?.artist}
                          </p>
                          {participant.song?.genre && (
                            <Badge
                              variant="outline"
                              className="border-purple-500/30 text-purple-300 text-xs mt-1"
                            >
                              {participant.song.genre}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(participant.status)}>
                          {participant.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <p className="text-purple-200 text-sm">
                          {new Date(participant.registeredAt).toLocaleString()}
                        </p>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          {participant.status === "En attente" && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-green-500/30 text-green-300 hover:bg-green-500/20 hover:text-white"
                              onClick={() =>
                                handleStatusChange(participant.id, "En cours")
                              }
                            >
                              <Play className="h-3 w-3" />
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-purple-500/30 text-purple-300 hover:bg-purple-500/20 hover:text-white"
                            onClick={() => {
                              if (participant.song?.youtubeId) {
                                window.open(
                                  `https://www.youtube.com/watch?v=${participant.song.youtubeId}`,
                                  "_blank",
                                );
                              }
                            }}
                          >
                            <Music className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-red-500/30 text-red-300 hover:bg-red-500/20 hover:text-white"
                            onClick={() =>
                              handleDeleteParticipant(participant.id)
                            }
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Message si aucun participant */}
        {participants.length === 0 && (
          <Card className="bg-black/20 backdrop-blur-sm border-white/10 mt-6">
            <CardContent className="p-8 text-center">
              <Users className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-white text-lg font-semibold mb-2">
                Aucun participant inscrit
              </h3>
              <p className="text-purple-200 mb-4">
                Les participants peuvent s'inscrire via le formulaire
                d'inscription.
              </p>
              <Button
                onClick={() => (window.location.href = "/register")}
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
              >
                <Users className="h-4 w-4 mr-2" />
                Page d'inscription
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
