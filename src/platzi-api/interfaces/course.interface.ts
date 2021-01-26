export interface Course {
  id: number;
  title: string;
  slug: string;
  image: string;
  color: string;
  badge: string;
  url: string;
  approved: boolean;
  diploma?: any;
  completed: number;
  career: string;
  deprecated: boolean;
  diploma_link: string;
  exam_url?: any;
  material_seen: number;
  total_material: number;
  has_exam: string;
}
