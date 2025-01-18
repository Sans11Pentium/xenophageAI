"use client";
import { useAuth } from '@clerk/nextjs';

const Home = () => {
  const {isSignedIn}=useAuth();

  return (
    <div>
      <p>Home</p>
    </div>
  )
}

export default Home