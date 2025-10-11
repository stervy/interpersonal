import { Container } from "@/components/container"
import { Section } from "@/components/section"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ExternalLink, Calendar, MapPin, Users, DollarSign, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import tgroupData from "@/data/t-groups.json"

export const metadata = {
  title: "T-Groups & Experiential Learning Programs",
  description: "Discover intensive T-group programs for developing interpersonal skills, emotional intelligence, and leadership. Compare Stanford T-Group, Leaders in Tech, Juncture, and more.",
}

export default function TGroupsPage() {
  const tgroups = tgroupData.tgroups

  return (
    <>
      <Section className="bg-gradient-to-b from-brand-accent/30 to-background pt-8">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-brand-ink mb-4">
              T-Groups & Experiential Learning
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              T-groups (Training groups) are intensive experiential learning programs that accelerate 
              interpersonal skills development through group dynamics, feedback, and self-exploration.
            </p>
          </div>

          {/* What is a T-Group */}
          <div className="max-w-3xl mx-auto bg-card rounded-2xl border p-6 mb-8">
            <h2 className="font-serif text-2xl font-semibold mb-3">What is a T-Group?</h2>
            <p className="text-muted-foreground mb-4">
              T-groups are unstructured small group experiences where participants learn about 
              themselves, interpersonal dynamics, and group processes through direct experience and 
              feedback. Originally developed at MIT in the 1940s, T-groups remain one of the most 
              powerful methods for developing emotional intelligence, self-awareness, and leadership skills.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <div>
                <h3 className="font-semibold mb-2">You'll Learn:</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-brand mt-0.5 flex-shrink-0" />
                    <span>How you impact others in real-time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-brand mt-0.5 flex-shrink-0" />
                    <span>Group dynamics and leadership patterns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-brand mt-0.5 flex-shrink-0" />
                    <span>Giving and receiving authentic feedback</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-brand mt-0.5 flex-shrink-0" />
                    <span>Your blind spots and growth edges</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Format:</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-brand mt-0.5 flex-shrink-0" />
                    <span>Small groups (8-15 people)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-brand mt-0.5 flex-shrink-0" />
                    <span>Minimal structure or agenda</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-brand mt-0.5 flex-shrink-0" />
                    <span>Experienced facilitators</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-brand mt-0.5 flex-shrink-0" />
                    <span>Intensive time commitment</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <div className="mb-8">
            <h2 className="font-serif text-3xl font-bold text-brand-ink mb-2">
              Available Programs
            </h2>
            <p className="text-muted-foreground">
              Compare T-group programs and find the right fit for your goals and schedule
            </p>
          </div>

          <div className="grid gap-8">
            {tgroups.map((tgroup) => (
              <Card key={tgroup.id} className="overflow-hidden">
                <CardHeader className="bg-muted/30">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-2xl mb-2">{tgroup.name}</CardTitle>
                      <CardDescription className="text-base">
                        {tgroup.organization}
                      </CardDescription>
                    </div>
                    {tgroup.website && (
                      <Button asChild variant="default">
                        <a
                          href={tgroup.website}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Learn More <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground mb-6">{tgroup.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {tgroup.tags.map((tag) => (
                      <Badge key={tag} variant="default">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Separator className="mb-6" />

                  {/* Details Grid */}
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Calendar className="h-5 w-5 text-brand flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-sm">Duration & Frequency</p>
                          <p className="text-sm text-muted-foreground">{tgroup.duration}</p>
                          <p className="text-sm text-muted-foreground">{tgroup.frequency}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-brand flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-sm">Location & Format</p>
                          <p className="text-sm text-muted-foreground">{tgroup.location}</p>
                          <p className="text-sm text-muted-foreground">{tgroup.format}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <DollarSign className="h-5 w-5 text-brand flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-sm">Investment</p>
                          <p className="text-sm text-muted-foreground">{tgroup.cost}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {tgroup.applicationRequired ? "Application required" : "Open enrollment"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Users className="h-5 w-5 text-brand flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-sm">Skills Focus</p>
                          <ul className="text-sm text-muted-foreground space-y-1 mt-1">
                            {tgroup.skillsFocus.map((skill, idx) => (
                              <li key={idx}>• {skill}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-12 bg-gradient-to-r from-brand-accent/30 to-brand-accent/10 rounded-2xl p-8 text-center">
            <h3 className="font-serif text-2xl font-bold text-brand-ink mb-3">
              Ready to Transform Your Interpersonal Skills?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              T-groups are intensive and transformative. Consider your goals, schedule, and budget 
              when choosing a program. Most programs offer information sessions or consultations 
              before you commit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="default" size="lg">
                <a href="/contact">Get Guidance</a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="/blog">Read More About T-Groups</a>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}

