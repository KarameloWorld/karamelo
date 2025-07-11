"use client";

import { useState, useEffect } from "react";
import { karaokeLibrary } from "../components/business/karaoke-songs-library";

interface Song {
  id: number;
  title: string;
  artist: string;
  genre: string;
  youtubeId: string;
  difficulty: string;
  popularity: number;
}

interface Event {
  id: number;
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  theme: string;
  participants: number;
  maxParticipants: number;
  location: string;
  status: string;
  description: string;
}

interface Participant {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  song: {
    id: number;
    title: string;
    artist: string;
    genre: string;
    youtubeId: string;
  };
  eventId: number;
  status: string;
  registeredAt: string;
}

// Hook pour gérer les données du karaoké
export function useKaraokeData() {
  const [songs, setSongs] = useState<Song[]>(karaokeLibrary);
  const [events, setEvents] = useState<Event[]>([]);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [queue, setQueue] = useState<Participant[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Charger les données depuis localStorage au démarrage
  useEffect(() => {
    const loadData = () => {
      try {
        // Charger les chansons
        const savedSongs = localStorage.getItem("karaokeLibrary");
        if (savedSongs) {
          const parsedSongs = JSON.parse(savedSongs);
          // Fusionner avec les chansons par défaut (éviter les doublons)
          const allSongs = [...karaokeLibrary];
          parsedSongs.forEach((savedSong: Song) => {
            if (!allSongs.find((song) => song.id === savedSong.id)) {
              allSongs.push(savedSong);
            }
          });
          setSongs(allSongs);
        }

        // Charger les événements
        const savedEvents = localStorage.getItem("karaokeEvents");
        if (savedEvents) {
          setEvents(JSON.parse(savedEvents));
        } else {
          // Événements par défaut
          const defaultEvents = [
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
              description:
                "Une soirée nostalgique avec les plus grands hits des années 80 !",
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
              description:
                "Chantez vos chansons de Noël préférées dans une ambiance festive !",
            },
          ];
          setEvents(defaultEvents);
          localStorage.setItem("karaokeEvents", JSON.stringify(defaultEvents));
        }

        // Charger les participants
        const savedParticipants = localStorage.getItem("karaokeParticipants");
        if (savedParticipants) {
          setParticipants(JSON.parse(savedParticipants));
        } else {
          // Participants par défaut
          const defaultParticipants = [
            {
              id: 1,
              name: "Marie Dubois",
              email: "marie@example.com",
              phone: "06 12 34 56 78",
              song: {
                id: 1,
                title: "My Way",
                artist: "Frank Sinatra",
                genre: "Classique",
                youtubeId: "qQzdAsjWGPg",
              },
              eventId: 1,
              status: "En cours",
              registeredAt: new Date().toISOString(),
            },
            {
              id: 2,
              name: "Jean Martin",
              email: "jean@example.com",
              song: {
                id: 2,
                title: "Sweet Caroline",
                artist: "Neil Diamond",
                genre: "Pop",
                youtubeId: "1vhFnTjia_I",
              },
              eventId: 1,
              status: "En attente",
              registeredAt: new Date().toISOString(),
            },
            {
              id: 3,
              name: "Sophie Chen",
              song: {
                id: 3,
                title: "Don't Stop Me Now",
                artist: "Queen",
                genre: "Rock",
                youtubeId: "HgzGwKwLmgM",
              },
              eventId: 1,
              status: "En attente",
              registeredAt: new Date().toISOString(),
            },
          ];
          setParticipants(defaultParticipants);
          localStorage.setItem(
            "karaokeParticipants",
            JSON.stringify(defaultParticipants),
          );
        }
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Fonction pour ajouter une chanson
  const addSong = (newSong: Omit<Song, "id" | "popularity">) => {
    const songWithId = {
      ...newSong,
      id: Date.now(),
      popularity: Math.floor(Math.random() * 40) + 60,
    };

    const updatedSongs = [...songs, songWithId];
    setSongs(updatedSongs);

    // Sauvegarder seulement les nouvelles chansons
    const customSongs = updatedSongs.filter((song) => song.id > 1000); // IDs > 1000 = nouvelles chansons
    localStorage.setItem("karaokeLibrary", JSON.stringify(customSongs));

    return songWithId;
  };

  // Fonction pour ajouter un événement
  const addEvent = (
    newEvent: Omit<Event, "id" | "participants" | "status"> & {
      maxParticipants?: string | number;
    },
  ) => {
    const eventWithId = {
      ...newEvent,
      id: Date.now(),
      participants: 0,
      maxParticipants:
        typeof newEvent.maxParticipants === "string"
          ? Number.parseInt(newEvent.maxParticipants)
          : newEvent.maxParticipants || 50,
      status: "Programmée",
    };

    const updatedEvents = [...events, eventWithId];
    setEvents(updatedEvents);
    localStorage.setItem("karaokeEvents", JSON.stringify(updatedEvents));

    return eventWithId;
  };

  // Fonction pour ajouter un participant
  const addParticipant = (
    newParticipant:
      | {
          name: string;
          email?: string;
          phone?: string;
          songId: number;
          eventId: number;
        }
      | Partial<Participant>,
  ) => {
    // Handle both test format and actual format
    let participantData: Participant;

    if ("songId" in newParticipant && newParticipant.songId) {
      // Test format: { name, email, phone, songId, eventId }
      const song = songs.find((s) => s.id === newParticipant.songId);
      participantData = {
        id: Date.now(),
        name: newParticipant.name || "",
        email: newParticipant.email,
        phone: newParticipant.phone,
        song: song || songs[0],
        eventId: newParticipant.eventId || 1,
        status: "registered",
        registeredAt: new Date().toISOString(),
      };
    } else {
      // Actual format: full participant object
      const partial = newParticipant as Partial<Participant>;
      participantData = {
        id: Date.now(),
        name: partial.name || "",
        email: partial.email,
        phone: partial.phone,
        song: partial.song || songs[0],
        eventId: partial.eventId || 1,
        status: partial.status || "registered",
        registeredAt: partial.registeredAt || new Date().toISOString(),
      };
    }

    const updatedParticipants = [...participants, participantData];
    setParticipants(updatedParticipants);
    localStorage.setItem(
      "karaokeParticipants",
      JSON.stringify(updatedParticipants),
    );

    return participantData;
  };

  // Fonction pour supprimer une chanson
  const deleteSong = (songId: number) => {
    const updatedSongs = songs.filter((song) => song.id !== songId);
    setSongs(updatedSongs);

    const customSongs = updatedSongs.filter((song) => song.id > 1000);
    localStorage.setItem("karaokeLibrary", JSON.stringify(customSongs));
  };

  // Fonction pour supprimer un événement
  const deleteEvent = (eventId: number) => {
    const updatedEvents = events.filter((event) => event.id !== eventId);
    setEvents(updatedEvents);
    localStorage.setItem("karaokeEvents", JSON.stringify(updatedEvents));
  };

  // Fonction pour supprimer un participant
  const deleteParticipant = (participantId: number) => {
    const updatedParticipants = participants.filter(
      (participant) => participant.id !== participantId,
    );
    setParticipants(updatedParticipants);
    localStorage.setItem(
      "karaokeParticipants",
      JSON.stringify(updatedParticipants),
    );
  };

  // Fonction pour mettre à jour le statut d'un participant
  const updateParticipantStatus = (participantId: number, status: string) => {
    const updatedParticipants = participants.map((participant) =>
      participant.id === participantId
        ? { ...participant, status }
        : participant,
    );
    setParticipants(updatedParticipants);
    localStorage.setItem(
      "karaokeParticipants",
      JSON.stringify(updatedParticipants),
    );
  };

  // Fonction pour ajouter à la queue
  const addToQueue = (participantId: number) => {
    const participant = participants.find((p) => p.id === participantId);
    if (participant) {
      const updatedParticipant = { ...participant, status: "in-queue" };
      setQueue((prev) => [...prev, updatedParticipant]);
      updateParticipantStatus(participantId, "in-queue");
    }
  };

  // Fonction pour retirer de la queue
  const removeFromQueue = (participantId: number) => {
    setQueue((prev) => prev.filter((p) => p.id !== participantId));
    updateParticipantStatus(participantId, "registered");
  };

  // Fonction pour filtrer les chansons
  const filterSongs = (filters: { genre?: string }) => {
    let filtered = karaokeLibrary;
    if (filters.genre) {
      filtered = filtered.filter((song) => song.genre === filters.genre);
    }
    setSongs(filtered);
  };

  // Fonction pour rechercher des chansons
  const searchSongs = (query: string) => {
    const filtered = karaokeLibrary.filter(
      (song) =>
        song.title.toLowerCase().includes(query.toLowerCase()) ||
        song.artist.toLowerCase().includes(query.toLowerCase()),
    );
    setSongs(filtered);
  };

  // Fonction pour obtenir les statistiques d'événements
  const getEventStats = () => {
    return {
      totalEvents: events.length,
      upcomingEvents: events.filter(
        (e) => e.status === "upcoming" || e.status === "Programmée",
      ).length,
      totalParticipants: participants.length,
    };
  };

  return {
    songs,
    events,
    participants,
    queue,
    isLoading,
    addSong,
    addEvent,
    addParticipant,
    deleteSong,
    deleteEvent,
    deleteParticipant,
    updateParticipantStatus,
    addToQueue,
    removeFromQueue,
    filterSongs,
    searchSongs,
    getEventStats,
    setSongs,
    setEvents,
    setParticipants,
  };
}
