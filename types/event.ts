export interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  type: 'hackathon' | 'workshop' | 'talk';
  link: string;
  description: string;
  source: 'manual' | 'scraped';
}