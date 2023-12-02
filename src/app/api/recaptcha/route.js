import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req){
  const { token } = req.body;
  try {
    const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY}&response=${token}`,{},{headers: { "Content-Type": "application/x-www-form-urlencoded; charset=utf-8" }});
    if (response.data.success) {
      return NextResponse.json({ message: 'reCAPTCHA verification successful' })
    } else {
      return NextResponse.json({ message: 'reCAPTCHA verification failed' })
    }
  } catch (err) {
    return NextResponse.json({ message: 'Internal server error' })
  }
}