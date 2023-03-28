import {useState, useEffect} from 'react';
import {MyNavbar} from './components';
import Container from 'react-bootstrap/Container';
import {Routes, Route} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';
import {createContext} from 'react';
import {Home, Details, NotFound} from './pages';

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
  function useWindowSize () {
    const [windowSize, setWindowSize] = useState({
      width : 0,
      height: 0,
    });
    useEffect(() => {
      function handleResize () {
        setWindowSize({
          width : window.innerWidth,
          height: window.innerHeight,
        });
      }
      window.addEventListener('resize', handleResize);
      handleResize();
      return () => window.removeEventListener('resize', handleResize);
    }, []);
    return windowSize;
  }

  const windowSize = useWindowSize();
  const isSmallWidth = windowSize.width<1100;

  return (
    <Container className={[
      isSmallWidth ? 'p-2' : 'p-5',
      isSmallWidth ? 'w-100' : 'w-75'
    ].join(' ')}>
      <QueryClientProvider client={queryClient}>
        <MyNavbar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/pokemon/:id" element={<Details />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ReactQueryDevtools initialIsOpen={false}/>
      </QueryClientProvider>
    </Container>
  );
};
