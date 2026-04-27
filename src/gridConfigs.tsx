import React from 'react';
import { ColDef } from 'ag-grid-community';
import { FolderClosed, FileText } from 'lucide-react';
import { ColumnSchema, GridConfig } from './types';

export interface GridDefinition {
  gridId: string;
  schema?: ColumnSchema[];
  columnDefs?: ColDef[];
  configOverrides?: GridConfig;
  autoGroupColumnDef?: ColDef;
}

export const gridConfigs: Record<string, GridDefinition> = {
  enterprise: {
    gridId: "enterprise-example",
    autoGroupColumnDef: { 
      headerName: 'HIERARCHY', 
      minWidth: 280,
      cellRendererParams: {
        innerRenderer: (params: any) => (
          <div className="flex items-center gap-2">
            <FolderClosed size={14} className="text-brand-accent" />
            <span className="font-bold">{params.value}</span>
          </div>
        )
      }
    },
    columnDefs: [
      { 
        field: 'name', 
        headerName: 'Entity Name', 
        flex: 2, 
        cellRenderer: (params: any) => <span className="font-mono text-brand-accent">{params.value}</span> 
      },
      { 
        headerName: 'Calculated Value',
        valueGetter: (params) => (params.data?.value ? `$${params.data.value.toLocaleString()}` : '$0'),
        flex: 1
      },
      {
        field: 'status',
        headerName: 'Status',
        cellRenderer: (params: any) => (
          <span className={`px-2 py-1 rounded text-xs ${params.value === 'done' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
            {params.value?.toUpperCase()}
          </span>
        ),
        flex: 1
      }
    ]
  },
  assets: {
    gridId: "asset-explorer",
    autoGroupColumnDef: { headerName: 'STRUCTURE', minWidth: 250 },
    schema: [
      { key: 'name', label: 'Asset Name', type: 'group', editable: true, flex: 2 },
      { key: 'value', label: 'Valuation', type: 'number', editable: true, flex: 1 },
      { key: 'status', label: 'Status', type: 'status', options: ['todo', 'doing', 'done'], editable: true, flex: 1 },
      { key: 'order', hide: true }
    ]
  },
  users: {
    gridId: "user-directory",
    configOverrides: { 
      enableDragDrop: false,
      enableSearch: true,
      toolbar: {
        show: true,
        actions: {
          expandAll: false,
          collapseAll: false
        }
      }
    },
    schema: [
      { key: 'name', label: 'Member Name', type: 'text', editable: true, flex: 2 },
      { key: 'value', label: 'Role / Designation', type: 'text', editable: true, flex: 1 },
      { key: 'status', label: 'Activity Status', type: 'status', options: ['available', 'busy', 'offline'], flex: 1 },
      { key: 'order', hide: true }
    ]
  },
  audit: {
    gridId: "audit-logs",
    configOverrides: { 
      enableUndoRedo: false,
      enableCRUD: false,
      enableDragDrop: false,
      enableSearch: true 
    },
    schema: [
      { key: 'name', label: 'Event Description', type: 'text', flex: 2 },
      { key: 'value', label: 'Timestamp', type: 'date', flex: 1, filter: false },
      { key: 'status', label: 'Level', type: 'status', flex: 1 },
      { key: 'order', hide: true }
    ]
  }
};
