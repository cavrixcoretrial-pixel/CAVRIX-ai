"use client";

import { useCallback, useState } from "react";
import {
  Upload,
  FileText,
  Image,
  FileCode,
  FileSpreadsheet,
  File,
  Trash2,
  Download,
  Eye,
  MoreHorizontal,
  X,
  Search,
  BarChart3,
  FolderOpen,
} from "lucide-react";
import { formatBytes } from "@/lib/utils";
import toast from "react-hot-toast";

interface FileItem {
  id: string;
  name: string;
  size: number;
  type: string;
  project: string;
  createdAt: string;
  extension: string;
}

const placeholderFiles: FileItem[] = [
  { id: "1", name: "project-report.pdf", size: 2457600, type: "application/pdf", project: "Research", createdAt: "2026-09-07", extension: "pdf" },
  { id: "2", name: "app-screenshot.png", size: 1048576, type: "image/png", project: "Design", createdAt: "2026-09-06", extension: "png" },
  { id: "3", name: "data-analysis.csv", size: 524288, type: "text/csv", project: "Analytics", createdAt: "2026-09-05", extension: "csv" },
  { id: "4", name: "source-code.tsx", size: 81920, type: "text/typescript", project: "Cavrix AI", createdAt: "2026-09-05", extension: "tsx" },
  { id: "5", name: "meeting-notes.md", size: 16384, type: "text/markdown", project: "General", createdAt: "2026-09-04", extension: "md" },
  { id: "6", name: "budget-2026.xlsx", size: 153600, type: "application/vnd.openxmlformats", project: "Finance", createdAt: "2026-09-03", extension: "xlsx" },
  { id: "7", name: "logo-final.svg", size: 32768, type: "image/svg+xml", project: "Design", createdAt: "2026-09-02", extension: "svg" },
  { id: "8", name: "api-docs.json", size: 65536, type: "application/json", project: "Cavrix AI", createdAt: "2026-09-01", extension: "json" },
];

function getFileIcon(ext: string) {
  const map: Record<string, { icon: React.ReactNode; color: string }> = {
    pdf: { icon: <FileText className="w-4 h-4" />, color: "text-red-400 bg-red-500/10" },
    png: { icon: <Image className="w-4 h-4" />, color: "text-pink-400 bg-pink-500/10" },
    jpg: { icon: <Image className="w-4 h-4" />, color: "text-pink-400 bg-pink-500/10" },
    svg: { icon: <Image className="w-4 h-4" />, color: "text-purple-400 bg-purple-500/10" },
    csv: { icon: <FileSpreadsheet className="w-4 h-4" />, color: "text-green-400 bg-green-500/10" },
    xlsx: { icon: <FileSpreadsheet className="w-4 h-4" />, color: "text-green-400 bg-green-500/10" },
    tsx: { icon: <FileCode className="w-4 h-4" />, color: "text-cyan-400 bg-cyan-500/10" },
    ts: { icon: <FileCode className="w-4 h-4" />, color: "text-cyan-400 bg-cyan-500/10" },
    js: { icon: <FileCode className="w-4 h-4" />, color: "text-yellow-400 bg-yellow-500/10" },
    md: { icon: <FileText className="w-4 h-4" />, color: "text-blue-400 bg-blue-500/10" },
    json: { icon: <FileCode className="w-4 h-4" />, color: "text-orange-400 bg-orange-500/10" },
  };
  return map[ext] || { icon: <File className="w-4 h-4" />, color: "text-white/40 bg-white/5" };
}

export default function FilesPage() {
  const [files, setFiles] = useState<FileItem[]>(placeholderFiles);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [analyzingFile, setAnalyzingFile] = useState<FileItem | null>(null);
  const [search, setSearch] = useState("");

  const filteredFiles = files.filter(
    (f) =>
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.project.toLowerCase().includes(search.toLowerCase())
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const droppedFiles = Array.from(e.dataTransfer.files);
      if (droppedFiles.length > 0) {
        const newFiles: FileItem[] = droppedFiles.map((f) => ({
          id: crypto.randomUUID(),
          name: f.name,
          size: f.size,
          type: f.type,
          project: "General",
          createdAt: new Date().toISOString().split("T")[0],
          extension: f.name.split(".").pop() || "",
        }));
        setFiles((prev) => [...newFiles, ...prev]);
        setUploadModalOpen(false);
        toast.success(`${droppedFiles.length} file(s) uploaded`);
      }
    },
    []
  );

  const handleFileSelect = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.onchange = () => {
      if (input.files) {
        const selectedFiles = Array.from(input.files);
        const newFiles: FileItem[] = selectedFiles.map((f) => ({
          id: crypto.randomUUID(),
          name: f.name,
          size: f.size,
          type: f.type,
          project: "General",
          createdAt: new Date().toISOString().split("T")[0],
          extension: f.name.split(".").pop() || "",
        }));
        setFiles((prev) => [...newFiles, ...prev]);
        setUploadModalOpen(false);
        toast.success(`${selectedFiles.length} file(s) uploaded`);
      }
    };
    input.click();
  };

  const handleDelete = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
    toast.success("File deleted");
  };

  const handleAnalyze = (file: FileItem) => {
    setAnalyzingFile(file);
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: `Analyzing ${file.name}...`,
        success: "Analysis complete",
        error: "Analysis failed",
      }
    );
    setTimeout(() => setAnalyzingFile(null), 2500);
  };

  return (
    <div className="min-h-full p-6 lg:p-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Files</h1>
            <p className="text-white/50">
              {files.length} files · {formatBytes(files.reduce((a, f) => a + f.size, 0))} total
            </p>
          </div>
          <button
            onClick={() => setUploadModalOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-cavrix-gradient px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-purple-500/20 transition-all hover:shadow-purple-500/40 hover:scale-[1.02]"
          >
            <Upload className="w-4 h-4" />
            Upload
          </button>
        </div>

        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search files..."
              className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder-white/30 outline-none transition-all focus:border-purple-500/50"
            />
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-5 py-3 text-left text-xs font-semibold text-white/40 uppercase tracking-wider">Name</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-white/40 uppercase tracking-wider">Size</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-white/40 uppercase tracking-wider">Type</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-white/40 uppercase tracking-wider">Project</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-white/40 uppercase tracking-wider">Date</th>
                  <th className="px-5 py-3 text-right text-xs font-semibold text-white/40 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredFiles.map((file) => {
                  const { icon, color } = getFileIcon(file.extension);
                  return (
                    <tr
                      key={file.id}
                      className="transition-colors hover:bg-white/[0.03] group"
                    >
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${color}`}>
                            {icon}
                          </div>
                          <span className="text-sm text-white font-medium truncate max-w-[240px]">
                            {file.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-sm text-white/40">{formatBytes(file.size)}</td>
                      <td className="px-5 py-3.5">
                        <span className="inline-flex items-center rounded-md bg-white/5 px-2 py-1 text-xs text-white/40 uppercase">
                          .{file.extension}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-sm text-white/40">{file.project}</td>
                      <td className="px-5 py-3.5 text-sm text-white/40">{file.createdAt}</td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleAnalyze(file)}
                            className="p-1.5 rounded-lg text-white/40 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors"
                            title="Analyze"
                          >
                            {analyzingFile?.id === file.id ? (
                              <BarChart3 className="w-4 h-4 animate-pulse" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                          <button
                            className="p-1.5 rounded-lg text-white/40 hover:text-white/70 hover:bg-white/5 transition-colors"
                            title="Download"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(file.id)}
                            className="p-1.5 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {filteredFiles.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-white/30">
              <FolderOpen className="w-12 h-12 mb-3 opacity-50" />
              <p className="text-sm">No files found</p>
            </div>
          )}
        </div>

        {uploadModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setUploadModalOpen(false)}
            />
            <div className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-[#0d0d1a] p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-white">Upload Files</h2>
                <button
                  onClick={() => setUploadModalOpen(false)}
                  className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleFileSelect}
                className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-12 text-center cursor-pointer transition-all ${
                  dragOver
                    ? "border-purple-500/60 bg-purple-500/10"
                    : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                }`}
              >
                <Upload className={`w-10 h-10 mb-4 transition-colors ${dragOver ? "text-purple-400" : "text-white/20"}`} />
                <p className="text-sm text-white/60 mb-1">
                  {dragOver ? "Drop files here" : "Drag & drop files here"}
                </p>
                <p className="text-xs text-white/30">or click to browse</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
