import { descriptionFakeDisplays, nameFakeDisplays } from "app/data/mockData";


export const getNamesFake = ()=>{
    const randomIndex = Math.floor(Math.random() * nameFakeDisplays.length);
    const randomNumber = generateRandomNumber(4)
    return `${randomNumber} - ${nameFakeDisplays[randomIndex]}`;
}
export const getDescriptionFake = () => {
  const randomIndex = Math.floor(Math.random() * descriptionFakeDisplays.length);
  return descriptionFakeDisplays[randomIndex];
};

export const generateRandomNumber = (digits:number) => {
  if (digits < 2 || digits > 4) return 
 
  const lowerBound = Math.pow(10, digits - 1);
  const upperBound = Math.pow(10, digits) - 1;
  return Math.floor(Math.random() * (upperBound - lowerBound + 1)) + lowerBound;
};
