import Pet, { IPet } from '../model/exemplo';

interface ICreatePetInput {
  name: IPet['name'];
}

async function CreatePet({ name }: ICreatePetInput): Promise<IPet> {
  return await Pet.create({
    name
  })
    .then((data: IPet) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });
}

export default {
  CreatePet
};