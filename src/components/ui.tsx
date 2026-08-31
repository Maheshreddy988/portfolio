import * as React from 'react';
import { cn } from '@/lib/utils';

export const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'default'|'outline'|'ghost'|'link'|'destructive'; size?: 'default'|'sm'|'lg'|'icon' }>(( { className, variant='default', size='default', ...props }, ref) => <button ref={ref} className={cn('inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50', variant==='default'&&'bg-primary text-primary-foreground hover:bg-primary/90', variant==='outline'&&'border bg-background hover:bg-accent hover:text-accent-foreground', variant==='ghost'&&'hover:bg-accent hover:text-accent-foreground', variant==='link'&&'text-primary underline-offset-4 hover:underline', variant==='destructive'&&'bg-destructive text-destructive-foreground hover:bg-destructive/90', size==='default'&&'h-10 px-4 py-2', size==='sm'&&'h-9 rounded-md px-3', size==='lg'&&'h-11 rounded-md px-8', size==='icon'&&'h-10 w-10', className)} {...props} />);
Button.displayName='Button';

export function Card({className,...props}: React.HTMLAttributes<HTMLDivElement>) { return <div className={cn('rounded-lg border bg-card text-card-foreground shadow-soft',className)} {...props}/>; }
export function CardHeader({className,...props}: React.HTMLAttributes<HTMLDivElement>) { return <div className={cn('flex flex-col space-y-1.5 p-6',className)} {...props}/>; }
export function CardTitle({className,...props}: React.HTMLAttributes<HTMLHeadingElement>) { return <h3 className={cn('text-lg font-semibold leading-none tracking-tight',className)} {...props}/>; }
export function CardDescription({className,...props}: React.HTMLAttributes<HTMLParagraphElement>) { return <p className={cn('text-sm text-muted-foreground',className)} {...props}/>; }
export function CardContent({className,...props}: React.HTMLAttributes<HTMLDivElement>) { return <div className={cn('p-6 pt-0',className)} {...props}/>; }
export function CardFooter({className,...props}: React.HTMLAttributes<HTMLDivElement>) { return <div className={cn('flex items-center p-6 pt-0',className)} {...props}/>; }

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({className,...props},ref)=><input ref={ref} className={cn('flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',className)} {...props}/>);
Input.displayName='Input';
export function Label({className,...props}: React.LabelHTMLAttributes<HTMLLabelElement>) { return <label className={cn('text-sm font-medium leading-none',className)} {...props}/>; }
export function Badge({className,...props}: React.HTMLAttributes<HTMLDivElement>) { return <div className={cn('inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors',className)} {...props}/>; }
export function Separator({className,...props}: React.HTMLAttributes<HTMLDivElement>) { return <div className={cn('shrink-0 bg-border h-[1px] w-full',className)} {...props}/>; }
