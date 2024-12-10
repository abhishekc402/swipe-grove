export interface Profile {
  id: string;
  user_id: string;
  name: string;
  age: number;
  bio: string;
  location: string;
  interests: string[];
  gender: string;
  looking_for: string[];
  created_at: string;
  updated_at: string;
  image_url: string;
}

export interface Match {
  id: string;
  user1_id: string;
  user2_id: string;
  created_at: string;
  status: 'pending' | 'accepted' | 'rejected';
}

export interface Message {
  id: string;
  match_id: string;
  sender_id: string;
  content: string;
  created_at: string;
}

export interface Like {
  id: string;
  liker_id: string;
  liked_id: string;
  is_super_like: boolean;
  created_at: string;
}