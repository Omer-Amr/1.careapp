"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {Form, FormControl} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"
import { FormFieldType } from "./PetientForm"
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group"
import { GenderOptions } from "@/constants"
import { Label } from "@radix-ui/react-label"

 
const  RegisterForm = ({user}: { user: User }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState (false);
  // 1. Define my form.
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email:"",
      phone:"",
    },
  })
 
  // 2. Define our submit handler.
  async function onSubmit({name, email, phone}: z.infer<typeof UserFormValidation>) {

    setIsLoading(true);
    try {
      const userData = {name, email, phone};

      const user = await createUser(userData);

      if(user) router.push(`/patients/${user.$id}/register`)

    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
      <section className="space-y-4">
        <h1>Welcome! 🙌🏼</h1>
        <p className="text-dark-700">Let us know more about yourself.</p>
      </section>

      <section className="space-y-6">
        <div className="mb-9 space-y-1">
            <h2 className="sub-header">Personal Information</h2>
        </div>
      </section>

      <CustomFormField 
        fieldType={FormFieldType.INPUT}
        control={form.control}
        name="name"
        label="Full Name"
        placeholder="Amr ist"
        iconSrc="/assets/icons/user.svg"
        iconAlt="user"
      />

      <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField 
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label="Email"
            placeholder="amr@ilovesyria.com"
            iconSrc="/assets/icons/email.svg"
            iconAlt="user"
        />
        <CustomFormField 
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="phone"
            label="Phone number"
            placeholder="+963 932 456 789"
            
        />
      </div>

      <div className="flex flex-col gap-6 xl:flex-row">
      <CustomFormField 
            fieldType={FormFieldType.DATE_PICKER}
            control={form.control}
            name="birthDate"
            label="Date of Birth"
        />

        <CustomFormField 
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="gender"
            label="Gender"
            renderSkeleton={(field) => (
                <FormControl>
                    <RadioGroup 
                    className="flex h-11 gap-6 xl:justify-between"
                    onValueChange={field.onChange}
                    value={field.value}
                    >
                        {GenderOptions.map((option) => (
                          <div key={option} className="flex h-11 gap-6 xl:justify-between">
                            <RadioGroupItem value={option} id={option} className="aspect-square h-4 w-4 rounded-full border border-primary text-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground" />
                            <Label htmlFor={option} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                                {option}
                            </Label>
                          </div>
                    ))}               
                    </RadioGroup>
                </FormControl>
            )}
            
        />
      </div>

      <div className="flex flex-col gap-6 xl:flex-row">
        
      </div>

      <div className="flex flex-col gap-6 xl:flex-row">
        
      </div>

      <div className="flex flex-col gap-6 xl:flex-row">
        
      </div>

      <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
    </form>
  </Form>
  )
}

export default RegisterForm