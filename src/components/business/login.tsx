"use client";

import type React from "react";

import { useState } from "react";
import { Eye, EyeOff, Mic, Music, Users } from "lucide-react";

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
import { Checkbox } from "@/components/ui/checkbox";

export default function BarLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Identifiants bar de test
    const barCredentials = {
      email: "bar@karaobar.com",
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
        window.history.pushState({}, "", "/dashboard");
        window.dispatchEvent(new PopStateEvent("popstate"));
      } else {
        // Identifiants incorrects
        alert(
          "Identifiants incorrects !\n\nUtilisez :\nEmail: bar@karaobar.com\nMot de passe: bar123",
        );
      }
    }, 2000);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      {/* Éléments décoratifs en arrière-plan */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-4 rounded-2xl inline-block mb-4">
            <Mic className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">KaraoBar</h1>
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
                  <strong>Email:</strong> bar@karaobar.com
                </p>
                <p className="text-pink-200">
                  <strong>Mot de passe:</strong> bar123
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Formulaire de connexion */}
        <Card className="bg-black/20 backdrop-blur-sm border-white/10 shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-white">Bienvenue !</CardTitle>
            <CardDescription className="text-purple-200">
              Connectez-vous pour gérer votre soirée karaoké
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email de l'établissement
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="bar@exemple.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-purple-300 focus:border-purple-400 focus:ring-purple-400"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  Mot de passe
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    className="bg-white/10 border-white/20 text-white placeholder:text-purple-300 focus:border-purple-400 focus:ring-purple-400 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 text-purple-300 hover:text-white hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={formData.rememberMe}
                  onCheckedChange={(checked) =>
                    handleInputChange("rememberMe", checked as boolean)
                  }
                  className="border-white/20 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                />
                <Label htmlFor="remember" className="text-sm text-purple-200">
                  Se souvenir de moi
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                    Connexion...
                  </div>
                ) : (
                  "Se connecter"
                )}
              </Button>

              <div className="text-center">
                <Button
                  type="button"
                  variant="link"
                  className="text-purple-300 hover:text-white text-sm"
                >
                  Mot de passe oublié ?
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Fonctionnalités */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="bg-black/10 backdrop-blur-sm rounded-lg p-4 text-center">
            <Music className="h-6 w-6 text-pink-400 mx-auto mb-2" />
            <p className="text-white text-sm font-medium">
              Gestion des chansons
            </p>
          </div>
          <div className="bg-black/10 backdrop-blur-sm rounded-lg p-4 text-center">
            <Users className="h-6 w-6 text-blue-400 mx-auto mb-2" />
            <p className="text-white text-sm font-medium">
              Suivi des participants
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-purple-300 text-sm">
            Nouveau sur KaraoBar ?{" "}
            <Button
              variant="link"
              className="text-pink-400 hover:text-pink-300 p-0 h-auto"
            >
              Demander un accès
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}
