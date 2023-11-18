import { FC, PropsWithChildren } from 'react';
import styels from './Container.module.scss'

export const Container: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className={styels.container}>
            {children}
        </div>
    )
};