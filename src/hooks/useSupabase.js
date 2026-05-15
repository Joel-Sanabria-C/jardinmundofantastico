'use client'
// src/hooks/useSupabase.js
// ─────────────────────────────────────────────
// Hook para usar Supabase en Client Components
// Uso: const { supabase, user } = useSupabase()
// ─────────────────────────────────────────────
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export function useSupabase() {
  const supabase = createClient()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getInitialUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }

    getInitialUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  return { supabase, user, loading }
}
