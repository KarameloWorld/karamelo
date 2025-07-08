import ParticipantQueue from "../../components/business/participant-queue";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "File d'attente - KaraMelo",
  description:
    "Suivez votre position dans la file d'attente karaoké en temps réel",
};

export default function ParticipantQueuePage() {
  return <ParticipantQueue />;
}
