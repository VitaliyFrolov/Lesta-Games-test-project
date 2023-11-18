import styles from './Filter.module.scss';

interface IFilterData {
    data: string | number | null;
    setData: (data: string) => void
    selecters: string[] | number[];
    labelId: string;
    title: string;
}

export const Filter = ({data, setData, selecters, labelId, title}: IFilterData) => {
    return (
        <div className={styles.filter}>
            <label htmlFor={labelId}>{title}:</label>
            <select
                value={data || ''}
                onChange={(e) => {
                    const selectedData: string  = e.target.value;
                    setData(selectedData);
                }}            
            >
                <option value="">All</option>
                {selecters.map(data => (
                    <option key={data} value={data}>{data}</option>
                ))}
            </select>
        </div>
    )
}