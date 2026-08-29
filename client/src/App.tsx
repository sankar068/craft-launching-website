/*
 * CRAFT / Nocturne Signal
 * Design reminder: single-page launch experience only; no dashboard chrome, no extra routes,
 * and no visual noise beyond the signal-led brand reveal.
 */
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./pages/Home";

export default function App() {
  return (
    <ErrorBoundary>
      <Home />
    </ErrorBoundary>
  );
}
