import { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
    params: Promise<{ name: string }>;
}

export default async function TypeLayout({ children, params }: LayoutProps) {
    const { name } = await params;
    
    // Pass the name to children through context or props
    // For now, we'll need to modify the child component to receive it
    return (
        <div data-type-name={name}>
            {children}
        </div>
    );
} 