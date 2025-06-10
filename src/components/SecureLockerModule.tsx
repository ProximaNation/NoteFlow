import React, { useState } from 'react';
import { Upload, File, Download, Trash2, Eye, Lock, Cloud } from 'lucide-react';
import { StoredFile } from '../types';
import GoogleDriveSetup from './GoogleDriveSetup';

interface SecureLockerModuleProps {
  files: StoredFile[];
  setFiles: (files: StoredFile[]) => void;
}

const SecureLockerModule = ({ files, setFiles }: SecureLockerModuleProps) => {
  const [selectedFile, setSelectedFile] = useState<StoredFile | null>(null);
  const [driveConnected, setDriveConnected] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    const newFiles = files.map(file => ({
      id: Math.random().toString(36).substring(2, 15),
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file),
      uploadedAt: new Date(),
    }));

    setFiles([...files, ...newFiles]);
  };

  const handleFileDelete = (fileId: string) => {
    setFiles(files.filter(file => file.id !== fileId));
  };

  return (
    <div className="flex-1 p-8 bg-background" data-lov-id="secure-locker">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <Lock className="text-purple-500" size={28} />
            <h1 className="text-2xl font-bold text-foreground">Secure Locker</h1>
          </div>
          
          {driveConnected && (
            <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
              <Cloud size={20} />
              <span className="text-sm font-medium">Google Drive Connected</span>
            </div>
          )}
        </div>

        {/* Google Drive Setup Section */}
        <div className="mb-8">
          <GoogleDriveSetup onCredentialsSet={setDriveConnected} />
        </div>

        {/* File Upload Section */}
        <div className="creative-card p-6 mb-8" data-lov-id="file-upload">
          <h2 className="text-lg font-semibold mb-4 text-card-foreground">Upload Files</h2>
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
            <Upload className="mx-auto mb-4 text-muted-foreground" size={48} />
            <p className="text-muted-foreground mb-2">Drag and drop files here, or click to browse</p>
            <input
              type="file"
              multiple
              className="hidden"
              id="file-upload"
              onChange={handleFileUpload}
            />
            <label
              htmlFor="file-upload"
              className="creative-button cursor-pointer inline-block"
            >
              Choose Files
            </label>
          </div>
        </div>

        {/* Files Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {files.map((file) => (
            <div
              key={file.id}
              className="floating-card creative-card p-4"
              data-lov-id={`file-${file.id}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <File className="text-blue-500" size={20} />
                  <div>
                    <h3 className="font-medium text-card-foreground truncate">{file.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {new Date(file.uploadedAt).toLocaleDateString()}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedFile(file)}
                    className="p-1 hover:bg-accent rounded transition-colors"
                  >
                    <Eye size={16} className="text-muted-foreground" />
                  </button>
                  <button className="p-1 hover:bg-accent rounded transition-colors">
                    <Download size={16} className="text-muted-foreground" />
                  </button>
                  <button 
                    onClick={() => handleFileDelete(file.id)}
                    className="p-1 hover:bg-destructive/10 rounded transition-colors"
                  >
                    <Trash2 size={16} className="text-destructive" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {files.length === 0 && (
          <div className="text-center py-12" data-lov-id="empty-locker">
            <Lock className="mx-auto mb-4 text-muted-foreground" size={64} />
            <h3 className="text-lg font-medium text-card-foreground mb-2">Your locker is empty</h3>
            <p className="text-muted-foreground">Upload files to keep them secure and accessible</p>
          </div>
        )}

        {/* File Preview Modal */}
        {selectedFile && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="glass-effect rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-card-foreground">{selectedFile.name}</h3>
                <button
                  onClick={() => setSelectedFile(null)}
                  className="p-2 hover:bg-accent rounded-lg transition-colors"
                >
                  ×
                </button>
              </div>
              <div className="text-center py-8">
                <File className="mx-auto mb-4 text-blue-500" size={64} />
                <p className="text-muted-foreground">Preview not available for this file type</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SecureLockerModule;
