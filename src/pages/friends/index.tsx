import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import withAuth from '@/components/auth/withAuth';
import TopNavigation from '@/components/TopNavigation';
import { useFriends } from '@/hooks/useFriends';
import { UserDTO } from '@/types';

type FriendsProps = {
  user: UserDTO;
};

function Friends({ user }: FriendsProps) {
  const { friends, isLoading, error } = useFriends({ userId: user!.id });
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFriends = friends?.filter((friend) =>
    friend.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <TopNavigation path="/" />
      <div className="flex h-screen flex-col gap-5 px-5 py-2">
        <div className="mb-2 flex items-center justify-between">
          <div className="text-[36px] font-semibold">친구 목록</div>
          <div className="flex items-center gap-4">
            <Link href={'/friends'}>
              <div className="cursor-pointer text-[16px] font-light text-[#3160d8]">친구 추가</div>
            </Link>
            <Link href={'/profile'}>
              <Image
                src={user.profileImageUrl || '/profile.png'}
                alt={user.name || '프로필 이미지'}
                width={35}
                height={35}
                className="rounded-full"
                priority
              />
            </Link>
          </div>
        </div>
        <div className="mh-8 flex h-full w-full flex-col rounded-3xl bg-white p-8">
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="검색"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-md border p-2 pr-4"
            />
          </div>
          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="text-center">친구 목록을 불러오는 중...</div>
            ) : error ? (
              <div className="text-center text-red-500">오류 발생: {error}</div>
            ) : filteredFriends && filteredFriends.length > 0 ? (
              filteredFriends.map((friend) => (
                <div key={friend.id} className="mb-2 flex items-center">
                  <Image
                    src={friend.profileImageUrl || '/profile.png'}
                    alt={friend.name || '프로필 이미지'}
                    width={40}
                    height={40}
                    className="mr-3 rounded-full"
                  />
                  <span>{friend.name}</span>
                </div>
              ))
            ) : (
              <div className="text-center">친구가 없습니다.</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default withAuth(Friends);
