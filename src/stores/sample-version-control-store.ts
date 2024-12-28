import { create } from "zustand";

export type SectionOptions = {
  include: boolean;
  position: number;
  version: number;
  versionList: number[];
};

export type SampleOptions = {
  version: number | "custom";
  versionList: number[];
  versionConfig: {
    [version: number]: {
      [section: string]: SectionOptions;
    };
  };
};

export type VersionControlState = {
  sample: SampleOptions;
  hero: SectionOptions;
  navbar: SectionOptions;
  parallax: SectionOptions;
};

type VersionControlStoreActions = {
  setSampleVersion: (
    version:
      | VersionControlState["sample"]["version"]
      | ((
          currentVersion: VersionControlState["sample"]["version"],
        ) => VersionControlState["sample"]["version"]),
  ) => void;
};

type VersionControlStore = VersionControlState & VersionControlStoreActions;

const initialState: VersionControlState = {
  sample: {
    version: 1,
    versionList: [1, 2, 3],
    versionConfig: {
      1: {
        hero: {
          include: true,
          position: 1,
          version: 1,
          versionList: [1, 2, 3],
        },
        navbar: {
          include: true,
          position: 1,
          version: 1,
          versionList: [1, 2, 3],
        },
      },
    },
  },
  hero: {
    include: true,
    position: 1,
    version: 1,
    versionList: [1, 2, 3],
  },
  navbar: {
    include: true,
    position: 1,
    version: 1,
    versionList: [1, 2, 3],
  },
  parallax: {
    include: true,
    position: 1,
    version: 1,
    versionList: [1, 2, 3],
  },
};

const useVersionControlStore = create<VersionControlStore>()((set) => ({
  ...initialState,
  setSampleVersion: (version) =>
    set((state) => ({
      sample: {
        ...state.sample,
        version:
          typeof version === "function"
            ? version(state.sample.version)
            : version,
      },
    })),
}));

export default useVersionControlStore;
