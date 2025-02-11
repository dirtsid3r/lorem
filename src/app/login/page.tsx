'use client'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md py-12">
      <h1 className="mb-8 text-center font-serif text-3xl font-bold">
        Welcome to LoremIpsum
      </h1>
      <div className="rounded-lg border border-gray-200 p-6 shadow-sm">
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="light"
          providers={['google', 'github']}
          redirectTo={`${process.env.NEXT_PUBLIC_APP_URL}/dashboard`}
        />
      </div>
    </div>
  )
} 