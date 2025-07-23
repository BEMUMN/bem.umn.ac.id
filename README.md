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
