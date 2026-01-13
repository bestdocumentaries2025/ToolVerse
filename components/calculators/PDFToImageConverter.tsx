// import React, { useState } from "react";
// import * as pdfjsLib from "pdfjs-dist";
// import pdfWorker from "pdfjs-dist/build/pdf.worker?url";
// import JSZip from "jszip";
// import { saveAs } from "file-saver";

// pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

// type ImageFormat = "png" | "jpeg" | "webp";

// interface ConvertedImage {
//   id: string;
//   page: number;
//   blob: Blob;
//   url: string;
//   width: number;
//   height: number;
// }

// const PDFToImageConverter: React.FC = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [images, setImages] = useState<ConvertedImage[]>([]);
//   const [format, setFormat] = useState<ImageFormat>("png");
//   const [scale, setScale] = useState(2);
//   const [quality, setQuality] = useState(0.92);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const convertPDF = async () => {
//     if (!file) return;

//     setLoading(true);
//     setError(null);
//     setImages([]);

//     try {
//       const buffer = await file.arrayBuffer();
//       const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;

//       const canvas = document.createElement("canvas");
//       const ctx = canvas.getContext("2d")!;

//       const results: ConvertedImage[] = [];

//       for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
//         const page = await pdf.getPage(pageNum);
//         const viewport = page.getViewport({ scale });

//         canvas.width = viewport.width;
//         canvas.height = viewport.height;

//         if (format === "jpeg") {
//           ctx.fillStyle = "#ffffff";
//           ctx.fillRect(0, 0, canvas.width, canvas.height);
//         }

//         await page.render({
//           canvasContext: ctx,
//           viewport,
//         }).promise;

//         const mime =
//           format === "png"
//             ? "image/png"
//             : format === "jpeg"
//             ? "image/jpeg"
//             : "image/webp";

//         const blob = await new Promise<Blob>((resolve) =>
//           canvas.toBlob(
//             (b) => resolve(b as Blob),
//             mime,
//             format === "png" ? undefined : quality
//           )
//         );

//         const url = URL.createObjectURL(blob);

//         results.push({
//           id: `${file.name}-page-${pageNum}`,
//           page: pageNum,
//           blob,
//           url,
//           width: canvas.width,
//           height: canvas.height,
//         });
//       }

//       setImages(results);
//     } catch (e) {
//       console.error(e);
//       setError("PDF conversion failed. File may be corrupted.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const downloadAll = async () => {
//     if (images.length === 0) return;

//     if (images.length === 1) {
//       saveAs(images[0].blob, `page-1.${format}`);
//       return;
//     }

//     const zip = new JSZip();
//     images.forEach((img) => {
//       zip.file(`page-${img.page}.${format}`, img.blob);
//     });

//     const zipBlob = await zip.generateAsync({ type: "blob" });
//     saveAs(zipBlob, "pdf-images.zip");
//   };

//   return (
//     <div style={{ maxWidth: 900, margin: "0 auto", padding: 20 }}>
//       <h2>PDF to Image Converter</h2>

//       <input
//         type="file"
//         accept="application/pdf"
//         onChange={(e) => setFile(e.target.files?.[0] || null)}
//       />

//       <div style={{ marginTop: 10 }}>
//         <label>Format: </label>
//         <select value={format} onChange={(e) => setFormat(e.target.value as ImageFormat)}>
//           <option value="png">PNG</option>
//           <option value="jpeg">JPEG</option>
//           <option value="webp">WebP</option>
//         </select>
//       </div>

//       <div>
//         <label>Scale: </label>
//         <input
//           type="number"
//           value={scale}
//           min={1}
//           max={4}
//           step={0.5}
//           onChange={(e) => setScale(Number(e.target.value))}
//         />
//       </div>

//       <button onClick={convertPDF} disabled={loading || !file}>
//         {loading ? "Converting..." : "Convert"}
//       </button>

//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {images.length > 0 && (
//         <>
//           <button onClick={downloadAll}>Download All</button>

//           <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, 150px)", gap: 10 }}>
//             {images.map((img) => (
//               <img key={img.id} src={img.url} style={{ width: "100%" }} />
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default PDFToImageConverter;











import React, { useState, useRef, useEffect } from "react";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker?url";
import JSZip from "jszip";
import { saveAs } from "file-saver";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

type ImageFormat = "png" | "jpeg" | "webp";

interface ConvertedImage {
  id: string;
  page: number;
  blob: Blob;
  url: string;
  width: number;
  height: number;
  size: number;
}

const PDFToImageConverter: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [images, setImages] = useState<ConvertedImage[]>([]);
  const [format, setFormat] = useState<ImageFormat>("png");
  const [scale, setScale] = useState(2);
  const [quality, setQuality] = useState(0.92);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [converting, setConverting] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Clean up URLs on unmount
  useEffect(() => {
    return () => {
      images.forEach(img => URL.revokeObjectURL(img.url));
    };
  }, [images]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      if (f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf")) {
        setFile(f);
        setError(null);
        // Clean up previous images
        images.forEach(img => URL.revokeObjectURL(img.url));
        setImages([]);
        setProgress(0);
        setCurrentPage(0);
        setTotalPages(0);
      } else {
        setError("Please select a valid PDF file");
      }
    }
  };

  const convertPDF = async () => {
    if (!file) {
      setError("Please select a PDF file first");
      return;
    }

    setLoading(true);
    setConverting(true);
    setError(null);
    setProgress(0);
    setCurrentPage(0);
    
    // Clean up previous images
    images.forEach(img => URL.revokeObjectURL(img.url));
    setImages([]);

    try {
      const buffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
      setTotalPages(pdf.numPages);

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        throw new Error("Canvas context not available");
      }

      const results: ConvertedImage[] = [];

      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        setCurrentPage(pageNum);
        setProgress(Math.round((pageNum / pdf.numPages) * 100));

        const page = await pdf.getPage(pageNum);
        const viewport = page.getViewport({ scale });

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        if (format === "jpeg") {
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        await page.render({
          canvasContext: ctx,
          viewport,
        }).promise;

        const mime =
          format === "png"
            ? "image/png"
            : format === "jpeg"
            ? "image/jpeg"
            : "image/webp";

        const blob = await new Promise<Blob>((resolve, reject) => {
          canvas.toBlob(
            (b) => {
              if (b) resolve(b as Blob);
              else reject(new Error("Failed to create blob"));
            },
            mime,
            format === "png" ? undefined : quality
          );
        });

        const url = URL.createObjectURL(blob);

        results.push({
          id: `${file.name}-page-${pageNum}`,
          page: pageNum,
          blob,
          url,
          width: canvas.width,
          height: canvas.height,
          size: blob.size,
        });

        // Small delay to prevent UI blocking
        if (pageNum < pdf.numPages) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }

      setImages(results);
    } catch (e) {
      console.error(e);
      setError("PDF conversion failed. The file may be corrupted or encrypted. Please try a different PDF.");
    } finally {
      setLoading(false);
      setConverting(false);
    }
  };

  const downloadImage = (image: ConvertedImage) => {
    saveAs(image.blob, `page-${image.page}.${format}`);
  };

  const downloadAll = async () => {
    if (images.length === 0) return;

    if (images.length === 1) {
      saveAs(images[0].blob, `page-1.${format}`);
      return;
    }

    try {
      const zip = new JSZip();
      images.forEach((img) => {
        const fileName = `page-${img.page.toString().padStart(3, '0')}.${format}`;
        zip.file(fileName, img.blob);
      });

      const zipBlob = await zip.generateAsync({ type: "blob" });
      saveAs(zipBlob, `${file?.name.replace('.pdf', '')}-images.zip`);
    } catch (err) {
      console.error("ZIP creation failed:", err);
      // Fallback: download individually
      images.forEach((img, index) => {
        setTimeout(() => {
          downloadImage(img);
        }, index * 300);
      });
    }
  };

  const clearAll = () => {
    images.forEach(img => URL.revokeObjectURL(img.url));
    setFile(null);
    setImages([]);
    setError(null);
    setProgress(0);
    setCurrentPage(0);
    setTotalPages(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Format descriptions
  const formatDescriptions = {
    png: "Lossless quality with transparent background",
    jpeg: "High compression for smaller file size",
    webp: "Modern format with excellent compression"
  };

  // Quality descriptions
  const qualityDescriptions = [
    { value: 0.8, label: "Low", desc: "Smaller files" },
    { value: 0.85, label: "Medium", desc: "Balanced" },
    { value: 0.92, label: "High", desc: "Better quality" },
    { value: 1.0, label: "Maximum", desc: "Best quality" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl md:rounded-3xl mb-4 md:mb-6">
            <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-3 md:mb-4">
            PDF to Image Converter
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg lg:text-xl max-w-3xl mx-auto px-4">
            Convert PDF pages to high-quality images in multiple formats. Perfect for mobile and desktop.
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 md:mb-8 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl md:rounded-2xl p-4 md:p-6">
            <div className="flex items-start gap-3 md:gap-4">
              <div className="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 text-red-500 mt-0.5">
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-medium text-red-800 dark:text-red-300 text-sm md:text-base">{error}</p>
                <p className="text-red-600 dark:text-red-400 text-xs md:text-sm mt-1">
                  Try a different PDF file or adjust the conversion settings.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
          {/* Left Column - Upload & Settings */}
          <div className="space-y-6 md:space-y-8">
            {/* File Upload Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl md:rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="p-4 md:p-6 lg:p-8">
                <div className="flex items-center justify-between mb-4 md:mb-6">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
                    Upload PDF
                  </h2>
                  {file && (
                    <button
                      onClick={clearAll}
                      className="px-3 py-1.5 md:px-4 md:py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg font-medium transition-colors text-sm md:text-base"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <div className="border-3 border-dashed border-gray-300 dark:border-gray-600 rounded-xl md:rounded-2xl p-6 md:p-8 transition-all hover:border-purple-400">
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept="application/pdf"
                    onChange={handleFileChange}
                  />
                  
                  {!file ? (
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="cursor-pointer flex flex-col items-center justify-center text-center space-y-4 md:space-y-6"
                    >
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 md:w-10 md:h-10 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-lg md:text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">
                          Select PDF File
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base">
                          Click to browse or drag and drop
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
                        <span className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg text-xs md:text-sm font-medium">
                          Max 100MB
                        </span>
                        <span className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg text-xs md:text-sm font-medium">
                          All pages
                        </span>
                        <span className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg text-xs md:text-sm font-medium">
                          Secure
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4 md:space-y-6">
                      <div className="flex items-center gap-3 md:gap-4">
                        <div className="w-12 h-12 md:w-14 md:h-14 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                          <svg className="w-6 h-6 md:w-7 md:h-7 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-bold text-gray-800 dark:text-white text-base md:text-lg truncate">
                            {file.name}
                          </h3>
                          <p className="text-gray-500 dark:text-gray-400 text-sm">
                            {(file.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      {converting && (
                        <div className="space-y-2 md:space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium text-gray-700 dark:text-gray-300">
                              Page {currentPage} of {totalPages}
                            </span>
                            <span className="font-bold text-purple-500">{progress}%</span>
                          </div>
                          <div className="w-full h-2 md:h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-purple-400 to-pink-500 transition-all duration-300"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                          <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
                            Converting to {format.toUpperCase()}...
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Settings Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl md:rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="p-4 md:p-6 lg:p-8">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-4 md:mb-6">
                  Conversion Settings
                </h2>
                
                <div className="space-y-6 md:space-y-8">
                  {/* Format Selection */}
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-700 dark:text-gray-300 mb-3 md:mb-4">
                      Image Format
                    </h3>
                    <div className="grid grid-cols-3 gap-2 md:gap-4">
                      {(["png", "jpeg", "webp"] as ImageFormat[]).map((fmt) => (
                        <button
                          key={fmt}
                          onClick={() => setFormat(fmt)}
                          className={`p-3 md:p-4 rounded-xl text-center transition-all ${
                            format === fmt
                              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25"
                              : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                          }`}
                        >
                          <div className="font-bold text-sm md:text-base">{fmt.toUpperCase()}</div>
                          <div className={`text-xs mt-1 ${
                            format === fmt ? "text-purple-100" : "text-gray-500 dark:text-gray-400"
                          }`}>
                            {formatDescriptions[fmt]}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Scale Setting */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg md:text-xl font-bold text-gray-700 dark:text-gray-300">
                        Image Scale
                      </h3>
                      <span className="text-2xl font-bold text-purple-500">{scale}x</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="4"
                      step="0.5"
                      value={scale}
                      onChange={(e) => setScale(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500 [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:dark:border-gray-800"
                    />
                    <div className="flex justify-between text-gray-500 dark:text-gray-400 text-sm mt-2">
                      <span>Smaller</span>
                      <span>Larger</span>
                    </div>
                  </div>

                  {/* Quality Setting */}
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-700 dark:text-gray-300 mb-3 md:mb-4">
                      Image Quality
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
                      {qualityDescriptions.map((q) => (
                        <button
                          key={q.value}
                          onClick={() => setQuality(q.value)}
                          className={`p-3 rounded-lg text-center transition-all ${
                            Math.abs(quality - q.value) < 0.01
                              ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25"
                              : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                          }`}
                        >
                          <div className="font-bold text-sm md:text-base">{q.label}</div>
                          <div className="text-xs opacity-90 mt-1">{q.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Actions & Preview */}
          <div className="space-y-6 md:space-y-8">
            {/* Actions Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl md:rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="p-4 md:p-6 lg:p-8">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-4 md:mb-6">
                  Convert & Download
                </h2>
                
                <div className="space-y-6 md:space-y-8">
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3 md:gap-4">
                    <div className="text-center p-3 md:p-4 bg-gray-100 dark:bg-gray-700 rounded-xl">
                      <div className="text-2xl md:text-3xl font-bold text-purple-500">{totalPages}</div>
                      <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400">Total Pages</div>
                    </div>
                    <div className="text-center p-3 md:p-4 bg-gray-100 dark:bg-gray-700 rounded-xl">
                      <div className="text-2xl md:text-3xl font-bold text-purple-500">{format.toUpperCase()}</div>
                      <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400">Format</div>
                    </div>
                    <div className="text-center p-3 md:p-4 bg-gray-100 dark:bg-gray-700 rounded-xl">
                      <div className="text-2xl md:text-3xl font-bold text-purple-500">{scale}x</div>
                      <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400">Scale</div>
                    </div>
                  </div>

                  {/* Convert Button */}
                  <button
                    onClick={convertPDF}
                    disabled={loading || !file}
                    className={`w-full py-3 md:py-4 rounded-xl font-bold text-base md:text-lg transition-all ${
                      !file || loading
                        ? "bg-gray-300 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                        : "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 active:scale-95 shadow-lg shadow-purple-500/25"
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2 md:gap-3">
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Converting...</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
                          </svg>
                          <span>Convert to Images</span>
                        </>
                      )}
                    </div>
                  </button>

                  {/* Download Actions */}
                  {images.length > 0 && (
                    <div className="space-y-3 md:space-y-4">
                      <h3 className="text-lg md:text-xl font-bold text-gray-700 dark:text-gray-300">
                        Download Options
                      </h3>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <button
                          onClick={downloadAll}
                          className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all flex items-center justify-center gap-2"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                          </svg>
                          Download ZIP ({images.length})
                        </button>
                        <button
                          onClick={clearAll}
                          className="px-4 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 font-bold rounded-xl transition-colors"
                        >
                          Clear All
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Info */}
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 md:w-6 md:h-6 text-blue-500 flex-shrink-0">
                        <svg fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-blue-800 dark:text-blue-300 text-sm md:text-base">
                        All processing happens locally in your browser. Your files are never uploaded to any server.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Preview Card */}
            {images.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl md:rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="p-4 md:p-6 lg:p-8">
                  <div className="flex items-center justify-between mb-4 md:mb-6">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
                      Converted Images ({images.length})
                    </h2>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {format.toUpperCase()} • {scale}x
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4 max-h-[500px] overflow-y-auto p-2">
                    {images.map((img) => (
                      <div key={img.id} className="group relative rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all">
                        <div className="aspect-[4/3] relative overflow-hidden">
                          <img
                            src={img.url}
                            alt={`Page ${img.page}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                            {img.page}
                          </div>
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button
                              onClick={() => downloadImage(img)}
                              className="px-4 py-2 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-colors"
                            >
                              Download
                            </button>
                          </div>
                        </div>
                        <div className="p-3">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-bold text-gray-800 dark:text-white">Page {img.page}</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {(img.size / 1024).toFixed(1)} KB
                              </div>
                            </div>
                            <button
                              onClick={() => downloadImage(img)}
                              className="p-2 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-lg transition-colors"
                              title="Download"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-4 md:p-6 border border-purple-100 dark:border-purple-800/30">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-3 md:mb-4">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white mb-2">Multiple Formats</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
              Convert to PNG, JPEG, or WebP formats with adjustable quality settings.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-4 md:p-6 border border-blue-100 dark:border-blue-800/30">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-3 md:mb-4">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white mb-2">ZIP Download</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
              Download all images as a single ZIP file for easy sharing and organization.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-4 md:p-6 border border-green-100 dark:border-green-800/30">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-green-500 rounded-xl flex items-center justify-center mb-3 md:mb-4">
              <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white mb-2">Secure & Private</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
              All processing happens locally in your browser. No file uploads to external servers.
            </p>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 md:mt-12 text-center text-gray-500 dark:text-gray-400 text-sm md:text-base">
          <p>Supports PDF files up to 100MB with unlimited pages. Works on all modern browsers.</p>
        </div>
      </div>
    </div>
  );
};

export default PDFToImageConverter;