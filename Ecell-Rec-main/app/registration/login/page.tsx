'use client'

import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, LogIn, Key, Loader2 } from "lucide-react";
import { ECellLogo } from "@/components/ECellLogo";
import { InfoTooltip } from "@/components/ui/info-tooltip";
import { SimpleThemeToggle } from "@/components/ui/theme-toggle";
import { MockDataService } from "@/lib/mockData";

interface LoginForm {
  emailOrRoll: string;
  password: string;
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginForm>();
  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = async (data: LoginForm) => {
    // Check if email is provided and validate domain
    if (data.emailOrRoll.includes('@') && !data.emailOrRoll.endsWith('@raghuenggcollege.in')) {
      toast({
        title: "Invalid Email Domain",
        description: "Please use your college email ID (@raghuenggcollege.in)",
        variant: "destructive"
      });
      return;
    }

    try {
      // Find user by email or roll number
      let userResult;
      if (data.emailOrRoll.includes('@')) {
        userResult = await MockDataService.getUserByEmail(data.emailOrRoll);
      } else {
        userResult = await MockDataService.getUserByRollNumber(data.emailOrRoll.toUpperCase());
      }

      if (!userResult.data) {
        toast({
          title: "Login Failed",
          description: "No account found with this email or roll number.",
          variant: "destructive"
        });
        return;
      }

      const user = userResult.data;

      // In a real app, you would verify the password here
      // For demo purposes, we'll accept any password for existing users

      // Update last login
      await MockDataService.updateUser(user.id, {
        last_login: new Date().toISOString()
      });

      // Store user session
      localStorage.setItem("user", JSON.stringify({
        id: user.id,
        name: user.full_name,
        rollNumber: user.roll_number,
        email: user.email,
        branch: user.branch,
        year: user.year,
        phone: user.phone_number,
        status: user.status
      }));

      toast({
        title: "Login Successful! 🎉",
        description: `Welcome back, ${user.full_name}!`
      });
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Failed",
        description: "An error occurred during login. Please try again.",
        variant: "destructive"
      });
      return;
    }

    router.push("/registration/dashboard");
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center transition-colors duration-300">
      {/* Theme Toggle - Fixed position */}
      <div className="fixed top-6 right-6 z-50">
        <SimpleThemeToggle />
      </div>

      {/* Background elements */}
      <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-gradient-primary opacity-20 blur-xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-48 h-48 rounded-full bg-gradient-accent opacity-15 blur-xl animate-pulse delay-1000" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-card/50 backdrop-blur-sm mb-4">
            <ECellLogo size="sm" className="text-primary" />
            <span className="text-xs font-medium">E-Cell</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-sm text-muted-foreground">
            Login to access your startup submission portal
          </p>
        </div>

        {/* Login Form */}
        <div className="max-w-sm mx-auto">
          <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
            <CardHeader className="pb-4">
              <CardTitle className="text-center flex items-center justify-center gap-2 text-lg">
                <LogIn className="w-4 h-4 text-primary" />
                Login to Your Account
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                {/* Email or Roll Number */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 min-h-[20px]">
                    <Label htmlFor="emailOrRoll">College Email ID</Label>
                    <InfoTooltip content="Use your college email ID ending with @raghuenggcollege.in" />
                  </div>
                  <Input
                    id="emailOrRoll"
                    {...register("emailOrRoll", {
                      required: "College email ID is required",
                      validate: (value) => {
                        if (value.includes('@') && !value.endsWith('@raghuenggcollege.in')) {
                          return "Please use your college email ID (@raghuenggcollege.in)";
                        }
                        return true;
                      }
                    })}
                    autoFocus
                    className="bg-background/50"
                    placeholder="yourname@raghuenggcollege.in"
                  />
                  {errors.emailOrRoll && (
                    <p className="text-destructive text-sm">{errors.emailOrRoll.message}</p>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      {...register("password", { required: "Password is required" })}
                      className="bg-background/50 pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                  {errors.password && (
                    <p className="text-destructive text-sm">{errors.password.message}</p>
                  )}
                </div>

                {/* Forgot Password */}
                <div className="text-right">
                  <Link href="/forgot-password" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
                    <Key className="w-3 h-3" />
                    Forgot password?
                  </Link>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-primary hover:shadow-glow-primary transition-all duration-300"
                  size="default"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>

                {/* Register Link */}
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <Link href="/registration/register" className="text-primary hover:underline">
                      Register here
                    </Link>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
