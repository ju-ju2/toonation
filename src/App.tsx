import GlobalContextContainer from '@/context/GlobalContext';
import Router from '@/routes';

function App() {
  return (
    <GlobalContextContainer>
      <Router />
    </GlobalContextContainer>
  );
}

export default App;
