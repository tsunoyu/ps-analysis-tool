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

import { useContextSelector } from '@google-psat/common';
import { SidebarContext, SidebarStoreContext } from './context';

export function useSidebar(): SidebarStoreContext;
export function useSidebar<T>(selector: (state: SidebarStoreContext) => T): T;

/**
 * Hook to access the Sidebar context.
 * @param selector Selector function to partially select state.
 * @returns selected part of the state
 */
export function useSidebar<T>(
  selector: (state: SidebarStoreContext) => T | SidebarStoreContext = (state) =>
    state
) {
  return useContextSelector(SidebarContext, selector);
}
