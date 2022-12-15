import { plainToInstance } from "class-transformer";
import { ifNullDefault, typeOrUndefined } from "../pkg/utils";

export class Merchant {
  id: number = 0;
  name: string = "";
  phone: string = "";
  lat: number = 0;
  lon: number = 0;
  is_active: boolean = true;
  created_at: string = "";
  updated_at: string = "";

  static fromPlain = (data: any) => {
    const m = plainToInstance(Merchant, data);
    m.created_at = new Date(m.created_at).toISOString();
    m.updated_at = new Date(m.updated_at).toISOString();
    return m;
  };
}

export interface CreateMerchant {
  name: string;
  phone: string;
  lat: number;
  lon: number;
  is_active: boolean;
}

export interface UpdateMerchant {
  id: number;
  name?: string;
  phone?: string;
  lat?: number;
  lon?: number;
  is_active?: boolean;
  updated_at?: Date;
}

export const SanitizeCreateMerchant = (
  args: CreateMerchant
): CreateMerchant => ({
  name: ifNullDefault<string>(args.name, ""),
  phone: ifNullDefault<string>(args.phone, ""),
  lat: parseFloat(ifNullDefault<string>(args.lat, "0")),
  lon: parseFloat(ifNullDefault<string>(args.lon, "0")),
  is_active: ifNullDefault<boolean>(args.is_active, true),
});

export const SanitizeUpdateMerchant = (
  args: UpdateMerchant
): UpdateMerchant => ({
  id: args.id,
  name: typeOrUndefined(args.name, "string"),
  phone: typeOrUndefined(args.phone, "string"),
  lat: typeOrUndefined(args.lat, "number"),
  lon: typeOrUndefined(args.lon, "number"),
  is_active: typeOrUndefined(args.is_active, "boolean"),
});

export default Merchant;
