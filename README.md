<p align="center">
  <img
    width="64px"
    src="./logo.png"
    style="border: 1px solid #e5e7eb; border-radius: 0.5rem;"
  />
  
  <h1 align="center">Email Template</h1>
</p>

A comprehensive email template system built with **React Email** and **Tailwind CSS**, providing a robust foundation for creating professional, maintainable, and scalable email communications.

## Features

- **Centralized Configuration** - Unified Tailwind configuration ensuring consistent styling across all email templates
- **Reusable Component Library** - Modular, pre-built components for rapid email development
- **Type Safety** - Full TypeScript support with comprehensive type definitions and IntelliSense
- **Code Quality Tools** - Integrated Biome for automated linting and formatting
- **Development Experience** - Hot module reloading with live preview capabilities
- **Email Client Compatibility** - Battle-tested patterns optimized for major email clients

## Getting Started

### Installation

Install the required dependencies using pnpm:

```bash
pnpm install
```

### Development

Start the development server to preview templates in real-time:

```bash
pnpm dev
```

The development server will be available at [http://localhost:3000](http://localhost:3000).

### Build and Export

Generate production-ready HTML files:

```bash
# Build all email templates
pnpm build

# Export templates to static HTML
pnpm export
```

## Project Structure

```text
emails/
├── config/
│   ├── tailwind.config.ts          # Centralized Tailwind configuration
│   └── brand.config.ts             # Brand settings and constants
├── components/                      # Reusable email components
│   ├── EmailLayout.tsx             # Base layout wrapper
│   ├── EmailContainer.tsx          # Content container
│   ├── EmailButton.tsx             # Styled button component
│   ├── EmailHeader.tsx             # Standard header
│   ├── EmailFooter.tsx             # Standard footer
│   ├── EmailSupport.tsx            # Support information section                  # Icon components
│   └── index.ts                    # Component exports
├── static/                          # Static assets
├── invite-user.tsx                  # User invitation template
└── README.md                        # Component documentation
```

## Creating Email Templates

To create a new email template, follow this structure:

```tsx
import 'web-streams-polyfill/polyfill';

import { Heading, Text } from '@react-email/components';
import {
  EmailLayout,
  EmailContainer,
  EmailHeader,
  EmailFooter,
  EmailButton,
} from './components';

interface MyEmailProps {
  name: string;
  actionUrl: string;
}

export const MyEmail = ({ name, actionUrl }: MyEmailProps) => {
  return (
    <EmailLayout preview="Welcome to the platform">
      <EmailContainer>
        <EmailHeader />
        <Heading as="h1">Welcome, {name}</Heading>
        <Text>
          Thank you for joining our platform. We're excited to have you on board.
        </Text>
        <EmailButton href={actionUrl}>
          Get Started
        </EmailButton>
        <EmailFooter />
      </EmailContainer>
    </EmailLayout>
  );
};

MyEmail.PreviewProps = {
  name: 'John Doe',
  actionUrl: 'https://example.com/onboarding',
} as MyEmailProps;

export default MyEmail;
```

## Available Commands

### Development Commands

```bash
pnpm dev              # Start development server with live reload
pnpm build            # Build all email templates
pnpm export           # Export templates to static HTML files
```

### Code Quality Commands

```bash
pnpm lint             # Run linting checks
pnpm lint:fix         # Automatically fix linting issues
pnpm format           # Check code formatting
pnpm format:fix       # Automatically format code
pnpm check            # Run all quality checks
pnpm check:fix        # Automatically fix all quality issues
```

## Architecture Benefits

- **Maintainability** - Centralized configuration allows for system-wide updates with minimal effort
- **Type Safety** - Comprehensive TypeScript implementation reduces runtime errors and improves developer experience
- **Development Velocity** - Component-based architecture and hot module reloading accelerate development cycles
- **Code Consistency** - Automated formatting and linting enforce consistent code standards
- **Scalability** - Modular design facilitates the addition of new templates and components

## Technology Stack

- **[React Email](https://react.email)** - React-based email template framework
- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first CSS framework for consistent styling
- **[TypeScript](https://www.typescriptlang.org)** - Type-safe superset of JavaScript
- **[Biome](https://biomejs.dev)** - Fast, unified toolchain for linting and formatting
- **[pnpm](https://pnpm.io)** - Efficient package management system
