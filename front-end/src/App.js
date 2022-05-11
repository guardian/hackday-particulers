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
  const [loading, setLoading] = useState(false);

  const fetch = (url) => {
    setLoading(true);
    axios.get(`http://localhost:8000/article?url=${url}`).then(response => {
      setLoading(false);
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
              {loading &&
                <div className="fw-light text-center fs-2 text-muted"><i class="fas fa-compass fa-spin"></i> Loading...</div>
              }
            {results && <ResultCard results={results} />} 
            </div>
          </div>
        </div>
        
    </div>
  );
}

export default App;
