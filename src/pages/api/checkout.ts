import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {

    try {

        const body = await request.json();

        const carrito = body.carrito;

        const total = carrito.reduce(
            (sum: number, item: any) =>
                sum + (item.precio * item.cantidad),
            0
        );

        const payload = {
            amount: total,
            currency: "USD",
            description: "Compra Swoody",
            merchant_id: import.meta.env.PAGALOFACIL_MERCHANT_ID,
            success_url: "http://localhost:4321/pago/exitoso",
            cancel_url: "http://localhost:4321/pago/fallido"
        };

        const response = await fetch(
            "URL_DE_PAGALOFACIL",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization":
                        `Bearer ${import.meta.env.PAGALOFACIL_API_KEY}`
                },
                body: JSON.stringify(payload)
            }
        );

        const data = await response.json();

        return new Response(
            JSON.stringify({
                url: data.payment_url
            }),
            {
                status: 200
            }
        );

    } catch(error) {

        return new Response(
            JSON.stringify({
                error: "Error al generar checkout"
            }),
            {
                status: 500
            }
        );
    }
};