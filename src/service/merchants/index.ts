import axios, { AxiosResponse } from "axios";
import { OnboardingTaskDto } from "./types";

const baseUrl = "http://185.185.126.15:8080/api";

export async function getTask(
  page: number,
  size: number
) {
  return await axios.get(
      `${baseUrl}/management/business_customers/list?page=${page}&size=${size}`
  );
}
