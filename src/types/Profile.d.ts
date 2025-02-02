export type Profile = {
    name: string;
    email: string;
    avatar?: { url: string; alt: string };
    banner?: { url: string; alt: string };
    accessToken: string;
    venueManager?: boolean;
};
