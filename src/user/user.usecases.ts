import {Repository, User} from './user.types';

export const getUsers = async (userRepository: Repository) => {
  const users: User[] = await userRepository.getAll();
  return users;
};

export const getUserById = (userRepository: Repository, userId: string) => {
  return userRepository.getOneById(userId);
};

export const createUser = async (
  userRepository: Repository,
  userData: User,
) => {
  return userRepository.create(userData);
};

export const updateUser = async (
  userRepository: Repository,
  userId: string,
  userData: User,
) => {
  return userRepository.update(userId, userData);
};

export const deleteUser = async (
  userRepository: Repository,
  userId: string,
) => {
  return userRepository.delete(userId);
};
