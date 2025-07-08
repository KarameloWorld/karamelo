"use client";

import React from "react";
import { CheckCircle, XCircle, AlertCircle, Info } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import type { AlertType } from "./custom-alert-types";

interface CustomAlertProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: AlertType;
  title: string;
  description: string;
  confirmText?: string;
  onConfirm?: () => void;
}

const alertConfig = {
  success: {
    icon: CheckCircle,
    bgClass:
      "bg-gradient-to-r from-green-500/20 to-emerald-600/20 border-green-500/30",
    iconClass: "text-green-400",
    titleClass: "text-green-700 dark:text-green-400",
  },
  error: {
    icon: XCircle,
    bgClass: "bg-gradient-to-r from-red-500/20 to-red-600/20 border-red-500/30",
    iconClass: "text-red-400",
    titleClass: "text-red-700 dark:text-red-400",
  },
  warning: {
    icon: AlertCircle,
    bgClass:
      "bg-gradient-to-r from-yellow-500/20 to-orange-600/20 border-yellow-500/30",
    iconClass: "text-yellow-400",
    titleClass: "text-yellow-700 dark:text-yellow-400",
  },
  info: {
    icon: Info,
    bgClass:
      "bg-gradient-to-r from-blue-500/20 to-cyan-600/20 border-blue-500/30",
    iconClass: "text-blue-400",
    titleClass: "text-blue-700 dark:text-blue-400",
  },
};

function CustomAlert({
  open,
  onOpenChange,
  type,
  title,
  description,
  confirmText = "OK",
  onConfirm,
}: CustomAlertProps) {
  const config = alertConfig[type];
  const Icon = config.icon;

  const handleConfirm = () => {
    onConfirm?.();
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-black/80 backdrop-blur-md border-white/10 text-white">
        <AlertDialogHeader>
          <div className={cn("rounded-lg p-4 mb-4", config.bgClass)}>
            <div className="flex items-center space-x-3">
              <div className={cn("rounded-full p-2", config.bgClass)}>
                <Icon className={cn("h-6 w-6", config.iconClass)} />
              </div>
              <div>
                <AlertDialogTitle
                  className={cn("text-lg font-semibold", config.titleClass)}
                >
                  {title}
                </AlertDialogTitle>
              </div>
            </div>
          </div>
          <AlertDialogDescription className="text-gray-300 text-base leading-relaxed">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={handleConfirm}
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

// Hook pour utiliser facilement les alertes
export function useCustomAlert() {
  const [alertState, setAlertState] = React.useState<{
    open: boolean;
    type: AlertType;
    title: string;
    description: string;
    confirmText?: string;
    onConfirm?: () => void;
  }>({
    open: false,
    type: "info",
    title: "",
    description: "",
  });

  const showAlert = React.useCallback(
    (
      type: AlertType,
      title: string,
      description: string,
      options?: {
        confirmText?: string;
        onConfirm?: () => void;
      },
    ) => {
      setAlertState({
        open: true,
        type,
        title,
        description,
        confirmText: options?.confirmText,
        onConfirm: options?.onConfirm,
      });
    },
    [],
  );

  const hideAlert = React.useCallback(() => {
    setAlertState((prev) => ({ ...prev, open: false }));
  }, []);

  const AlertComponent = React.useCallback(
    () =>
      React.createElement(CustomAlert, {
        open: alertState.open,
        onOpenChange: hideAlert,
        type: alertState.type,
        title: alertState.title,
        description: alertState.description,
        confirmText: alertState.confirmText,
        onConfirm: alertState.onConfirm,
      }),
    [alertState, hideAlert],
  );

  return {
    showAlert,
    hideAlert,
    AlertComponent,
  };
}

export { CustomAlert };
