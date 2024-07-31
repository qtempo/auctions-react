import { Context, use } from 'react'

export function useSafeContext<T>(context: Context<T | undefined>) {
  const ctx = use(context)
  if (ctx === undefined)
    throw new Error('Context Provider not found')
  return ctx as T
}