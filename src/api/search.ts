import { GET } from "@/utils/requests"

export default async (start: number, kw: string): Promise<any> => {
  const result = await GET('/search', { start, count: 24, a: 'search', kw })
  return result;
}

// http://wallpaper.apc.360.cn/index.php?c=WallPaper&a=search&kw=${kw}&start=${start}&count=${count}