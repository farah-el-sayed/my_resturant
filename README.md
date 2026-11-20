# Meals App

Meals App is an interactive recipe website built with React, Vite, Tailwind CSS, React Router, and i18next. It retrieves meal categories and recipe details from **TheMealDB API** and provides search, responsive meal cards, dynamic recipe routes, English and Arabic languages, light and dark themes, and an offline fallback game.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Requirements](#requirements)
- [Installation and Development](#installation-and-development)
- [Production Build](#production-build)
- [Project Structure](#project-structure)
- [Application Pages](#application-pages)
- [Reusable Components](#reusable-components)
- [Routing](#routing)
- [API Integration](#api-integration)
- [Environment Variables](#environment-variables)
- [Internationalization](#internationalization)
- [Meal and Instruction Translation](#meal-and-instruction-translation)
- [Light and Dark Themes](#light-and-dark-themes)
- [Offline Mode](#offline-mode)
- [Local Storage](#local-storage)
- [Deployment](#deployment)
- [Notes and Limitations](#notes-and-limitations)

## Features

- Browse all available meals.
- Filter meals by category.
- Search meals by title.
- Display six meal cards initially, with a Show More option.
- Open every meal in a dedicated details page.
- View meal images, categories, countries, tags, ingredients, quantities, and instructions.
- Open YouTube and original recipe-source links.
- Switch between English and Arabic.
- Automatically change page direction:
  - Arabic: RTL
  - English: LTR
- Switch between light and dark themes.
- Remember language, theme, and the best Snake score.
- Detect actual internet loss and display an offline game.
- Continue checking connectivity and close the offline screen after reconnecting.

## Technology Stack

| Technology | Purpose |
|---|---|
| React 18 | UI components and application state |
| Vite 6 | Development server and production builds |
| React Router DOM 6 | Page navigation and dynamic routes |
| Tailwind CSS 4 | Responsive utility-first styling |
| i18next | Translation management |
| react-i18next | React integration for i18next |
| JavaScript | Application logic |
| CSS | Theme overrides and additional styling |
| TheMealDB | Meal, category, ingredient, and instruction data |

## Requirements

- A recent version of Node.js.
- npm.
- An internet connection to load TheMealDB data.
- A modern browser supporting ES modules, local storage, and HTML Canvas.

## Installation and Development

Open a terminal in the project directory and run:

```bash
npm install
npm run dev
```

Vite normally starts the application at:

```text
http://localhost:5173
```

The terminal also displays a network address that can be used from other devices on the same network.

## Production Build

Create an optimized production build:

```bash
npm run build
```

The generated files are written to the `dist` directory.

Preview the production build locally:

```bash
npm run preview
```

## Project Structure

```text
resturant/
├── src/
│   ├── components/
│   │   ├── CategoryTabs.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── MealCard.jsx
│   │   ├── OfflineGame.jsx
│   │   └── OfflineGate.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   └── MealDetailsPage.jsx
│   ├── App.jsx
│   ├── api.js
│   ├── i18n.js
│   ├── index.css
│   ├── main.jsx
│   └── translations.js
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Application Pages

### Home Page

`src/pages/HomePage.jsx` provides the main meal-browsing experience.

It:

- Loads categories.
- Loads all meals or meals from a selected category.
- Filters meals using the title-search field.
- Displays six cards initially.
- Shows a Show More/Show Less control when extra meals are available.
- Displays loading, empty-result, category, and connection-error states.

### Meal Details Page

`src/pages/MealDetailsPage.jsx` displays a complete recipe.

It includes:

- A Back to Meals link.
- A meal photo.
- The meal name.
- Category and origin-area badges.
- Optional tags.
- YouTube and source links.
- Ingredient names and quantities.
- An expandable ingredient list.
- Numbered preparation steps.
- An expandable instruction list.
- A Meal not found state for invalid routes or missing API data.

## Reusable Components

### Header

`src/components/Header.jsx` contains:

- The application name.
- The language-switching button.
- The light/dark theme button.
- Direction updates for `html`.
- Browser storage for language and theme preferences.

### Category Tabs

`src/components/CategoryTabs.jsx` displays:

- An All button.
- API-provided category buttons.
- An active-category style.
- Arabic translations for recognized category names.

### Meal Card

`src/components/MealCard.jsx` renders:

- A circular meal photo.
- A localized meal name when available.
- A View Details button.
- A dynamic route to the recipe page.
- Hover and focus styling.

### Footer

`src/components/Footer.jsx` displays the application name, current year, and translated rights text.

### Offline Gate

`src/components/OfflineGate.jsx` detects and handles connectivity loss.

It:

- Listens for browser `offline` and `online` events.
- Accepts an application-level network-error event.
- Checks internet access every five seconds.
- Provides a Try Again button.
- Lazy-loads the offline game.
- Closes the overlay when connectivity returns.

### Offline Game

`src/components/OfflineGame.jsx` implements a Canvas-based Snake game.

Features include:

- Arrow-key and touch controls.
- A red food target.
- A growing green snake.
- Collision detection.
- Current and best scores.
- A persistent best score stored in `localStorage`.
- A Play Again button.

## Routing

React Router manages the following routes:

| Route | Page |
|---|---|
| `/` | All meals |
| `/meal/:category/` | Meals from one category |
| `/meal/:category/:name` | A meal-details page |
| Any unmatched route | Page not found |

The `slugify` function in `src/api.js` converts names into URL-safe values:

```text
Chicken Tikka -> chicken-tikka
```

A numeric category parameter is treated as a meal ID by `MealCategoryRoute`, which loads the details page directly.

## API Integration

`src/api.js` connects to TheMealDB using:

```text
https://www.themealdb.com/api/json/v1/1
```

Available API functions:

| Function | API endpoint |
|---|---|
| `fetchMeals` | `search.php?s=` |
| `fetchCategories` | `categories.php` |
| `fetchMealsByCategory` | `filter.php?c=<category>` |
| `fetchMealById` | `lookup.php?i=<id>` |
| `fetchMealByCategoryAndSlug` | Category filtering followed by meal lookup |

## Environment Variables

The project reads external service URLs from Vite environment variables.

The actual development values are stored in `.env`:

```text
VITE_MEALDB_API_URL=https://www.themealdb.com/api/json/v1/1
VITE_GOOGLE_TRANSLATE_URL=https://translate.googleapis.com/translate_a/single
VITE_MYMEMORY_TRANSLATE_URL=https://api.mymemory.translated.net/get
VITE_CONNECTION_CHECK_URL=https://www.gstatic.com/generate_204
```

`.env.example` contains the same public configuration and can be copied when setting up another environment:

```bash
cp .env.example .env
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

The `.env` file is excluded from Git. Restart the Vite development server after changing environment variables.

## Internationalization

The application supports English and Arabic using i18next.

`src/i18n.js` contains:

- Shared English and Arabic interface translations.
- The saved language preference.
- English as the fallback language.
- React-i18next initialization.

Arabic sets:

```text
document.documentElement.lang = "ar"
document.documentElement.dir = "rtl"
```

English sets:

```text
document.documentElement.lang = "en"
document.documentElement.dir = "ltr"
```

The selected language is saved under:

```text
language
```

Supported values are `ar` and `en`.

## Meal and Instruction Translation

`src/translations.js` provides application-specific translations for:

- Categories.
- Meal areas or origins.
- Recognized meal names.
- Ingredients.
- Measurement units.
- Curated instructions for Ezme.
- Dynamic instructions for other meals.

Instruction translation follows this sequence:

1. Remove decorative step numbers and labels.
2. Use a curated translation when it exists.
3. Check `localStorage` for a cached translation.
4. Translate with Google Translate.
5. Try MyMemory as a fallback.
6. Keep the original English text if neither service succeeds.

Translated instruction text is cached under keys beginning with:

```text
instruction:
```

## Light and Dark Themes

The theme toggle changes the `theme` value between `light` and `dark`.

The root HTML element receives:

```html
<html data-theme="dark">
```

or:

```html
<html data-theme="light">
```

`src/index.css` defines:

- Light page, card, header, search, and button colors.
- Dark page and card backgrounds.
- Dark-mode text colors.
- High-contrast navbar controls.
- Visible borders and hover states.
- Dark footer and form styling.

Light mode is used by default unless the user previously selected dark mode.

## Offline Mode

When the browser or application detects connectivity loss:

1. `OfflineGate` covers the application with a full-screen overlay.
2. A translated connection message is displayed.
3. The Try Again button checks internet access.
4. Snake becomes available as offline entertainment.
5. The overlay disappears after connectivity is restored.

The connection test uses a no-cache request to Google's `generate_204` endpoint. An abort controller prevents a delayed request from hanging indefinitely.

## Local Storage

| Key | Value |
|---|---|
| `language` | Selected language: `ar` or `en` |
| `theme` | Selected theme: `light` or `dark` |
| `snake-best` | Highest Snake score |
| `instruction:<text>` | Cached Arabic instruction text |

Clearing browser storage removes preferences and cached translations.

## Deployment

Run:

```bash
npm run build
```

Then deploy the generated `dist` directory to a static hosting service such as Vercel, Netlify, or GitHub Pages.

Make sure the hosting configuration supports React Router client-side routes. For example, direct requests to:

```text
/meal/dessert/flan
```

must fall back to `index.html` instead of returning a hosting-provider 404 response.

## Notes and Limitations

- New meal data requires internet access to TheMealDB.
- Translation services require internet access for instructions that are not already cached or curated.
- Dynamic API values may not be covered by every meal-name or ingredient translation dictionary.
- If a translation service fails, the original English instruction remains the fallback.
- The offline game uses local browser logic and does not require TheMealDB.
- The project is intended to be deployed as a static React application.
