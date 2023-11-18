import { IGraphQLReq } from "../types/Data";

export const filterData = (search: string, level: number | string | null, nation: string | null, classShip: string | null, data: IGraphQLReq[]) => {
    if (!search && !level && !nation && !classShip) {
        return data
    }

    let filteredData = data;
    if (search) {
        filteredData = filteredData.filter(item => item.title.toLowerCase().includes(search.toLowerCase()));
    }
    if (level) {
        filteredData = filteredData.filter(item => item.level?.toString() === level);
    }

    if (nation) {
        filteredData = filteredData.filter(item => item.nation.title === nation);
    }

    if (classShip) {
        filteredData = filteredData.filter(item => item.type.name === classShip.toLowerCase());
    }
    
    return filteredData;
}   