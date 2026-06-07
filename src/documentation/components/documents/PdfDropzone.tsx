import { FileText, Upload } from 'lucide-react';
import { useCallback, useState } from 'react';

export function PdfDropzone({
  fileName,
  onFile,
}: {
  fileName?: string;
  onFile: (name: string, dataUrl?: string) => void;
}) {
  const [drag, setDrag] = useState(false);

  const handleFile = useCallback(
    (file: File) => {
      if (!file.name.toLowerCase().endsWith('.pdf')) return;
      const reader = new FileReader();
      reader.onload = () => onFile(file.name, reader.result as string);
      reader.readAsDataURL(file);
    },
    [onFile]
  );

  return (
    <div
      className={`rounded-xl border-2 border-dashed p-8 text-center transition-colors ${
        drag ? 'border-[#185FA5] bg-[#E6F1FB]/40' : 'border-slate-300 bg-slate-50'
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setDrag(true);
      }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDrag(false);
        const f = e.dataTransfer.files[0];
        if (f) handleFile(f);
      }}
    >
      <Upload className="mx-auto text-slate-400" size={32} />
      <p className="mt-2 text-sm font-medium text-slate-700">Glisser-déposer un PDF ici</p>
      <p className="text-xs text-slate-500">ou</p>
      <label className="mt-2 inline-block cursor-pointer rounded-lg bg-[#185FA5] px-4 py-2 text-xs font-semibold text-white hover:bg-[#134a82]">
        Parcourir…
        <input
          type="file"
          accept=".pdf,application/pdf"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
          }}
        />
      </label>
      {fileName && (
        <div className="mt-4 flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700">
          <FileText size={16} className="text-[#A32D2D]" />
          {fileName}
        </div>
      )}
    </div>
  );
}
