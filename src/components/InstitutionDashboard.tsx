import React from 'react';
import { DepartmentData, UtilityBillRecord } from '../types';
import { Building2, ArrowDownRight, Zap, Bus, Gauge, Utensils, Laptop, ScanLine, BarChart3, MapPin, ChevronRight, FileText } from 'lucide-react';

interface InstitutionDashboardProps {
  departments: DepartmentData[];
  utilityBills: UtilityBillRecord[];
  onOpenOcrModal: () => void;
  onOpenSimulator: () => void;
  onOpenMap: () => void;
  onSelectDepartment: (dept: DepartmentData) => void;
}

export const InstitutionDashboard: React.FC<InstitutionDashboardProps> = ({
  departments,
  utilityBills,
  onOpenOcrModal,
  onOpenSimulator,
  onOpenMap,
  onSelectDepartment,
}) => {
  const totalStudents = departments.reduce((acc, d) => acc + d.studentCount, 0);
  const totalStaff = departments.reduce((acc, d) => acc + d.staffCount, 0);
  const totalCampusCo2eKg = departments.reduce((acc, d) => acc + d.currentCo2eKg, 0);
  const totalCampusBaselineCo2eKg = departments.reduce((acc, d) => acc + d.baselineCo2eKg, 0);

  const totalCo2eTonnes = (totalCampusCo2eKg / 1000).toFixed(1);
  const reductionPercent = (((totalCampusBaselineCo2eKg - totalCampusCo2eKg) / totalCampusBaselineCo2eKg) * 100).toFixed(1);
  const kgPerStudent = (totalCampusCo2eKg / totalStudents).toFixed(1);

  return (
    <div className="space-y-6 pb-20 lg:pb-8">
      {/* Top Campus KPI Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl border border-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-lime-400 uppercase tracking-wider mb-2">
              <Building2 className="w-4 h-4 text-lime-400" />
              <span>Campus Carbon Intelligence OS · COEP Technological University</span>
            </div>
            <h1 className="font-['Syne'] text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
              Institutional Carbon Overview
            </h1>
            <p className="text-slate-300 text-sm mt-1 max-w-xl leading-relaxed">
              Real-time carbon accounting, utility bill OCR pipeline, and normalized departmental reduction tracking.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenOcrModal}
              className="bg-lime-400 hover:bg-lime-300 text-slate-950 font-bold px-5 py-3 rounded-2xl transition-all shadow-lg shadow-lime-400/20 flex items-center gap-2 text-sm cursor-pointer hover:scale-[1.02]"
            >
              <ScanLine className="w-4 h-4 text-slate-950" />
              <span>+ OCR Utility Bill</span>
            </button>
            <button
              onClick={onOpenSimulator}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-4 py-3 rounded-2xl transition-all border border-white/10 text-sm cursor-pointer flex items-center gap-2"
            >
              <BarChart3 className="w-4 h-4 text-lime-400" />
              <span>What-If Simulator</span>
            </button>
          </div>
        </div>

        {/* Big Numbers Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-700/80">
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Monthly Footprint</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-['Syne'] text-3xl font-extrabold text-white tabular-nums">{totalCo2eTonnes}</span>
              <span className="text-xs text-slate-400 font-medium">t CO2e</span>
            </div>
          </div>

          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Baseline Reduction</span>
            <div className="flex items-baseline gap-1 mt-1 text-lime-400">
              <ArrowDownRight className="w-5 h-5 text-lime-400" />
              <span className="font-['Syne'] text-3xl font-extrabold tabular-nums">{reductionPercent}%</span>
            </div>
          </div>

          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Normalized Intensity</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-['Syne'] text-3xl font-extrabold text-white tabular-nums">{kgPerStudent}</span>
              <span className="text-xs text-slate-400 font-medium">kg / student</span>
            </div>
          </div>

          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Campus Population</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-['Syne'] text-3xl font-extrabold text-white tabular-nums">{totalStudents + totalStaff}</span>
              <span className="text-xs text-slate-400 font-medium">people</span>
            </div>
          </div>
        </div>
      </div>

      {/* Emission Sources Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Electricity */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-2">
            <span>ELECTRICITY</span>
            <Zap className="w-4 h-4 text-amber-500" />
          </div>
          <span className="font-['Syne'] text-2xl font-extrabold text-slate-900 tabular-nums">28.2 t</span>
          <p className="text-[11px] text-slate-500 mt-1">62% of campus total</p>
          <span className="inline-block mt-2 text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
            OCR VERIFIED
          </span>
        </div>

        {/* Transport */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-2">
            <span>TRANSPORT</span>
            <Bus className="w-4 h-4 text-blue-500" />
          </div>
          <span className="font-['Syne'] text-2xl font-extrabold text-slate-900 tabular-nums">8.4 t</span>
          <p className="text-[11px] text-slate-500 mt-1">Campus buses & commuters</p>
          <span className="inline-block mt-2 text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full">
            GPS LOGGED
          </span>
        </div>

        {/* Generators */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-2">
            <span>GENERATORS</span>
            <Gauge className="w-4 h-4 text-rose-500" />
          </div>
          <span className="font-['Syne'] text-2xl font-extrabold text-slate-900 tabular-nums">3.2 t</span>
          <p className="text-[11px] text-slate-500 mt-1">2x 500 kVA DG Sets</p>
          <span className="inline-block mt-2 text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
            FUEL LOGS
          </span>
        </div>

        {/* Mess & Food */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-2">
            <span>MESS & FOOD</span>
            <Utensils className="w-4 h-4 text-emerald-500" />
          </div>
          <span className="font-['Syne'] text-2xl font-extrabold text-slate-900 tabular-nums">4.1 t</span>
          <p className="text-[11px] text-slate-500 mt-1">Mess meals & organic waste</p>
          <span className="inline-block mt-2 text-[10px] bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded-full">
            MESS REPORT
          </span>
        </div>

        {/* Computing */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-2">
            <span>COMPUTING</span>
            <Laptop className="w-4 h-4 text-indigo-500" />
          </div>
          <span className="font-['Syne'] text-2xl font-extrabold text-slate-900 tabular-nums">3.2 t</span>
          <p className="text-[11px] text-slate-500 mt-1">1,170 Lab PCs & servers</p>
          <span className="inline-block mt-2 text-[10px] bg-slate-100 text-slate-800 font-bold px-2 py-0.5 rounded-full">
            ESTIMATED
          </span>
        </div>
      </div>

      {/* Main Grid: Department League Table + Map Quick View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Department Carbon League Table */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-['Syne'] text-lg font-bold text-slate-900">Department Carbon League</h2>
              <p className="text-xs text-slate-500">Rankings based on normalized emissions per student (kg CO2e / student)</p>
            </div>
            <button
              onClick={onOpenMap}
              className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl hover:bg-emerald-100 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5" /> Campus Map
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {departments.map((dept, idx) => {
              const deptPerStudent = (dept.currentCo2eKg / dept.studentCount).toFixed(1);

              return (
                <div
                  key={dept.id}
                  onClick={() => onSelectDepartment(dept)}
                  className="py-4 flex items-center justify-between gap-4 hover:bg-slate-50 p-2 rounded-2xl transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 text-xs font-extrabold text-slate-400 text-center tabular-nums">
                      #{idx + 1}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                          {dept.name}
                        </span>
                        <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                          {dept.code}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {dept.studentCount} students · {dept.infrastructure.labs} Labs · {dept.infrastructure.computers} PCs
                      </p>
                    </div>
                  </div>

                  <div className="text-right flex items-center gap-4 shrink-0">
                    <div>
                      <span className="text-sm font-extrabold text-slate-900 tabular-nums block">
                        {deptPerStudent} kg / student
                      </span>
                      <span className="text-xs font-bold text-emerald-600 flex items-center justify-end gap-0.5">
                        <ArrowDownRight className="w-3.5 h-3.5" /> -{dept.reductionPercent}% vs base
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* OCR Bills & Recent Uploads Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-['Syne'] text-base font-bold text-slate-900">Utility Bill OCR Records</h3>
              <button
                onClick={onOpenOcrModal}
                className="text-xs font-bold text-lime-700 bg-lime-100 px-2.5 py-1 rounded-lg hover:bg-lime-200 transition-colors cursor-pointer"
              >
                + New Bill
              </button>
            </div>

            <div className="space-y-3">
              {utilityBills.map((bill) => (
                <div key={bill.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                    <span>{bill.departmentName}</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                      {bill.ocrStatus}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-600">
                    <span>Period: {bill.billingPeriod}</span>
                    <span className="font-bold text-slate-900 tabular-nums">{bill.kwhConsumed.toLocaleString()} kWh</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-500 border-t border-slate-200/60 pt-1.5">
                    <span>CO2e Impact: {(bill.co2eKg / 1000).toFixed(2)} Tonnes</span>
                    <span className="font-semibold text-slate-800">₹{bill.totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick PDF Report Trigger */}
          <div className="bg-gradient-to-br from-slate-900 to-emerald-950 rounded-3xl p-6 text-white text-center space-y-3">
            <FileText className="w-8 h-8 text-lime-400 mx-auto" />
            <h3 className="font-['Syne'] text-base font-bold text-white">Generate Campus Report</h3>
            <p className="text-xs text-slate-300">
              Download comprehensive PDF sustainability audit for academic & regulatory compliance.
            </p>
            <button
              onClick={() => window.print()}
              className="w-full bg-lime-400 hover:bg-lime-300 text-slate-950 font-bold py-2.5 rounded-xl text-xs transition-all cursor-pointer"
            >
              Print / Export Report PDF
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
