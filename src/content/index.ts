import { kontak } from "./kontak";
import { pengalaman } from "./pengalaman";
import { project } from "./project";
import { skill } from "./skill";
import { tentang } from "./tentang";
import type { Section } from "./types";

export { profil } from "./profil";
export type * from "./types";

export const sections: Section[] = [tentang, pengalaman, project, skill, kontak];
