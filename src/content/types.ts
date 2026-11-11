export type Tautan = { label: string; href: string };

export type Profil = {
  nama: string;
  subjudul: string;
  catatanDaftar: string;
  cv: Tautan;
};

export type Pendidikan = {
  sekolah: string;
  jurusan: string;
  periode: string;
  catatan?: string;
};

export type Tentang = {
  id: "tentang";
  judul: string;
  ringkasan: string;
  pendidikan: Pendidikan[];
};

export type Peran = {
  peran: string;
  organisasi: string;
  periode: string;
  lokasi: string;
  deskripsi: string;
};

export type Pengalaman = {
  id: "pengalaman";
  judul: string;
  daftar: Peran[];
};

export type StatusProject = "in-use" | "in-development";

export type ItemProject = {
  nama: string;
  status: StatusProject;
  deskripsi: string;
  stack: string[];
  repo: Tautan;
  demo?: Tautan;
};

export type Project = {
  id: "project";
  judul: string;
  daftar: ItemProject[];
};

export type GrupSkill = { nama: string; item: string[] };

export type Sertifikasi = { nama: string; ringkas: string; bulan: string };

export type Skill = {
  id: "skill";
  judul: string;
  grup: GrupSkill[];
  penerbitSertifikasi: string;
  sertifikasi: Sertifikasi[];
  sertifikasiLain: string[];
};

export type PlatformFreelance = { nama: string; href?: string };

export type Kontak = {
  id: "kontak";
  judul: string;
  ringkasan: string;
  email: string;
  tautan: Tautan[];
  freelance: PlatformFreelance[];
};

export type Section = Tentang | Pengalaman | Project | Skill | Kontak;
