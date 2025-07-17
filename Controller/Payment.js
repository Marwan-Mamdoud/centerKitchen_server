import Stripe from "stripe";

export const CheckOut = async (req, res, next) => {
  try {
    const stripe = new Stripe(
      "sk_test_51OjCv7GFLxJyq56iZUyaqcDiQpWPpiQnryc27ygrq5Nq9OXOVr4IXE03g9dTaEh2ZeWnAzvcpZ59ALWPZEgb7vEE00XWd23Ulv"
    );
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: req.body.items.map((item) => ({
        price_data: {
          currency: "AED",
          product_data: {
            name: item.name.en,
            images: [item.image],
          },
          unit_amount: item.lastPrice * 100 + item.options * 100, // السعر بالسنتات
        },
        quantity: item.numProduct,
      })),
      mode: "payment",
      success_url: `https://center-kitchen-frontend.vercel.app/thanks`,
      cancel_url: `https://center-kitchen-frontend.vercel.app`,
    });

    if (session.id) {
      return res.status(200).json({
        status: true,
        message: "Done Checkout Successfully.",
        id: session.id,
      });
    }
    return;
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ message: `Error With Payment Controller ${error.message} ` });
  }
};
