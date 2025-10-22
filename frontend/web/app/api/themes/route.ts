import { NextResponse } from 'next/server';
import themes from '../../../themes.json';

export async function GET() {
  return NextResponse.json(themes);
}
