import { GetUserMetricsUseCase } from '../get-user-metrics'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeGetUserMetricsUseCase() {
  const chekInsRepository = new PrismaCheckInsRepository()
  const useCase = new GetUserMetricsUseCase(chekInsRepository)

  return useCase
}
