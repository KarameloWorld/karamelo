"use client";

import { useState } from "react";
import { Music, Plus, Edit, Trash2, Play, Search, Filter } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useKaraokeData } from "../../hooks/use-karaoke-data";

export default function SongManagement() {
  const { songs, deleteSong } = useKaraokeData();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("Tous");

  const genres = ["Tous", ...new Set(songs.map((song) => song.genre))];

  const filteredSongs = songs.filter((song) => {
    const matchesSearch =
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre =
      selectedGenre === "Tous" || song.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const handleAddSong = () => {
    window.location.href = "/add-song";
  };

  const handleEditSong = (songId: number) => {
    console.log("Modifier chanson:", songId);
    // Redirection vers formulaire d'édition
  };

  const handleDeleteSong = (songId: number) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette chanson ?")) {
      deleteSong(songId);
    }
  };

  const handlePreviewSong = (youtubeId: string) => {
    window.open(`https://www.youtube.com/watch?v=${youtubeId}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Gestion des Chansons
            </h1>
            <p className="text-purple-200">Gérez votre bibliothèque karaoké</p>
          </div>
          <Button
            onClick={handleAddSong}
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Ajouter une chanson
          </Button>
        </div>

        {/* Filtres et recherche */}
        <Card className="bg-black/20 backdrop-blur-sm border-white/10 mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Recherche */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 h-4 w-4" />
                  <Input
                    placeholder="Rechercher par titre ou artiste..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-purple-300 focus:border-purple-400"
                  />
                </div>
              </div>

              {/* Filtres par genre */}
              <div className="flex flex-wrap gap-2">
                {genres.map((genre) => (
                  <Badge
                    key={genre}
                    className={`cursor-pointer transition-all ${
                      selectedGenre === genre
                        ? "bg-purple-600 text-white border-purple-500"
                        : "bg-white/10 text-purple-200 border-white/20 hover:bg-white/20"
                    }`}
                    onClick={() => setSelectedGenre(genre)}
                  >
                    <Filter className="h-3 w-3 mr-1" />
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-gradient-to-r from-blue-500/20 to-cyan-600/20 backdrop-blur-sm border-blue-500/30">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{songs.length}</p>
                <p className="text-blue-200 text-sm">Total chansons</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500/20 to-emerald-600/20 backdrop-blur-sm border-green-500/30">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">
                  {genres.length - 1}
                </p>
                <p className="text-green-200 text-sm">Genres</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-yellow-500/20 to-orange-600/20 backdrop-blur-sm border-yellow-500/30">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">
                  {filteredSongs.length}
                </p>
                <p className="text-yellow-200 text-sm">Résultats</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-pink-500/20 to-purple-600/20 backdrop-blur-sm border-pink-500/30">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">
                  {songs.filter((s) => s.difficulty === "Facile").length}
                </p>
                <p className="text-pink-200 text-sm">Faciles</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Table des chansons */}
        <Card className="bg-black/20 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Music className="h-5 w-5 mr-2 text-pink-400" />
              Bibliothèque ({filteredSongs.length} chansons)
            </CardTitle>
            <CardDescription className="text-purple-200">
              Gérez vos chansons karaoké
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10">
                    <TableHead className="text-purple-200">Titre</TableHead>
                    <TableHead className="text-purple-200">Artiste</TableHead>
                    <TableHead className="text-purple-200">Genre</TableHead>
                    <TableHead className="text-purple-200">
                      Difficulté
                    </TableHead>
                    <TableHead className="text-purple-200">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSongs.map((song) => (
                    <TableRow
                      key={song.id}
                      className="border-white/10 hover:bg-white/5"
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
                          className="border-purple-500/30 text-purple-300"
                        >
                          {song.genre}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`${
                            song.difficulty === "Facile"
                              ? "bg-green-500/20 text-green-300 border-green-500/30"
                              : song.difficulty === "Moyen"
                                ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                                : song.difficulty === "Difficile"
                                  ? "bg-orange-500/20 text-orange-300 border-orange-500/30"
                                  : "bg-red-500/20 text-red-300 border-red-500/30"
                          }`}
                        >
                          {song.difficulty}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-purple-500/30 text-purple-300 hover:bg-purple-500/20 hover:text-white"
                            onClick={() => handlePreviewSong(song.youtubeId)}
                          >
                            <Play className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-purple-500/30 text-purple-300 hover:bg-purple-500/20 hover:text-white"
                            onClick={() => handleEditSong(song.id)}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-red-500/30 text-red-300 hover:bg-red-500/20 hover:text-white"
                            onClick={() => handleDeleteSong(song.id)}
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

        {/* Message si aucun résultat */}
        {filteredSongs.length === 0 && (
          <Card className="bg-black/20 backdrop-blur-sm border-white/10 mt-6">
            <CardContent className="p-8 text-center">
              <Music className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-white text-lg font-semibold mb-2">
                Aucune chanson trouvée
              </h3>
              <p className="text-purple-200 mb-4">
                Aucune chanson ne correspond à vos critères de recherche.
              </p>
              <Button
                onClick={handleAddSong}
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Ajouter une chanson
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
