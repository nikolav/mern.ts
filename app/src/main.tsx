/** @jsxImportSource @emotion/react */
import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"

import App from "./App"
import {
  ApolloGraphqlClientProvider,
  AuthApiProvider,
  BrowserContextProvider,
  EventEmitterProvider,
  IOProvider,
  QueryProvider,
  ReduxStoreProvider,
  ResourceMainProvider,
  MuiProvider,
} from "./app/providers"

import "./styles/reset.css"
import "./styles/global.css"
import "./styles/tw-build.css"
import "./styles/main.scss"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <BrowserContextProvider>
      <EventEmitterProvider>
        <QueryProvider>
          <AuthApiProvider>
            <IOProvider>
              <BrowserRouter>
                <ReduxStoreProvider>
                  <ApolloGraphqlClientProvider>
                    <ResourceMainProvider>
                      <MuiProvider>
                        <App />
                      </MuiProvider>
                    </ResourceMainProvider>
                  </ApolloGraphqlClientProvider>
                </ReduxStoreProvider>
              </BrowserRouter>
            </IOProvider>
          </AuthApiProvider>
        </QueryProvider>
      </EventEmitterProvider>
    </BrowserContextProvider>
  </StrictMode>
)
