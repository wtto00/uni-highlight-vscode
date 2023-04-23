import type { Platform } from './constants'
import { PLATFORM_LIST } from './constants'
import { parseComment } from './parseComment'

export function getPlatformInfo(code: string): PlatformInfo[] {
  const commentAST = parseComment(code)

  if (!commentAST)
    return []

  const platformInfo = []
  for (let i = 0; i < commentAST.length; i++) {
    const item = commentAST[i]
    const { start, end, type, row } = item

    if (type === 'prefix') {
      platformInfo.push({
        start,
        end,
        type,
      })
    }
    else if (type === 'platform' && PLATFORM_LIST.includes(row as Platform)) {
      platformInfo.push({
        start,
        end,
        type,
      })
    }
    else if (type === 'platform' && !PLATFORM_LIST.includes(row as Platform)) {
      platformInfo.push({
        start,
        end,
        type: 'unPlatform',
        row,
      })
    }
  }
  return platformInfo as PlatformInfo[]
}

export interface PlatformInfo {
  row: string
  start: number
  end: number
  type: 'prefix' | 'platform' | 'unPlatform'
}
