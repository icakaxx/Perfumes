'use client';

import { useEffect, useState } from 'react';
import { supabaseBrowser } from '@/lib/supabase/client';

export default function TestClient() {
  const [rows, setRows] = useState<any[]>([]);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const supabase = supabaseBrowser();
    supabase.from('products').select('*').then(({ data, error }) => {
      if (error) setErr(error.message);
      else setRows(data ?? []);
    });
  }, []);

  return <pre>{err ?? JSON.stringify(rows, null, 2)}</pre>;
}

