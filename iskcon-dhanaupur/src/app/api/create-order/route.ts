import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { amount, currency = 'INR' } = await req.json()

    const keyId     = process.env.RAZORPAY_KEY_ID
    const keySecret = process.env.RAZORPAY_KEY_SECRET

    if (!keyId || !keySecret) {
      return NextResponse.json({ error: 'Razorpay keys not configured' }, { status: 500 })
    }

    const credentials = Buffer.from(`${keyId}:${keySecret}`).toString('base64')

    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method:  'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': `Basic ${credentials}`,
      },
      body: JSON.stringify({
        amount,
        currency,
        receipt:  `receipt_${Date.now()}`,
        notes:    { source: 'ISKCON Dhanaupur Website' },
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('Razorpay error:', data)
      return NextResponse.json({ error: data.error?.description || 'Order creation failed' }, { status: 400 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
