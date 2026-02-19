import { describe, test, expect, beforeEach } from "vitest"
import {render, screen, waitFor} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Contacto from "../../componentes/layout/Contacto"

describe("Contacto - Pruebas Funcionales", () => {
    let user

    beforeEach(() => {
        user = userEvent.setup()
    })

    test("el usuario puede escribir en todos los campos del formulario", async () => {
        render(<Contacto />)

        const inputNombre = screen.getByLabelText(/Nombre/i)
        const inputCorreo = screen.getByLabelText(/Correo/i)
        const inputProducto = screen.getByLabelText(/Producto/i)
        const inputMensaje = screen.getByLabelText(/Mensaje/i)

        await user.type(inputNombre, "Juan Pérez")
        await user.type(inputCorreo, "juan@example.com")
        await user.type(inputProducto, "Monitor Gaiming")
        await user.type(inputMensaje, "Este es mi mensaje de prueba")

        expect(inputNombre).toHaveValue("Juan Pérez")
        expect(inputCorreo).toHaveValue("juan@example.com")
        expect(inputProducto).toHaveValue("Monitor Gaiming")
        expect(inputMensaje).toHaveValue("Este es mi mensaje de prueba")
    })

    test("muestra error cuando el nombre es inválido", async () => {
        render(<Contacto />)

        const inputNombre = screen.getByLabelText(/Nombre/i)
        const botonEnviar = screen.getByRole("button", { name: /Mandar Oferta/i })

        await user.type(inputNombre, "J")
        await user.click(botonEnviar)

        expect(
            screen.getByText(/Por favor ingresa un nombre valido/i)
        ).toBeInTheDocument()
    })

    test("muestra error cuando el correo es inválido", async () => {
        const user = userEvent.setup();
        render(<Contacto />)

        const inputNombre = screen.getByLabelText(/Nombre/i)
        const inputCorreo = screen.getByLabelText(/Correo/i)
        const botonEnviar = screen.getByRole("button", { name: /Mandar Oferta/i })

        await user.type(inputNombre, "Juan Perez")
        await user.type(inputCorreo, "correo-invalido")
        await user.click(botonEnviar)

        expect(
            await screen.findByText(/Por favor ingresa un correo válido/i)
        ).toBeInTheDocument()
    })

    test("muestra error cuando el mensaje está vacío", async () => {
        render(<Contacto/>)

        const inputNombre = screen.getByLabelText(/Nombre/i)
        const inputCorreo = screen.getByLabelText(/Correo/i)
        const inputProducto = screen.getByLabelText(/Producto/i)
        const botonEnviar = screen.getByRole("button", { name: /Mandar Oferta/i })

        await user.type(inputNombre, "Juan Perez")
        await user.type(inputCorreo, "juan@example.com")
        await user.type(inputProducto, "Monitor")
        await user.click(botonEnviar)

        expect(
            await screen.findByText(/Por favor ingresa un mensaje valido/i)
        ).toBeInTheDocument()
    })

    test("no muestra errores cuando todos los campos son válidos", async () => {
        render(<Contacto/>)

        const inputNombre = screen.getByLabelText(/Nombre/i)
        const inputCorreo = screen.getByLabelText(/Correo/i)
        const inputProducto = screen.getByLabelText(/Producto/i)
        const inputMensaje = screen.getByLabelText(/Mensaje/i)
        const botonEnviar = screen.getByRole("button", { name: /Mandar Oferta/i })

        await user.type(inputNombre, "Juan Perez")
        await user.type(inputCorreo, "juan@example.com")
        await user.type(inputProducto, "Zapatillas")
        await user.type(inputMensaje, "Este es un mensaje valido")
        await user.click(botonEnviar)

        await waitFor(() => {
            expect(screen.queryByText(/Por favor ingresa/i)).not.toBeInTheDocument();
        });
    })

    // Contacto.test.jsx

    test('Flujo completo: usuario corrige errores y completa el formulario', async () => {
        // 1. Renderizamos el componente y capturamos el contenedor
        const { container } = render(<Contacto />)
        const user = userEvent.setup()

        // --- TRUCO ---
        // Buscamos el formulario y le añadimos un "freno" manual solo para el test.
        // Esto evita que JSDOM intente navegar a Formspree y rompa el test,
        // pero permite que tu lógica de React (limpiar errores) se ejecute primero.
        const formulario = container.querySelector('form');
        formulario.addEventListener('submit', (e) => e.preventDefault());
        // ----------------------

        const inputNombre = screen.getByLabelText(/nombre/i)
        const boton = screen.getByRole('button', { name: /mandar oferta/i })

        // PASO 1: Provocar el error
        await user.type(inputNombre, 'A') // Nombre inválido
        await user.click(boton)

        // Comprobamos que sale el error
        expect(screen.getByText(/por favor ingresa un nombre valido/i)).toBeInTheDocument()

        // PASO 2: Corregir el error y rellenar TODO
        await user.clear(inputNombre)
        await user.type(inputNombre, 'Jose Damian') // Nombre corregido

        // ¡IMPORTANTE! Para que el flujo sea exitoso, debemos rellenar
        // TAMBIÉN el correo y el mensaje, si no, saltará el siguiente error.
        const inputCorreo = screen.getByLabelText(/correo/i)
        const inputProducto = screen.getByLabelText(/producto/i)
        const inputMensaje = screen.getByLabelText(/mensaje/i)

        await user.type(inputCorreo, 'damian@gmail.com')
        await user.type(inputProducto, 'monitor')
        await user.type(inputMensaje, 'Este es un mensaje de prueba válido')

        // PASO 3: Enviar de nuevo
        await user.click(boton)

        // PASO 4: Verificar éxito
        // Como tu código hace `setError(null)` si todo va bien,
        // verificamos que el mensaje de error del nombre YA NO existe.
        expect(screen.queryByText(/por favor ingresa un nombre valido/i)).not.toBeInTheDocument()

        // También verificamos que no haya saltado el error de correo ni mensaje
        expect(screen.queryByText(/por favor ingresa un correo valido/i)).not.toBeInTheDocument()

        // Y también verificamos que no haya saltado el error de producto ni mensaje
        expect(screen.queryByText(/por favor ingresa un producto que este en el catálogo/i)).not.toBeInTheDocument()
    })

    test("los placeholders ayudan al usuario a saber qué escribir", () => {
        render(<Contacto />)

        expect(screen.getByPlaceholderText(/John Doe/i)).toBeInTheDocument()
        expect(screen.getByPlaceholderText(/john@correo.com/i)).toBeInTheDocument()
        expect(screen.getByPlaceholderText(/Que producto te interesa/i)).toBeInTheDocument()
        expect(screen.getByPlaceholderText(/Escribe tu mensaje/i)).toBeInTheDocument()
    })
})