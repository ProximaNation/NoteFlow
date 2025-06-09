
import React, { useState, useRef, useEffect } from 'react';
import { Upload, Download, Trash2, File, Image, Video, FileText, FolderOpen, Lock, Unlock, Eye, EyeOff } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface SecureFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  is_password_protected: boolean;
  uploaded_at: string;
}

const SecureLockerModule = () => {
  const [files, setFiles] = useState<SecureFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [filePassword, setFilePassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchFiles();
    }
  }, [user]);

  const fetchFiles = async () => {
    try {
      const { data, error } = await supabase
        .from('secure_files')
        .select('*')
        .order('uploaded_at', { ascending: false });

      if (error) throw error;
      setFiles(data || []);
    } catch (error) {
      console.error('Error fetching files:', error);
    } finally {
      setLoading(false);
    }
  };

  const uploadFileToSupabase = async (file: File, password?: string) => {
    if (!user) return null;

    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from('user-files')
      .upload(fileName, file);

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('user-files')
      .getPublicUrl(fileName);

    // Hash password if provided
    let passwordHash = null;
    if (password) {
      passwordHash = await hashPassword(password);
    }

    const { data: fileRecord, error: dbError } = await supabase
      .from('secure_files')
      .insert({
        user_id: user.id,
        name: file.name,
        size: file.size,
        type: file.type,
        url: publicUrl,
        password_hash: passwordHash,
        is_password_protected: !!password
      })
      .select()
      .single();

    if (dbError) throw dbError;
    return fileRecord;
  };

  const hashPassword = async (password: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hash))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles || !user) return;

    const file = selectedFiles[0];
    setCurrentFile(file);
    setShowPasswordModal(true);
  };

  const confirmUpload = async () => {
    if (!currentFile || !user) return;

    setUploading(true);
    try {
      const newFile = await uploadFileToSupabase(currentFile, filePassword || undefined);
      if (newFile) {
        setFiles(prev => [newFile, ...prev]);
      }
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
      setShowPasswordModal(false);
      setCurrentFile(null);
      setFilePassword('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const deleteFile = async (file: SecureFile) => {
    try {
      // Delete from storage
      const fileName = file.url.split('/').pop();
      if (fileName) {
        await supabase.storage
          .from('user-files')
          .remove([`${user?.id}/${fileName}`]);
      }

      // Delete from database
      const { error } = await supabase
        .from('secure_files')
        .delete()
        .eq('id', file.id);

      if (error) throw error;

      setFiles(files.filter(f => f.id !== file.id));
    } catch (error) {
      console.error('Error deleting file:', error);
      alert('Failed to delete file. Please try again.');
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return Image;
    if (type.startsWith('video/')) return Video;
    if (type.includes('text') || type.includes('document')) return FileText;
    return File;
  };

  if (loading) {
    return (
      <div className="flex-1 p-8 bg-background">
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-foreground">Secure Locker</h1>
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors duration-300 disabled:opacity-50"
          >
            <Upload size={20} />
            <span>{uploading ? 'Uploading...' : 'Upload Files'}</span>
          </button>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          className="hidden"
        />

        {files.length === 0 ? (
          <div className="text-center py-16">
            <FolderOpen size={64} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No files uploaded yet</h3>
            <p className="text-muted-foreground mb-6">Upload your documents, images, and files securely with optional password protection</p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 mx-auto transition-colors duration-300"
            >
              <Upload size={20} />
              <span>Upload Your First File</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {files.map((file) => {
              const FileIcon = getFileIcon(file.type);
              return (
                <div key={file.id} className="bg-card rounded-lg border border-border p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <FileIcon size={32} className="text-purple-600" />
                      {file.is_password_protected && (
                        <Lock size={16} className="text-amber-500" />
                      )}
                    </div>
                    <button
                      onClick={() => deleteFile(file)}
                      className="text-red-500 hover:text-red-700 transition-colors duration-300"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  
                  <h3 className="font-semibold text-card-foreground mb-2 truncate" title={file.name}>
                    {file.name}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-2">
                    {formatFileSize(file.size)}
                  </p>
                  
                  <p className="text-xs text-muted-foreground mb-4">
                    {new Date(file.uploaded_at).toLocaleDateString()}
                  </p>
                  
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 text-sm transition-colors duration-300 w-full justify-center"
                  >
                    <Download size={16} />
                    <span>Download</span>
                  </a>
                </div>
              );
            })}
          </div>
        )}

        {/* Password Modal */}
        {showPasswordModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-card rounded-lg border border-border p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold text-card-foreground mb-4">
                Secure Upload
              </h3>
              <p className="text-muted-foreground mb-4">
                Optionally add a password to protect this file. Leave empty for no password protection.
              </p>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-card-foreground mb-2">
                  Password (optional)
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={filePassword}
                    onChange={(e) => setFilePassword(e.target.value)}
                    className="w-full pr-12 px-3 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Enter password to protect file"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setShowPasswordModal(false);
                    setCurrentFile(null);
                    setFilePassword('');
                  }}
                  className="flex-1 px-4 py-2 border border-border rounded-lg text-card-foreground hover:bg-accent transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmUpload}
                  disabled={uploading}
                  className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors disabled:opacity-50"
                >
                  {uploading ? 'Uploading...' : 'Upload'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SecureLockerModule;
