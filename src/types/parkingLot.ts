import * as z from "zod";

export const ParkingInfoListSchema = z.object({
  parkingCode: z.string(),
  parkingName: z.string(),
  operationRuleNm: z.string(),
  parkingTypeNm: z.string(),
  addrRoad: z.union([z.null(), z.string()]),
  addrJibun: z.string(),
  capa: z.string(),
  handyCapa: z.string(),
  womanCapa: z.union([z.null(), z.string()]),
  elecFast: z.union([z.null(), z.string()]),
  elecLow: z.union([z.null(), z.string()]),
  lvl: z.string(),
  rotSys: z.string(),
  workDate: z.string(),
  weekdayBeginTime: z.string(),
  weekdayEndTime: z.string(),
  weekendBeginTime: z.union([z.null(), z.string()]),
  weekendEndTime: z.union([z.null(), z.string()]),
  holidayBeginTime: z.union([z.null(), z.string()]),
  holidayEndTime: z.union([z.null(), z.string()]),
  payYn: z.union([z.null(), z.string()]),
  timeRate: z.union([z.null(), z.string()]),
  rates: z.union([z.null(), z.string()]),
  addTimeRate: z.union([z.null(), z.string()]),
  addRates: z.union([z.null(), z.string()]),
  dayPassTime: z.union([z.null(), z.string()]),
  dayPassCost: z.union([z.null(), z.string()]),
  fulltimeMonthly: z.union([z.null(), z.string()]),
  payMtd: z.union([z.null(), z.string()]),
  descr: z.union([z.null(), z.string()]),
  mngAgc: z.union([z.null(), z.string()]),
  tel: z.union([z.null(), z.string()]),
  lat: z.union([z.null(), z.string()]),
  lng: z.union([z.null(), z.string()]),
  syncTime: z.coerce.date(),
  photo: z.union([z.null(), z.string()]),
});
export type ParkingInfoList = z.infer<typeof ParkingInfoListSchema>;

export const SelfSchema = z.object({
  href: z.string(),
});
export type Self = z.infer<typeof SelfSchema>;

export const LinksSchema = z.object({
  self: SelfSchema,
});
export type Links = z.infer<typeof LinksSchema>;

export const ParkingLotResponseSchema = z.object({
  resultCode: z.string(),
  resultMsg: z.string(),
  pageIndex: z.string(),
  pageSize: z.string(),
  startPage: z.string(),
  totalCount: z.string(),
  parkingInfoList: z.array(ParkingInfoListSchema),
  _links: LinksSchema,
});
export type ParkingLotResponse = z.infer<typeof ParkingLotResponseSchema>;
