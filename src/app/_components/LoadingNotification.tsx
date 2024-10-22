import React from 'react';

const LoadingNotification = () => {
    return (
        <div>
            <div className="bg-slate-100 border border-slate-400 text-slate-700 px-4 py-3 rounded flex flex-wrap justify-between">
                <strong className=" mx-1 font-bold">Loading...</strong>
                <span className="mx-1 block sm:inline">almost there :)</span>
            </div>
        </div>
    );
}

export default LoadingNotification;
