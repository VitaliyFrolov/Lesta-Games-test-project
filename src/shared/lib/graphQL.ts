export const graphQLReq = async (query: string, url: string) => {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({ query })
    });
    return await res.json();
};

export enum queryList {
    getAllShops = `query {
        vehicles {
            title
            description
            icons {
                large
                medium
            }
            level
            type {
            name
                title
                icons {
                    default
                }
            }
            nation {
                name
                title
                color
                icons {
                    small
                    medium
                    large
                }
            }
        }
      }`
}