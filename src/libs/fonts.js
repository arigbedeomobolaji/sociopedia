import {
    Inter as Sans,
    Bitter as Serif,
    Fira_Code as Mono,
    Lobster as Heading
  } from '@next/font/google';


  export const sans = Sans({
    subsets: ['latin'],
    // this will be the css variable
    variable: '--font-sans',
  });

  export const serif = Serif({
    subsets: ['latin'],
    variable: '--font-serif',
  });

  export const mono = Mono({
    subsets: ['latin'],
    variable: '--font-mono',
  });

  export const heading = Heading({
    subsets: ['latin'],
    variable: '--font-heading',
    weight: '400',
  })