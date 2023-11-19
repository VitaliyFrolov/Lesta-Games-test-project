import { FC, useState, useEffect } from "react";
import { graphQLReq, queryList } from "../../../shared/lib/graphQL";
import { IGraphQLReq } from "../../../shared/ui/CardList/types/Data";
import { Link, useParams } from "react-router-dom";
import { Container } from "../../../shared/ui/Container";
import { PageRout } from "../../../shared/lib/routes";
import styles from './Page.module.scss';

export const Page: FC = () => {
    const { id } = useParams<{id : string}>();
    const [ data, setData ] = useState<IGraphQLReq[]>([]);
    const selectedItem = id ? data.find(item => item.id === parseInt(id)) : undefined;

    useEffect(() => {
        const fetchData = async () => {
            const res = await graphQLReq(queryList.getAllShops, 'https://vortex.korabli.su/api/graphql/glossary/');
            setData(res.data.vehicles);
        };
        fetchData();
    }, []);

    data.forEach((item: any, index: number,) => {
        item.id = index + 1;
    });

    return (
        <Container>
            <section className={styles.shipPage}>
                <div className={styles.shipPage__buttonWrapper}>
                    <Link
                        to={PageRout.AllShips}
                        className={styles.shipPage__button}
                    >
                        <p>
                            Return to viewing all ships
                        </p>
                    </Link>
                </div>
                <div className={styles.shipPage__img}>
                    <img
                        src={selectedItem ? selectedItem.icons.medium : 'loading...'}
                        width={400}
                        height={400}
                        alt={selectedItem ? selectedItem.title : 'loading...'}
                    />
                </div>
                <div className={styles.shipPage__titleWrapper}>
                    <h2 className={styles.shipPage__title}>
                        {selectedItem ? selectedItem.title : 'loading...'}
                    </h2>
                </div>
                <p className={styles.shipPage__description}>
                    {selectedItem ? selectedItem.description : 'loading...'}
                </p>
                <div className={styles.shipPage__infoTable}>
                   <ul className={styles.infoTable__list}>
                        <li className={styles.infoTable__item}>
                            <p>
                                Сountry: {selectedItem ? selectedItem.nation.title : 'loading...'}
                            </p>
                        </li>
                        <li className={styles.infoTable__item}>
                            <p>
                                Type: {selectedItem ? selectedItem.type.name : 'loading...'} 
                            </p>
                        </li>
                        <li className={styles.infoTable__item}>
                            <p>
                                Lvl: {selectedItem ? selectedItem.level : 'loading...'}
                            </p>
                        </li>
                   </ul>
                </div>
            </section>
        </Container>
    )
};