"use client"

import { useState, useMemo } from "react"
import { Container } from "@/components/container"
import { Section } from "@/components/section"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Search } from "lucide-react"
import practiceData from "@/data/practice.json"

export default function PracticePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTag, setSelectedTag] = useState<string>("all")
  const [selectedLocation, setSelectedLocation] = useState<string>("all")
  const [isLoading] = useState(false)

  // Get unique tags and locations
  const allTags = useMemo(() => {
    const tags = new Set<string>()
    practiceData.practices.forEach((practice) => {
      practice.tags.forEach((tag) => tags.add(tag))
    })
    return Array.from(tags).sort()
  }, [])

  const allLocations = useMemo(() => {
    const locations = new Set<string>()
    practiceData.practices.forEach((practice) => {
      locations.add(practice.location)
    })
    return Array.from(locations).sort()
  }, [])

  // Filter practices
  const filteredPractices = useMemo(() => {
    return practiceData.practices.filter((practice) => {
      const matchesSearch = 
        practice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        practice.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
        practice.description.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesTag = selectedTag === "all" || practice.tags.includes(selectedTag)
      const matchesLocation = selectedLocation === "all" || practice.location === selectedLocation

      return matchesSearch && matchesTag && matchesLocation
    })
  }, [searchQuery, selectedTag, selectedLocation])

  return (
    <>
      <Section className="bg-gradient-to-b from-brand-accent/30 to-background pt-8">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-brand-ink mb-4">
              Practice Directory
            </h1>
            <p className="text-lg text-muted-foreground">
              Find support groups, therapy practices, and interpersonal connection resources near you.
            </p>
          </div>

          {/* Filters */}
          <div className="grid gap-4 md:grid-cols-3 mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search practices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                aria-label="Search practices"
              />
            </div>
            <Select value={selectedTag} onValueChange={setSelectedTag}>
              <SelectTrigger aria-label="Filter by tag">
                <SelectValue placeholder="All Tags" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tags</SelectItem>
                {allTags.map((tag) => (
                  <SelectItem key={tag} value={tag}>
                    {tag}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger aria-label="Filter by location">
                <SelectValue placeholder="All Locations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {allLocations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          {/* Results count */}
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {filteredPractices.length} of {practiceData.practices.length} practices
            </p>
          </div>

          {/* Loading skeleton */}
          {isLoading && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-16 w-full mb-4" />
                    <div className="flex gap-2 mb-4">
                      <Skeleton className="h-5 w-16" />
                      <Skeleton className="h-5 w-16" />
                    </div>
                    <Skeleton className="h-4 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Empty state */}
          {!isLoading && filteredPractices.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground mb-2">No practices found</p>
              <p className="text-sm text-muted-foreground">
                Try adjusting your filters or search query
              </p>
            </div>
          )}

          {/* Practice cards */}
          {!isLoading && filteredPractices.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredPractices.map((practice) => (
                <Card key={practice.id} className="flex flex-col">
                  <CardHeader>
                    <CardTitle>{practice.title}</CardTitle>
                    <CardDescription>{practice.organization}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <p className="text-sm text-muted-foreground mb-4">
                      {practice.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {practice.tags.map((tag) => (
                        <Badge key={tag} variant="default">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-auto space-y-1 text-sm text-muted-foreground">
                      <p><strong>Location:</strong> {practice.location}</p>
                      <p><strong>Schedule:</strong> {practice.cadence}</p>
                      {practice.contact && (
                        <p>
                          <strong>Contact:</strong>{" "}
                          <a 
                            href={`mailto:${practice.contact}`}
                            className="text-brand hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
                          >
                            {practice.contact}
                          </a>
                        </p>
                      )}
                      {practice.website && (
                        <p>
                          <a 
                            href={practice.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-brand hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
                          >
                            Visit Website →
                          </a>
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </Container>
      </Section>
    </>
  )
}

