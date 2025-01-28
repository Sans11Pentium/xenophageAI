import Header from '@/components/shared/Header'
import TransformationForm from '@/components/shared/TransformationForm';
import { transformationTypes } from '@/constants'
import { getUserById } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'

const AddTranformationTypePage = async ({ params }: SearchParamProps) => {
  const { type } = await params;
  const transformation = transformationTypes[type]; //from param of url access the type of tranfn v r at
  const { userId } = await auth();
  if(!userId) redirect('/sign-in');
  const user = await getUserById(userId);
  
  return (
    <>
      <Header 
      title={transformation.title} 
      subtitle={transformation.subTitle}
      />
      <section className='mt-10'>
        <TransformationForm 
        action="Add"
        userId={user.id}
        type={transformation.type as TransformationTypeKey}
        creditBalance={user.creditBalance}
        />
      </section>
    </>
  )
}

export default AddTranformationTypePage