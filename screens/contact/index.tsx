import { AppHeader } from "@/components/app-header"
import { 
  Button, 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle,
  Input,
  Label,
  Textarea
} from "@/components/ui"
import { Mail, MessageSquare, MapPin, Phone, Send } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <AppHeader />
      <main className="container max-w-6xl mx-auto py-12 px-4">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium bg-background mb-6">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
            <span>Get in Touch</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Have questions, feedback, or just want to say hello? We'd love to hear from you!
          </p>
        </section>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                Email Us
              </CardTitle>
              <CardDescription>Send us an email anytime</CardDescription>
            </CardHeader>
            <CardContent>
              <a href="mailto:contact@habittrack.com" className="text-primary hover:underline">
                contact@habittrack.com
              </a>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                Call Us
              </CardTitle>
              <CardDescription>Mon-Fri, 9am-5pm EST</CardDescription>
            </CardHeader>
            <CardContent>
              <a href="tel:+1234567890" className="text-primary hover:underline">
                +1 (234) 567-890
              </a>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Visit Us
              </CardTitle>
              <CardDescription>Our headquarters</CardDescription>
            </CardHeader>
            <CardContent>
              <address className="not-italic">
                123 Habit Street
                <br />
                San Francisco, CA 94103
                <br />
                United States
              </address>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div>
            <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
            <p className="text-muted-foreground mb-6">
              Whether you have a question about features, pricing, or anything else, our team is ready to answer all
              your questions.
            </p>

            <div className="bg-muted/50 rounded-xl p-6">
              <div className="flex items-start gap-4 mb-6">
                <MessageSquare className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-bold mb-1">Frequently Asked Questions</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Before reaching out, you might find your answer in our FAQ section.
                  </p>
                  <Button variant="outline" asChild>
                    <a href="/faq">View FAQ</a>
                  </Button>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-bold mb-1">Support Tickets</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    For technical issues or account-specific questions, please submit a support ticket.
                  </p>
                  <Button variant="outline" asChild>
                    <a href="/support">Submit Ticket</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle>Contact Form</CardTitle>
              <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" placeholder="Doe" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john.doe@example.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="How can we help you?" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Your message here..." className="min-h-[120px]" />
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button className="w-full gap-2">
                <Send className="h-4 w-4" />
                Send Message
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="rounded-xl overflow-hidden h-[400px] bg-muted/50 flex items-center justify-center mb-12">
          <div className="text-center">
            <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Map placeholder - Google Maps would be embedded here</p>
          </div>
        </div>
      </main>
    </div>
  )
}
