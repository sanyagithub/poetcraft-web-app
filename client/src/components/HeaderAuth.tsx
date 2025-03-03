'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../contexts/auth-context';
import { Button } from '@/src/components/ui/button';
import { User } from 'lucide-react';

export function HeaderAuth() {
    const { user, logout } = useAuth();

    return (
        <div>
            {user ? (
                <div className="flex items-center space-x-4">
                    <Link href="/profile" className="text-purple-600 hover:text-purple-800">
                        <User className="h-5 w-5" />
                    </Link>
                    <Button onClick={logout} variant="outline">
                        Logout
                    </Button>
                </div>
            ) : (
                <div className="space-x-2">
                    <Link href="/login">
                        <Button variant="outline">Login</Button>
                    </Link>
                    <Link href="/signup">
                        <Button>Sign Up</Button>
                    </Link>
                </div>
            )}
        </div>
    );
}
