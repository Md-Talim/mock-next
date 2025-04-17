# AI-Powered Mock Interview Platform

A modern web application that provides AI-driven mock interviews to help users prepare for technical interviews. Built with Next.js 15 and powered by advanced AI technologies.

## 🚀 Features

- **AI-Powered Interviews**: Real-time interview simulations using Google's AI SDK
- **Real-time Voice Interaction**: Seamless voice-based communication using Vapi AI
- **Modern UI/UX**: Beautiful and responsive interface built with Tailwind CSS
- **Authentication**: Secure user authentication using Firebase
- **Dark/Light Mode**: Theme switching capability
- **Type Safety**: Full TypeScript implementation
- **Form Validation**: Robust form handling with React Hook Form and Zod
- **Real-time Updates**: Instant feedback and progress tracking

## 🛠️ Tech Stack

- **Frontend Framework**: Next.js 15 with React 19
- **Styling**: Tailwind CSS 4 with custom animations
- **AI Integration**:
  - Google AI SDK
  - Vapi AI for voice interactions
- **Authentication**: Firebase Authentication
- **Database**: Firebase Firestore
- **Form Handling**: React Hook Form with Zod validation
- **UI Components**: Radix UI primitives
- **State Management**: React Hooks
- **Type Safety**: TypeScript
- **Code Quality**: ESLint, Prettier

## 🏗️ Project Structure

```
src/
├── app/          # Next.js app router pages
├── components/   # Reusable UI components
├── lib/          # Utility functions and helpers
├── types/        # TypeScript type definitions
├── firebase/     # Firebase configuration
└── constants/    # Application constants
```

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:

   - Create a `.env.local` file with required API keys
   - Configure Firebase credentials
   - Add Google AI SDK credentials

4. Run the development server:
   ```bash
   npm run dev
   ```

## 🔑 Environment Variables

Create a `.env.local` file with the following variables:

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `GOOGLE_AI_API_KEY`
- `VAPI_AI_API_KEY`

## 🎯 Key Technical Achievements

- Implemented real-time AI-powered interview simulations
- Built a scalable architecture using Next.js App Router
- Integrated multiple AI services for enhanced interview experience
- Developed a responsive and accessible UI using modern CSS practices
- Implemented secure authentication and data management
- Created type-safe API integrations and form handling

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
