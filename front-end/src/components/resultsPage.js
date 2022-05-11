import React from "react";
import Table from "react-bootstrap/Table";

const ResultsPage = ({ results }) => {
  return (
    <div className="results-container">
      
      <Table striped bordered hover>
        <thead>
          <tr>
            <td>Article Title</td>
            <td><a href={results.url}>{results.title}</a></td>
          </tr>
        </thead>
        <tbody>   
          <tr>
            <td>Journal Title</td>
            <td>{results.journalTitle}</td>
          </tr>
          <tr>
            <td>Journal Impact Score</td>
            <td>{results.journalImpact}</td>
          </tr>
          <tr>
            <td>Organisations</td>
            <td>
              {results.organisations.map((org) => (
                <ul>
                  <li>{org.name}</li>
                </ul>
              ))}
            </td>
          </tr>
          <tr>
            <td>Acknowledgements</td>
            <td>{results.acknowledgements}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default ResultsPage;
