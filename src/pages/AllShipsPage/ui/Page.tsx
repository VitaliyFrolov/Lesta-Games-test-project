import React, { FC } from 'react';
import styles from './Page.module.scss';
import { CardList } from '../../../shared/ui/CardList';
import { Container } from '../../../shared/ui/Container';

export const Page: FC = () => {
    return (
       <Container>
            <section className={styles.allShips}>
                <CardList />
            </section>
       </Container>
    )
};