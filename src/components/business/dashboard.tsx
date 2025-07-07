"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Calendar,
  Music,
  Users,
  Mic,
  Play,
  UserPlus,
  Clock,
  Star,
  Zap,
  User,
  LogOut,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useKaraokeData } from "../../hooks/use-karaoke-data";
import { useAuth } from "../auth";

const participants = [
  {
    id: 1,
    name: "Gitlaume Merge-tain",
    songs: 3,
    status: "En cours",
    avatar: "/monkey.svg?height=32&width=32",
    song: {
      title: "Shallow",
      artist: "Lady Gaga & Bradley Cooper",
      youtubeId: "smu-0V7E7wI",
    },
  },
  {
    id: 2,
    name: "DotNet.cien Du.Point",
    songs: 2,
    status: "En attente",
    avatar: "/monkey.svg?height=32&width=32",
    song: {
      title: "Sweet Caroline",
      artist: "Neil Diamond",
      youtubeId: "1vhFnTjia_I",
    },
  },
  {
    id: 3,
    name: "Ajax Bernhard Reset",
    songs: 1,
    status: "En attente",
    avatar: "/monkey.svg?height=32&width=32",
    song: {
      title: "Don't Stop Me Now",
      artist: "Queen",
      youtubeId: "HgzGwKwLmgM",
    },
  },
  {
    id: 4,
    name: "JSON.ph Le-Roy",
    songs: 2,
    status: "En attente",
    avatar: "/monkey.svg?height=32&width=32",
    song: {
      title: "I Will Survive",
      artist: "Gloria Gaynor",
      youtubeId: "ARt9HV9T0w8",
    },
  },
  {
    id: 5,
    name: "Melan.py Debug-bois",
    songs: 0,
    status: "Terminé",
    avatar: "/monkey.svg?height=32&width=32",
    song: null,
  },
  {
    id: 6,
    name: "PullAndRé Base.commit",
    songs: 1,
    status: "En cours",
    avatar: "/monkey.svg?height=32&width=32",
    song: {
      title: "Bohemian Rhapsody",
      artist: "Queen",
      youtubeId: "fJ9rUzIMcZQ",
    },
  },
];

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

const currentSong = currentParticipant
  ? {
      title: currentParticipant.song?.title || "Aucune chanson",
      artist: currentParticipant.song?.artist || "Artiste inconnu",
      singer: currentParticipant.name,
      youtubeId: currentParticipant.song?.youtubeId || "qQzdAsjWGPg",
      duration: 275,
      currentTime: 120,
      image: "/monkey.svg?height=60&width=60",
    }
  : {
      title: "Aucune chanson en cours",
      artist: "En attente du premier participant",
      singer: "Personne",
      youtubeId: "qQzdAsjWGPg",
      duration: 275,
      currentTime: 0,
      image: "/monkey.svg?height=60&width=60",
    };

export default function KaraokeDashboard() {
  const [activeTab, setActiveTab] = useState("live");
  const { songs } = useKaraokeData();
  const { logout } = useAuth();
  const [showMonkey, setShowMonkey] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isCtrlPressed, setIsCtrlPressed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Control") {
        setIsCtrlPressed(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Control") {
        setIsCtrlPressed(false);
        setShowMonkey(false);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      setMousePosition({ x, y });

      // Vérifier si Ctrl est pressé (sur toute la page)
      if (isCtrlPressed) {
        setShowMonkey(true);
      } else {
        setShowMonkey(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isCtrlPressed]);

  return (
    <div className="min-h-screen bg-indigo-950 relative">
      {/* Easter Egg - Monkey Image */}
      {showMonkey && (
        <div
          className="fixed z-50 pointer-events-none transition-all duration-300"
          style={{
            left: mousePosition.x - 100,
            top: mousePosition.y - 100,
          }}
        >
          <Image
            src="/monkey.jpeg"
            alt="Easter Egg Monkey"
            width={200}
            height={200}
            className="rounded-full border-4 border-yellow-400 shadow-lg animate-bounce"
          />
        </div>
      )}
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-pink-500">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-3 rounded-xl">
                <Mic className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  KaraMelo Dashboard
                </h1>
                <p className="text-purple-200">
                  Bar Le Melody - Soirée du 15 Décembre
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                <Zap className="h-3 w-3 mr-1" />
                En direct
              </Badge>
              <Button
                variant="outline"
                className="border-purple-500 text-white bg-purple-500 hover:bg-purple-500/20 hover:text-white"
                onClick={() => {
                  window.location.href = "/admin-login";
                }}
              >
                <User className="h-4 w-4 mr-2" />
                Admin
              </Button>
              <Button
                variant="outline"
                className="border-red-500 text-white hover:bg-red-500/20 hover:text-white bg-red-500"
                onClick={logout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="bg-pink-500/30 backdrop-blur-sm border border-pink-500">
            <TabsTrigger
              value="live"
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
            >
              <Play className="h-4 w-4 mr-2" />
              Live
            </TabsTrigger>
            <TabsTrigger
              value="participants"
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
            >
              <Users className="h-4 w-4 mr-2" />
              Participants
            </TabsTrigger>
            <TabsTrigger
              value="songs"
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
            >
              <Music className="h-4 w-4 mr-2" />
              Chansons
            </TabsTrigger>
            <TabsTrigger
              value="events"
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Soirées
            </TabsTrigger>
          </TabsList>

          {/* Live Tab */}
          <TabsContent value="live" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Lecteur YouTube Karaoké */}
              <Card className="lg:col-span-2 bg-pink-500/10 backdrop-blur-sm border-pink-500 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">
                      <Mic className="h-5 w-5 mr-2 text-pink-400" />
                      Karaoké en cours
                    </span>
                    <Badge className="bg-red-500/20 text-red-300 border-red-500/30">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse" />
                      LIVE
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Lecteur YouTube */}
                  <div className="relative aspect-video rounded-lg overflow-hidden border-2 border-purple-500/30">
                    <iframe
                      src={`https://www.youtube.com/embed/${currentSong.youtubeId}?autoplay=1&controls=1&rel=0&modestbranding=1`}
                      title={`${currentSong.title} - ${currentSong.artist} Karaoké`}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>

                  {/* Informations de la chanson */}
                  <div className="flex items-center space-x-4">
                    <Image
                      src={currentSong.image || "/monkey.svg"}
                      alt="Album cover"
                      width={64}
                      height={64}
                      className="w-16 h-16 rounded-lg object-cover border-2 border-purple-500/30"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white">
                        {currentSong.title}
                      </h3>
                      <p className="text-purple-200">{currentSong.artist}</p>
                      <div className="flex items-center mt-2">
                        <Avatar className="h-6 w-6 mr-2">
                          <AvatarImage src="/monkey.svg" />
                          <AvatarFallback className="bg-pink-500 text-white text-xs">
                            MD
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-purple-200">
                          {currentSong.singer}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Informations supplémentaires */}
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-purple-200">
                        Vidéo karaoké YouTube
                      </span>
                      <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                        HD Quality
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* File d'attente */}
              <Card className="bg-black/20 backdrop-blur-sm border-pink-500 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-blue-400" />
                      File d'attente
                    </span>
                    <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                      {waitingParticipants.length} en attente
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {waitingParticipants.length === 0 ? (
                      <div className="text-center py-4">
                        <Users className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                        <p className="text-purple-200 text-sm">
                          Aucun participant en attente
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-purple-500/30 text-purple-600 hover:bg-purple-500/20 hover:text-white mt-2"
                          onClick={() => window.open("/register", "_blank")}
                        >
                          <UserPlus className="h-3 w-3 mr-1" />
                          Inscription
                        </Button>
                      </div>
                    ) : (
                      waitingParticipants
                        .slice(0, 5)
                        .map((participant, index) => (
                          <div
                            key={participant.id}
                            className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${
                              index === 0
                                ? "bg-gradient-to-r from-green-500/20 to-emerald-600/20 border border-green-500/30"
                                : "bg-white/5 hover:bg-white/10"
                            }`}
                          >
                            <div
                              className={`rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold ${
                                index === 0
                                  ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                                  : "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                              }`}
                            >
                              {index + 1}
                            </div>
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-purple-600 text-white text-xs">
                                {participant.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-white truncate">
                                {participant.song?.title ||
                                  "Chanson non définie"}
                              </p>
                              <p className="text-sm text-purple-200 truncate">
                                {participant.song?.artist || "Artiste inconnu"}
                              </p>
                              <p className="text-xs text-blue-300">
                                {participant.name}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              {participant.song?.youtubeId && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-purple-600 hover:text-white hover:bg-purple-500/20 p-1"
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
                              <Badge
                                variant="outline"
                                className={`text-xs ${
                                  index === 0
                                    ? "border-green-500/30 text-green-300"
                                    : "border-blue-500/30 text-blue-300"
                                }`}
                              >
                                {index === 0
                                  ? "À vous !"
                                  : getEstimatedWaitTime(index + 1)}
                              </Badge>
                            </div>
                          </div>
                        ))
                    )}
                    {waitingParticipants.length > 5 && (
                      <div className="text-center pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-purple-500/30 text-purple-600 hover:bg-purple-500/20 hover:text-white"
                          onClick={() =>
                            (window.location.href = "/participants")
                          }
                        >
                          Voir tous ({waitingParticipants.length})
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Stats rapides */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-r from-pink-500/20 to-purple-600/20 backdrop-blur-sm border-pink-500/30">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-pink-500 text-sm">Participants</p>
                      <p className="text-2xl font-bold text-pink-500">
                        {participants.length}
                      </p>
                    </div>
                    <Users className="h-8 w-8 text-pink-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-blue-500/20 to-cyan-600/20 backdrop-blur-sm border-blue-500/30">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-500 text-sm">En attente</p>
                      <p className="text-2xl font-bold text-blue-500">
                        {waitingParticipants.length}
                      </p>
                    </div>
                    <Clock className="h-8 w-8 text-blue-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-500/20 to-emerald-600/20 backdrop-blur-sm border-green-500/30">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-500 text-sm">Chansons dispo</p>
                      <p className="text-2xl font-bold text-green-500">
                        {songs.length}
                      </p>
                    </div>
                    <Music className="h-8 w-8 text-green-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-blue-500/20 to-orange-600/20 backdrop-blur-sm border-blue-500/30">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-500 text-sm">Terminés</p>
                      <p className="text-2xl font-bold text-blue-500">
                        {
                          participants.filter((p) => p.status === "Terminé")
                            .length
                        }
                      </p>
                    </div>
                    <Star className="h-8 w-8 text-blue-400" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Participants Tab */}
          <TabsContent value="participants" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">
                Gestion des participants
              </h2>
              <Button
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                onClick={() => {
                  window.location.href = "/register";
                }}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Nouveau participant
              </Button>
            </div>

            <Card className="bg-black/20 backdrop-blur-sm border-pink-500">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="border-pink-500">
                      <TableHead className="text-purple-200">
                        Participant
                      </TableHead>
                      <TableHead className="text-purple-200">
                        Chansons
                      </TableHead>
                      <TableHead className="text-purple-200">Statut</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {participants.map((participant) => (
                      <TableRow
                        key={participant.id}
                        className="border-pink-500 hover:bg-white/5"
                      >
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarImage
                                src={participant.avatar || "/monkey.svg"}
                              />
                              <AvatarFallback className="bg-purple-600 text-white">
                                {participant.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-white font-medium">
                              {participant.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="border-blue-500/30 text-blue-300"
                          >
                            {participant.songs} chansons
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              participant.status === "En cours"
                                ? "bg-green-500/20 text-green-300 border-green-500/30"
                                : "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                            }
                          >
                            {participant.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Songs Tab */}
          <TabsContent value="songs" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">
                Bibliothèque de chansons
              </h2>
              <Button
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                onClick={() => {
                  window.location.href = "/add-song";
                }}
              >
                <Music className="h-4 w-4 mr-2" />
                Ajouter une chanson
              </Button>
            </div>

            <Card className="bg-black/20 backdrop-blur-sm border-pink-500">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="border-pink-500">
                      <TableHead className="text-purple-200">Titre</TableHead>
                      <TableHead className="text-purple-200">Artiste</TableHead>
                      <TableHead className="text-purple-200">Genre</TableHead>
                      <TableHead className="text-purple-200">
                        Popularité
                      </TableHead>
                      <TableHead className="text-purple-200">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {songs.map((song) => (
                      <TableRow
                        key={song.id}
                        className="border-pink-500 hover:bg-white/5"
                      >
                        <TableCell className="text-white font-medium">
                          {song.title}
                        </TableCell>
                        <TableCell className="text-purple-200">
                          {song.artist}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="border-purple-500/30 text-purple-600"
                          >
                            {song.genre}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Progress
                              value={song.popularity}
                              className="w-16 h-2"
                            />
                            <span className="text-sm text-white">
                              {song.popularity}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-purple-500/30 text-purple-600 hover:bg-purple-500/20 hover:text-white"
                              onClick={() => {
                                window.open(
                                  `https://www.youtube.com/watch?v=${song.youtubeId}`,
                                  "_blank",
                                );
                              }}
                            >
                              <Play className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">
                Gestion des soirées
              </h2>
              <Button
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                onClick={() => (window.location.href = "/add-event")}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Nouvelle soirée
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-purple-500/20 to-pink-800/20 backdrop-blur-sm border-green-500/30">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">
                      Soirée Actuelle
                    </CardTitle>
                    <Badge className="bg-green-500/20 text-green-500 border-green-500">
                      En cours
                    </Badge>
                  </div>
                  <CardDescription className="text-white">
                    15 Décembre 2024
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-white">
                    <p>
                      <strong>Thème:</strong> Hits des années 80
                    </p>
                    <p>
                      <strong>Participants:</strong> 24
                    </p>
                    <p>
                      <strong>Début:</strong> 20h00
                    </p>
                    <p>
                      <strong>Durée:</strong> 4h
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/20 backdrop-blur-sm border-pink-500">
                <CardHeader>
                  <CardTitle className="text-white">Prochaine Soirée</CardTitle>
                  <CardDescription className="text-purple-200">
                    22 Décembre 2024
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-white">
                    <p>
                      <strong>Thème:</strong> Spécial Noël
                    </p>
                    <p>
                      <strong>Réservations:</strong> 18
                    </p>
                    <p>
                      <strong>Début:</strong> 19h30
                    </p>
                    <p>
                      <strong>Durée:</strong> 5h
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/20 backdrop-blur-sm border-pink-500">
                <CardHeader>
                  <CardTitle className="text-white">Soirée Planifiée</CardTitle>
                  <CardDescription className="text-purple-200">
                    31 Décembre 2024
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-white">
                    <p>
                      <strong>Thème:</strong> Réveillon 2025
                    </p>
                    <p>
                      <strong>Réservations:</strong> 35
                    </p>
                    <p>
                      <strong>Début:</strong> 21h00
                    </p>
                    <p>
                      <strong>Durée:</strong> 6h
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
