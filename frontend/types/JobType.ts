export interface JobType {
  _id: string;
  companyName: string;
  jobTitle: string;
  linkJD: string;
  jobField: string;
  textJD: string;
  status: "Applied" | "Rejected" | "No response" | "Had Interview" | "Had OA";
  created_at: string;
  updated_at: string;
}
