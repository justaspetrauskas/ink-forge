export type TattooStyleConfig = {
  label: string;
  description: string;
  recommendedLineQuality: string;
  recommendedShading: string;
};

export type TattooSizeConfig = {
  label: string;
  bodyFit: string;
};

export const TATTOO_STYLES: TattooStyleConfig[] = [
  {
    label: "Traditional",
    description: "Bold outlines, iconic motifs, heavy readability.",
    recommendedLineQuality: "Bold",
    recommendedShading: "Strong contrast"
  },
  {
    label: "Minimal",
    description: "Clean forms, restrained detail, strong negative space.",
    recommendedLineQuality: "Fine",
    recommendedShading: "Light"
  },
  {
    label: "Japanese",
    description: "Flow-focused composition with movement and symbolism.",
    recommendedLineQuality: "Mixed",
    recommendedShading: "Detailed texture"
  },
  {
    label: "Realism",
    description: "Depth-first rendering with gradient and texture accuracy.",
    recommendedLineQuality: "Fine",
    recommendedShading: "Smooth depth"
  }
];

export const TATTOO_SIZES: TattooSizeConfig[] = [
  {
    label: "Small",
    bodyFit: "Best for wrist, ankle, or behind ear"
  },
  {
    label: "Medium",
    bodyFit: "Best for forearm, calf, or shoulder"
  },
  {
    label: "Large",
    bodyFit: "Best for thigh, back, or chest"
  }
];

export const LINE_QUALITY_OPTIONS = ["Fine", "Bold", "Mixed"] as const;

export const SHADING_OPTIONS = ["Light", "Strong contrast", "Detailed texture", "Smooth depth"] as const;
