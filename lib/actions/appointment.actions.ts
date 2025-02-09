'use server'

import { ID } from "node-appwrite";
import { DATABASE_ID, databases } from "../appwrite.config";
import { APPOINTMENT_COLLECTION_ID } from "../appwrite.config";
import { parseStringify } from "../utils";

export const createAppointment = async (appontment: CreateAppointmentParams) => {
    try {
        const newAppointment = await databases.createDocument(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            ID.unique(),
            appontment
        )

        return parseStringify(newAppointment);
    } catch (error) {
       console.log(error); 
    }
}

export const getAppointment = async (appointmentId: string) => {
    try {
      const appointment = await databases.getDocument(
        DATABASE_ID!,
        APPOINTMENT_COLLECTION_ID!,
        appointmentId,
      );
  
      return parseStringify(appointment);
    } catch (error) {
      console.error(
        "An error occurred while retrieving the existing patient:",
        error
      );
    }
  };