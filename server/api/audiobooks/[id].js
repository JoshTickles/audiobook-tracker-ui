export default defineEventHandler(async (event) => {
  const { id } = event.context.params;
  const apiUrl = `${process.env.API_BASE_URL}/audiobooks/${id}`;

  if (event.node.req.method === 'GET') {
    try {
      const response = await $fetch(apiUrl, {
        headers: {
          'access_token': process.env.API_KEY,
          'Accept': '*/*',
        },
      });

      return response;
    } catch (error) {
      console.error('Error fetching book:', error);
      throw createError({
        statusCode: error.response?.status || 500,
        statusMessage: 'Failed to fetch book data',
      });
    }

  } else if (event.node.req.method === 'PUT') {
    const body = await readBody(event);

    try {
      const response = await $fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'access_token': process.env.API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      return response;
    } catch (error) {
      console.error('Error updating book:', error);
      throw createError({
        statusCode: error.response?.status || 500,
        statusMessage: 'Failed to update book data',
      });
    }
  } else if (event.node.req.method === 'DELETE') {
      try {
        const response = await $fetch(apiUrl, {
          method: 'DELETE',
          headers: {
            'access_token': process.env.API_KEY,
            'Accept': '*/*',
          },
        });
  
        return response;
      } catch (error) {
        console.error('Error fetching book:', error);
        throw createError({
          statusCode: error.response?.status || 500,
          statusMessage: 'Failed to fetch book data',
        });
      }

  } else {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method Not Allowed',
    });
  }
});