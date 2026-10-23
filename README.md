# 🏋️ FitLog — Workout Library

FitLog is a dark, no-nonsense gym companion. Browse a library of lifts, lock your favorites into today's plan, save others for later, and watch your daily workout totals add up.

🔗 **Live Site:** _add your link here after deployment_

## 🛠️ Technologies Used

- **Next.js** (App Router)
- **React**
- **Tailwind CSS**
- **react-hot-toast** for toast notifications
- **react-icons** for icons
- **Context API + localStorage** for state and persistence

## ✨ Key Features

1. **Workout library:** 12 workouts fetched from an API and shown as cards in a responsive grid, with a loading spinner while data loads.
2. **Sort by:** re-sort the library by Duration, Calories or Rating.
3. **Workout details page:** large image, key specs, numbered instructions and muscle group tags for every lift.
4. **Today's plan and Saved:** add a workout to today's plan (capped at 5 lifts) or save it for later, with toast notifications and live navbar counters.
5. **My Plan page:** live metrics for exercises, minutes and calories, a Today's Plan / Saved tab switch, Mark as Done and Remove actions, and a friendly empty state.
6. **Persistent data:** your plan and saved lists survive a page reload thanks to localStorage.
7. **Fully responsive:** works on mobile, tablet and desktop, with a custom 404 page.

## 🚀 Getting Started

```bash
git clone https://github.com/YOUR-USERNAME/fitlog.git
cd fitlog
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
app/          pages and routes (home, workout/[id], my-plan, 404)
components/   Navbar, Hero, Library, WorkoutCard, WorkoutDetails, MyPlan, Footer
context/      PlanContext (plan and saved state)
public/       images and logo
```