import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  // If you had logic before, put it here.
  return NextResponse.next()
}
