"use client";
import { UserButton } from '@clerk/nextjs'
import { useAuth } from '@clerk/nextjs';
import Link from 'next/link';

const Home = () => {
  const {isSignedIn}=useAuth();

  return (
    <div>
      <p>Home</p>

      <div className='flex items-center gap-x-2'>
            <Link href={isSignedIn?"/":"/sign-up"}>
            <button>Get Started</button>
            </Link>
        </div>

    </div>
  )
}

export default Home