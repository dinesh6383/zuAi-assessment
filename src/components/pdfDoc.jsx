"use client";
import React, { useEffect, useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import { base64ToBlob } from "@/lib/converToBase64";
import Spinner from "./spinner";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;

export default function PdfDoc(props) {
  const [numPages, setNumPages] = useState(null);
  const [blobUrl, setBlobUrl] = useState(null);

  useEffect(() => {
    const blob = base64ToBlob(props.url);
    blob
      .then((data) => {
        setBlobUrl(data);
      })
      .catch((err) => console.log(err));
  }, [props.url]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <>
      {blobUrl && (
        <Document
          loading={<Spinner />}
          file={blobUrl}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page
              width={props.width}
              height={props.height}
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              loading={null}
            />
          ))}
        </Document>
      )}
    </>
  );
}
