import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './Main';
import DetailsEnglish from './DetailsEnglish';

function App() {

  return (

    <Router>
      <Routes>
        <Route path='/' element={<Main></Main>}></Route>
        <Route path='/rsvp-1' element={<DetailsEnglish></DetailsEnglish>}></Route>
      </Routes>
    </Router>


  );
}

export default App;
