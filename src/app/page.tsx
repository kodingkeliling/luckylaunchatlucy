'use client';

import Header from '@/components/Header';
import EventInfo from '@/components/EventInfo';
import EventSchedule from '@/components/EventSchedule';
import LocationMap from '@/components/LocationMap';
import TenantForm from '@/components/TenantForm';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Header />
      <EventInfo />
      <EventSchedule />
      <LocationMap />
      <TenantForm />
      <Footer />
    </main>
  );
}
