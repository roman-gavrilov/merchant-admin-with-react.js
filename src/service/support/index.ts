import axios, { AxiosResponse } from "axios";
import {TicketCategoryTypesDTO, TicketDTO, TicketSeverityLevelsDTO, TicketStatusTypesDTO} from "./types";

const baseUrl = "http://185.185.126.15:8080/api";

export async function getTickets(
    page: number,
    size: number
) {
  return await axios.get(
      `${baseUrl}/management/support/tickets/list?page=${page}&size=${size}`
  );
}

export async function getTicket(
    id: string
) {
  return await axios.get(
      `${baseUrl}/management/support/tickets/ticket/${id}`
  );
}

export async function postTicket(
    data: TicketDTO
): Promise<AxiosResponse<TicketDTO>> {
  return await axios.post<TicketDTO>(`${baseUrl}/management/support/tickets/create`, {
    data,
  });
}

export async function updateTicket(
    id: string,
    data: TicketDTO
): Promise<AxiosResponse<TicketDTO>> {
  return await axios.post<TicketDTO>(`${baseUrl}/management/support/tickets/ticket/${id}`, {
    data,
  });
}

export async function getTicketSeverityTypes(): Promise<AxiosResponse<TicketSeverityLevelsDTO[]>> {
  return await axios.get<TicketSeverityLevelsDTO[]>(
      `${baseUrl}/management/support/tickets/severity_levels`
  );
}

export async function getTicketStatusTypes(): Promise<AxiosResponse<TicketStatusTypesDTO[]>> {
  return await axios.get<TicketStatusTypesDTO[]>(
      `${baseUrl}/management/support/tickets/status_types`
  );
}

export async function getTicketCategories(): Promise<AxiosResponse<TicketCategoryTypesDTO[]>> {
  return await axios.get<TicketCategoryTypesDTO[]>(
      `${baseUrl}/management/support/tickets/categories`
  );
}
