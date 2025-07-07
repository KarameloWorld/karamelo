"use client";

import { useState } from "react";
import { Mic, Music, Users } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { useCustomAlert } from "@/components/custom-alert";
import LoginBackground from "@/components/shared/login-background";
import LoginForm from "@/components/shared/login-form";

export default function BarLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const { showAlert, AlertComponent } = useCustomAlert();
  const handleSubmit = (formData: {
    email: string;
    password: string;
    rememberMe: boolean;
  }) => {
    setIsLoading(true);

    // Identifiants bar de test
    const barCredentials = {
      email: "bar@karamelo.com",
      password: "bar123",
    };

    setTimeout(() => {
      setIsLoading(false);

      // Vérification des identifiants
      if (
        formData.email === barCredentials.email &&
        formData.password === barCredentials.password
      ) {
        // Connexion réussie
        localStorage.setItem("isBarLoggedIn", "true");
        localStorage.setItem("barEmail", formData.email);
        console.log("Connexion bar réussie", formData);
        window.history.pushState({}, "", "/");
        window.dispatchEvent(new PopStateEvent("popstate"));
      } else {
        // Identifiants incorrects
        showAlert(
          "error",
          "Identifiants incorrects !",
          "Utilisez :\nEmail: bar@karamelo.com\nMot de passe: bar123",
        );
      }
    }, 2000);
  };

  return (
    <LoginBackground>
      {/* Header */}
      <div className="text-center mb-8">
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-4 rounded-2xl inline-block mb-4">
          <Mic className="h-12 w-12 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-2">KaraMelo</h1>
        <p className="text-purple-200">Connexion Établissement</p>
      </div>

      {/* Identifiants de test */}
      <Card className="bg-gradient-to-r from-pink-500/20 to-purple-600/20 backdrop-blur-sm border-pink-500/30 mb-6">
        <CardContent className="p-4">
          <div className="text-center">
            <h3 className="text-black font-semibold mb-2">
              🔑 Identifiants de test
            </h3>
            <div className="space-y-1 text-sm">
              <p className="text-pink-700">
                <strong>Email:</strong> bar@karamelo.com
              </p>
              <p className="text-pink-200">
                <strong>Mot de passe:</strong> bar123
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Formulaire de connexion */}
      <LoginForm
        title="Bienvenue !"
        description="Connectez-vous pour gérer votre soirée karaoké"
        emailLabel="Email de l'établissement"
        emailPlaceholder="bar@exemple.com"
        passwordLabel="Mot de passe"
        submitButtonText="Se connecter"
        submitButtonClass="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />

      {/* Fonctionnalités */}
      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="bg-black/10 backdrop-blur-sm rounded-lg p-4 text-center">
          <Music className="h-6 w-6 text-pink-400 mx-auto mb-2" />
          <p className="text-white text-sm font-medium">Gestion des chansons</p>
        </div>
        <div className="bg-black/10 backdrop-blur-sm rounded-lg p-4 text-center">
          <Users className="h-6 w-6 text-blue-400 mx-auto mb-2" />
          <p className="text-white text-sm font-medium">
            Suivi des participants
          </p>
        </div>
      </div>

      <AlertComponent />
    </LoginBackground>
  );
}
