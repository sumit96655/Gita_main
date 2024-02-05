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
import Loading from './Loading';

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
  const [selectedPdf, setSelectedPdf] = useState(1); // 1 or 2 depending on the initially selected PDF
  const [loading, setLoading] = useState(false);

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

  const handlePdfButtonClick = (pdfNumber) => {
    setSelectedPdf(pdfNumber);
    setFile(`./gita${pdfNumber}.pdf`); // Adjust the file name pattern as needed
  };

  const [results, setResults] = useState([]);
  
  return (
    <div className='flex justify-around'>
      <div className='flex flex-col mt-20 space-y-3 '>
        <label className='font-bold text-xl'>SELECT LANGUAGE</label>
          <button onClick={() => handlePdfButtonClick(1)} className='bg-black text-white rounded-xl text-lg w-28'>English</button>
          <button onClick={() => handlePdfButtonClick(2)} className='bg-black text-white rounded-xl text-lg w-28'>Hindi</button>
          <button onClick={() => handlePdfButtonClick(3)} className='bg-black text-white rounded-xl text-lg w-28'>Marathi</button>
          <button onClick={() => handlePdfButtonClick(4)} className='bg-black text-white rounded-xl text-lg w-28'>Sanskrit</button>
          <button onClick={() => handlePdfButtonClick(5)} className='bg-black text-white rounded-xl text-lg w-28'>Tamil</button>
          <button onClick={() => handlePdfButtonClick(6)} className='bg-black text-white rounded-xl text-lg w-28'>Bengali</button>
          <button onClick={() => handlePdfButtonClick(7)} className='bg-black text-white rounded-xl text-lg w-28'>Kannada</button>
      </div>
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
        </div>
      </div>
    </div>
  );
};

export default Sample;
