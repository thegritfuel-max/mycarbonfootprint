import React, { useState } from 'react';
import { UtilityBillRecord } from '../types';
import { ScanLine, Upload, FileText, CheckCircle2, Sparkles, X, Loader2, ArrowRight } from 'lucide-react';

interface UtilityBillOcrModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBillApproved: (bill: UtilityBillRecord) => void;
}

export const UtilityBillOcrModal: React.FC<UtilityBillOcrModalProps> = ({
  isOpen,
  onClose,
  onBillApproved,
}) => {
  const [selectedDept, setSelectedDept] = useState('Computer Science & Engineering');
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileBase64, setFileBase64] = useState<string | null>(null);
  const [ocrResult, setOcrResult] = useState<any | null>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFileBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSimulateSample = () => {
    // Generate sample image representation for quick review
    setFileBase64('data:image/png;base64,sample_bill_base64_data');
  };

  const handleRunOcr = async () => {
    setIsProcessing(true);
    setOcrResult(null);

    try {
      const res = await fetch('/api/ai/ocr-bill', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: fileBase64,
          departmentName: selectedDept,
        }),
      });
      const data = await res.json();
      setOcrResult(data);
    } catch (err) {
      console.error('OCR Error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleApproveBill = () => {
    if (!ocrResult) return;

    const newBill: UtilityBillRecord = {
      id: `bill_${Date.now()}`,
      institutionId: 'inst_coep_01',
      departmentId: 'dept_cse_01',
      departmentName: selectedDept,
      billingPeriod: ocrResult.extractedData.billingPeriod || 'September 2026',
      consumerNumber: ocrResult.extractedData.consumerNumber || 'MSEDCL-400129-C',
      kwhConsumed: ocrResult.extractedData.kwhConsumed || 14200,
      totalAmount: ocrResult.extractedData.totalAmount || 113600,
      co2eKg: ocrResult.calculatedCo2eKg || 11644,
      ocrStatus: 'VERIFIED',
      uploadedAt: new Date().toISOString().split('T')[0],
      notes: ocrResult.extractedData.notes,
    };

    onBillApproved(newBill);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8 border border-slate-100">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-lime-100 text-lime-900 flex items-center justify-center border border-lime-200">
              <ScanLine className="w-5 h-5 text-lime-700" />
            </div>
            <div>
              <h2 className="font-['Syne'] text-xl font-bold text-slate-900">Utility Bill OCR Scanner</h2>
              <p className="text-xs text-slate-500">Gemini 3.8 Flash Vision Document Parser</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dept Selector */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Target Department</label>
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="Computer Science & Engineering">Computer Science & Engineering</option>
            <option value="Civil & Environmental Engineering">Civil & Environmental Engineering</option>
            <option value="Electronics & Telecommunication">Electronics & Telecommunication</option>
            <option value="Mechanical Engineering">Mechanical Engineering</option>
          </select>
        </div>

        {/* Dropzone */}
        {!ocrResult && (
          <div className="border-2 border-dashed border-slate-200 rounded-3xl p-8 text-center space-y-3 bg-slate-50/50 hover:bg-slate-50 transition-colors">
            <Upload className="w-10 h-10 text-emerald-600 mx-auto" />
            <div>
              <h3 className="font-['Syne'] text-sm font-bold text-slate-900">Upload Utility Invoice (PDF / PNG / JPG)</h3>
              <p className="text-xs text-slate-400 mt-1">Upload official electricity bill or use quick sample for testing</p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <label className="bg-slate-900 hover:bg-slate-800 text-lime-400 font-bold px-4 py-2.5 rounded-xl text-xs cursor-pointer transition-all">
                <span>Choose File</span>
                <input type="file" accept="image/*,application/pdf" onChange={handleFileChange} className="hidden" />
              </label>

              <button
                onClick={handleSimulateSample}
                className="bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold px-4 py-2.5 rounded-xl text-xs transition-all cursor-pointer"
              >
                Use Sample September Bill
              </button>
            </div>

            {fileBase64 && (
              <p className="text-xs text-emerald-700 font-bold pt-2">
                ✓ Document loaded. Ready for AI OCR parsing.
              </p>
            )}
          </div>
        )}

        {/* OCR Processing Trigger */}
        {fileBase64 && !ocrResult && (
          <button
            onClick={handleRunOcr}
            disabled={isProcessing}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-3.5 rounded-2xl text-xs transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Running Gemini 3.8 Flash Document OCR...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-lime-300" />
                <span>PARSE UTILITY BILL WITH GEMINI OCR</span>
              </>
            )}
          </button>
        )}

        {/* Extracted Review Table */}
        {ocrResult && (
          <div className="bg-emerald-50/60 border border-emerald-200 rounded-3xl p-6 space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <h3 className="font-['Syne'] text-base font-bold text-slate-900">Extracted Bill Metrics</h3>
              </div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                Confidence: {(ocrResult.extractedData.confidence * 100).toFixed(0)}%
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-2xl border border-emerald-100">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Consumer No.</span>
                <span className="text-xs font-bold text-slate-900">{ocrResult.extractedData.consumerNumber}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Period</span>
                <span className="text-xs font-bold text-slate-900">{ocrResult.extractedData.billingPeriod}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">kWh Consumed</span>
                <span className="text-sm font-extrabold text-emerald-700 tabular-nums">{ocrResult.extractedData.kwhConsumed.toLocaleString()} kWh</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Carbon Impact</span>
                <span className="text-sm font-extrabold text-slate-900 tabular-nums">{ocrResult.calculatedCo2eTonnes} Tonnes</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 italic">
              "{ocrResult.extractedData.notes}"
            </p>

            <div className="flex gap-3 pt-2">
              <button
                onClick={handleApproveBill}
                className="flex-1 bg-slate-900 hover:bg-slate-800 text-lime-400 font-extrabold py-3 rounded-2xl text-xs transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>APPROVE & RECORD IN CARBON ENGINE</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
