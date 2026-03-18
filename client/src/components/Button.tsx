import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode
    variant?: 'primary' | 'secondary' | 'danger'
}

export default function Button({
    children,
    variant = 'primary',
    ...props
}: ButtonProps) {
    const colors = {
        primary: '#2563eb',
        secondary: '#6b7280',
        danger: '#dc2626',
    }

    return (
        <button
            {...props}
            style={{
                backgroundColor: colors[variant],
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 14px',
                cursor: 'pointer',
                fontWeight: 600,
                marginRight: '8px',
            }}
        >
            {children}
        </button>
    )
}