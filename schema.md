## REFER prisma/schema.prisma

```js
Ministry: {
    mid: string;
    central: boolean;
    state: string | null;
    name: string;    
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
    stateIds: string[];
    projectIds: string[];
    schemeIds: string[];
    localIds: string[];
    ministryIds: string[];
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
    stateIds: string[];
    photos: {image: string;desc: string}[];
    central: boolean;
    localIds: string[]; // array of local.id
}
enum Status = {"APPROVED","REJECTED", "HALTED", "ONGOING", "SUSPENDED"}
```

```js
State: {
    sid: string;
    name: string;
}
```

```js
Expenditure: {
    eid: string
    image?: string;
    desc: string;
    name: string;
    amount: string;
    projectId: string | null;
    schemeId: string | null;
    incomeId: string | null;
    ministryId: string | null;
    central: boolean;
    stateId: string;
}
```

```js
Income: {
    iid: string;
    name: string;
    desc: string;
    date: date in millisec;
    t_amount: string;
    central: boolean;
    stateId: string | null;
    localId: string | null;
    ministryId: string | null;
}
```

```js
Local: {
    lid: string;
    name: string;
}
```

```js
Scheme: {
    sid: string;
    name: string;
    desc: string;
    central: boolean;
    stateIds: State[] | null;
    start: date in milli;
    end: date in milli;
    status: enum Status;
    photos: {image: string,desc: string}[];
}
```