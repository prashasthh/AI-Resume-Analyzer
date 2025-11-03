export type Template = {
  slug: string;
  title: string;
  thumb: string; // path under /public
};

export const templates: Template[] = [
  { slug: "resume-for-js-mastery", title: "Resume for JS Mastery", thumb: "/images/resume_01.png" },
  { slug: "modern-product-manager", title: "Modern Product Manager", thumb: "/images/resume_02.png" },
  { slug: "fullstack-developer", title: "Fullstack Developer", thumb: "/images/resume_03.png" },
  { slug: "data-analyst", title: "Data Analyst", thumb: "/images/resume_01.png" },
];
