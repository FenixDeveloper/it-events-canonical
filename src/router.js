import {
    Route,
    createBrowserRouter,
    createRoutesFromElements
} from "react-router-dom";
import { Layout } from "it-events-frontend";
import * as page from "./pages";

const router = createBrowserRouter(
  createRoutesFromElements(
      <Route path="/" element={<Layout />}>
      <Route index element={<page.MainPage />} />
      <Route
        path="events/:id"
        element={<page.EventPage />}
        loader={page.eventLoader}
        errorElement={<page.NotFoundPage />}
      />

      <Route path="favorites" element={<page.FavoritesPage />} />
      <Route path="results" element={<page.SearchResultPage />} />
      <Route path="*" element={<page.NotFoundPage />} />
    </Route>
  )
);

export default router;
