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

import { parseUrl } from '@google-psat/common';
import { existsSync, mkdirSync } from 'fs';
import path from 'path';

/**
 * Internal dependencies.
 */
import { redLogger } from './coloredLoggers';
import { LONG_CONSTANTS, SHORT_CONSTANTS } from './constants';

/**
 * This will check if the argument for the flag is another flag.
 * @param argument The value of the argument.
 * @returns boolean true if the argumment is a flag, false otherwise.
 */
function isOtherFlagsAsArgumentValidator(argument: string) {
  let isAFlag = false;

  LONG_CONSTANTS.forEach((flag) => {
    if (argument.startsWith(flag)) {
      isAFlag = true;
    }
  });

  SHORT_CONSTANTS.forEach((flag) => {
    if (argument.startsWith(flag)) {
      isAFlag = true;
    }
  });

  return isAFlag;
}
/**
 * This validates the waitTime or the concurrency of the URLs to be analysed together.
 * @param {string} value The supposed numeric value.
 * @returns The user passed value else default value.
 */
export function numericValidator(value: string) {
  if (isOtherFlagsAsArgumentValidator(value)) {
    redLogger(
      `Error: Please provide an argument for the flag as it cannot be empty.`
    );
    process.exit(1);
  }

  const parsedValue = parseInt(value);
  if (isNaN(parsedValue)) {
    redLogger(`${value} is not valid numeric value.`);
    process.exit(1);
  }
  return parsedValue;
}

/**
 * This validates the locale provided by the user.
 * @param {string} locale The locale provided by the user.
 * @returns validated locale.
 */
export function localeValidator(locale: string) {
  if (isOtherFlagsAsArgumentValidator(locale)) {
    redLogger(
      `Error: Please provide an argument for the flag as it cannot be empty.`
    );
    process.exit(1);
  }

  const availableLocales = ['en [default]', 'hi', 'es', 'ja', 'ko', 'pt-BR'];
  if (locale && !availableLocales.includes(locale)) {
    redLogger(
      `Locale '${locale}' is not supported, please use ${availableLocales.join(
        ', '
      )}.`
    );
    process.exit(1);
  }
  return locale;
}

/**
 * This validates the file path to be analysed by the user.
 * @param {string} filePath The file path provided by the user.
 * @returns validated file path.
 */
export function filePathValidator(filePath: string) {
  if (isOtherFlagsAsArgumentValidator(filePath)) {
    redLogger(
      `Error: Please provide an argument for the flag as it cannot be empty.`
    );
    process.exit(1);
  }

  const csvFileExists = existsSync(filePath);
  if (!csvFileExists) {
    redLogger(`Error: No file at ${filePath}`);
    process.exit(1);
  }
  return filePath;
}

/**
 * This validates the url to be analysed by the user.
 * @param {string} url The url provided by the user.
 * @returns validated url.
 */
export function urlValidator(url: string) {
  if (isOtherFlagsAsArgumentValidator(url)) {
    redLogger(
      `Error: Please provide an argument for the flag as it cannot be empty.`
    );
    process.exit(1);
  }

  const parsedUrl = parseUrl(url);

  if (parsedUrl === null) {
    redLogger(`Error: Invalid Url ${parsedUrl}`);
    process.exit(1);
  }
  return url;
}

/**
 * This validates the output directory path provided by the user.
 * @param {string} outDir output directory path provided by the user.
 * @returns validated outDir or the created output directory.
 */
export function outDirValidator(outDir: string) {
  if (isOtherFlagsAsArgumentValidator(outDir)) {
    redLogger(
      `Error: Please provide an argument for the flag as it cannot be empty.`
    );
    process.exit(1);
  }

  const parentDirExists = existsSync(path.resolve('./out'));

  if (!parentDirExists) {
    mkdirSync(path.resolve('./out'));
  }

  let output;

  if (!path.isAbsolute(outDir)) {
    output = path.resolve('./out', outDir);
  } else {
    output = path.resolve(outDir);
  }

  const outDirExists = existsSync(output);

  if (!outDirExists) {
    console.log(`"${output}" does not exist, creating\n`);
    mkdirSync(output);
  }
  return outDir;
}