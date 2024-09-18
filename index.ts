import fs from "fs";

interface CustomError extends Error {
  message: string;
}

const stopTimes = "./tempData/stop_times.txt";
// console.log({ stopTimes });

async function getData(filePath: string) {
  try {
    const fileData = await fs.readFileSync(filePath, "utf8");
    // console.log("fileData:", fileData);
    const data = await fileData.split(/[\r\n]+/)?.slice(1);
    // console.log("data:", data[0], data.length);
    const regex = /\d{2}:\d{2}:\d{2},\d{2}:\d{2}:\d{2}/gi;
    const hoursArray = data.map((row) => row.match(regex));
    // console.log("hoursArray:", hoursArray, hoursArray.length);
    console.log("data.length===hoursArray.length:", data.length === hoursArray.length);
  } catch (error) {
    console.error(`Got an error trying to read the file: ${(error as CustomError)?.message!}`);
  }
}
getData(stopTimes);
