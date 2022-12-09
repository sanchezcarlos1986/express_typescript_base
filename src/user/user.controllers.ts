import {NextFunction, Request, Response} from 'express';
import {IncomingUser, OutterUser} from './user';
import {UserDTO} from './user.dto';

export const getAllUsers = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users: OutterUser[] = await fetch(
      'https://jsonplaceholder.typicode.com/users',
    )
      .then(res => res.json())
      .then(data => {
        return data.map((user: IncomingUser) => new UserDTO(user));
      });

    res.send(users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const result: IncomingUser[] = await fetch(
      'https://jsonplaceholder.typicode.com/users',
    )
      .then(res => res.json())
      .then(data => {
        return data.map((user: IncomingUser) => new UserDTO(user));
      });

    const user: OutterUser | undefined = result.find(
      u => String(u.id) === req.params.id,
    );

    if (!user) {
      res.sendStatus(404).json({message: 'User not found'});
    }

    res.send(user);
  } catch (error) {
    next(error);
  }
};
