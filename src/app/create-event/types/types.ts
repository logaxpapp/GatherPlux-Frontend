export type CategoryInterest = {
  id: number;
  name: string;
  description: string,
  category_id: number,
  created_at: Date | string;
  updated_at: Date | string;
  archived: boolean;
};


export type CategoryItem = {
  id: number;
  name: string;
  description: string,
  created_at: Date | string;
  updated_at: Date | string;
  archived: boolean,
  interests: CategoryInterest[];
};

export interface StateProp {
  id: number,
  code: string,
  name: string,
  subdivision: string | null,
  country_code: string,
  created_at: string | Date,
  updated_at: string | Date,
  archived: boolean;
}

export interface combinedStateAndCategoryProps {
  id: number;
  name: string;
  description?: string,
  created_at: Date | string;
  updated_at: Date | string;
  archived: boolean,
  interests?: CategoryInterest[];
  code?: string,
  subdivision?: string | null,
  country_code?: string,
}

export type eventCardItem = {
  id: string | null | undefined;
  images: string | undefined;
  title: string | undefined;
  city: string | undefined;
  time: string | undefined;
  price: number | undefined;
  likes: number | undefined;
  month: string | undefined;
  day: number | undefined;
  start_date: string | undefined;
};