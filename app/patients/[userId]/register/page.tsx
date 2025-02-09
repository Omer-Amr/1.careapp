import RegisterForm from '@/components/forms/RegisterForm'
import { getUser } from '@/lib/actions/patient.actions'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


type SearchParamProps = {
  params: {
    userId: string
  }
}

const Register = async (props: SearchParamProps) => {
  const params = await props.params;
  const userId = params.userId;
  const user = await getUser(userId);

  return (
    <div className="flex h-screen max-h-screen">
      <section className= "remove-scrollbar container" >
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Image 
            src="/assets/icons/logo-full.svg"
            width={1000}
            height={1000}
            alt="petient"
            className="mb-12 h-10 w-fit"
            />
            <RegisterForm user={user} />
            <div className="text-14-regular mt-20 flex justify-between" >
              <p className="copywrite py-12">
                 © 2024 CarePules
              </p>
            </div>
        </div>
      </section>
        <Image
            src="/assets/images/register-img.png"
            height={1000}
            width={1000}
            alt="ptient"
            className="side-img max-w-[390px]"
        />
    </div>
  )
}

export default Register