export default defineEventHandler(async (event) => {
  const apiUrl = `${process.env.API_BASE_URL}/audiobooks`;

  if (event.req.method === 'GET') {
    try {
      const response = await $fetch(apiUrl, {
        headers: {
          'access_token': process.env.API_KEY,
          'Accept': '*/*',
        },
      });
      return response;
    } catch (error) {
      console.error('Error fetching audiobooks:', error);
      throw createError({
        statusCode: error.response?.status || 500,
        statusMessage: 'Failed to fetch audiobooks',
      });
    }
  }

  if (event.req.method === 'POST') {
    try {
      const body = await readBody(event); // Read the request body
      const response = await $fetch(apiUrl, {
        method: 'POST',
        headers: {
          'access_token': process.env.API_KEY,
          'Accept': '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      return { message: 'Book added successfully', data: response };
    } catch (error) {
      console.error('Error adding audiobook:', error);
      throw createError({
        statusCode: error.response?.status || 500,
        statusMessage: 'Failed to add audiobook',
      });
    }
  }
});