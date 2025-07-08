"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Key, User, Shield } from "lucide-react";

export default function LoginHelper() {
  return (
    <div className="space-y-4">
      {/* Identifiants Bar */}
      <Card className="bg-gradient-to-r from-pink-500 to-purple-600 backdrop-blur-sm border-pink-500/30">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <User className="h-5 w-5 text-pink-400" />
            <div>
              <h3 className="text-white font-semibold">🏪 Connexion Bar</h3>
              <div className="space-y-1 text-sm">
                <p className="text-pink-200">
                  <strong>Email:</strong> bar@karamelo.com
                </p>
                <p className="text-pink-200">
                  <strong>Mot de passe:</strong> bar123
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Identifiants Admin */}
      <Card className="bg-gradient-to-r from-orange-500/20 to-red-600/20 backdrop-blur-sm border-orange-500/30">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <Shield className="h-5 w-5 text-orange-400" />
            <div>
              <h3 className="text-pink-600 font-semibold">
                👑 Connexion Admin
              </h3>
              <div className="space-y-1 text-sm">
                <p className="text-orange-200">
                  <strong>Email:</strong> admin@karamelo.com
                </p>
                <p className="text-orange-200">
                  <strong>Mot de passe:</strong> admin123
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fonctionnalités */}
      <div className="grid grid-cols-2 gap-2">
        <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 p-2 justify-center">
          <Key className="h-3 w-3 mr-1" />
          Test facile
        </Badge>
        <Badge className="bg-green-500/20 text-green-300 border-green-500/30 p-2 justify-center">
          Accès complet
        </Badge>
      </div>
    </div>
  );
}
