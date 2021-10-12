import axios, { AxiosResponse } from "axios";
import {InvoiceDTO} from "./types";

const baseUrl = "http://185.185.126.15:8080/api";

export async function getInvoice(
    page: number,
    size: number
) {
  return await axios.get(
      `${baseUrl}/management/invoices/list?page=${page}&size=${size}`
  );
}

export async function postInvoice(
    data: InvoiceDTO
): Promise<AxiosResponse<InvoiceDTO>> {
  return await axios.post<InvoiceDTO>(`${baseUrl}/management/invoices/create`, {
    data,
  });
}
