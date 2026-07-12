export type TattooIdeaInput = {
  idea: string;
  style: string;
  lineQuality: string;
  shading: string;
  placement: string;
  size: string;
};

export type TattooImageOutput = {
  url: string;
  sortOrder: number;
};

export type TattooProjectSummary = {
  id: string;
  idea: string;
  prompt: string;
  createdAt: string;
  images: TattooImageOutput[];
};
