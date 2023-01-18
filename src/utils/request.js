export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${process.env.API_URL_DOMAIN}${url}`, {
      ...options,
      headers: {
        "x-username": process.env.USERNAME,
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      return await res.json();
    }

    throw new Error("API Request Error!");
  } catch (e) {
    console.error(e);
  }
};
