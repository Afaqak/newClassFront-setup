export const FetchTypeGet = async (url,data=null) => {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data}`,
      },
    });
    return response.json();
  }
  