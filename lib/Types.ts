export type AddProps = {
  item: {
    newLabel: string;
    newCategory: string;
  };
};

export type User = {
  id: number;
  email: string;
  password?: string;
  username: string;
};

export type Update = {
  update: {
    id: number;
    newName: string;
  };
};

export type Item = {
  id: number;
  label: string;
  category: string;
  list: boolean;
  user_id: number;
};

export type Toggle = {
  item: {
    id: number;
    list: boolean;
  };
};
