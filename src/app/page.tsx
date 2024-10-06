"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth, useClerk } from "@clerk/clerk-react";
import { Moon, Star, Zap } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ElegantLandingPage() {
  const { isSignedIn } = useAuth();
  const { redirectToSignIn } = useClerk();
  const router = useRouter();

  const handleGetStarted = () => {
    if (isSignedIn) {
      // User is authenticated, redirect to /dashboard
      router.push("/dashboard");
    } else {
      // User is not authenticated, redirect to sign-in via Clerk
      redirectToSignIn({ redirectUrl: "/dashboard" });
    }
  };

  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme("dark"); // Force dark theme on load
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <main>
        <section className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
            Semantic search for your notes
          </h1>
          <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
            Elegant is a powerful note-taking app that helps you find what you
            need when you need it.
          </p>
          <Button
            onClick={handleGetStarted}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors"
          >
            Get Started
          </Button>
        </section>

        <section className="bg-gray-900 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-purple-400">
              Our Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Moon className="w-10 h-10 text-purple-400" />}
                title="Sleek Design"
                description="Immerse your users in a visually stunning interface that's both intuitive and elegant."
              />
              <FeatureCard
                icon={<Zap className="w-10 h-10 text-purple-400" />}
                title="Lightning Fast"
                description="Experience blazing-fast performance that keeps your users engaged and coming back for more."
              />
              <FeatureCard
                icon={<Star className="w-10 h-10 text-purple-400" />}
                title="Premium Quality"
                description="Enjoy top-tier features and functionality that set you apart from the competition."
              />
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-3xl font-bold mb-8 text-purple-400">
            Stay Updated
          </h2>
          <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest updates and exclusive
            offers.
          </p>
          <form className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-gray-800 text-white border-gray-700 focus:border-purple-400"
            />
            <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full transition-colors">
              Subscribe
            </Button>
          </form>
        </section>
      </main>

      <footer className="bg-gray-900 py-8">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>&copy; 2024 Elegant. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg text-center">
      <div className="mb-4 flex justify-center">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-purple-300">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}
