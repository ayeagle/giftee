export type GroupGift = {
  gift_id: string;
  requester: string;
  requester_id: string;
  giver: string;
  giver_id: string;
  cost: number;
  taken: boolean;
  gift_name: string;
  details: string;
  url: string;
  year: number;
  group_ids: string[];
};

export type GroupObject = {
  group_name: string;
  group_id: string;
  description: string;
  group_members: string[];
  user_ids: string[];
  user_names: string[];
  admin_ids: string[];
  num_users: number;
  referral_hash: string;
  invite_link: string;
  gift_exchange_time: number;
  gift_exchange_date: string;
  year: number;
  gifts: GroupGift[];
};

export type RichGroupGift = {
  active: boolean;
  admin_ids: string[];
  cost: number | null;
  created_at: string;
  description: string;
  details: string;
  gift_exchange_time: number;
  gift_name: string;
  giver_id: string | null;
  giver_name: string | null;
  group_ids: string[];
  group_year: number;
  id: string;
  mode: number;
  name: string;
  old_admin_ids: string[] | null;
  old_user_ids: string[] | null;
  participants: string[] | null;
  referral_hash: string;
  requester_id: string;
  requester_name: string;
  taken: boolean;
  unique_id: string;
  url: string;
  user_ids: string[] | null;
  user_names: string[] | null;
  year: number;
};

export type UserDetails = {
  id: string;
  name: string;
  email: string;
  groups: string[];
  adminship: number;
  created_date: number;
};

export function CreateGroupObject() {
  const new_group_data_object: GroupObject = {
    group_name: "",
    group_id: "",
    description: "",
    group_members: [],
    user_ids: [],
    user_names: [],
    admin_ids: [],
    num_users: 0,
    referral_hash: "",
    invite_link: "",
    gift_exchange_time: 0,
    gift_exchange_date: "",
    year: 0,
    gifts: [],
  };
  return new_group_data_object;
}

export function CreateUserObject() {
  const new_user_object: UserDetails = {
    id: "",
    name: "",
    email: "",
    groups: [],
    adminship: 0,
    created_date: 0,
  };
  return new_user_object;
}
