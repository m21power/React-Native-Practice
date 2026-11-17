import { getCount } from "@/services/counterApi";
import { useState, useEffect } from "react";
/*
  const [display, setDisplay] = useState(0);
  const [loading, setLoading] = useState<Action | null>(null);
  const [error, setError] = useState<string | null>(null);
*/
type Action = "load" | "inc" | "dec" | "reset";
export function useCounter() {
  const [display, setDisplay] = useState(0);
  const [loading, setLoading] = useState<Action | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isBusy = loading !== null;

  // Runs any API call and handles loading + error state in one place
  const run = async (action: Action, apiCall: () => Promise<number>) => {
    if (isBusy) return; // ignore taps while a request is running
    setLoading(action);
    setError(null);
    try {
      const newValue = await apiCall();
      setDisplay(newValue);
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(null);
    }
  };

  // Load the initial value when the screen opens
  useEffect(() => {
    run("load", getCount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    display,
    loading,
    error,
    run,
  };
}
