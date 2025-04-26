import { CalendarCheck2, Dumbbell, Brain, Coins, Gift, Trophy, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui"
import { HeroSection, FeatureCard, TestimonialCard, PricingCard, Footer } from "@/components/landing"

export function LandingSections() {
  return (
    <main>
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Powerful Features to Build Better Habits</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              HabitTrack combines habit tracking with gamification to make building good habits fun and rewarding.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<CalendarCheck2 className="h-10 w-10 text-primary" />}
              title="Habit Tracking"
              description="Track your daily habits with streaks, completion rates, and detailed analytics to monitor your progress."
            />
            <FeatureCard
              icon={<Dumbbell className="h-10 w-10 text-red-500" />}
              title="Strength Attribute"
              description="Build your physical strength attribute by completing exercise and endurance-related habits."
            />
            <FeatureCard
              icon={<Brain className="h-10 w-10 text-blue-500" />}
              title="Smart Attribute"
              description="Increase your intelligence attribute by completing learning and cognitive habits."
            />
            <FeatureCard
              icon={<Coins className="h-10 w-10 text-yellow-500" />}
              title="Reward System"
              description="Earn coins by completing habits and maintaining streaks to redeem for real-life rewards."
            />
            <FeatureCard
              icon={<Trophy className="h-10 w-10 text-amber-500" />}
              title="Achievements"
              description="Unlock badges and achievements as you reach milestones in your habit journey."
            />
            <FeatureCard
              icon={<Gift className="h-10 w-10 text-purple-500" />}
              title="Customizable Rewards"
              description="Create personalized rewards that motivate you to maintain your habits consistently."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How HabitTrack Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our unique approach to habit building combines proven techniques with game mechanics to keep you
              motivated.
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div className="bg-muted/50 rounded-xl overflow-hidden shadow-lg">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <div className="w-3/4 h-3/4 bg-card rounded-lg border shadow-md flex items-center justify-center">
                  <CalendarCheck2 className="h-16 w-16 text-primary/60" />
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 rounded-full w-8 h-8 flex items-center justify-center text-primary font-bold">
                    1
                  </div>
                  <h3 className="text-xl font-semibold">Create Your Habits</h3>
                </div>
                <p className="text-muted-foreground pl-11">
                  Start by adding habits you want to build. Categorize them based on whether they build Strength,
                  Smarts, or both.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 rounded-full w-8 h-8 flex items-center justify-center text-primary font-bold">
                    2
                  </div>
                  <h3 className="text-xl font-semibold">Track Daily Progress</h3>
                </div>
                <p className="text-muted-foreground pl-11">
                  Check off habits as you complete them daily. Build streaks and watch your attributes grow over time.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 rounded-full w-8 h-8 flex items-center justify-center text-primary font-bold">
                    3
                  </div>
                  <h3 className="text-xl font-semibold">Earn Rewards</h3>
                </div>
                <p className="text-muted-foreground pl-11">
                  Collect coins as you maintain streaks and complete habits. Redeem them for rewards you've set for
                  yourself.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 rounded-full w-8 h-8 flex items-center justify-center text-primary font-bold">
                    4
                  </div>
                  <h3 className="text-xl font-semibold">Level Up Your Life</h3>
                </div>
                <p className="text-muted-foreground pl-11">
                  As you consistently build habits, you'll level up, unlock achievements, and transform your daily
                  routine.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Attributes Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Build Your Character in Real Life</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              HabitTrack turns your real-life habits into character attributes, making self-improvement feel like a
              game.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-card rounded-xl overflow-hidden border shadow-md">
              <div className="h-24 bg-gradient-to-r from-red-500/20 to-red-500/5 flex items-center justify-center">
                <Dumbbell className="h-12 w-12 text-red-500" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                  Strength <span className="text-xl">💪</span>
                </h3>
                <p className="text-muted-foreground mb-4">
                  Build your physical power and endurance through consistent exercise and physical activities.
                </p>
                <ul className="space-y-2">
                  {["Morning workout", "10,000 steps", "Stretching routine", "Sports practice"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-card rounded-xl overflow-hidden border shadow-md">
              <div className="h-24 bg-gradient-to-r from-blue-500/20 to-blue-500/5 flex items-center justify-center">
                <Brain className="h-12 w-12 text-blue-500" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                  Smart <span className="text-xl">🧠</span>
                </h3>
                <p className="text-muted-foreground mb-4">
                  Enhance your intelligence and problem-solving skills through learning and mental exercises.
                </p>
                <ul className="space-y-2">
                  {["Reading books", "Learning languages", "Solving puzzles", "Taking courses"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-card rounded-xl overflow-hidden border shadow-md">
              <div className="h-24 bg-gradient-to-r from-yellow-500/20 to-yellow-500/5 flex items-center justify-center">
                <Coins className="h-12 w-12 text-yellow-500" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                  Coins <span className="text-xl">💰</span>
                </h3>
                <p className="text-muted-foreground mb-4">
                  Earn coins by completing habits and maintaining streaks to redeem for real-life rewards.
                </p>
                <ul className="space-y-2">
                  {["Daily completions", "Streak milestones", "Achievement unlocks", "Level-up bonuses"].map(
                    (item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover how HabitTrack has helped people transform their daily routines and achieve their goals.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <TestimonialCard
              quote="HabitTrack completely changed how I approach my daily routine. The gamification aspect makes building habits actually fun!"
              author="Sarah J."
              role="Fitness Enthusiast"
              rating={5}
            />
            <TestimonialCard
              quote="I've tried many habit trackers, but the attributes system in HabitTrack gives me a real sense of progress. I can see myself leveling up in real life!"
              author="Michael T."
              role="Software Developer"
              rating={5}
            />
            <TestimonialCard
              quote="The rewards system is genius. Being able to earn coins and redeem them for things I enjoy has made me much more consistent with my habits."
              author="Emma R."
              role="Graduate Student"
              rating={4}
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that works best for your habit-building journey.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
            <PricingCard
              title="Free"
              price="$0"
              description="Perfect for getting started with habit tracking"
              features={["Track up to 5 habits", "Basic analytics", "Streak tracking", "Mobile access"]}
              buttonText="Get Started"
              buttonVariant="outline"
            />
            <PricingCard
              title="Pro"
              price="$5.99"
              period="per month"
              description="For serious habit builders who want more features"
              features={[
                "Unlimited habits",
                "Advanced analytics",
                "Custom attributes",
                "Unlimited rewards",
                "Priority support",
              ]}
              buttonText="Subscribe Now"
              buttonVariant="default"
              highlighted={true}
            />
            <PricingCard
              title="Team"
              price="$12.99"
              period="per month"
              description="Perfect for families or small teams"
              features={[
                "Everything in Pro",
                "Up to 5 users",
                "Team challenges",
                "Shared achievements",
                "Admin dashboard",
              ]}
              buttonText="Contact Sales"
              buttonVariant="outline"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/20 to-primary/5">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Habits?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of users who are already building better habits and leveling up their lives with
            HabitTrack.
          </p>
          <Button size="lg" className="gap-2">
            Get Started Now
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>
    </main>
  )
}
