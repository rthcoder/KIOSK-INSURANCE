import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

export class FilterService {
  static async applyFilters(
    modelName: keyof Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'>,
    filters: Array<{ column: string; operator: string; value: any }>,
    sort: { column: string; value: 'asc' | 'desc' },
  ): Promise<any> {
    const query: Prisma.UserFindManyArgs = {
      where: {},
      orderBy: {},
    }

    // Filtrlarni qo'llash
    filters.forEach((filter) => {
      if (filter.operator === 'between' && filter.column === 'createdAt') {
        // 'between' operatorini tekshirish
        const date = filter.value.split('_')
        if (date.length !== 2) {
          return // Date formati noto'g'ri bo'lsa, o'tkazib yuboriladi
        }

        query.where = {
          ...query.where,
          createdAt: {
            gte: date[0],
            lte: date[1],
          },
        }
      } else if (filter.operator === 'to' && filter.column === 'createdAt') {
        // 'to' operatori uchun createdAt gacha bo'lgan yozuvlarni olish

        query.where = {
          ...query.where,
          createdAt: {
            lte: filter.value,
          },
        }
      } else {
        if (filter.value === null || filter.value === '') {
          return // Bo'sh qiymatlar uchun filtrlarni o'tkazib yuboramiz
        }

        if (typeof filter.value === 'number' || filter.value == 0) {
          query.where = {
            ...query.where,
            [filter.column]: {
              equals: filter.value,
            },
          }
        } else {
          query.where = {
            ...query.where,
            [filter.column]: {
              contains: filter.value.slice(0, 11),
              mode: 'insensitive', // Katta-kichik harfga e'tibor bermaslik uchun
            },
          }
        }
      }
    })

    // Sortlash
    if (sort && sort.column && sort.value) {
      query.orderBy = {
        [sort.column]: sort.value,
      }
    } else {
      query.orderBy = {
        id: 'desc', // Default tartiblash
      }
    }

    // Dinamik model nomidan foydalanib so'rov yuborish
    const model: any = prisma[modelName as keyof PrismaClient] // Prisma modeliga dinamik kirish
    return model['findMany'](query) // 'findMany' metodini dinamik ravishda chaqirish
  }
}
