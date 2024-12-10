import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Match, Message } from '@/types/database';

export const useMatches = (userId: string) => {
  const queryClient = useQueryClient();

  const getMatches = async () => {
    const { data, error } = await supabase
      .from('matches')
      .select(`
        *,
        user1:profiles!matches_user1_id_fkey(*),
        user2:profiles!matches_user2_id_fkey(*)
      `)
      .or(`user1_id.eq.${userId},user2_id.eq.${userId}`)
      .eq('status', 'accepted');
    
    if (error) throw error;
    return data;
  };

  const createLike = async ({ liked_id, is_super_like }: { liked_id: string, is_super_like: boolean }) => {
    const { data, error } = await supabase
      .from('likes')
      .insert({
        liker_id: userId,
        liked_id,
        is_super_like,
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  };

  const sendMessage = async ({ match_id, content }: { match_id: string, content: string }) => {
    const { data, error } = await supabase
      .from('messages')
      .insert({
        match_id,
        sender_id: userId,
        content,
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  };

  const { data: matches, isLoading: matchesLoading } = useQuery({
    queryKey: ['matches', userId],
    queryFn: getMatches,
    enabled: !!userId,
  });

  const { mutate: createLikeMutation } = useMutation({
    mutationFn: createLike,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['matches', userId] });
    },
  });

  const { mutate: sendMessageMutation } = useMutation({
    mutationFn: sendMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    },
  });

  return {
    matches,
    matchesLoading,
    createLike: createLikeMutation,
    sendMessage: sendMessageMutation,
  };
};