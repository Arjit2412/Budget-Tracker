import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Ministry {
    mid: string;
    central: boolean;
    state: string | null;
    name: string;
    head: Person[];
    income: Income[];
    expenditure: Expenditure[];
    scheme: Scheme[];
    project: Project[];
}

interface Person {
    pid: string;
    name: string;
    phone: string;
    address: string;
    area?: string[];
    position: string[];
}

interface Project {
    pid: string;
    name: string;
    desc: string;
    start: number;
    end: number | null;
    status: 'APPROVED' | 'REJECTED' | 'HALTED' | 'ONGOING' | 'SUSPENDED';
    head: Person[];
    state: State[];
    allocation: Expenditure[];
    photos: { image: string; desc: string }[];
    central: boolean;
    local: Local[];
}

interface State {
    sid: string;
    name: string;
    head: Person[];
    ministry: Ministry[];
    income: Income[];
    project: Project[];
    scheme: Scheme[];
}

interface Expenditure {
    eid: string;
    image?: string;
    desc: string;
    name: string;
    amount: string;
    project: string | null;
    scheme: string | null;
}

interface Income {
    iid: string;
    name: string;
    desc: string;
    date: number;
    t_amount: string;
    expenditure?: Expenditure[];
    central: boolean;
    state: string | null;
    local: string | null;
}

interface Local {
    lid: string;
    head: Person[];
    name: string;
    income: Income[];
    scheme: Scheme[];
    project: Project[];
    expenditure: Expenditure[];
}

interface Scheme {
    sid: string;
    name: string;
    desc: string;
    central: boolean;
    state: State[] | null;
    start: number;
    end: number;
    status: 'APPROVED' | 'REJECTED' | 'HALTED' | 'ONGOING' | 'SUSPENDED';
    head: Person[];
    photo: { image: string; desc: string }[];
    expenditure: Expenditure[];
}

interface BaseTableProps<T> {
  data: T[];
  columns: {
    header: string;
    accessor: keyof T;
    render?: (value: any, row: T) => React.ReactNode;
  }[];
  title: string;
}

export default function BaseTable<T>({ data, columns, title }: BaseTableProps<T>) {
  return (
    <div className="p-4 bg-white shadow-md rounded-2xl">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              {columns.map((col, index) => (
                <th
                  key={index}
                  className="px-4 py-2 border-b border-gray-300 text-left font-medium text-gray-700"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-100">
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-4 py-2 border-b border-gray-300 text-gray-600"
                  >
                    {col.render ? col.render(row[col.accessor], row) : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
 