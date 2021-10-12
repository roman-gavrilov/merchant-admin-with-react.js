export interface TicketDTO {
    id?: number,
    title?: string,
    description?: string,
}

export interface TicketStatusTypesDTO {
    code?: string,
    name: string,
}

export interface TicketSeverityLevelsDTO {
    code?: string,
    name: string,
}

export interface TicketCategoryTypesDTO {
    code?: string,
    name: string,
}