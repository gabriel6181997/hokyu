import 'src/styles/global.css';
import '@fortawesome/fontawesome-free/css/all.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }:AppProps) {
  return (
  <ThemeProvider attribute="class">
    <Component {...pageProps} />
  </ThemeProvider>
  )
}

export default MyApp
