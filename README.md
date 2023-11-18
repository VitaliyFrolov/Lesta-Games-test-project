# Данный проект является тестовым заданием компании LESTA GAMES.

## Стек: React.js + Scss

## Для запуска приложения необходимо ввести команду: 
`npm start`

## Задание:

> "Задача -- разработать страницу с отображением всех кораблей игры «Мир Кораблей». Пользователь должен иметь возможность посмотреть на странице основные параметры корабля: название, класс, нация, уровень, описание, изображение и отфильтровать корабли по уровню, нации и классу. В качестве референса можно использовать клиент игры. Внешний вид на ваше усмотрение."

## Требования к технической реализации:
> 1. typescript
> 2. всё остальное на ваше усмотрение

## Решение:

# 1. Первым делом я построил feature sliced design архитектуру приложения, тем самым отделил логику от интерфейса и разделил все на компоненты.

# 2. В компоненте "CardList" мы делаем запрос на сервер в формате GraphQL и получаем данные, сохраняя их в переменную data.
На этом шаге мы могли бы сделать пагинацию, но у нас нет необходимых аргументов для корректного запроса и единственный исход - запрашивать сразу все данные. 

Далее мы типизируем данные получаемые с сервера:

```
type dataNation = { 
    [nation: string]: string
} 

type dataType = {
    [type: string]: string
}

export interface IGraphQLReq {
    title: string;
    description: string;
    icons: any;
    id: number;
    level: number | null;
    nation: dataNation;
    type: dataType;
}
```

Так же отсутствие необходимых аргументов для запроса приводит нас к фильтрации данных на клиенте, что ни есть хорошо, т.к это вызывает лишнюю нагрузку на клиент.

# 3. После успешного запроса мы перебрали переменную data, которая является массивом данных пришедших с сервера и отрисовали карточки всех кораблей.

На этом этапе мы могли бы реализовать динамическую пагинацию, но нас все еще останавливает отсутствие аргументов для корректного запроса к серверу.

# 4. Далее мы занимаемся фильтрацией.

Для фильтрации по названию я реализовал поисковую строку, которая работает следующим образом:

Мы имееи input с типом text.
```
<input
    type="text"
    placeholder="search"
    onChange={(e) => setShipName(e.target.value)}
    className={styles.cardList__search}
/>

```

 В данном коде мы отлавливаем событие onChange и сохраняем название корабля при помощи хука useState, далее это значение поступит в качестве аргумента в функцию filterData()

 Следующим шагом мы делаем фильтры по уровню, нации и классу корабля.

 Для этого я создал ui компонент Filter.

 ```
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
 ```

В компоненте Filter мы позволяем выбрать то, как мы будем фильтровать данные. Filter является своего рода контейнером.

Так же для корректной типизации данному компоненту был написал interface:

```
interface IFilterData {
    data: string | number | null;
    setData: (data: string) => void
    selecters: string[] | number[];
    labelId: string;
    title: string;
}
```

Сама же фильтрация происходит с помощью функции FilterData:

```
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
```

В качестве аргументов в функцию поступают:
1. search - передает данные для поиска по имени,
2. level - передает данные для поиска по уровню,
3. nation - передает данные для поиска по нации,
4. classShip - передает данные для поиска по классу,
5. data - массив данных, которые мы получили с сервера.

Первым делом в функции у нас идет проверка на наличие какой либо фильтрации:

```
if (!search && !level && !nation && !classShip) {
    return data
}
```

Если фильтрация отсутствует, возвращаем data без изменения.

Далее мы создаем переменную let с названием filteredData и присваиваем ей значение data.
После этого мы изменяем переменную filteredData для фильтрации.

Проверяем наличие активного фильтра и фильтруем данные. 

```
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
```

В конце выполнения наша функция возвращает filterData, что является измененным массивом data.

# 5. Так же я создал более подробный вариант карточки каждого корабля где можно прочитать его описание. 

Для корректной индексации карточек, методом forEach, я добавил им id. 

```
data.forEach((item: IGraphQLReq, index: number,) => {
    item.id = index + 1;
});
```

Далее в качестве пропса я передал данный id в карточку создал для каждой из них url:

```
 <Link
    to={`/ship/${id}`}
>
```

На этом этапе мне пришлось сделать второй graphQL запрос на сервер, только на этот раз из страницы конкретной карточки корабля.
Я не считаю это хорошей практикой, но и от данной реализации отказаться не смог.

Все что нам осталось, это найти по id, который я могу получить из ссылки конкретной карточки, нужный мне объект в массиве получаемый с сервера и отрисовать дынне о нем на этой странице. 
```
 const { id } = useParams<{id : string}>();
const [ data, setData ] = useState<IGraphQLReq[]>([]);
const selectedItem = id ? data.find(item => item.id === parseInt(id)) : undefined;
```

## Итог:
1. Мы создали понятную и масштабируемую архитектуру для приложения.
2. Мы сделали запрос на сервер и получили данные.
3. Мы отрисовали все карточки кораблей.
4. Мы реализовали фильтры для всех кораблей.
5. Мы вывели более подробные данные о конкретном корабле в отдельной странице. 