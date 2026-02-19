import { test, expect } from "@playwright/test"

test.describe("Productos - Flujo E2E Completo", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto("http://localhost:5173/");

        await page.locator("a[href='#favoritos']").click();

        await expect(page.getByRole("heading", { name: "Favoritos" })).toBeVisible();
    })

    test("usuario filtra productos y ve solo la categoría seleccionada", async ({ page }) => {

        await expect(page.locator(".trabajo").first()).toBeVisible();
        const productosIniciales = await page.locator(".trabajo").count();

        // Click en el radio button correctamente
        await page.getByText("Electrónica").click();

        // Verificación
        await expect(page.locator(".trabajo .categoria").first()).toContainText("Electronica");

        const productosFiltrados = await page.locator(".trabajo").count();
        expect(productosFiltrados).toBeLessThan(productosIniciales);
    })

    test("usuario abre modal de un producto y ve los detalles", async ({ page }) => {
        // CORRECCIÓN: Hacemos click en .thumb (la imagen), que es quien tiene el onClick
        await page.locator(".trabajo").first().locator(".thumb").click();

        // Verificaciones
        await expect(page.locator(".overlay2")).toBeVisible();
        await expect(page.locator(".modal2")).toBeVisible();
        await expect(page.locator(".modal2 .titulo")).toBeVisible();
        // Verificamos que la imagen del modal ha cargado
        await expect(page.locator(".modal2 img").first()).toBeVisible();
    })

    test("usuario cierra modal con el botón cerrar", async ({ page }) => {
        await page.locator(".trabajo").first().locator(".thumb").click();
        await expect(page.locator(".modal2")).toBeVisible();

        // Es buena práctica acotar la búsqueda del botón DENTRO del modal
        await page.locator(".cerrar").click();

        // El expect not.toBeVisible espera automáticamente a que la animación de cierre termine
        await expect(page.locator(".modal2")).not.toBeVisible();
    })

    test("usuario cierra modal haciendo clic en la cruzeta", async ({ page }) => {
        await page.locator(".trabajo").first().locator(".thumb").click();
        await expect(page.locator(".modal2")).toBeVisible();

        // Cerramos el modal con el boton de cerrar
        await page.locator(".cerrar").click();

        await expect(page.locator(".modal2")).not.toBeVisible();
    })

    test("flujo completo: filtrar, abrir varios trabajos, cambiar filtro", async ({ page }) => {
        // Paso 1: Filtrar "Electronica"
        await page.locator('label[for="electronica"]').click();

        const primerTrabajo = page.locator(".trabajo").first();
        await primerTrabajo.waitFor({ state: "visible" });
        await expect(primerTrabajo.locator("p.categoria")).toHaveText(/Electronica/i);

        // Paso 2: Abrir modal del primer trabajo
        const primerThumb = primerTrabajo.locator(".thumb");
        await primerThumb.click();
        await page.locator(".modal2").waitFor({ state: "visible" });
        await expect(page.locator(".modal2")).toBeVisible();

        // Paso 3: Cerrar modal
        await page.locator(".cerrar").click();
        await page.locator(".modal2").waitFor({ state: "hidden" });
        await expect(page.locator(".modal2")).not.toBeVisible();

        // Paso 4: Cambiar filtro a "Deportes"
        await page.locator('label[for="deportes"]').click();

        const primerTrabajoDeportes = page.locator(".trabajo").first();
        await primerTrabajoDeportes.waitFor({ state: "visible" });
        await expect(primerTrabajoDeportes.locator("p.categoria")).toHaveText(/Deportes/i);
    });



    test("usuario prueba todos los filtros secuencialmente", async ({ page }) => {
        const filtrosMap = {
            electronica: "Electronica",
            moda: "Moda y Complementos",
            hogar: "Hogar y Jardin",
            deportes: "Deportes",
            coches: "Coches",
            animales: "Animales",
            bebes: "Bebes"
        };

        for (const [idInput, texto] of Object.entries(filtrosMap)) {
            // Click en el label asociado al input oculto
            await page.locator(`label[for="${idInput}"]`).click();

            // Esperamos que el primer producto filtrado sea visible
            const primerTrabajo = page.locator(".trabajo .categoria").first();
            await primerTrabajo.waitFor({ state: "visible" });

            // Verificamos que la categoría coincida exactamente
            await expect(primerTrabajo).toContainText(texto);
        }
    });
})