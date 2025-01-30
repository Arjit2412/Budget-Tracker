export const IMGBB_API_URL = "https://api.imgbb.com/1/upload?key="

export type ImageInput = string | File;

export type IMGBBResponse = {
    success: boolean;
    imageURL: IMGBB | null;
}

export type IMGBB = {
    url: string | null;
    thumb: string | null;
}

export type StateInput = {
    name: string;
}

export enum Status {
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
    HALTED = "HALTED",
    ONGOING = "ONGOING",
    SUSPENDED = "SUSPENDED"
}

export type ProjectInput = {
    name: string;
    desc: string;
    start: string;
    end?: string;
    status: Status;
    stateIds: string[];
    photos: {
        desc: string,
        photo: File
    }[];
    central: boolean;
    localIds: string[];
    ministryId: string;
}

export type MinistryInput = {
    central: boolean;
    stateId?: string | null;
    name: string;
    desc: string;
}

export type LocalInput = {
    name: string;
}

export type IncomeInput = {
    name: string;
    desc: string;
    central: boolean;
    date: string;
    stateId: string; // state id
    localId: string; // local id
    ministryId: string;
}

export type PersonInput = {
    name: string;
    phone: string;
    address: string;
    area: string[];
    position: string[];
    photo: File;
}

export type SchemeInput = {
    name: string;
    desc: string;
    central: boolean;
    stateIds: string[];
    localIds: string[];
    ministryId: string;
    start: string;
    end?: string;
    status: Status;
    photos: {
        desc: string,
        photo: File,
    }[]
}

export type ExpenditureInput = {
    photo: File;
    desc: string;
    name: string;
    amount: string;
    projectId: string;
    schemeId: string;
    incomeId: string;
    ministryId: string;
    central: boolean;
    stateId: string;
}