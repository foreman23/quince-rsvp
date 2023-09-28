import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './Main';
import DetailsEnglish from './DetailsEnglish';
import DetailsSpanish from './DetailsSpanish';

function App() {

  return (

    <Router>
      <Routes>
        <Route path='/' element={<Main></Main>}></Route>
        <Route path='/rsvp-1' element={<DetailsEnglish></DetailsEnglish>}></Route>
        <Route path='/rsvp-2' element={<DetailsSpanish></DetailsSpanish>}></Route>
      </Routes>
    </Router>


  );
}

export default App;
