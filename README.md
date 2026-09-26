# 🎬 MovieVerse — React + TMDB Movie Application

<p align="center">
  <b>🍿 A React-based movie discovery project powered by TMDB API</b><br/>
  <i>Built for learning React, API integration, routing, state management & Tailwind CSS.</i>
</p>

---

## 🌟 About the Project

**MovieVerse** is a React movie application that connects to the **The Movie Database (TMDB) API**.

The current project structure contains:

- 🏠 Homepage
- 🎬 Movie details page
- 👤 Credits / crew profile page
- 🎭 Genre selection
- 🔗 React routing
- 🌐 TMDB API integration
- 🔐 Environment variable for TMDB Bearer Token
- 🎨 Tailwind CSS styling

The main application component is `Movieproject`, which loads movie genres from TMDB and displays them in a genre dropdown. It also defines the application's routes. 

---

# 📁 Project Structure

```text
MovieVerse/
│
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   │
│   └── pages/
│       ├── Homepage.jsx
│       ├── moviedetails.jsx
│       └── creprofile.jsx
│
├── .env
├── package.json
└── README.md
```

> The uploaded source currently shows `App.jsx`, `main.jsx`, and `index.css`. The page components are imported by `App.jsx`, so their detailed internal implementation is not included in this README unless their source is provided.

---

# 🚀 Main Technologies

| Technology | Purpose |
|---|---|
| ⚛️ React | Building the UI |
| 🟨 JavaScript | Application logic |
| 🎨 Tailwind CSS | Styling |
| 🌐 Fetch API | Calling TMDB API |
| 🔀 React Router | Page navigation |
| 🎬 TMDB API | Movie/genre data |
| 🔐 `.env` | Storing API token |

---

# 🧩 1. `App.jsx` — Main Application

The main application imports React hooks and routing components:

```jsx
import React,{Fragment,useEffect,useState} from "react";
import { Route,Routes,Link,NavLink } from "react-router";
```

### What is happening here?

### `useState`

Used for storing component data.

The project has:

```jsx
const [list,setlist] = useState([])
```

Here:

- `list` → stores the movie genre list
- `setlist` → updates the genre list

Initially:

```text
list = []
```

After the API request:

```text
list = [
  { id: ..., name: "Action" },
  { id: ..., name: "Comedy" },
  ...
]
```

---

# 🔄 2. `useEffect`

The project uses:

```jsx
useEffect(()=>{
   ...
},[])
```

The empty dependency array:

```jsx
[]
```

means the effect is intended to run when the component mounts.

Inside it, the project creates an asynchronous function:

```jsx
const getmovielist = async()=>{
```

This function is responsible for getting genres from TMDB.

---

# 🌐 3. TMDB API Request

The application requests:

```text
https://api.themoviedb.org/3/genre/movie/list
```

The request uses:

```jsx
fetch(...)
```

with:

```jsx
method: "GET"
```

A GET request means the application is asking the server to provide data.

---

# 🔐 4. TMDB Bearer Token

The project uses:

```jsx
Authorization: `Bearer ${import.meta.env.VITE_APP_TMDB_TOKEN}`
```

This means the token is read from Vite's environment variables.

Expected environment variable:

```text
VITE_APP_TMDB_TOKEN
```

A `.env` file can contain:

```env
VITE_APP_TMDB_TOKEN=YOUR_TMDB_TOKEN
```

### ⚠️ Important

Do not commit your real API token to a public GitHub repository.

Use:

```text
.env
```

and normally add it to:

```text
.gitignore
```

---

# 📦 5. Converting API Response to JSON

After the request:

```jsx
const data = await res.json();
```

The response body is converted into JavaScript data.

The project then checks:

```jsx
if(!res.ok){
  throw new Error(
    `Http request failed with status code : ${res.status}`,
  );
}
```

### Why?

`res.ok` tells us whether the HTTP request was successful.

If it is not successful, an error is thrown.

---

# 📝 6. Saving Genres in State

After receiving the response:

```jsx
setlist(data.genres)
```

The TMDB response's `genres` array is stored inside `list`.

Conceptually:

```text
TMDB
 ↓
fetch()
 ↓
response
 ↓
res.json()
 ↓
data.genres
 ↓
setlist()
 ↓
list
```

---

# 🛡️ 7. Error Handling

The API call is wrapped inside:

```jsx
try {
   ...
} catch(err) {
   console.log(err)
}
```

This prevents an API error from crashing the whole request flow silently.

If something goes wrong, the error is printed in the browser console.

---

# 🎨 8. Header

The application contains:

```jsx
<header>
```

The header displays:

```text
MovieVerse
```

The title is styled using Tailwind CSS:

```jsx
className="font-bold text-amber-500 text-shadow text-2xl"
```

The header itself uses:

```jsx
h-16
w-full
border-b
px-5
flex
justify-between
items-center
bg-[#032541]
text-white
absolute
z-10
```

### Tailwind classes explained

| Class | Meaning |
|---|---|
| `h-16` | Header height |
| `w-full` | Full width |
| `border-b` | Bottom border |
| `px-5` | Horizontal padding |
| `flex` | Flexbox |
| `justify-between` | Space between items |
| `items-center` | Vertical alignment |
| `bg-[#032541]` | Custom background color |
| `text-white` | White text |
| `absolute` | Absolute positioning |
| `z-10` | Higher stacking order |

---

# 🎭 9. Genre Dropdown

The project contains:

```jsx
<select>
```

with:

```jsx
<option value="">
  Choose Genres
</option>
```

The API genres are rendered using:

```jsx
{list.map((lists)=>(
  <option key={lists.id} value={lists.id}>
    {lists.name}
  </option>
))}
```

This is an important React concept.

---

## 🔁 `map()` in the Genre Dropdown

Suppose the API returns:

```js
[
  { id: 28, name: "Action" },
  { id: 35, name: "Comedy" },
  { id: 18, name: "Drama" }
]
```

Then:

```jsx
list.map((lists) => ...)
```

runs once for every genre.

The result becomes conceptually:

```html
<option>Action</option>
<option>Comedy</option>
<option>Drama</option>
```

---

# 🔑 10. Why `key` is used

The code uses:

```jsx
key={lists.id}
```

React needs a stable key when rendering lists.

The TMDB genre ID is appropriate because it identifies each genre.

Example:

```jsx
<option key={28}>Action</option>
<option key={35}>Comedy</option>
```

---

# 🧭 11. Routing

The application uses:

```jsx
<Routes>
```

and:

```jsx
<Route />
```

Routes currently defined are:

```jsx
<Route path="/" element={<Homepage/>}>
```

```jsx
<Route
  path="/moviedetails/:id/*"
  element={<Moviedetails/>}
/>
```

```jsx
<Route
  path="/credits/:id"
  element={<Creprofile/>}
/>
```

---

# 🏠 Route 1 — Homepage

```text
/
```

renders:

```jsx
<Homepage/>
```

So visiting the root route loads the Homepage component.

---

# 🎬 Route 2 — Movie Details

```text
/moviedetails/:id/*
```

renders:

```jsx
<Moviedetails/>
```

The `:id` is a dynamic route parameter.

For example:

```text
/moviedetails/123
```

Here:

```text
id = 123
```

The details component can use this ID to identify a movie.

The trailing:

```text
/*
```

allows nested routes under this route.

---

# 👤 Route 3 — Credits

```text
/credits/:id
```

renders:

```jsx
<Creprofile/>
```

Again, `:id` is dynamic.

For example:

```text
/credits/456
```

means:

```text
id = 456
```

---

# 🌐 12. `main.jsx`

The entry point imports:

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
```

Then:

```jsx
createRoot(document.getElementById('root')).render(
```

starts the React application.

---

# 🔀 13. BrowserRouter

The application wraps `App` with:

```jsx
<BrowserRouter>
  <App />
</BrowserRouter>
```

This gives the React application routing functionality.

Conceptually:

```text
main.jsx
   ↓
BrowserRouter
   ↓
App
   ↓
Routes
   ↓
Homepage / Movie Details / Credits
```

---

# 🎨 14. `index.css`

The current CSS file contains:

```css
@import "tailwindcss";
```

This imports Tailwind CSS into the project.

Most of the UI styling in the uploaded code is therefore done directly through Tailwind utility classes.

---

# 🧠 React Concepts Used

This project is a good practice project because it uses several important React concepts.

## 1. Components

Examples:

```jsx
Movieproject
Homepage
Moviedetails
Creprofile
```

Components allow the UI to be divided into reusable pieces.

---

## 2. State

The project uses:

```jsx
useState()
```

Example:

```jsx
const [list,setlist] = useState([])
```

State allows the UI to update when data changes.

---

## 3. Side Effects

The project uses:

```jsx
useEffect()
```

for API communication.

---

## 4. Async/Await

The API function uses:

```jsx
async
```

and:

```jsx
await
```

This makes asynchronous API code easier to read.

---

## 5. Fetch API

The application uses:

```jsx
fetch()
```

to communicate with TMDB.

---

## 6. Array `map()`

Used to convert API data into React elements:

```jsx
list.map(...)
```

---

## 7. Conditional Error Handling

The project uses:

```jsx
try/catch
```

to handle request errors.

---

## 8. Environment Variables

The project reads:

```jsx
import.meta.env.VITE_APP_TMDB_TOKEN
```

This is the Vite way of accessing exposed environment variables.

---

# 🔄 Complete Application Flow

The overall flow can be understood like this:

```text
                    🚀 Application Starts
                            │
                            ▼
                       main.jsx
                            │
                            ▼
                     BrowserRouter
                            │
                            ▼
                         App.jsx
                            │
              ┌─────────────┴─────────────┐
              │                           │
              ▼                           ▼
          useEffect                    Routes
              │                           │
              ▼                 ┌─────────┼─────────┐
         fetch TMDB             │         │         │
              │                 ▼         ▼         ▼
              ▼             Homepage  Details   Credits
         res.json()
              │
              ▼
        data.genres
              │
              ▼
         setlist(...)
              │
              ▼
        list.map(...)
              │
              ▼
        Genre Dropdown
```

---

# 🧱 Component Architecture

```text
App
│
├── Header
│   ├── MovieVerse
│   └── Genre Select
│
├── Routes
│   │
│   ├── /
│   │   └── Homepage
│   │
│   ├── /moviedetails/:id/*
│   │   └── Moviedetails
│   │
│   └── /credits/:id
│       └── Creprofile
```

---

# 💡 Why This Project Is Useful for Learning React

This project combines multiple concepts instead of practicing them separately.

You are learning:

```text
React
 ↓
Components
 ↓
State
 ↓
useEffect
 ↓
API
 ↓
Async/Await
 ↓
JSON
 ↓
map()
 ↓
Dynamic Routing
 ↓
Route Parameters
 ↓
Environment Variables
 ↓
Tailwind CSS
```

This makes MovieVerse a useful project for understanding how a real React application can be organized.

---

# 🧪 Important Code Patterns

## API Pattern

```jsx
useEffect(() => {
  const getData = async () => {
    try {
      const res = await fetch(API_URL);

      const data = await res.json();

      if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
      }

      setData(data);
    } catch (err) {
      console.log(err);
    }
  };

  getData();
}, []);
```

---

## List Rendering Pattern

```jsx
{list.map((item) => (
  <option key={item.id}>
    {item.name}
  </option>
))}
```

---

## Dynamic Route Pattern

```jsx
<Route
  path="/moviedetails/:id/*"
  element={<Moviedetails />}
/>
```

---

# ⚠️ Current Code Notes

These are observations based specifically on the uploaded source.

### 1. Unused imports

`Fragment`, `Link`, and `NavLink` are imported in `App.jsx`, but the uploaded `App.jsx` does not currently use them.

```jsx
import React,{Fragment,useEffect,useState} from "react";
import { Route,Routes,Link,NavLink } from "react-router";
```

They can be removed later if they remain unused.

### 2. Genre `<select>` currently has no state handler

The dropdown is displayed, but the uploaded `App.jsx` does not currently attach an `onChange` handler to the `<select>`.

So the README describes the dropdown as a display of fetched genres, not as a currently implemented genre-filtering system.

### 3. Page component source is not included

`App.jsx` imports:

```jsx
Homepage
Moviedetails
Creprofile
```

but their internal source code was not part of the uploaded files used for this README.

Therefore this README does not invent their internal implementation.

---

# 🔐 Environment Setup

Create a `.env` file in the project root:

```env
VITE_APP_TMDB_TOKEN=YOUR_TMDB_BEARER_TOKEN
```

Then restart the Vite development server after changing environment variables.

---

# ▶️ Run the Project

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Then open the local URL shown by Vite.

---

# 🛠️ Possible Future Improvements

These are suggested project directions, not descriptions of functionality currently confirmed in the uploaded files.

- 🔎 Search movies
- 🎭 Filter movies by genre
- ⭐ Show ratings
- 🎬 Show trailers
- 👥 Show cast and crew
- ❤️ Add favourites
- 📱 Improve mobile responsiveness
- 🌙 Add dark/light theme
- ⏳ Add loading UI
- ❌ Add user-friendly API error UI
- 📄 Add pagination
- 🔍 Add movie search
- 💾 Store favourites locally
- 🎞️ Improve movie detail layout

---

# 📚 Learning Checklist

Use this project to practice:

- [x] React components
- [x] `useState`
- [x] `useEffect`
- [x] Fetch API
- [x] `async/await`
- [x] JSON response
- [x] `try/catch`
- [x] Array `map()`
- [x] React `key`
- [x] React Router
- [x] Dynamic route parameters
- [x] Environment variables
- [x] Tailwind CSS
- [ ] Loading states
- [ ] Error UI
- [ ] Search
- [ ] Filtering
- [ ] Pagination
- [ ] Authentication
- [ ] Advanced state management

---

# 🏆 Project Summary

**MovieVerse** is a React movie application that demonstrates how frontend components, state, side effects, API requests, routing, environment variables, and Tailwind CSS can work together.

The most important architecture to remember is:

```text
                 MOVIEVERSE
                     │
        ┌────────────┼────────────┐
        │            │            │
        ▼            ▼            ▼
      React        TMDB        Routing
        │            │            │
        ▼            ▼            ▼
     State        API Data     Pages
        │            │            │
        └────────────┼────────────┘
                     ▼
                  UI 🎬
```

<p align="center">
  <b>🎬 MovieVerse — Learn React by Building.</b>
</p>

