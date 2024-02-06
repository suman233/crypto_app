import Wrapper from "@/layout/Wrapper/Wrapper";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider, dehydrate } from "react-query";

const queryClient = new QueryClient()
// const dehydratedState = dehydrate(queryClient, {
//   shouldDehydrateQuery,
//   shouldDehydrateMutation,
// })
export default function App({ Component, pageProps }: AppProps) {
  return (

    <QueryClientProvider client={queryClient}>
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    </QueryClientProvider>
  )
}
