export interface Ministry {
    mid: string;
    central: boolean;
    state: string | null;
    name: string;
    head: Person[];
    income: Income[];
    expenditure: Expenditure[];
    scheme: Scheme[];
    project: Project[];
}

export interface Person {
    pid: string;
    name: string;
    phone: string;
    address: string;
    area?: string[];
    position: string[];
}

export interface Project {
    pid: string;
    name: string;
    desc: string;
    start: number;
    end: number | null;
    status: 'APPROVED' | 'REJECTED' | 'HALTED' | 'ONGOING' | 'SUSPENDED';
    head: Person[];
    state: State[];
    allocation: Expenditure[];
    photos: { image: string; desc: string }[];
    central: boolean;
    local: Local[];
}

export interface State {
    sid: string;
    name: string;
    head: Person[];
    ministry: Ministry[];
    income: Income[];
    project: Project[];
    scheme: Scheme[];
}

export interface Expenditure {
    eid: string;
    image?: string;
    desc: string;
    name: string;
    amount: string;
    project: string | null;
    scheme: string | null;
}

export interface Income {
    iid: string;
    name: string;
    desc: string;
    date: number;
    t_amount: string;
    expenditure?: Expenditure[];
    central: boolean;
    state: string | null;
    local: string | null;
}

export interface Local {
    lid: string;
    head: Person[];
    name: string;
    income: Income[];
    scheme: Scheme[];
    project: Project[];
    expenditure: Expenditure[];
}

export interface Scheme {
    sid: string;
    name: string;
    desc: string;
    central: boolean;
    state: State[] | null;
    start: number;
    end: number;
    status: 'APPROVED' | 'REJECTED' | 'HALTED' | 'ONGOING' | 'SUSPENDED';
    head: Person[];
    photo: { image: string; desc: string }[];
    expenditure: Expenditure[];
}
