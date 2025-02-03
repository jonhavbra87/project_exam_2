export interface Owner {
  name: string;
  email: string;
  bio?: string;
  avatar: {
    url: string;
    alt: string;
  };
  banner: {
    url: string;
    alt: string;
  };
}
