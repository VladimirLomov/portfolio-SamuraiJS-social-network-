import React, {useState} from 'react';
import styles from "./Paginator.module.css";
import cn from "classnames"

type PropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage?: number
    onPageChanged?: (pageNumber:number) => void
    portionSize?: number
}

let Paginator: React.FC<PropsType> = ({totalItemsCount, pageSize, currentPage=1,onPageChanged = x =>x, portionSize=10}) => {

    let pagesCount = Math.ceil(totalItemsCount / pageSize); //колво страниц всего. число юзеров/размер стриницы

    let pages:Array<number> = []; // страницы на экране
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount/portionSize)  // колво порций =  колво страниц/размер порции
let [portionNumber, setPortionNumber] = useState(1)  //хук 
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1 
    //граница левая = portionNumber - номер порции, portionSize - размер порции
    let rightPortionNumber = portionNumber * portionSize
    //граница правая = номер порции * размер порции

    return <div className={styles.paginator} >
        {portionNumber >1 &&
        <button onClick = {()=>{setPortionNumber(portionNumber-1)} }>НАЗАД</button>   }

    
            {pages.filter(p=>p >= leftPortionPageNumber && p <= rightPortionNumber)
            .map(p => {
                return <span className={ cn({
                    [styles.selectedPage]: currentPage === p
                }, styles.pageNumber) }
                key ={p}
                             onClick={(e) => {
                                 onPageChanged(p);
                             }}>{p}</span>
            })}
             { portionCount >portionNumber &&
        <button onClick = {()=>{setPortionNumber(portionNumber+1)} }>ВПЕРЕД</button>   }
        </div>
        }
  

export default Paginator;