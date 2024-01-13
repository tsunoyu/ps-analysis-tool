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
import React, { useState } from 'react';
import { ArrowDown, ArrowUp, Ellipse } from '@ps-analysis-tool/design-system';
import classNames from 'classnames';

const LibraryAccordion = () => {
  const [isOpen, setIsOpen] = useState(false);
  const parentClass = classNames({
    'border-t border-hex-gray last:border-b': true,
    'border border-slate-400': isOpen,
  });

  return (
    <div className={parentClass}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className=" hover:bg-gray-100 transition-colors flex py-3 cursor-pointer"
      >
        <span className="flex items-center px-2">
          <Ellipse />
        </span>
        <p className="flex-1">Google Sign-In: detecting...</p>
        <span className="flex items-center px-2">
          {isOpen ? <ArrowUp /> : <ArrowDown />}
        </span>
      </div>
      {isOpen && <div className="p-5 border-t border-hex-gray">Content</div>}
    </div>
  );
};

export default LibraryAccordion;
