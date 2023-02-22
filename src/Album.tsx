import React from 'react';
import './Album.scss';

// @ts-ignore
function Album({feed}){
    // @ts-ignore
    // @ts-ignore
    return (
        <>
        {feed.map((value: number) => <div className="Album">{value}</div>)}
        </>
    );
}

export default Album;
