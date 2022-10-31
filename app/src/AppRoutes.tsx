import { Route } from "react-router-dom"
import { AnimatedRoutes, RouteTransition } from "./components/AnimatedRoutes"
//
import { PageHome, PageAbout, PageNotFound } from "./app/pages"
//
function AppRoutes() {
  return (
    <AnimatedRoutes>
      <Route
        path="/"
        element={
          <RouteTransition>
            <PageHome />
          </RouteTransition>
        }
      />
      <Route
        path="about"
        element={
          <RouteTransition>
            <PageAbout />
          </RouteTransition>
        }
      />
      {/* 404 */}
      <Route
        path="*"
        element={
          <RouteTransition>
            <PageNotFound />
          </RouteTransition>
        }
      />
    </AnimatedRoutes>
  )
}

export default AppRoutes
