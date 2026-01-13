
import React, { useState, useRef } from 'react';

const ImageConverter: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [format, setFormat] = useState('image/png');
  const [converting, setConverting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      setFile(f);
      setPreview(URL.createObjectURL(f));
    }
  };

  const convertAndDownload = () => {
    if (!preview || !canvasRef.current) return;
    setConverting(true);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);

      const dataUrl = canvas.toDataURL(format);
      const link = document.createElement('a');
      const ext = format.split('/')[1];
      link.download = `toolverse-converted.${ext}`;
      link.href = dataUrl;
      link.click();
      setConverting(false);
    };
    img.src = preview;
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl p-10 bg-slate-50 dark:bg-slate-900/50 transition-colors">
        {preview ? (
          <div className="relative group">
            <img src={preview} className="max-h-64 rounded-lg shadow-lg mb-4" alt="Preview" />
            <button onClick={() => {setFile(null); setPreview(null);}} className="absolute -top-2 -right-2 bg-red-500 text-white w-8 h-8 rounded-full shadow-lg">✕</button>
          </div>
        ) : (
          <label className="cursor-pointer flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-brand-500 text-white rounded-full flex items-center justify-center text-3xl">+</div>
            <span className="text-slate-500 font-bold">Drop image or click to upload</span>
            <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
          </label>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-slate-500 mb-2">Target Format</label>
          <select value={format} onChange={(e) => setFormat(e.target.value)} className="w-full p-4 rounded-xl bg-slate-100 dark:bg-slate-900 outline-none font-bold">
            <option value="image/png">PNG (.png)</option>
            <option value="image/jpeg">JPEG (.jpg)</option>
            <option value="image/webp">WebP (.webp)</option>
          </select>
        </div>
        <div className="flex items-end">
          <button 
            disabled={!file || converting} 
            onClick={convertAndDownload}
            className={`w-full p-4 rounded-xl font-black transition-all ${!file ? 'bg-slate-200 text-slate-400' : 'bg-brand-500 text-white hover:bg-brand-600'}`}
          >
            {converting ? 'CONVERTING...' : 'CONVERT & DOWNLOAD'}
          </button>
        </div>
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default ImageConverter;
