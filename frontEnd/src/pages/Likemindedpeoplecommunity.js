// import React, { useCallback, useState } from 'react';
// import { useResizeObserver } from '@wojtekmaj/react-hooks';
// import { pdfjs, Document, Page } from 'react-pdf';
// import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
// import 'react-pdf/dist/esm/Page/TextLayer.css';

// import './sample.css';
// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

// const options = {
//   cMapUrl: '/cmaps/',
//   standardFontDataUrl: '/standard_fonts/',
// };

// const resizeObserverOptions = {};

// const maxWidth = 800;

// const Sample = () => {
//   const [file, setFile] = useState('./gita.pdf');
//   const [numPages, setNumPages] = useState();
//   const [containerRef, setContainerRef] = useState(null);
//   const [containerWidth, setContainerWidth] = useState();

//   const onResize = useCallback((entries) => {
//     const [entry] = entries;

//     if (entry) {
//       setContainerWidth(entry.contentRect.width);
//     }
//   }, []);

//   useResizeObserver(containerRef, resizeObserverOptions, onResize);

//   const onFileChange = (event) => {
//     const { files } = event.target;

//     if (files && files[0]) {
//       setFile(files[0] || null);
//     }
//   };

//   const onDocumentLoadSuccess = ({ numPages: nextNumPages }) => {
//     setNumPages(nextNumPages);
//   };

//   return (
//     <div className="Example">
//       <header>
//         <h1>react-pdf sample page</h1>
//       </header>
//       <div className="Example__container">
//         <div className="Example__container__load">
//           <label htmlFor="file">Load from file:</label>{' '}
//           <input onChange={onFileChange} type="file" />
//         </div>
//         <div className="Example__container__document" ref={setContainerRef}>
//           <Document file={file} onLoadSuccess={onDocumentLoadSuccess} options={options}>
//             {Array.from(new Array(numPages), (el, index) => (
//               <Page
//                 key={`page_${index + 1}`}
//                 pageNumber={index + 1}
//                 width={containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth}
//               />
//             ))}
//           </Document>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sample;

// import React, { useCallback, useState } from 'react';
// import { useResizeObserver } from '@wojtekmaj/react-hooks';
// import { pdfjs, Document, Page } from 'react-pdf';
// import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
// import 'react-pdf/dist/esm/Page/TextLayer.css';

// import './sample.css';
// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

// const options = {
//   cMapUrl: '/cmaps/',
//   standardFontDataUrl: '/standard_fonts/',
// };

// const resizeObserverOptions = {};

// const maxWidth = 800;

const Sample = () => {
//   const [file, setFile] = useState('./gita.pdf');
//   const [numPages, setNumPages] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [containerRef, setContainerRef] = useState(null);
//   const [containerWidth, setContainerWidth] = useState();

//   const onResize = useCallback((entries) => {
//     const [entry] = entries;
  
//     if (entry && entry.contentRect.width !== containerWidth) {
//       setContainerWidth(entry.contentRect.width);
//     }
//   }, [containerWidth]);
  
//   useResizeObserver(containerRef, resizeObserverOptions, onResize);

//   const onFileChange = (event) => {
//     const { files } = event.target;

//     if (files && files[0]) {
//       setFile(files[0] || null);
//     }
//   };

//   const onDocumentLoadSuccess = ({ numPages: nextNumPages }) => {
//     setNumPages(nextNumPages);
//     setCurrentPage(1);
//   };

//   const goToNextPage = () => {
//     if (currentPage < numPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const goToPrevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   return (
//     <div className="Example">
      
//       <div className="Example__container">
//         <div className="Example__container__document" ref={setContainerRef}>
//           <Document file={file} onLoadSuccess={onDocumentLoadSuccess} options={options}>
//             <Page
//               pageNumber={currentPage}
//               width={containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth}
//             />
//           </Document>
//           <div>
//             <button onClick={goToPrevPage} disabled={currentPage === 1}>
//               Previous Page
//             </button>
//             <span> Page {currentPage} of {numPages} </span>
//             <button onClick={goToNextPage} disabled={currentPage === numPages}>
//               Next Page
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
};

export default Sample;