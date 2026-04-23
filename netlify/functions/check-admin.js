exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  try {
    const { password } = JSON.parse(event.body);
    const correct = process.env.ADMIN_PASSWORD;

    if (!correct) {
      return { statusCode: 500, body: JSON.stringify({ ok: false, error: 'Not configured' }) };
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: password === correct })
    };
  } catch (e) {
    return { statusCode: 400, body: JSON.stringify({ ok: false }) };
  }
};
