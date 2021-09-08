import './App.css';
import { Categories } from './components/categories';
import { Footer } from './components/footer';
import { Header } from './components/header';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Quest } from './components/quest';

function App() {
  return (<>
      <Router>
        <Header />
        <main>
          <Route exact path="/">
            <Categories />
          </Route>
          <Route path="/quest">
            <Quest />
          </Route>
        </main> 
        <Footer />
      </Router>
  </>)
}

export default App;
