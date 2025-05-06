# Tech Events Platform

A modern web application for discovering and sharing technology events worldwide. Built with Next.js, Tailwind CSS, and Supabase.

## Features

- 📅 Browse upcoming tech events
- 🔍 Filter events by date, type, and location
- ✨ Add new events with a beautiful form interface
- 🌐 Support for different event types (hackathons, workshops, talks)
- 💫 Responsive design that works on all devices

## Tech Stack

- **Frontend**: Next.js 13 with App Router
- **Styling**: Tailwind CSS
- **Database**: Supabase
- **Testing**: Jest & React Testing Library
- **Type Safety**: TypeScript

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables:
   Create a `.env` file in the root directory with:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the application

## Testing

Run the test suite:
```bash
npm test
```

Watch mode for development:
```bash
npm run test:watch
```

## Project Structure

- `/app` - Next.js 13 app directory with route handlers
- `/components` - Reusable React components
- `/lib` - Utility functions and database clients
- `/types` - TypeScript type definitions
- `/supabase` - Supabase migrations and configuration

## Contributing

1. Create a feature branch
2. Make your changes
3. Write or update tests
4. Submit a pull request

## License

MIT