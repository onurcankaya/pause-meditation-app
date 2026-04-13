'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Loader, UserPen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PageWrapper from '@/components/common/PageWrapper';
import QueryState from '@/components/common/QueryState';
import { useUser, useUpdateUser } from '@/hooks/useUser';

export default function ProfilePage() {
  const { data: session } = useSession();
  const { data: user, isLoading, error } = useUser(session?.user?.id || '');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email);
    }
  }, [user]);

  const updateUser = useUpdateUser();

  function handleUpdateUser() {
    if (!user?.id) return;

    updateUser.mutate({
      id: user.id,
      data: {
        name,
        email,
      },
    });
  }

  function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    handleUpdateUser();
  }

  if (!session) return null;

  return (
    <PageWrapper
      icon={UserPen}
      title={user?.name}
      description="User details"
      isLoading={isLoading}
    >
      <QueryState isLoading={isLoading} error={error}>
        <Card className="w-full pt-4 pb-6">
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6 mt-2">
              <div>
                <Label htmlFor="name" className="mb-3">
                  Name*
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  disabled={isLoading}
                  required
                />
              </div>

              <div>
                <Label htmlFor="email" className="mb-3">
                  Email*
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  disabled={isLoading}
                  required
                />
              </div>

              {updateUser.error && (
                <div className="rounded-lg border border-red-500/50 bg-red-500/10 p-3">
                  <p className="text-sm text-red-400">
                    Error updating user info
                  </p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={updateUser.isPending || isLoading}
              >
                {(updateUser.isPending || isLoading) && (
                  <Spinner icon={Loader} className="text-black" />
                )}
                {updateUser.isPending ? 'Saving changes...' : 'Save changes'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </QueryState>
    </PageWrapper>
  );
}
