import mongoose, { Schema, Document } from "mongoose";

export interface IJob extends Document {
  companyName: string;
  jobTitle: string;
  linkJD: string;
  jobField: string;
  textJD: string;
  status: "Applied" | "Rejected" | "No response" | "Had Interview" | "Had OA";
  created_at: Date;
  updated_at: Date;
}

const JobSchema: Schema = new Schema(
  {
    companyName: { type: String, required: true },
    jobTitle: { type: String, required: true },
    linkJD: { type: String, required: true },
    jobField: { type: String, required: true },
    textJD: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: ["Applied", "Rejected", "No response", "Had Interview", "Had OA"],
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export default mongoose.model<IJob>("Job", JobSchema);
