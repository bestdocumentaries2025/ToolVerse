
// import React, { useState, useRef } from 'react';

// const ImageConverter: React.FC = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [preview, setPreview] = useState<string | null>(null);
//   const [format, setFormat] = useState('image/png');
//   const [converting, setConverting] = useState(false);
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const f = e.target.files[0];
//       setFile(f);
//       setPreview(URL.createObjectURL(f));
//     }
//   };

//   const convertAndDownload = () => {
//     if (!preview || !canvasRef.current) return;
//     setConverting(true);

//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext('2d');
//     const img = new Image();

//     img.onload = () => {
//       canvas.width = img.width;
//       canvas.height = img.height;
//       ctx?.drawImage(img, 0, 0);

//       const dataUrl = canvas.toDataURL(format);
//       const link = document.createElement('a');
//       const ext = format.split('/')[1];
//       link.download = `toolverse-converted.${ext}`;
//       link.href = dataUrl;
//       link.click();
//       setConverting(false);
//     };
//     img.src = preview;
//   };

//   return (
//     <div className="space-y-8">
//       <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl p-10 bg-slate-50 dark:bg-slate-900/50 transition-colors">
//         {preview ? (
//           <div className="relative group">
//             <img src={preview} className="max-h-64 rounded-lg shadow-lg mb-4" alt="Preview" />
//             <button onClick={() => {setFile(null); setPreview(null);}} className="absolute -top-2 -right-2 bg-red-500 text-white w-8 h-8 rounded-full shadow-lg">✕</button>
//           </div>
//         ) : (
//           <label className="cursor-pointer flex flex-col items-center gap-4">
//             <div className="w-16 h-16 bg-brand-500 text-white rounded-full flex items-center justify-center text-3xl">+</div>
//             <span className="text-slate-500 font-bold">Drop image or click to upload</span>
//             <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
//           </label>
//         )}
//       </div>

//       <div className="grid md:grid-cols-2 gap-4">
//         <div>
//           <label className="block text-sm font-bold text-slate-500 mb-2">Target Format</label>
//           <select value={format} onChange={(e) => setFormat(e.target.value)} className="w-full p-4 rounded-xl bg-slate-100 dark:bg-slate-900 outline-none font-bold">
//             <option value="image/png">PNG (.png)</option>
//             <option value="image/jpeg">JPEG (.jpg)</option>
//             <option value="image/webp">WebP (.webp)</option>
//           </select>
//         </div>
//         <div className="flex items-end">
//           <button 
//             disabled={!file || converting} 
//             onClick={convertAndDownload}
//             className={`w-full p-4 rounded-xl font-black transition-all ${!file ? 'bg-slate-200 text-slate-400' : 'bg-brand-500 text-white hover:bg-brand-600'}`}
//           >
//             {converting ? 'CONVERTING...' : 'CONVERT & DOWNLOAD'}
//           </button>
//         </div>
//       </div>
//       <canvas ref={canvasRef} className="hidden" />
//     </div>
//   );
// };

// export default ImageConverter;















import React, { useState, useRef, useEffect } from 'react';

interface ImageDimensions {
  width: number | '';
  height: number | '';
}

const ImageConverter: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [format, setFormat] = useState('image/png');
  const [converting, setConverting] = useState(false);
  const [lockAspectRatio, setLockAspectRatio] = useState(true);
  const [originalDimensions, setOriginalDimensions] = useState<ImageDimensions>({ width: '', height: '' });
  const [dimensions, setDimensions] = useState<ImageDimensions>({ width: '', height: '' });
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [flipHorizontal, setFlipHorizontal] = useState(false);
  const [flipVertical, setFlipVertical] = useState(false);
  const [showOriginal, setShowOriginal] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const originalCanvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      setFile(f);
      const previewUrl = URL.createObjectURL(f);
      setPreview(previewUrl);
      
      const img = new Image();
      img.onload = () => {
        setOriginalDimensions({ width: img.naturalWidth, height: img.naturalHeight });
        setDimensions({ width: img.naturalWidth, height: img.naturalHeight });
        setShowOriginal(true);
        setTimeout(() => setShowOriginal(false), 1000);
      };
      img.src = previewUrl;
    }
  };

  const updateDimensions = (field: 'width' | 'height', value: string) => {
    const numValue = value === '' ? '' : parseInt(value, 10);
    
    if (field === 'width') {
      if (lockAspectRatio && originalDimensions.width && originalDimensions.height && numValue !== '') {
        const newHeight = Math.round((numValue as number) * originalDimensions.height / originalDimensions.width);
        setDimensions({ width: numValue, height: newHeight });
      } else {
        setDimensions(prev => ({ ...prev, width: numValue }));
      }
    } else {
      if (lockAspectRatio && originalDimensions.width && originalDimensions.height && numValue !== '') {
        const newWidth = Math.round((numValue as number) * originalDimensions.width / originalDimensions.height);
        setDimensions({ width: newWidth, height: numValue });
      } else {
        setDimensions(prev => ({ ...prev, height: numValue }));
      }
    }
  };

  const applyTransformations = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;
    
    ctx.save();
    ctx.translate(width / 2, height / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(flipHorizontal ? -1 : 1, flipVertical ? -1 : 1);
    ctx.translate(-width / 2, -height / 2);
  };

  const restoreTransformations = (ctx: CanvasRenderingContext2D) => {
    ctx.restore();
    ctx.filter = 'none';
  };

  const convertAndDownload = () => {
    if (!preview || !canvasRef.current || !originalCanvasRef.current) return;
    setConverting(true);

    const canvas = canvasRef.current;
    const originalCanvas = originalCanvasRef.current;
    const ctx = canvas.getContext('2d');
    const originalCtx = originalCanvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      const outputWidth = dimensions.width || img.naturalWidth;
      const outputHeight = dimensions.height || img.naturalHeight;
      
      originalCanvas.width = img.naturalWidth;
      originalCanvas.height = img.naturalHeight;
      originalCtx?.drawImage(img, 0, 0);
      
      canvas.width = outputWidth as number;
      canvas.height = outputHeight as number;
      
      if (ctx) {
        applyTransformations(ctx, outputWidth as number, outputHeight as number);
        ctx.drawImage(img, 0, 0, outputWidth as number, outputHeight as number);
        restoreTransformations(ctx);
      }

      const dataUrl = canvas.toDataURL(format, 1.0);
      const link = document.createElement('a');
      const ext = format.split('/')[1];
      link.download = `toolverse-converted.${ext}`;
      link.href = dataUrl;
      link.click();
      setConverting(false);
    };
    img.src = preview;
  };

  const resetAdjustments = () => {
    setBrightness(100);
    setContrast(100);
    setSaturation(100);
    setRotation(0);
    setFlipHorizontal(false);
    setFlipVertical(false);
  };

  const resetDimensions = () => {
    if (originalDimensions.width && originalDimensions.height) {
      setDimensions({
        width: originalDimensions.width,
        height: originalDimensions.height
      });
    }
  };

  const handleRotate = (degrees: number) => {
    setRotation((prev) => (prev + degrees) % 360);
  };

  const formatOptions = [
    { value: 'image/png', label: 'PNG (.png)' },
    { value: 'image/jpeg', label: 'JPEG (.jpg)' },
    { value: 'image/webp', label: 'WebP (.webp)' },
    { value: 'image/gif', label: 'GIF (.gif)' },
    { value: 'image/bmp', label: 'BMP (.bmp)' }
  ];

  const acceptedFormats = "image/png, image/jpeg, image/webp, image/gif, image/bmp";

  return (
    <div className="space-y-8">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Preview Section */}
        <div className="space-y-6">
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl p-6 bg-slate-50 dark:bg-slate-900/50 transition-colors min-h-[400px]">
            {preview ? (
              <div className="relative w-full h-full">
                <div className={`relative transition-all duration-300 ${showOriginal ? 'opacity-50' : 'opacity-100'}`}>
                  <img 
                    src={preview} 
                    className="max-w-full max-h-[300px] rounded-lg shadow-lg mx-auto"
                    alt="Preview"
                    style={{
                      filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`,
                      transform: `rotate(${rotation}deg) scaleX(${flipHorizontal ? -1 : 1}) scaleY(${flipVertical ? -1 : 1})`
                    }}
                  />
                  {showOriginal && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold animate-pulse">
                        Original Size: {originalDimensions.width} × {originalDimensions.height}
                      </div>
                    </div>
                  )}
                </div>
                <button 
                  onClick={() => {setFile(null); setPreview(null); resetAdjustments();}}
                  className="absolute -top-2 -right-2 bg-red-500 text-white w-8 h-8 rounded-full shadow-lg hover:bg-red-600 transition-colors"
                >
                  ✕
                </button>
              </div>
            ) : (
              <label className="cursor-pointer flex flex-col items-center gap-4 p-8">
                <div className="w-20 h-20 bg-brand-500 text-white rounded-full flex items-center justify-center text-4xl hover:bg-brand-600 transition-colors">
                  +
                </div>
                <div className="text-center">
                  <div className="text-slate-500 font-bold text-lg mb-2">Drop image or click to upload</div>
                  <div className="text-sm text-slate-400">
                    Supports: PNG, JPG, WEBP, GIF, BMP
                  </div>
                </div>
                <input 
                  type="file" 
                  className="hidden" 
                  accept={acceptedFormats}
                  onChange={handleFileChange} 
                />
              </label>
            )}
          </div>

          {/* Format Selection & Convert Button */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-500 mb-2">Output Format</label>
              <select 
                value={format} 
                onChange={(e) => setFormat(e.target.value)} 
                className="w-full p-4 rounded-xl bg-slate-100 dark:bg-slate-900 outline-none font-bold border border-slate-200 dark:border-slate-700"
              >
                {formatOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button 
                disabled={!file || converting} 
                onClick={convertAndDownload}
                className={`w-full p-4 rounded-xl font-black transition-all ${
                  !file 
                    ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed' 
                    : 'bg-brand-500 text-white hover:bg-brand-600 active:scale-95'
                }`}
              >
                {converting ? 'CONVERTING...' : 'CONVERT & DOWNLOAD'}
              </button>
            </div>
          </div>
        </div>

        {/* Controls Section */}
        <div className="space-y-8">
          {/* Size Controls */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200">Size Control</h3>
              <button 
                onClick={resetDimensions}
                className="text-sm bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-3 py-1 rounded-lg font-medium transition-colors"
              >
                Reset
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
                  Width (px)
                </label>
                <input
                  type="number"
                  value={dimensions.width}
                  onChange={(e) => updateDimensions('width', e.target.value)}
                  className="w-full p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-brand-500"
                  min="1"
                  max="5000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
                  Height (px)
                </label>
                <input
                  type="number"
                  value={dimensions.height}
                  onChange={(e) => updateDimensions('height', e.target.value)}
                  className="w-full p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-brand-500"
                  min="1"
                  max="5000"
                />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <button
                onClick={() => setLockAspectRatio(!lockAspectRatio)}
                className={`p-2 rounded-lg mr-3 transition-colors ${
                  lockAspectRatio
                    ? 'bg-brand-500 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                {lockAspectRatio ? '🔒' : '🔓'}
              </button>
              <span className="text-sm text-slate-600 dark:text-slate-400">
                {lockAspectRatio ? 'Aspect Ratio Locked' : 'Aspect Ratio Unlocked'}
              </span>
            </div>
          </div>

          {/* Enhancements */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200">Image Enhancements</h3>
              <button 
                onClick={resetAdjustments}
                className="text-sm bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-3 py-1 rounded-lg font-medium transition-colors"
              >
                Reset All
              </button>
            </div>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Brightness</label>
                  <span className="text-sm font-bold text-brand-500">{brightness}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={brightness}
                  onChange={(e) => setBrightness(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-500"
                />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Contrast</label>
                  <span className="text-sm font-bold text-brand-500">{contrast}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={contrast}
                  onChange={(e) => setContrast(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-500"
                />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400">Saturation</label>
                  <span className="text-sm font-bold text-brand-500">{saturation}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={saturation}
                  onChange={(e) => setSaturation(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-500"
                />
              </div>
            </div>
          </div>

          {/* Transformations */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-800">
            <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200 mb-4">Transformations</h3>
            <div className="space-y-4">
              {/* Rotation */}
              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
                  Rotation: {rotation}°
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleRotate(-90)}
                    className="flex-1 p-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg font-medium transition-colors"
                  >
                    ↶ 90°
                  </button>
                  <button
                    onClick={() => handleRotate(90)}
                    className="flex-1 p-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg font-medium transition-colors"
                  >
                    ↷ 90°
                  </button>
                  <button
                    onClick={() => setRotation(0)}
                    className="flex-1 p-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg font-medium transition-colors"
                  >
                    Reset
                  </button>
                </div>
              </div>
              
              {/* Flip Controls */}
              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
                  Flip
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setFlipHorizontal(!flipHorizontal)}
                    className={`flex-1 p-3 rounded-lg font-medium transition-colors ${
                      flipHorizontal
                        ? 'bg-brand-500 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    ↔ Horizontal
                  </button>
                  <button
                    onClick={() => setFlipVertical(!flipVertical)}
                    className={`flex-1 p-3 rounded-lg font-medium transition-colors ${
                      flipVertical
                        ? 'bg-brand-500 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    ↕ Vertical
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden Canvases */}
      <canvas ref={canvasRef} className="hidden" />
      <canvas ref={originalCanvasRef} className="hidden" />
    </div>
  );
};

export default ImageConverter;