import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import type { BikeStatus } from '@/types/database';

export async function GET(req: NextRequest) {
  const status = req.nextUrl.searchParams.get('status') as BikeStatus | null;

  try {
    const supabase = createServerClient();
    let query = supabase
      .from('bikes')
      .select('*, bike_photos(id, bike_id, storage_url, position, created_at)')
      .order('created_at', { ascending: false });

    if (status === 'free' || status === 'occupied') {
      query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ bikes: data });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
