import "./App.scss"
import { registerServiceWorker } from "./utils/serviceWorker"

const serviceWorkerUrl = `${process.env.PUBLIC_URL}/service-worker.js`

export function buildAppComponent() {
    registerServiceWorker(serviceWorkerUrl).catch(error => {
        console.error(
            "failed to setup app env"
            , error)
    })
    return () => (
        <App />
    )
}

function App() {
    return (
        <div className="app">
            Playwright service worker demo app
        </div>
    )
}
