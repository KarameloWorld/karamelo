import type React from "react";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

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

interface LoginFormProps {
  title: string;
  description: string;
  emailPlaceholder: string;
  emailLabel: string;
  passwordLabel: string;
  submitButtonText: string;
  submitButtonClass: string;
  onSubmit: (formData: {
    email: string;
    password: string;
    rememberMe: boolean;
  }) => void;
  isLoading: boolean;
  showRememberMe?: boolean;
  rememberMeLabel?: string;
  submitIcon?: React.ReactNode;
  inputFocusColor?: string;
  checkboxColor?: string;
}

export default function LoginForm({
  title,
  description,
  emailPlaceholder,
  emailLabel,
  passwordLabel,
  submitButtonText,
  submitButtonClass,
  onSubmit,
  isLoading,
  showRememberMe = false,
  rememberMeLabel = "Se souvenir de moi",
  submitIcon,
  inputFocusColor = "focus:border-purple-400 focus:ring-purple-400",
  checkboxColor = "data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600",
}: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="bg-black/20 backdrop-blur-sm border-white/10 shadow-2xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl text-white">{title}</CardTitle>
        <CardDescription className="text-purple-200">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">
              {emailLabel}
            </Label>
            <Input
              id="email"
              type="email"
              placeholder={emailPlaceholder}
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={`bg-white/10 border-white/20 text-white placeholder:text-purple-300 ${inputFocusColor}`}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">
              {passwordLabel}
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className={`bg-white/10 border-white/20 text-white placeholder:text-purple-300 ${inputFocusColor} pr-10`}
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

          {showRememberMe && (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={formData.rememberMe}
                onCheckedChange={(checked) =>
                  handleInputChange("rememberMe", checked as boolean)
                }
                className={`border-white/20 ${checkboxColor}`}
              />
              <Label htmlFor="remember" className="text-sm text-purple-200">
                {rememberMeLabel}
              </Label>
            </div>
          )}

          <Button
            type="submit"
            className={`w-full ${submitButtonClass} text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-105`}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                Connexion...
              </div>
            ) : (
              <>
                {submitIcon && <span className="mr-2">{submitIcon}</span>}
                {submitButtonText}
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
