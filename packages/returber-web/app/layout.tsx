import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';

import './globals.css';

import AppWrapper from '@/components/AppWrapper';



const font = Nunito({ subsets: ['latin'] });


export const metadata: Metadata = {
    title: 'returber',
    description: 'waste collection for the deposit return system',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
        >
            <body className={font.className}>
                <AppWrapper>
                    {children}
                </AppWrapper>
            </body>
        </html>
    );
}
