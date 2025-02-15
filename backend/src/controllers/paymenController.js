import stripe from "../config/stripe.js";

export const processPayment = async (req, res) => {
  try {
    const { products } = req.body;

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
      quantity: 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/cart?success=true`,
      cancel_url: `${process.env.FRONTEND_URL}/cart?cancel=true`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Error creando la sesion de pago: ", error);
    res.status(500).json({ error: error.message });
  }
};
