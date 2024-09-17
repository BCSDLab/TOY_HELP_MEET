import { useState, useEffect } from 'react';
import { ApiResponse } from '@/types/api/api';

interface Friend {
  id: number;
  name: string | null;
  profileImageUrl: string | null;
}

interface UseFriendsProps {
  userId: number;
}

interface UseFriendsResult {
  friends: Friend[] | null;
  isLoading: boolean;
  error: string | null;
}

export function useFriends({ userId }: UseFriendsProps): UseFriendsResult {
  const [friends, setFriends] = useState<Friend[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFriends = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/friends');
        if (!response.ok) {
          throw new Error('Failed to fetch friends');
        }

        const data: ApiResponse<Friend[]> = await response.json();
        if (!data.success || !data.data) {
          throw new Error(data.message || 'Failed to fetch friends');
        }

        setFriends(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFriends();
  }, [userId]);

  return { friends, isLoading, error };
}
