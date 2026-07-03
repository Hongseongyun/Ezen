exports.handler = async function(event, context) {
  // Optional protection: if SUPABASE_KEY_TOKEN is set in site env, require matching header
  const anonKey = process.env.SUPABASE_ANON_KEY || null;
  const protectToken = process.env.SUPABASE_KEY_TOKEN || null;

  if (!anonKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Supabase anon key not configured on server.' })
    };
  }

  if (protectToken) {
    const reqToken = event.headers['x-key-token'] || event.headers['X-Key-Token'] || null;
    if (!reqToken || reqToken !== protectToken) {
      return {
        statusCode: 403,
        body: JSON.stringify({ error: 'Forbidden - invalid token' })
      };
    }
  }

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store'
    },
    body: JSON.stringify({ anonKey })
  };
};
