import {Repository, User} from './user.types';

export const getUsers = async (userRepository: Repository) => {
  const users: User[] = await userRepository.getAll();
  return users;
};

export const createUser = async (
  userRepository: Repository,
  userData: User,
) => {
  const user: User = await userRepository.create(userData);
  return user;
};
