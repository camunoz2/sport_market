import db from "../config/db.js";
import stripe from "../config/stripe.js";

export const processPayment = async (req, res) => {
  try {
    const { products, userId } = req.body;

    const lineItems = products.map((product) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: product.title,
          images: [product.image],
          description: product.description,
        },
        unit_amount: Math.round(parseFloat(product.price) * 100),
      },
      quantity: product.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/cart?success=true`,
      cancel_url: `${process.env.FRONTEND_URL}/cart?cancel=true`,
    });

    // Guardar la compra en la base de datos
    for (const product of products) {
      await db.query(
        `INSERT INTO orders (user_id, product_id, quantity) VALUES ($1, $2, $3)`,
        [userId, product.id, product.quantity],
      );
    }

    res.json({ url: session.url });
  } catch (error) {
    console.error("Error creando la sesión de pago: ", error);
    res.status(500).json({ error: error.message });
  }
};
