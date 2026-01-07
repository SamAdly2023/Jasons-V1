
const PRINTFUL_API_URL = 'https://api.printful.com';

export const createPrintfulOrder = async (orderData) => {
  const apiKey = process.env.PRINTFUL_API_KEY;

  if (!apiKey) {
    console.warn("⚠️ MOCK MODE: PRINTFUL_API_KEY is missing. Order will NOT be sent to Printful.");
    return {
      id: 12345678,
      status: 'draft',
      mock: true
    };
  }

  // Map our internal order data to Printful's required format
  // Doc: https://developers.printful.com/docs/#operation/createOrder
  const printfulPayload = {
    recipient: {
      name: orderData.shippingAddress.name,
      address1: orderData.shippingAddress.line1,
      address2: orderData.shippingAddress.line2 || '',
      city: orderData.shippingAddress.city,
      state_code: orderData.shippingAddress.state,
      country_code: orderData.shippingAddress.country,
      zip: orderData.shippingAddress.postalCode,
      email: orderData.shippingAddress.email,
    },
    items: orderData.items.map(item => ({
      // In a real app, you would map your internal productId to a Printful Variant ID
      // For this demo, we assume the 'productId' matches a Printful Sync Variant ID or similar
      // Or we choose a default variant if testing.
      variant_id: 4011, // Example: Unisex Staple T-Shirt | Black | L
      quantity: item.quantity,
      files: item.customDesignUrl ? [
        {
          url: item.customDesignUrl
        }
      ] : []
    }))
  };

  try {
    const response = await fetch(`${PRINTFUL_API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(printfulPayload)
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Printful API Error: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error("Failed to create order in Printful:", error);
    // We update the local order status but don't crash the whole request
    // calling code should handle this
    throw error;
  }
};
