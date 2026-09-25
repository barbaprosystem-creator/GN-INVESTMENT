const token = process.env.SUPABASE_ACCESS_TOKEN || '';
const ref = process.env.SUPABASE_PROJECT_REF || 'whqsbtsceaznuxicilby';

async function check() {
  const res = await fetch(`https://api.supabase.com/v1/projects/${ref}/database/query`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name;"
    })
  });

  const tables = await res.json();
  console.log('Public tables in Supabase:', tables);

  const ops = await fetch(`https://api.supabase.com/v1/projects/${ref}/database/query`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: "SELECT id, username, email, role, title FROM public.operators;"
    })
  });
  const operators = await ops.json();
  console.log('Operators in Supabase:', operators);
}

check().catch(console.error);
