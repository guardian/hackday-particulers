import NavigationBar from "./components/navigationBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import SearchBarContainer from "./components/searchBarContainer";
import Logo from './components/logo'
import axios from 'axios';
import {useState} from 'react';
import ResultCard from "./components/resultCard";

function App() {
  const [results, setResults] = useState(null)

  const fetch = (url) => {
    axios.get(`http://localhost:8000/article?url=${url}`).then(response => {
      setResults(response.data)
      console.log(response.data);
    })
  }

  return (
    <div className="App">
        <NavigationBar />
        <SearchBarContainer fetch={fetch}/>
        <div className="container mt-4">
          <div className="row d-flex justify-content-center">
            <div className="col-12">
            {results && <ResultCard results={results} />} 
            </div>
          </div>
        </div>
        
    </div>
  );
}

export default App;
