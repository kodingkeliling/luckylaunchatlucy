import { eventData } from '@/data/mockData';

export default function EventSchedule() {
  return (
    <section id="event-details" className="py-20 bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="section-title">RANGKAIAN ACARA</h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {eventData.eventSchedule.map((item, index) => (
            <div 
              key={index} 
              className="bg-light p-6 rounded-lg shadow-md flex items-start hover:shadow-lg transition-shadow"
            >
              <div className="mr-4">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-secondary number-font">{item.time}</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{item.activity}</h3>
                <p className="text-gray-700">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mb-12">
          <h2 className="section-subtitle">AKTIVASI</h2>
          <div className="w-16 h-1 bg-primary mx-auto mb-6"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventData.eventActivities.map((activity, index) => (
            <div 
              key={index} 
              className="p-6 border-2 border-primary rounded-lg hover:bg-primary/10 transition-colors"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-white">
                  <span className="text-xl font-bold">{index + 1}</span>
                </div>
              </div>
              <h3 className="text-lg font-bold text-center mb-2">{activity.title}</h3>
              <p className="text-center text-gray-700">{activity.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

