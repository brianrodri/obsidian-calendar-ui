import type { Moment } from "moment";

import type { ICalendarSource, IDayMetadata, ISourceSettings } from "./types";

export function clamp(
  num: number,
  lowerBound: number,
  upperBound: number
): number {
  return Math.min(Math.max(lowerBound, num), upperBound);
}

export async function getDailyMetadata(
  sources: ICalendarSource[],
  getSourceSettings: (sourceId: string) => ISourceSettings,
  date: Moment,
  ..._args: unknown[]
): Promise<IDayMetadata[]> {
  const metadata = [];
  for (const source of sources) {
    if (!source.getDailyMetadata) {
      // ignore sources that dont apply to daily notes
      continue;
    }

    const evaluatedMetadata = (await source.getDailyMetadata?.(date)) || {};
    const sourceSettings = getSourceSettings(source.id);

    metadata.push({
      ...evaluatedMetadata,
      ...source,
      ...sourceSettings,
    });
  }
  return metadata;
}

export async function getWeeklyMetadata(
  sources: ICalendarSource[],
  getSourceSettings: (sourceId: string) => ISourceSettings,
  date: Moment,
  ..._args: unknown[]
): Promise<IDayMetadata[]> {
  const metadata = [];
  for (const source of sources) {
    if (!source.getWeeklyMetadata) {
      // ignore sources that don't apply to weekly notes
      continue;
    }

    const evaluatedMetadata = (await source.getWeeklyMetadata?.(date)) || {};
    const sourceSettings = getSourceSettings(source.id);

    metadata.push({
      ...evaluatedMetadata,
      ...source,
      ...sourceSettings,
    });
  }
  return metadata;
}

export async function getMonthlyMetadata(
  sources: ICalendarSource[],
  getSourceSettings: (sourceId: string) => ISourceSettings,
  date: Moment,
  ..._args: unknown[]
): Promise<IDayMetadata[]> {
  const metadata = [];
  for (const source of sources) {
    if (!source.getMonthlyMetadata) {
      // ignore sources that don't apply to monthly notes
      continue;
    }
    const evaluatedMetadata = (await source.getWeeklyMetadata?.(date)) || {};
    const sourceSettings = getSourceSettings(source.id);

    metadata.push({
      ...evaluatedMetadata,
      ...source,
      ...sourceSettings,
    });
  }
  return metadata;
}
