import { createContext, useContext } from 'react';
import { useAuth } from './AuthContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

type UserRole = 'user' | 'educator' | 'admin' | 'super_admin';

interface RoleContextType {
  role: UserRole | null;
  isLoading: boolean;
  isEducator: boolean;
  isAdmin: boolean;
  isSuperAdmin: boolean;
}

const RoleContext = createContext<RoleContextType>({
  role: null,
  isLoading: true,
  isEducator: false,
  isAdmin: false,
  isSuperAdmin: false,
});

export const RoleProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();

  const { data: role, isLoading } = useQuery({
    queryKey: ['userRole', user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching user role:', error);
        return null;
      }

      return data?.role as UserRole;
    },
    enabled: !!user,
  });

  const value = {
    role,
    isLoading,
    isEducator: role === 'educator',
    isAdmin: role === 'admin',
    isSuperAdmin: role === 'super_admin',
  };

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};