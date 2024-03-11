# Changelog

This file documents all significant modifications made to the Astro Integration `astro-robots`.

## 2.0.1

- Update the loggerInfo.

## 2.0.0

- Update to AstroIntegrationLogger.

## 1.0.2

### Patch Changes

- Bug - Fixed the issue that prevented the correct reading of file size information when output `server`, `hybrid` not `static`.

## 1.0.1

### Minor Changes

- Enhancements - Added warnings for robots.txt files exceeding 10KB size limit

## 1.0.0

### Major Changes

- Introduced `measureExecutionTime` utility function.
- Introduced `logger` object, ensuring compatibility with Astro2.0 and the latest version 3.0.
- Overhauled the README file with the aim of achieving maximum conciseness.

### Minor Changes

- Enhanced the logic of program execution.

### Patch Changes

- Implemented `UTF-8` writing to prevent potential file corruption issues.

## 0.8.21

### Patch Changes

- Add README across Astro built-in integrations
