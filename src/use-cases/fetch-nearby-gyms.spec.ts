import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNerabyGyms } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNerabyGyms

describe('Fetch Nearby Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNerabyGyms(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      latitude: -27.2092052,
      longitude: -49.6401091,
      description: 'description',
      phone: '123456',
    })

    await gymsRepository.create({
      title: 'Far Gym',
      latitude: -27.0610928,
      longitude: -49.5229501,
      description: 'description',
      phone: '123456',
    })

    const { gyms } = await sut.execute({
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
