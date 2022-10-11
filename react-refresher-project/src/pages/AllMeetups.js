import { useState, useEffect } from "react"

import MeetupList from "../components/meetups/MeetupList"

function AllMeetupsPage() {
  //Setting up the States for when new Meetups are added //
  const [isLoading, setIsLoading] = useState(true)
  const [loadedMeetups, setLoadedMeetups] = useState([])

  // Collects Data from our backend/Firebase to post on the page//
  useEffect(() => {
    setIsLoading(true)
    fetch("https://meetup-website-210ef-default-rtdb.firebaseio.com/meetups.json")
      .then(response => {
        return response.json()
      })
      .then(data => {
        const meetups = []

        for (const key in data) {
          const meetup = {
            id: key,
            ...data[key]
          }

          meetups.push(meetup)
        }

        setIsLoading(false)
        setLoadedMeetups(meetups)
      })
  }, [])

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    )
  }

  // What is return after a new meetup is added  to the Firebase//
  return (
    <section>
      <h1>All Meetups</h1>
      <MeetupList meetups={loadedMeetups} />
    </section>
  )
}

export default AllMeetupsPage
