import {useRef} from 'react';
import {MyNavbar} from './components';
import Container from 'react-bootstrap/Container';
import {Routes, Route} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';
import {createContext} from 'react';
import {Home, NotFound} from './pages';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime           : 10*60*1000, // 10 minutes
      refetchOnWindowFocus: false,
    },
  },
});

export const JwtContext = createContext<string|null>(null);

export const Router = () => {
  const windowSize = useRef([window.innerWidth, window.innerHeight]);
  const width = windowSize.current[0];
  const isSmallWidth = width<700;

  return (
    <Container className={[
      isSmallWidth ? 'p-2' : 'p-5',
      isSmallWidth ? 'w-100' : 'w-75'
    ].join(' ')}>
      <QueryClientProvider client={queryClient}>
        <MyNavbar />
        <Routes>
          <Route index element={<Home />} />
          {/* <Route path="/article/:id" element={<Article />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ReactQueryDevtools initialIsOpen={false}/>
      </QueryClientProvider>
    </Container>
  );
};
