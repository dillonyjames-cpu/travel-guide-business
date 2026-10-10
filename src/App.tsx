import CurrentTourPage from "./pages/CurrentTourPage";
import { SiteHeader } from "./components/SiteHeader";
import { SiteFooter } from "./components/SiteFooter";

export default function App() {
  return (
    <div id="top">
      <SiteHeader />
      <main>
        <CurrentTourPage />
      </main>
      <SiteFooter />
    </div>
  );
}
