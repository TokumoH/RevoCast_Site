import React from "react"
import ReactDOM from "react-dom/client"
// Estilos compartilhados primeiro: os estilos de cada domínio (carregados pelo App) sobrescrevem estes.
import "@/shared/styles/tokens.css"
import "@/shared/styles/base.css"
import "@/shared/ui/ui.css"
import "@/shared/motion/motion.css"
import App from "./App"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
