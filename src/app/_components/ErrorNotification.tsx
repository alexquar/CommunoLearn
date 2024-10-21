import React from 'react';

const ErrorNotification = (props: {message:string|null}) => {
    const {message} = props;
    return (
        <div>
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex flex-wrap justify-between" role="alert">
                <strong className=" mx-1 font-bold">Oh No!</strong>
                <span className="mx-1 block sm:inline">{message}</span>
            </div>
        </div>
    );
}

export default ErrorNotification;
