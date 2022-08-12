export type  VacationType ={
    id:number,
    userId: number,
    startingTime:string,
    endingTime: string,
    comment: string,
    isAccepted: boolean|null
}; 

export type CreateVacationType={
    userId: number,
    startingTime:string,
    endingTime: string,
    comment: string
}

export type VacationLevelType={
    id:number,
    nameLevel: string,
    value: number
}