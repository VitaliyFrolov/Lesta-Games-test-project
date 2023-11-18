import { FC } from 'react';
import styles from './Card.module.scss'
import { Link } from 'react-router-dom';

interface ICardProps {
    title: string;
    icon: string;
    id: number;
}
 
export const Card: FC<ICardProps> = ({
    title,
    icon,
    id,
}) => {
    return (
        <section className={styles.card}>
            <Link
                to={`/ship/${id}`}
            >
                <img
                    src={icon}
                    alt={title}
                    width={300}
                    height={300}
                />
                <h2 className={styles.card__title}>
                    {title}
                </h2>
            </Link>
        </section>
    )
}