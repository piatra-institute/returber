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
    modal,
    children,
}: Readonly<{
    modal: React.ReactNode;
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={font.className}>
                <AppWrapper>
                    <>
                        {modal}
                        {children}
                    </>
                </AppWrapper>
            </body>
        </html>
    );
}
