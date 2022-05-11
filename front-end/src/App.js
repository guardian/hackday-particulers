import NavigationBar from "./components/navigationBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import SearchBarContainer from "./components/searchBarContainer";
import Logo from './components/logo'
import axios from 'axios';
import {useState} from 'react';
import ResultsPage from "./components/resultsPage";

const resultsJson = {
  "title": "The Relationship Between Greenspace Exposure and Psychopathology Symptoms: A Systematic Review",
  "acknowledgements": "The authors report no biomedical financial interests or potential conflicts of interest.",
  "organisations": [{"name": "organization 1", "isDisinformationOrganisation":true},{"name": "organization 2", "isDisinformationOrganisation":true},{"name": "organization 3", "isDisinformationOrganisation":true},],
  "journalImpact": 3,
  "journalTitle": "Biological Psychiatry Global Open Science",
  "url": "https://www.sciencedirect.com/science/article/pii/S266717432200009X"
}

function App() {
  const [result, setResult] = useState(null)

  const fetch = (url) => {
    axios.get(`http://10.249.16.51:3000/article?url=${url}`).then(response => {
      setResult(response.data)
      console.log(response.data)
    })
  }

  return (
    <div className="App">
        <NavigationBar />
        <Logo />
        <SearchBarContainer fetch={fetch}/>
        <div>
          <ResultsPage results={resultsJson} />
        </div>
        
    </div>
  );
}

export default App;
