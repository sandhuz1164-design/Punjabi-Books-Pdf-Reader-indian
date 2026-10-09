import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, FileText, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, 
  RotateCw, X, Maximize2, Minimize2, Download, Grid3x3, 
  AlignJustify, Search, ChevronUp, ChevronDown, Eye, BookOpen
} from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';

// Set up the worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

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
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const [fitMode, setFitMode] = useState<'width' | 'page' | 'custom'>('custom');
  const [continuousMode, setContinuousMode] = useState(false);
  const [pageInput, setPageInput] = useState('1');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const thumbnailCanvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);

  const renderPage = useCallback(async (pageNum: number) => {
    if (!pdfDoc || !canvasRef.current) return;

    setIsLoading(true);
    try {
      const page = await pdfDoc.getPage(pageNum);
      
      // Calculate scale based on fit mode
      let viewport;
      if (fitMode === 'width' && containerRef.current) {
        const containerWidth = containerRef.current.clientWidth - 40;
        const defaultViewport = page.getViewport({ scale: 1, rotation });
        const calculatedScale = containerWidth / defaultViewport.width;
        viewport = page.getViewport({ scale: calculatedScale, rotation });
      } else if (fitMode === 'page' && containerRef.current) {
        const containerWidth = containerRef.current.clientWidth - 40;
        const containerHeight = containerRef.current.clientHeight - 40;
        const defaultViewport = page.getViewport({ scale: 1, rotation });
        const scaleX = containerWidth / defaultViewport.width;
        const scaleY = containerHeight / defaultViewport.height;
        const calculatedScale = Math.min(scaleX, scaleY);
        viewport = page.getViewport({ scale: calculatedScale, rotation });
      } else {
        viewport = page.getViewport({ scale, rotation });
      }

      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      if (!context) return;

      // Set display size
      canvas.style.width = `${viewport.width}px`;
      canvas.style.height = `${viewport.height}px`;

      // Set actual size in memory (scaled for retina displays)
      const pixelRatio = window.devicePixelRatio || 1;
      canvas.width = viewport.width * pixelRatio;
      canvas.height = viewport.height * pixelRatio;
      context.scale(pixelRatio, pixelRatio);

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
  }, [pdfDoc, scale, rotation, fitMode]);

  // Generate thumbnails
  const generateThumbnails = useCallback(async () => {
    if (!pdfDoc) return;
    
    const thumbs: string[] = [];
    const maxThumbs = Math.min(pdfDoc.numPages, 50); // Limit for performance
    
    for (let i = 1; i <= maxThumbs; i++) {
      try {
        const page = await pdfDoc.getPage(i);
        const viewport = page.getViewport({ scale: 0.3 });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        
        if (!context) continue;
        
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        
        await page.render({
          canvasContext: context,
          viewport: viewport,
        }).promise;
        
        thumbs.push(canvas.toDataURL());
      } catch (err) {
        console.error(`Error generating thumbnail for page ${i}:`, err);
      }
    }
    
    setThumbnails(thumbs);
  }, [pdfDoc]);

  useEffect(() => {
    if (pdfDoc) {
      renderPage(currentPage);
    }
  }, [pdfDoc, currentPage, scale, rotation, fitMode, renderPage]);

  useEffect(() => {
    if (pdfDoc && showThumbnails && thumbnails.length === 0) {
      generateThumbnails();
    }
  }, [pdfDoc, showThumbnails, thumbnails.length, generateThumbnails]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!pdfDoc) return;
      
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        setCurrentPage(p => Math.min(totalPages, p + 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        setCurrentPage(p => Math.max(1, p - 1));
      } else if (e.key === '+' && e.ctrlKey) {
        e.preventDefault();
        setScale(s => Math.min(3, s + 0.2));
        setFitMode('custom');
      } else if (e.key === '-' && e.ctrlKey) {
        e.preventDefault();
        setScale(s => Math.max(0.5, s - 0.2));
        setFitMode('custom');
      } else if (e.key === 'f' && e.ctrlKey) {
        e.preventDefault();
        setShowSearch(true);
      } else if (e.key === 'Escape') {
        if (isFullscreen) {
          document.exitFullscreen();
          setIsFullscreen(false);
        }
        setShowSearch(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pdfDoc, totalPages, isFullscreen]);

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
    setThumbnails([]);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      setPdfDoc(pdf);
      setTotalPages(pdf.numPages);
      setCurrentPage(1);
      setPageInput('1');
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
      setPageInput(page.toString());
    }
  };

  const handlePageInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const value = parseInt(pageInput);
      if (!isNaN(value)) {
        goToPage(value);
      }
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const downloadPDF = () => {
    if (!pdfDoc) return;
    // Create a download link
    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([]));
    link.download = fileName;
    // Note: This is a placeholder - actual download would need the original file
  };

  // Upload screen
  if (!pdfDoc) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-3 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
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
          <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${
            darkMode ? 'bg-amber-900/30' : 'bg-amber-100'
          }`}>
            <Upload className={`w-12 h-12 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`} />
          </div>
          <h3 className="text-xl font-semibold mb-2">Drop your PDF here or click to browse</h3>
          <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Supports any PDF file • Read directly in browser • No upload to server
          </p>
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm ${
            darkMode ? 'bg-gray-700 text-gray-300' : 'bg-amber-50 text-amber-700'
          }`}>
            <FileText className="w-4 h-4" />
            <span>Maximum file size: No limit</span>
          </div>
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
            <div className="inline-block w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
            <p className={`mt-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Loading PDF...</p>
          </motion.div>
        )}

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12"
        >
          <h3 className="text-xl font-bold mb-6 text-center">Reader Features</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: ZoomIn, label: "Zoom In/Out" },
              { icon: RotateCw, label: "Rotate Pages" },
              { icon: Maximize2, label: "Fullscreen" },
              { icon: Grid3x3, label: "Thumbnails" },
              { icon: AlignJustify, label: "Fit to Page" },
              { icon: Search, label: "Search" },
            ].map((feature, i) => (
              <div
                key={i}
                className={`p-4 rounded-xl text-center ${
                  darkMode ? 'bg-gray-800' : 'bg-white border border-amber-100'
                }`}
              >
                <feature.icon className={`w-8 h-8 mx-auto mb-2 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`} />
                <p className="text-sm font-medium">{feature.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  // Reader view
  return (
    <div 
      ref={containerRef}
      className={`flex flex-col ${isFullscreen ? 'h-screen' : 'h-[calc(100vh-64px)]'} ${
        darkMode ? 'bg-gray-900' : 'bg-gray-100'
      }`}
    >
      {/* Reader Toolbar */}
      <div className={`flex items-center justify-between px-3 py-2 border-b flex-wrap gap-2 ${
        darkMode ? 'border-gray-700 bg-gray-800' : 'border-amber-200 bg-white shadow-sm'
      }`}>
        {/* Left section */}
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-amber-100'}`}
            title="Close PDF"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-red-500" />
            <span className="text-sm font-medium truncate max-w-[150px] sm:max-w-[250px]">{fileName}</span>
          </div>
        </div>

        {/* Center section - View controls */}
        <div className="flex items-center gap-1">
          {/* Zoom controls */}
          <button
            onClick={() => { setScale(Math.max(0.5, scale - 0.2)); setFitMode('custom'); }}
            className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-amber-100'}`}
            title="Zoom Out (Ctrl+-)"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className={`text-xs font-mono min-w-[45px] text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={() => { setScale(Math.min(3, scale + 0.2)); setFitMode('custom'); }}
            className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-amber-100'}`}
            title="Zoom In (Ctrl++)"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          <div className={`w-px h-6 mx-1 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>

          {/* Fit modes */}
          <button
            onClick={() => setFitMode('width')}
            className={`p-2 rounded-lg transition-colors ${
              fitMode === 'width' 
                ? 'bg-amber-600 text-white' 
                : darkMode ? 'hover:bg-gray-700' : 'hover:bg-amber-100'
            }`}
            title="Fit to Width"
          >
            <AlignJustify className="w-4 h-4" />
          </button>
          <button
            onClick={() => setFitMode('page')}
            className={`p-2 rounded-lg transition-colors ${
              fitMode === 'page' 
                ? 'bg-amber-600 text-white' 
                : darkMode ? 'hover:bg-gray-700' : 'hover:bg-amber-100'
            }`}
            title="Fit to Page"
          >
            <Maximize2 className="w-4 h-4" />
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

          {/* Thumbnails */}
          <button
            onClick={() => setShowThumbnails(!showThumbnails)}
            className={`p-2 rounded-lg transition-colors ${
              showThumbnails 
                ? 'bg-amber-600 text-white' 
                : darkMode ? 'hover:bg-gray-700' : 'hover:bg-amber-100'
            }`}
            title="Toggle Thumbnails"
          >
            <Grid3x3 className="w-4 h-4" />
          </button>

          {/* Fullscreen */}
          <button
            onClick={toggleFullscreen}
            className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-amber-100'}`}
            title="Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>

        {/* Right section - Page navigation */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage <= 1}
            className={`p-2 rounded-lg transition-colors disabled:opacity-30 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-amber-100'}`}
            title="Previous Page (←)"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-1">
            <input
              type="text"
              value={pageInput}
              onChange={(e) => setPageInput(e.target.value)}
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
            title="Next Page (→)"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Thumbnails sidebar */}
        <AnimatePresence>
          {showThumbnails && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 180, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className={`overflow-y-auto border-r ${
                darkMode ? 'border-gray-700 bg-gray-800' : 'border-amber-200 bg-white'
              }`}
            >
              <div className="p-2 space-y-2">
                {thumbnails.map((thumb, index) => (
                  <div
                    key={index}
                    onClick={() => goToPage(index + 1)}
                    className={`cursor-pointer rounded-lg overflow-hidden transition-all ${
                      currentPage === index + 1
                        ? 'ring-2 ring-amber-500'
                        : darkMode ? 'hover:ring-1 hover:ring-gray-600' : 'hover:ring-1 hover:ring-amber-300'
                    }`}
                  >
                    <img
                      src={thumb}
                      alt={`Page ${index + 1}`}
                      className="w-full h-auto"
                    />
                    <div className={`text-center text-xs py-1 ${
                      currentPage === index + 1
                        ? 'bg-amber-600 text-white'
                        : darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {index + 1}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* PDF Canvas */}
        <div className="flex-1 overflow-auto flex justify-center p-4 relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-10">
              <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <div className={`shadow-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <canvas ref={canvasRef} className="block" />
          </div>
        </div>
      </div>

      {/* Bottom status bar */}
      <div className={`flex items-center justify-between px-4 py-1.5 text-xs border-t ${
        darkMode ? 'border-gray-700 bg-gray-800 text-gray-400' : 'border-amber-200 bg-white text-gray-500'
      }`}>
        <div className="flex items-center gap-4">
          <span>Page {currentPage} of {totalPages}</span>
          <span>•</span>
          <span>Zoom: {Math.round(scale * 100)}%</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Keyboard: ← → to navigate</span>
          <span>•</span>
          <span>Ctrl+/- to zoom</span>
        </div>
      </div>
    </div>
  );
}
