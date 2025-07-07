"use client";

import { useState } from "react";
import { Shield, Settings, BarChart3, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCustomAlert } from "@/components/custom-alert";
import LoginBackground from "@/components/shared/login-background";
import LoginForm from "@/components/shared/login-form";

export default function AdminLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const { showAlert, AlertComponent } = useCustomAlert();

  const handleSubmit = (formData: {
    email: string;
    password: string;
    rememberMe: boolean;
  }) => {
    setIsLoading(true);

    // Identifiants admin de test
    const adminCredentials = {
      email: "admin@karamelo.com",
      password: "admin123",
    };

    setTimeout(() => {
      setIsLoading(false);

      // Vérification des identifiants
      if (
        formData.email === adminCredentials.email &&
        formData.password === adminCredentials.password
      ) {
        // Connexion réussie
        localStorage.setItem("isAdminLoggedIn", "true");
        localStorage.setItem("adminEmail", formData.email);
        console.log("Connexion admin réussie", formData);
        window.location.href = "/";
      } else {
        // Identifiants incorrects
        showAlert(
          "error",
          "Identifiants incorrects !",
          "Utilisez :\nEmail: admin@karamelo.com\nMot de passe: admin123",
        );
      }
    }, 2000);
  };

  return (
    <LoginBackground>
      {/* Header */}
      <div className="text-center mb-8">
        <div className="bg-gradient-to-r from-orange-500 to-red-600 p-4 rounded-2xl inline-block mb-4">
          <Shield className="h-12 w-12 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-2">Admin KaraMelo</h1>
        <p className="text-purple-200">Accès Administration</p>
      </div>

      {/* Identifiants de test */}
      <Card className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 backdrop-blur-sm border-blue-500/30 mb-6">
        <CardContent className="p-4">
          <div className="text-center">
            <h3 className="text-pink-700 font-semibold mb-2">
              🔑 Identifiants de test
            </h3>
            <div className="space-y-1 text-sm">
              <p className="text-blue-700">
                <strong>Email:</strong> admin@karamelo.com
              </p>
              <p className="text-blue-700">
                <strong>Mot de passe:</strong> admin123
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Formulaire de connexion admin */}
      <LoginForm
        title="Connexion Administrateur"
        description="Accédez au panneau de gestion complet"
        emailLabel="Email administrateur"
        emailPlaceholder="admin@karamelo.com"
        passwordLabel="Mot de passe administrateur"
        submitButtonText="Accès Admin"
        submitButtonClass="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
        onSubmit={handleSubmit}
        isLoading={isLoading}
        showRememberMe={true}
        rememberMeLabel="Maintenir la session admin"
        submitIcon={<Shield className="h-4 w-4" />}
        inputFocusColor="focus:border-orange-400 focus:ring-orange-400"
        checkboxColor="data-[state=checked]:bg-orange-600 data-[state=checked]:border-orange-600"
      />

      <div className="text-center mt-4">
        <Button
          type="button"
          variant="link"
          className="text-purple-300 hover:text-white text-sm"
        >
          Problème de connexion ?
        </Button>
      </div>

      {/* Fonctionnalités Admin */}
      <div className="mt-8 grid grid-cols-3 gap-4">
        <div className="bg-black/10 backdrop-blur-sm rounded-lg p-4 text-center">
          <Settings className="h-6 w-6 text-orange-400 mx-auto mb-2" />
          <p className="text-white text-sm font-medium">Gestion complète</p>
        </div>
        <div className="bg-black/10 backdrop-blur-sm rounded-lg p-4 text-center">
          <BarChart3 className="h-6 w-6 text-red-400 mx-auto mb-2" />
          <p className="text-white text-sm font-medium">Statistiques</p>
        </div>
        <div className="bg-black/10 backdrop-blur-sm rounded-lg p-4 text-center">
          <Users className="h-6 w-6 text-pink-400 mx-auto mb-2" />
          <p className="text-white text-sm font-medium">Multi-bars</p>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-8">
        <p className="text-purple-300 text-sm">
          Retour à l'accueil ?{" "}
          <Button
            variant="link"
            className="text-orange-400 hover:text-orange-300 p-0 h-auto"
            onClick={() => (window.location.href = "/")}
          >
            Dashboard Bar
          </Button>
        </p>
      </div>

      <AlertComponent />
    </LoginBackground>
  );
}
