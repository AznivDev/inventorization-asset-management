export type TRequestStatus = "pending" | "approved" | "rejected";

export interface IRequestModel {
  id: number;
  status: TRequestStatus;
  actionDate?: string;
  reason: string;
  createdAt: string;
  owner?: string;
}
