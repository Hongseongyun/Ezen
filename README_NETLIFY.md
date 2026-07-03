Netlify serverless helper for providing Supabase anon key

Overview
- This repo includes a Netlify Function at `netlify/functions/supabase-key.js` that returns the Supabase anon key stored in the Netlify site environment variable `SUPABASE_ANON_KEY`.
- A redirect is provided so clients can request `/api/supabase-key` which maps to the function.

Setup
1. In Netlify site settings -> Build & deploy -> Environment, add:
   - `SUPABASE_ANON_KEY` = <your anon key>
   - (Optional) `SUPABASE_KEY_TOKEN` = <shared secret token>  // When set, clients must send this in `x-key-token` header.

2. Deploy to Netlify. The function will be available at `/.netlify/functions/supabase-key` and via `/api/supabase-key` (redirect).

Client usage example (no token):

fetch('/api/supabase-key', { cache: 'no-store' })
  .then(r => r.json())
  .then(j => console.log(j.anonKey));

Client usage with token (recommended):

fetch('/api/supabase-key', { headers: { 'x-key-token': 'YOUR_TOKEN' }, cache: 'no-store' })
  .then(r => r.json())
  .then(j => console.log(j.anonKey));

Security notes
- Only the anon key should be used here. Never expose service_role keys.
- If your site is public, consider enabling `SUPABASE_KEY_TOKEN` and keeping the token secret in your frontend build system or requesting the key server-side only when needed.
- For maximum safety, move sensitive DB operations to server-side endpoints that use a more privileged key and enforce authentication/authorization.
