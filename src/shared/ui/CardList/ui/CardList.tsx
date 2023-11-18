import { FC, useEffect, useState} from 'react';
import { graphQLReq, queryList } from '../../../lib/graphQL';
import { IGraphQLReq} from '../types/Data';
import { Card } from '../../Card/ui/Card';
import { filterData } from '../lib/FilterData';
import { Filter, FilterWrapper } from '../../Filter';
import styles from './CardList.module.scss';

export const CardList: FC = () => {
    const [ data, setData ] = useState<IGraphQLReq[]>([]);
    const [ shipName, setShipName ] = useState<string>('');
    const [ shipLevel, setShipLevel ] = useState<string | null>(null);
    const [ shipNation, setShipNation ] = useState<string | null>(null);
    const [ shipClass, setShipClass ] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await graphQLReq(queryList.getAllShops, 'https://vortex.korabli.su/api/graphql/glossary/');
            setData(res.data.vehicles);
        };
        fetchData();
    }, []);

    data.forEach((item: IGraphQLReq, index: number,) => {
        item.id = index + 1;
    });
    
    return (
        <section className={styles.cardList}>
            <header className={styles.cardList__header}>
                <form>
                    <input
                        type="text"
                        placeholder="search"
                        onChange={(e) => setShipName(e.target.value)}
                        className={styles.cardList__search}
                    />
                </form>
                <FilterWrapper>
                    <Filter
                        data={shipLevel}
                        setData={setShipLevel}
                        selecters={[
                            1,
                            2,
                            3,
                            4,
                            5,
                            6,
                            7,
                            8,
                            9,
                            10,
                            11,
                        ]}
                        labelId='filterLevel'
                        title='Level'
                    />
                    <Filter
                        data={shipNation}
                        setData={setShipNation}
                        selecters={[
                            'Japan',
                            'U.S.A.',
                            'Germany',
                            'Spain',
                            'The Netherlands',
                            'Europe',
                            'Pan-America',
                            'Italy',
                            'Commonwealth',
                            'Pan-Asia',
                            'France',
                            'U.K.',
                            'U.S.S.R.',
                        ]}
                        labelId='filterNation'
                        title='Nation'
                    />
                    <Filter
                        data={shipClass}
                        setData={setShipClass}
                        selecters={[
                            'Submarine',
                            'Destroyer',
                            'Cruiser',
                            'Battleship',
                            'Aircarrier',
                        ]}
                        labelId='filterClass'
                        title='Class'
                    />
                </FilterWrapper>
            </header>
            <ul className={styles.cardList__list}>
                {filterData(shipName, shipLevel, shipNation, shipClass, data,).map((item: IGraphQLReq) => (
                    <Card
                        key={item.id}
                        title={item.title}
                        icon={item.icons.large}
                        id={item.id}
                    />
                ))}
            </ul>
        </section>
    )
}
