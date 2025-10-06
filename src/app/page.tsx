'use client';

import Header from '@/components/Header';
import EventInfo from '@/components/EventInfo';
import EventSchedule from '@/components/EventSchedule';
import LocationMap from '@/components/LocationMap';
import Footer from '@/components/Footer';
import InfoBooth from '@/components/InfoBooth';
import JoinUsSection from '@/components/JoinUsSection';

export default function Home() {
  return (
    <main>
      <Header />
      <section id="event-info">
        <EventInfo />
      </section>
      <section id="location-map">
        <LocationMap />
      </section>
      <section id="event-schedule">
        <EventSchedule />
      </section>
      <section id="info-booth">
        <InfoBooth />
      </section>
      <section id="join-us">
        <JoinUsSection />
      </section>
      <Footer />
    </main>
  );
}