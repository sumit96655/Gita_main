// import React from 'react'

// function Likemindedpeoplecommunity() {
//   return (
//     <div className='likepeople'>
//         <h1>Likeminded people community</h1>
//     </div>
//   )
// }

// export default Likemindedpeoplecommunity


  import React, {useState} from 'react'
  import './pdf.css';
  // import { Document,Page } from 'react-pdf';

  import { Document, Page, pdfjs } from 'react-pdf';
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;
  // import { Document, Page } from 'react-pdf';


  function Likemindedpeoplecommunity() {

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({numPages}){
      setNumPages(numPages);
      setPageNumber(1);
    }

    function changePage(offSet){
      setPageNumber(prevPageNumber => prevPageNumber + offSet);
    }

    function changePageBack(){
      changePage(-1)
    }

    function changePageNext(){
      changePage(+1)
    }

    return (
      <div className="App">
        <header className="App-header">
          <Document file="./gita.pdf" onLoadSuccess={onDocumentLoadSuccess}>
            <Page height="600" pageNumber={pageNumber} />
          </Document>
          <p> Page {pageNumber} of {numPages}</p>
          { pageNumber > 1 && 
          <button onClick={changePageBack}>Previous Page</button>
          }
          {
            pageNumber < numPages &&
            <button onClick={changePageNext}>Next Page</button>
          }
        </header>
        {/* <center>
          <div>
            <Document file="C:\Users\sumit\website2\frontEnd\public\assign2.pdf" onLoadSuccess={onDocumentLoadSuccess}>
              {Array.from(
                new Array(numPages),
                (el,index) => (
                  <Page 
                    key={`page_${index+1}`}
                    pageNumber={index+1}
                  />
                )
              )}
            </Document>
          </div>
        </center> */}
      </div>
    );
  }

  export default Likemindedpeoplecommunity;