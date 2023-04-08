import { useState, useRef } from 'react';
import { PDFDocument } from 'pdf-lib';
import styles from '@/styles/PDF.module.css';

import { useEffect } from 'react';

const PDFMerger: React.FC = () => {
  const [pdfs, setPdfs] = useState<File[]>([]);
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const [mergedPdfName, setMergedPdfName] = useState<string>('merged.pdf');
  const draggedItem = useRef<number | null>(null);
  const [githubStars, setGithubStars] = useState<number>(0);
  const fetchGithubStars = async () => {
    const response = await fetch(
      'https://api.github.com/repos/USERNAME/REPOSITORY'
    );
    const data = await response.json();
    setGithubStars(data.stargazers_count);
  };

  useEffect(() => {
    fetchGithubStars();
  }, []);

  const handlePDFInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      const pdfFiles = Array.from(files).filter(
        (file) => file.type === 'application/pdf'
      );
      if (pdfFiles.length > 0) {
        setPdfs((prevPdfs) => [...prevPdfs, ...pdfFiles]);
      }
    }
  };

  const handleMergedPdfNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMergedPdfName(e.target.value);
  };

  const handleRemovePDF = (index: number) => {
    setPdfs((prevPdfs) => prevPdfs.filter((_, i) => i !== index));
    setThumbnails((prevThumbnails) =>
      prevThumbnails.filter((_, i) => i !== index)
    );
  };

  const handleSortPDFs = () => {
    const sortedPdfs = [...pdfs].sort((a, b) => a.name.localeCompare(b.name));
    const sortedThumbnails = sortedPdfs.map((pdf) => {
      const index = pdfs.findIndex(
        (originalPdf) => originalPdf.name === pdf.name
      );
      return thumbnails[index];
    });

    setPdfs(sortedPdfs);
    setThumbnails(sortedThumbnails);
  };

  const handleMergePDFs = async () => {
    if (pdfs.length === 0) {
      alert('Please select at least one PDF to merge.');
      return;
    }

    // Show a loading spinner while the PDFs are being merged
    showAlert('Merging PDFs...', 'info');

    const mergedPdfDoc = await PDFDocument.create();
    for (const pdf of pdfs) {
      const pdfBytes = await pdf.arrayBuffer();
      const sourcePdfDoc = await PDFDocument.load(pdfBytes);
      const sourcePageIndices = sourcePdfDoc.getPageIndices();
      const copiedPages = await mergedPdfDoc.copyPages(
        sourcePdfDoc,
        sourcePageIndices
      );
      for (const page of copiedPages) {
        mergedPdfDoc.addPage(page);
      }
    }

    const mergedPdfBytes = await mergedPdfDoc.save();
    const mergedPdfBlob = new Blob([mergedPdfBytes], {
      type: 'application/pdf',
    });
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(mergedPdfBlob);
    downloadLink.download = mergedPdfName;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    // Show a success message when the merge is complete
    showAlert('PDFs merged successfully!', 'success');
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    e.dataTransfer.setData('text/plain', ''); // Required for Firefox
    draggedItem.current = index;
    e.dataTransfer.effectAllowed = 'move';

    // Add visual cue by highlighting the dragged PDF
    e.currentTarget.classList.add(styles.draggedPdf);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    if (draggedItem.current !== null && draggedItem.current !== index) {
      const currentDraggedItem = draggedItem.current;
      const newPdfs = [...pdfs];
      const newThumbnails = [...thumbnails];
      if (typeof currentDraggedItem === 'number') {
        const dragItem = newPdfs[currentDraggedItem];
        const dragThumbnail = newThumbnails[currentDraggedItem];
        newPdfs.splice(currentDraggedItem, 1);
        newThumbnails.splice(currentDraggedItem, 1);
        if (dragItem.type === 'application/pdf') {
          newPdfs.splice(index, 0, dragItem);
          newThumbnails.splice(index, 0, dragThumbnail);
          setPdfs(newPdfs);
          setThumbnails(newThumbnails);
          // Add visual cue by highlighting the dropped PDF
          const droppedPdf = document.getElementById(`pdf-${index}`);
          droppedPdf?.classList.add(styles.droppedPdf);
          showAlert('PDF moved successfully!', 'success');
        }
      }
    }
    draggedItem.current = null;
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';

    // Add visual cue by highlighting the drop target
    e.currentTarget.classList.add(styles.dropTarget);
  };

  const showAlert = (message: string, type: 'success' | 'error' | 'info') => {
    const alertEl = document.createElement('div');
    alertEl.className = `${styles.pdfError} ${
      type === 'success' ? styles.pdfSuccess : styles.pdfError
    }`;
    alertEl.textContent = message;
    document.body.appendChild(alertEl);
    setTimeout(() => {
      document.body.removeChild(alertEl);
    }, 3000);
  };

  return (
    <>
      <div className={styles.container}>
        {/* Add the GitHub icon and stars count */}
        <div className={styles.github}>
          <a
            href="https://github.com/Sudo-Ivan/simple-pdf-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa fa-github" aria-hidden="true"></i>
            <span className={styles.githubStars}>{githubStars}</span>
          </a>
        </div>

        <div className={styles.header}>
          <h1>PDF Merger</h1>
        </div>
        <div className={styles.pdfInput}>
          <input type="file" multiple onChange={handlePDFInputChange} />
        </div>
        <div className={styles.pdfList}>
          {pdfs &&
            pdfs.map((pdf, index) => (
              <div
                key={pdf.name}
                className={styles.pdfItem}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDrop={(e) => handleDrop(e, index)}
                onDragOver={(e) => handleDragOver(e)}
              >
                <div className={styles.pdfName}>{pdf.name}</div>
                <div className={styles.pdfRemove}>
                  <button onClick={() => handleRemovePDF(index)}>X</button>
                </div>
              </div>
            ))}
        </div>
        <div className={styles.pdfActions}>
          <button className={styles.pdfButton} onClick={handleSortPDFs}>
            Sort
          </button>
          <input
            type="text"
            value={mergedPdfName}
            onChange={handleMergedPdfNameChange}
            placeholder="Enter merged PDF filename"
            className={styles.pdfFilename}
          />
          <button
            className={`${styles.pdfButton} ${
              pdfs.length === 0 ? styles.pdfButtonDisabled : ''
            }`}
            onClick={handleMergePDFs}
            disabled={pdfs.length === 0}
          >
            Merge
          </button>
        </div>
      </div>
      <footer className={styles.footer}>
        Free and open-source, created by{' '}
        <a
          href="https://github.com/Sudo-Ivan"
          target="_blank"
          rel="noopener noreferrer"
        >
          Sudo-Ivan
        </a>
      </footer>
    </>
  );
};
export default PDFMerger;
