import { FC, PropsWithChildren } from "react";
import styles from './FilterWrapper.module.scss';

export const FilterWrapper:FC<PropsWithChildren> = ({children}) => {
    return (
        <div className={styles.filterWrapper}>
            {children}
        </div>
    )
};