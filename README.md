# Repository of **BEM UMN GEN XV** Website

This is an official repository of **BEM UMN GEN XV** Website. This repository should be private.

## Content of the Website

-   Introduction of **BEM UMN GEN XV**
-   The work programs of **BEM UMN GEN XV**
-   Documentations of **BEM UMN GEN XV**'s activites
-   Members of **BEM UMN GEN XV**
-   Important documents for the organization

## Links

-   Website URL :
-
-

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Naming Convention Guide

## 1. Folder Structure

Keep a clean and organized structure:

```
/src
  /components      # Reusable UI components
  /hooks           # Custom React hooks
  /layouts         # Layout components (e.g., Navbar, Footer)
  /app            # Next.js App Router structure
  /public          # Static assets (images, icons, etc.)
  /styles         # Global styles (CSS, SCSS, Tailwind)
  /utils           # Utility/helper functions
  /services        # API functions & external services
  /store           # State management (Zustand, Redux, etc.)
```

## 2. Naming Conventions

### Files & Directories

-   **Folders**: `kebab-case`

    -   ✅ `/src/utils`
    -   ✅ `/src/hooks`
    -   ✅ `/src/user-profile`

-   **Components & Layouts**: `PascalCase`

    -   ✅ `Button.js`
    -   ✅ `Navbar.js`
    -   ✅ `UserProfileCard.js`

-   **Pages & App Router (`/app` directory)**: `kebab-case` for folders, `page.js` for entry files

    -   ✅ `/app/(auth)/login/page.js`
    -   ✅ `/app/dashboard/page.js`
    -   ✅ `/app/user-profile/page.js`

-   **API Routes (`/app/api`)**: `route.js`

    -   ✅ `/app/api/get-user/route.js`
    -   ✅ `/app/api/update-profile/route.js`

-   **Hooks**: `useCamelCase.js`

    -   ✅ `useAuth.js`
    -   ✅ `useFetchData.js`

-   **Utilities**: `camelCase.js`

    -   ✅ `formatDate.js`
    -   ✅ `fetchWithAuth.js`

-   **State Management (Zustand, Redux, Context API)**: `camelCase.js`
    -   ✅ `authStore.js`
    -   ✅ `themeContext.js`

## 3. Variables & Functions

-   **Constants**: `SCREAMING_SNAKE_CASE`

    -   ✅ `const API_BASE_URL = "https://api.example.com";`
    -   ✅ `const MAX_UPLOAD_SIZE = 5 * 1024 * 1024;`

-   **Functions**: `camelCase`

    -   ✅ `getUserData()`
    -   ✅ `handleFormSubmit()`

-   **React Props & State**: `camelCase`
    -   ✅ `const [isLoggedIn, setIsLoggedIn] = useState(false);`
    -   ✅ `const userName = "John Doe";`

## 4. Styling

-   **CSS/SCSS Module Files**: `PascalCase.module.css`

    -   ✅ `Button.module.css`
    -   ✅ `Navbar.module.scss`

-   **Tailwind Classes**: Follow Tailwind's default class naming convention
    -   ✅ `<div className="flex items-center justify-center p-4">`

## 5. API & Backend Integration

-   **Endpoints**: `kebab-case`

    -   ✅ `/api/users/get-profile`
    -   ✅ `/api/orders/create`

-   **Fetch Calls**: `camelCase`
    -   ✅ `fetchUserData()`
    -   ✅ `updateUserProfile()`

## 6. Miscellaneous

-   **Git Branches**: `feature/branch-name`, `bugfix/branch-name`

    -   ✅ `feature/add-user-auth`
    -   ✅ `bugfix/fix-navbar-bug`

-   **Commits**: Follow a conventional commit style
    ```
    feat: add authentication system
    fix: resolve navbar alignment issue
    refactor: optimize API calls
    ```
