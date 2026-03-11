export const API_BASE_URL = "http://localhost:5222";

export const getFullUrl = (path: string | null | undefined): string | undefined => {

  if (!path) {

    return undefined;
  }

  if (path.startsWith('http')) {

    return path;
  }

  const cleanPath = path.startsWith('/') ? path : `/${path}`;

  return `${API_BASE_URL}${cleanPath}`;
};