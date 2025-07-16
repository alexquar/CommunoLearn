import React from 'react';

const LoadingNotification = () => {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-full max-w-md mx-auto">
                <div className="flex flex-row items-center justify-center gap-3 rounded-md border border-accentBrand bg-backgroundBrand px-4 py-3 text-textBrand shadow-md dark:border-accentBrand/60 dark:bg-backgroundBrand dark:text-textBrand">
                    <svg
                        className="h-5 w-5 animate-spin text-primaryBrand"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                    </svg>
                    <strong className="font-semibold">Loading...</strong>
                    <span className="text-sm text-accentBrand">Almost there :)</span>
                </div>
            </div>
        </div>
    );
};

export default LoadingNotification;
