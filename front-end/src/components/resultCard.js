import React, {useState} from "react";
import Table from "react-bootstrap/Table";

const ResultCard = ({ results }) => {
  const [showDetails, setShowDetails ] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  }

  return (
    <div className="card mb-4">
      {/* <h5 className="card-header">Papers referenced</h5> */}
      <div className="card-body">
        <h3 className="d-flex card-title justify-content-between align-items-start mb-4 fw-light">
          <a className="text-dark text-decoration-none" href={results.url}>{results.title}</a>
        </h3>
        <h4 className="card-subtitle mb-4">
          <span>Journal name: <em>{results.journalTitle}</em></span>
          
        </h4>
        <div className="mb-4">
          <span className={[
            "badge",
            results.journalImpact >= 3 ? "bg-success" : results.journalImpact >= 1 ? "bg-warning" : "bg-danger",
            results.journalImpact >= 3 ? "text-light" : results.journalImpact >= 1 ? "text-dark" : "text-light",
            ].join(" ")}>Journal Impact: {results.journalImpact}</span>
          <span className="badge ms-2 bg-secondary">{results.citationCount} article citations</span>
        </div>
        {results.articleRetracted && 
          <div className="alert alert-warning fw-bold small" role="alert">
            <i className="fas fa-exclamation-circle pe-2" />
            This article was retracted after it was published. Check the article page for more information.
          </div>
        }    
        {results.organisations.some(org => org.isDisinformationOrganisation) && 
          <div className="alert alert-warning fw-bold small" role="alert">
          <i className="fas fa-exclamation-circle pe-2" />
          This article is associated with a known disinformation organisation. Check <a href="https://www.desmog.com">DeSmog</a> for more information.
        </div>
        }
        <h6 className="fw-light">Organisations associated with this article</h6>
        <div className="d-flex flex-wrap mb-2">
          {results.organisations.map((o) => <span key={o.name} className={[
            "badge me-2 mb-2 text-light",
            o.isDisinformationOrganisation ? "bg-danger" : "bg-secondary",
            ].join(" ")}>{o.name}</span>)}
        </div>
        <button className="btn btn-primary btn-sm" onClick={toggleDetails}>{showDetails ? 'Hide' : 'Show'} details <i className={["fas", showDetails ? "fa-angle-up" : "fa-angle-down"].join(" ")}></i></button>
        <div className="mt-2 small" style={{ display: showDetails ? "block" : "none" }}>
          {results.acknowledgements}
        </div>
      </div>  
    </div>
  );
};

export default ResultCard;