import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCaseCase } from './create-gym'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCaseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCaseCase(gymsRepository)
  })

  it('should be able to create a gym', async () => {
    const { gym } = await sut.execute({
      latitude: 0,
      longitude: 0,
      title: 'Gym 01',
      description: 'description',
      phone: '123456',
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
