/*
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * External dependencies.
 */
import React from 'react';
import type { Column, Table } from '@tanstack/react-table';

/**
 * Internal dependencies.
 */
import type { TData } from '..';
import { createPortal } from 'react-dom';
import ColumnList from './columnList';

interface ColumnMenuProps {
  table: Table<TData>;
  columns: Column<TData, unknown>[];
  open: boolean;
  onClose: (value: boolean) => void;
}

const ColumnMenu = ({ table, columns, open, onClose }: ColumnMenuProps) => {
  const handleClose = () => {
    document.body.style.overflow = open ? 'auto' : 'hidden';
    onClose(!open);
  };

  return (
    <>
      {open &&
        createPortal(
          <>
            <div className="absolute top-10 left-2 z-20 bg-white rounded-lg w-[15rem] w-fit border shadow-2xl shadow-slate-500 border-gray-300 py-2 mr-2 divide-y divide-neutral-300 max-h-[80vh] overflow-auto bg-stone-200">
              <button
                className="block w-full text-sm px-4 py-2 flex items-center font-semibold text-slate-700 hover:bg-blue-400 hover:text-white cursor-pointer"
                onClick={table.getToggleAllColumnsVisibilityHandler()}
              >
                <span
                  className={`mr-2 font-bold ${
                    table.getIsAllColumnsVisible() ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  ✓
                </span>
                <span>Toggle All</span>
              </button>
              <ColumnList columns={columns} />
            </div>

            <div
              onClick={handleClose}
              className="absolute w-screen h-screen z-10 bg-white opacity-80 top-0 left-0"
            />
          </>,
          document.body
        )}
    </>
  );
};

export default ColumnMenu;
