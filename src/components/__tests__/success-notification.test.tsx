import React from "react";
import { render, screen, act } from "@testing-library/react";
import SuccessNotification from "../success-notification";

describe("SuccessNotification Component", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it("renders with message when show is true", () => {
    render(
      <SuccessNotification
        show={true}
        message="Test success message"
        onClose={() => {}}
      />,
    );

    expect(screen.getByText("Test success message")).toBeInTheDocument();
  });

  it("does not render when show is false", () => {
    render(
      <SuccessNotification
        show={false}
        message="Test message"
        onClose={() => {}}
      />,
    );

    expect(screen.queryByText("Test message")).not.toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", async () => {
    const mockOnClose = vi.fn();

    render(
      <SuccessNotification
        show={true}
        message="Test message"
        onClose={mockOnClose}
        duration={0}
      />,
    );

    const closeButton = screen.getByRole("button");

    // Use fireEvent instead of userEvent for faster execution
    const { fireEvent } = await import("@testing-library/react");
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("auto-closes after specified duration", () => {
    const mockOnClose = vi.fn();

    render(
      <SuccessNotification
        show={true}
        message="Auto close message"
        onClose={mockOnClose}
        duration={3000}
      />,
    );

    // Fast forward time
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("uses default duration when not specified", () => {
    const mockOnClose = vi.fn();

    render(
      <SuccessNotification
        show={true}
        message="Default duration message"
        onClose={mockOnClose}
      />,
    );

    // Fast forward default time (usually 5000ms)
    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("does not auto-close when duration is 0", () => {
    const mockOnClose = vi.fn();

    render(
      <SuccessNotification
        show={true}
        message="No auto close message"
        onClose={mockOnClose}
        duration={0}
      />,
    );

    // Fast forward a long time
    act(() => {
      vi.advanceTimersByTime(10000);
    });

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it("clears timeout when component unmounts", () => {
    const mockOnClose = vi.fn();
    const { unmount } = render(
      <SuccessNotification
        show={true}
        message="Unmount test"
        onClose={mockOnClose}
        duration={3000}
      />,
    );

    unmount();

    // Fast forward time after unmount
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it("resets timeout when show prop changes", () => {
    const mockOnClose = vi.fn();
    const { rerender } = render(
      <SuccessNotification
        show={true}
        message="Reset test"
        onClose={mockOnClose}
        duration={3000}
      />,
    );

    // Fast forward halfway
    act(() => {
      vi.advanceTimersByTime(1500);
    });

    // Hide notification
    rerender(
      <SuccessNotification
        show={false}
        message="Reset test"
        onClose={mockOnClose}
        duration={3000}
      />,
    );

    // Show notification again
    rerender(
      <SuccessNotification
        show={true}
        message="Reset test"
        onClose={mockOnClose}
        duration={3000}
      />,
    );

    // Fast forward original remaining time
    act(() => {
      vi.advanceTimersByTime(1500);
    });

    // Should not have closed yet (timer was reset)
    expect(mockOnClose).not.toHaveBeenCalled();

    // Fast forward full duration
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("displays success icon", () => {
    render(
      <SuccessNotification
        show={true}
        message="Icon test"
        onClose={() => {}}
      />,
    );

    // Check for success icon (CheckCircle from lucide-react)
    const icon = screen.getByText("Icon test").previousElementSibling;
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass("lucide", "lucide-circle-check-big");
  });

  it("has proper accessibility attributes", () => {
    render(
      <SuccessNotification
        show={true}
        message="Accessibility test"
        onClose={() => {}}
      />,
    );

    const notification =
      screen.getByRole("alert") || screen.getByRole("status");
    expect(notification).toBeInTheDocument();
  });
});
