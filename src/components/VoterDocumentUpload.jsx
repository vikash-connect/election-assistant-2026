import React, { useState, useRef } from 'react';
import { UploadCloud, CheckCircle, AlertCircle, FileText, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { z } from 'zod';
import Logger from '../utils/Logger';

// 5MB limit
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_FILE_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/jpg',
  'image/png'
];

const fileSchema = z.object({
  file: z.any()
    .refine((file) => file !== null && file !== undefined, "File is required")
    .refine((file) => file?.size <= MAX_FILE_SIZE, `File size must be less than 5MB.`)
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file?.type),
      "Only PDF, JPEG, and PNG formats are supported."
    )
});

export default function VoterDocumentUpload() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const fileInputRef = useRef(null);

  const simulateGCSUpload = async (uploadFile) => {
    Logger.info('Initiating secure upload to Google Cloud Storage bucket: voter-docs-2026', { fileName: uploadFile.name });
    
    setIsUploading(true);
    setProgress(0);
    setError('');

    // Simulate progress
    return new Promise((resolve) => {
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += Math.floor(Math.random() * 15) + 5;
        if (currentProgress >= 100) {
          currentProgress = 100;
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
            setIsSuccess(true);
            resolve();
          }, 500);
        }
        setProgress(currentProgress);
      }, 200);
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setIsSuccess(false);
    setProgress(0);

    try {
      fileSchema.parse({ file: selectedFile });
      setFile(selectedFile);
      setError('');
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
        Logger.warn('File validation failed', err.errors);
      }
      setFile(null);
    }
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUpload = () => {
    if (!file) {
      setError('Please select a file first.');
      return;
    }
    simulateGCSUpload(file);
  };

  const clearFile = () => {
    setFile(null);
    setError('');
    setProgress(0);
    setIsSuccess(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="transform-gpu glass-card bg-white/70 backdrop-blur-xl border border-slate-200/50 shadow-2xl rounded-3xl overflow-hidden max-w-2xl mx-auto p-8"
    >
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Secure Document Upload</h3>
        <p className="text-slate-600">
          Upload your valid ID proof (Aadhar, PAN, or Passport) for immediate verification.
          Supported formats: PDF, JPEG, PNG (Max: 5MB).
        </p>
      </div>

      <div className="space-y-6">
        {/* Upload Area */}
        <div 
          className={`relative border-2 border-dashed rounded-2xl p-10 text-center transition-all ${
            file ? 'border-eci-blue bg-blue-50/50' : 'border-slate-300 hover:border-eci-blue hover:bg-slate-50'
          }`}
        >
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".pdf,.jpg,.jpeg,.png"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            aria-label="File upload input for Voter ID verification"
            disabled={isUploading || isSuccess}
          />
          
          <div className="flex flex-col items-center justify-center pointer-events-none">
            {file ? (
              <>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <FileText className="w-8 h-8 text-eci-blue" aria-hidden="true" />
                </div>
                <p className="font-bold text-slate-900 text-lg truncate max-w-xs">{file.name}</p>
                <p className="text-sm text-slate-500 mt-1">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </>
            ) : (
              <>
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-50">
                  <UploadCloud className="w-8 h-8 text-slate-500" aria-hidden="true" />
                </div>
                <p className="font-bold text-slate-700 text-lg">Click or drag file to upload</p>
                <p className="text-sm text-slate-500 mt-2">PDF, JPEG, or PNG up to 5MB</p>
              </>
            )}
          </div>
          
          {file && !isUploading && !isSuccess && (
            <button 
              onClick={(e) => { e.preventDefault(); clearFile(); }}
              className="absolute top-4 right-4 p-2 bg-white rounded-full shadow hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors z-10"
              aria-label="Remove selected file"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center text-red-600 bg-red-50 p-4 rounded-xl border border-red-100"
              role="alert"
            >
              <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" aria-hidden="true" />
              <span className="text-sm font-medium">{error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress Bar */}
        {isUploading && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium text-slate-700">
              <span>Uploading to Secure Vault...</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
              <motion.div 
                className="bg-eci-blue h-3 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin="0"
                aria-valuemax="100"
              />
            </div>
          </div>
        )}

        {/* Success State */}
        <AnimatePresence>
          {isSuccess && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center text-eci-green bg-green-50 p-4 rounded-xl border border-green-100"
              role="status"
            >
              <CheckCircle className="w-6 h-6 mr-2" aria-hidden="true" />
              <span className="font-bold">Document verified and uploaded successfully!</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Button */}
        {!isSuccess && (
          <button
            onClick={handleUpload}
            disabled={!file || isUploading}
            aria-label="Submit document for verification"
            className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all transform ${
              !file || isUploading
                ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-eci-blue to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white hover:-translate-y-0.5 hover:shadow-xl'
            }`}
          >
            {isUploading ? 'Processing...' : 'Verify Document'}
          </button>
        )}
      </div>
    </motion.div>
  );
}
