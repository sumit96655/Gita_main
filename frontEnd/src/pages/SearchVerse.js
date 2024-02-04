
import React, { useCallback, useState } from 'react';
import { useResizeObserver } from '@wojtekmaj/react-hooks';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

import './sample.css';
import { debounce } from 'lodash';

import { SearchBar } from '../SearchBar';
import { SearchResultsList } from '../SearchResultList';
import { Link } from 'react-router-dom';

import { PDFDownloadLink } from '@react-pdf/renderer';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
};

const resizeObserverOptions = {};

const maxWidth = 800;

const Sample = () => {
  const [file, setFile] = useState('./gita3.pdf');
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [containerRef, setContainerRef] = useState(null);
  const [containerWidth, setContainerWidth] = useState();

  const debouncedResize = debounce((entries) => {
    const [entry] = entries;
  
    if (entry && entry.contentRect) {
      setContainerWidth(entry.contentRect.width);
    }
  }, 200); // Adjust the debounce delay as needed
  
  const onResize = useCallback((entries) => {
    debouncedResize(entries);
  }, []);
  

  useResizeObserver(containerRef, resizeObserverOptions, onResize);



  const onDocumentLoadSuccess = ({ numPages: nextNumPages }) => {
    setNumPages(nextNumPages);
    setCurrentPage(1);
  };

  const goToNextPage = () => {
    if (currentPage < numPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const [results, setResults] = useState([]);
  return (
    <div className='flex justify-around'>
    <div className="Example flex ">


      <div className="Example__container">

        <div className="Example__container__document" ref={setContainerRef}>
          <Document file={file} onLoadSuccess={onDocumentLoadSuccess} options={options}>
            <Page
              pageNumber={currentPage}
              width={containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth}
            />
          </Document>
          <div className='flex justify-between ml-2 mr-3'>
            <button onClick={goToPrevPage} disabled={currentPage === 1}>
              Previous Page
            </button>
            <span> Page {currentPage} of {numPages} </span>
            <button onClick={goToNextPage} disabled={currentPage === numPages}>
              Next Page
            </button>
          </div>
        </div>
      </div>

    </div>
      <div className="search-bar-container w-[30rem] pt-24 ">
        <SearchBar setResults={setResults} />
        {results && results.length > 0 && <SearchResultsList results={results} />}
        <div className='flex justify-evenly mt-20 '>
          <Link to='/home' className='bg-black shadow-lg shadow-black  active:shadow-lg text-white pt-14 pb-12 pl-8 rounded-xl text-2xl w-40'>ChatBot</Link>
          <Link to='/reports' className='bg-black shadow-lg shadow-black  active:shadow-lg text-white pt-12 pb-12 pl-8 rounded-xl text-2xl w-40'>Chapter Summary</Link>
          {/* <button className='bg-black shadow-lg shadow-black  active:shadow-lg text-white p-12 rounded-xl'>Discussion Forum</button> */}
          
          
        </div>
      </div>
      </div>
      
  );
};




export default Sample;
