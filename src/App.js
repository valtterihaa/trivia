import './App.css';
import { Categories } from './components/categories';
import { Footer } from './components/footer';
import { Header } from './components/header';

function App() {
  return (<>
      <Header />
      <main>
        <Categories />
      </main> 
      <Footer />
  </>)
}

export default App;
