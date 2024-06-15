export const fetchHandler = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(
        `Fetch failed with status - ${response.status}, ${response.statusText}`
      );
    }

    const isJson = (response.headers.get("content-type") || "").includes(
      "application/json"
    );
    if (isJson) {
      const json = await response.json();
      return [json, null];
    }

    const textData = await response.text();
    return [textData, null];
  } catch (error) {
    console.warn(error);
    return [null, error];
  }
};

// --------------------------------------------------------------
const getRandomDog = async () => {
  const [dogData, error] = await fetchHandler(
    "https://dog.ceo/api/breeds/image/random"
  );

  if (dogData) console.log(dogData);
  //   if (error) console.log(error);
};

getRandomDog();
