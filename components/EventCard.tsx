import { Event } from '@/types/event';

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="group bg-white rounded-2xl p-8 transition-all hover:shadow-xl">
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-2xl">{event.name}</h3>
          <p className="text-gray-600">{formattedDate} • {event.location}</p>
        </div>
        <p className="text-gray-600">{event.description}</p>
        <div className="flex items-center justify-between pt-4">
          <span className="text-sm px-4 py-1 bg-gray-100 rounded-full">{event.type}</span>
          <a
            href={event.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:opacity-60 transition-opacity"
          >
            Learn More →
          </a>
        </div>
      </div>
    </div>
  );
}