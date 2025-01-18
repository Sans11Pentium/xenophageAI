"use client";
import { UserButton } from '@clerk/nextjs'
import { useAuth } from '@clerk/nextjs';
import Link from 'next/link';

const Home = () => {
  const {isSignedIn}=useAuth();

  return (
    <div>
      <p>Home</p>
      {/* <UserButton /> */}
    </div>
  )
}

export default Home