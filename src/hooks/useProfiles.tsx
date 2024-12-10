import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Profile } from '@/types/database';

export const useProfiles = () => {
  const queryClient = useQueryClient();

  const getProfiles = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*');
    
    if (error) throw error;
    return data as Profile[];
  };

  const updateProfile = async (profile: Partial<Profile>) => {
    const { data, error } = await supabase
      .from('profiles')
      .update(profile)
      .eq('id', profile.id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  };

  const { data: profiles, isLoading } = useQuery({
    queryKey: ['profiles'],
    queryFn: getProfiles,
  });

  const { mutate: updateProfileMutation } = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profiles'] });
    },
  });

  return {
    profiles,
    isLoading,
    updateProfile: updateProfileMutation,
  };
};