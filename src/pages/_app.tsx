import axios from "axios";
import "../../styles/globals.css";
import Head from 'next/head'


axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_API_BASE_ENDPOINT}`

function MyApp({ Component, pageProps }) {
    return (
        <div className="grid h-screen font-serif text-white bg-gray-900 place-items-center">
            <Head>
                <title>EraShare</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
            </Head>
            <div>
                <Component  {...pageProps} />
            </div>
        </div>
    );
}

export default MyApp;
