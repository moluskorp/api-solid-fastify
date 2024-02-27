import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUSersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists'

let usersRepository: InMemoryUSersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUSersRepository()
    sut = new RegisterUseCase(usersRepository)
  })
  it('should hash the password before saving the user', async () => {
    const password = '1234'

    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password,
    })

    const isPasswordCorrectlyHashed = await compare(
      password,
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'johndoe@example.com'

    await sut.execute({
      name: 'John Doe',
      email,
      password: '1234',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email,
        password: '1234',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should be able to register', async () => {
    const password = '1234'

    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password,
    })

    expect(user.id).toEqual(expect.any(String))
  })
})
