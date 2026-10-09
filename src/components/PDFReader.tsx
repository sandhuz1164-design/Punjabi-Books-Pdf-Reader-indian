import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, RotateCw, X, BookOpen } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';

// Set up the worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

interface PDFPage {
  pageNumber: number;
  rendered: boolean;
}

interface PDFReaderProps {
  darkMode: boolean;
  onBack: () => void;
}

export default function PDFReader({ darkMode, onBack }: PDFReaderProps) {
  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [scale, setScale] = useState(1.2);
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');
  const [rotation, setRotation] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const renderPage = useCallback(async (pageNum: number) => {
    if (!pdfDoc || !canvasRef.current) return;

    setIsLoading(true);
    try {
      const page = await pdfDoc.getPage(pageNum);
      const viewport = page.getViewport({ scale, rotation });
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      if (!context) return;

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };

      await page.render(renderContext).promise;
    } catch (err) {
      console.error('Error rendering page:', err);
    } finally {
      setIsLoading(false);
    }
  }, [pdfDoc, scale, rotation]);

  useEffect(() => {
    if (pdfDoc) {
      renderPage(currentPage);
    }
  }, [pdfDoc, currentPage, scale, rotation, renderPage]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setError('Please upload a valid PDF file.');
      return;
    }

    setError('');
    setIsLoading(true);
    setFileName(file.name);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      setPdfDoc(pdf);
      setTotalPages(pdf.numPages);
      setCurrentPage(1);
    } catch (err) {
      setError('Failed to load PDF. The file might be corrupted or password-protected.');
      console.error('PDF load error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handlePageInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const value = parseInt((e.target as HTMLInputElement).value);
      if (!isNaN(value)) {
        goToPage(value);
      }
    }
  };

  // Upload screen
  if (!pdfDoc) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            PDF Book Reader
          </h2>
          <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Upload any PDF book and read it right here in your browser
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all hover:scale-[1.01] ${
            darkMode
              ? 'border-gray-600 hover:border-amber-500 bg-gray-800/50'
              : 'border-amber-300 hover:border-amber-500 bg-white'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={handleFileUpload}
            className="hidden"
          />
          <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
            darkMode ? 'bg-amber-900/30' : 'bg-amber-100'
          }`}>
            <Upload className={`w-10 h-10 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`} />
          </div>
          <h3 className="text-xl font-semibold mb-2">Drop your PDF here or click to browse</h3>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Supports any PDF file • Read directly in browser • No upload to server
          </p>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-center"
          >
            {error}
          </motion.div>
        )}

        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 text-center"
          >
            <div className="inline-block w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
            <p className={`mt-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Loading PDF...</p>
          </motion.div>
        )}

        {/* Recommendations Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12"
        >
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-600" />
            Other Free Online PDF Readers You Can Try
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                name: "Adobe Acrobat Reader",
                desc: "Industry standard. Free viewing, annotations, and form filling.",
                url: "https://www.adobe.com/acrobat/online/pdf-reader.html",
                badge: "Most Popular"
              },
              {
                name: "PDFgear",
                desc: "100% free, no ads, no watermarks. Full PDF editing suite.",
                url: "https://www.pdfgear.com",
                badge: "Best Free"
              },
              {
                name: "Foxit PDF Reader",
                desc: "Lightweight and fast. Great for reading and basic annotations.",
                url: "https://www.foxit.com/pdf-reader/",
                badge: "Lightweight"
              },
              {
                name: "Sumatra PDF",
                desc: "Open source, ultra-fast. Supports PDF, ePub, MOBI, and more.",
                url: "https://www.sumatrapdfreader.org/",
                badge: "Open Source"
              },
              {
                name: "Librera Reader",
                desc: "Feature-rich mobile reader for PDF, EPUB, MOBI formats.",
                url: "https://librera.mobi/",
                badge: "Mobile"
              },
              {
                name: "Xodo PDF",
                desc: "Read, annotate, and collaborate on PDFs. Great free tier.",
                url: "https://xodo.com",
                badge: "Collaboration"
              }
            ].map((reader, i) => (
              <a
                key={i}
                href={reader.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`block p-4 rounded-xl border transition-all hover:scale-[1.02] hover:shadow-lg ${
                  darkMode
                    ? 'border-gray-700 bg-gray-800 hover:border-amber-600/50'
                    : 'border-amber-100 bg-white hover:border-amber-300 hover:shadow-amber-100'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-bold">{reader.name}</h4>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    darkMode ? 'bg-amber-900/30 text-amber-400' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {reader.badge}
                  </span>
                </div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {reader.desc}
                </p>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  // Reader view
  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      {/* Reader Toolbar */}
      <div className={`flex items-center justify-between px-4 py-2 border-b flex-wrap gap-2 ${
        darkMode ? 'border-gray-700 bg-gray-800' : 'border-amber-200 bg-white'
      }`}>
        <div className="flex items-center gap-3">
          <button
            onClick={() => { setPdfDoc(null); setFileName(''); setCurrentPage(1); }}
            className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-amber-100'}`}
            title="Close PDF"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-red-500" />
            <span className="text-sm font-medium truncate max-w-[200px]">{fileName}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Zoom controls */}
          <button
            onClick={() => setScale(Math.max(0.5, scale - 0.2))}
            className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-amber-100'}`}
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className={`text-xs font-mono min-w-[40px] text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={() => setScale(Math.min(3, scale + 0.2))}
            className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-amber-100'}`}
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          <div className={`w-px h-6 mx-1 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>

          {/* Rotation */}
          <button
            onClick={() => setRotation((rotation + 90) % 360)}
            className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-amber-100'}`}
            title="Rotate"
          >
            <RotateCw className="w-4 h-4" />
          </button>
        </div>

        {/* Page navigation */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage <= 1}
            className={`p-2 rounded-lg transition-colors disabled:opacity-30 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-amber-100'}`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-1">
            <input
              type="text"
              defaultValue={currentPage}
              key={currentPage}
              onKeyDown={handlePageInput}
              className={`w-12 text-center text-sm py-1 rounded border ${
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-amber-50 border-amber-200 text-gray-900'
              }`}
            />
            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              / {totalPages}
            </span>
          </div>
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className={`p-2 rounded-lg transition-colors disabled:opacity-30 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-amber-100'}`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* PDF Canvas */}
      <div
        ref={containerRef}
        className={`flex-1 overflow-auto flex justify-center p-4 ${
          darkMode ? 'bg-gray-900' : 'bg-gray-100'
        }`}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-10">
            <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <div className={`shadow-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <canvas ref={canvasRef} className="block" />
        </div>
      </div>
    </div>
  );
}
