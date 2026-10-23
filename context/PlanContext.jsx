"use client";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const PlanContext = createContext();

export const usePlan = () => useContext(PlanContext);

export function PlanProvider({ children }) {
 const [plan, setPlan] = useState([]);
 const [saved, setSaved] = useState([]);
 const [ready, setReady] = useState(false);

  // load from localStorage once, after the page opens in the browser
  useEffect(() => {
    try {
      setPlan(JSON.parse(localStorage.getItem("plan") || "[]"));
      setSaved(JSON.parse(localStorage.getItem("saved") || "[]"));
    } catch {
      setPlan([]);
      setSaved([]);
    }
    setReady(true);
  }, []);

  // save to localStorage whenever plan or saved changes
  useEffect(() => {
    if (ready) localStorage.setItem("plan", JSON.stringify(plan));
  }, [plan, ready]);

  useEffect(() => {
    if (ready) localStorage.setItem("saved", JSON.stringify(saved));
  }, [saved, ready]);

  const addToPlan = (id) => {
    if (plan.some((p) => p.id === id)) {
      toast("Already in today's plan");
      return;
    }
    if (plan.length >= 5) {
      toast.error("Today's plan is full (max 5 lifts)");
      return;
    }
    setPlan([...plan, { id, done: false }]);
    toast.success("Added to today's plan");
  };

  const saveForLater = (id) => {
    if (saved.includes(id)) {
      toast("Already saved");
      return;
    }
    setSaved([...saved, id]);
    toast.success("Saved for later");
  };

  const removeFromPlan = (id) => {
    setPlan(plan.filter((p) => p.id !== id));
    toast("Removed from today's plan");
  };

  const removeFromSaved = (id) => {
    setSaved(saved.filter((s) => s !== id));
    toast("Removed from saved");
  };

  const markDone = (id) => {
    setPlan(plan.map((p) => (p.id === id ? { ...p, done: true } : p)));
    toast.success("Marked as done");
  };

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        ready,
        addToPlan,
        saveForLater,
        removeFromPlan,
        removeFromSaved,
        markDone,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}