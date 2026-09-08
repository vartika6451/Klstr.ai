import { NextResponse } from 'next/server';
import { getEnv } from '@/lib/env';

export async function GET() {
  const env = getEnv();
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${env.GEMINI_API_KEY}`);
  const data = await res.json();
  return NextResponse.json(data);
}
