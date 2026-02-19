import { describe, test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import App from "../../App"

describe("App - Pruebas de Integración", () => {
    test("App renderiza todos los componentes principales", () => {
        render(<App />)

        // Verifica que Header existe
        expect(
            screen.getByRole("heading", { name: /SecondLoop/i })
        ).toBeInTheDocument()

        expect(
            screen.getByRole("link", { name: /Buscar en SecondLoop/i })
        ).toBeInTheDocument()
    })

    test("todas las secciones son visibles en el DOM", () => {
        render(<App />)

        // Verifica que existen múltiples secciones
        const secciones = document.querySelectorAll("section")
        expect(secciones.length).toBeGreaterThan(1)
    })
})