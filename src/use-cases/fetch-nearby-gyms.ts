import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'

interface FetchNerabyGymsRequest {
  userLatitude: number
  userLongitude: number
}

interface FetchNerabyGymsResponse {
  gyms: Gym[]
}

export class FetchNerabyGyms {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNerabyGymsRequest): Promise<FetchNerabyGymsResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return {
      gyms,
    }
  }
}
