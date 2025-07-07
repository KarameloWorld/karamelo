"use client";

import React, { useState } from "react";
import {
  User,
  Mic,
  Music,
  Star,
  Zap,
  ArrowRight,
  Check,
  Calendar,
  Users,
  Play,
  Search,
  Filter,
  ArrowLeft,
} from "lucide-react";

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
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useKaraokeData } from "../../hooks/use-karaoke-data";

// Données de démonstration
const currentEvent = {
  id: 1,
  name: "Soirée Hits des années 80",
  date: "15 Décembre 2024",
  time: "20h00 - 00h00",
  participants: 24,
  songsPlayed: 47,
  currentSong: "Bohemian Rhapsody - Queen",
  nextUp: 3,
};

export default function ParticipantRegistration() {
  const [step, setStep] = useState(1); // 1: inscription, 2: sélection chanson, 3: confirmation
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("Tous");
  const { songs, addParticipant } = useKaraokeData();

  const [participant, setParticipant] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [selectedSong, setSelectedSong] = useState<{
    id: number;
    title: string;
    artist: string;
    genre: string;
    youtubeId: string;
    difficulty: string;
  } | null>(null);

  // Filtrer les chansons disponibles
  const genres = ["Tous", ...new Set(songs.map((song) => song.genre))];
  const filteredSongs = songs.filter((song) => {
    const matchesSearch =
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre =
      selectedGenre === "Tous" || song.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const handleParticipantSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
    }, 1500);
  };

  const handleSongSelection = (song: {
    id: number;
    title: string;
    artist: string;
    genre: string;
    youtubeId: string;
    difficulty: string;
  }) => {
    setSelectedSong(song);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setStep(3);
    }, 1000);
  };

  const handleFinalSubmit = () => {
    // Ajouter le participant avec sa chanson
    if (selectedSong) {
      const newParticipant = {
        ...participant,
        song: selectedSong,
        eventId: currentEvent.id,
        status: "En attente",
        registeredAt: new Date().toISOString(),
      };

      addParticipant(newParticipant);
    }

    // Redirection vers une page de suivi ou dashboard
    alert(
      "Inscription réussie ! Vous êtes maintenant dans la file d'attente. 🎵",
    );
    window.location.href = "/participant-queue";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      {/* Éléments décoratifs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-4 rounded-2xl inline-block mb-4">
            <Mic className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Rejoignez la soirée !
          </h1>
          <p className="text-purple-200">
            Inscrivez-vous et choisissez votre chanson
          </p>
        </div>

        {/* Informations de la soirée */}
        <Card className="bg-black/20 backdrop-blur-sm border-white/10 mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="bg-gradient-to-r from-pink-500/20 to-purple-600/20 rounded-lg p-4">
                  <Calendar className="h-6 w-6 text-pink-400 mx-auto mb-2" />
                  <p className="text-white font-semibold">
                    {currentEvent.name}
                  </p>
                  <p className="text-purple-200 text-sm">{currentEvent.date}</p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-r from-blue-500/20 to-cyan-600/20 rounded-lg p-4">
                  <Users className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                  <p className="text-white font-semibold">
                    {currentEvent.participants} participants
                  </p>
                  <p className="text-blue-200 text-sm">Déjà inscrits</p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-r from-green-500/20 to-emerald-600/20 rounded-lg p-4">
                  <Music className="h-6 w-6 text-green-400 mx-auto mb-2" />
                  <p className="text-white font-semibold">
                    {songs.length} chansons
                  </p>
                  <p className="text-green-200 text-sm">Disponibles</p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-r from-yellow-500/20 to-orange-600/20 rounded-lg p-4">
                  <Zap className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
                  <p className="text-white font-semibold">
                    {currentEvent.nextUp} en attente
                  </p>
                  <p className="text-yellow-200 text-sm">File d'attente</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Étape 1: Inscription */}
        {step === 1 && (
          <Card className="bg-black/20 backdrop-blur-sm border-white/10 max-w-md mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-white flex items-center justify-center">
                <User className="h-6 w-6 mr-2 text-pink-400" />
                Inscription
              </CardTitle>
              <CardDescription className="text-purple-200">
                Remplissez vos informations pour participer
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleParticipantSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">
                    Nom complet *
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Votre nom"
                    value={participant.name}
                    onChange={(e) =>
                      setParticipant((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    className="bg-white/10 border-white/20 text-white placeholder:text-purple-300 focus:border-purple-400"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    Email (optionnel)
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre@email.com"
                    value={participant.email}
                    onChange={(e) =>
                      setParticipant((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    className="bg-white/10 border-white/20 text-white placeholder:text-purple-300 focus:border-purple-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white">
                    Téléphone (optionnel)
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="06 12 34 56 78"
                    value={participant.phone}
                    onChange={(e) =>
                      setParticipant((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    className="bg-white/10 border-white/20 text-white placeholder:text-purple-300 focus:border-purple-400"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                      Inscription...
                    </div>
                  ) : (
                    <>
                      Continuer
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Étape 2: Sélection de chanson */}
        {step === 2 && (
          <div className="space-y-6">
            <Card className="bg-black/20 backdrop-blur-sm border-white/10">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-white flex items-center justify-center">
                  <Music className="h-6 w-6 mr-2 text-pink-400" />
                  Choisissez votre chanson
                </CardTitle>
                <CardDescription className="text-purple-200">
                  Bonjour {participant.name} ! Sélectionnez la chanson que vous
                  souhaitez interpréter
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Recherche et filtres */}
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <Label htmlFor="search" className="text-white mb-2 block">
                        Rechercher une chanson
                      </Label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 h-4 w-4" />
                        <Input
                          id="search"
                          type="text"
                          placeholder="Titre ou artiste..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-purple-300 focus:border-purple-400"
                        />
                      </div>
                    </div>

                    <div className="md:w-48">
                      <Label className="text-white mb-2 block">Genre</Label>
                      <div className="flex flex-wrap gap-1">
                        {genres.slice(0, 4).map((genre) => (
                          <Badge
                            key={genre}
                            className={`cursor-pointer text-xs transition-all ${
                              selectedGenre === genre
                                ? "bg-purple-600 text-white border-purple-500"
                                : "bg-white/10 text-purple-200 border-white/20 hover:bg-white/20"
                            }`}
                            onClick={() => setSelectedGenre(genre)}
                          >
                            <Filter className="h-2 w-2 mr-1" />
                            {genre}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Statistiques */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white/5 rounded-lg p-3 text-center">
                      <p className="text-2xl font-bold text-white">
                        {songs.length}
                      </p>
                      <p className="text-purple-200 text-sm">Total</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3 text-center">
                      <p className="text-2xl font-bold text-white">
                        {filteredSongs.length}
                      </p>
                      <p className="text-purple-200 text-sm">Résultats</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3 text-center">
                      <p className="text-2xl font-bold text-white">
                        {genres.length - 1}
                      </p>
                      <p className="text-purple-200 text-sm">Genres</p>
                    </div>
                  </div>

                  {/* Liste des chansons */}
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    <h3 className="text-white font-semibold flex items-center">
                      <Star className="h-4 w-4 mr-2 text-yellow-400" />
                      Chansons disponibles ({filteredSongs.length})
                    </h3>
                    {filteredSongs.map((song) => (
                      <Card
                        key={song.id}
                        className="bg-white/5 border-white/10 hover:bg-white/10 transition-all cursor-pointer transform hover:scale-105"
                        onClick={() => handleSongSelection(song)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h4 className="text-white font-semibold">
                                {song.title}
                              </h4>
                              <p className="text-purple-200 text-sm">
                                {song.artist}
                              </p>
                              <div className="flex items-center space-x-2 mt-1">
                                <Badge
                                  variant="outline"
                                  className="border-purple-500/30 text-purple-300 text-xs"
                                >
                                  {song.genre}
                                </Badge>
                                {song.difficulty && (
                                  <Badge
                                    className={`text-xs ${
                                      song.difficulty === "Facile"
                                        ? "bg-green-500/20 text-green-300 border-green-500/30"
                                        : song.difficulty === "Moyen"
                                          ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                                          : "bg-red-500/20 text-red-300 border-red-500/30"
                                    }`}
                                  >
                                    {song.difficulty}
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-purple-300 hover:text-white hover:bg-purple-500/20"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open(
                                    `https://www.youtube.com/watch?v=${song.youtubeId}`,
                                    "_blank",
                                  );
                                }}
                              >
                                <Play className="h-3 w-3" />
                              </Button>
                              <ArrowRight className="h-4 w-4 text-purple-400" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {filteredSongs.length === 0 && (
                    <div className="text-center py-8">
                      <Music className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                      <h3 className="text-white text-lg font-semibold mb-2">
                        Aucune chanson trouvée
                      </h3>
                      <p className="text-purple-200">
                        Essayez de modifier vos critères de recherche.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Étape 3: Confirmation */}
        {step === 3 && selectedSong && (
          <Card className="bg-black/20 backdrop-blur-sm border-white/10 max-w-md mx-auto">
            <CardHeader className="text-center">
              <div className="bg-green-500/20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Check className="h-8 w-8 text-green-400" />
              </div>
              <CardTitle className="text-2xl text-white">
                Inscription confirmée !
              </CardTitle>
              <CardDescription className="text-purple-200">
                Vous êtes maintenant dans la file d'attente
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-purple-600 text-white">
                      {participant.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-white font-semibold">
                      {participant.name}
                    </h3>
                    <p className="text-purple-200 text-sm">
                      Participant #{currentEvent.participants + 1}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2">
                  Votre chanson :
                </h4>
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-2 rounded-lg">
                    <Music className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">
                      {selectedSong.title}
                    </p>
                    <p className="text-purple-200 text-sm">
                      {selectedSong.artist}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge
                        variant="outline"
                        className="border-purple-500/30 text-purple-300 text-xs"
                      >
                        {selectedSong.genre}
                      </Badge>
                      {selectedSong.difficulty && (
                        <Badge
                          className={`text-xs ${
                            selectedSong.difficulty === "Facile"
                              ? "bg-green-500/20 text-green-300 border-green-500/30"
                              : selectedSong.difficulty === "Moyen"
                                ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                                : "bg-red-500/20 text-red-300 border-red-500/30"
                          }`}
                        >
                          {selectedSong.difficulty}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center space-y-2">
                <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 text-lg px-4 py-2">
                  Position: #{currentEvent.nextUp + 1}
                </Badge>
                <p className="text-purple-200 text-sm">
                  Temps d'attente estimé: ~15 minutes
                </p>
              </div>

              <div className="space-y-3">
                <Button
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                  onClick={handleFinalSubmit}
                >
                  Confirmer l'inscription
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-purple-500/30 text-purple-300 hover:bg-purple-500/20 hover:text-white"
                  onClick={() => {
                    setStep(2);
                    setSelectedSong(null);
                  }}
                >
                  Changer de chanson
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
            </CardContent>
          </Card>
        )}

        {/* Chanson en cours */}
        <Card className="bg-gradient-to-r from-green-500/20 to-emerald-600/20 backdrop-blur-sm border-green-500/30 mt-8">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-green-500/30 p-2 rounded-lg">
                  <Mic className="h-5 w-5 text-green-300" />
                </div>
                <div>
                  <p className="text-green-200 text-sm">En cours</p>
                  <p className="text-white font-semibold">
                    {currentEvent.currentSong}
                  </p>
                </div>
              </div>
              <Badge className="bg-red-500/20 text-red-300 border-red-500/30">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse" />
                LIVE
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
