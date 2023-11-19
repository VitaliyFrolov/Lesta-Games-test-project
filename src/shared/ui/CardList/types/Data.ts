import { type } from "os"

type dataNation = {
    [nation: string]: string
} 

type dataType = {
    [type: string]: string
}

type dataIcon = {
    [type: string]: string
}

export interface IGraphQLReq {
    title: string;
    description: string;
    icons: dataIcon;
    id: number;
    level: number | null;
    nation: dataNation;
    type: dataType;
}