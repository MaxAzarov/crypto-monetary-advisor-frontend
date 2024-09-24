import { User } from "src/api/commonTypes/user.types";

export type GetMeResponse = User;

// external client that got temporary access to the system
export type ExternalClientUser = {
  email?: string;
  entityId?: string;
  actions: string[];
  entityType: string;
};
