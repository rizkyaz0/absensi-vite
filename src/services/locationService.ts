import { mockAssets } from "../mock/assets";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const locationService = {
  async list(): Promise<string[]> {
    await delay(100);
    const locations = [
      ...new Set(
        mockAssets.map((a) => a.lokasi).filter(Boolean) as string[]
      ),
    ].sort();
    return locations;
  },
};
