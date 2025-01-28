```js
Ministry: {
    mid: string;
    central: boolean;
    state: string | null;
    name: string;
    head: Person[]; // array of person.id s
    income: Income[]; // array of income.id s
    expenditure: Expenditure[]; // array of expenditure.id s
    scheme: Scheme[]; // array of scheme.id s
    project: Project[]; // array of project.id s    
}
```

```js
Person: {
    pid: string;
    name: string;
    phone: string;
    address: string;
    area?: string[];
    position: string[];
}
```

```js
Project: {
    pid: string;
    name: string;
    desc: string;
    start: date in millisec;
    end: date in millisec | null;
    status: enum Status;
    head: Person[];
    state: State[]; // array of state.id s
    allocation: Expenditure[];
    photos: {image: string;desc: string}[];
    central: boolean;
    local: Local[]; // array of local.id
}
enum Status = {"APPROVED","REJECTED", "HALTED", "ONGOING", "SUSPENDED"}
```

```js
State: {
    sid: string;
    name: string;
    head: Person[];
    ministry: Ministry[]; // array of ministry.id
    income: Income[];
    project: Project[];
    scheme: Scheme[];
}
```

```js
Expenditure: {
    eid: string
    image?: string;
    desc: string;
    name: string;
    amount: string;
    project: project.id | null;
    scheme: scheme.id | null;
}
```

```js
Income: {
    iid: string;
    name: string;
    desc: string;
    date: date in millisec;
    t_amount: string;
    expenditure?: Expenditure[];
    central: boolean;
    state: state.id | null;
    local: local.id | null;
    ministry: ministry.id | null;
}
```

```js
Local: {
    lid: string;
    head: Person[];
    name: string;
    income: Income[];
    scheme: Scheme[];
    project: Project[];
    expenditure: Expenditure[];
}
```

```js
Scheme: {
    sid: string;
    name: string;
    desc: string;
    central: boolean;
    state: State[] | null;
    start: date in milli;
    end: date in milli;
    status: enum Status;
    head: Person[];
    photo: {image: string,desc: string}[];
    expenditure: Expenditure[];
}
```