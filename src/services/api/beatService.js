import beatsData from "@/services/mockData/beats.json";

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getAll = async () => {
  await delay(250);
  return [...beatsData];
};

export const getById = async (id) => {
  await delay(200);
  const beat = beatsData.find(b => b.Id === id);
  if (!beat) {
    throw new Error(`Beat with id ${id} not found`);
  }
  return { ...beat };
};

export const getByGenre = async (genre) => {
  await delay(300);
  return beatsData.filter(b => b.genre === genre).map(b => ({ ...b }));
};

export const create = async (beatData) => {
  await delay(400);
  const newId = Math.max(...beatsData.map(b => b.Id)) + 1;
  const newBeat = {
    Id: newId,
    ...beatData
  };
  beatsData.push(newBeat);
  return { ...newBeat };
};

export const update = async (id, beatData) => {
  await delay(350);
  const index = beatsData.findIndex(b => b.Id === id);
  if (index === -1) {
    throw new Error(`Beat with id ${id} not found`);
  }
  
  beatsData[index] = { ...beatsData[index], ...beatData };
  return { ...beatsData[index] };
};

export const remove = async (id) => {
  await delay(300);
  const index = beatsData.findIndex(b => b.Id === id);
  if (index === -1) {
    throw new Error(`Beat with id ${id} not found`);
  }
  
  const deletedBeat = { ...beatsData[index] };
  beatsData.splice(index, 1);
  return deletedBeat;
};