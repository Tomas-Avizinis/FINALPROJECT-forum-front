import React, {useState} from 'react';
import {Container} from "react-bootstrap";

const Pagination = ({activePage, setActivePage, totalPages}) => {

    const pages = new Array(totalPages).fill('');

    const changePage = (direction) => {
        if (direction==='previous' && activePage>1) {
            setActivePage(activePage - 1)
        }
        if (direction==='next' && activePage<totalPages){
            setActivePage(activePage+1)
        }
    }

    return (
        <div>
            <div className={'flex'}>
                {/*<div style={{width:'100px'}}/>*/}
                <div className={'flex'}>
                    {activePage!==1 &&
                        <button className={'arrow page-button'} onClick={()=>{changePage('previous')}} >&#129080;</button>
                    }

                    {pages.map((p,i)=>
                        <button
                            className={(i+1)===activePage? 'flex page-button page-number active': 'page-button page-number'}
                            key={i*2}
                            onClick={()=>{setActivePage(i+1)}}
                        >{i+1}</button>
                    )}
                    {activePage!==totalPages &&
                        <button className={'arrow page-button'} onClick={()=>{changePage('next')}}>&#129082;</button>
                    }

                </div>
                {/*<div className={'d-flex gap-2'}>*/}
                {/*    <div>Rodyti po </div>*/}
                {/*    <select onChange={(e)=>setItemsInPage(e.target.value)}>*/}

                {/*        <option value={4} key={4} >4</option>*/}
                {/*        <option value={8} key={8} >8</option>*/}
                {/*        <option value={12} key={12} >12</option>*/}
                {/*        <option value={16} key={16} >16</option>*/}
                {/*        <option value={20} key={20} >20</option>*/}
                {/*    </select>*/}
                {/*</div>*/}
            </div>
        </div>
    );
};

export default Pagination;