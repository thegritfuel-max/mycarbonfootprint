import React, { useState } from 'react';
import { DepartmentData, UtilityBillRecord } from '../types';
import { Building2, ArrowDownRight, Zap, Bus, Gauge, Utensils, Laptop, ScanLine, BarChart3, MapPin, Filter, TrendingUp, Calendar } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface InstitutionDashboardProps {
  departments: DepartmentData[];
  utilityBills: UtilityBillRecord[];
  onOpenOcrModal: () => void;
  onOpenSimulator: () => void;
  onOpenMap: () => void;
  onSelectDepartment?: (dept: DepartmentData) => void;
}

// Historical 6-Month CO2e Data per Department (Tonnes CO2e)
const HISTORICAL_MONTHLY_TRENDS = [
  { month: 'Apr', CSE: 14.2, Civil: 11.5, ETC: 9.8, Mech: 12.1 },
  { month: 'May', CSE: 13.8, Civil: 11.2, ETC: 9.5, Mech: 11.8 },
  { month: 'Jun', CSE: 12.9, Civil: 10.6, ETC: 9.1, Mech: 11.0 },
  { month: 'Jul', CSE: 12.1, Civil: 10.1, ETC: 8.7, Mech: 10.5 },
  { month: 'Aug', CSE: 11.8, Civil: 9.8,  ETC: 8.4, Mech: 10.1 },
  { month: 'Sep', CSE: 11.2, Civil: 9.4,  ETC: 8.1, Mech: 9.8 },
];

export const InstitutionDashboard: React.FC<InstitutionDashboardProps> = ({
  departments,
  utilityBills,
  onOpenOcrModal,
  onOpenSimulator,
  onOpenMap,
}) => {
  const [selectedDeptId, setSelectedDeptInFilter] = useState<string>('all');

  const selectedDepartment = selectedDeptId === 'all'
    ? null
    : departments.find((d) => d.id === selectedDeptId);

  const activeDepts = selectedDepartment ? [selectedDepartment] : departments;

  const totalStudents = activeDepts.reduce((acc, d) => acc + d.studentCount, 0);
  const totalStaff = activeDepts.reduce((acc, d) => acc + d.staffCount, 0);
  const totalCo2eKg = activeDepts.reduce((acc, d) => acc + d.currentCo2eKg, 0);
  const totalBaselineCo2eKg = activeDepts.reduce((acc, d) => acc + d.baselineCo2eKg, 0);

  const totalCo2eTonnes = (totalCo2eKg / 1000).toFixed(2);
  const reductionPercent = (((totalBaselineCo2eKg - totalCo2eKg) / totalBaselineCo2eKg) * 100).toFixed(1);
  const kgPerStudent = (totalCampusCo2eKg: number) => (totalCampusCo2eKg / totalStudents).toFixed(1);

  const electricityCo2eKg = activeDepts.reduce((acc, d) => acc + d.breakdown.electricityCo2eKg, 0);
  const computingCo2eKg = activeDepts.reduce((acc, d) => acc + d.breakdown.computingCo2eKg, 0);
  const acCo2eKg = activeDepts.reduce((acc, d) => acc + d.breakdown.acCo2eKg, 0);
  const transportCo2eKg = activeDepts.reduce((acc, d) => acc + d.breakdown.transportCo2eKg, 0);
  const generatorsCo2eKg = activeDepts.reduce((acc, d) => acc + d.breakdown.generatorsCo2eKg, 0);

  return (
    <div className="space-y-6 pb-20 lg:pb-8 font-sans text-slate-800">
      
      {/* ERP Control Header */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-md border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
            <Building2 className="w-4 h-4" />
            <span>INSTITUTIONAL ERP CARBON OS · COEP UNIVERSITY</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Campus Enterprise Environmental Control
          </h1>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={onOpenOcrModal}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-all shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <ScanLine className="w-4 h-4" />
            <span>Run Utility Bill OCR</span>
          </button>

          <button
            onClick={onOpenSimulator}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold px-4 py-2.5 rounded-xl text-xs transition-all flex items-center gap-2 cursor-pointer"
          >
            <BarChart3 className="w-4 h-4 text-emerald-400" />
            <span>What-If Simulator</span>
          </button>

          <button
            onClick={onOpenMap}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold px-4 py-2.5 rounded-xl text-xs transition-all flex items-center gap-2 cursor-pointer"
          >
            <MapPin className="w-4 h-4 text-amber-400" />
            <span>Hotspot Map</span>
          </button>
        </div>
      </div>

      {/* ERP Department Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-500" />
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Scope Filter:</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSelectedDeptInFilter('all')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              selectedDeptId === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All Departments
          </button>

          {departments.map((dept) => (
            <button
              key={dept.id}
              onClick={() => setSelectedDeptInFilter(dept.id)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                selectedDeptId === dept.id
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {dept.code}
            </button>
          ))}
        </div>
      </div>

      {/* ERP Data Summary Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Total Period Carbon</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-black text-slate-900 tabular-nums">{totalCo2eTonnes}</span>
            <span className="text-xs font-bold text-slate-500">Tonnes CO2e</span>
          </div>
          <span className="text-[11px] text-slate-500 block mt-1">
            {selectedDepartment ? selectedDepartment.name : 'Across 4 Campus Departments'}
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Reduction vs Baseline</span>
          <div className="flex items-baseline gap-1 mt-1 text-emerald-700">
            <ArrowDownRight className="w-5 h-5 text-emerald-600" />
            <span className="text-2xl font-black tabular-nums">{reductionPercent}%</span>
          </div>
          <span className="text-[11px] text-slate-500 block mt-1">Target reduction: 15%</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Normalized Intensity</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-black text-slate-900 tabular-nums">{kgPerStudent(totalCo2eKg)}</span>
            <span className="text-xs font-bold text-slate-500">kg / student</span>
          </div>
          <span className="text-[11px] text-slate-500 block mt-1">Fair comparative standard</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Department Population</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-black text-slate-900 tabular-nums">{totalStudents + totalStaff}</span>
            <span className="text-xs font-bold text-slate-500">Active occupants</span>
          </div>
          <span className="text-[11px] text-slate-500 block mt-1">{totalStudents} Students · {totalStaff} Staff</span>
        </div>
      </div>

      {/* RECHARTS: Historical Monthly Carbon Consumption Trends */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              <span>Historical Department Carbon Trends (6-Month Patterns)</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Visualizing monthly footprint trends in Tonnes CO2e per department
            </p>
          </div>

          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-lg flex items-center gap-1 self-start sm:self-auto">
            <Calendar className="w-3.5 h-3.5 text-emerald-600" /> Apr - Sep 2026 Audit
          </span>
        </div>

        <div className="w-full h-72 pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={HISTORICAL_MONTHLY_TRENDS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCSE" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorCivil" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorETC" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorMech" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="month" stroke="#64748B" fontSize={12} tickLine={false} />
              <YAxis stroke="#64748B" fontSize={12} tickLine={false} unit="t" />
              <Tooltip
                contentStyle={{ backgroundColor: '#0F172A', color: '#FFFFFF', borderRadius: '12px', border: 'none', fontSize: '12px' }}
                itemStyle={{ color: '#F8FAFC' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />

              {(selectedDeptId === 'all' || selectedDeptId === 'dept_cse_01') && (
                <Area type="monotone" dataKey="CSE" name="Computer Science" stroke="#10B981" fillOpacity={1} fill="url(#colorCSE)" strokeWidth={2.5} />
              )}
              {(selectedDeptId === 'all' || selectedDeptId === 'dept_civil_01') && (
                <Area type="monotone" dataKey="Civil" name="Civil Engineering" stroke="#3B82F6" fillOpacity={1} fill="url(#colorCivil)" strokeWidth={2.5} />
              )}
              {(selectedDeptId === 'all' || selectedDeptId === 'dept_etc_01') && (
                <Area type="monotone" dataKey="ETC" name="Electronics & TC" stroke="#F59E0B" fillOpacity={1} fill="url(#colorETC)" strokeWidth={2.5} />
              )}
              {(selectedDeptId === 'all' || selectedDeptId === 'dept_mech_01') && (
                <Area type="monotone" dataKey="Mech" name="Mechanical Eng" stroke="#8B5CF6" fillOpacity={1} fill="url(#colorMech)" strokeWidth={2.5} />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Structured Category Breakdown Table */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900">
          Emission Category Breakdown ({selectedDepartment ? selectedDepartment.name : 'Campus Total'})
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700 border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                <th className="p-3">Category</th>
                <th className="p-3">Monthly Footprint</th>
                <th className="p-3">% Share</th>
                <th className="p-3">Primary Source</th>
                <th className="p-3">Verification Method</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-medium">
              <tr>
                <td className="p-3 flex items-center gap-2 font-bold text-slate-900">
                  <Zap className="w-4 h-4 text-amber-500" /> Electricity Load
                </td>
                <td className="p-3 font-mono font-bold text-slate-900">{(electricityCo2eKg / 1000).toFixed(2)} Tonnes</td>
                <td className="p-3">62%</td>
                <td className="p-3">State Grid Utility Feeder</td>
                <td className="p-3"><span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-md text-[10px]">OCR BILL VERIFIED</span></td>
              </tr>
              <tr>
                <td className="p-3 flex items-center gap-2 font-bold text-slate-900">
                  <Laptop className="w-4 h-4 text-indigo-500" /> Lab Computing
                </td>
                <td className="p-3 font-mono font-bold text-slate-900">{(computingCo2eKg / 1000).toFixed(2)} Tonnes</td>
                <td className="p-3">18%</td>
                <td className="p-3">1,170 PC Workstations</td>
                <td className="p-3"><span className="bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-md text-[10px]">HARDWARE LOGS</span></td>
              </tr>
              <tr>
                <td className="p-3 flex items-center gap-2 font-bold text-slate-900">
                  <Gauge className="w-4 h-4 text-rose-500" /> AC Cooling
                </td>
                <td className="p-3 font-mono font-bold text-slate-900">{(acCo2eKg / 1000).toFixed(2)} Tonnes</td>
                <td className="p-3">10%</td>
                <td className="p-3">184 Split & Central Units</td>
                <td className="p-3"><span className="bg-slate-100 text-slate-800 font-bold px-2 py-0.5 rounded-md text-[10px]">ESTIMATED LOAD</span></td>
              </tr>
              <tr>
                <td className="p-3 flex items-center gap-2 font-bold text-slate-900">
                  <Bus className="w-4 h-4 text-blue-500" /> Campus Vehicles
                </td>
                <td className="p-3 font-mono font-bold text-slate-900">{(transportCo2eKg / 1000).toFixed(2)} Tonnes</td>
                <td className="p-3">6%</td>
                <td className="p-3">4 Diesel Buses</td>
                <td className="p-3"><span className="bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-md text-[10px]">GPS & FUEL LOGS</span></td>
              </tr>
              <tr>
                <td className="p-3 flex items-center gap-2 font-bold text-slate-900">
                  <Gauge className="w-4 h-4 text-slate-700" /> Diesel Generators
                </td>
                <td className="p-3 font-mono font-bold text-slate-900">{(generatorsCo2eKg / 1000).toFixed(2)} Tonnes</td>
                <td className="p-3">4%</td>
                <td className="p-3">2x 500 kVA DG Sets</td>
                <td className="p-3"><span className="bg-slate-100 text-slate-800 font-bold px-2 py-0.5 rounded-md text-[10px]">LOGBOOK</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ERP Utility Bill History & Department Comparison Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Department Carbon Ranking Table */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">Department Carbon League</h2>
            <button
              onClick={onOpenSimulator}
              className="text-xs font-bold text-emerald-700 hover:underline cursor-pointer"
            >
              Simulate Targets
            </button>
          </div>

          <div className="divide-y divide-slate-200">
            {departments.map((dept, idx) => {
              const deptPerStudent = (dept.currentCo2eKg / dept.studentCount).toFixed(1);

              return (
                <div
                  key={dept.id}
                  onClick={() => setSelectedDeptInFilter(dept.id)}
                  className={`py-3 px-2 flex items-center justify-between cursor-pointer rounded-xl transition-colors ${
                    selectedDeptId === dept.id ? 'bg-emerald-50 border border-emerald-200' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-extrabold text-slate-400 w-5 text-center text-xs">#{idx + 1}</span>
                    <div>
                      <span className="font-bold text-slate-900 text-xs block">{dept.name}</span>
                      <span className="text-[11px] text-slate-500">
                        {dept.studentCount} students · {dept.infrastructure.labs} Labs · {dept.infrastructure.computers} PCs
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-mono font-bold text-xs text-slate-900 block">{deptPerStudent} kg/student</span>
                    <span className="text-[10px] text-emerald-600 font-bold">-{dept.reductionPercent}% vs base</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* OCR Utility Bill Verification History */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">OCR Utility Invoices</h2>
            <button
              onClick={onOpenOcrModal}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-lg text-xs cursor-pointer"
            >
              + Parse New Bill
            </button>
          </div>

          <div className="space-y-3">
            {utilityBills.map((bill) => (
              <div key={bill.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-900">{bill.departmentName}</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-md">
                    {bill.ocrStatus}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-slate-600">
                  <span>Consumer No: {bill.consumerNumber}</span>
                  <span className="font-mono font-bold text-slate-900">{bill.kwhConsumed.toLocaleString()} kWh</span>
                </div>
                <div className="flex justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200">
                  <span>Billing Period: {bill.billingPeriod}</span>
                  <span className="font-bold text-slate-900">₹{bill.totalAmount.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
