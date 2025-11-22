import { Metadata } from "next"
import Link from "next/link"

import { Container } from "@/components/container"
import { Section } from "@/components/section"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Simulations",
  description:
    "Practice interpersonal skills through 3-minute interactive simulations for common relationship challenges.",
}

interface Simulation {
  id: string
  title: string
  description: string
  duration: string
  category: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
}

const simulationBuckets = [
  {
    category: "Relationships & Breakups",
    description: "Navigate ending relationships with compassion and clarity",
    scenarios: [
      {
        id: "breaking-up",
        title: "Breaking Up with Someone",
        description:
          "End a relationship compassionately while being clear and firm. Practice saying what you need to say while minimizing harm.",
        duration: "3 min",
        difficulty: "Intermediate" as const,
      },
      {
        id: "breaking-up-firm",
        title: "Breaking Up When They Won't Accept It",
        description:
          "Set firm boundaries when someone won't accept your decision. Stay resolute while maintaining respect.",
        duration: "3 min",
        difficulty: "Advanced" as const,
      },
      {
        id: "rejection",
        title: "Rejecting Someone Gracefully",
        description:
          "Say no to romantic interest or advances with kindness and respect. Practice maintaining their dignity.",
        duration: "3 min",
        difficulty: "Beginner" as const,
      },
      {
        id: "what-are-we",
        title: "The 'What Are We?' Conversation",
        description:
          "Define the relationship with clarity and vulnerability. Navigate this awkward but necessary conversation.",
        duration: "3 min",
        difficulty: "Intermediate" as const,
      },
    ] as Simulation[],
  },
  {
    category: "Setting Boundaries",
    description: "Learn to say no and set limits while preserving relationships",
    scenarios: [
      {
        id: "boundaries-friend",
        title: "Setting Boundaries with a Friend",
        description:
          "Tell a friend who's being too much that you need space. Balance your needs with preserving the friendship.",
        duration: "3 min",
        difficulty: "Intermediate" as const,
      },
      {
        id: "boundaries-family",
        title: "Setting Boundaries with Family",
        description:
          "Tell overbearing family members to back off. Navigate loyalty and personal needs while staying connected.",
        duration: "3 min",
        difficulty: "Advanced" as const,
      },
      {
        id: "saying-no-friend",
        title: "Saying No to a Friend's Request",
        description:
          "Decline a friend's request without damaging the friendship. Practice being kind but firm.",
        duration: "3 min",
        difficulty: "Beginner" as const,
      },
      {
        id: "boundaries-roommate",
        title: "Setting Boundaries with a Roommate",
        description:
          "Address shared living issues directly and respectfully. Create agreements that work for both of you.",
        duration: "3 min",
        difficulty: "Intermediate" as const,
      },
    ] as Simulation[],
  },
  {
    category: "Conflict & Repair",
    description: "Navigate hurt feelings and repair damaged relationships",
    scenarios: [
      {
        id: "apologizing",
        title: "Apologizing After a Fight",
        description:
          "Take full responsibility and express genuine remorse. Practice accountability and repair after conflict.",
        duration: "3 min",
        difficulty: "Intermediate" as const,
      },
      {
        id: "hurt-feelings-friend",
        title: "Addressing Hurt Feelings with a Friend",
        description:
          "Express pain without blame when a friend hurt you. Use I-statements and create space for repair.",
        duration: "3 min",
        difficulty: "Intermediate" as const,
      },
      {
        id: "ending-friendship",
        title: "Ending a Friendship Gracefully",
        description:
          "Close a friendship that's run its course with respect and clarity. Navigate closure with dignity.",
        duration: "3 min",
        difficulty: "Advanced" as const,
      },
    ] as Simulation[],
  },
]

// Potential scenarios for development - organized by category
// Focused on common personal pain points and interpersonal challenges
const potentialScenarios = [
  // Relationships & Breakups
  {
    category: "Relationships & Breakups",
    scenarios: [
      "Breaking up with someone - compassionate and clear ending",
      "Being broken up with - maintaining dignity and self-respect",
      "Defining the relationship - having the 'what are we?' conversation",
      "Discussing relationship problems - addressing issues before they escalate",
      "Ending a long-term relationship - navigating shared history and logistics",
      "Breaking up with someone who won't accept it - setting firm boundaries",
      "Saying no to getting back together - staying resolute",
      "Friendship breakup - ending a friendship that's no longer healthy",
      "Ghosting vs. having the conversation - choosing integrity",
      "Breaking up with someone you still care about - managing mixed emotions",
    ],
  },
  // Setting Boundaries & Saying No
  {
    category: "Setting Boundaries & Saying No",
    scenarios: [
      "Saying no to a friend's request - maintaining friendship while setting limits",
      "Setting boundaries with family members - respecting yourself while preserving relationships",
      "Telling someone you need space - requesting distance without causing offense",
      "Saying no to a date/advances - politely declining romantic interest",
      "Setting boundaries with a roommate - addressing shared living issues",
      "Declining an invitation without lying - being honest while being kind",
      "Telling someone they're crossing your boundaries - confronting boundary violations",
      "Saying no to family obligations - balancing loyalty and personal needs",
      "Setting boundaries with someone who overshares - protecting your emotional energy",
      "Saying no to a favor that's too much - protecting your capacity",
    ],
  },
  // Conflict & Difficult Conversations
  {
    category: "Conflict & Difficult Conversations",
    scenarios: [
      "Addressing hurt feelings with a friend - expressing pain without blame",
      "Confronting someone who hurt you - speaking your truth with compassion",
      "Apologizing after a fight - genuine repair and accountability",
      "Dealing with a friend who's always negative - addressing their impact on you",
      "Having a difficult conversation with a roommate - addressing shared space issues",
      "Confronting a family member about past harm - healing old wounds",
      "Addressing passive-aggressive behavior - calling out indirect communication",
      "Navigating conflict in a group of friends - mediating without taking sides",
      "Dealing with someone who never apologizes - holding them accountable",
      "Having a conversation about money with friends - addressing financial conflicts",
    ],
  },
  // Dating & Romantic Relationships
  {
    category: "Dating & Romantic Relationships",
    scenarios: [
      "The first date conversation - building connection authentically",
      "Rejection conversation - gracefully saying no or handling being rejected",
      "Having the exclusivity conversation - defining commitment",
      "Addressing red flags early in dating - speaking up about concerns",
      "The 'we need to talk' conversation - bringing up relationship issues",
      "Breaking the news you're seeing someone else - ethical non-monogamy conversations",
      "Telling someone you're not feeling the connection - early relationship endings",
      "Having difficult conversations in a long-distance relationship - maintaining intimacy",
      "Discussing future plans with different goals - navigating incompatibility",
      "Having a conversation about moving in together - practical and emotional considerations",
    ],
  },
  // Family Relationships
  {
    category: "Family Relationships",
    scenarios: [
      "Setting boundaries with overbearing parents - maintaining independence",
      "Addressing childhood trauma with family - healing conversations",
      "Having difficult conversations about lifestyle choices - when family disapproves",
      "Dealing with family conflicts during holidays - navigating tense gatherings",
      "Telling family about a big life decision - coming out, career change, etc.",
      "Addressing favoritism or unequal treatment - calling out family dynamics",
      "Having a conversation with elderly parents about their health - difficult care conversations",
      "Dealing with toxic family members - protecting yourself while staying connected",
      "Mediating between family members in conflict - neutral facilitation",
      "Setting boundaries with in-laws - navigating extended family dynamics",
    ],
  },
  // Friendship & Social
  {
    category: "Friendship & Social",
    scenarios: [
      "Reconnecting with an old friend - rebuilding after distance",
      "Addressing friend group drama - navigating social conflicts",
      "Telling a friend their behavior is hurting you - honest feedback",
      "Ending a friendship that's run its course - graceful closure",
      "Having a conversation about feeling left out - expressing needs in friendships",
      "Addressing a friend's problematic behavior - calling out without losing the friendship",
      "Setting boundaries with a needy friend - protecting your energy",
      "Having difficult conversations in group chats - addressing digital drama",
      "Telling a friend you need to take a break - friendship pause conversations",
      "Reconciling after a friendship fight - repair and rebuilding trust",
    ],
  },
  // Personal Growth & Vulnerability
  {
    category: "Personal Growth & Vulnerability",
    scenarios: [
      "Asking for help when struggling - overcoming pride and reaching out",
      "Admitting you were wrong - practicing accountability",
      "Sharing something vulnerable - opening up about struggles",
      "Having a conversation about your mental health - explaining to loved ones",
      "Telling someone you're not okay - being honest about your state",
      "Asking for what you need in a relationship - clear communication of needs",
      "Expressing gratitude meaningfully - beyond surface-level thanks",
      "Having conversations about personal growth - supporting each other's journeys",
      "Telling someone they've impacted you positively - meaningful appreciation",
      "Having a conversation about therapy or self-work - reducing stigma",
    ],
  },
  // Workplace Communication (kept some key ones)
  {
    category: "Workplace Communication",
    scenarios: [
      "Setting boundaries with a demanding boss - protecting work-life balance",
      "Having a difficult conversation with a coworker - addressing workplace conflict",
      "Asking for what you deserve - salary negotiations and raises",
      "Saying no to additional work - protecting your capacity",
      "Giving constructive feedback to a peer - workplace candor",
      "Having a conversation about career growth - advocating for yourself",
      "Dealing with a difficult team member - navigating workplace dynamics",
      "Having exit conversations - leaving gracefully",
    ],
  },
  // Feedback & Difficult Conversations
  {
    category: "Feedback & Difficult Conversations",
    scenarios: [
      "Giving negative feedback to a peer - balancing honesty and care",
      "Receiving difficult feedback - staying open and learning",
      "Addressing a microaggression - calling in with compassion",
      "Having a crucial conversation - discussing high-stakes topics",
      "Giving feedback to a superior - upward communication",
      "Mediating between two conflicted parties - neutral facilitation",
      "Addressing a broken promise - rebuilding trust",
      "Confronting someone about harmful behavior - setting limits",
      "Receiving unexpected criticism - emotional regulation",
      "Giving feedback across cultures - cultural sensitivity",
    ],
  },
  // Leadership & Management
  {
    category: "Leadership & Management",
    scenarios: [
      "Team conflict resolution - de-escalating tension",
      "Coaching an underperforming employee - development focus",
      "Motivating a disengaged team member - rekindling enthusiasm",
      "Leading through organizational change - transparency and support",
      "Making unpopular decisions - explaining with empathy",
      "Building psychological safety in a team - creating trust",
      "Managing up - influencing your manager",
      "Cross-functional collaboration - breaking down silos",
      "Crisis communication - leading through uncertainty",
      "Exit interview - learning from departures",
    ],
  },
  // Sales & Customer Service
  {
    category: "Sales & Customer Service",
    scenarios: [
      "Discovery call - understanding customer needs",
      "Handling customer complaints - turning frustration into satisfaction",
      "Objection handling - addressing concerns with empathy",
      "Building rapport quickly - authentic connection",
      "Saying no to a customer request - maintaining relationship",
      "Upselling without being pushy - value-focused approach",
      "Difficult client conversation - managing expectations",
      "Breaking bad news to a customer - transparency and support",
      "Negotiating terms - win-win outcomes",
      "Onboarding a new customer - setting up for success",
    ],
  },
  // Teaching & Mentoring
  {
    category: "Teaching & Mentoring",
    scenarios: [
      "Student struggling with material - adaptive support",
      "Parent-teacher conference - collaborative partnership",
      "Mentoring session - growth-focused guidance",
      "Giving student feedback - encouraging development",
      "Managing classroom dynamics - inclusive facilitation",
      "Addressing disruptive behavior - boundary setting",
      "Supporting a struggling mentee - emotional support",
      "Difficult conversation with a parent - maintaining respect",
      "Teaching controversial topics - facilitating dialogue",
      "Peer review feedback - constructive critique",
    ],
  },
  // Healthcare & Helping Professions
  {
    category: "Healthcare & Helping Professions",
    scenarios: [
      "Breaking bad news to a patient - compassion and clarity",
      "Empathetic listening to someone in distress - therapeutic presence",
      "Difficult conversation with family about treatment - navigating emotions",
      "Setting boundaries with a demanding patient - professional limits",
      "Explaining complex medical information - accessible communication",
      "Supporting someone through diagnosis - emotional support",
      "Dealing with non-compliance - motivational interviewing",
      "End-of-life conversations - presence and care",
      "Mental health check-in - assessment with empathy",
      "Crisis intervention - de-escalation skills",
    ],
  },
  // Negotiation & Conflict
  {
    category: "Negotiation & Conflict",
    scenarios: [
      "Salary negotiation - advocating for value",
      "Contract negotiation - finding mutual benefit",
      "Divorce mediation - navigating emotional terrain",
      "Neighborhood dispute resolution - finding common ground",
      "Business partnership conflict - preserving relationship",
      "Resource allocation discussion - fair distribution",
      "Timeline negotiation - managing expectations",
      "Scope change conversation - setting boundaries",
      "Interpersonal conflict resolution - repairing relationship",
      "Group decision-making - facilitating consensus",
    ],
  },
  // Dating & Romantic Relationships
  {
    category: "Dating & Romantic Relationships",
    scenarios: [
      "First date conversation - building connection",
      "Defining the relationship - clarity and vulnerability",
      "Breaking up with compassion - respectful ending",
      "Addressing relationship concerns - repair and growth",
      "Dealing with rejection - maintaining dignity",
      "Long-distance relationship check-in - maintaining intimacy",
      "Navigating different love languages - understanding needs",
      "Conflict in a relationship - healthy disagreement",
      "Reconnecting after distance - rebuilding intimacy",
      "Discussing future plans - alignment and compromise",
    ],
  },
  // Networking & Social
  {
    category: "Networking & Social",
    scenarios: [
      "Networking event conversation - authentic connection",
      "Cold outreach email/chat - warm introduction",
      "Following up after meeting - maintaining momentum",
      "Asking for an introduction - respectful request",
      "Event facilitation - engaging diverse groups",
      "Small talk with depth - meaningful connection",
      "Exit conversation at event - graceful closure",
      "Online community engagement - building rapport",
      "Coffee chat with a stranger - creating connection",
      "Thank you conversation - meaningful appreciation",
    ],
  },
]

const difficultyColors = {
  Beginner: "bg-green-100 text-green-800",
  Intermediate: "bg-yellow-100 text-yellow-800",
  Advanced: "bg-red-100 text-red-800",
}

export default function SimulationsPage() {
  return (
    <>
      <Section className="bg-gradient-to-b from-brand-accent/30 to-background pt-8">
        <Container>
          <div className="mx-auto max-w-3xl text-center space-y-6">
            <span className="text-sm uppercase tracking-[0.35em] text-muted-foreground">Practice Lab</span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-brand-ink">Interactive Simulations</h1>
            <p className="text-lg text-muted-foreground">
              Practice real conversations through 3-minute guided simulations. Build confidence for difficult moments in
              relationships, boundaries, and conflict.
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="mx-auto max-w-5xl space-y-12">
            {simulationBuckets.map((bucket) => (
              <div key={bucket.category} className="space-y-6">
                <div>
                  <h2 className="font-serif text-3xl font-bold text-brand-ink mb-2">{bucket.category}</h2>
                  <p className="text-muted-foreground">{bucket.description}</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  {bucket.scenarios.map((scenario) => (
                    <Card key={scenario.id} className="flex h-full flex-col">
                      <CardHeader>
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <CardTitle className="text-xl">{scenario.title}</CardTitle>
                          <Badge
                            variant="secondary"
                            className={`text-xs ${difficultyColors[scenario.difficulty]}`}
                          >
                            {scenario.difficulty}
                          </Badge>
                        </div>
                        <CardDescription>{scenario.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex flex-1 flex-col gap-4 mt-auto">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">{scenario.duration} simulation</span>
                        </div>
                        <Button asChild className="w-full">
                          <Link href={`/simulations/${scenario.id}`}>Start Simulation →</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}

            <div className="mx-auto mt-16 max-w-3xl space-y-4 text-center rounded-2xl border bg-muted/30 p-8">
              <h2 className="font-serif text-2xl font-bold text-brand-ink">Want to test scenarios?</h2>
              <p className="text-muted-foreground">
                Help us refine prompts and test new scenarios in our development lab.
              </p>
              <Button asChild variant="outline">
                <Link href="/simulations/test">Go to Testing Lab →</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
