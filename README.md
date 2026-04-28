# SepetYorumla 🧺💬

SepetYorumla is a high-performance social shopping platform built with a cutting-edge N-tier architecture. It allows users to share their shopping baskets, discover trending curators, and engage with a community through reviews and social following.

The solution is powered by a **.NET 10 Web API** backend and a **React 19 + TypeScript + Vite 7** frontend.

## 🌐 Overview

SepetYorumla transforms the shopping experience into a social journey:

- **Share & Discover:** Users post curated shopping baskets for community inspiration.
- **Social Interaction:** A robust follow system to build networks of trusted curators.
- **Community Feedback:** 5-star rating and comment systems for real-world validation.
- **Personalized Insights:** Track interaction counts, popular curators, and saved items via detailed profiles.

The solution is organized into separate projects for core abstractions, compile-time mapping, data access, business services, and a modern React client.

## ✨ Features

- 🧺 **Basket sharing & management**
  - Create, share, and filter baskets by category.
  - "Saved Baskets" feature for future inspiration.
  - Social counts for likes, comments, and saves.

- 👥 **Social ecosystem**
  - Real-time follow/unfollow logic.
  - "Followers" and "Following" modals to view user networks.
  - Popular users widget on the home feed.

- 💬 **Reviews & Interactions**
  - 5-star rating system for shared baskets.
  - Detailed comment threads with profile-linked avatars.
  - View a user's last three comments directly on their profile.

- 👤 **Authentication & Security**
  - Custom JWT authentication.
  - Access tokens stored in secure HttpOnly cookies to prevent XSS attacks.
  - Refresh token rotation for persistent and secure sessions.
  - JWT token generation and validation.
  - Compile-time DTO mapping via **Riok.Mapperly**.
  - **FluentValidation** for strict request DTO validation.

- 🧬 **Frontend client**
  - React 19 + TypeScript SPA with Vite 7.
  - Responsive UI using **Material UI (MUI) v7**.
  - Deep Dark Mode branding with a "Plus Jakarta Sans" typography.
  - Redux Toolkit for centralized state management (Auth, Baskets).

## 🛠️ Tech Stack

- **Backend**
  - .NET 10 (ASP.NET Core Web API)
  - Entity Framework Core 10
  - SQL Server
  - Custom JWT Authentication
  - Riok.Mapperly (Source-generated mapping)
  - FluentValidation

- **Frontend**
  - React 19 + TypeScript
  - Vite 7
  - Redux Toolkit
  - React Router 7
  - Material UI (MUI) v7 + Emotion
  - Axios
  - React Toastify

## 📂 Project Structure

```text
SepetYorumla/
├── SepetYorumla.sln                # .NET 10 Solution
├── SepetYorumla.Core/              # Infrastructure & Base layer
│   ├── Entities/                   # Base classes (Entity.cs)
│   ├── Exceptions/                 # Business & Auth exceptions
│   ├── Repositories/               # Generic repo abstractions & EfBaseRepository
│   ├── Responses/                  # Standardized ReturnModel wrappers
│   └── Security/                   # Hashing helpers & Token options
├── SepetYorumla.Models/            # Domain models & DTOs
│   ├── Entities/                   # Core DB models (Basket, User, Follow, etc.)
│   ├── Dtos/                       # Request/Response models grouped by feature
│   └── Mapping/                    # Riok.Mapperly compile-time profiles
├── SepetYorumla.DataAccess/        # Data access layer
│   ├── Abstracts/                  # Feature repository interfaces (IBasketRepository)
│   ├── Concretes/                  # EF implementations & UnitOfWork
│   ├── Configurations/             # Fluent API entity configurations
│   ├── Contexts/                   # BaseDbContext (Identity)
│   └── Migrations/                 # EF Core 10 migration history
├── SepetYorumla.Service/           # Business logic layer
│   ├── Abstracts/                  # Service interfaces (IFollowService)
│   ├── Concretes/                  # Business logic implementations
│   ├── BusinessRules/              # Cross-cutting validation logic (FollowRules)
│   ├── Validations/                # FluentValidation classes per request
│   └── Helpers/                    # Specialized mapping & file utilities
├── SepetYorumla.WebApi/            # Presentation layer
│   ├── Controllers/                # Thin controllers (Baskets, Follows, Users)
│   ├── Middlewares/                # GlobalExceptionHandler
│   └── Program.cs                  # Service registration & HTTP pipeline
└── sepetyorumla.client/            # React 19 + Vite 7 Frontend
    ├── public/                     # Static assets
    └── src/
        ├── api/                    # Service-based Axios clients (basketService.ts)
        ├── assets/                 # Page illustrations & UI images
        ├── components/             # Reusable UI
        │   ├── layout/             # Sidebar, Navbar, Footer
        │   └── shared/             # BasketCard, UsersListModal
        ├── features/               # Redux slices (Auth, Baskets)
        ├── models/                 # TypeScript interfaces (User.ts, Basket.ts)
        ├── pages/                  # Intro, Profile, Activities, Settings
        ├── routes/                 # AppRoutes.tsx (React Router 7)
        ├── store/                  # Redux store configuration
        └── styles/                 # Global CSS & variables.css
