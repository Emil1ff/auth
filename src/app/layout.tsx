import React from 'react';
import "./globals.css"; 

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body cz-shortcut-listen="true" className="bg-gray-100 text-gray-900">

        <main>
          {children}
        </main>

        
      </body>
    </html>
  );
}
