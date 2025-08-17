import soundsData from "@/services/mockData/sounds.json";

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getAll = async () => {
  await delay(300);
  return [...soundsData];
};

export const getById = async (id) => {
  await delay(200);
  const sound = soundsData.find(s => s.Id === id);
  if (!sound) {
    throw new Error(`Sound with id ${id} not found`);
  }
  return { ...sound };
};

export const getByCategory = async (category) => {
  await delay(250);
  return soundsData.filter(s => s.category === category).map(s => ({ ...s }));
};

export const create = async (soundData) => {
  await delay(400);
  const newId = Math.max(...soundsData.map(s => s.Id)) + 1;
  const newSound = {
    Id: newId,
    ...soundData
  };
  soundsData.push(newSound);
  return { ...newSound };
};

export const update = async (id, soundData) => {
  await delay(350);
  const index = soundsData.findIndex(s => s.Id === id);
  if (index === -1) {
    throw new Error(`Sound with id ${id} not found`);
  }
  
  soundsData[index] = { ...soundsData[index], ...soundData };
  return { ...soundsData[index] };
};

export const remove = async (id) => {
  await delay(300);
  const index = soundsData.findIndex(s => s.Id === id);
  if (index === -1) {
    throw new Error(`Sound with id ${id} not found`);
  }
  
  const deletedSound = { ...soundsData[index] };
  soundsData.splice(index, 1);
  return deletedSound;
};