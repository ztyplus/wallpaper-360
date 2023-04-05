import { GET } from "@/utils/requests"

export default async (cid: number, start: number): Promise<any> => {
  const result = await GET('/imglist', { cid, start, count: 24, a: 'getAppsByCategory' })
  return result;
}