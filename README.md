# PDF Guru Clone

A take-home project clone of **PDF Guru** developed for **PORTALAB IT**.

![PDF Guru Clone](public/og-image.png)

## About

This project is a functional clone of PDF Guru that demonstrates modern web development capabilities with PDF management features. Built as a technical assessment for PORTALAB IT, it showcases:

- **Edit & Sign PDFs**: Full-featured PDF editor with annotation, compression, splitting, merging, and signature capabilities
- **PDF Converter**: Convert PDFs to various formats (Word, Image, Excel, etc.) and vice versa
- **AI-Powered Summarizer**: Extract key insights and summaries from PDF documents using advanced AI

## Tech Stack

**Frontend:**

- **Framework**: Next.js with App Router
- **Language**: TypeScript
- **UI**: React, Tailwind CSS
- **PDF Processing**: Nutrient (PSPDFKit) Web SDK
- **Internationalization**: next-intl (English & French)

**Backend:**

- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT & bcrypt
- **AI**: OpenAI API
- **File Upload**: Multer
- **PDF Processing**: Convert API

## Getting Started

### Prerequisites

- Node.js 20+
- Yarn

### Installation

**Frontend:**

```bash
yarn # Install dependencies

yarn dev # Run development server
```

Note that PSPDFKit doesn't require an API key.

Open [http://localhost:3000](http://localhost:3000) to view the frontend app.

**Backend:**

Check [this repo](https://github.com/sirine707/pdfguru-clone-take-home-project-express) for the backend's code.

```bash
yarn # Install dependencies

# Create a .env file in the root directory based on .env.example

npx prisma migrate dev # Run database migrations

npx prisma generate # Generate Prisma client

yarn dev # Run development server
```

Note that Both OPENAI_API_KEY and CONVERT_API_KEY environment variables can be generated from their respective developer platforms.

Open [http://localhost:4000](http://localhost:4000) to view the backend app.

## Project Structure

**Frontend:**

```
/
├── app/                   # Next.js app directory
│   ├── [locale]/          # Internationalized routes
│   │   ├── converter/     # PDF converter module
│   │   ├── edit-sign/     # PDF editor module
│   │   └── summarizer/    # AI summarizer module
│   └── layout.tsx         # Root layout
├── components/            # React components
├── contexts/              # React contexts
├── lib/                   # Utilities and helpers
├── messages/              # i18n translations
├── public/                # Static assets
└── types/                 # TypeScript type definitions
```

**Backend:**

```
/
├── src/                   # Source code directory
│   ├── index.ts           # Express server entry point
│   ├── auth.ts            # Authentication routes & logic
│   ├── converter.ts       # PDF converter API routes
│   ├── summarizer.ts      # AI summarizer API routes
│   ├── db.ts              # Prisma database client
│   └── generated/         # Generated Prisma client
├── prisma/                # Database configuration
│   ├── schema.prisma      # Prisma schema definition
│   └── migrations/        # Database migrations
├── uploads/               # Uploaded PDF files storage
```

## Architecture & Design Decisions

### System Integration & Data Flow

**Frontend-Backend Communication:**
The application uses a clean REST API architecture where the Next.js frontend communicates with the Express backend through well-defined endpoints:

- **Authentication Flow**: JWT tokens are stored in localStorage and sent via Authorization headers for protected routes
- **File Upload Strategy**: Uses FormData with multipart uploads for PDF files, handled by Multer middleware on the backend
- **Real-time Chat**: For the AI summarizer, implements a thread-based conversation system using OpenAI's Assistant API

**State Management Architecture:**
- **AuthContext**: Manages user authentication state globally, with automatic token validation and session persistence
- **FileContext**: Handles file selection state across different modules, ensuring consistent file handling between converter, editor, and summarizer
- **Component-level State**: Each module maintains its own UI state (loading, errors, modals) for better separation of concerns

### Component Design Patterns

**Modular Feature Architecture:**
Each major feature (Converter, Editor, Summarizer) is built as a self-contained module with its own:
- Main component (`ConverterModule.tsx`, `EditSignModule.tsx`, `SummarizerModule.tsx`)
- Editor component for advanced interactions (`SummarizerEditorModule.tsx`)
- Shared modal components for consistent UX (`FileUploadModal`, `LoadingModal`, `SuccessModal`)

**Smart Component Composition:**
- **Header Component**: Reused across all modules with context-aware authentication state
- **Modal System**: Centralized modal components prevent code duplication and ensure consistent styling
- **Tool Configuration**: Uses configuration objects to define available tools, making it easy to add new conversion types or editing tools

### Backend Service Architecture

**Modular Structure:**
The backend follows a modular architecture pattern, with each feature separated into its own dedicated module:

- **auth.ts**: Handles user registration, login, and profile management with bcrypt password hashing
- **converter.ts**: Manages file conversion using ConvertAPI with extensive format support (18+ conversion types)
- **summarizer.ts**: Integrates OpenAI Assistant API with file search capabilities for intelligent document analysis

**Database Design:**
- **Minimal User Model**: Focuses only on essential authentication fields (firstName, lastName, email, password)
- **File Handling**: Temporary file storage with automatic cleanup, no permanent file storage to keep the database lightweight

### API Integration Strategies

**OpenAI Integration (Summarizer):**
- **Assistant Persistence**: Creates and reuses OpenAI assistants to reduce API calls and improve performance
- **Thread Management**: Each PDF analysis session gets its own conversation thread
- **Locale-aware Responses**: Dynamically adjusts AI responses based on user's language preference
- **Citation Cleanup**: Removes OpenAI citation markers for cleaner user experience

**ConvertAPI Integration (Converter):**
- **Format Flexibility**: Supports bidirectional conversions (PDF→formats and formats→PDF)
- **Error Resilience**: Comprehensive error handling for network issues and API limitations
- **File Validation**: Client and server-side validation for file types and sizes

**PSPDFKit Integration (Editor):**
- **Client-side Processing**: Reduces server load by handling PDF editing entirely in the browser
- **Performance Optimization**: Loads PSPDFKit only when needed to reduce initial bundle size

### Security & Performance Considerations

**Authentication Security:**
- **Password Security**: bcrypt with 10 salt rounds for password hashing
- **Token Management**: Short-lived JWT tokens (1 hour for sign-in, 365 days for sign-up) with proper expiration handling

**File Security & Performance:**
- **Size Limits**: 10MB file size limit prevents server overload
- **Type Validation**: Both client and server-side MIME type validation
- **Temporary Storage**: Files are processed and immediately cleaned up, not permanently stored

**Internationalization Strategy:**
- **Route-based Localization**: URL structure includes locale (`/en/converter`, `/fr/converter`) for SEO benefits
- **Dynamic Content**: API responses adapt to user's language preference
- **Component Translation**: Centralized translation files with type-safe translation keys

### Why These Specific Choices?

**Technology Selection Reasoning:**
1. **Next.js App Router**: Provides server-side rendering for better SEO while maintaining SPA-like navigation
2. **TypeScript Throughout**: Catches integration errors between frontend and backend at compile time
3. **Prisma ORM**: Type-safe database queries that match the TypeScript interfaces used in the frontend
4. **JWT over Sessions**: Enables horizontal scaling and works well with modern frontend frameworks
5. **Modal-based UI**: Reduces page loads and provides smoother user experience for file operations
6. **Context Providers**: Prevent prop drilling while keeping state management simple and React-native

## Demo

[![Watch Demo](https://img.youtube.com/vi/E8hh81jDVac/0.jpg)](https://youtu.be/E8hh81jDVac)

[Watch Demo Video](https://youtu.be/E8hh81jDVac)

## Follow-Up Work

- I didn't clone the app UIs and usage flows in a pixel-perfect way, but I can do so if required. I just wanted to demonstrate the challenging parts, which I believe are what matter most in this assessment.

- I could have created a separate bridge page for each tool under `/edit-sign` and `/converter` so that SEO could index them individually with their respective metadata, but I chose to keep it simple.

- Using the `tool` query parameter in `/edit-sign/editor`, I wanted to display a usage tip of PSPDFKit that depends on the selected tool.

- For analytics, I planned to integrate GA4 in a simple way, by creating a project on GCP and adding their script.

- I skipped the payment part as requested.

- Login authentication with JWT was properly implemented, including session persistence and retrieval on refresh. However, I didn't go beyond that, as the requirements only specified a basic authentication flow.
