import { AppHeader } from "@/components/app-header"
import { Button } from "@/components/ui"
import { Card, CardContent } from "@/components/ui"
import { CalendarCheck2, Users, Heart, Target, Lightbulb, ArrowRight, Mail } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <AppHeader />
      <main className="container max-w-6xl mx-auto py-12 px-4">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium bg-background mb-6">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
            <span>Our Story</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About HabitTrack</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transforming daily habits into a rewarding journey through gamification and personal growth.
          </p>
        </section>

        {/* Founder's Message */}
        <section className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl p-1">
            <div className="bg-card rounded-lg overflow-hidden shadow-lg aspect-square flex items-center justify-center">
              <div className="text-9xl">👨‍💻</div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              Founder's Message
            </div>
            <h2 className="text-3xl font-bold">Hi, I'm An Hung</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                As someone who has always been passionate about personal development and technology, I created
                HabitTrack to solve a problem I personally faced: making habit-building engaging and sustainable.
              </p>
              <p>
                My journey began when I noticed that traditional habit trackers lacked the motivational elements that
                keep users engaged long-term. I wondered: what if building habits could feel as rewarding and engaging
                as playing a game?
              </p>
              <p>
                Drawing inspiration from role-playing games where characters level up and gain attributes, I envisioned
                a system where your real-life habits would build your real-life "character" - increasing your strength,
                intelligence, and resources.
              </p>
              <p className="font-medium text-foreground">
                HabitTrack is the result of that vision - a tool that transforms the sometimes challenging process of
                habit formation into an exciting journey of personal growth and achievement.
              </p>
            </div>
            <div className="pt-2">
              <Button asChild>
                <Link href="/contact" className="gap-2">
                  <Mail className="h-4 w-4" />
                  Get in Touch
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're on a mission to make personal development engaging, rewarding, and accessible to everyone.
            </p>
          </div>

          <Card className="border-none shadow-lg overflow-hidden">
            <CardContent className="p-8 md:p-12 relative">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Target className="h-6 w-6 text-primary" />
                    Why We Exist
                  </h3>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      In today's fast-paced world, building and maintaining positive habits is more challenging than
                      ever. Yet, these habits are the foundation of personal growth, health, and success.
                    </p>
                    <p>
                      HabitTrack exists to transform habit-building from a chore into an adventure. We believe that by
                      applying game design elements to real-life habit formation, we can help people create lasting
                      positive change in their lives.
                    </p>
                    <p className="font-medium text-foreground">
                      Our ultimate goal is to help one million people build life-changing habits that enhance their
                      physical health, mental capabilities, and overall quality of life.
                    </p>
                  </div>
                </div>
                <div className="bg-card rounded-xl p-6 shadow-md border">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-full text-primary">
                        <Heart className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">Make Habit-Building Enjoyable</h4>
                        <p className="text-sm text-muted-foreground">
                          By turning habit formation into a game, we make the process intrinsically rewarding and fun.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-full text-primary">
                        <Users className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">Empower Personal Growth</h4>
                        <p className="text-sm text-muted-foreground">
                          Our attribute system helps users visualize and track their development in key life areas.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-full text-primary">
                        <Lightbulb className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">Encourage Sustainable Change</h4>
                        <p className="text-sm text-muted-foreground">
                          Our reward system creates positive reinforcement loops that lead to lasting habit formation.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* The Story */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The evolution of HabitTrack from concept to reality
            </p>
          </div>

          <div className="space-y-12">
            <div className="grid md:grid-cols-5 gap-6 items-center">
              <div className="md:col-span-2">
                <div className="bg-muted/50 rounded-xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-bl-3xl"></div>
                  <h3 className="text-xl font-bold mb-3">The Inspiration</h3>
                  <p className="text-muted-foreground relative z-10">
                    It all started when An Hung, frustrated with abandoning habits after a few weeks, noticed how easily
                    he could spend hours leveling up characters in games. The question emerged: "What if real-life
                    habits could be as engaging as games?"
                  </p>
                </div>
              </div>
              <div className="md:col-span-3 flex justify-center">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-primary/10 rounded-xl blur opacity-30"></div>
                  <div className="relative bg-card rounded-lg overflow-hidden shadow-md border p-6 max-w-md">
                    <div className="flex items-center gap-3 mb-4">
                      <CalendarCheck2 className="h-6 w-6 text-primary" />
                      <span className="font-bold">Initial Concept Note</span>
                    </div>
                    <div className="space-y-3 text-sm">
                      <p className="italic">
                        "What if we could apply RPG mechanics to habit tracking? Users could have attributes like
                        Strength, Intelligence, and Wealth that increase as they complete related habits..."
                      </p>
                      <p className="italic">
                        "...and they could earn in-app currency to 'buy' real-life rewards they set for themselves."
                      </p>
                      <p className="italic">"The key is making the process itself rewarding, not just the outcome."</p>
                      <div className="text-right text-xs text-muted-foreground">- An Hung, Founder's Journal, 2022</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-5 gap-6 items-center">
              <div className="md:col-span-3 md:order-1 order-2 flex justify-center">
                <div className="bg-muted/50 rounded-xl p-6 max-w-md">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-card rounded-lg border">
                      <div className="bg-primary/10 rounded-full w-8 h-8 flex items-center justify-center text-primary font-bold">
                        1
                      </div>
                      <div>
                        <h4 className="font-medium">Prototype Development</h4>
                        <p className="text-xs text-muted-foreground">Early 2023</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-card rounded-lg border">
                      <div className="bg-primary/10 rounded-full w-8 h-8 flex items-center justify-center text-primary font-bold">
                        2
                      </div>
                      <div>
                        <h4 className="font-medium">Beta Testing</h4>
                        <p className="text-xs text-muted-foreground">Mid 2023</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-card rounded-lg border">
                      <div className="bg-primary/10 rounded-full w-8 h-8 flex items-center justify-center text-primary font-bold">
                        3
                      </div>
                      <div>
                        <h4 className="font-medium">Official Launch</h4>
                        <p className="text-xs text-muted-foreground">Late 2023</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-card rounded-lg border">
                      <div className="bg-primary/10 rounded-full w-8 h-8 flex items-center justify-center text-primary font-bold">
                        4
                      </div>
                      <div>
                        <h4 className="font-medium">Continuous Improvement</h4>
                        <p className="text-xs text-muted-foreground">Ongoing</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:col-span-2 md:order-2 order-1">
                <div className="bg-muted/50 rounded-xl p-6 relative overflow-hidden">
                  <div className="absolute bottom-0 left-0 w-20 h-20 bg-primary/10 rounded-tr-3xl"></div>
                  <h3 className="text-xl font-bold mb-3">From Idea to Reality</h3>
                  <p className="text-muted-foreground relative z-10">
                    After months of research into habit psychology and game design, the first prototype of HabitTrack
                    was born. Through iterative development and feedback from early users, the platform evolved into
                    what it is today.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do at HabitTrack
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-none shadow-md">
              <CardContent className="pt-6">
                <div className="mb-4 rounded-full w-12 h-12 flex items-center justify-center bg-primary/10">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">User-Centered Design</h3>
                <p className="text-muted-foreground">
                  We believe that the best products are built with users at the center. Every feature we develop is
                  designed to enhance the user experience and make habit-building more effective and enjoyable.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardContent className="pt-6">
                <div className="mb-4 rounded-full w-12 h-12 flex items-center justify-center bg-primary/10">
                  <Lightbulb className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Continuous Innovation</h3>
                <p className="text-muted-foreground">
                  We're committed to constantly improving our platform based on the latest research in habit psychology,
                  game design, and user experience. We never stop learning and evolving.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardContent className="pt-6">
                <div className="mb-4 rounded-full w-12 h-12 flex items-center justify-center bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Community Focus</h3>
                <p className="text-muted-foreground">
                  We believe in the power of community to support habit formation. We're building not just a tool, but a
                  community of like-minded individuals committed to personal growth.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Journey</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Be part of the HabitTrack community and transform your daily habits into a rewarding journey of personal
              growth.
            </p>
            <Button size="lg" asChild>
              <Link href="/" className="gap-2">
                Get Started Now
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  )
}
