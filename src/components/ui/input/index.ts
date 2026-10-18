export { default as Input } from './Input.vue'
import { cn } from '@/lib/utils.js'
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export const inputVariants = cva('', {
  variants: {
    variant: {
      default: cn(
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-3',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive'
      ),
      ghost: cn(
        'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground h-9 w-full min-w-0 rounded-md bg-transparent px-3 py-1 shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        'text-[24px]'
      ),
      outline: cn(
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-3',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 px-2 py-0.5 rounded-sm'
      )
    }
  },
  defaultVariants: {
    variant: 'default'
  }
})
export type InputVariants = VariantProps<typeof inputVariants>
