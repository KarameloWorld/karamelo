import React from "react";
import { render, screen } from "@testing-library/react";
import EventManagement from "../components/business/event-management";

// Mock the useKaraokeData hook
const mockAddEvent = vi.fn();
const mockEvents = [
  {
    id: 1,
    name: "Soirée Années 80",
    date: "2025-01-15",
    startTime: "20:00",
    endTime: "23:00",
    theme: "Rétro",
    participants: 25,
    maxParticipants: 50,
    location: "Salle des Fêtes",
    status: "Programmée",
    description: "Une soirée nostalgie",
  },
  {
    id: 2,
    name: "Karaoké Pop",
    date: "2025-01-20",
    startTime: "19:00",
    endTime: "22:00",
    theme: "Pop",
    participants: 15,
    maxParticipants: 30,
    location: "Bar Central",
    status: "En cours",
    description: "Hits pop actuels",
  },
];

vi.mock("../hooks/use-karaoke-data", () => ({
  useKaraokeData: () => ({
    events: mockEvents,
    addEvent: mockAddEvent,
    updateEvent: vi.fn(),
    deleteEvent: vi.fn(),
  }),
}));

describe("EventManagement Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders event list", () => {
    render(<EventManagement />);

    expect(screen.getByText("Gestion des Soirées")).toBeInTheDocument();
    expect(screen.getByText("Soirée Années 80")).toBeInTheDocument();
    expect(screen.getByText("Karaoké Pop")).toBeInTheDocument();
  });

  it("displays event details correctly", () => {
    render(<EventManagement />);

    expect(screen.getByText("15 Jan 2025")).toBeInTheDocument();
    expect(screen.getByText("20:00 - 23:00")).toBeInTheDocument();
    expect(screen.getByText("25 / 50 participants")).toBeInTheDocument();
    expect(screen.getByText("Salle des Fêtes")).toBeInTheDocument();
  });

  it("shows event status badges", () => {
    render(<EventManagement />);

    expect(screen.getByText("Programmée")).toBeInTheDocument();
    // Check for badge-specific "En cours" text
    const badges = screen.getAllByText("En cours");
    expect(badges.length).toBeGreaterThan(0);
  });

  it("has create event button", () => {
    render(<EventManagement />);

    const createButton = screen.getByRole("button", {
      name: /nouvelle soirée/i,
    });
    expect(createButton).toBeInTheDocument();
  });

  it("displays event information correctly", () => {
    render(<EventManagement />);

    // Check that events are displayed with correct information
    expect(screen.getByText("Soirée Années 80")).toBeInTheDocument();
    expect(screen.getByText("Karaoké Pop")).toBeInTheDocument();
    expect(screen.getByText("Salle des Fêtes")).toBeInTheDocument();
    expect(screen.getByText("Bar Central")).toBeInTheDocument();
  });

  it("displays statistics correctly", () => {
    render(<EventManagement />);

    // Check statistics display
    expect(screen.getByText("Total soirées")).toBeInTheDocument();
    expect(screen.getAllByText("En cours").length).toBeGreaterThan(0);
    expect(screen.getByText("Programmées")).toBeInTheDocument();
    expect(screen.getByText("Total participants")).toBeInTheDocument();
  });

  it("displays event dates and times", () => {
    render(<EventManagement />);

    // Check that dates and times are displayed
    expect(screen.getByText("20:00 - 23:00")).toBeInTheDocument();
    expect(screen.getByText("19:00 - 22:00")).toBeInTheDocument();
  });

  it("displays participant counts", () => {
    render(<EventManagement />);

    // Check that participant counts are displayed
    expect(screen.getByText("25 / 50 participants")).toBeInTheDocument();
    expect(screen.getByText("15 / 30 participants")).toBeInTheDocument();
  });

  it("displays event count in statistics", () => {
    render(<EventManagement />);

    // Should show total events count
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("displays event action buttons", () => {
    render(<EventManagement />);

    // Should show edit and delete buttons for events
    const editButtons = screen.getAllByText("Modifier");
    expect(editButtons.length).toBeGreaterThan(0);
  });
});
