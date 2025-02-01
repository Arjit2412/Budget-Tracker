import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
interface BaseTableProps<T> {
  route: string;
  data: T[];
  columns: {
    header: string;
    accessor: keyof T;
    render?: (value: any, row: T) => React.ReactNode;
  }[];
  title: string;
}

export default function BaseTable<T>({ route, data, columns, title }: BaseTableProps<T>) {
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
            {data.map((row: any, rowIndex) => (
              <tr key={rowIndex}  className="hover:bg-gray-100" >
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-4 py-2 border-b border-gray-300 text-gray-600"
                  >
                <Link href={`${route}?id=${row.id}`} key={rowIndex}>
                    {col.render ? col.render(row[col.accessor], row) : (row[col.accessor] as React.ReactNode)}
                </Link>
                    
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
 