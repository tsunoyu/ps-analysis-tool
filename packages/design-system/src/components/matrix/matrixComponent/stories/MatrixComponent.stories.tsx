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
import type { Meta, StoryObj } from '@storybook/react';
import { COLOR_MAP } from '@ps-analysis-tool/design-system';

/**
 * Internal dependencies.
 */
import MatrixComponent from '..';

const meta: Meta<typeof MatrixComponent> = {
  title: 'DesignSystem/Matrix/Component',
  component: MatrixComponent,
  tags: ['autodocs'],
};

export default meta;

export const Primary: StoryObj<typeof meta> = {
  args: {
    title: 'Functional Cookies',
    description:
      'These are essential cookies that are necessary for a website to function properly. They enable basic functionalities such as page navigation, access to secure areas, and remembering user preferences (e.g., language, font size).',
    color: COLOR_MAP.functional,
    isExpanded: true,
    countClassName: 'text-functional',
  },
};