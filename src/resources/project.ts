export type Project = {
  id?: number;
  projectTitle?: string;
  projectDescription?: string;
  projectImage?: string;
  projectDetails?: string;
  userId?: number;
  username?: string;
  userImage?: string;
};

export type ProjectProps = {
  project: Project;
};

export type ProjectCategory = {
  id?: number;
  categoryName?: string;
  projectId?: number;
};

