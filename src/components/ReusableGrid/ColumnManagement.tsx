import React, { useState, useEffect } from 'react';
import { GridApi } from 'ag-grid-community';
import { Columns, RotateCcw, Eye, EyeOff } from 'lucide-react';

interface ColumnManagementProps {
  gridApi: GridApi | null;
}

export default function ColumnManagement({ gridApi }: ColumnManagementProps) {
  const [columns, setColumns] = useState<any[]>([]);

  const refreshColumns = () => {
    if (!gridApi) return;
    const allCols = gridApi.getColumns();
    if (allCols) {
      // Filter out group columns or internal ones if necessary, but here we show all user columns
      setColumns(allCols.map(col => ({
        id: col.getColId(),
        name: col.getColDef().headerName || col.getColId(),
        visible: col.isVisible()
      })));
    }
  };

  useEffect(() => {
    refreshColumns();
    // In a real app, you might want to listen to a grid event for column changes
  }, [gridApi]);

  const toggleVisibility = (colId: string, visible: boolean) => {
    if (!gridApi) return;
    gridApi.setColumnVisible(colId, !visible);
    refreshColumns();
  };

  const showAll = () => {
    if (!gridApi) return;
    const allIds = columns.map(c => c.id);
    gridApi.setColumnsVisible(allIds, true);
    refreshColumns();
  };

  const hideAll = () => {
    if (!gridApi) return;
    const allIds = columns.map(c => c.id);
    gridApi.setColumnsVisible(allIds, false);
    refreshColumns();
  };

  const resetColumns = () => {
    if (!gridApi) return;
    gridApi.resetColumnState();
    refreshColumns();
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <button 
          onClick={showAll}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-slate-50 hover:bg-slate-100 rounded border border-slate-200 text-xs font-bold text-slate-600 transition-colors"
        >
          <Eye size={14} />
          Show All
        </button>
        <button 
          onClick={hideAll}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-slate-50 hover:bg-slate-100 rounded border border-slate-200 text-xs font-bold text-slate-600 transition-colors"
        >
          <EyeOff size={14} />
          Hide All
        </button>
      </div>

      <div className="flex flex-col border border-slate-100 rounded-lg overflow-hidden bg-white">
        {columns.map((col) => (
          <div 
            key={col.id} 
            className="flex items-center justify-between px-4 py-3 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors cursor-pointer"
            onClick={() => toggleVisibility(col.id, col.visible)}
          >
            <span className="text-sm font-medium text-slate-700">{col.name}</span>
            <input 
              type="checkbox" 
              checked={col.visible} 
              onChange={() => {}} // handled by div click
              className="w-4 h-4 rounded border-slate-300 text-brand-accent focus:ring-brand-accent cursor-pointer"
            />
          </div>
        ))}
      </div>

      <button 
        onClick={resetColumns}
        className="mt-2 flex items-center justify-center gap-2 px-3 py-3 bg-white hover:bg-red-50 rounded border border-red-100 text-xs font-bold text-red-500 transition-colors uppercase tracking-widest"
      >
        <RotateCcw size={14} />
        Reset to Default Layout
      </button>
    </div>
  );
}
